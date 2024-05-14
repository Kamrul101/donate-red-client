import React, { useContext, useEffect, useState } from 'react';
import useReq from '../../../Hooks/useReq';
import { AuthContext } from '../../../Providers/AuthProviders';
import { Link } from 'react-router-dom';
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const DonateRequest = () => {

    const { user } = useContext(AuthContext);
    const [allReq,loading] = useReq();
    const [filterData, setFilterData]= useState(null);
    useEffect(() => {
        if (!loading) {
          const data = allReq.filter(fReq=> fReq.donorEmail === user?.email)
          setFilterData(data);
        }
      }, [allReq, loading]);
      console.log(filterData);
      if(filterData === null){
        return <div>Loading..</div>
      }
    return (
        <div className='md:w-3/4 md:mx-auto my-5 border-2 border-red-200 rounded' >
         <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>State</th>
              <th>Donor Profile</th>
            </tr>
          </thead>
          <tbody>
          {
                filterData.map((r,index) =><tr key={r._id}>
                    <th>{index+1}</th>
                    <td><div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={r.donorPhoto}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div></td>
                    <td>{r.donorName}</td>
                    <td>{r.donorEmail}</td>
                    <td>{r.state  === "requested"? (<div><button className='btn bg-green-700 text-white hover:text-black text-xl'><FaCheck />  </button> <button className='btn bg-red-500 text-white hover:text-black text-xl'>
                        <FaXmark/></button></div>): (r.state===accepted ?<button>Accepted</button>: <button > Rejected</button>) }</td>
                    <td><button className="btn btn-primary">
                <Link to={`/singleDonor/${r.donorID}`}>See Profile</Link>
              </button></td>
                  </tr>)
            }
            
           
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default DonateRequest;