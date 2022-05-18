import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import logo from '../../assets/images/logo.png'

class Footer extends Component {
  render() {
    return (
      <div className='__footer'>
        <div className='__container'>
          <div className='__flex __sb __links-wrapper'>
            <Link to='/'>
              <img alt='' src={logo} className='__brand-logo' />
            </Link>
            <div className='__links'>
              {/* <Link to='/faqs'>FAQs</Link> */}
              <Link to='/services'>Our Services</Link>
              <Link to='/about-us'>About Us</Link>
              <Link to='/pricing'>Pricing</Link>
              <Link to='/partner' className="partnerLink">Partner with us</Link>
            </div>
          </div>
          <div className='__copyright'>Copyright © 2022 11x12 Solutions Inc. - All Rights Reserved</div>
        </div>
      </div>
    );
  }
}

export default Footer;
