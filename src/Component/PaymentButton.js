// src/components/PaymentButton.js
import React from 'react';
import { useScript } from '../Component/useScript';

const PaymentButton = ({ amount, onSuccess, onError }) => {
  const razorpayOptions = {
    key: 'Please add your kay',
    amount: amount * 100, // Amount in paise
    name: 'Aasif Pinjari',
    description: 'Payment for your product/service',
    image: 'https://your-logo-url.png',
    handler: async (response) => {
      try {
        // Call your backend to verify the payment on success
        const verificationResponse = await fetch('/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
          }),
        });

        const verificationData = await verificationResponse.json();

        if (verificationData.success) {
          // Payment success
          onSuccess(response);
        } else {
          // Payment verification failed
          onError({ error: 'Payment verification failed' });
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        onError({ error: 'Internal server error' });
      }
    },
    prefill: {
      name: 'Your Name',
      email: 'your.email@example.com',
      contact: '1234567890',
    },
    notes: {
      address: 'Your Address',
    },
    theme: {
      color: '#3399cc',
    },
  };

  const { isScriptLoaded, isScriptLoadSucceed } = useScript('https://checkout.razorpay.com/v1/checkout.js');

  const openRazorpay = () => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      const rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
    } else {
      console.error('Razorpay script not loaded');
    }
  };

  return (
    <button onClick={openRazorpay} className="rzp-button">
      Pay with Razorpay
    </button>
  );
};

export default PaymentButton;
