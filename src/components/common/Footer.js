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
              <Link to='/faqs'>FAQs</Link>
              <Link to='/about-us'>About Us</Link>
              <Link to='/services'>Services</Link>
              <Link to='/solutions'>Solutions</Link>
            </div>
          </div>
          <div className='__copyright'>Copyright © 2021 PowerPlay Systems Inc. - All Rights Reserved</div>
        </div>
      </div>
    );
  }
}

export default Footer;
