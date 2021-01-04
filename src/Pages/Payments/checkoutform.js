import React from 'react';
import './checkoutform.css'
import stripeimage from '../../assets/images/stripepayment.jpg'

import {
  
  CardElement,
  useStripe,

  useElements
} from "@stripe/react-stripe-js";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { Box, Button, LinearProgress } from '@material-ui/core';
import { NavLink, useHistory  } from 'react-router-dom';

// You can customize your Elements to give it the look and feel of your site.
const CheckoutForm = ({ success, ...rest }) => {
    const [process,setProcess] = React.useState(false)
    const [paymentsuccess, setPaymentsuccess] = React.useState(false)
    const [paymentfail, setPaymentfail] = React.useState(false)
    
    let history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async event => {
      event.preventDefault();
      setProcess(true)
        const form_data = new FormData();
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        
      });
  
      if (!error) {
        const { id } = paymentMethod;
        
        form_data.append('id',id)
        form_data.append('tier',gettierval())
        try {
          const { data } = await axios.post("https://app.kiranvoleti.com/createcheckoutsession/", form_data);
          setProcess(false);
          setPaymentsuccess(true);
          return setTimeout(function(){ return history.push('/profile'); }, 2000);

          // success();
        } catch (error) {
          console.log(error);
          setProcess(false);
          setPaymentfail(true);
          setTimeout(function(){ return history.push('/pricing'); }, 2000);
          
        }
      }
    };
    
    const gettierval = () => {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const tier = params.get('tier');
      return tier
    }
    const getprice = () => {
      
      const tier = gettierval();
      
      
      // setTier(tier);
      if(tier === "1"){
        return 10
      } 
      else if(tier === "2"){
        return 20
      }   
      else if(tier === "3"){
        return 30
      }        
      
    }
  
    return (
      <>
      
      <form
        onSubmit={handleSubmit}
        className="checkoutForm"
        style={{ maxWidth: "500px", margin: "0 auto",
        backgroundColor:"#fff",padding:'5%',minHeight:'99vh',
        alignContent:'center',paddingTop:'25vh',        
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s'
         
    
    }}
        
      >
       
       <img src={stripeimage} alt="Trulli" height="130"></img>
         {paymentsuccess? <Alert severity="success">Payment Success Don't go Back! -- Your Payment is awaiting to Confirm</Alert>:null}
         {paymentfail? <Alert severity="error">Payment attempt is Fail ! try again</Alert>:null}
         {process ? <Alert severity="info">Payment is in Process -- Don't go Back!<LinearProgress /></Alert>: null}
         
         
        <h2>Price: ${getprice()} USD</h2>
        
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
        <Box style={{paddingTop:'100px',float:'right'}}>
          <NavLink to="/pricing"> Cancel </NavLink>
        </Box>
        
        
      </form>
      
     
    </>
    );
  };
export default CheckoutForm;