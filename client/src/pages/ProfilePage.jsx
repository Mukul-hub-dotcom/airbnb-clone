import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AccountNav from "./AccountNav";
import PlacesPage from "./PlacesPage";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  console.log(subpage);

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div>
      <AccountNav />
      {subpage == "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {name}
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
