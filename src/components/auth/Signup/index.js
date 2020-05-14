import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "./../../common/Header";
import Footer from "./../../common/Footer";
// import { connect } from 'react-redux';
import * as Constants from "./../../common/constants";

class Signup extends Component {
  constructor(props) {
    super(props);
    var tBacklink = null,
      tSelected = null;
    if (this.props.location.state) {
      tBacklink = this.props.location.state.backlink;
      tSelected = this.props.location.state.selected;
    }
    console.log(tSelected);
    this.state = {
      fname: "XXX",
      lname: "XXX",
      dname: "",
      phone: "XXX",
      email: "",
      password: "",
      cpassword: "",
      country: "",
      province: "",
      terms: false,
      over: false,
      showPassword: false,
      backlink: tBacklink,
      selected: tSelected
    };
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  togglePasswordVisibility() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }
  handleChange(event) {
    const target = event.target;
    console.log(target);
    console.log(target.name);
    console.log(target.checked);

    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // if (this.state.fname == "") {
    //   alert("Please Fill in First Name");
    //   return false;
    // }
    if (this.state.dname == "") {
      alert("Please Fill in Display");
      return false;
    }
    // if (this.state.lname == "") {
    //   alert("Please Fill in Last Name");
    //   return false;
    // }
    if (this.state.email == "") {
      alert("Please Fill in Email");
      return false;
    }
    if (this.state.password == "") {
      alert("Please Fill in Password");
      return false;
    }
    // if (this.state.cpassword == "") {
    //   alert("Passwords Don't Match");
    //   return false;
    // }
    // if (this.state.phone == "") {
    //   alert("Please Fil In Phone");
    //   return false;
    // }
    if (this.state.country == "") {
      alert("Please Fill In Country");
      return false;
    }
    if (this.state.province == "") {
      alert("Please Fill in Province");
      return false;
    }
    if (!this.state.terms) {
      alert("You need To accept Tearms To Signup");
      return false;
    }
    if (this.state.over == "") {
      alert("You should be over 18 to Create account");
      return false;
    }
    // if (this.state.password != this.state.cpassword) {
    //   alert("Passwords Don't Match");
    //   return false;
    // }
    var data =
      "fname=" +
      this.state.fname +
      "&lname=" +
      this.state.lname +
      "&dname=" +
      this.state.dname +
      "&email=" +
      this.state.email +
      "&password=" +
      this.state.password +
      "&phone=" +
      this.state.phone +
      "&country=" +
      this.state.country +
      "&province=" +
      this.state.province +
      "&over_18=" +
      this.state.over +
      "&acceptedtc=" +
      this.state.terms;
    console.log(data);
    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        var json = JSON.parse(this.responseText);
        if (~this.responseText.indexOf("jwt")) {
          const cookies = new Cookies();
          console.log(json.jwt);
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
        } else if (~this.responseText.indexOf("Incorrect")) {
          alert("Username or Password Incorrect");
        } else {
          alert("Something Went Wrong, Please Try Again");
        }
      }
    });
    xhr.open(
      "POST",
      " https://" + Constants.URL + "/public_api/auth/signup.php"
    );
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }
  usStateSelect() {
    return (
      <select
        className="login-input"
        value="login-input countries"
        name="province"
        id="provinceId"
        value={this.state.province}
        onChange={this.handleChange}
      >
        <option value="">State/Province</option>
        <option value="AL">Alabama (AL)</option>
        <option value="AK">Alaska (AK)</option>
        <option value="AZ">Arizona (AZ)</option>
        <option value="AR">Arkansas (AR)</option>
        <option value="CA">California (CA)</option>
        <option value="CO">Colorado (CO)</option>
        <option value="CT">Connecticut (CT)</option>
        <option value="DE">Delaware (DE)</option>
        <option value="DC">District Of Columbia (DC)</option>
        <option value="FL">Florida (FL)</option>
        <option value="GA">Georgia (GA)</option>
        <option value="HI">Hawaii (HI)</option>
        <option value="ID">Idaho (ID)</option>
        <option value="IL">Illinois (IL)</option>
        <option value="IN">Indiana (IN)</option>
        <option value="IA">Iowa (IA)</option>
        <option value="KS">Kansas (KS)</option>
        <option value="KY">Kentucky (KY)</option>
        <option value="LA">Louisiana (LA)</option>
        <option value="ME">Maine (ME)</option>
        <option value="MD">Maryland (MD)</option>
        <option value="MA">Massachusetts (MA)</option>
        <option value="MI">Michigan (MI)</option>
        <option value="MN">Minnesota (MN)</option>
        <option value="MS">Mississippi (MS)</option>
        <option value="MO">Missouri (MO)</option>
        <option value="MT">Montana (MT)</option>
        <option value="NE">Nebraska (NE)</option>
        <option value="NV">Nevada (NV)</option>
        <option value="NH">New Hampshire (NH)</option>
        <option value="NJ">New Jersey (NJ)</option>
        <option value="NM">New Mexico (NM)</option>
        <option value="NY">New York (NY)</option>
        <option value="NC">North Carolina (NC)</option>
        <option value="ND">North Dakota (ND)</option>
        <option value="OH">Ohio (OH)</option>
        <option value="OK">Oklahoma (OK)</option>
        <option value="OR">Oregon (OR)</option>
        <option value="PA">Pennsylvania (PA)</option>
        <option value="RI">Rhode Island (RI)</option>
        <option value="SC">South Carolina (SC)</option>
        <option value="SD">South Dakota (SD)</option>
        <option value="TN">Tennessee (TN)</option>
        <option value="TX">Texas (TX)</option>
        <option value="UT">Utah (UT)</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>
    );
  }
  canadaStateSelect() {
    return (
      <select
        className="login-input"
        value="login-input countries"
        name="province"
        id="provinceId"
        value={this.state.province}
        onChange={this.handleChange}
      >
        <option value="">State/Province</option>
        <option value="AB">Alberta</option>
        <option value="BC">British Columbia</option>
        <option value="MB">Manitoba</option>
        <option value="NB">New Brunswick</option>
        <option value="NL">Newfoundland and Labrador</option>
        <option value="NS">Nova Scotia</option>
        <option value="ON">Ontario</option>
        <option value="PE">Prince Edward Island</option>
        <option value="QC">Quebec</option>
        <option value="SK">Saskatchewan</option>
        <option value="NT">Northwest Territories</option>
        <option value="NU">Nunavut</option>
        <option value="YT">Yukon</option>
      </select>
    );
  }
  render() {
    return (
      <div className="login-container">
        <div className="login-left long">
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
        <div className="login-right long">
          <div className="right-signup-row">
            <div className="wrapper-signup-content">
              <span>Already have an account?</span>
              <button
                className="button-get-started"
                onClick={() =>
                  this.props.history.push({
                    pathname: "/login",
                    state: {
                      backlink: this.state.backlink,
                      selected: this.state.selected
                    }
                  })
                }
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="signup-header-wrapper">
            <div className="signup-header">
              Complete your contest entry by providing the following information
            </div>
            {/* <div className="login-header-sub">Enter your details below</div> */}
          </div>
          <div className="login-form-wrapper">
            <form
              autoComplete="off"
              onSubmit={this.handleSubmit}
              style={{ textAlign: "center" }}
            >
              <div>
                <div className="register-form-input-wrapper">
                  <div className="form-group" id="username_container">
                    <label className="login-label">Display Name</label>
                    <input
                      className="login-input"
                      value={this.state.dname}
                      onChange={this.handleChange}
                      name="dname"
                      type="text"
                      placeholder="Display Name"
                    />
                  </div>
                  {/* <div className="form-group">
                    <input
                      type="text"
                      className="login-input"
                      value={this.state.fname}
                      onChange={this.handleChange}
                      id="first_name"
                      name="fname"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="login-input"
                      value={this.state.lname}
                      onChange={this.handleChange}
                      id="last_name"
                      name="lname"
                      placeholder="Last Name"
                    />
                  </div> */}
                  <div className="form-group">
                    <label className="login-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="login-input"
                      value={this.state.email}
                      onChange={this.handleChange}
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  {/* <div className="form-group">
                    <input
                      type="text"
                      name="phone"
                      className="login-input"
                      value={this.state.phone}
                      onChange={this.handleChange}
                      id="cellphone"
                      placeholder="Cell Phone #"
                    />
                  </div> */}
                  <div className="form-group">
                    <label className="login-label">Password</label>
                    <input
                      type={this.state.showPassword ? "text" : "password"}
                      name="password"
                      className="login-input"
                      value={this.state.password}
                      onChange={this.handleChange}
                      id="password1"
                      placeholder="Password"
                    />
                  </div>
                  {/* <div className="show-password">
                    <div className="checkbox-btn-option">
                      <input
                        id="show_password"
                        onChange={this.togglePasswordVisibility}
                        type="checkbox"
                        name="show_password"
                      />
                      <label htmlFor="terms">
                        <span />
                      </label>
                    </div>
                    <label>Show password </label>
                  </div> */}
                  {/* <div className="form-group">
                    <input
                      type="password"
                      name="cpassword"
                      value={this.state.cpassword}
                      onChange={this.handleChange}
                      className="login-input"
                      id="password2"
                      placeholder="Confirm your Password"
                    />
                  </div> */}
                </div>
                <div
                  value="country-field"
                  className="div-inline"
                  style={{ marginRight: "10%" }}
                >
                  <div value="form-group">
                    <label className="login-label">Country</label>
                    <select
                      className="login-input"
                      value="login-input countries"
                      name="country"
                      id="countryId"
                      value={this.state.country}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Country</option>
                      <option value="Canada">Canada</option>
                      <option value="USA">United States</option>
                    </select>
                  </div>
                </div>
                <div value="country-field" className="div-inline">
                  <div value="form-group">
                    <label className="login-label">Province/State</label>
                    {this.state.country == "" ? (
                      <select className="login-input">
                        <option value="">Select State/Province</option>
                      </select>
                    ) : this.state.country == "USA" ? (
                      this.usStateSelect()
                    ) : (
                      this.canadaStateSelect()
                    )}
                  </div>
                </div>

                <div className="signup-terms">
                  <p>
                    <input
                      type="checkbox"
                      id="over"
                      name="over"
                      value={this.state.over}
                      onChange={this.handleChange}
                    />
                    <label for="terms" className="terms-label">
                      {" "}
                      By clicking join now you confirm that you are +18 years
                      old
                    </label>
                  </p>
                  <p>
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      value={this.state.terms}
                      onChange={this.handleChange}
                    />
                    <label for="terms" className="terms-label">
                      {" "}
                      By clicking join now you agree to our{" "}
                      <a>Terms & Conditions</a>
                    </label>
                  </p>
                </div>
              </div>
              <div className="">
                <button
                  type="submit"
                  id="signup_button"
                  name="signup_button"
                  value="Submit"
                  className="btn-signup"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
