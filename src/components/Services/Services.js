import React from 'react';
import './Services.scss';
import Footer from '../common/Footer';
import Header from '../common/Header';
import img1 from '../../assets/images/services/bitmap@2x.jpg';

const Services = props => {
    return (
        <div className='__Services'>
            <Header />
            <div className='__viewport'>
                <div className='__container'>
                    <div className='__title'>EVERYTHING YOU NEED</div>
                    <div className='__flex __flex-center __image-container'>
                        <div className='__subtitle'>We've got the gaming industry covered - from Fantasy Sports, <br className='__hide-on-mediam' /> Lottery games, and Sports Betting we provide everything you <br className='__hide-on-mediam' /> need to Power your gaming revenue.</div>
                        <img src={img1} alt='' className='__show-on-mediam' />
                    </div>
                </div>
            </div>
            <div className='__content __container'>
                <div>
                    <div className='__primary __title'>Off-The-Shelf (OTS) games</div>
                    <div>Leverage any of our ready to launch OTS games to boost your revenue. Fast to launch. Fast to generate revenue.</div>
                </div>
                <div>
                    <div className='__primary __title'>World Series of DFS/Sports betting</div>
                    <div>Use our platform and our expertise to bring together the world's best players for a POWERFUL branded event.</div>
                </div>
                <div>
                    <div className='__primary __title'>Powered Dashboard Analytics</div>
                    <div>Live game analytics where you can see how your games are performing with live revenue updates.</div>
                </div>
                <div>
                    <div className='__primary __title'>Custom game design and development</div>
                    <div>Do you have a game idea and need help designing and developing?  We can help.</div>
                </div>
                <div>
                    <div className='__primary __title'>API Integration</div>
                    <div>Easy and secure integration with our random number generator, player management, live sports feeds, and analytics.</div>
                </div>
                <div>
                    <div className='__primary __title'>Custom Website development</div>
                    <div>Interested in building your very own custom game platform? We can help.</div>
                </div>

                <div>
                    <div className='__primary __title'>#GenR8 Random Number Generation</div>
                    <div>Utilizing #GenR8 we provide random numbers for any lottery game.</div>
                </div>
                <div>
                    <div className='__primary __title'>#GenR8 Instant Audit</div>
                    <div>Utilizing #GenR8 we provide instant audit capability for any of our games or even your existing games.</div>
                </div>
                <div>
                    <div className='__primary __title'>Royalty Options</div>
                    <div>Want to build your own version of our games? No problem. We have flexibly royalty options for all our games.</div>
                </div>

                <div>
                    <div className='__primary __title'>White label Options</div>
                    <div>Your brand, your style. Our Engine.</div>
                </div>
                <div>
                    <div className='__primary __title'>Consulting  Services</div>
                    <div>We also offer our expertise across the gaming spectrum. Call to discuss how we can help.</div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Services;