import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { TbBrandOpenai } from "react-icons/tb";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const tiles = [
  { icon: TbDeviceDesktopAnalytics, label: "Web Development", bg: "from-violet-100 to-violet-50" },
  { icon: LiaUikit, label: "UI UX Designing", bg: "from-emerald-100 to-emerald-50" },
  { icon: MdAppShortcut, label: "App Development", bg: "from-rose-100 to-rose-50" },
  { icon: FaHackerrank, label: "Ethical Hacking", bg: "from-violet-100 to-violet-50" },
  { icon: TbBrandOpenai, label: "AI/ML", bg: "from-emerald-100 to-emerald-50" },
  { icon: SiGoogledataproc, label: "Data Science", bg: "from-rose-100 to-rose-50" },
  { icon: BsClipboardDataFill, label: "Data Analytics", bg: "from-violet-100 to-violet-50" },
  { icon: SiOpenaigym, label: "AI Tools", bg: "from-emerald-100 to-emerald-50" },
];

function ExploreCourses() {
  const navigate = useNavigate()
  return (
    <div className='w-full min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px] py-8'>
      <div className='w-[100%] lg:w-[350px] lg:h-[100%] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]'>
        <span className='text-[35px] font-semibold animate-fade-up'>Explore</span>
        <span className='text-[35px] font-semibold gradient-text animate-fade-up delay-150'>Our Courses</span>
        <p className='text-[17px] text-gray-600 animate-fade-up delay-300'>Handpicked courses from expert trainers to help you build in-demand skills and grow your career.</p>
        <button
          className='shimmer-btn px-[24px] py-[12px] rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-[16px] font-semibold flex gap-2 items-center mt-[30px] cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-violet-500/40 transition-all active:scale-95 animate-fade-up delay-450'
          onClick={() => navigate("/allcourses")}
        >
          Explore Courses <SiViaplay className='w-5 h-5 fill-white' />
        </button>
      </div>

      <div className='w-[760px] max-w-[92%] flex items-center justify-center lg:gap-[30px] gap-5 flex-wrap'>
        {tiles.map((item, i) => {
          const Icon = item.icon;
          return (
          <div key={item.label} className='group w-[104px] h-[138px] font-light text-[13px] flex flex-col gap-2.5 text-center cursor-pointer animate-fade-up'
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => navigate("/allcourses")}
          >
            <div className={`w-[104px] h-[92px] bg-gradient-to-br ${item.bg} rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-violet-200/70`}>
              <Icon className='w-[54px] h-[54px] text-[#6d6c6c] transition-colors duration-300 group-hover:text-[#7c3aed]' />
            </div>
            <span className='text-gray-700'>{item.label}</span>
          </div>
          );
        })}
      </div>
    </div>
  )
}

export default ExploreCourses