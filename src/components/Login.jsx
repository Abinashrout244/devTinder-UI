import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import toast from "react-hot-toast";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogedin, setIsLogedin] = useState(false);
  const [err, setErr] = useState("");

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data.isEmail));
      //console.log(res);
      toast.success("Logedin Sucessfully!!");
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
      //console.log(err.response);
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      console.log(res.data.user);
      dispatch(addUser(res?.data?.user));
      toast.success("User Register Sucessfully!!");

      navigate("/");
    } catch (err) {
      setErr(err?.response?.data);
    }
  };

  return (
    <div className=" py-14  flex justify-center items-center px-5">
      <div className="card w-96 max-w-md shadow-sm bg-base-300 rounded-3xl py-5">
        <div className="flex justify-center p-5">
          <p className="text-2xl font-semibold">
            {isLogedin ? "Sign Up" : "Login"}
          </p>
        </div>

        <div className="card-body w-full max-w-md mx-auto px-5 sm:px-8 py-6 flex flex-col gap-6">
          {isLogedin && (
            <>
              <label className="floating-label w-full">
                <input
                  type="text"
                  placeholder="FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-md w-full rounded-lg"
                  required
                />
                <span>Your Name</span>
              </label>
              <label className="floating-label w-full">
                <input
                  type="text"
                  placeholder="LastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-md w-full rounded-lg"
                />
                <span>LastName</span>
              </label>
            </>
          )}

          <label className="floating-label w-full">
            <input
              type="email"
              placeholder="Your Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-md w-full rounded-lg"
              required
            />
            <span>Your Email</span>
          </label>
          <div className="w-full">
            <label className="floating-label w-full">
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-md w-full rounded-lg"
                required
              />
              <span>Password</span>
            </label>
          </div>

          {/* Error */}
          {err && <p className="text-red-500 text-sm font-medium">{err}</p>}

          <div className="text-right">
            {user ? (
              <Link
                to="/changepassword"
                className="link link-hover text-sm text-gray-300"
              >
                Forgot Password?
              </Link>
            ) : (
              <a className=" cursor-not-allowed text-sm text-gray-300">
                Forgot Password?
              </a>
            )}
          </div>

          {isLogedin ? (
            <button
              onClick={handleSignup}
              className="btn btn-info w-full rounded-lg text-lg text-white"
            >
              SIgn Up
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="btn btn-info w-full rounded-lg text-lg text-white"
            >
              Login
            </button>
          )}

          <div className="text-center mt-4">
            <div className="text-sm">
              {isLogedin ? (
                <p className="flex flex-row gap-1">
                  Already have an account?
                  <span
                    className="link link-info cursor-pointer"
                    onClick={() => setIsLogedin(false)}
                  >
                    Login
                  </span>
                </p>
              ) : (
                <p className="flex flex-row gap-1">
                  Don't have an account?
                  <span
                    className="link link-info cursor-pointer"
                    onClick={() => setIsLogedin(true)}
                  >
                    Sign Up
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
