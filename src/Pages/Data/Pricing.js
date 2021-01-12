import React from 'react'
import axios from 'axios';
import '../../assets/css/pricing.css'
import { NavLink } from 'react-router-dom';

const Pricing = () => {
const [pricedetails,setPricedetails] = React.useState([]);

const fetchpayment = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    try {
        await axios.get('https://app.kiranvoleti.com/paymentrates/', config).then(res=>{
            setPricedetails(res.data.response)
        })

    } catch (err) {
        console.log(err)
       
    }
}

React.useEffect(() => {
  fetchpayment();
}, [])

   
    return (
<>
        <header className="headerstyle">
        <NavLink to='/profile'><button className="backbutton">Home</button></NavLink>
        </header>
        <div className="root">
        <div className="pricing-table">            
         

        {pricedetails.map((val,index)=>{
            return  <div className="pricing-card">
            <h3 className="pricing-card-header">Tier{index+1}</h3>
            <div className="price"><sup>$</sup>{val.price}<span>/Yr</span></div>
            <ul>
            <li><strong>{val.services}</strong></li>
            <li><strong>{val.validity} Year</strong></li>
            </ul>
            
            <NavLink to={{
                    pathname: "/checkout",
                    search: `?tier=${val.tier}&inr=${val.price}`,
                }} className="order-btn">Order Now</NavLink>
        </div>
        }
        
        
        )}

            
             {/* <div className="pricing-card">
                <h3 className="pricing-card-header">Tier2</h3>
                <div className="price"><sup>$</sup>{pricedetails.tier1.price}<span>/Yr</span></div>
                <ul>
                <li><strong>{pricedetails.tier2.services}</strong></li>
                <li><strong>{pricedetails.tier2.price} Year</strong></li>
                </ul>
                
                <NavLink to={{
                        pathname: "/checkout",
                        search: "?tier=2",
                    }} className="order-btn">Order Now</NavLink>
            </div> */}
            {/*<div className="pricing-card">
                <h3 className="pricing-card-header">Tier3</h3>
                <div className="price"><sup>$</sup>{pricedetails.tier3.price}<span>/Yr</span></div>
                <ul>
                <li><strong>{pricedetails.tier3.services}</strong></li>
                <li><strong>{pricedetails.tier3.price} Year</strong></li>
                </ul>
                <NavLink to={{
                        pathname: "/checkout",
                        search: "?tier=3",
                    }} className="order-btn">Order Now</NavLink>
                
            </div>  */}

            </div>
            </div>
            </>
    )
}

export default Pricing
