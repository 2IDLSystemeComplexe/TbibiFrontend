import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { assets, myAppointments } from '../assets/assets';
import {
  getUserAppointments,
  cancelAppointment,
  createRazorpayOrder,
  verifyRazorpayPayment,
  createStripeSession,
} from '../services/AppointmentService';

const MyAppointments = () => {
  console.log('MyAppointments component rendered');
  console.log('myAppointments:', myAppointments);
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState();
  const [payment, setPayment] = useState('');

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const formatDate = (date) => {
    const [day, month, year] = date.split('_');
    return `${day} ${months[parseInt(month)]} ${year}`;
  };

  const fetchAppointments = async () => {
    try {
      const data = await getUserAppointments(backendUrl, token);
      setAppointments(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch appointments');
    }
  };

  const confirmCancel = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await cancelAppointment(backendUrl, token, appointmentId);
        toast.success('Appointment cancelled successfully');
        fetchAppointments();
      } catch (error) {
        toast.error(error.message || 'Failed to cancel appointment');
      }
    }
  };

  const handlePayment = async (appointmentId, gateway) => {
    try {
      let data;
      if (gateway === 'stripe') {
        data = await createStripeSession(backendUrl, token, appointmentId);
        if (data.session_url) window.location.replace(data.session_url);
      } else {
        data = await createRazorpayOrder(backendUrl, token, appointmentId);
        if (data.order) {
          const rzp = new window.Razorpay({
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.order.amount,
            currency: data.order.currency,
            name: 'Appointment Payment',
            order_id: data.order.id,
            handler: async (response) => {
              await verifyRazorpayPayment(backendUrl, token, response);
              toast.success('Payment successful');
              fetchAppointments();
            }
          });
          rzp.open();
        }
      }
    } catch (error) {
      toast.error(error.message || 'Payment failed');
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

  useEffect(() => {
    if (token) fetchAppointments();
  }, [token]);

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

      {myAppointments.length === 0 ? (
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
          {myAppointments.map((appointment) => (
            <motion.div
              key={appointment._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6 md:flex gap-6">
                {/* Doctor Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full md:w-32 h-32 bg-[#EAEFFF] rounded-lg overflow-hidden flex-shrink-0"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={appointment.doctorData?.image}
                    alt={appointment.doctorData?.name}
                  />
                </motion.div>

                {/* Appointment Details */}
                <div className="mt-4 md:mt-0 flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {appointment.doctorData?.name}
                      </h3>
                      <p className="text-gray-600">{appointment.doctorData?.speciality}</p>
                      
                      <div className="mt-3">
                        <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                          appointment.status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'Cancelled'
                              ? 'bg-red-100 text-red-800'
                              : appointment.payment
                                ? 'bg-blue-100 text-blue-800'
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
                        {appointment.mode === 'online' ? 'Online' : 'In Person'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {appointment.doctorData.localisation?.street} - {appointment.doctorData.localisation?.city}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {appointment.doctorData.phone}
                  </div>
          </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  {!appointment.payment && appointment.status === 'Pending' && payment !== appointment._id && (
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
                        onClick={() => handlePayment(appointment._id, 'stripe')}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
                        Pay with Stripe
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePayment(appointment._id, 'razorpay')}
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
                    >
                      Appointment Completed
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
                  <motion.button
                    whileHover={{ scale: canJoinCall(appointment) ? 1.03 : 1 }}
                    whileTap={{ scale: canJoinCall(appointment) ? 0.98 : 1 }}
                    disabled={!canJoinCall(appointment)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      canJoinCall(appointment)
                        ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={() => toast.info('Connecting to video call...')}
                  >
                    Join Video Call
                    {!canJoinCall(appointment) && appointment.mode === 'online' && appointment.status === 'Confirmed' && (
                      <span className="text-xs block mt-1">Available at your appointment time</span>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyAppointments;