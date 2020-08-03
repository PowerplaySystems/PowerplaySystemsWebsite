import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "./../../common/Header";
import Footer from "./../../common/Footer";
import * as Constants from "./../../common/constants";
import "./login.css";
// import { connect } from 'react-redux';
class Login extends Component {
  constructor(props) {
    super(props);
    var tBacklink = null,
      tSelected = null;
    if (this.props.location.state) {
      tBacklink = this.props.location.state.backlink;
      tSelected = this.props.location.state.selected;
    }
    this.state = {
      email: "",
      password: "",
      backlink: tBacklink,
      selected: tSelected
    };
    window.scrollTo(0, 0);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.email == "") {
      alert("Please Fill in Email");
      return false;
    }
    if (this.state.password == "") {
      alert("Please Fill in Password");
      return false;
    }
    var data = "email=" + this.state.email + "&password=" + this.state.password;
    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        var json = JSON.parse(this.responseText);
        if (~this.responseText.indexOf("jwt")) {
          const cookies = new Cookies();
          cookies.set("jwt", json.jwt, { path: "/" });
          if (that.state.backlink) {
            that.props.history.push({
              pathname: "/" + that.state.backlink,
              state: {
                selected: that.state.selected
              }
            });
          } else {
            that.props.history.push("/");
          }
        } else if (~this.responseText.indexOf("create")) {
          alert("Username or Password Incorrect");
        } else {
          alert("Something Went Wrong, Please Try Again");
        }
      }
    });
    xhr.open(
      "POST",
      " https://" + Constants.URL + "/public_api/auth/login.php"
    );
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }
  render() {
    return (
      <div>
        {/* <Header /> */}
        <div className="login-container">
          <div className="login-left">
            <div className="login-logo">
              <img
                className="img-responsive"
                src={require("./../../../assets/images/logo.png")}
              />
            </div>
            <div className="login-company-descr">
              <span>
                Trusted globally <br />
                for interactive gaming experiences
              </span>
            </div>
          </div>
          <div className="login-right">
            <div className="right-signup-row">
              <div className="wrapper-signup-content">
                <span>Don’t have an account?</span>
                <button
                  className="button-get-started"
                  onClick={() => this.props.history.push("/register")}
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="login-header-wrapper">
              <div className="login-header">
                Sign in to <span>Powerplay Systems</span>
              </div>
              <div className="login-header-sub">Enter your details below</div>
            </div>
            <div className="login-form-wrapper">
              <form className="form_login" onSubmit={this.handleSubmit}>
                <div className="login-form-fields-wrapper">
                  <div className="form-group">
                    <label className="login-label">Email address</label>
                    <input
                      type="text"
                      className="login-input"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder="Email / Username"
                    />
                  </div>
                  <div className="form-group">
                    <label className="login-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      className="login-input"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="btn-login">
                  <button
                    type="submit"
                    id="login_button"
                    name="login_button"
                    className="btn-login"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
