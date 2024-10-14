import React from "react";

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button className="mr-4 lg:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <a
            href="#home"
            className="flex items-center"
            onClick={() => scrollToSection("home")}
          >
            <img
              src="/path-to-your-logo.png"
              alt="Logo"
              className="h-8 w-8 mr-2"
            />
            <span className="text-xl font-semibold">YourWebsite.com</span>
          </a>
        </div>
        <div className="hidden lg:flex items-center space-x-6">
          <a
            href="#home"
            className="hover:text-gray-200"
            onClick={() => scrollToSection("home")}
          >
            Home
          </a>
          <a
            href="#services"
            className="hover:text-gray-200"
            onClick={() => scrollToSection("services")}
          >
            Services
          </a>
          <a
            href="#payment"
            className="hover:text-gray-200"
            onClick={() => scrollToSection("payment")}
          >
            Payments
          </a>
          <a
            href="#appointments"
            className="hover:text-gray-200"
            onClick={() => scrollToSection("appointments")}
          >
            Appointments
          </a>
          <a
            href="#about"
            className="hover:text-gray-200"
            onClick={() => scrollToSection("about")}
          >
            About
          </a>
          <a
            href="#profile"
            className="hover:text-gray-200"
            onClick={() => scrollToSection("profile")}
          >
            My profile
          </a>
          <button className="text-gray-300 hover:text-white">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scrollToSection("login")}
            className="px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Log in
          </button>
          <button
            onClick={() => scrollToSection("register")}
            className="bg-yellow-500 text-blue-900 px-4 py-2 rounded hover:bg-yellow-400 transition duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
