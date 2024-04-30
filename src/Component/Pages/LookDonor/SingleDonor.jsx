import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleDonor = ({params}) => {
    const singleDonorDetail =  useLoaderData();
    const {
        _id,
        name,
        email,
        photo,
        group,
        dateDiff,
        thana,
        lastDate,
        

    } = singleDonorDetail;
    
    console.log(singleDonorDetail);
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
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className={`btn text-white text-3xl  items-center rounded-xl ${dateDiff>=90 ? "btn-accent": "btn-error"}`}>
            {
                  dateDiff>=90 ? "Send request": "Not Available"
                }
            </button>
          </div>
        </div>
    );
};

export default SingleDonor;