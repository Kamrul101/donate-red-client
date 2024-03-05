import React from "react";

const DonorCard = ({donor}) => {
    const {
        _id,
        name,
        email,
        photo
    } = donor;
    
  return (
    <div >
        <div className="card card-compact w-3/4 mx-auto md:w-64 bg-base-100 shadow-xl border-red-600 border-2">
      <figure>
        <img
          src={photo}
          alt="Shoes"
          className="w-42 h-48"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Email: {email}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">See Profile</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DonorCard;
