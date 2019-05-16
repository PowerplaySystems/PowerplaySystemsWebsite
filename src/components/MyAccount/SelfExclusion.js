import React, { Component } from 'react';
import './index.css'

class SelfExclusion extends Component {
    render() {
        return (
            <div id="profile" className="profile">
                <div className="profile-caption">
                    <div className="caption-text">
                        <img src={require("./../../assets/images/self-empose.png")} />
                        <h6>Self Exclusion</h6>
                    </div>
                    <div className="caption-btn">
                        <input type="hidden" id="user-id" defaultValue={2610} />
                        <a href="javascript:void(0)" onclick="saveData()" className="btn">Save</a>
                    </div>
                </div>
                <div className="self-exclusion-sec">
                    <div className="self-inner-content">
                        <div className="self-exclusion-des">
                            <p>Playing games on Blackjack Sports should be a fun hobby and a great way to experience
                              added enjoyment withprofessional sports. To keep the game as such, we have implemented
                              an option for self-exclusion from purchasing in-game services. If, at any point,
                              you feel like you’re spending too much money on Blackjack Sports, consider self-exclusion
                              to give yourself a break. Self-exclusion allows you to set a time frame during which
                              you will be excluded and banned from participating in any games.
                            </p>
                            <p className="highlighted-text">Keep in mind, when you successfully self-exclude, you will NOT be able to enter any games
                              on theBlackjack Sports site until the self-exclusion time period you select has passed.
                            </p>
                            <p>It’s important to remember you are in control when setting the timeframe for your exclusion.
                              You can extend your self-exclusion, if you feel you need a longer break. As always,
                              please contact our customer support team if you have any concerns or questions, or
                              use the resources within Blackjack Sports to connect with NCRG.
                            </p>
                            <p>You can also exclude by contacting customer support. Please see our
                            <a href="#" className="clickable-link">
                                    Responsible Gaming</a> page for more information on self-exclusion and support.
                      If you would like to permanently close your account, you can do this by reaching
                      out to customer service. Please enter Permanent Self-Exclusion in the subject line.
                      You can contact customer service
                            <a href="mailto:support@Blackjack Sports.com" className="clickable-link">support@Blackjack Sports.com
                            </a>
                            </p>
                        </div>
                    </div>
                    <div className="self-exclusion-caption">
                        <div className="self-exclusion-caption-title">
                            <h6>Self-Exclusion duration</h6>
                        </div>
                        <div className="self-exclusion-dropdown">
                            <div className="dropdown">
                                <select name="self_exclusion_duration" id="self_exclusion_duration" className="btn btn-secondary dropdown-toggle">
                                    <option value="+1 week">1 Week</option>
                                    <option value="+1 month">1 Month</option>
                                    <option value="+3 month">3 Month</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelfExclusion;