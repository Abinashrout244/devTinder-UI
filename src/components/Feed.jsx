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
      dispatch(addFeed(feed_data?.data?.data));
      console.log(feed_data?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFeed();
  }, []);
  const data = useSelector((data) => data.Feed);

  return (
    data && (
      <div className="p-10 flex gap-5 flex-wrap justify-center items-center">
        {data?.length > 0 ? (
          <FeedCard user={data[0]} />
        ) : (
          <p className="pt-40 flex justify-center items-center text-3xl font-semibold">
            No more users
          </p>
        )}
      </div>
    )
  );
};

export default Feed;
