import React, { useContext, useEffect, useState } from 'react';
import useReq from '../../../Hooks/useReq';
import { AuthContext } from '../../../Providers/AuthProviders';
import { Link } from 'react-router-dom';
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Swal from 'sweetalert2';

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
      const handleUpdateState = (id, newState) => {
        if (newState === "rejected") {
            fetch(`https://donate-red-server.vercel.app/request/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setFilterData(prevData =>
                        prevData.filter(req => req._id !== id)
                    );
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Request Rejected and Removed",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        } else {
            fetch(`https://donate-red-server.vercel.app/request/${id}/state`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ state: newState })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setFilterData(prevData =>
                        prevData.map(req =>
                            req._id === id ? { ...req, state: newState } : req
                        )
                    );
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Request ${newState}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }
    };
      if(filterData === null){
        return <div className="flex justify-center items-center h-screen">
        <div className="loading loading-ring loading-lg"></div>
    </div>
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
                    <td>{r.seekerEmail}</td>
                    <td>{r.state  === "requested"? (<div>
                    <button 
                    className='btn bg-green-700 text-white hover:text-black text-xl'
                    onClick={() => handleUpdateState(r._id, "accepted")}
                    ><FaCheck /></button> 
                    <button 
                    className='btn bg-red-500 text-white hover:text-black text-xl'
                    onClick={() => handleUpdateState(r._id, "rejected")}>
                    <FaXmark/></button>
                    </div>):(r.state==="accepted" ?<button className='btn bg-green-700 text-white'>Accepted</button>: <button className='btn btn-error' > Rejected</button>) }</td>
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