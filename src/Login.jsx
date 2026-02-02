import axios from "axios";
import React from "react";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("sinu.mail@gmail.com");
  const [password, setPassword] = useState("Sinu@1234_");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" py-34 flex justify-center items-center px-5">
      <div className="card w-96 max-w-md shadow-sm bg-gray-900 rounded-xl py-5">
        <div className="flex justify-center p-5">
          <p className="text-2xl font-semibold">Login</p>
        </div>

        <div className="card-body flex flex-col gap-y-5 items-center justify-center">
          <label className="floating-label w-full">
            <input
              type="text"
              placeholder="Your Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-md rounded-lg w-full "
            />
            <span>Your Email</span>
          </label>
          <label className="floating-label w-full">
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-md w-full rounded-lg"
            />
            <span>Password</span>
          </label>
          <p className="link link-hover text-gray-200 self-end">
            Forgot Password?
          </p>
          <button
            onClick={handleLogin}
            className="btn btn-info btn-block rounded-lg text-lg text-white"
          >
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
