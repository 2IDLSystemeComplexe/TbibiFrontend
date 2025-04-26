// components/StripeCheckout.js
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

const StripeCheckout = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error(result.error.message);
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        disabled={!stripe || loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default StripeCheckout;
