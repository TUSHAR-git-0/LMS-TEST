import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import img from "../assets/empty.jpg"
import { getFullUrl } from "../../utils/imageUrl";

const CourseCard = ({ thumbnail, title, category, price, id, reviews }) => {
  const navigate = useNavigate()

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAverageRating(reviews);

  return (
    <div
      className="max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group cursor-pointer transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_24px_50px_-18px_rgba(124,58,237,0.4)]"
      onClick={() => navigate(`/viewcourse/${id}`)}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-48">
        <img
          src={getFullUrl(thumbnail) || img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {category && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[12px] font-medium text-white bg-black/55 backdrop-blur-md capitalize">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-violet-700 transition-colors">{title}</h2>

        <div className="flex items-center justify-between">
          <span className="text-[19px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">₹{price}</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-700 text-[13px] font-semibold">
            <FaStar className="text-yellow-500" /> {avgRating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;