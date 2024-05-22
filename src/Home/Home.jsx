import React from 'react';
import Slider from '../Component/Shared/Slider/Slider';
import Banner from '../Component/Shared/Banner/Banner';
import Gallery from '../Component/Shared/Gallery/Gallery';



const Home = () => {
    return (
        <div className='md:w-3/4 md:mx-auto'>
            <Banner></Banner>
            <div><Slider></Slider></div>
            <Gallery></Gallery>
            
        </div>
    );
};

export default Home;