import React from 'react'
import './Footer.css'
import footer_logo from '../assets/logo_big.png'
import instagram_icon from '../assets/instagram_icon.png'
import pi from '../assets/pintester_icon.png'
import wi from '../assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={pi} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={wi} alt="" />
            </div>
        </div>
        <div className="footer-copy-right">
            <hr />
            <p>Copyright @2024 - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer