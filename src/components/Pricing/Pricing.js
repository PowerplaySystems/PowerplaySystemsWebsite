import React, { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./Pricing.scss";

import bg from '../../assets/images/pricing/bg.png';
import starOne from '../../assets/images/pricing/starOne.png';
import starTwo from '../../assets/images/pricing/starTwo.png';
import starThree from '../../assets/images/pricing/starThree.png';
import downArrow from '../../assets/images/pricing/downArrow.svg';

const Pricing = (props) => {
    const [openDetails, setOpenDetails] = useState(false);
    const [openDetails1, setOpenDetails1] = useState(false);
    const [openDetails2, setOpenDetails2] = useState(false);
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
        <div className="__Pricing" style={mainPanelCSS}>
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
                            <p>We guarantee you will see material benefits within 6 months</p>
                        </div>
                        <div className="__price_panels">
                            <div className="__panel">
                                <div className="__heading">Free</div>
                                <div className="__sub_heading">&nbsp;</div>
                                <div className="__details_tab">&nbsp;</div>
                                <div className="__list_heading">Introductory plan</div>
                                <ul>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Choose NHL or NBA</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">No insured prizes available</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Players accumulate reward points</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="__panel">
                                <img src={starOne} className="__star_icons" />
                                <div className="__heading">$0.69<span> /seat</span></div>
                                <div className="__sub_heading">Get discount for more seats!</div>
                                {openDetails && <div className="__discount_details">
                                    <ul>
                                        <li>
                                            <div>first 100 seats:</div>
                                            <div>$0.69 /seat</div>
                                        </li>
                                        <li>
                                            <div>101-1000 seats:</div>
                                            <div>$0.40 /seat</div>
                                        </li>
                                        <li>
                                            <div>1001-10000 seats:</div>
                                            <div>$0.25 /seat</div>
                                        </li>
                                        <li>
                                            <div>10000+ seats:</div>
                                            <div>$0.10 /seat</div>
                                        </li>
                                    </ul>
                                </div>}
                                {!openDetails && 
                                    <div className="__details_tab" onClick={() => {
                                        setOpenDetails(true);
                                    }}>Show details <img src={downArrow} /></div>
                                }
                                {openDetails && 
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
                                        <div className="__content">Choose two of NHL, NBA, or MLB</div>
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
                                        <div className="__content">Players accumulate reward points</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="__panel">
                                <img src={starTwo} className="__star_icons" />
                                <div className="__heading">$0.99<span> /seat</span></div>
                                <div className="__sub_heading">Get discount for more seats!</div>
                                {openDetails1 && <div className="__discount_details">
                                    <ul>
                                        <li>
                                            <div>first 100 seats:</div>
                                            <div>$0.99 /seat</div>
                                        </li>
                                        <li>
                                            <div>101-1000 seats:</div>
                                            <div>$0.69 /seat</div>
                                        </li>
                                        <li>
                                            <div>1001-10000 seats:</div>
                                            <div>$0.40 /seat</div>
                                        </li>
                                        <li>
                                            <div>10000+ seats:</div>
                                            <div>$0.25 /seat</div>
                                        </li>
                                    </ul>
                                </div>}
                                {!openDetails1 && 
                                    <div className="__details_tab" onClick={() => {
                                        setOpenDetails1(true);
                                    }}>Show details <img src={downArrow} /></div>
                                }
                                {openDetails1 && 
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
                                        <div className="__content">Choose three of NFL, NHL, NBA, or MLB</div>
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
                                        <div className="__content">Players accumulate reward points</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="__panel __last">
                                <img src={starThree} className="__star_icons" />
                                <div className="__heading">$4.99<span> /seat</span></div>
                                <div className="__sub_heading">Get discount for more seats!</div>
                                {openDetails2 && <div className="__discount_details">
                                    <ul>
                                        <li>
                                            <div>first 100 seats:</div>
                                            <div>$4.99 /seat</div>
                                        </li>
                                        <li>
                                            <div>101-1000 seats:</div>
                                            <div>$2.50 /seat</div>
                                        </li>
                                        <li>
                                            <div>1001-10000 seats:</div>
                                            <div>$1.50 /seat</div>
                                        </li>
                                        <li>
                                            <div>10000+ seats:</div>
                                            <div>$1.00 /seat</div>
                                        </li>
                                    </ul>
                                </div>}
                                {!openDetails2 && 
                                    <div className="__details_tab" onClick={() => {
                                        setOpenDetails2(true);
                                    }}>Show details <img src={downArrow} /></div>
                                }
                                {openDetails2 && 
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
                                        <div className="__content">Max of two insured contests per week</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Includes insured prize of $250,000</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Free Draft Contest</div>
                                    </li>
                                    <li>
                                        <div className="__bullet"></div>
                                        <div className="__content">Players accumulate reward points</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="__schedule_button">
                            <button><span>Schedule a call</span></button>
                        </div>
                        <div className="__monthly_fees">
                            <div className="__fees_calculator">
                                <h1>Calculate my monthly fee</h1>
                                <form className="__calculator_form">
                                    <div className="__form_field">
                                        <label>Select a plan</label>
                                        <div className="__select_wrapper">
                                            <select>
                                                <option>Minor League plan</option>
                                                <option>Major League plan</option>
                                                <option>Championship plan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="__form_field">
                                        <label>Number of seats</label>
                                        <input type="number" placeholder="Enter a number"/>
                                    </div>
                                    <div className="__form_field">
                                        <label>&nbsp;</label>
                                        <button>
                                            <span>Calculate!</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <p className="__bottom_line">Custom plans available, contact us to discuss</p>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    );
};
export default Pricing;