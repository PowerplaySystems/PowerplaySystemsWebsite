import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from './../../common/Header'
import Footer from './../../common/Footer'
import * as Constants from "./../../common/constants";
// import { connect } from 'react-redux';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        window.scrollTo(0, 0);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
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
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var json =JSON.parse(this.responseText);
                if (~this.responseText.indexOf("jwt")) {
                    const cookies = new Cookies();
                    cookies.set('jwt',json.jwt, { path: '/' });
                    that.props.history.push('/')

                } else if (~this.responseText.indexOf("create")) {
                    alert("Username or Password Incorrect");
                } else {
                    alert("Something Went Wrong, Please Try Again");
                }
            }
        });
        xhr.open("POST", " https://www." + Constants.URL + "/public_api/auth/login.php");
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);

    }
    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid _faq_wrap">
                    <div id="login-sec-id" className="login-bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="login-inner-section">
                                        <div className="welcome-sec">
                                            <div className="welcome-sec-content">
                                                <h2>Welcome Back to</h2>
                                                <h3>PowePlay Systems</h3>
                                            </div>
                                        </div>
                                        <div className="login-sec-form">
                                            <div className="login-sec-logo">
                                                <img src={require("./../../../assets/images/logo.png")} />
                                            </div>
                                            <form className="login-form" onSubmit={this.handleSubmit}>
                                                <div className="form-title">
                                                    <h2>Sign in</h2>
                                                </div>
                                                <div className="login-form-input-fields">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email / Username" />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="password" placeholder="Password" />
                                                    </div>
                                                </div>
                                                <div className="login-btn">
                                                    <button type="submit" id="login_button" name="login_button" className="btn">Login</button>
                                                    <p>Still don’t have an account? <a onClick={() => this.props.history.push('/register')} className="other-page-link c-p"> Register Now!</a></p>
                                                    <a className="text-link">
                                                        Forgot Your Password?
                                                    </a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Login);