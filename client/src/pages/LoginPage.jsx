import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { contextProvider } from "../Context";
import { useContext } from "react";
import { TailSpin } from "react-loader-spinner";

function LoginPage() {
  const { user, setUser } = useContext(contextProvider);

  const [redirect, setRedirect] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    const login = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/user/login", loginData);
        const userDoc = response.data;
        setUser(userDoc);
        setRedirect(true);
      } catch (error) {
        console.log(error);
      }
    };
    login();
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form onSubmit={loginHandler} className="max-w-md mx-auto">
          <input
            value={loginData.email}
            onChange={(e) =>
              setLoginData((prev) => {
                return { ...loginData, email: e.target.value };
              })
            }
            type="email"
            placeholder="your@mail.com"
            required
          />
          <input
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev) => {
                return { ...loginData, password: e.target.value };
              })
            }
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit" className="primary flex justify-center">
            {loading ? (
              <TailSpin
                height="25"
                width="25"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Login"
            )}
          </button>
          <div className=" text-center text-gray-500">
            Don't have an account yet?{" "}
            <Link to={"/register"} className=" underline text-black">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
