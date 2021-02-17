import React from 'react';

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,

} from "@stripe/react-stripe-js";

import axios from "axios";
import CheckoutForm from './checkoutform';
import { Redirect,useHistory } from 'react-router-dom';

  // you should use env variables here to not commit this
  // but it is a public key anyway, so not as sensitive
  const stripePromise = loadStripe("pk_test_51H2GwkFM3Q6O7DuK3XgFpJhO5snlKligZL0EKLRoyynRKVIfxsPFyN0Z9KPxZmmmYJCwJY7MbnzqKgRybQpiZz7000KK2MEv5c");
  
  const Index = () => {
    const [status, setStatus] = React.useState("ready");
    let history = useHistory();

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const inr = params.get('inr');    
    if (inr == 0){
      
      const formdata = new FormData();
      const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
      axios.post("https://app.kiranvoleti.com/save_stripe_info/",formdata,config)
      .then(res=>{
        window.location.replace("/profile")
      })
      
    }
    
    
   
    
    if (status === "success") {
      return <div>Congrats on your empanadas!</div>;
    }
    if (!localStorage.getItem('email')){
      alert('Please Provide an Email')
      // window.location.replace('/profile')
    } 
    return (
     
      <>
      
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
      </>
 
    );
  };
  
  export default Index;