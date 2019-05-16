import React, { Component } from 'react';
import './index.css'

class SelfImposedLimits extends Component {
    render() {
        return (
            <div id="profile" className="profile">
                <div className="profile-caption">
                    <div className="imposed-caption-text">
                        <img src={require("./../../assets/images/imposed-limits.png")} />
                        <h6>Self-Imposed Limits (
                        <span>Blackjack Sports Encourage you to play responsibly</span>)
                        </h6>
                    </div>
                    <div className="imposed-caption-btn">
                        <a href="javascript:void(0)" onclick="saveData()" className="btn">Save</a>
                    </div>
                </div>
                <div className="self-imposed-sec">
                    <div className="imposed-term-desc">
                        <div className="imposed-limit-title">
                            <img src={require("./../../assets/images/exclamation-mark.png")} />
                            <h6>Set an
                            <span>ALERT</span> to recieve notifications when your limit preferences are reached or
                            exceeded</h6>
                        </div>
                        <div className="imposed-limit-title">
                            <img src={require("./../../assets/images/do-not-disturb-rounded-sign.png")} />
                            <h6>Use
                            <span>BLOCK</span> functionality to prevent yourself from going over your self imposed
                            limit</h6>
                        </div>
                    </div>
                    <div className="self-imposed-inner-content">
                        <div className="inner-content-left-sec">
                            <div className="section-caption">
                                <h6>Alert Me</h6>
                            </div>
                            <div className="limitising">
                                <p>If my daily spendings reaches/exceeds</p>
                                <div className="limitising-dropdown">
                                    <div className="dropdown">
                                        <select name="alert_me_daily" id="alert_me_daily" className="btn btn-secondary dropdown-toggle">
                                            <option value={500}>
                                                $500
                                            </option>
                                            <option value={750} selected>
                                                $750
                                            </option>
                                            <option value={1000}>
                                                $1000
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="limitising">
                                <p>If my weekly spendings reaches/exceeds</p>
                                <div className="limitising-dropdown">
                                    <div className="dropdown">
                                        <select name="alert_me_daily" id="alert_me_weekly" className="btn btn-secondary dropdown-toggle">
                                            <option value={1000}>$1000</option>
                                            <option value={1500} selected>$1500</option>
                                            <option value={2000}>$2000</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="limitising">
                                <p>If my monthly spendings reaches/exceeds</p>
                                <div className="limitising-dropdown">
                                    <div className="dropdown">
                                        <select name="alert_me_daily" id="alert_me_monthly" className="btn btn-secondary dropdown-toggle">
                                            <option value={1000}>$1000</option>
                                            <option value={2000} selected>$2000</option>
                                            <option value={3000}>$3000</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="inner-content-right-sec">
                            <div className="section-caption">
                                <h6>Block Me</h6>
                            </div>
                            <div className="limitising">
                                <p>If my daily spendings should reach</p>
                                <div className="limitising-dropdown">
                                    <div className="dropdown">
                                        <select name="alert_me_daily" id="block_me_daily" className="btn btn-secondary dropdown-toggle">
                                            <option value={500}>$500</option>
                                            <option value={750}>$750</option>
                                            <option value={1000} selected>$1000</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="limitising">
                                <p>If my weekly spendings should reach</p>
                                <div className="limitising-dropdown">
                                    <div className="dropdown">
                                        <select name="alert_me_daily" id="block_me_weekly" className="btn btn-secondary dropdown-toggle">
                                            <option value={1000} selected>$1000</option>
                                            <option value={1500}>$1500</option>
                                            <option value={2000}>$2000</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="limitising">
                                <p>If my monthly spendings should reach</p>
                                <div className="limitising-dropdown">
                                    <div className="dropdown">
                                        <select name="alert_me_daily" id="block_me_monthly" className="btn btn-secondary dropdown-toggle">
                                            <option value={1000}>$1000</option>
                                            <option value={2000} selected>$2000</option>
                                            <option value={3000}>$3000</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelfImposedLimits;