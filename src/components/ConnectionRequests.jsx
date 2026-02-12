import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const ConnectionRequests = () => {
  const dispatch = useDispatch();
  const fetch_request = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {
        withCredentials: true,
      });
      //console.log(res?.data?.connectionRequest);
      dispatch(addRequest(res?.data?.connectionRequest));
    } catch (err) {
      console.log(err);
    }
  };
  const review_request = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetch_request();
  }, []);

  const request_data = useSelector((state) => state.request);
  console.log(request_data);

  if (!request_data) return;
  if (request_data.length === 0) {
    return (
      <h1 className="font-semibold text-lg min-h-screen flex justify-center items-center">
        No Pending Requests Found!!
      </h1>
    );
  }

  return (
    request_data && (
      <div className="px-4 sm:px-6 pb-40 flex flex-col  gap-4 justify-center pt-12">
        <h2 className="text-center font-semibold text-lg shadow-sm ">
          My Requests
        </h2>
        {request_data?.map((item) => {
          return (
            <div
              key={item?._id}
              className="max-w-2xl w-full mx-auto bg-base-300 rounded-xl shadow-md overflow-hidden p-5 flex flex-row items-center gap-6 md:gap-10"
            >
              <div>
                <img
                  className="w-18 h-18 md:w-20 md:h-20 rounded-full object-cover"
                  src={item?.fromUserId?.photoURL}
                  alt="Profile"
                />
              </div>

              <div className="flex-1 flex flex-col justify-center gap-1">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {item?.fromUserId?.firstName}
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                  {item?.fromUserId?.gender}({item?.fromUserId?.age}) years
                </p>
                <h3 className="text-gray-200 text-sm md:text-base">
                  {item?.fromUserId?.about}
                </h3>
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => review_request("accepted", item?._id)}
                >
                  Accepted
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => review_request("rejected", item?._id)}
                >
                  Rejected
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default ConnectionRequests;
