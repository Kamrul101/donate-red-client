import React from 'react';

const img1 ='https://i.ibb.co/ZLVBWgf/1.jpg'

const img4 = 'https://i.ibb.co/bmrw5xs/4.jpg'
const img5 = 'https://i.ibb.co/vJTSsQn/5.jpg'
const img6 = 'https://i.ibb.co/6g2r8yh/6.jpg'
const img10 = 'https://i.ibb.co/vBvwvVg/10.jpg'
const img11 = 'https://i.ibb.co/f18Gvpp/11.jpg'
const img12 = 'https://i.ibb.co/FgxPGdb/12.jpg'
const img13 = 'https://i.ibb.co/J2njbV0/13.jpg'



const Gallery = () => {
    return (
        <div className='my-10'>
            <h1 className='text-4xl font-serif font-semibold py-5 text-center'>Happy <span className='text-red-500'>Donors</span> </h1>
            <div className='grid grid-cols-1 gap-4 bg-[#e3fdf8] p-4 rounded-lg'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                    <img className='rounded md:w-72 donor-images' src={img5} alt="" />
                    <img className='rounded md:w-72 donor-images' src={img1} alt="" />
                    <img className='rounded md:w-72 donor-images' src={img4} alt="" />
                    <img className='rounded md:w-72 donor-images' src={img13} alt="" />
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                    <img className='rounded md:w-72 donor-images' src={img10} alt="" />
                    <img className='rounded md:w-72 donor-images' src={img12} alt="" />
                    <img className='rounded md:w-72 donor-images' src={img11} alt="" />
                    <img className='rounded md:w-72 donor-images' src={img6} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Gallery;