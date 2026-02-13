import React, { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "Select a Gender");
  const [about, setAbout] = useState(user.about);
  const [photoURL, setPhotoURL] = useState(
    user.photoURL ||
      "https://tse4.mm.bing.net/th/id/OIP.Yh_Zd0cdrtxGpEjqC0tq6QHaHa?pid=Api&P=0&h=180",
  );
  const [err, setErr] = useState("");

  const dispatch = useDispatch();

  const hanldeEdit = async () => {
    try {
      setErr("");
      const res = await axios.put(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, photoURL, about },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      toast.success("Profile Update Sucessfully!!");
      console.log(res?.data?.data);
    } catch (err) {
      console.log(err.reponse);
      setErr(err.response.data);
    }
  };

  return (
    <div className="card bg-base-300 w-full max-w-5xl mx-auto p-6 ">
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="flex-1">
          <h2 className="card-title justify-center mb-6 text-xl">
            Edit Profile
          </h2>

          <div className="space-y-4 md:space-y-1 px-1 md:px-10">
            <label className="flex flex-col gap-2">
              <span className="font-semibold">First Name</span>
              <input
                type="text"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-semibold">Last Name</span>
              <input
                type="text"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-semibold">Age</span>
              <input
                type="number"
                className=" input input-bordered  w-full"
                value={age}
                min="18"
                max="70"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-semibold">Gender</span>

              <select
                className="select w-full "
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled={true}>Select a Gender</option>
                <option>male</option>
                <option>female</option>
                <option>others</option>
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-semibold">Photo URL</span>
              <input
                type="text"
                className="input input-bordered w-full"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-semibold">About</span>

              <textarea
                className="textarea textarea-sm w-full"
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </label>
            <p className="text-red-600 font-semibold">{err}</p>

            <div className="flex justify-center pt-4">
              <button
                onClick={hanldeEdit}
                className="btn btn-primary w-full sm:w-auto"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <FeedCard
            user={{ firstName, lastName, age, gender, about, photoURL }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
