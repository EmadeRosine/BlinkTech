import React from "react";
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer =() =>{

    return(
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.wlogo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, earum. Cumque odit architecto voluptate voluptatibus!</p>
                    <div className="footer-social-icons">
                        <img src={assets.whatsapp} alt="" />
                        <img src={assets.facebook} alt="" />
                        <img src={assets.youtube} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>237 650060113</li>
                        <li>fe6ar6@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 @copyright BlinkTech.com - All Right Reserved</p>
        </div>
    )
}
export default Footer