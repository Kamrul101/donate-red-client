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
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle "Previous" button click
  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSelectChange = (event) => {
    setUsersPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };
  //pagination end

  const [group, setGroup] = useState('');
  const [thana, setThana] = useState('');

  const url = `http://localhost:5000/users?page=${currentPage}&limit=${usersPerPage}&group=${group}&thana=${thana}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDonor(data));
  }, [currentPage, usersPerPage, group, thana]);

  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    if (name === 'group') {
      setGroup(value);
    } else if (name === 'thana') {
      setThana(value);
    }
  };
  console.log(group, thana);

  return (
    <>
      <div className="my-5 w-full md:w-3/4 md:mx-auto">
        <h1 className="text-center text-4xl font-bold text-red-600 font-serif my-6">
          Our Donors
        </h1>
        <div>
          <div className="join">
            <select name="group" value={group} onChange={handleDropdownChange} className="select select-primary join-item">
              <option disabled selected>
                Blood Group
              </option>
              <option value="A Positive">A Positive</option>
              <option value="A Negative">A Negative</option>
              <option value="B Positive">B Positive</option>
              <option value="B Negative">B Negative</option>
              <option value="AB Positive">AB Positive</option>
              <option value="AB Negative">AB Negative</option>
              <option value="O Positive">O Positive</option>
              <option value="O Negative">O Negative</option>
            </select>
            <select
              name="thana" value={thana} onChange={handleDropdownChange}
              className="select select-primary w-full join-item"
              // value={formData.thana}
              // onChange={handleChange}
            >
              <option disabled selected>Select Thana</option>
              <option value="Ramna Model Thana">Ramna Model Thana</option>
              <option value="Motijheel Thana">Motijheel Thana</option>
              <option value="Dhanmondi Thana">Dhanmondi Thana</option>
              <option value="Mirpur Thana">Mirpur Thana</option>
              <option value="Pallabi Thana">Pallabi Thana</option>
              <option value="Kafrul Thana">Kafrul Thana</option>
            </select>
          </div>
          <div className=" flex justify-end my-2">
            <p className="mx-5 font-semibold text-lg mt-2">Show Donors</p>
            <select
              className="select select-primary text-lg md:mr-10"
              value={usersPerPage}
              onChange={handleSelectChange}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
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
            {index === 0 ||
            index === pageNumbers.length - 1 ||
            Math.abs(number - currentPage) <= 2 ? (
              <button
                className={
                  currentPage === number
                    ? "btn bg-red-500 text-white mx-1"
                    : "btn border-red-400 mx-1"
                }
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
