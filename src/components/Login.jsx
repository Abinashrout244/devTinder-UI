import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import toast from "react-hot-toast";

const Login = () => {
  const [emailId, setEmailId] = useState("sinu.mail@gmail.com");
  const [password, setPassword] = useState("Sinu@1234_");
  const [err, setErr] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
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
      console.log(err.response);
    }
  };

  return (
    <div className=" py-34 flex justify-center items-center px-5">
      <div className="card w-96 max-w-md shadow-sm bg-gray-900 rounded-xl py-5">
        <div className="flex justify-center p-5">
          <p className="text-2xl font-semibold">Login</p>
        </div>

        <div className="card-body flex flex-col gap-y-5 items-center justify-center">
          <div className="w-full">
            <label className="floating-label validator w-full">
              <input
                type="email"
                placeholder="Your Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-md rounded-lg w-full "
                required
              />
              <span>Your Email</span>
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>
          <div className="w-full">
            <label className="floating-label validator w-full">
              <input
                type="passsword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-md w-full rounded-lg"
                required
              />
              <span>Password</span>
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>
          </div>
          <p className="text-red-500 font-semibold self-start">{err}</p>
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
