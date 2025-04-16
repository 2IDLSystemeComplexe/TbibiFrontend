import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {doctors, assets} from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctos'

const DoctorDetails = () => {
    const { docId } = useParams()
    const [docInfo, setDocInfo] = useState({})

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

  return (
    <div>
        {docInfo && (
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-[#EAEFFF] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>

                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

                    {/* ----- Doc Info : name, degree, experience ----- */}

                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>

                    <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{docInfo.fees}{"dt"}</span> </p>
                </div>
            </div>
        )}
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  )
}

export default DoctorDetails