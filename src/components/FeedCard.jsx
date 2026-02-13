import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/Constants";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
//import { motion } from "motion/react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// const FeedCard = ({ user }) => {
//   const { firstName, about, photoURL, age, gender, _id } = user;
//   //console.log(user);
//   const dispatch = useDispatch();

//   const fetch_feed = async (status, userId) => {
//     try {
//       await axios.post(
//         BASE_URL + "/request/send/" + status + "/" + userId,
//         {},
//         { withCredentials: true },
//       );
//       dispatch(removeFeed(userId));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (!user) return null;

//   return (
//     user && (
//       <div className="card bg-slate-800 h-full w-72 rounded-2xl ">
//         <div className="h-full">
//           <img
//             src={photoURL}
//             alt="ProfilePhoto"
//             className="rounded-t-2xl w-full h-64"
//           />
//         </div>

//         <div className="card-body">
//           <h2 className="card-title break-all text-xl font-bold">
//             {firstName || "Not Found"}
//           </h2>

//           {age && gender && (
//             <div className="flex flex-col gap-2">
//               <p>
//                 Age:<span className="font-semibold">{age}</span>
//               </p>
//               <p>
//                 Gender:<span className="font-semibold">{gender}</span>
//               </p>
//             </div>
//           )}

//           <p>{about}</p>

//           <div className="card-actions self-end mt-5">
//             <button
//               className="btn btn-outline btn-secondary"
//               onClick={() => fetch_feed("ignored", _id)}
//             >
//               Ignore
//             </button>

//             <button
//               className="btn btn-outline btn-primary"
//               onClick={() => fetch_feed("intrested", _id)}
//             >
//               Intrested
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };
const FeedCard = ({ user }) => {
  const { firstName, about, photoURL, age, gender, _id } = user;
  const dispatch = useDispatch();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);

  const fetch_feed = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 150) {
      fetch_feed("intrested", _id); // RIGHT SWIPE
    } else if (info.offset.x < -150) {
      fetch_feed("ignored", _id); // LEFT SWIPE
    }
  };

  if (!user) return null;

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: 400 }}
      transition={{ duration: 0.3 }}
      className="card bg-slate-800 w-72 rounded-2xl shadow-xl cursor-grab active:cursor-grabbing"
    >
      <img
        src={photoURL}
        alt="ProfilePhoto"
        className="rounded-t-2xl w-full h-64"
      />

      <div className="card-body">
        <h2 className="card-title break-all text-xl font-bold">
          {firstName || "Not Found"}
        </h2>

        {age && gender && (
          <div className="flex flex-col gap-2">
            <p>
              Age:<span className="font-semibold">{age}</span>
            </p>
            <p>
              Gender:<span className="font-semibold">{gender}</span>
            </p>
          </div>
        )}

        <p>{about}</p>
      </div>
    </motion.div>
  );
};

export default FeedCard;
