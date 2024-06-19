import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProviders';
import Swal from 'sweetalert2';
import useProfile from '../../../Hooks/useProfile';
import GoogleMapReact from 'google-map-react';
import { FaMapMarker, FaMapMarkerAlt } from "react-icons/fa";
import { googleMapApi } from './googleMap';
const AnyReactComponent = ({ text }) => <div className='text-red-600 text-2xl'>{text}</div>;

const SingleDonor = () => {

    const singleDonor =  useLoaderData();
    const {user} = useContext(AuthContext);
    const [userProfile,loading] = useProfile();
    const singleDonorDetail = singleDonor[0];
    const {
      _id, name, email, photo, group, dateDiff, thana,lastDate, contact, district
    } = singleDonorDetail;
    const [reqSent, setReqSent] = useState(false);
    const [req, setReq] = useState(null);
    const [profile, setProfile] = useState(null);
    const [reqLoading, setReqLoading] = useState(true);
    const url = `https://donate-red-server.vercel.app/request/${_id}?email=${user?.email}`;
    useEffect(() => {
      fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setReq(data);
        setReqLoading(false);
      });
  }, [url]);
  
 
  useEffect(() => {
    if (!reqLoading && req.statusReq === true) {
      setReqSent(true);
    }
  }, [req, reqLoading]); // Empty dependency array ensures this runs only once on mount




 const defaultProps = {
    center: {
      lat:singleDonorDetail.latitude,
      lng:singleDonorDetail.longitude
    },
    zoom: 16
  };
  

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
  useEffect(() => {
    if (!loading) {
      setProfile(userProfile[0]);
    }
  }, [loading]);
  if(loading || profile=== null){
    return <div className="flex justify-center items-center h-screen">
    <div className="loading loading-ring loading-lg"></div>
</div>
  }
  
  
  const sendRequest= () =>{
      const reqData = {
        seekerEmail : user?.email,
        donorID: _id,
        donorName: name,
        statusReq : true,
        donorPhoto: photo,
        donorEmail: email,
        state: "requested",
        donorContact: contact,
        seekerName: profile.name,
        seekerPhoto: profile.photo,
        seekerID  : profile._id

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
        <div className='md:w-3/4 md:mx-auto my-2 md:my-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
           
           <div className="bg-base-700 shadow-slate-400 shadow-2xl md:mx-auto rounded-lg">
            <figure className='flex justify-center'>
              <img className="lg:w-56 md:mt-5 md:mx-auto rounded-lg bg-slate-300" src={photo}></img>
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
                <span className='text-red-400'>{reqSent?(req?.state==="accepted"? email :"Please wait until accept"):"Send request to get Email"}</span>
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
          <div className='mt-6 shadow-slate-400 shadow-2xl ' style={{ height: '75vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapApi }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text={<FaMapMarkerAlt/>}
        />
      </GoogleMapReact>
    </div>
          
        </div>
    );
};

export default SingleDonor;