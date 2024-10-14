import React from "react";

const Home = () => {
  return (
    <div id="home" className="relative h-screen w-full overflow-hidden">
      <img
        src="/bg.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-6xl font-bold mb-4">Appointment Booked</h1>
        <p className="text-xl mb-8">
          Your appointment is confirmed for October 15th at 2:00 PM
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out">
          View Details
        </button>
      </div>
    </div>
  );
};

export default Home;
