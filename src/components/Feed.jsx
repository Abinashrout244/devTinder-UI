import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const dispatch = useDispatch();

  const handleFeed = async () => {
    try {
      const feed_data = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(feed_data?.data));
      //console.log(feed_data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFeed();
  }, []);
  const User_Info = useSelector((data) => data.Feed);
  //console.log(User_Info?.users);

  const data = User_Info?.users;

  return (
    // data && (
    //   <div className="p-10 flex gap-5 flex-wrap justify-center items-center">
    //     {data?.map((user, index) => {
    //       return <FeedCard user={user} key={user?._id} />;
    //     })}
    //   </div>
    // )
    data && (
      <div className="p-10 flex gap-5 flex-wrap justify-center items-center">
        <FeedCard user={data[0]} />
      </div>
    )
  );
};

export default Feed;
