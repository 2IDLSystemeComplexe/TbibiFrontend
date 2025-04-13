import React from 'react'
import { useNavigate } from 'react-router-dom';
import { doctors } from '../assets/assets';
const TopDoctors = () => {
    const navigate = useNavigate();

    //TODO: retrieve doctros data from API
    
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0, 10).map((doctor, index) => (
                <div onClick={() => { navigate(`/appointment/${doctor._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                    <img className='bg-[#EAEFFF]' src={doctor.image} alt="" />
                    <div className='p-4'>
                        <div className={`flex items-center gap-2 text-sm text-center ${doctor.available ? 'text-green-500' : "text-gray-500"}`}>
                            <p className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{doctor.available ? 'Available' : "Not Available"}</p>
                        </div>
                        <p className='text-[#262626] text-lg font-medium'>{doctor.name}</p>
                        <p className='text-[#5C5C5C] text-sm'>{doctor.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-[#EAEFFF] text-gray-600 font-semibold py-3 px-6 rounded-xl mt-10'>more</button>
    </div>
  )
}

export default TopDoctors