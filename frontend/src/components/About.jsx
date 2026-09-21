import React from 'react'
import about from "../assets/about.jpg"
import VideoPlayer from './VideoPlayer'
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BiSolidBadgeCheck } from "react-icons/bi";

function About() {
  return (
    <div className='w-full lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px] px-5'>
      <div className='lg:w-[40%] md:w-[80%] w-[100%] flex items-center justify-center relative animate-fade-up'>
        <div className='relative w-[82%] h-[90%] group'>
          <img src={about} className='w-[100%] h-[100%] rounded-3xl object-cover shadow-xl transition-transform duration-500 group-hover:scale-[1.02]' alt="" />
          <div className='absolute inset-0 rounded-3xl ring-1 ring-violet-300/50' />
        </div>
        <VideoPlayer />
      </div>

      <div className='lg:w-[50%] md:w-[70%] w-[100%] flex items-start justify-center flex-col px-[35px] md:px-[80px] animate-fade-up delay-300'>
        <div className='flex text-[18px] items-center justify-center gap-[20px] text-violet-700 font-medium'>
          About Us
          <TfiLayoutLineSolid className='w-[40px] h-[40px] fill-violet-600' />
        </div>
        <div className='md:text-[45px] text-[32px] font-semibold leading-tight'>
          We Maximize Your <span className='gradient-text'>Learning Growth</span>
        </div>
        <div className='text-[15px] text-gray-600 mt-3'>
          Nintyplus provides a modern Learning Management System to simplify online education, track progress, and enhance student-instructor collaboration efficiently.
        </div>
        <div className='w-[100%] lg:w-[70%]'>
          <div className='flex items-center justify-between mt-[30px] gap-3 flex-wrap'>
            <div className='flex items-center justify-center gap-[10px] text-gray-700'><BiSolidBadgeCheck className='w-[22px] h-[22px] fill-emerald-500' />Simplified Learning</div>
            <div className='flex items-center justify-center gap-[10px] text-gray-700'><BiSolidBadgeCheck className='w-[22px] h-[22px] fill-emerald-500' />Expert Trainers</div>
          </div>
          <div className='flex items-center justify-between mt-[20px] gap-3 flex-wrap'>
            <div className='flex items-center justify-center gap-[10px] text-gray-700'><BiSolidBadgeCheck className='w-[22px] h-[22px] fill-emerald-500' />Big Experience</div>
            <div className='flex items-center justify-center gap-[10px] text-gray-700'><BiSolidBadgeCheck className='w-[22px] h-[22px] fill-emerald-500' />Lifetime Access</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About