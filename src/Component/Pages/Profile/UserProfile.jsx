import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import useProfile from "../../../Hooks/useProfile";
import useReq from "../../../Hooks/useReq";
import Swal from "sweetalert2";
import Notifications from "../../../Notifications/Notifications";

const UserProfile = () => {
  const [profile,loading] = useProfile();
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    if (profile && profile.length > 0) {
      setUserProfile(profile[0]);
    }
  }, [profile]);
  if(loading || profile=== null){
    return <div className="flex justify-center items-center h-screen">
    <div className="loading loading-ring loading-lg"></div>
</div>
  }
  
  
  const handleClick = () => {
    fetch(`https://donate-red-server.vercel.app/user/${userProfile._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: userProfile.email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Donation date updated and requests deleted",
                showConfirmButton: false,
                timer: 1500,
            });
            // Update the local state to reflect the change
            setUserProfile(prevProfile => ({
                ...prevProfile,
                lastDate: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
                dateDiff: 0  // Resetting the date difference to 0 as the user donated today
            }));
            
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to update donation date and delete requests",
                showConfirmButton: false,
                timer: 1500,
            });
        }
      })
      
      .catch(error => {
        console.error("Error updating donation date and deleting requests:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "An error occurred",
          showConfirmButton: false,
          timer: 1500,
        });
      });
};

  return (
    <div className="md:w-3/4 md:mx-auto my-5">
      
      {userProfile && (
        <>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-2 font-serif">
            <div className="mx-2 p-4 rounded-md bg-red-100 shadow-slate-400 shadow-xl">
              <img className="mx-auto w-52 rounded-lg" src={userProfile.photo}></img>
              <p className="font-bold text-center text-2xl uppercase mt-4">
                <span className="text-gray-500 font-semibold text-2xl"></span>{" "}
                {userProfile.name}
              </p>
            </div>
            <div className="bg-red-100 p-8 rounded-lg shadow-slate-400 shadow-xl mx-2">
              <p className="font-bold text-xl py-2 text-center">Contact Information</p>
              <p className="font-bold text-xl py-2">
                <span className="text-gray-500 font-semibold">Email:</span>{" "}
                {userProfile.email}
              </p>
              <p className="font-bold text-xl py-2">
                <span className="text-gray-500 font-semibold">Contact:</span>{" "}
                {userProfile.contact}
              </p>
              <p className="font-bold text-xl py-2">
                <span className="text-gray-500 font-semibold">Date of Birth:</span>{" "}
                {userProfile.date}
              </p>
              <p className="font-bold text-xl py-2">
                <span className="text-gray-500 font-semibold">Address:</span>{" "}
                {userProfile.thana}{", "}{userProfile.district}
              </p>
              <Notifications/>
            </div>
            <div className="bg-red-100 p-10 rounded-lg shadow-slate-400 shadow-xl mx-2">
            <p className="font-bold text-xl py-2 text-center">Blood Information</p>
              <p className="font-bold text-xl py-2">
                <span className="text-gray-500 font-semibold">Blood Group:</span>{" "}
                {userProfile.group}
              </p>
              <p className="font-bold text-xl py-2">
                <span className="text-gray-500 font-semibold">Gender:</span>{" "}
                {userProfile.gender}
              </p>
              
              <p className="font-bold text-xl py-2">
                <span className="text-gray-500 font-semibold">Last Donated:</span>{" "}
                {userProfile.lastDate.slice(0,10)}
              </p>
              <p className="font-bold text-xl py-2">
                <span className="text-gray-500 font-semibold">Any physical issue:</span>{" "}
                {userProfile.issue}
              </p>
              <div className="mt-6 flex justify-center">
            <button 
            className={`btn text-xl font-bold shadow-slate-400 shadow-2xl  items-center rounded-xl ${userProfile.dateDiff>=90 ? "bg-green-600 text-white": "bg-gray-600 text-black"}`}
            disabled={userProfile.dateDiff>=90 ? false : true}
            onClick={handleClick}
            >
              Donated Today
            </button>
          </div>
            </div>
            
          </div>
          
        </>
      )}
      <p className="text-center my-5 text-red-600 font-semibold">***If you haven't enabled notification yet please enable to find out who sent you request</p>
    </div>
  );
};

export default UserProfile;
