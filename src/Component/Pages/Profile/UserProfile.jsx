import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import useProfile from "../../../Hooks/useProfile";
import useReq from "../../../Hooks/useReq";

const UserProfile = () => {
  const [profile,loading] = useProfile();
  if(loading && profile=== null){
    return <div className="flex justify-center items-center h-screen">
    <div className="loading loading-ring loading-lg"></div>
</div>
  }
  const userProfile = profile[0];
  console.log(userProfile);
  

  return (
    <div className="md:w-3/4 md:mx-auto my-5">
      {userProfile && (
        <>
          <div className="grid grid-cols-2">
            <div>
              <img className="w-52" src={userProfile.photo}></img>
            </div>
            <div>
              <p className="font-bold text-xl">
                <span className="text-gray-500 font-semibold">Name:</span>{" "}
                {userProfile.name}
              </p>
              <p className="font-bold text-xl">
                <span className="text-gray-500 font-semibold">Email:</span>{" "}
                {userProfile.email}
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button 
            className={`btn text-xl font-bold  items-center rounded-xl ${userProfile.dateDiff>=90 ? "bg-green-600 text-white": "bg-gray-600 text-black"}`}
            disabled={userProfile.dateDiff>=90 ? false : true}
            >
              Donated Today
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
