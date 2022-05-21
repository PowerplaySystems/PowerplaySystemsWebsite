import React, { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./index.scss";

import bg from '../../assets/images/customer-experience/bg.png';
import bgMobile from '../../assets/images/customer-experience/bgMobile.png';
import step1Image from '../../assets/images/customer-experience/step1Image.png';
import step1ImageMobile from '../../assets/images/customer-experience/step1ImageMobile.png';
import step2Image from '../../assets/images/customer-experience/step2Image.png';
import step2ImageMobile from '../../assets/images/customer-experience/step2ImageMobile.png';
import step3Image from '../../assets/images/customer-experience/step3Image.png';
import step3ImageMobile from '../../assets/images/customer-experience/step3ImageMobile.png';
import step4Image from '../../assets/images/customer-experience/step4Image.png';
import step4ImageMobile from '../../assets/images/customer-experience/step4ImageMobile.png';
import step5Image from '../../assets/images/customer-experience/step5Image.png';
import step5ImageMobile from '../../assets/images/customer-experience/step5ImageMobile.png';
import step6Image from '../../assets/images/customer-experience/step6Image.png';
import step6ImageMobile from '../../assets/images/customer-experience/step6ImageMobile.png';
import step7Image from '../../assets/images/customer-experience/step7Image.png';
import step7ImageMobile from '../../assets/images/customer-experience/step7ImageMobile.png';

const CustomerExperience = (props) => {
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);
    const isClient = typeof window !== 'undefined';
    const [viewportWidth, setWidth] = useState(800)
    useEffect(
        () => {
            if (isClient) {
                updateWindowDimensions();
                window.addEventListener('resize', updateWindowDimensions);
            }
            return () => {
                if (isClient) window.removeEventListener('resize', updateWindowDimensions);
            }
        }, []
    )
    const updateWindowDimensions = () => {
        setWidth(window.innerWidth);
    }
    const MOBILE_BREAKPOINT1 = 768;
    const MOBILE_BREAKPOINT2 = 375;
    const isMobile1 = Boolean(viewportWidth <= MOBILE_BREAKPOINT1);
    const isMobile2 = Boolean(viewportWidth <= MOBILE_BREAKPOINT2);
    const mainPanelCSS = {
        backgroundImage: `url(${bg})`,
        backgroundColor: '#000',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    };
    const mainPanelCSSMobile = {
        backgroundImage: `url(${bgMobile})`,
        backgroundColor: '#000',
        backgroundRepeat: 'no-repeat'
    };
    return (
        <div className="__CustomerExperience" style={isMobile1 ? mainPanelCSSMobile : mainPanelCSS}>
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
                        <h1 className="__main_title">Customer Experience</h1>
                        <div className="__step1">
                            <div className="__left_image">
                                <img src={isMobile1 ? step1ImageMobile : step1Image} />
                            </div>
                            <div className="__right_text">
                                <div className="__title">Step 1.</div>
                                <div className="__content">Scan poster in a bar</div>
                            </div>
                        </div>
                        <div className="__step2">
                            <div className="__left_text" style={
                                isMobile1 ? {
                                    padding: "0px 37px"
                                } : {}
                            }>
                                <div className="__title">Step 2.</div>
                                <div className="__content">Quick sigN-up or log in</div>
                            </div>
                            <div className="__right_image">
                                <img src={isMobile1 ? step2ImageMobile : step2Image} />
                            </div>
                        </div>
                        <div className="__step1">
                            <div className="__left_image">
                            <img src={isMobile1 ? step3ImageMobile : step3Image} />
                            </div>
                            <div className="__right_text" style={{
                                width: 400
                            }}>
                                <div className="__title">Step 3.</div>
                                <div className="__content">Select your game</div>
                                <p>You can see game description by clicking “See Details”. All games are free to play</p>
                            </div>
                        </div>
                        <div className="__step2">
                            <div className="__left_text" style={{
                                width: 315
                            }}>
                                <div className="__title">Step 4.</div>
                                <div className="__content">Select your team</div>
                                <p>You will pick seven Players and one Team Defence. </p>
                            </div>
                            <div className="__right_image">
                                <img src={isMobile1 ? step4ImageMobile : step4Image} />
                            </div>
                        </div>
                        <div className="__step1 __other">
                            <div className="__left_image">
                            <img src={isMobile1 ? step5ImageMobile : step5Image} />
                            </div>
                            <div className="__right_text" style={{
                                width: 400
                            }}>
                                <div className="__title">Step 5.</div>
                                <div className="__content">View your games</div>
                                <p>From My Game Center you can see when games are due to start or are in progress.Click Team Manager to launch the live Team Manager page.</p>
                            </div>
                        </div>
                        <div className="__step2">
                            <div className="__left_text"   style={
                                isMobile1 ? {
                                    padding: "0px 37px"
                                } : {
                                    width: 400
                                }
                            }>
                                <div className="__title">Step 6.</div>
                                <div className="__content">Follow your team live!</div>
                                <p>Team Manager page overview – this is where you can see your entire team in one view, and see your current standings.</p>
                            </div>
                            <div className="__right_image">
                                <img src={isMobile1 ? step6ImageMobile : step6Image} />
                            </div>
                        </div>
                        <div className="__step1 __other" style={{
                            marginBottom: 160
                        }}>
                            <div className="__left_image" style={{
                                height: 380
                            }}>
                            <img src={isMobile1 ? step7ImageMobile : step7Image} />
                            </div>
                            <div className="__right_text">
                                <div className="__title">Step 7.</div>
                                <div className="__content">Win Prizes!</div>
                                <p>Feel good about my bar game experience. Come back to play again!</p>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    );
};
export default CustomerExperience;