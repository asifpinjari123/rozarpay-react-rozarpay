
import React from 'react';
import PaymentButton from '../src/Component/PaymentButton';
import './App.css';

function App() {
  const handlePaymentSuccess = (response) => {
    console.log('Payment successful:', response);
    // Add logic to handle success (e.g., show a success message)
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    // Add logic to handle failure (e.g., show an error message)
  };

  return (
    <div className="App">
      <h1>React Payment Gateway Integration</h1>
      <PaymentButton amount={100} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
    </div>
  );
}

export default App;
