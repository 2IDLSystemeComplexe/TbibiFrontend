// services/PaymentService.js
import axios from 'axios';

export const createPaymentIntent = async (backendUrl, amount, currency = 'usd') => {
  const response = await axios.post(`${backendUrl}/api/payment`, {
    amount,
    currency,
  });
  return response.data;
};
