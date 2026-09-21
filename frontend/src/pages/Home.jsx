import React from 'react'
import home from "../assets/home1.jpg"
import Nav from '../components/Nav'
import { SiViaplay } from "react-icons/si";
import Logos from '../components/Logos';
import Cardspage from '../components/Cardspage';
import ExploreCourses from '../components/ExploreCourses';
import About from '../components/About';
import ai from '../assets/ai.png'
import ai1 from '../assets/SearchAi.png'
import ReviewPage from '../components/ReviewPage';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()

  return (
    <div className='w-[100%] overflow-x-hidden'>

      {/* ---------------- HERO ---------------- */}
      <div className='w-[100%] lg:h-[130vh] h-[80vh] relative'>
        <Nav />

        {/* background image + ambient gradient */}
        <div className='absolute inset-0 overflow-hidden'>
          <img src={home} className='object-cover w-[100%] h-[100%]' alt="" />
          <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80' />
          {/* floating glow blobs */}
          <div className='absolute top-[18%] left-[8%] w-40 h-40 rounded-full bg-violet-600/40 blur-3xl animate-float' />
          <div className='absolute top-[30%] right-[10%] w-52 h-52 rounded-full bg-fuchsia-500/30 blur-3xl animate-float-slow' />
          <div className='absolute -bottom-10 left-1/2 w-72 h-72 rounded-full bg-indigo-500/30 blur-3xl animate-pulse-glow' />
        </div>

        {/* hero content */}
        <div className='relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-5'>
          <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-[13px] tracking-wide uppercase mb-6 backdrop-blur-md animate-fade-up'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
            Your Pathway to Success
          </span>

          <h1 className='text-white font-bold leading-tight animate-fade-up delay-150'>
            <span className='block lg:text-[64px] md:text-[44px] text-[30px]'>Grow Your Skills,</span>
            <span className='block lg:text-[64px] md:text-[44px] text-[30px] gradient-text pb-2'>Advance Your Career</span>
          </h1>

          <p className='max-w-xl text-white/80 lg:text-[17px] text-[14px] mt-5 animate-fade-up delay-300'>
            Master real-world skills with expert-led courses designed for ambitious learners — anytime, anywhere.
          </p>

          <div className='flex items-center justify-center gap-4 flex-wrap mt-8 animate-fade-up delay-450'>
            <button
              className='shimmer-btn rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-7 py-3 text-[16px] font-semibold flex gap-2 items-center cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-violet-500/40 transition-all active:scale-95'
              onClick={() => navigate("/allcourses")}
            >
              View all Courses <SiViaplay className='w-5 h-5 fill-white' />
            </button>
            <button
              className='rounded-full bg-white text-gray-900 px-7 py-3 text-[16px] font-semibold flex gap-2 items-center cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-white/40 transition-all active:scale-95'
              onClick={() => navigate("/searchwithai")}
            >
              Search with AI
              <span className='flex'>
                <img src={ai} className='w-6 h-6 rounded-full hidden lg:block' alt="" />
                <img src={ai1} className='w-7 h-7 rounded-full lg:hidden' alt="" />
              </span>
            </button>
          </div>

          {/* stats */}
          <div className='flex items-center justify-center gap-8 md:gap-16 mt-14 text-white animate-fade-up delay-600'>
            {[["20k+", "Courses"], ["50k+", "Learners"], ["4.8", "Avg Rating"]].map(([num, label]) => (
              <div key={label} className='text-center'>
                <div className='lg:text-3xl text-xl font-bold gradient-text'>{num}</div>
                <div className='text-[13px] text-white/70 uppercase tracking-widest mt-1'>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom wave divider */}
        <div className='absolute bottom-0 inset-x-0'>
          <svg viewBox="0 0 1440 70" className="w-full h-[45px]" preserveAspectRatio="none">
            <path d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,70L0,70Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      <Logos />
      <ExploreCourses />
      <Cardspage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  )
}

export default Home