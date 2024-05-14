import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import useProfile from '../../../Hooks/useProfile';
import useReq from '../../../Hooks/useReq';

const SingleDonor = () => {
    const singleDonor =  useLoaderData();
    const {user} = useContext(AuthContext);
    const [userProfile] = useProfile();
    // const [req] = useReq();
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
        contact
    } = singleDonorDetail;
    const [reqSent, setReqSent] = useState(false);
    const [req, setReq] = useState(null);
    const [loading, setLoading] = useState(true);
  const url = `http://localhost:5000/request/${_id}?email=${user.email}`;
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
    const handleClick= () =>{
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
      fetch("http://localhost:5000/request", {
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
    const lastDonateDate = lastDate.slice(0,10);
    return (
        <div className='md:w-3/4 md:mx-auto my-5'>
           <div className="grid grid-cols-2">
            <div>
              <img className="md:w-80" src={photo}></img>
            </div>
            <div>
              <p className="font-bold text-xl">
                <span className="text-gray-500 font-semibold">Name:</span>{" "}
                {name}
              </p>
              <p className="font-bold text-xl">
                <span className="text-gray-500 font-semibold">Blood Group:</span>{" "}
                {group}
              </p>
              <p className="font-bold text-xl">
                <span className="text-gray-500 font-semibold">Thana:</span>{" "}
                {thana}
              </p>
              <p className="font-bold text-xl">
                <span className="text-gray-500 font-semibold">Name:</span>{" "}
                {name}
              </p>
              <p className="font-bold text-xl">
                <span className="text-gray-500 font-semibold">Email:</span>{" "}
                {email}
              </p>
              <p className="font-bold text-xl">
                <span className="text-gray-500 font-semibold">Last Donated:</span>{" "}
                {lastDonateDate} <span>({parseInt(dateDiff)} days ago..)</span>
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className={`btn text-white text-3xl  items-center rounded-xl ${dateDiff>=90 ? "btn-accent": "btn-error"}`}
            onClick={handleClick}
            disabled={reqSent}
            >
            {
                  dateDiff>=90 ? (reqSent ? "Request Sent" : "Send Request"): "Not Available"
            }
            </button>
          </div>
        </div>
    );
};

export default SingleDonor;