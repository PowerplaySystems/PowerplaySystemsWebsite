import React, { useEffect,useState,Fragment } from "react";
import { Helmet } from "react-helmet";
import "./index.scss";
import Header from "../common/Header";
import { Link, withRouter } from "react-router-dom";
import genrlogo from "../../assets/images/home/genr-8-logo@2x.png";
import Footer from "../common/Footer";
import powerPlayGameLogo from "../../assets/images/power-play-games-logo.png";

import {useQuery,gql} from '@apollo/react-hooks'
import {HOME_BANNER} from '../../GraphQL/Queries'
const oldHome =(props)=>{
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
      <div className="__home-page">
        <Helmet>
          <title>
            Power Play Systems | Innovative Gaming Management & Solutions
          </title>
          <meta
            name="description"
            content="PowerPlay Systems provides patent-pending gaming solutions that changes the way the world plays lottery, DFS, and Sports betting games. Partner With US now"
          />
        </Helmet>
        <Header />
        {
          Object.keys(banner).length>0?(
          <div className="__viewport __flex" style={{backgroundImage:`url(${banner.banner_image.url})`,backgroundRepeat:'no-repeat',backgroundPosition:'bottom'}}>
            <div className="__container __flex">
              {
                banner.logo?(
                  <div className="__logo"></div>
                ):<Fragment/>
              }
              <div className="__title">{banner.title}</div>
              <div className="__subtitle">
                {banner.title2}
                {/* Driving disruptive change across the lottery, <br />
                fantasy sports, and sports betting landscape */}
              </div>
              <Link to="/partner" className="__homepage-btn">
                Partner with us!
              </Link>
            </div>
          </div>
          ):<Fragment/>
        }

        <div className="__content __content-1">
          {
            Object.keys(home2).length>0?(
            <div className="__wrapper" style={{backgroundImage:isMobile1?`url(${home2.res_bg_image.url})`:`url(${home2.bg_image.url})`,backgroundRepeat:'no-repeat',backgroundPosition:isMobile1?'0 100%':''}}>
              <div className="__container">
                <div className="__main __right">
                  {/* <div>
                    PowerPlay Systems provides patent-pending gaming solutions
                    that changes the way the world plays lottery, DFS, and Sports
                    betting games.{" "}
                    <span className="__hide-on-mediam">
                      With our exclusive live-play experience,
                    </span>{" "}
                    we put the{" "}
                    <span className="__primary">Players in control.</span>
                  </div>
                  <div>
                    Say goodbye to the 'pick-and-wait' game format.{" "}
                    <span className="__hide-on-mediam">
                      No longer will games be played simply by making picks and
                      waiting for results. With our games,
                    </span>{" "}
                    players have the power to control their own destiny by{" "}
                    <span className="__primary">making live-play changes.</span>
                  </div> */}
                  {
                    isMobile1?(

                      <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home2.res_desc }}/>
                    ):(

                      <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home2.desc }}/>
                    )
                  }
                  <div className="__subtitle __primary">
                    {home2.title}
                  </div>
                </div>
                {
                  home2.partner_btn?(
                  <Link to="/partner" className="__homepage-btn">
                    Partner with us!
                  </Link>
                  ):<Fragment/>
                }
              </div>
            </div>
            ):<Fragment/>
          }
        </div>

        <div className="__content __content-2">
        {
            Object.keys(home3).length>0?(
            <div className="__wrapper" style={{backgroundImage:isMobile1?`url(${home3.res_bg_image.url})`:`url(${home3.image.url})`,backgroundRepeat:'no-repeat',backgroundPosition:isMobile1?'bottom':'right 75%'}}>
              <div className="__container">
                <div className="__primary __title">
                  {home3.title}
                </div>
                <div className="__main">
                  {
                    isMobile1?(
                      <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home3.res_desc }}/>
                    ):(
                      <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home3.desc }}/>
                    )
                  }
                  {/* <div>
                    We provide players with{" "}
                    <span className="__primary">Powers</span> to make changes{" "}
                    <span className="__hide-on-mediam">
                      to their lottery picks, fantasy sports picks, and bet slips
                    </span>{" "}
                    during live gameplay.
                  </div>
                  <div>
                    If a fantasy pick is injured early in a game, players can swap
                    him out in real-time!
                  </div>
                  <div>
                    <span className="__hide-on-mediam">
                      There are different Powers for each type of game but all
                    </span>{" "}
                    Powers add another level of engagement and excitement to
                    gameplay.
                  </div> */}
                </div>
              </div>
            </div>
            ):<Fragment/>
        }
        </div>

        <div className="__content __content-3">
        {
            Object.keys(home4).length>0?(
              <div className="__wrapper" style={{backgroundImage:isMobile1?`url(${home4.res_bg_image.url})`:`url(${home4.image.url})`,backgroundRepeat:'no-repeat',backgroundPosition:isMobile1?'bottom':'left bottom'}}>
                <div className="__container">
                  <div className="__title __primary">
                    {home4.title}
                  </div>
                  <div className="__main">
                    {
                      isMobile1?(

                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home4.res_desc }}/>
                      ):(

                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home4.desc }}/>
                      )
                    }
                    
                  </div>
                </div>
              </div>
            ):<Fragment/>
        }
        </div>

        <div className="__content __content-4">
        {
            Object.keys(home5).length>0?(
              <div className="__wrapper" style={{backgroundImage:isMobile1?`url(${home5.res_bg_image.url})`:`url(${home5.image.url})`,backgroundRepeat:'no-repeat',backgroundPosition:isMobile1?'bottom':'right bottom'}}>
                <div className="__container">
                  <div className="__title __primary">
                    {home5.title}
                  </div>
                  <div className="__main">
                  <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home5.desc }}/>
                    {/* <div>
                      With Live-Play Powers, you can control the odds for every game
                      at every level providing unparalleled flexibility.
                    </div>
                    <div>
                      You can decide how many winners there will be and how often
                      they win. You can make it super easy or very difficult to win
                      prizes/jackpots.
                    </div>
                    <div>With our solution, you control the odds.</div> */}
                  </div>
                </div>
              </div>
            ):<Fragment/>
        }
        </div>

        <div className="__content __powerfulgame-options">
          {
            Object.keys(home9).length>0?(
              <div className="__wrapper" style={{backgroundImage:isMobile1?`url(${home9.res_bg_image.url})`:`url(${home9.bg_image.url})`,backgroundRepeat:'no-repeat',backgroundPosition:isMobile1?'100% 100%':'center 10%'}}>
                <div className="__container">
                  <div className="__title __primary">
                    {home9.title1}
                  </div>
                  <div className="__title-wrapper">
                    <div className="__subtitle __primary">
                      {home9.title2}
                    </div>
                  </div>
                  <div className="__main __left">
                    {
                      isMobile1?(

                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home9.res_desc1 }}/>
                      ):(

                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home9.desc1 }}/>
                      )
                    }
                    {/* <div className="__li">
                      <div>
                        <span className="__primary">
                          Live-play Lottery and Bingo games
                        </span>{" "}
                        -{" "}
                        <span className="__hide-on-mediam">
                          Players can change their picks during the live draw!{" "}
                        </span>{" "}
                        We guarantee this is the most exciting lottery game you will
                        ever play.
                      </div>
                    </div>
                    <div className="__li">
                      <div>
                        Play our <span className="__primary">«747»</span> demo
                        lottery game now.
                      </div>
                    </div> */}
                  </div>

                  {
                    home9.lottery_btn?(
                      <div className="__btn-wrapper">
                        <span className="__outine-btn" onClick={() => goTo747()}>
                          Play 747 Demo Lottery
                        </span>
                      </div>
                    ):<Fragment/>
                  }

                  <div className="__subtitle-wrapper">
                    <div className="__subtitle __primary">
                      {home9.title3}
                    </div>
                    <i>{home9.short}</i>
                  </div>
                  <div className="__main __right">
                    {
                      isMobile1?(

                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home9.res_desc2 }}/>
                      ):(

                    <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home9.desc2 }}/>
                      )
                    }
                    {/* <div className="__li">
                      <div>
                        <span className="__primary">
                          Live-play sports-based lottery games
                        </span>{" "}
                        - Unique parlay style games that are sure to captivate the
                        sports fan.
                      </div>
                    </div>
                    <div className="__li">
                      <div>
                        <span className="__primary">
                          Live-Play Daily Fantasy Sports (DFS) games
                        </span>{" "}
                        - Our PowerdFS game puts players in control during the live
                        game.{" "}
                        <span className="__hide-on-large">
                          Swap players, boost points, and more! Also available in a
                          lottery format.
                        </span>
                      </div>
                    </div>
                    <div className="__li">
                      <div>
                        <span className="__primary">
                          Live-play Sports betting games
                        </span>{" "}
                        - enhance your sports bet offering with our sports betting
                        games
                        <span className="__hide-on-large">
                          {" "}
                          that are sure to appeal to novice bettor and casual
                          bettors
                        </span>
                        .
                      </div>
                    </div>
                    <div className="__li">
                      <div>
                        <span className="__primary">
                          World Series Gaming Events
                        </span>{" "}
                        - Think World Series of Poker... Only for DFS or Sports
                        betting.{" "}
                        <span className="__hide-on-large">
                          Bring the world's best DFS players or Sports Bettors
                          together for your event! We can make it happen.
                        </span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            ):<Fragment/>
          }
        </div>
        
        <div className="__content __content-6">
          {
              Object.keys(home6).length>0?(
                <div className="__wrapper" style={{backgroundImage:isMobile1?'none':`url(${home6.bg_image.url})`,backgroundRepeat:'no-repeat',backgroundPosition:'100% 100%'}}>
                  <div className="__container">
                    <div>
                      {
                        home6.logos?(
                          <img className="__brand-logo" src={powerPlayGameLogo} alt="" />
                        ):<Fragment/>
                      }
                      <div className="__paragraph">
                      <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home6.desc }}/>
                        {/* Visit <span className="__primary">PowerPlay Games</span> to
                        experience our ground-breaking live-play games where you have
                        the{" "}
                        <span className="__primary">
                          Power to control your destiny!
                        </span> */}
                      </div>
                      {
                        home6.coming_btn?(
                          <div className="__content-6-btn">Comming Soon</div>
                        ):<Fragment/>
                      }
                    </div>
                  </div>
                </div>
              ):<Fragment/>
          }
        </div>
        <div className="__content __content-7">
          {
            Object.keys(home7).length>0?(
              <div className="__wrapper" style={{backgroundImage:isMobile1?`url(${home7.res_bg_image.url})`:`url(${home7.bg_image.url})`,backgroundRepeat:'no-repeat',backgroundPosition:isMobile1?'bottom':'left 105%'}}>
                <div className="__container">
                  <div className="__title __primary">
                    {home7.title}
                  </div>
                  <div className="__main">
                    {
                      isMobile1?(

                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home7.res_desc }}/>
                      ):(

                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home7.desc }}/>
                      )
                    }
                    {/* <div>
                      Our games use our patent-pending{" "}
                      <span className="__primary">#GenR8 technology</span> to ensure
                      all games are secure and 100% fraud-proof.
                    </div>
                    <div className="__hide-on-small">
                      #GenR8 audits will be performed within seconds of game
                      completion providing instant verified results.
                    </div>
                    <div>
                      That's right! No more expensive{" "}
                      <span className="__hide-on-small">and time-consuming</span>{" "}
                      lottery audits required.{" "}
                      <div className="__show-on-small"> </div> Instant results.
                      Instantly verified. Only from PowerPlay Systems.
                    </div> */}
                    {
                      home7.logos?(
                        <img src={genrlogo} alt="" className="__genrlogo" />
                      ):<Fragment/>
                    }
                  </div>
                </div>
              </div>
            ):<Fragment/>
          }
        </div>
        <div className="__content __content-8">
          {
            Object.keys(home8).length>0?(
              <div className="__wrapper" style={{backgroundImage:`url(${home8.bg_image.url})`,backgroundRepeat:'no-repeat',backgroundPosition:isMobile1?'66% center':'100% 0'}}>
                <div className="__container">
                  <div className="__title __primary">
                    {home8.title}
                  </div>
                  <div className="__main">
                    {
                      isMobile1?(

                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home8.res_desc1 }}/>
                      ):(
                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home8.desc1 }}/>
                      )
                    }
                    {/* <div>
                      PowerPlay Systems offers seamless and safe live-play
                      experiences{" "}
                      <span className="__hide-on-small">for your customers</span>.
                    </div>
                    <div>
                      Our platform is built using industry-leading technology that
                      is scalable, ultra-fast, SSL encrypted, and digitally secured.
                    </div>
                    <div className="__hide-on-small">
                      We have ensured that your customers' personal data is stored
                      securely, and we are completely transparent in all our
                      transactions.
                    </div> */}
                  </div>
                  <div className="__we-are-prepare">
                    <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: home8.desc2 }}/>
                    {/* We are passionate about making sure that your customers will
                    have an interactive and fun-filled experience when they use our
                    service, whether they win or lose. */}
                  </div>
                  {
                    home8.partner_btn?(
                      <Link to="/partner" className="__homepage-btn">
                        Partner with us!
                      </Link>
                    ):<Fragment/>
                  }
                </div>
              </div>
            ):<Fragment/>
          }
        </div>
        <Footer />
      </div>
    );
  }


export default withRouter(oldHome);
