import React, { useEffect,useState,Fragment } from "react";
import { Helmet } from "react-helmet";
import "./index.scss";
import Header from "../common/Header";
import { Link, withRouter } from "react-router-dom";
import genrlogo from "../../assets/images/home/genr-8-logo@2x.png";
import Footer from "../common/Footer";
import powerPlayGameLogo from "../../assets/images/power-play-games-logo.png";

import HomeBanner from "../../assets/images/home-new/banner-bg.png";
import Homebg01 from "../../assets/images/home-new/home-bg-01.png";
import Homebg02 from "../../assets/images/home-new/home-bg-02.png";
import Homebg03 from "../../assets/images/home-new/home-bg-03.jpg";
import Homebg04 from "../../assets/images/home-new/home-bg-04.jpg";
import Homebg05 from "../../assets/images/home-new/home-bg-05.jpg";
import Homebgres02 from "../../assets/images/home-new/home-bg-res-02.png";
import Homebgres04 from "../../assets/images/home-new/home-bg-res-04.jpg";
import Homebgres05 from "../../assets/images/home-new/home-bg-res-05.jpg";
import Homebgres06 from "../../assets/images/home-new/numbers-cards-bg.png";
import Homebgres07 from "../../assets/images/home-new/map-pin-dynamic-gradient.png";
import Homebgres08 from "../../assets/images/home-new/notify-heart-dynamic-gradient.png";
import Homebgres09 from "../../assets/images/home-new/at-dynamic-gradient.png";
import homePageTopLogo from '../../assets/images/home-new/homePageTopLogo.png';
import bgnumber from '../../assets/images/home-new/bgnumber.png';

import {useQuery,gql} from '@apollo/react-hooks'
import {HOME_BANNER} from '../../GraphQL/Queries'
const Home =(props)=>{
  const { error,loading,data } =useQuery(HOME_BANNER)
  const [banner,getBanner]=useState({})
  const [home2,getHome2]=useState({})
  const [home3,getHome3]=useState({})
  const [home4,getHome4]=useState({})
  const [home5,getHome5]=useState({})
  const [home6,getHome6]=useState({})
  const [home7,getHome7]=useState({})
  const [home8,getHome8]=useState({})
  const [home9,getHome9]=useState({})
  useEffect(() => {
    // console.log(loading)
    if(data){
      getBanner(data.home.banner)
      getHome2(data.home.home2)
      getHome3(data.home.home3)
      getHome4(data.home.home4)
      getHome5(data.home.home5)
      getHome6(data.home.home_coming)
      getHome7(data.home.home_adults)
      getHome8(data.home.home_trust)
      getHome9(data.home.home_options)
    }
  }, [data])
  console.log(banner)
  const goTo747=()=> {
    return props.history.push({
      pathname: "/747",
      state: { gameData: "demo" },
    });
  }
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
    const isMobile1 = Boolean(viewportWidth <= MOBILE_BREAKPOINT1);
    return (
      <div className="__home-page-wrp">
         <Helmet>
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-222300270-1">
                </script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag() &#123; dataLayer.push(arguments);&#125;
                    gtag('js', new Date());
                    gtag('config', 'UA-222300270-1');
                </script>
        </Helmet>
        <Helmet>
          <title>
            Power Play Systems | Innovative Gaming Management & Solutions
          </title>
          <meta
            name="description"
            content="Powered Bar Games provides patent-pending gaming solutions that changes the way the world plays lottery, DFS, and Sports betting games. Partner With US now"
          />
        </Helmet>
        <Header />
            <div className="__banner-wrp" style={{backgroundImage:`url(${HomeBanner})`}}>
                {/* <img src={HomeBanner} alt=""/> */}
                <div className="__container">
                    <img src={homePageTopLogo} className="topLogo"/>
                    <h1>Power up your bar revenue</h1>
                    <p>Our exclusive free-to-play live sports based games will generate <br/>unparalleled excitement for your bar patrons.</p>
                    <Link to="/partner" className="__homepage-btn-wrp">Partner with us</Link>
                </div>
            </div>
            <div className="__left-img-text-wrp" style={{backgroundImage:`url(${Homebg01})`, backgroundRepeat:'no-repeat', maxWidth: 1440, margin: '0 auto'}}>
                <div className="__right-side-content">
                    <div className="__container">
                        <div className="barPowered">
                            <p>Powered Bar Games provides exciting <strong>new bar game solutions</strong> that power customer engagement. With our exclusive customized in-bar experience, we provide a platform like no other to drive excitment/engement and therefore revenue for your bar.</p>
                            <p>We provide the app design and all marketing materials. We even provide up to a <strong>$100,000 fully insured prize!</strong></p>
                            <p>Do you think a $100,000 prize will draw customers to your bar?</p>
                            <h2>Is your bar Powered?</h2>
                            {/* <Link to="/partner" className="__homepage-btn-wrp">Partner with us!</Link> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="__right-img-text-wrp" style={{backgroundImage:isMobile1?`url(${Homebgres02})`:`url(${Homebg02})`, backgroundRepeat:'no-repeat', maxWidth: 1140, margin: '0 auto', backgroundPosition: "0px 50px"}}>
                <div className="__left-side-content">
                    <div className="__container">
                        <div className="Powerful-wrp">
                            <h2 >Powerful Live-game engagement</h2><br />
                            <p>All our games are based on <strong>live sporting event</strong> data. Whether you have NFL, MLB, NHL, NBA, Soccer or Cricket fans, we’ve got you covered!</p>
                            <p>Imagine <strong>the level of engagement</strong> we can achieve!</p>
                            <p><strong>Exclusive in-bar only entry</strong> ensures customers will keep coming back to play again and again.</p>
                            {/* <Link to="/partner" className="__homepage-btn-wrp">Partner with us!</Link> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="numbers-say-it-all" style={{backgroundImage:isMobile1?`url(${bgnumber})`:`url(${Homebgres06})`, backgroundRepeat:'no-repeat', maxWidth: 1440, margin: '0 auto'}}>
                <h1 className="numbers-title">The numbers say it all</h1>
                <div className="numbers-cards-wrp">
                    <div className="numbers-cards">
                        <div className="cardNumber-Icon">
                            <h2>30%</h2>
                            <img src={Homebgres07} alt=""/>
                        </div>
                        <p className="class-sub-text">of people select a bar to visit based on promotions and rewards</p>
                    </div>
                    <div className="numbers-cards">
                        <div className="cardNumber-Icon">
                            <h2>33%</h2>
                            <img src={Homebgres08} alt=""/>
                        </div>
                        <p className="class-sub-text">of contest participants are open to receiving information about the brand and partners</p>
                    </div>
                    <div className="numbers-cards">
                        <div className="cardNumber-Icon">
                            <h2>4,400%</h2>
                            <img src={Homebgres09} alt=""/>
                        </div>
                        <p className="class-sub-text">average ROI of email marketing for our contests</p>
                    </div>
                </div>
            </div>
            <div className="__left-img-text-wrp" style={{backgroundImage:`url(${Homebg03})`, backgroundRepeat:'no-repeat', maxWidth: 1440, margin: '0 auto'}}>
                <div className="__right-side-content">
                    <div className="__container">
                        <div className="powerfulRevenueWrp">
                            <h2 className="powerfulRevenue">Powerful Revenue</h2>
                            <p>Our target is to increase your revenue. If we don’t achieve tangible results within 6 month, we will offer our services free until we meet your expectations.</p>
                            <p>We can make this offer because we are super confident in our ability to suceed.</p>
                            <p>When you consider increased bar sales, advertising revenue, ancillary revenue, and lead generation... it’s a slam dunk! or Homerun! or Touchdown!</p>
                            <Link to="/partner" className="__homepage-btn-wrp __powerfulRevenueButton">Learn more</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="__right-img-text-wrp livePlaymobile" style={{backgroundImage:isMobile1?`url(${Homebgres04})`:`url(${Homebg04})`, backgroundRepeat:'no-repeat', maxWidth: 1140, margin: '0 auto', backgroundPosition: "0px 50px"}}>
                <div className="__left-side-content" style={{
                    maxWidth: 610
                }}>
                    <div className="__container">
                        <div className="livePlay">
                            <h2 style={{
                                marginBottom: "0px !important"
                            }} className="__livePlayh2">Live-Play sport-based games</h2>
                            <h3>Available for any sport, any league... worldwide</h3>
                            <ul className="__content-sport-list">
                                <li>
                                    {isMobile1 ? <div className="__mainDiv"><div className="bullet"></div><span>NFL</span></div> :<span>NFL</span>}
                                    
                                    <p>Available September through to the Super Bowl. We also have an NFL Draft Contest!</p>
                                </li>
                                <li>
                                    {isMobile1 ? <div className="__mainDiv"><div className="bullet"></div><span>NFL</span></div> :<span>NFL</span>}
                                    <p>Available October through to the Stanley Cup Finals.</p>
                                </li>
                                <li>
                                    {isMobile1 ? <div className="__mainDiv"><div className="bullet"></div><span>NBA</span></div> :<span>NBA</span>}
                                    <p>Available from October through to the Champoinship.</p>
                                </li>
                                <li>
                                    {isMobile1 ? <div className="__mainDiv"><div className="bullet"></div><span>MLB</span></div> :<span>MLB</span>}
                                    <p>Available from May through to the World Series.</p>
                                </li>
                                <li>
                                    {isMobile1 ? <div className="__mainDiv"><div className="bullet"></div><span>Soccer</span></div> :<span>Soccer</span>}
                                    <p>Year round!</p>
                                </li>
                                <li>
                                    {isMobile1 ? <div className="__mainDiv"><div className="bullet"></div><span>Cricket</span></div> :<span>Cricket</span>}
                                    <p>Year round!</p>
                                </li>
                            </ul>
                            {!isMobile1 && <h3>You can pick from any of the sports above!</h3>}
                            <Link to="/partner" className="__homepage-btn-wrp" style={{
                                padding: "14px 83px 8px 83px"
                            }}>Partner with us!</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="__left-img-text-wrp" style={{backgroundImage:isMobile1?`url(${Homebgres05})`:`url(${Homebg05})`, backgroundRepeat:'no-repeat', maxWidth: 1440, margin: '0 auto'}}>
                <div className="__right-side-content">
                    <div className="__container">
                        <div className="trustSecurity">
                        <h2>Trust and Security</h2>
                            <p>Powered Bar Games offers seamless and safe live-play experiences for your customers. </p>
                            <p>Our platform is built using industry-leading technology that is scalable, ultra-fast, SSL encrypted, and digitally secured. </p>
                            <p>We have ensured that your customers' personal data is stored securely, and we are completely transparent in all our transactions.</p>
                            <Link to="/partner" className="__homepage-btn-wrp lastButton">Partner with us!</Link>
                        </div>
                    </div>
                </div>
            </div>
        <Footer />
      </div>
    );
  }


export default withRouter(Home);
