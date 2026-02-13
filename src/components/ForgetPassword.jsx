import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      setErr("");
      if (password === conPassword) {
        await axios.put(
          `${BASE_URL}/profile/password`,
          { password },
          { withCredentials: true },
        );
        toast.success("Logedin Sucessfully!!");
        navigate("/login");
      } else {
        setErr("Password Don't Match!!");
      }
    } catch (err) {
      //console.log(err.response.data);
      setErr(err?.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-5">
      <div className="card bg-base-300 w-96 p-5 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-semibold self-center card-title p-3">
          Change Password
        </h2>
        <div className="card-body ">
          <div className="flex flex-col gap-8">
            <label>
              <input
                type="text"
                className="input rounded-xl"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                className="input rounded-xl"
                placeholder="Confirm Password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="font-semibold text-red-400">{err}</p>
          <div className="card-actions justify-center pt-5">
            <button
              className="btn btn-primary text-lg"
              onClick={handleChangePassword}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
