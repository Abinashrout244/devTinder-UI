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
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Body;
