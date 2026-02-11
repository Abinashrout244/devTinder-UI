import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import FeedCard from "./FeedCard";

const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    user && (
      <div className="flex pt-5 pb-20 w-full h-full px-5  justify-center items-center gap-2 rouned-lg">
        {/* <div className="card lg:card-side bg-base-100 shadow-sm">
          <figure>
            <EditProfile user={user} />
          </figure>
          <div className="card-body bg-base-300">
            <FeedCard user={user} />
          </div>
        </div> */}
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
