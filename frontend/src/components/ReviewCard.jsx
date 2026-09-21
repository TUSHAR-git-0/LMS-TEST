import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import img from "../assets/empty.jpg"
import { getFullUrl } from "../../utils/imageUrl";

const ReviewCard = ({ text, name, image, rating, role }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 max-w-sm w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_-18px_rgba(124,58,237,0.4)] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500 opacity-0 group-hover:opacity-100" />
      {/* Rating Stars */}
      <div className="flex items-center mb-3 text-yellow-400 text-sm">
        {Array(5).fill(0).map((_, i) => (
          <span key={i}>{i < rating ? <FaStar /> : <FaRegStar />}</span>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm mb-5 leading-relaxed">{text}</p>

      {/* Reviewer Info */}
      <div className="flex items-center gap-3">
        <img src={getFullUrl(image) || img} alt={name} className="w-11 h-11 rounded-full object-cover border-2 border-violet-200" />
        <div>
          <h4 className="font-semibold text-gray-800 text-sm">{name}</h4>
          <p className="text-xs text-gray-500 capitalize">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;