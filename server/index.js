const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.get("/test", (req, res) => {
  res.json("jain");
});
const bcryptSalt = bcrypt.genSaltSync(10);
const secret = "secret";
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};

// Use the connect function to establish the MongoDB connection
connect();

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }
  const userDoc = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  res.json(userDoc);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      const name = userDoc.name;
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          res.json({ token, name });
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    return res.status(412).json("Not Found");
  }
});
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

app.listen(3000, () => {
  console.log(`Server is Listening on 3000`);
});
