import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const fetchUser = async () => {
    //it work as private route
    if (!userData) {
      try {
        const User = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        dispatch(addUser(User?.data?.findUser));
      } catch (err) {
        if (err.status === 401) {
          navigate("/login");
        }
        // console.error(err);
        console.log(err.response);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="relative min-h-screen  overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] opacity-30 top-[-200px] left-[-200px]"></div>

      <div className="absolute w-[600px] h-[600px] bg-pink-600 rounded-full blur-[150px] opacity-30 bottom-[-200px] right-[-200px]"></div>

      <div className="absolute w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[120px] opacity-20 top-1/3 left-1/3"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff15_1px,transparent_0)] bg-[size:40px_40px]"></div>
      <div className="min-h-screen flex flex-col relative z-10">
        <NavBar />

        <main className="flex-1 pt-20">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Body;
