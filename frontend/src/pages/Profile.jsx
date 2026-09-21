import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { getFullUrl } from "../../utils/imageUrl";

function Profile() {
  let { userData } = useSelector(state => state.user)
  let navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-violet-50 to-fuchsia-50 px-4 py-10 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-xl w-full relative animate-fade-up">
        <FaArrowLeftLong className='absolute top-[6%] left-[6%] w-[22px] h-[22px] cursor-pointer text-gray-500 hover:text-violet-600 transition-colors' onClick={() => navigate("/")} />

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="p-1 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-500">
            {userData.photoUrl ? (
              <img src={getFullUrl(userData?.photoUrl)} alt="" className="w-24 h-24 rounded-full object-cover border-4 border-white" />
            ) : (
              <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[34px] bg-gradient-to-br from-violet-600 to-fuchsia-500'>
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold mt-4 text-gray-800">{userData.name}</h2>
          <span className="px-3 py-1 mt-1 rounded-full text-[13px] font-medium capitalize bg-violet-50 text-violet-700">{userData.role}</span>
        </div>

        {/* Profile Info */}
        <div className="mt-7 space-y-4">
          <div className="flex items-center gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3">
            <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-4.5a2.5 2.5 0 01-5 0v-1.5" /></svg>
            <span className="font-semibold text-gray-700">Email: </span>
            <span>{userData.email}</span>
          </div>

          {userData.description && (
            <div className="flex items-start gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3">
              <svg className="w-5 h-5 text-violet-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <div>
                <span className="font-semibold text-gray-700">Bio: </span>
                <span>{userData.description}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 text-sm bg-gray-50 rounded-xl px-4 py-3">
            <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span className="font-semibold text-gray-700">Enrolled Courses: </span>
            <span>{userData.enrolledCourses.length}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-7 flex justify-center gap-4">
          <button
            className="shimmer-btn px-7 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-medium cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-violet-300 transition-all active:scale-95"
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
          <button
            className="px-7 py-2.5 rounded-full bg-gray-100 text-gray-700 font-medium cursor-pointer hover:bg-gray-200 transition-all active:scale-95 hover:-translate-y-0.5"
            onClick={() => navigate("/enrolledcourses")}
          >
            My Courses
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile