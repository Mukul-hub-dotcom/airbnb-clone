import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import AccountNav from "./AccountNav";
import PlacesPage from "./PlacesPage";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  useEffect(() => {
    if (ready && !user) {
      navigate("/");
    }
  }, [ready]);

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);

    navigate("/");
  }

  return (
    <div>
      <AccountNav />
      {subpage == "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user?.name}
          <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage == "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
