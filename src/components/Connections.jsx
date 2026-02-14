import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import spinner from "../assets/spinner.gif";

const Connections = () => {
  const connection_data = useSelector((state) => state.connection);
  //console.log(connection_data);
  const dispatch = useDispatch();

  const fetc_Connections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      //console.log(res?.data?.data);

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetc_Connections();
  }, []);
  if (!connection_data)
    return (
      <h1 className="h-screen flex justify-center items-center">
        <img src={spinner} className="size-16" />
      </h1>
    );
  if (connection_data.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-base-200 shadow-xl rounded-2xl p-8 text-center max-w-md w-full border border-base-300">
          <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            No Connection Requests
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-400">
            You don’t have any pending connection requests right now. When
            someone sends you one, it will appear here.
          </p>
        </div>
      </div>
    );
  return (
    connection_data && (
      <div className="px-4 sm:px-6 flex flex-col pb-40  gap-4 justify-center pt-12">
        <h2 className="text-center font-semibold text-lg shadow-sm ">
          My Connections
        </h2>
        {connection_data?.map((item) => {
          return (
            <div
              key={item?._id}
              className="max-w-4xl w-full flex-1 mx-auto  bg-base-300 rounded-xl shadow-md overflow-hidden p-5 flex flex-row items-center md:items-start gap-10 md:gap-12"
            >
              <div>
                <img
                  className="w-24 h-24 md:w-20 md:h-20 rounded-full object-cover"
                  src={item?.photoURL}
                  alt="Profile"
                />
              </div>

              <div className="flex flex-col justify-center text-left gap-1">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {item?.firstName}
                </h2>

                {item?.age && item?.gender && (
                  <p className="text-gray-400 text-sm md:text-base">
                    {item?.gender}( {item?.age}Years)
                  </p>
                )}

                <h3 className="text-gray-200 text-sm md:text-base">
                  {item?.about}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Connections;
