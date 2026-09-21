import React from "react";

const NintyPlusLogo = ({ size = 44, showWord = true, className = "" }) => {
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <span
        className="relative grid place-items-center rounded-[14px] shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg,#7c3aed 0%,#c026d3 50%,#4f46e5 100%)",
        }}
      >
        <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} fill="none">
          <path d="M3 18V6.5L9 12V6.5L15 12V6.5L21 12V18" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 18H21M15 18V14H17V18" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-white/30 blur-[2px]" />
      </span>
      {showWord && (
        <span className="leading-none">
          <span className="block text-[1.15rem] font-extrabold tracking-tight text-white drop-shadow-sm">
            Ninty<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">plus</span>
          </span>
          <span className="block text-[0.55rem] uppercase tracking-[0.3em] text-white/60 mt-0.5">
            Online Institute
          </span>
        </span>
      )}
    </span>
  );
};

export default NintyPlusLogo;