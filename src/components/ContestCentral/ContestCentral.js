import React from 'react';
import Header from '../common/Header';
import './ContestCentral.scss';
import liveSportsImage from '../../assets/images/contesy_centeral/bitmap.png';
import { Route, NavLink } from 'react-router-dom';
import Sports from './Sports';
import Footer from './Footer';
import Games from './Games';

const ContestCentral = props => {
    const { url } = props.match;
    return (
        <div className='__ContestCentral __white-text'>
            <div className='__viewport __col'>
                <div className='__col __f1 __ai __container'>
                    <Header />
                    <div className='__viewport-title'>Contest Central</div>
                    <button className='__large-btn __m-3'>Play Now <div className='__chevron __right'></div></button>
                    <div className="__mb-2 __viewport-subtitle">
                        Explore our exciting interactive contest. <br />
                        No purchase or deposit necessary!
                    </div>
                </div>
            </div>
            <div className='__row-stretch __sports-play-wrapper __center'>
                <NavLink exact to={url} className='__col __live-sports'>
                    <div className='__background-image'>
                        <img src={liveSportsImage} alt='' />
                    </div>
                    <div className='__col __f1'>
                        <div className='__col __ai __f1 __sb'>
                            <div className='__heading-1 __mt-3'>
                                <div className='__hide-on-large'>Power Play</div>
                                Live Sports
                            </div>
                            <button className='__btn __mb-3 __ml-a __mr-a __black-text'>Explore</button>
                        </div>
                    </div>
                </NavLink>
                <NavLink to={`${url}/games`} className='__f1 __power-play'>
                    <div className='__col'>
                        <div className='__col __ai'>
                            <div className='__heading-1 __mt-3 __mb-1'>Power Play  <div>Games</div></div>
                            <button className='__btn __mb-3 __ml-a __mr-a __black-text'>Explore</button>
                        </div>
                    </div>
                </NavLink>
            </div>
            <Route exact path={url} component={Sports} />
            <Route path={`${url}/games`} component={Games} />
            <div className='__center __contest-central-prizes-details'>
                <div className='__heading-2'>Your Cash Balance: <span className='__primary-text'>$3,000</span></div>
                <div className='__mb-2'></div>
                <div className='__heading-2 __mb-4'>Your Powerplay Token Balance: <span className='__primary-text'>$5,000</span></div>
                <div className='__heading-4'>Partner with us to integrate one of these exclusive interactive contests with your brand.</div>
                <button className='__large-btn'>Partner With Us</button>
            </div>
            <Footer />
        </div>
    )
}

export default ContestCentral;