import React from "react";
import { Link } from "react-router-dom";

const DonorCard = ({ donor }) => {
  const { _id, name, email, photo, group, dateDiff, thana ,lastDate} = donor;
  const lastDonateDate = lastDate.slice(0,10);

  return (
    <div>
      <div className="card card-compact w-3/4 mx-auto md:w-72 
      shadow-md shadow-red-300 border-rose-200 border-2">
        <figure>
          <img src={photo} alt="Shoes" className="w-52 h-64 mt-2 rounded-md bg-cyan-200" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <h2 className="card-title">Blood Group: {group}</h2>
          <h3>{thana}</h3>
          <h3>Last Donated: {lastDonateDate}</h3>
          <div className="flex justify-between">
            <div className="card-actions justify-end">
              <button className="btn btn-primary">
                <Link to={`/singleDonor/${_id}`}>See Profile</Link>
              </button>
            </div>
            <div>
            <button className={`btn ${dateDiff>=90 ? "btn-accent": "btn-error"}`}>
                {
                  dateDiff>=90 ? "Available": "Not Available"
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorCard;
