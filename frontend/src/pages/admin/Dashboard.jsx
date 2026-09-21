import React from 'react'
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import img from "../../assets/empty.jpg"; // fallback photo
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
function Dashboard() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);
  // update based on your store

  // Sample data - Replace with real API/course data
  const courseProgressData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    lectures: course.lectures.length || 0
  })) || [];

  const enrollData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    enrolled: course.enrolledStudents?.length || 0
  })) || [];

  const totalEarnings = creatorCourseData?.reduce((sum, course) => {
    const studentCount = course.enrolledStudents?.length || 0;
    const courseRevenue = course.price ? course.price * studentCount : 0;
    return sum + courseRevenue;
  }, 0) || 0;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <FaArrowLeftLong className=' w-[22px] absolute top-[10%]
      left-[10%] h-[22px] cursor-pointer' onClick={() => navigate("/")} />
      <div className="w-full px-6 py-10   bg-gray-50 space-y-10">
        {/* Welcome Section */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6 border border-gray-100 card-lift">
          <div className="p-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500">
            <img
              src={userData?.photoUrl || img}
              alt="Educator"
              className="w-28 h-28 rounded-full object-cover border-4 border-white"
            />
          </div>
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {userData?.name || "Educator"} 👋
            </h1>
            <h1 className='text-xl font-semibold text-gray-800'>Total Earnings : <span className='font-light text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500'>₹{totalEarnings.toLocaleString()}</span>  </h1>
            <p className="text-gray-600 text-sm">
              {userData?.description || "Start creating amazing courses for your students!"}
            </p>
            <button className='shimmer-btn px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-[15px] font-semibold items-center justify-center gap-2 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-violet-300 transition-all active:scale-95 flex w-fit' onClick={() => navigate("/courses")}>Create Courses</button>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Progress Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Course Progress (Lectures)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lectures" fill="#7c3aed" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrolled Students Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Student Enrollment</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" fill="#c026d3" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
