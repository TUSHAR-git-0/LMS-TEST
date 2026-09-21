import React from "react";
import { useNavigate } from "react-router-dom";
import NintyPlusLogo from "./NintyPlusLogo";

const Footer = () => {
  let navigate = useNavigate();
  return (
    <footer className="bg-gray-950 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto flex lg:items-start items-center justify-center gap-[50px] lg:gap-[120px] flex-col lg:flex-row">

        {/* Logo + Description */}
        <div className="lg:w-[40%] md:w-[50%] w-[100%]">
          <NintyPlusLogo size={48} />
          <p className="text-sm mt-4 leading-relaxed">
            AI-powered learning platform to help you grow smarter. Learn anything, anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div className="lg:w-[30%] md:w-[100%]">
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1.5 text-sm">
            {[["Home", "/"], ["Courses", "/allcourses"], ["Login", "/login"], ["My Profile", "/profile"]].map(([label, path]) => (
              <li key={label} className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-200" onClick={() => navigate(path)}>{label}</li>
            ))}
          </ul>
        </div>

        {/* Explore Categories */}
        <div className="lg:w-[30%] md:w-[100%]">
          <h3 className="text-white font-semibold mb-3">Explore Categories</h3>
          <ul className="space-y-1.5 text-sm">
            {["Web Development", "AI/ML", "Data Science", "UI/UX Design"].map((c) => (
              <li key={c} className="hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-200">{c}</li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center text-gray-500 flex flex-col md:flex-row items-center justify-between px-2 gap-3">
        <span>© {new Date().getFullYear()} Nintyplus. All rights reserved.</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-medium">Learn Smarter. Grow Faster.</span>
      </div>
    </footer>
  );
};

export default Footer;