import React, { useContext, useEffect, useState } from 'react';
import { FaTrashAlt, FaUserShield, FaUserTie } from "react-icons/fa";
import useReq from '../../../Hooks/useReq';
import { AuthContext } from '../../../Providers/AuthProviders';
import { Link } from 'react-router-dom';
const Requests = () => {
    const { user } = useContext(AuthContext);
    const [allReq,loading] = useReq();
    const [filterData, setFilterData]= useState(null);
    useEffect(() => {
        if (!loading) {
          const data = allReq.filter(fReq=> fReq.seekerEmail === user?.email)
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
                    
                    <td><button className={`btn ${r.state==="requested"? "bg-[#f97316] text-white" : "bg-[#16a34a] text-white"}`}>{r.state==="requested"? "Requested" : "Accepted"}</button></td>
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

export default Requests;