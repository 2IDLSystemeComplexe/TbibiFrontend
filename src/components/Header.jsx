import React from 'react'
import {assets} from '../assets/assets'
import { animate, motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";

export const FadeUp = (delay) => {
    return {
      initial: {
        opacity: 0,
        y: 50,
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          duration: 0.5,
          delay: delay,
          ease: "easeInOut",
        },
      },
    };
};

const Header = () => {

  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-blue-50 rounded-lg px-6 md:px-10 lg:px-20 '>

        {/* --------- Header Left --------- */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 leading-tight md:leading-tight lg:leading-tight"
            >
                Smart Healthcare, Simplified.
            </motion.h1>
            <motion.p
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-sm text-gray-700"
            >
                Instantly connect with doctors, book appointments online or at home,
                manage patient data, locate nearby medical services, and more —
                all in one powerful app.
            </motion.p>
            <motion.div
              variants={FadeUp(0.8)}
              initial="initial"
              animate="animate"
              className="flex flex-wrap gap-4 mt-6"
            >
                <button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-[0px_10px_8px_-7px_#60B5FF] hover:shadow-[0px_10px_8px_-7px_#69a79c] transition duration-300">
                    Get Started
                </button>
                <button className="border border-blue-400 text-blue-400 hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl shadow-[0px_10px_8px_-7px_#60B5FF] hover:shadow-[0px_10px_8px_-7px_#69a79c] transition duration-300 flex items-center gap-2 group">
                    Learn More
                    <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
                </button>
          </motion.div>
        </div>

        {/* --------- Header Right --------- */}
        <div className='md:w-1/2 relative'>
            <motion.img
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              className='w-full md:absolute bottom-0 h-auto rounded-lg' 
              src={assets.header_img} 
              alt="" 
            />
        </div>
    </div>
  )
}

export default Header

