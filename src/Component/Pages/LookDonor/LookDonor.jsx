import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import DonorCard from "./DonorCard";
import { useLoaderData } from "react-router-dom";
// import DonorCard from './DonorCard';

const LookDonor = () => {
  const { user } = useContext(AuthContext);
  const [donors, setDonor] = useState([]);
  const { totalUsers } = useLoaderData();

  const url = `http://localhost:5000/users`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDonor(data));
  }, []);

  //pagination part  start
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(8);
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const pageNumbers = [...Array(totalPages).keys()];
  const options = [5, 8, 20];

  const handleSelectChange = (event) => {
    setUsersPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };
  //pagination end
  return (
    <>
      <div className="my-5 w-full md:w-3/4 md:mx-auto">
      
        <h1 className="text-center text-4xl font-bold text-red-600 font-serif my-6">
          Our Donors
        </h1>
        <div className=" flex justify-end my-2">
        <p className="mx-5 font-semibold text-lg mt-2">Show Donors</p>
        <select className="select select-primary text-lg md:mr-10" value={usersPerPage} onChange={handleSelectChange}>

           {options.map((option) => (
             <option key={option} value={option}>
               {option}
             </option>
           ))}
         </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:justify-between">
          {donors.map((donor) => {
            return <DonorCard key={donor._id} donor={donor} />;
          })}
        </div>
      </div>
      <div className="text-center my-10">
        <p>current page: {currentPage}</p>
        {pageNumbers.map((number) => (
          <button
            className="btn"
            key={number}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        
      </div>
    </>
  );
};

export default LookDonor;
