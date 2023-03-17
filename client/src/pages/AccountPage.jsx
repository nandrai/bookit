import axios from "axios";
import React from "react";
import { useContext } from "react";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { contextProvider } from "../Context";

function AccountPage() {
  let { subpage } = useParams();
  if (subpage == undefined) {
    subpage = "profile";
  }

  const { user, setUser, ready } = useContext(contextProvider);

  const navigate = useNavigate();

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  async function logoutHandler() {
    const res = await axios.get("/user/logout");
    alert(res.data);
    navigate("/");
    setUser(null);
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center mx-auto max-w-lg">
        <span>
          Logged In as {user.name} ({user.email})
          <br />
          <button
            type="submit"
            onClick={logoutHandler}
            className="bg-primary text-white rounded-full p-2 w-full max-w-sm mt-2"
          >
            Logout
          </button>
        </span>
      </div>
    </div>
  );
}

export default AccountPage;
