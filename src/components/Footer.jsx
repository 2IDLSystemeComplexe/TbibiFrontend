import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa"
import { TbWorldWww } from "react-icons/tb"

const Footer = () => {
    const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-4 my-10  mt-40'>

        <div className="space-y-4 max-w-[800px]">
          <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer mb-5">
            <img src={assets.logo} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-semibold ">Tbibi</span>
          </div>

          <p className='w-full md:w-2/3 text-dark-2 leading-6'>
          <span className="font-[1000]">Your all-in-one healthcare companion</span> <br/> Connecting doctors, patients, pharmacists, and more in one seamless platform. Easily locate nearby doctors, book appointments online or at home, and access essential medical services—anytime, anywhere.
          </p>
        </div>

        <div className="space-y-4">
          <p className='text-xl font-bold mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-dark-2'>
            <li onClick={() => navigate('/')} className='cursor-pointer hover:text-blue-400 duration-200'>Home</li>
            <li onClick={() => navigate('/about')} className='cursor-pointer hover:text-blue-400 duration-200'>About us</li>
            <li className='cursor-pointer hover:text-blue-400 duration-200'>Delivery</li>
            <li className='cursor-pointer hover:text-blue-400 duration-200'>Privacy policy</li>
          </ul>
        </div>

        <div className="space-y-4 max-w-[200px]">
          <p className='text-xl font-bold mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-dark-2'>
            <li>+216 24789789</li>
            <li>2idl01.projet.complexe@gmail.com</li>
          </ul>
          {/* social icons */}
            <div className="flex space-x-6 py-3">
              <a href="https://chat.whatsapp.com/">
                <FaWhatsapp className="cursor-pointer hover:text-blue-400 hover:scale-105 duration-200" />
              </a>
              <a href="https://www.instagram.com/">
                <FaInstagram className="cursor-pointer hover:text-blue-400 hover:scale-105 duration-200" />
              </a>
              <a href="https://www.google.com/">
                <TbWorldWww className="cursor-pointer hover:text-blue-400 hover:scale-105 duration-200" />
              </a>
              <a href="https://www.youtube.com/">
                <FaYoutube className="cursor-pointer hover:text-blue-400 hover:scale-105 duration-200" />
              </a>
            </div>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ Tbibi.tn - All Right Reserved.</p>
      </div>

    </motion.div>
  )
}

export default Footer