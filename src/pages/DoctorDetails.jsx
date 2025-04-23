import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { doctors, assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctos';
import BookAppointmentModal from '../components/BookAppointmentModal';
import { motion } from 'framer-motion';

const DoctorDetails = () => {
    const doctorAvailability1 = useMemo(() => [
        { day: 'Monday', start: '09:00', end: '17:00' },
        { day: 'Wednesday', start: '10:00', end: '18:00' },
        { day: 'Friday', start: '08:00', end: '16:00' }
    ], []);

    const { docId } = useParams();
    const [docInfo, setDocInfo] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDocInfo = useCallback(() => {
        const foundDoctor = doctors.find((doc) => doc._id === docId);
        if (foundDoctor) {
            setDocInfo(foundDoctor);
        }
    }, [docId]);

    const handleBookAppointment = useCallback(async (appointmentData) => {
        try {
            console.log('Booking successful:', appointmentData);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Booking failed:', error);
        }
    }, [docId]);

    const handleBookAppointmentClick = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo();
        }
    }, [doctors, docId, fetchDocInfo]);

    return (
        <div className='px-4 py-8'>
            {/* Main Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='flex flex-col sm:flex-row gap-6 items-center'
            >
                {/* Doctor Image */}
                <div className='w-full sm:w-72 h-72 bg-[#EAEFFF] rounded-lg overflow-hidden flex-shrink-0'>
                    <motion.img 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className='w-full h-full object-cover'
                        src={docInfo.image} 
                        alt={docInfo.name} 
                    />
                </div>

                {/* Doctor Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className='flex-1 border border-[#ADADAD] rounded-lg p-8 bg-white'
                >
                    <div className='space-y-4'>
                        <div>
                            <p className='flex items-center gap-2 text-2xl font-semibold text-gray-800'>
                                {docInfo.name} 
                                <img className='w-5' src={assets.verified_icon} alt="Verified" />
                            </p>
                            <div className='flex items-center gap-2 mt-1 text-gray-600'>
                                <p>{docInfo.degree} - {docInfo.specialization}</p>
                                <span className='py-0.5 px-2 border text-xs rounded-full'>
                                    {docInfo.experience} years experience
                                </span>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {docInfo.localisation?.street} - {docInfo.localisation?.city}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {docInfo.phone}
                        </div> 

                        <div className='border-t border-gray-200 pt-4'>
                            <p className='flex items-center gap-1 text-sm font-medium text-gray-700 mt-3 mb-1'>
                                About <img className='w-3' src={assets.info_icon} alt="" />
                            </p>
                            <p className='text-gray-600 text-sm leading-relaxed'>
                                {docInfo.about}
                            </p>
                        </div>

                        <div className='border-t border-gray-200 pt-4'>
                            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3'>
                                <p className='text-gray-700 font-medium'>
                                    Appointment fee: <span className='text-gray-900'>{docInfo.fees} dt</span>
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleBookAppointmentClick}
                                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200"
                                >
                                    Book Appointment
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            
            <BookAppointmentModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                doctorAvailability={doctorAvailability1}
                doctorId={docInfo._id}
                onSubmit={handleBookAppointment}
            />
            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className='mt-12'
            >
                <RelatedDoctors speciality={docInfo.specialization} docId={docId} />
            </motion.div>
        </div>
    );
};

export default DoctorDetails;