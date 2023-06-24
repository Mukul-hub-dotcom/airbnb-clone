import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [user,setUser]=useState('')
  async function loginUser(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { email, password });
      alert("login successful");
      const token = response.data.token;
      const name = response.data.name;
      localStorage.setItem("name", name);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      alert("login failed");
    }
  }

  const navigate = useNavigate();

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={loginUser}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="your@email.com"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?&nbsp;
            <Link className="underline text-black" to="/register">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
