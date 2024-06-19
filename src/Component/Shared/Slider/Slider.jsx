import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const slider1 = "https://i.ibb.co/ctVpS5q/2148483283.jpg";
const slider2 = "https://i.ibb.co/PxmzQ6C/8491.jpg";
const slider3 = "https://i.ibb.co/bgtqPfS/2151034061.jpg";
// const slider4 = "https://i.ibb.co/ZYrvvYw/Whats-App-Image-2023-07-13-at-21-48-09.jpg";

const Slider = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper rounded-lg"
    >
      <SwiperSlide>
        <div className="flex flex-col lg:flex-row justify-between items-center bg-[#ffe8e8]  p-2 ">
          <img className="w-full lg:w-1/2 rounded-lg mr-0 md:mr-4" src={slider1} />
          <div>
            <p className="text-xl md:text-3xl text-justify">
            রক্তদান স্বাস্থ্যের জন্য অত্যন্ত উপকারী। রক্তদান করার সঙ্গে সঙ্গে শরীরের মধ্যে অবস্থিত ‘বোন ম্যারো’ নতুন কণিকা তৈরির জন্য উদ্দীপ্ত হয় এবং রক্তদানের ২ সপ্তাহের মধ্যে নতুন রক্তকণিকার জন্ম হয়ে ঘাটতি পূরণ হয়ে যায়।
            </p>
            <button className="btn bg-gradient-to-r from-rose-400 from-10% via-red-400 via-30% to-red-400 to-90% border-0 text-white md:text-2xl my-2 md:mt-6">
            <a href="https://bn.wikipedia.org/wiki/%E0%A6%B0%E0%A6%95%E0%A7%8D%E0%A6%A4%E0%A6%A6%E0%A6%BE%E0%A6%A8" target="_blank">Explore More </a>
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col lg:flex-row justify-between items-center bg-[#ffe8e8]  p-2">
          <img className="w-full lg:w-1/2 rounded-lg mr-0 md:mr-4" src={slider2} />
          <div>
            <p className="text-xl md:text-3xl text-justify">
            বছরে ৩ বার রক্তদান আপনার শরীরে লোহিত কণিকাগুলোর প্রাণবন্ততা বাড়িয়ে তোলার সাথে সাথে নতুন কণিকা তৈরির হার বাড়িয়ে দেয়। উল্লেখ্য রক্তদান করার মাত্র ৪৮ ঘণ্টার মধ্যেই দেহে রক্তের পরিমাণ স্বাভাবিক হয়ে যায়।
            </p>
            <button className="btn bg-gradient-to-r from-rose-400 from-10% via-red-400 via-30% to-red-400 to-90% border-0 text-white md:text-2xl my-2 md:mt-6">
            <a href="https://bn.wikipedia.org/wiki/%E0%A6%AC%E0%A6%BF%E0%A6%B6%E0%A7%8D%E0%A6%AC_%E0%A6%B0%E0%A6%95%E0%A7%8D%E0%A6%A4%E0%A6%A6%E0%A6%BE%E0%A6%A4%E0%A6%BE_%E0%A6%A6%E0%A6%BF%E0%A6%AC%E0%A6%B8" target="_blank">Explore More </a>
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex flex-col lg:flex-row justify-between items-center bg-[#ffe8e8] p-2">
          <img className="w-full lg:w-1/2 rounded-lg mr-0 md:mr-4" src={slider3} />
          <div>
            <p className="text-xl md:text-3xl text-justify">
            ১৮ বছর থেকে ৬০ বছরের যেকোনো সুস্থদেহের মানুষ রক্ত দান করতে পারবেন | আপনার ওজন অবশ্যই ৫০ কিলোগ্রাম কিংবা তার বেশি হতে হবে। সাধারণত ৯০ দিন পর পর, অর্থাৎ তিন মাস পর পর রক্ত দেওয়া যাবে।

            </p>
            <button className="btn bg-gradient-to-r from-rose-400 from-10% via-red-400 via-30% to-red-400 to-90% border-0 text-white md:text-2xl my-2 md:mt-6">
              <a href="https://www.bbc.com/bengali/news-44485273" target="_blank">Explore More </a>
            </button>
          </div>
        </div>
      </SwiperSlide>
      
    </Swiper>
  );
};

export default Slider;
