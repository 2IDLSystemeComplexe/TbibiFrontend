import React from 'react'
import { FaBell } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

// const bgStyle = {
//     backgroundImage: `url(${BgImage})`,
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
// };

const Banner = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-[#f7f7f7]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style=""
            className="container py-24 md:py-48"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex flex-col justify-center"
            >
              <div className="text-center space-y-4 lg:max-w-[430px] mx-auto">
                <h1 className="text-4xl font-bold !leading-snug">
                Trusted by Over 10K+ Patients and Doctors
                </h1>
                <p>
                Join a growing community choosing smarter, connected healthcare.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-blue-400 text-white font-semibold rounded-xl hover:bg-blue-500 duration-200 shadow-[0px_10px_8px_-7px_#60B5FF] hover:shadow-[0px_10px_8px_-7px_#69a79c] py-3 px-6 !mt-8 inline-flex items-center gap-4 group"
                >
                  Join now
                  <FaBell className="group-hover:animate-bounce group-hover:text-lg duration-200" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </section>
      )
}

export default Banner