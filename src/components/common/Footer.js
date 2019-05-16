import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.css'

class Footer extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid contact-us">
                    <div className="col-md-12 google-add">
                        <img src={require("./../../assets/images/Google-ad.png")} className="img-responsive" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="clearfix" />
                            <div className="col-sm-6">
                                <div className="contact-left">
                                    <div className="box">
                                        <h2>Legal / Privacy</h2>
                                        <a className="c-p" onClick={() => this.props.history.push('/terms-of-use')}>Term Of Use</a>
                                        <a className="c-p" onClick={() => this.props.history.push('/privacy')}>Privacy</a>
                                    </div>
                                    <div className="box">
                                        <h2>Company</h2>
                                        <a className="c-p" onClick={() => this.props.history.push('/faq')}>FAQs</a>
                                        <a className="c-p" onClick={() => this.props.history.push('/trust-and-safety')}>Trust And Safety</a>
                                        <a className="c-p" onClick={() => this.props.history.push('/account-security')}>Account Security</a>
                                        <a className="c-p" onClick={() => this.props.history.push('/about-us')}>About US</a>
                                    </div>
                                    <div className="social-contact">
                                        <ul>
                                            <li>
                                                <a className="fb">
                                                    <span className="fab fa-facebook-f" />
                                                </a>
                                            </li>
                                            <li>
                                                <a className="twt">
                                                    <span className="fab fa-twitter" />
                                                </a>
                                            </li>
                                            <li>
                                                <a className="lnkdin">
                                                    <span className="fab fa-linkedin-in" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="contact-right">
                                    <img src={require("./../../assets/images/Home-page-image.png")} className="img-responsive" />
                                    <h1>Visit our Store</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid p-o">
                    <footer>
                        <div className="col-md-12">
                            <p>Copyright © 2018 BlackJack - All Rights Reserved</p>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default withRouter(Footer);