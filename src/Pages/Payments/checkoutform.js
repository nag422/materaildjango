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
import { Box, LinearProgress } from '@material-ui/core';
import { NavLink, useHistory  } from 'react-router-dom';

// You can customize your Elements to give it the look and feel of your site.
const CheckoutForm = ({ success, ...rest }) => {
    const [process,setProcess] = React.useState(false)
    const [paymentsuccess, setPaymentsuccess] = React.useState(false)
    const [paymentfail, setPaymentfail] = React.useState(false)
    const [useremail,setUseremail] = React.useState(localStorage.getItem('email'));
    const [logincondition,setLogincondition] = React.useState(localStorage.getItem('userid'));
    
    let history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async event => {
      event.preventDefault();
      setProcess(true)
        
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        
      });
  
      if (!error) {
        const { id } = paymentMethod;
        const form_data = new FormData();
        form_data.append('id',id)
        form_data.append('useremail',localStorage.getItem('email'))
        form_data.append('tier',gettierval())
        const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`,
              'Accept': 'application/json'
          }
      };
        
        

        try {
          await axios.post("https://app.kiranvoleti.com/createcheckoutsession/",form_data,config);
          setProcess(false);
          setPaymentsuccess(true);
          return setTimeout(function(){ return history.push('/profile'); }, 2000);

          // success();
        } catch (error) {
          
          await axios.get("https://app.kiranvoleti.com/cancel/",config);
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
      
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const inr = params.get('inr');    
      return inr 

    }
  
    return (
      <>
      
      <form
        onSubmit={handleSubmit}
        className="checkoutForm"
        style={{ maxWidth: "500px", margin: "0 auto",
        backgroundColor:"#fff",padding:'5%',minHeight:'100vh',
        alignContent:'center',paddingTop:'15vh',        
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s'
         
    
    }}
        
      >
        <h3 style={{color:'red'}}>{logincondition ? 'Payment Process':<a href="/login">Please Login</a>}</h3>
       
       <img src={stripeimage} alt="stripe_digitalbox" height="130"></img>
       
         {paymentsuccess? <Alert severity="success">Payment Success Don't go Back! -- Your Payment is awaiting to Confirm</Alert>:null}
         {paymentfail? <Alert severity="error">Payment attempt is Fail ! try again</Alert>:null}
         {process ? <Alert severity="info">Payment is in Process -- Don't go Back!<LinearProgress /></Alert>: null}
         
         
        <h2>Price: ${getprice()} USD</h2>
        {logincondition ? <input placeholder="email" disabled={useremail !=null} value={useremail} onChange={(e) => setUseremail(e.target.value)}/>:<input placeholder="email" value={useremail} onChange={(e) => setUseremail(e.target.value)}/>}
        
        <CardElement />
        {logincondition ? 
        <button type="submit" disabled={!stripe}>
          Pay
        </button>:null}
        <Box style={{paddingTop:'100px',float:'right'}}>
          <NavLink to="/pricing"> Back </NavLink>
        </Box>
        
        
      </form>
      
     
    </>
    );
  };
export default CheckoutForm;