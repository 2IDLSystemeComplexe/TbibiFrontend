import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { getUserAppointments, updateAppointmentStatus } from '../services/AppointmentService';
import DisplayPrescription from '../components/DisplayPrescription';
import StripeCheckout from '../components/StripeCheckout';
import { createPaymentIntent } from '../services/PaymentService';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51REdSqRLHTbZu7cSmmipAIJx2yViMpXKB0ACSIqZfPcgiZDUSWnBt62hR28HdHqrjz4Lj5z9FYmr1jTsNoWScvO900mZecDxMS');

const MyAppointments = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [clientSecret, setClientSecret] = useState('');

  const handleStripePayment = async (appointment) => {
    const amount = 2000; // In cents
    try {
      const { clientSecret } = await createPaymentIntent(backendUrl, amount);
      setClientSecret(clientSecret);
      setSelectedAppointment(appointment);
      setPayment(appointment._id);
    } catch (err) {
      toast.error('Error creating payment');
    }
  };

  const options = {
    clientSecret,
  };

  const formatDate = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth();
    const year = formattedDate.getFullYear();
    return `${year} ${months[month]} ${day}`;
  };

  const fetchAppointments = async () => {
    try {
      const data = await getUserAppointments(backendUrl);
      setAppointments(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch appointments');
    }
  };

  const confirmCancel = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await updateAppointmentStatus(backendUrl, appointmentId, 'Cancelled');
        toast.success('Appointment cancelled successfully');
        fetchAppointments();
      } catch (error) {
        toast.error(error.message || 'Failed to cancel appointment');
      }
    }
  };

  const canJoinCall = (appointment) => {
    if (appointment.status !== 'Confirmed') return false;
    if (appointment.mode !== 'online') return false;

    const [day, month, year] = appointment.date.split('_').map(Number);
    const timeString = appointment.time;
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const appointmentDate = new Date(year, month, day, hours, minutes);
    return new Date() >= appointmentDate;
  };

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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <p className="text-gray-500 text-lg">You don't have any appointments yet</p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.1 }} className="space-y-6">
          {appointments.map((appointment) => (
            <motion.div
              key={appointment._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6 md:flex gap-6">
                <motion.div whileHover={{ scale: 1.02 }} className="w-full md:w-32 h-32 bg-[#EAEFFF] rounded-lg overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" src={assets.doc1} alt={appointment.doctor?.username} />
                </motion.div>

                <div className="mt-4 md:mt-0 flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{appointment.doctor?.username}</h3>
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
                      <p className="text-gray-700"><span className="font-medium">Date: </span>{formatDate(appointment.date)}</p>
                      <p className="text-gray-700"><span className="font-medium">Time: </span>{appointment.time}</p>
                      <p className="text-gray-700"><span className="font-medium">Mode: </span>{appointment.mode === 'en ligne' ? 'Online' : 'In Person'}</p>
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

              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  {!appointment.payment && appointment.status === 'Confirmed' && payment !== appointment._id && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>  handleStripePayment(appointment)}
                      className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Pay Now
                    </motion.button>
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

                  {appointment.status === 'Confirmed' && (
                    <motion.button
                      whileHover={{ scale: canJoinCall(appointment) ? 1.03 : 1 }}
                      whileTap={{ scale: canJoinCall(appointment) ? 0.98 : 1 }}
                      className="px-4 py-2 rounded-lg transition-colors bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                      onClick={() => toast.info('Connecting to video call...')}
                    >
                      <a href={appointment.videoCallLink} target="_blank" rel="noreferrer">Join Video Call</a>
                    </motion.button>
                  )}
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

      {payment === selectedAppointment._id && clientSecret && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => {
                setPayment('');
                setClientSecret('');
              }}
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            <Elements stripe={stripePromise} options={options}>
              <StripeCheckout
                clientSecret={clientSecret}
                onSuccess={() => {
                  toast.success('Payment Successful!');
                  setPayment('');
                  setClientSecret('');
                  fetchAppointments();
                }}
              />
            </Elements>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MyAppointments;
