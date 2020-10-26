import React from 'react';
import Header from '../common/Header';
import './ContestCentral.scss';
import liveSportsImage from '../../assets/images/contesy_centeral/bitmap.png'

const ContestCentral = props => {
    return (
        <div className='__ContestCentral __white-text'>
            <div className='__container'>
                <div className='__viewport __col'>
                    <Header />
                    <div className='__viewport-title'>Contest Central</div>
                    <button className='__large-btn __m-3'>Play Now</button>
                    <div className="__mb-2 __viewport-subtitle">
                        Explore our exciting interactive contest. <br />
                    No purchase or deposit necessary!
                </div>
                </div>
            </div>
            <div className='__row-stretch __sports-play-wrapper __center'>
                <div className='__col __live-sports'>
                    <div className='__background-image'>
                        <img src={liveSportsImage} alt='' />
                    </div>
                    <div className='__col __f1'>
                        <div className='__col __ai __f1 __sb'>
                            <div className='__heading-1 __mt-3 __primary-text'>
                                <div className='__hide-on-large'>Power Play</div>
                                Live Sports
                            </div>
                            <button className='__btn __mb-3 __ml-a __mr-a __black-text'>Explore</button>
                        </div>
                    </div>
                </div>
                <div className='__f1 __power-play'>
                    <div className='__col'>
                        <div className='__col __ai'>
                            <div className='__heading-1 __mt-3 __mb-1 __primary-text'>Power Play  <div>Games</div></div>
                            <button className='__btn __mb-3 __ml-a __mr-a __white __black-text'>Explore</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContestCentral;