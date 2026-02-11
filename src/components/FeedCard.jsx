import React from "react";

const FeedCard = ({ user }) => {
  const { firstName, about, photoURL, age, gender } = user;
  //console.log(user);

  return (
    <div className="card bg-slate-800 h-full w-80">
      <div className="">
        <img
          src={
            photoURL ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt="ProfilePhoto"
          className="rounded-t-md w-full h-48"
        />
      </div>
      <div className="card-body">
        <h2 className="card-title break-all text-xl font-bold">
          {firstName || "Not Found"}
        </h2>
        {age && gender && (
          <div className="flex flex-col gap-4">
            <p>
              Age:<span className="font-semibold">{age}</span>
            </p>{" "}
            <p>
              Gender:<span className="font-semibold">{gender}</span>
            </p>
          </div>
        )}
        <p>{about}</p>
        <div className="card-actions self-end mt-5">
          <button className="btn btn-outline btn-secondary">Ignore</button>
          <button className="btn btn-outline btn-primary">Intrested</button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
