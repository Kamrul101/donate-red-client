import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import DonorCard from "./DonorCard";
import { useLoaderData } from "react-router-dom";
// import DonorCard from './DonorCard';

const LookDonor = () => {
  const { user } = useContext(AuthContext);
  const [donors, setDonor] = useState([]);
  const { totalUsers } = useLoaderData();
  //pagination part  start
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(8);
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const pageNumbers = [...Array(totalPages).keys()];
  const options = [4, 8, 20];


    // Function to handle "Next" button click
    const handleNext = () => {
      setCurrentPage(prevPage => prevPage + 1);
    };
  
    // Function to handle "Previous" button click
    const handlePrevious = () => {
      setCurrentPage(prevPage => prevPage - 1);
    };

  const handleSelectChange = (event) => {
    setUsersPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };
  //pagination end
  
  const url = `http://localhost:5000/users?page=${currentPage}&limit=${usersPerPage}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDonor(data));
  }, [currentPage,usersPerPage]);

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
  <p>Current page: {currentPage}</p>
  {/* previous button */}
  <button
    className="btn border-red-400 mx-1"
    onClick={handlePrevious}
    disabled={currentPage === 0} // Disable if currentPage is already 0
  >
    Previous
  </button>
  {pageNumbers.map((number, index) => (
    <React.Fragment key={number}>
      {index === 0 || index === pageNumbers.length - 1 || Math.abs(number - currentPage) <= 2 ? (
        <button
          className={(currentPage === number ? "btn bg-red-500 text-white mx-1" : "btn border-red-400 mx-1")}
          onClick={() => setCurrentPage(number)}
        >
          {number + 1}
        </button>
      ) : index === 1 || index === pageNumbers.length - 2 ? (
        <span className="mx-1">...</span>
      ) : null}
    </React.Fragment>
  ))}
  
  {/* Next button */}
  <button
    className="btn border-red-400 mx-1"
    onClick={handleNext}
    disabled={currentPage === totalPages - 1} // Disable if currentPage is the last page
  >
    Next
  </button>
</div>

    </>
  );
};

export default LookDonor;
