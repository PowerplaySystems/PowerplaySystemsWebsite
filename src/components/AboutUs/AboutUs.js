import React, { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./AboutUs.scss";

import bg from '../../assets/images/about_us/bg.png';
import topBannerImage from '../../assets/images/about_us/topBannerImage.png';
import livePlayGamesImage from '../../assets/images/about_us/livePlayGamesImage.png';
import dialIcon from '../../assets/images/about_us/dialIcon.png';
import mapIcon from '../../assets/images/about_us/mapIcon.png';

const AboutUs = (props) => {
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [])
    const mainPanelCSS = {
        backgroundImage: `url(${bg})`,
        backgroundColor: '#000',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    };
    return (
        <div className="__AboutUs" style={mainPanelCSS}>
            <Helmet>
                <title>Everything You Need To Power Your Gaming Revenue</title>
                <meta
                name="description"
                content="We've got the gaming industry covered - from Fantasy Sports, Lottery games, and Sports Betting we provide everything you need to Power your gaming revenue."
                />
            </Helmet>
            <Header />
                <div className="__main">
                    <div className="__container">
                        <div className="__top_banner">
                            <div className="__left_text">
                                <h1>Powerplay Systems</h1>
                                <p className="__sub_text">Driving revenue generating solutions for the bar industy</p>
                                <div className="__what_we_do">What we do?</div>
                                <p className="__what_we_do_desc">We do our best to make significant contributions to your bars bottom line. With our exciting games and experience, your bar is sure to have record sales numbers</p>
                            </div>
                            <div className="__right_img">
                                <img src={topBannerImage} />
                            </div>
                        </div>
                        <div className="__our_mission">
                            <div className="__title">Our Mission</div>
                            <p>Drive extreme revenue across the bar industry by providing exclusive live sports based games</p>
                        </div>
                        <div className="__live_play">
                            <div className="__left_img">
                                <img src={livePlayGamesImage} />
                            </div>
                            <div className="__right_text">
                                <div className="__title">Live-Play sport games</div>
                                <p style={{
                                    marginBottom: 10
                                }}>Would you like to ramp up customer engagemnt?</p>
                                <p>Use our exclusive bar game option to power up revenue at your establishment</p>
                            </div>
                        </div>
                        <div className="__find_us">
                            <div className="__middle_box">
                                <div className="__title">Where to find us?</div>
                                <div className="__number_section">
                                    <img src={dialIcon} />
                                    <p>1-888-777-666-555</p>
                                </div>
                                <div className="__number_section">
                                    <img src={mapIcon} />
                                    <p>140 Yonge St., S.200 Toronto, Ontario</p>
                                </div>
                                <div className="__call_today">Call today for an over-view of our solution and a live demo</div>
                                <div className="__contact_us_button">
                                    <button>
                                        <span>Contact us</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    );
};
export default AboutUs;