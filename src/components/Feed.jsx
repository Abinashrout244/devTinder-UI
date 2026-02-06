import React from "react";
import { useSelector } from "react-redux";

const Feed = () => {
  const User = useSelector((state) => state.user);
  console.log(User);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-semibold">
        WELCOME {User?.firstName || "User Not Found"}
      </h2>
    </div>
  );
};

export default Feed;
