import React, { useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import {doctors, specialities} from '../assets/assets'

const Doctors = () => {

  const { speciality } = useParams()

  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  // const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilteredDoctors(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilteredDoctors(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specialities.map((spec, index) => (
            <p onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? 'bg-[#E2E5FF] text-black ' : ''}`} key={index}>{spec}</p>
          ))}
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {filteredDoctors.map((doctor, index) => (
            <div onClick={() => { navigate(`/doctors/${doctor._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
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
      </div>
    </div>
  )
}
export default Doctors