import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import footerLogo from '../../assets/images/footerLogo.png';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  const isClient = typeof window !== 'undefined';
    const [viewportWidth, setWidth] = useState(800)
    useEffect(
        () => {
            if (isClient) {
                updateWindowDimensions();
                window.addEventListener('resize', updateWindowDimensions);
            }
            return () => {
                if (isClient) window.removeEventListener('resize', updateWindowDimensions);
            }
        }, []
    )
    const updateWindowDimensions = () => {
        setWidth(window.innerWidth);
    }
    const MOBILE_BREAKPOINT1 = 768;
    const MOBILE_BREAKPOINT2 = 375;
    const isMobile1 = Boolean(viewportWidth <= MOBILE_BREAKPOINT1);
    const isMobile2 = Boolean(viewportWidth <= MOBILE_BREAKPOINT2);
  return (
    <div className='__footer'>
      <div className='__container'>
        <div className='__flex __sb __links-wrapper'>
          <Link to='/'>
            <img alt='' src={isMobile1 ? logo : footerLogo} className='__brand-logo' />
          </Link>
          <div className='__links'>
            {/* <Link to='/faqs'>FAQs</Link> */}
            <Link to='/services'>Our Services</Link>
            <Link to="/customer-experience">Customer Experience</Link>
            <Link to='/about-us'>About Us</Link>
            <Link to='/pricing'>Pricing</Link>
            <Link to='/partner' className="partnerLink">Partner with us</Link>
          </div>
        </div>
        <div className='__copyright'>Copyright © 2022 11x12 Solutions Inc. - All Rights Reserved</div>
      </div>
    </div>
  );
};
export default Footer;