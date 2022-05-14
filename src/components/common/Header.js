import React, { Component, Fragment } from "react";
import "./index.css";
import { Link, NavLink, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Header.scss";
import defaultUserImage from "./../../assets/images/pp.png";
import logo from "../../assets/images/logo.png";

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
      isLogedin: mLogged,
      isMenuOpen: false,
      showLogo: true,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // var that = this;
    // if (this.props.location && this.props.location.pathname == "/") {
    //   window.onscroll = function() {
    //     if (window.pageYOffset < 150) {
    //       that.setState({ showLogo: false });
    //     } else {
    //       that.setState({ showLogo: true });
    //     }
    //   };
    // } else {
    //   that.setState({ showLogo: true });
    // }
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  logout() {
    const cookies = new Cookies();
    cookies.set("jwt", "", { path: "/" });
    this.setState(
      {
        isLogedin: false,
      },
      this.props.history.push("/")
    );
  }
  render() {
    const { isMenuOpen, isLogedin } = this.state;
    return (
      <nav className="__appbar">
        <div className="__container __flex __sb">
          {this.state.showLogo && (
            <Link to="/">
              <img alt="" src={logo} className="__brand-logo" />
            </Link>
          )}

          <button
            className={isMenuOpen ? "__close" : "__menu"}
            onClick={() => this.setState({ isMenuOpen: !isMenuOpen })}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`__flex __nav-links ${isMenuOpen ? "open" : ""}`}>
            <li>
              <NavLink to="/services">our services</NavLink>
            </li>
            <li>
              <NavLink to="/about-us">about us</NavLink>
            </li>
            <li>
              <NavLink to="/solutions">Pricing</NavLink>
            </li>
            <li>
              <NavLink to="/partner" className="__partner-with-us-btn">
                Partner with us!
              </NavLink>
            </li>
            {isLogedin && (
              <Fragment>
                <li className="__game-center">
                  <NavLink to="/game-central">My Game Center</NavLink>
                </li>
                <li className="__profile-links __flex">
                  <button
                    className="__profile-button"
                    style={{ backgroundImage: `url(${defaultUserImage})` }}
                  ></button>
                  <div className="__drop-down">
                    <NavLink to="/my-account">My Account</NavLink>
                    <span onClick={this.logout}>Logout</span>
                  </div>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
