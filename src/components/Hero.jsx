import React, { useEffect } from "react";
import hero from "../assets/beautiful-shot-waterfall-coming-down-from-mountains.jpg";
import "../styles/Animation.css"; // Include your animation styles
import { Link } from "react-router-dom";

import Navbar from "./Navbar";

export default function Hero() {
 

  return (
    <>
      <Navbar />
      <div className="relative h-screen w-full">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${hero})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t via-slate-900 from-black to-transparent via-70% opacity-60" />
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="text-4xl font-mansalva text-white px-4 fade-in mb-4">
            <span className="text-orange-500 font-masalva font-bold md:text-8xl text-5xl">
              Explore{" "}
            </span>
            .
            <span className="text-blue-500 font-masalva font-bold md:text-8xl text-5xl">
              Dream{" "}
            </span>
            .
            <span className="text-purple-500 font-masalva font-bold md:text-8xl text-5xl">
              Discover{" "}
            </span>
            .
          </p>
          <button className=" bg-blue-500 backdrop-blur-md text-white py-3 px-6 rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-md animate-bounce hover:shadow-lg ">
            <Link to="/create">Start your journey</Link>
          </button>
          {/* <button className="mt-6 bg-blue-500 backdrop-blur-md text-white py-3 px-6 rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg z-10 animate-bounce md:hidden block">
            <Link to="/create">Start Your Journey</Link>
          </button> */}
        </div>
      </div>
      
    </>
  );
}
