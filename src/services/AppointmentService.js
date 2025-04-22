import axios from 'axios';

export const getUserAppointments = async (backendUrl, token) => {
  const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
    headers: { token },
  });
  return data.appointments.reverse();
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

export const cancelAppointment = async (backendUrl, token, appointmentId) => {
  const { data } = await axios.post(
    `${backendUrl}/api/user/cancel-appointment`,
    { appointmentId },
    { headers: { token } }
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
