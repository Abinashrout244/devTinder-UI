import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";
import { AnimatePresence } from "framer-motion";
import spinner from "../assets/spinner.gif";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const data = useSelector((data) => data.Feed);
  const navigate = useNavigate();
  const handleFeed = async () => {
    try {
      const feed_data = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(feed_data?.data?.data));
      console.log(feed_data?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      handleFeed();
    }
  }, [user]);
  if (!user) {
    navigate("/login");
    return;
  }

  if (!user) return null;

  if (!data)
    return (
      <h1 className="h-screen flex justify-center items-center">
        <img src={spinner} className="size-16" />
      </h1>
    );

  // return (
  //   data && (
  //     <div className="p-10 flex gap-5 flex-wrap justify-center items-center">
  //       {data?.length > 0 ? (
  //         <FeedCard user={data[0]} />
  //       ) : (
  //         <p className="pt-40 flex justify-center items-center text-3xl font-semibold">
  //           No more users
  //         </p>
  //       )}
  //     </div>
  //   )
  // );
  return (
    <div className="p-10 flex gap-5 flex-wrap justify-center items-center   min-h-screen">
      {data?.length > 0 ? (
        <AnimatePresence mode="wait">
          <FeedCard key={data[0]._id} user={data[0]} enableSwipe={true} />
        </AnimatePresence>
      ) : (
        <p className="pt-40 text-3xl font-semibold">No more users</p>
      )}
    </div>
  );
};

export default Feed;
