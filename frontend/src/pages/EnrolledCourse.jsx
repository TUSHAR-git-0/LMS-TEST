import React  from 'react'

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { getFullUrl } from "../../utils/imageUrl";

function EnrolledCourse() {
  const navigate = useNavigate()

  const { userData } = useSelector((state) => state.user);

     
   
 

  return (
    <div className="min-h-screen w-full px-4 py-9 bg-gray-50">
      

      <FaArrowLeftLong  className='absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer text-gray-500 hover:text-violet-600 transition-colors' onClick={()=>navigate("/")}/>
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-6  ">
        My <span className="gradient-text">Enrolled Courses</span>
      </h1>

      {userData.enrolledCourses.length === 0 ? (
        <p className="text-gray-500 text-center w-full">You haven’t enrolled in any course yet.</p>
      ) : (
        <div className="flex items-center justify-center flex-wrap gap-[30px]">
          {userData.enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 w-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_-18px_rgba(124,58,237,0.4)]"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={getFullUrl(course.thumbnail)}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-medium text-white bg-black/50 backdrop-blur-md">{course.category}</span>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
                <p className="text-sm text-violet-600 font-medium mb-2">{course.level}</p>
                <button className='w-full text-center py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-[15px] font-semibold flex items-center justify-center gap-2 cursor-pointer mt-[10px] hover:shadow-lg hover:shadow-violet-300 transition-all active:scale-95' onClick={()=>navigate(`/viewlecture/${course._id}`)}>Watch Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EnrolledCourse
