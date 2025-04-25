import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { getUserAppointments, updateAppointmentStatus } from '../services/AppointmentService';
import DisplayPrescription from '../components/DisplayPrescription';


const MyAppointments = () => {
  const { backendUrl} = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState('');
   const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedAppointment, setSelectedAppointment] = useState({});
  
  
  const formatDate = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const formattedDate = new Date(date); // Create a Date object from the ISO string
    const day = formattedDate.getDate(); // Get the day of the month
    const month = formattedDate.getMonth(); // Get the month (0-indexed)
    const year = formattedDate.getFullYear(); // Get the year
  
    return `${year} ${months[month]} ${day}`;
  };
  
  // Fetch appointments from backend
  const fetchAppointments = async () => {
    try {
      const data = await getUserAppointments(backendUrl);
      setAppointments(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch appointments');
    }
  };

  // Cancel appointment with a confirmation dialog
  const confirmCancel = async (appointmentId,status) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await updateAppointmentStatus(backendUrl,appointmentId, status);
        toast.success('Appointment cancelled successfully');
        fetchAppointments();  // Re-fetch appointments after cancellation
      } catch (error) {
        toast.error(error.message || 'Failed to cancel appointment');
      }
    }
  };

  const canJoinCall = (appointment) => {
    // Check if status is "Confirmed"
    if (appointment.status !== 'Confirmed') return false;
    
    // Check if mode is online
    if (appointment.mode !== 'online') return false;
    
    // Check if current time is after appointment time
    const [day, month, year] = appointment.date.split('_').map(Number);
    const timeString = appointment.time;
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const appointmentDate = new Date(year, month, day, hours, minutes);
    return new Date() >= appointmentDate;
  };

  // Trigger the fetching of appointments when the component mounts
  useEffect(() => {
     fetchAppointments();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-4 py-8"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-2xl font-semibold text-gray-800 mb-8"
      >
        My Appointments
      </motion.h1>

      {appointments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">You don't have any appointments yet</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="space-y-6"
        >
          {appointments.map((appointment) => (
            <motion.div
              key={appointment._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6 md:flex gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full md:w-32 h-32 bg-[#EAEFFF] rounded-lg overflow-hidden flex-shrink-0"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={ assets.doc1 }
                    alt={appointment.doctor?.username}
                  />
                </motion.div>

                <div className="mt-4 md:mt-0 flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {appointment.doctor?.username}
                      </h3>
                      <p className="text-gray-600">{appointment.doctor?.specialization}</p>
                       <div className="mt-3">
                        <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                          appointment.status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'Cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 md:mt-0">
                      <p className="text-gray-700">
                        <span className="font-medium">Date: </span>
                        {formatDate(appointment.date)}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Time: </span>
                        {appointment.time}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Mode: </span>
                        {appointment.mode === 'en ligne' ? 'Online' : 'In Person'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {appointment.doctor.localisation?.street} - {appointment.doctor.localisation?.city}
                  </div>

                  <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {appointment.doctor.phone}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  {!appointment.payment && appointment.status === 'Confirmed' && payment !== appointment._id && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPayment(appointment._id)}
                      className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Pay Now
                    </motion.button>
                  )}

                  {!appointment.payment && appointment.status === 'Pending' && payment === appointment._id && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        //onClick={() => handlePayment(appointment._id, 'stripe')}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
                        Pay with Stripe
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        //onClick={() => handlePayment(appointment._id, 'razorpay')}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
                        Pay with Razorpay
                      </motion.button>
                    </>
                  )}

                  {appointment.payment && appointment.status !== 'Cancelled' && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="px-4 py-2 bg-green-100 text-green-800 rounded-lg cursor-default"
                    >
                      Payment Completed
                    </motion.button>
                  )}

                  {appointment.status === 'Completed' && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="px-4 py-2 bg-green-100 text-green-800 rounded-lg cursor-default"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setIsModalOpen(true);
                        console.log(isModalOpen)
                      }}
                    >
                     Show prescription
                    </motion.button>
                  )}

                  {appointment.status === 'Pending' && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => confirmCancel(appointment._id)}
                      className="px-4 py-2 bg-white border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Cancel Appointment
                    </motion.button>
                  )}

                  {appointment.status === 'Cancelled' && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="px-4 py-2 bg-red-100 text-red-800 rounded-lg cursor-default"
                    >
                      Appointment Cancelled
                    </motion.button>
                  )}

                  {/* Join Call Button with proper conditions */}
                  {appointment.status === 'Confirmed' && (
                  <motion.button
                    whileHover={{ scale: canJoinCall(appointment) ? 1.03 : 1 }}
                    whileTap={{ scale: canJoinCall(appointment) ? 0.98 : 1 }}
                    className={`px-4 py-2 rounded-lg transition-colors bg-blue-500 text-white hover:bg-blue-600 cursor-pointer
                    `}
                    onClick={() => toast.info('Connecting to video call...')}
                  >
                    <a href={appointment.videoCallLink} target="_blank">Join Video Call</a>
                    
                  </motion.button>)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
       {isModalOpen && (
        <DisplayPrescription
          appointmentId={selectedAppointment._id}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default MyAppointments;
