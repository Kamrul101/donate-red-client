import React from 'react';
import { Link } from 'react-router-dom';
const img1 = "https://i.ibb.co/nbbScDz/9013696.jpg"

const Banner = () => {
    return (
        <div className="bg-[#ecfeff] p-2 rounded-lg mb-5 mt-5 mx-2 md:mx-auto">
  <div className="flex flex-col lg:flex-row items-center gap-3">
    <img src={img1} className="rounded-lg shadow-2xl lg:w-1/2 w-full h-1/2 lg:mr-8 " />
    <div>
      <h1 className="text-5xl font-bold">Welcome to <span className='text-red-500'>Donate Red</span></h1>
      <p className="py-6 text-justify">যোগ দিন আমাদের সাথে একটি মূল্যবান  জীবন বাঁচাতে – প্রতিটি রক্তদানই মূল্যবান। একসাথে, আমরা পরিবর্তন আনতে পারি!</p>
      <button className="btn bg-gradient-to-r from-rose-400 from-10% via-red-400 via-30% to-red-400 to-90% text-white"><Link to='/lookDonor'>Look for Donors</Link></button>
    </div>
  </div>
</div>
    );
};

export default Banner;