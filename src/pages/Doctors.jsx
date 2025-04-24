import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { doctors, specialities } from '../assets/assets'


const Doctors = () => {
  const [searchParams] = useSearchParams()
  const speciality = searchParams.get('speciality')
  const city = searchParams.get('city')

  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  // Get all unique cities from doctors
  const cities = [...new Set(doctors.map(doctor => doctor.localisation.city))].sort()

  const applyFilter = () => {
    let result = [...doctors]
    
    if (speciality) {
      result = result.filter(doc => doc.specialization === speciality)
    }
    
    if (city) {
      result = result.filter(doc => doc.localisation.city.toLowerCase().includes(city.toLowerCase()))
    }
    
    setFilteredDoctors(result)
  }

  const handleFilterSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    
    if (speciality) params.set('speciality', speciality)
    if (city) params.set('city', city)
    
    navigate(`/doctors?${params.toString()}`)
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality, city])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Find Your Doctor</h1>
      <p className='text-gray-600 mb-6'>Browse through our specialist doctors.</p>
      
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Filter Button for Mobile */}
        <button 
          onClick={() => setShowFilter(!showFilter)} 
          className={`lg:hidden py-2 px-4 border rounded-md flex items-center gap-2 ${showFilter ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          Filters
        </button>
        
        {/* Filters Sidebar */}
        <div className={`${showFilter ? 'block' : 'hidden'} lg:block w-full lg:w-72 bg-white p-4 rounded-lg shadow-md`}>
          <h2 className="text-lg font-semibold mb-4">Filter Doctors</h2>
          <form onSubmit={handleFilterSubmit} className="space-y-4">
            <div>
              <label htmlFor="speciality" className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
              <select
                id="speciality"
                value={speciality || ''}
                onChange={(e) => navigate(e.target.value ? `/doctors?speciality=${e.target.value}${city ? `&city=${city}` : ''}` : `/doctors${city ? `?city=${city}` : ''}`)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Specialities</option>
                {specialities.map((spec, index) => (
                  <option key={index} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                id="city"
                value={city || ''}
                onChange={(e) => navigate(e.target.value ? `/doctors?city=${e.target.value}${speciality ? `&speciality=${speciality}` : ''}` : `/doctors${speciality ? `?speciality=${speciality}` : ''}`)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Cities</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-2">
              <button 
                type="submit" 
                className="flex-1 py-2 px-4 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition"
              >
                Apply
              </button>
              
              {(speciality || city) && (
                <button 
                  type="button" 
                  onClick={() => {
                    navigate('/doctors')
                  }}
                  className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Doctors List */}
        <div className='flex-1'>
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No doctors found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              <button 
                onClick={() => navigate('/doctors')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                View All Doctors
              </button>
            </div>
          ) : (
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
              {filteredDoctors.map((doctor, index) => (
                  <div onClick={() => { navigate(`/doctors/${doctor._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                      <img className='bg-[#EAEFFF]' src={doctor.image} alt="" />
                      <div className='p-4'>
                          <div className={`flex items-center gap-2 text-sm text-center ${doctor.available ? 'text-green-500' : "text-gray-500"}`}>
                              <p className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{doctor.available ? 'Available' : "Not Available"}</p>
                          </div>
                          <p className='text-[#262626] text-lg font-medium'>{doctor.name}</p>
                          <p className='text-[#5C5C5C] text-sm'>{doctor.specialization}</p>
                      </div>
                  </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors