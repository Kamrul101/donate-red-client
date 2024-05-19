import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import useProfile from '../../../Hooks/useProfile';


const SingleDonor = () => {
    const singleDonor =  useLoaderData();
    const {user} = useContext(AuthContext);
    const [userProfile] = useProfile();
    const singleDonorDetail = singleDonor[0];
    const {
        _id,
        name,
        email,
        photo,
        group,
        dateDiff,
        thana,
        lastDate,
        contact,
        district
    } = singleDonorDetail;
    const [reqSent, setReqSent] = useState(false);
    const [req, setReq] = useState(null);
    const [loading, setLoading] = useState(true);
  const url = `https://donate-red-server.vercel.app/request/${_id}?email=${user?.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setReq(data);
        setLoading(false);
      });
  }, [url]);
  
  useEffect(() => {
    
    if (!loading && req.statusReq === true) {
      setReqSent(true);
    }
  }, [req, loading]); // Empty dependency array ensures this runs only once on mount
  const handleClick = async () => {
    if (dateDiff >= 90 && !reqSent) {
      // Send the blood donation request
      await sendRequest();
      const  message='Someone requested your blood donation';
      // Send the notification to the donor
      await sendNotification(email,message) ;
      
      // Update state to indicate that the request has been sent
      setReqSent(true);
    }
  };
  
  const sendRequest= () =>{
      const reqData = {
        seekerEmail : user?.email,
        donorID: _id,
        donorName: name,
        statusReq : true,
        donorPhoto: photo,
        donorEmail: email,
        state: "requested",
        donorContact: contact
      };
      fetch("https://donate-red-server.vercel.app/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response as needed
      if (data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Request to donate is send",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setReqSent(true);
    })
    .catch(error => {
      console.error("Error:", error);
    });
    
    }
    const sendNotification = async (email, message) => {
      await fetch('https://donate-red-server.vercel.app/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });
    };
    const lastDonateDate = lastDate.slice(0,10);
    return (
        <div className='md:w-3/4 md:mx-auto my-2 md:my-5'>
           <div className="md:w-1/2 bg-base-700 shadow-slate-400 shadow-2xl md:mx-auto rounded-lg">
            <figure className='flex justify-center'>
              <img className="md:w-56 md:mt-5 md:mx-auto rounded-lg bg-slate-300" src={photo}></img>
           </figure>
            <div className='card-body  md:text-center font-serif'>
              <p className="font-bold text-2xl">
                
                {name}
              </p>
              <p className="font-bold text-lg md:text-xl">
                <span className="text-gray-500 font-semibold">Blood Group:</span>{" "}
                {group}
              </p>
              <p className="font-bold text-lg md:text-xl">
                <span className="text-gray-500 font-semibold">Address:</span>{" "}
                {thana}, {district}
              </p>
              
              <p className="font-bold text-lg md:text-xl">
                <span className="text-gray-500 font-semibold">Email:</span>{" "}
                {email}
              </p>
              <p className="font-bold text-lg md:text-xl">
                <span className="text-gray-500 font-semibold">Contact:</span>{" "}
                <span className='text-red-400'>{reqSent?(req?.state==="accepted"? contact :"Please wait until accept"):"Send request to get contact"}</span>
                
                
                
              </p>
              <p className="font-bold text-lg md:text-xl">
                <span className="text-gray-500 font-semibold">Last Donated:</span>{" "}
                {lastDonateDate} <span>({parseInt(dateDiff)} days ago..)</span>
              </p>
            </div>
          <div className="mb-5 flex justify-center">
            <button className={`btn text-white text-3xl mb-5 items-center rounded-xl ${dateDiff>=90 ? "btn-success": "btn-error"}`}
            onClick={handleClick}
            disabled={reqSent}
            >
            {
                  dateDiff>=90 ? (reqSent ? "Request Sent" : "Send Request"): "Not Available"
            }
            </button>
          </div>
          </div>
        </div>
    );
};

export default SingleDonor;