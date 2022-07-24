import React, { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./Pricing.scss";

import bg from '../../assets/images/pricing/bg.png';
import bgMobile from '../../assets/images/pricing/bgMobile.png';
import starOne from '../../assets/images/pricing/starOne.png';
import starTwo from '../../assets/images/pricing/starTwo.png';
import starThree from '../../assets/images/pricing/starThree.png';
import downArrow from '../../assets/images/pricing/downArrow.svg';
import closeIcon from '../../assets/images/pricing/closeIcon.png';
const PricingNew = (props) => {
    const [openDetails, setOpenDetails] = useState(false);
    const [openDetails1, setOpenDetails1] = useState(false);
    const [openDetails2, setOpenDetails2] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState(0);
    const [selectedType, setSelectedType] = useState("minor");
    const [result, setResult] = useState(0);
    const data = [{
        type: "minor",
        values: [1.99, 1.49, 1.29, 0.99]
    },{
        type: "major",
        values: [2.99, 2.49, 2.29, 1.99]
    },{
        type: "championship",
        values: [4.99, 4.49, 4.29, 3.99]
    }];
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
        backgroundSize: '100% 150%'
    };
    const mainPanelCSSMobile = {
        backgroundImage: `url(${bgMobile})`,
        backgroundColor: '#000',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0px 94px'
    };
    const calculateMonthlyFees = () => {
        if(!selectedSeats || selectedSeats == 0) {
            alert("Please add no of seats to continue.");
            return;
        }
        if(!selectedType) {
            alert("Please select a plan to continue.");
            return;
        }
        let dataRec = data.find(x => x.type === selectedType);
        if(selectedSeats <= 100) {
            setResult(dataRec.values[0] * 100);
        }
        if(selectedSeats > 100 && selectedSeats <= 1000) {
            var a = dataRec.values[0] * 100;
            var b = (selectedSeats - 100) * dataRec.values[1];
            setResult(a+b);
        }
        if(selectedSeats > 1000 && selectedSeats <= 10000) {
            var a = dataRec.values[0] * 100;
            var b = dataRec.values[1] * 900;
            var c = (selectedSeats - 1000) * dataRec.values[2];
            setResult(a+b+c);
        }
        if(selectedSeats > 10000) {
            var a = dataRec.values[0] * 100;
            var b = dataRec.values[1] * 900;
            var c = dataRec.values[2] * 9000;
            var d = (selectedSeats - 10000) * dataRec.values[3];
            setResult(a+b+c+d);
        }
    };
    return (
        <div className="__Pricing" style={isMobile1 ? mainPanelCSSMobile : mainPanelCSS}>
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
                        <div className="__top_heading">
                            <h1>Pick a plan to Power up your revenue</h1>
                            <p>This will be an incredibly valuable marketing campaign for your bar</p>
                        </div>
                        <div className="__price_panels">
                            <div className="__panel" style={!isMobile1 ? {
                                width: 640, height: 420
                            } : {}}>
                            <div className="__heading">Over $2000/month of value!</div>
                                <ul>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Email and Social Media Marketing</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Radio advertising</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">15% of all fees go towards a guaranteed jackpot (Target $50k per sport)</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Weekly insured prize of $100,000</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">SEO</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Exclusive individual bar promotions</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="__second">
                                <div className="__headings">
                                    <div><span class="PowerPlay-Systems-pr1">
                                        $300
                                    </span>
                                    <span class="PowerPlay-Systems-pr">
                                        / month per sport
                                    </span></div>
                                    <div className="__sub-headings">Select from: {isMobile1 ? <br /> : "" } MLB, NFL, NBA and NHL</div>
                                </div>
                                <div className="__bottom_content">
                                Multi-Sport and Multi-Bar discounts available!
                                </div>
                            </div>
                        </div>
                        {!isMobile1 && 
                        <div className="__schedule_button">
                            <button><span>Schedule a call</span></button>
                        </div>}
                    </div>
                </div>
            <Footer />
        </div>
    );
};
export default PricingNew;