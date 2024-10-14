import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Left section with logo */}
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="HealthPlus Logo" className="h-16" />
          <div className="text-left">
            <h3 className="text-xl font-bold">HEALTHPLUS</h3>
            <p className="text-sm">HEALTH SERVICE</p>
          </div>
        </div>

        {/* Middle section with contact info and social media icons */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-6 text-white">
            <div className="flex items-center space-x-2">
              <span>📞</span>
              <p id="phone" className="hover:underline cursor-pointer">
                123 456-7890
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span>📠</span>
              <p id="fax" className="hover:underline cursor-pointer">
                123 456-7890
              </p>
            </div>
          </div>
          <div className="text-sm">
            <span>Social Media</span>
          </div>
          <div className="flex space-x-4">
            {/* Social Media Icons (replace with actual icons or SVGs) */}
            <span id="facebook" className="hover:text-gray-300 cursor-pointer">
              📘
            </span>{" "}
            {/* Facebook */}
            <span id="twitter" className="hover:text-gray-300 cursor-pointer">
              🐦
            </span>{" "}
            {/* Twitter */}
            <span id="linkedin" className="hover:text-gray-300 cursor-pointer">
              🔗
            </span>{" "}
            {/* LinkedIn */}
            <span id="youtube" className="hover:text-gray-300 cursor-pointer">
              ▶️
            </span>{" "}
            {/* YouTube */}
            <span id="instagram" className="hover:text-gray-300 cursor-pointer">
              📷
            </span>{" "}
            {/* Instagram */}
            <span id="pinterest" className="hover:text-gray-300 cursor-pointer">
              📌
            </span>{" "}
            {/* Pinterest */}
            <span id="rss" className="hover:text-gray-300 cursor-pointer">
              📡
            </span>{" "}
            {/* RSS */}
          </div>
        </div>
      </div>

      {/* Bottom section with links */}
      <div className="border-t border-blue-400 mt-8 pt-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-100">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <span id="about-us" className="hover:underline cursor-pointer">
              ABOUT US
            </span>
            <span id="contact-us" className="hover:underline cursor-pointer">
              CONTACT US
            </span>
            <span id="help" className="hover:underline cursor-pointer">
              HELP
            </span>
            <span
              id="privacy-policy"
              className="hover:underline cursor-pointer"
            >
              PRIVACY POLICY
            </span>
            <span id="disclaimer" className="hover:underline cursor-pointer">
              DISCLAIMER
            </span>
          </div>
          <p className="text-xs">Copyright © 2018 - Lift Media Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
