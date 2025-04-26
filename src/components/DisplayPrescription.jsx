import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getPrescriptionByAppointmentId } from '../services/AppointmentService';
import { AppContext } from '../context/AppContext';
const DisplayPrescription = ({ appointmentId, closeModal }) => {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useContext(AppContext)
  // Fetch the prescription QR code using appointmentId
  useEffect(() => {
    console.log(appointmentId)
    const fetchQRCode = async () => {
      try {
        setLoading(true);
        const data = await getPrescriptionByAppointmentId(backendUrl, appointmentId);
        console.log(data)
        setQrCode(data.qrCode); // Assuming the QR code comes as a base64 encoded string or URL
      } catch (error) {
        toast.error(error.message || 'Failed to fetch prescription QR code');
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) {
      fetchQRCode();
    }
  }, [appointmentId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg w-96 p-6"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Prescription QR Code</h3>
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading QR code...</div>
        ) : qrCode ? (
          <div className="text-center">
            <img src={qrCode} alt="Prescription QR Code" className="w-48 h-48 mx-auto" />
            <p className="mt-4 text-gray-600">Scan the QR code to view the prescription details.</p>
          </div>
        ) : (
          <div className="text-center text-gray-500">No prescription found for this appointment.</div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DisplayPrescription;
