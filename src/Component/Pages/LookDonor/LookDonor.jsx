import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';
import DonorCard from './DonorCard';
// import DonorCard from './DonorCard';

const LookDonor = () => {
    const { user } = useContext(AuthContext);
  const [donors, setDonor] = useState([]);
  const url = `http://localhost:5000/users`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDonor(data));
  }, []);
  
    return (
        <div>
            <h1 className='text-center text-4xl font-bold text-red-600 font-serif my-6'>Our Donors</h1>
            <div className='grid grid-cols-3'>
                {
                donors.map(donor =>{ return <DonorCard key = {donor._id}donor = {donor}/>
                    
                })
            }
            </div>
            
        </div>
    );
};

export default LookDonor;