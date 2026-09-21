import React, { useState } from 'react'
import { IoMdPerson } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiSplitCross } from "react-icons/gi";
import NintyPlusLogo from './NintyPlusLogo'

import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { getFullUrl } from '../../utils/imageUrl';

function Nav() {
  let [showHam, setShowHam] = useState(false)
  let [showPro, setShowPro] = useState(false)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let { userData } = useSelector(state => state.user)

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      console.log(result.data)
      await dispatch(setUserData(null))
      toast.success("LogOut Successfully")
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const Avatar = () => (
    userData?.photoUrl ? (
      <img src={getFullUrl(userData.photoUrl)} className="w-full h-full rounded-full object-cover" alt="" />
    ) : (
      <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center">
        {userData?.name?.slice(0, 1).toUpperCase()}
      </div>
    )
  )

  return (
    <header className="fixed top-0 inset-x-0 z-40 animate-fade-in">
      <div className="mx-3 md:mx-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex items-center justify-between px-4 md:px-6 h-[62px] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(124,58,237,0.35)]">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <NintyPlusLogo size={40} />
        </div>

        {/* Desktop actions */}
        <nav className="hidden lg:flex items-center gap-3">
          <span
            className="px-4 py-2 text-white text-[15px] font-medium rounded-full hover:bg-white/15 transition-colors cursor-pointer"
            onClick={() => navigate("/allcourses")}
          >
            Explore Courses
          </span>

          {userData?.role === "educator" && (
            <span
              className="px-4 py-2 rounded-full text-[15px] font-medium bg-white/15 text-white border border-white/25 hover:bg-white/25 transition-colors cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </span>
          )}

          {!userData ? (
            <button
              className="shimmer-btn rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-5 py-2 text-[15px] font-semibold hover:shadow-lg hover:shadow-violet-500/40 transition-all cursor-pointer active:scale-95"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <button
              className="rounded-full bg-white text-black px-5 py-2 text-[15px] font-semibold hover:bg-violet-50 hover:shadow-lg transition-all cursor-pointer active:scale-95"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          {/* Profile */}
          <div className="relative">
            <div
              className={`w-[46px] h-[46px] rounded-full overflow-hidden border-2 ${userData?.photoUrl ? "border-white/70" : "border-white/70"} cursor-pointer ring-2 ring-transparent hover:ring-violet-400/70 transition-all`}
              onClick={() => setShowPro(prev => !prev)}
            >
              {!userData ? (
                <div className="w-full h-full bg-white/20 flex items-center justify-center">
                  <IoMdPerson className="w-6 h-6 fill-white" />
                </div>
              ) : (
                <Avatar />
              )}
            </div>

            {showPro && (
              <div className="absolute top-[115%] right-0 w-52 rounded-2xl bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl p-2 animate-fade-up">
                <button className="w-full text-left px-4 py-2.5 rounded-xl text-[15px] font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors cursor-pointer" onClick={() => navigate("/profile")}>My Profile</button>
                <button className="w-full text-left px-4 py-2.5 rounded-xl text-[15px] font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors cursor-pointer" onClick={() => navigate("/enrolledcourses")}>My Courses</button>
              </div>
            )}
          </div>
        </nav>

        {/* Hamburger */}
        <GiHamburgerMenu className="w-7 h-7 lg:hidden fill-white cursor-pointer" onClick={() => setShowHam(true)} />
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-500 ${showHam ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowHam(false)} />
        <div className={`absolute right-0 top-0 h-full w-[82%] max-w-xs animated-gradient-bg shadow-2xl flex flex-col p-6 transition-transform duration-500 ${showHam ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between mb-10">
            <NintyPlusLogo size={38} />
            <GiSplitCross className="w-6 h-6 fill-white cursor-pointer" onClick={() => setShowHam(false)} />
          </div>

          <div className="flex flex-col gap-2.5">
            <button className="text-left px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-[16px] hover:bg-white/20 transition-colors cursor-pointer animate-fade-up delay-100" onClick={() => { navigate("/"); setShowHam(false) }}>Home</button>
            <button className="text-left px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-[16px] hover:bg-white/20 transition-colors cursor-pointer animate-fade-up delay-200" onClick={() => { navigate("/allcourses"); setShowHam(false) }}>Explore Courses</button>
            <button className="text-left px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-[16px] hover:bg-white/20 transition-colors cursor-pointer animate-fade-up delay-300" onClick={() => { navigate("/profile"); setShowHam(false) }}>My Profile</button>
            <button className="text-left px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-[16px] hover:bg-white/20 transition-colors cursor-pointer animate-fade-up delay-400" onClick={() => { navigate("/enrolledcourses"); setShowHam(false) }}>My Courses</button>
            {userData?.role === "educator" && (
              <button className="text-left px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-[16px] hover:bg-white/20 transition-colors cursor-pointer animate-fade-up delay-450" onClick={() => { navigate("/dashboard"); setShowHam(false) }}>Dashboard</button>
            )}

            {!userData ? (
              <button className="mt-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white py-3 text-[16px] font-semibold text-center cursor-pointer animate-fade-up delay-500 active:scale-95 transition" onClick={() => { navigate("/login"); setShowHam(false) }}>Login</button>
            ) : (
              <button className="mt-4 rounded-full bg-white text-black py-3 text-[16px] font-semibold text-center cursor-pointer animate-fade-up delay-500 active:scale-95 transition" onClick={() => { handleLogout(); setShowHam(false) }}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Nav