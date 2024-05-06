import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const [userProfile, setUserProfile] = useState(null);
  const url = `http://localhost:5000/singleUsers/${user?.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => { 
        setUserProfile(data);
      });
  }, [url]);

  return (
    <div>
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
            <button className="btn-error text-white p-4 text-4xl  items-center rounded-xl">
              Edit Information
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
