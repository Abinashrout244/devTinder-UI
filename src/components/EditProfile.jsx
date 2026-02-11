import React, { useState } from "react";
import FeedCard from "./FeedCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoURL, setPhotoURL] = useState(user.photoURL);

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
                defaultValue={"Select a Gender"}
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

            <div className="flex justify-center pt-4">
              <button className="btn btn-primary w-full sm:w-auto">
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
