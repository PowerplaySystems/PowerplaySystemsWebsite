import React, { Component } from "react";
import "./index.css";
import { Link, NavLink, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import './Header.scss';

class Header extends Component {
  mEmail = "";
  mJwt = "";
  mPlayerID = "";

  constructor(props) {
    super(props);
    var mLogged = false;
    const cookies = new Cookies();
    const jwt = (this.mJwt = cookies.get("jwt"));
    if (jwt == undefined || jwt == "") {
      mLogged = false;
    } else {
      mLogged = true;
    }
    this.state = {
      error: null,
      isLoaded: false,
      isLogedin: mLogged
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() { }

  logout() {
    const cookies = new Cookies();
    cookies.set("jwt", "", { path: "/" });
    this.setState(
      {
        isLogedin: false
      },
      this.props.history.push("/")
    );
  }
  render() {
    return (
      <nav className='__appbar'>
        <div className='__container __flex __sb'>
          <Link to='/' className='__brand-logo'></Link>
          <button className='__menu'>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button className='__close'>
            <span></span>
            <span></span>
          </button>
          <ul className='__flex __nav-links'>
            <li><NavLink to='/'>Solutions</NavLink></li>
            <li><NavLink to='/'>our services</NavLink></li>
            <li><NavLink to='/about-us'>about us</NavLink></li>
            <li><NavLink to='/partner' className='__partner-with-us-btn'>Partner with us!</NavLink></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header);
