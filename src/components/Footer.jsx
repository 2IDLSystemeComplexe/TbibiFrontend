import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
    const navigate = useNavigate()

  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer mb-5">
            <img src={assets.logo} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-semibold ">Tbibi</span>
          </div>

          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
          <span className="font-[1000]">Your all-in-one healthcare companion</span> <br/> Connecting doctors, patients, pharmacists, and more in one seamless platform. Easily locate nearby doctors, book appointments online or at home, and access essential medical services—anytime, anywhere.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li onClick={() => navigate('/')} className='cursor-pointer'>Home</li>
            <li onClick={() => navigate('/about')} className='cursor-pointer'>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+216 24789789</li>
            <li>2idl01.projet.complexe@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ Tbibi.tn - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer