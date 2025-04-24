import axios from 'axios';

export const getUserAppointments = async (backendUrl) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !token) throw new Error('User not authenticated');

  const { _id, role } = user;

  const { data } = await axios.get(`${backendUrl}/api/appointment/appointments/${role}/${_id}`,
  );

  return data; // already an array
};




/**
 * Update the status of an appointment
 * @param {string} backendUrl 
 * @param {string} token
 * @param {string} appointmentId 
 * @param {string} status 
 * @returns {Promise<Object>} 
 */
export const updateAppointmentStatus = async (backendUrl, appointmentId, status) => {
  const { data } = await axios.put(
    `${backendUrl}/api/appointment/appointments/${appointmentId}/status`,
    { status }
  );
  return data;
};


export const bookAppointment = async (backendUrl, token, appointmentData) => {
  const { data } = await axios.post(
    `${backendUrl}/api/user/book-appointment`,
    appointmentData,
    { headers: { token } }
  );
  // Handle success and error via toast (show notification, etc.) 
  return data;
}

export const cancelAppointment = async (backendUrl, appointmentId) => {
  const { data } = await axios.post(
    `${backendUrl}/api/appointment/appointments/${appointmentId}/status`,
    { appointmentId },
    
  );
  return data;
};

export const createRazorpayOrder = async (backendUrl, token, appointmentId) => {
  const { data } = await axios.post(
    `${backendUrl}/api/user/payment-razorpay`,
    { appointmentId },
    { headers: { token } }
  );
  return data;
};

export const verifyRazorpayPayment = async (backendUrl, token, response) => {
  const { data } = await axios.post(
    `${backendUrl}/api/user/verifyRazorpay`,
    response,
    { headers: { token } }
  );
  return data;
};

export const createStripeSession = async (backendUrl, token, appointmentId) => {
  const { data } = await axios.post(
    `${backendUrl}/api/user/payment-stripe`,
    { appointmentId },
    { headers: { token } }
  );
  return data;
};
