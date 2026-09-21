import React from 'react'
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const items = [
  { icon: MdCastForEducation, label: "20k+ Online Courses" },
  { icon: SiOpenaccess, label: "Lifetime Access" },
  { icon: FaSackDollar, label: "Value For Money" },
  { icon: BiSupport, label: "Lifetime Support" },
  { icon: FaUsers, label: "Community Support" },
];

function Logos() {
  return (
    <div className='w-full py-10 flex items-center justify-center flex-wrap gap-4 px-4'>
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className='flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white border border-gray-200 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-200/60 animate-fade-up'
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <Icon className='w-[30px] h-[30px] fill-[#7c3aed] transition-transform duration-300 group-hover:scale-110' />
            <span className='text-[#1f2937] font-medium text-[15px]'>{item.label}</span>
          </div>
        );
      })}
    </div>
  )
}

export default Logos