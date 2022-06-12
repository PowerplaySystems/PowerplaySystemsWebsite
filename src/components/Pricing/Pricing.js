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
const Pricing = (props) => {
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
        backgroundSize: 'cover'
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
                            <p>All plans include social media integration and email marketing campaigns</p>
                        </div>
                        <div className="__price_panels">
                            <div className="__panel">
                            <div className="__heading">$99<span> /month</span></div>
                                {!isMobile1 && <>
                                    <div className="__sub_heading">&nbsp;</div>
                                    <div className="__details_tab">&nbsp;</div>
                                </>}
                                <div className="__list_heading">Introductory plan</div>
                                <ul>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Choose NHL or NBA</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Email and Social Media Marketing</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">No insured prizes available</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Players win weekly / monthly gift cards</div>
                                    </li>
                                </ul>
                                {isMobile1 &&
                                    <button className="__schedule_button __free">
                                        <span>Schedule a call</span>
                                    </button>
                                }
                            </div>
                            <div className="__panel">
                                <img src={starOne} className="__star_icons" />
                                <div className="__heading">$1.99<span> /seat</span></div>
                                {!isMobile1 && <div className="__sub_heading">Get discount for more seats!</div>}
                                {!isMobile1 && openDetails && <div className="__discount_details">
                                    <ul>
                                        <li>
                                            <div>first 100 seats:</div>
                                            <div>$1.99 /seat</div>
                                        </li>
                                        <li>
                                            <div>101-1000 seats:</div>
                                            <div>$1.49 /seat</div>
                                        </li>
                                        <li>
                                            <div>1001-10000 seats:</div>
                                            <div>$1.29 /seat</div>
                                        </li>
                                        <li>
                                            <div>10000+ seats:</div>
                                            <div>$0.99 /seat</div>
                                        </li>
                                    </ul>
                                </div>}
                                {!isMobile1 && !openDetails && 
                                    <div className="__details_tab" onClick={() => {
                                        setOpenDetails(true);
                                    }}>Show details <img src={downArrow} /></div>
                                }
                                {!isMobile1 && openDetails && 
                                    <div className="__details_tab" onClick={() => {
                                        setOpenDetails(false);
                                    }}>Hide <img src={downArrow} style={{
                                        transform: "rotate(180deg)"
                                    }}/></div>
                                }
                                <div className="__list_heading">Minor League plan</div>
                                <ul>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Choose one of NHL, NBA, or MLB</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Email and Social Media Marketing</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Max of one insured prize contest per week per sport</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Includes insured prize of $25,000</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Players win weekly / monthly / full season cash prize of $1000</div>
                                    </li>
                                </ul>
                                {isMobile1 && <div className="__sub_heading">Get discount for more seats!</div>}
                                {isMobile1 && openDetails && <div className="__discount_details">
                                    <ul>
                                        <li>
                                            <div>first 100 seats:</div>
                                            <div>$1.99 /seat</div>
                                        </li>
                                        <li>
                                            <div>101-1000 seats:</div>
                                            <div>$1.49 /seat</div>
                                        </li>
                                        <li>
                                            <div>1001-10000 seats:</div>
                                            <div>$1.29 /seat</div>
                                        </li>
                                        <li>
                                            <div>10000+ seats:</div>
                                            <div>$0.99 /seat</div>
                                        </li>
                                    </ul>
                                </div>}
                                {isMobile1 &&
                                    <button className="__discount_button" onClick={() => {
                                        setOpenDetails(!openDetails);
                                    }}>
                                        <span>{!openDetails ? "See Discount Details" : "Hide Discount Details"}</span>
                                    </button>
                                }
                                {isMobile1 &&
                                    <button className="__schedule_button __other">
                                        <span>Schedule a call</span>
                                    </button>
                                }
                            </div>
                            <div className="__panel">
                                <img src={starTwo} className="__star_icons" />
                                <div className="__heading">$2.99<span> /seat</span></div>
                                {!isMobile1 && <div className="__sub_heading">Get discount for more seats!</div>}
                                {!isMobile1 && openDetails1 && <div className="__discount_details">
                                    <ul>
                                        <li>
                                            <div>first 100 seats:</div>
                                            <div>$2.99 /seat</div>
                                        </li>
                                        <li>
                                            <div>101-1000 seats:</div>
                                            <div>$2.49 /seat</div>
                                        </li>
                                        <li>
                                            <div>1001-10000 seats:</div>
                                            <div>$2.29 /seat</div>
                                        </li>
                                        <li>
                                            <div>10000+ seats:</div>
                                            <div>$1.99 /seat</div>
                                        </li>
                                    </ul>
                                </div>}
                                {!isMobile1 && !openDetails1 && 
                                    <div className="__details_tab" onClick={() => {
                                        setOpenDetails1(true);
                                    }}>Show details <img src={downArrow} /></div>
                                }
                                {!isMobile1 && openDetails1 && 
                                    <div className="__details_tab" onClick={() => {
                                        setOpenDetails1(false);
                                    }}>Hide <img src={downArrow} style={{
                                        transform: "rotate(180deg)"
                                    }}/></div>
                                }
                                <div className="__list_heading">Major League plan</div>
                                <ul>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Choose two of NFL, NHL, NBA, or MLB</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Email and Social Media Marketing</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Max of two insured contests per week</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Includes insured prize of $100,000</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Discounted Draft Contest</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Players win weekly / monthly / full season cash prize of $2500</div>
                                    </li>
                                </ul>
                                {isMobile1 && <div className="__sub_heading">Get discount for more seats!</div>}
                                {isMobile1 && openDetails1 && <div className="__discount_details">
                                    <ul>
                                        <li>
                                            <div>first 100 seats:</div>
                                            <div>$2.99 /seat</div>
                                        </li>
                                        <li>
                                            <div>101-1000 seats:</div>
                                            <div>$2.49 /seat</div>
                                        </li>
                                        <li>
                                            <div>1001-10000 seats:</div>
                                            <div>$2.29 /seat</div>
                                        </li>
                                        <li>
                                            <div>10000+ seats:</div>
                                            <div>$1.99 /seat</div>
                                        </li>
                                    </ul>
                                </div>}
                                {isMobile1 &&
                                    <button className="__discount_button" onClick={() => {
                                        setOpenDetails1(!openDetails1);
                                    }}>
                                        <span>{!openDetails1 ? "See Discount Details" : "Hide Discount Details"}</span>
                                    </button>
                                }
                                {isMobile1 &&
                                    <button className="__schedule_button __other">
                                        <span>Schedule a call</span>
                                    </button>
                                }
                            </div>
                            <div className="__panel __last">
                                <img src={starThree} className="__star_icons" />
                                <div className="__heading">$4.99<span> /seat</span></div>
                                {!isMobile1 && <div className="__sub_heading">Get discount for more seats!</div>}
                                {!isMobile1 && openDetails2 && <div className="__discount_details">
                                    <ul>
                                        <li>
                                            <div>first 100 seats:</div>
                                            <div>$4.99 /seat</div>
                                        </li>
                                        <li>
                                            <div>101-1000 seats:</div>
                                            <div>$4.49 /seat</div>
                                        </li>
                                        <li>
                                            <div>1001-10000 seats:</div>
                                            <div>$4.29 /seat</div>
                                        </li>
                                        <li>
                                            <div>10000+ seats:</div>
                                            <div>$3.99 /seat</div>
                                        </li>
                                    </ul>
                                </div>}
                                {!isMobile1 && !openDetails2 && 
                                    <div className="__details_tab" onClick={() => {
                                        setOpenDetails2(true);
                                    }}>Show details <img src={downArrow} /></div>
                                }
                                {!isMobile1 && openDetails2 && 
                                    <div className="__details_tab" onClick={() => {
                                        setOpenDetails2(false);
                                    }}>Hide <img src={downArrow} style={{
                                        transform: "rotate(180deg)"
                                    }}/></div>
                                }
                                <div className="__list_heading">Championship plan</div>
                                <ul>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Choose any four sports</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Email and Social Media Marketing</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Max of two insured contests per week</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Includes insured prize of $150,000</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Free Draft Contest</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Players win weekly / monthly / full season cash prize of $5,000</div>
                                    </li>
                                </ul>
                                {isMobile1 && <div className="__sub_heading">Get discount for more seats!</div>}
                                {isMobile1 && openDetails2 && <div className="__discount_details">
                                    <ul>
                                        <li>
                                            <div>first 100 seats:</div>
                                            <div>$4.99 /seat</div>
                                        </li>
                                        <li>
                                            <div>101-1000 seats:</div>
                                            <div>$4.49 /seat</div>
                                        </li>
                                        <li>
                                            <div>1001-10000 seats:</div>
                                            <div>$4.29 /seat</div>
                                        </li>
                                        <li>
                                            <div>10000+ seats:</div>
                                            <div>$3.99 /seat</div>
                                        </li>
                                    </ul>
                                </div>}
                                {isMobile1 &&
                                    <button className="__discount_button" onClick={() => {
                                        setOpenDetails2(!openDetails2);
                                    }}>
                                        <span>{!openDetails2 ? "See Discount Details" : "Hide Discount Details"}</span>
                                    </button>
                                }
                                {isMobile1 &&
                                    <button className="__schedule_button __other">
                                        <span>Schedule a call</span>
                                    </button>
                                }
                            </div>
                        </div>
                        {!isMobile1 && 
                        <div className="__schedule_button">
                            <button><span>Schedule a call</span></button>
                        </div>}
                        {!isMobile1 && 
                        <div className="__monthly_fees">
                            <div className="__fees_calculator">
                                <h1>Calculate my monthly fee</h1>
                                <form className="__calculator_form" onSubmit={(e) => {
                                    e.preventDefault();
                                }}>
                                    <div className="__form_field">
                                        <label>Select a plan</label>
                                        <div className="__select_wrapper">
                                            <select onChange={(e) => {
                                                setSelectedType(e.target.value);
                                            }}>
                                                <option value="minor">Minor League plan</option>
                                                <option value="major">Major League plan</option>
                                                <option value="championship">Championship plan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="__form_field">
                                        <label>Number of seats</label>
                                        <input type="number" placeholder="Enter a number" onChange={(e) => {
                                                setSelectedSeats(e.target.value);
                                            }}/>
                                    </div>
                                    <div className="__form_field">
                                        <label>&nbsp;</label>
                                        <button onClick={() => calculateMonthlyFees()}>
                                            <span>Calculate!</span>
                                        </button>
                                    </div>
                                </form>
                                {result > 0 && <>
                                    <div className="__result">
                                        ${parseFloat(result).toFixed(2)}<span>/month</span>
                                    </div>
                                    <button>
                                        <span>Schedule a call</span>
                                    </button>
                                </>}
                            </div>
                            <p className="__bottom_line">Custom plans available, contact us to discuss</p>
                        </div>}
                    </div>
                </div>
            <Footer />
            {isMobile1 && 
                <div className="__mobile_calculation">
                    <button onClick={() => {
                        setOpenPopup(true);
                    }}>
                        <span>Calculate my monthly fee</span>
                    </button>
                </div>
            }
            {isMobile1 && openPopup &&  
                <div className="__mobile_calculation_popup">
                    <button className="__close_button" onClick={() => {
                        setOpenPopup(false);
                    }}>
                        <img src={closeIcon} />
                    </button>
                    <h1>Calculate my monthly fee</h1>
                    <div className="__fields">
                        <div className="__form_field">
                            <label>Number of seats</label>
                            <input type="number" placeholder="Enter a number" onChange={(e) => {
                                                setSelectedSeats(e.target.value);
                                            }}/>
                        </div>
                        <div className="__radio_group">
                            <label>Select your plan:</label>
                            <div className="__radio_item">
                                <input type="radio" name="plan" value="minor" checked={selectedType === 'minor'} onChange={(e) => {
                                                setSelectedType(e.target.value);
                                            }}/>
                                <span>Minor League plan</span>
                            </div>
                            <div className="__radio_item">
                                <input type="radio" name="plan" value="major" checked={selectedType === 'major'} onChange={(e) => {
                                                setSelectedType(e.target.value);
                                            }}/>
                                <span>Major League plan</span>
                            </div>
                            <div className="__radio_item">
                                <input type="radio" name="plan" value="championship" checked={selectedType === 'championship'} onChange={(e) => {
                                                setSelectedType(e.target.value);
                                            }}/>
                                <span>Championship plan</span>
                            </div>
                        </div>
                    </div>
                    {result > 0 && <div className="__result">
                        ${parseFloat(result).toFixed(2)}<span>/month</span>
                    </div>}
                    
                    <button className="__calculate_button" onClick={() => {
                        calculateMonthlyFees();
                    }}><span>Calculate!</span></button>
                </div>
            }
        </div>
    );
};
export default Pricing;