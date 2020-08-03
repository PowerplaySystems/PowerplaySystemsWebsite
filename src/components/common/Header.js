import React, { Component } from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
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

  componentDidMount() {}

  logout() {
    const cookies = new Cookies();
    cookies.set("jwt", "", { path: "/" });
    this.setState(
      {
        isLogedin: false
      },
      this.props.history.push("/")
    );
    // ;
  }
  render() {
    //if user logged IN
    if (this.state.isLogedin) {
      return (
        <div className="container-fluid p-o">
          <header>
            <div className="col-md-2 col-sm-3 col-xs-7">
              <div
                onClick={() => this.props.history.push("/")}
                className="logo c-p"
              >
                <a>
                  <img
                    className="logo_img"
                    src={require("./../../assets/images/logo.png")}
                  />
                </a>
              </div>
            </div>
            <div className="col-xs-4 pull-rights" id="burger">
              <div className="_burger">
                <button type="button" class="navbar-toggle ham-burger " data-toggle="collapse" data-target="#myNavbar">
                 
                </button>
              </div>
            </div>
            <div className="col-md-10  main_navigation pull-right">
              <div className="nav-bar " id="myNavbar">
                <ul className="nav navbar-nav">
                  <li className="c-p">
                    <a
                      onClick={() =>
                        this.props.history.push("/powerplay-lotto")
                      }
                    >
                      Powerplay Lotto
                    </a>
                  </li>
                  <li className="c-p">
                    <a onClick={() => this.props.history.push("/live-sports")}>
                      Powerplay Live Sports
                    </a>
                  </li>
                  <li className="c-p">
                    <a  onClick={() => this.props.history.push("/partner")}>
                      Partner With Us
                    </a>
                  </li>
                  <li className="c-p">
                    <a
                      className="header_li_button"
                      onClick={() => this.props.history.push("/game-central")}
                    >
                      My Game Center
                    </a>
                  </li>
                  <li className="c-p" style={{ marginLeft: "-10px" }}>
                    <a
                      href="#"
                      class="dropdown-toggle"
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        src={require("./../../assets/images/pp.png")}
                        className="header_user_img"
                      />{" "}
                      <span class="caret" />
                    </a>
                    <ul
                      className="drop-down header_dropdown_list profile_dropdown"
                      style={{ left: "-90px" }}
                    >
                      <ul className="c-p header_dropdown_menu_item">
                        <a
                          onClick={() => this.props.history.push("/my-account")}
                        >
                          My Account
                        </a>
                      </ul>
                      <ul className="c-p header_dropdown_menu_item">
                        <a onClick={() => this.logout()}>Logout</a>
                      </ul>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </header>
        </div>
      );
    } else {
      return (
        <div className="container-fluid p-o">
          <header>
            <div className="col-md-2 col-sm-3 col-xs-7">
              <div
                onClick={() => this.props.history.push("/")}
                className="logo c-p"
              >
                <a>
                  <img
                    className="logo_img"
                    src={require("./../../assets/images/logo.png")}
                  />
                </a>
              </div>
            </div>
            <div className="col-xs-4 pull-rights" id="burger">
              <div className="_burger">
                <button type="button"class="navbar-toggle  ham-burger" data-toggle="collapse" data-target="#myNavbar">
                 
                 
                </button>
              </div>
            </div>
            <div className="col-md-10  main_navigation pull-right">
              <div className="nav-bar" id="myNavbar">
                <ul className="nav navbar-nav">
                  <li className="c-p">
                    <a
                      onClick={() =>
                        this.props.history.push("/powerplay-lotto")
                      }
                    >
                      Powerplay Lotto
                    </a>
                  </li>
                  <li className="c-p">
                    <a onClick={() => this.props.history.push("/live-sports")}>
                      Powerplay Live Sports
                    </a>
                  </li>

                  <li className="c-p">
                    <a onClick={() => this.props.history.push("/partner")}>
                      Partner With Us
                    </a>
                  </li>
                  <li className="c-p">
                    <a
                      className="c-p"
                      onClick={() => this.props.history.push("/about-us")}
                    >
                      About Us
                    </a>
                    <a
                      className="header_li_signin"
                      onClick={() => this.props.history.push("/login")}
                    >
                      Sign In
                    </a>
                  </li>
                  <li className="c-p">
                    <a
                      className="header_li_button_start"
                      onClick={() => this.props.history.push("/register")}
                    >
                      Get Started
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </header>
        </div>
      );
    }
  }
}

export default withRouter(Header);
