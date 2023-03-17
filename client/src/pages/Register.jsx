import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const registerHandler = (e) => {
    e.preventDefault();
    const register = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/user/register", registerData);
        alert(response.data.message);
      } catch (error) {
        alert(error.response.data.message);
      }
      setLoading(false);
    };
    register();
  };

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form onSubmit={registerHandler} className="max-w-md mx-auto">
          <input
            value={registerData.name}
            onChange={(e) =>
              setRegisterData((prev) => {
                return { ...registerData, name: e.target.value };
              })
            }
            type="text"
            placeholder="John Doe"
            required
          />
          <input
            value={registerData.email}
            onChange={(e) =>
              setRegisterData((prev) => {
                return { ...registerData, email: e.target.value };
              })
            }
            type="email"
            placeholder="your@mail.com"
            required
          />
          <input
            value={registerData.password}
            onChange={(e) =>
              setRegisterData((prev) => {
                return { ...registerData, password: e.target.value };
              })
            }
            type="password"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="!bg-green-600 primary flex justify-center"
          >
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
              "Register Now"
            )}
          </button>
          <div className=" text-center text-gray-500">
            Already have an account?{" "}
            <Link to={"/login"} className=" underline text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
