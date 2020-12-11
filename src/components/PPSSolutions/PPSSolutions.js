import React from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import './PPSSolutions.scss';
import img1 from '../../assets/images/solutions/bitmap@2x.jpg';
import img2 from '../../assets/images/solutions/bitmap@2x (02).jpg';

const PPSSolutions = props => {
    return (
        <div className='__PPSSolutions'>
            <Header />
            <div className='__viewport'>
                <div className='__title'>SOLUTIONS FOR YOUR INDUSTRY</div>
                <div className='__subtitle __hide-on-small'>
                    No matter your industry, we have a solution to expand your <br /> gaming options and generate new revenue streams.
                </div>
            </div>
            <div className='__content __content-1'>
                <div className='__container __flex __flex-start __sb'>
                    <img src={img1} alt='' className='__img-1' />
                    <div className='__custom-list'>
                        <div>
                            <span className='__primary'>Charity Organizations - Power-up</span> your charity fundraising. Leverage any of our games to create engaging experiences for your charity such as:
                            <div>Progressive 50/50 live-play lotteries</div>
                            <div>Sports based options to appeal to the sports fan (also for sports based charity)</div>
                            <div>Custom designed experiences to match your brand.</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PPSSolutions;