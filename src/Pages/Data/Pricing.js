import React from 'react'
import axios from 'axios';
import '../../assets/css/pricing.css'
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const Pricing = () => {
    return (
<>
        <header className="headerstyle">
        <NavLink to='/profile'><button className="backbutton">Home</button></NavLink>
        </header>
        <div className="root">
        <div className="pricing-table">            

            <div className="pricing-card">
                <h3 className="pricing-card-header">Tier1</h3>
                <div className="price"><sup>$</sup>10<span>/YR</span></div>
                <ul>
                <li><strong>All</strong></li>
                <li><strong>1 Year</strong></li>
                </ul>
                
                <NavLink to={{
                        pathname: "/checkout",
                        search: "?tier=1",
                    }} className="order-btn">Order Now</NavLink>
            </div>
            <div className="pricing-card">
                <h3 className="pricing-card-header">Tier2</h3>
                <div className="price"><sup>$</sup>20<span>/Yr</span></div>
                <ul>
                    <li><strong>Tools</strong></li>
                    <li><strong>1 Year</strong></li>
                </ul>
                
                <NavLink to={{
                        pathname: "/checkout",
                        search: "?tier=2",
                    }} className="order-btn">Order Now</NavLink>
            </div>
            <div className="pricing-card">
                <h3 className="pricing-card-header">Tier3</h3>
                <div className="price"><sup>$</sup>30<span>/Yr</span></div>
                <ul>
                    <li><strong>Articles, Videos</strong></li>
                    <li><strong>1 Year</strong></li>
                </ul>
                <NavLink to={{
                        pathname: "/checkout",
                        search: "?tier=3",
                    }} className="order-btn">Order Now</NavLink>
                
            </div>

            </div>
            </div>
            </>
    )
}

export default Pricing
