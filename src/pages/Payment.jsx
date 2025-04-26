// // src/components/ConsultationPayment.js
// import React, { useState , useContext } from 'react';
// import axios from 'axios';
// import { AppContext } from '../context/AppContext';
// import {
//   CardElement,
//   useStripe,
//   useElements,
//   Elements,
// } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// // Replace with your own publishable key from Stripe Dashboard
// const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

// const Payment = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Create PaymentIntent on server
//     const res = await axios.post(`${backendUrl}/api/payment/`, );

//     const { clientSecret } = await res.json();

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (result.error) {
//       setMessage(result.error.message);
//     } else if (result.paymentIntent.status === 'succeeded') {
//       setMessage('✅ Payment successful! Your consultation is confirmed.');
//     }
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
//       <h2>Consultation Payment</h2>
//       <CardElement />
//       <button type="submit" disabled={!stripe || loading} style={{ marginTop: '1rem' }}>
//         {loading ? 'Processing…' : 'Pay $50.00'}
//       </button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// };

// export default function ConsultationPayment() {
//   return (
//     <Elements stripe={stripePromise}>
//       <Payment />
//     </Elements>
//   );
// }
import React from 'react'

const Payment = () => {
  return (
    <div>Payment</div>
  )
}

export default Payment
