import React from 'react';

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,

} from "@stripe/react-stripe-js";

import axios from "axios";
import CheckoutForm from './checkoutform';


  
  // you should use env variables here to not commit this
  // but it is a public key anyway, so not as sensitive
  const stripePromise = loadStripe("pk_test_51H2GwkFM3Q6O7DuK3XgFpJhO5snlKligZL0EKLRoyynRKVIfxsPFyN0Z9KPxZmmmYJCwJY7MbnzqKgRybQpiZz7000KK2MEv5c");
  
  const Index = () => {
    const [status, setStatus] = React.useState("ready");
  
    if (status === "success") {
      return <div>Congrats on your empanadas!</div>;
    }
  
    return (
      <div style={{
      background: 'linear-gradient(to right, #4286f4, #373B44)'}}>
        
         
      <Elements stripe={stripePromise}>
       
        <CheckoutForm
          success={() => {
            setStatus("success");
          }}
        />
      </Elements>
      </div>
 
    );
  };
  
  export default Index;