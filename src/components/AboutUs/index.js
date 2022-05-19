import React, { useEffect,useState,Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import {Helmet} from "react-helmet";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.scss";
import * as Constants from "./../common/constants";
import CallCenter from "../../icons/CallCenter";
import PlaceHolder from "../../icons/PlaceHolder";

import { gql, useQuery } from '@apollo/client';
import {ABOUT,PARTNER} from '../../GraphQL/Queries'
const AboutUs =(props)=> {
  
  

  const { error,loading,data } =useQuery(ABOUT)
  const data1 =useQuery(PARTNER)
  const [banner,getBanner]=useState({})
  const [games,getGames]=useState({})
  const [mission,getMission]=useState({})
  const [contact,getContact]=useState({})
  const [numbers,setNumber]=useState({visible:null,num:null})
  useEffect(() => {
    if(data){
      getBanner(data.about.banner)
      getGames(data.about.games)
      getMission(data.about.mission)
      getContact(data.about.contact)
    }
  }, [data])
  useEffect(()=>{
    if(data1.data){
      setNumber({
        ...numbers,
        visible:data1.data.partner.numberVisiblePartner,
        num:data1.data.partner.powerplayNumber
      })
    }
  },[data1.data])
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
    return (
      <div className="__about-us-page __page">
        <Helmet>
          <title>About US | Lottery and Fantasy Sports solutions</title>
          <meta
            name="description"
            content="Powered Bar Games is offering the worlds first patent pending Live-Play Lottery and Fantasy Sports solutions. Visit our website for more details"
          />
        </Helmet>
        <Header />

        {
          Object.keys(banner).length?(
            <div className="__viewport __column" style={{backgroundImage:`url(${banner.bg_image.url})`}}>
              <div className="__container __sb __column __f1">
                <div className="__view-port-header">
                  <div className="__title">
                    {banner.title}
                  </div>
                  {/* <div className="__subtitle">
                    Driving disruptive change across the lottery, fantasy sports,
                    and sports betting landscape
                  </div> */}
                </div>
                <div className="__viewport-footer">
                  {/* <div className="__title-2 __primary">What We Do?</div> */}
                  <div className="__subtitle-2">
                  <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: banner.desc }}/>
                    {/* Powered Bar Games is offering the worlds first patent pending
                    Live-Play Lottery and Fantasy Sports solutions. */}
                  </div>
                  {/* <div className="__subtitle-2 __hide-on-large">
                    Our solution can be used for charity fundraising, DFS, State run
                    lotteries, lead generation, or promotional contests.
                  </div> */}
                </div>
              </div>
            </div>
          ):<Fragment/>
        }

        {
          Object.keys(games).length>0?(
            <div className="__main" style={{backgroundImage:`url(${games.bg_image.url})`}}>
              <div className="__container">
                <div className="__content">
                  <div className="__title __primary">
                    {/* Live-Play Lottery <span className="__hide-on-small">Games</span> */}
                    {
                      isMobile1?(
                        <>
                        {games.res_title1}  
                        </>
                      ):(
                        <>
                        {games.title1}  
                        </>
                      )
                    }
                  </div>
                  <div className="__paragraph">
                  {
                      isMobile1?(
                        <>
                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: games.res_desc1 }}/>
                        </>
                      ):(
                        <>
                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: games.desc1 }}/>
                        </>
                      )
                    }
                    
                    {/* <div>
                      Utilize our Powerful fully customizable lottery platform to
                      take your lottery offering to the next level.
                    </div>
                    <div className="__hide-on-small">
                      Whether it is a Sporting event 50/50 draw or a Mega-Millions
                      draw, our solution will provide your customers with the
                      world’s most exciting lottery draw.
                    </div> */}
                  </div>
                </div>
                <div className="__content">
                  <div className="__title __primary">
                    {/* Live-Play Sports <span className="__hide-on-small">Games</span> */}
                    {
                      isMobile1?(
                        <>
                        {games.res_title2}  
                        </>
                      ):(
                        <>
                        {games.title2}  
                        </>
                      )
                    }
                  </div>
                  <div className="__paragraph">
                  {
                      isMobile1?(
                        <>
                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: games.res_desc2 }}/>
                        </>
                      ):(
                        <>
                        <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: games.desc2 }}/>
                        </>
                      )
                    }
                    {/* <div className="__hide-on-small">
                      Would you like to ramp up customer engagement?
                    </div>
                    <div>
                      Use our interactive live sports solution to drive customer
                      behavior by offering exciting new{" "}
                      <span className="__hide-on-small">
                        fantasy sports games, bar games, promotional contests,
                        sports betting games, and even
                      </span>{" "}
                      sports based lotteries.
                    </div> */}
                  </div>
                </div>
                {
                  games.partner_btn?(
                    <div className="__flex">
                      <Link to="/partner" className="__btn">
                        partner with us!
                      </Link>
                    </div>
                  ):<Fragment/>
                }
              </div>
            </div>
          ):<Fragment/>
        }

        {
          Object.keys(mission).length>0?(
            <div className="__about-us" style={{backgroundImage:`url(${mission.bg_image.url})`}}>
              <div className="__container">
                <div className="__title __primary">
                  {mission.title}
                </div>
                <div className="__subtitle">
                  <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: mission.desc }}/>
                  {/* Drive disruptive change across the gaming industry by giving Power
                  to the Players. */}
                </div>
              </div>
            </div>
          ):<Fragment/>
        }

        {
          Object.keys(contact).length>0?(
            <div className="__map" style={{backgroundImage:`url(${contact.bg_image.url})`,backgroundRepeat:'no-repeat',backgroundPosition:isMobile1?'88% top':'100% 100%'}}>
              <div className="__container">
                <div className="__title __primary">
                  {contact.title1}
                </div>
                <div className="__subtitle __primary __flex __flex-center">
                  <CallCenter />  {numbers.num}
                </div>
                <div className="__subtitle __primary __flex __flex-center">
                  <PlaceHolder /> 140 Yonge St., S.200 Toronto, Ontario
                </div>
                <div className="__subtitle-2">
                  <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: contact.desc }}/>
                </div>
                {
                  contact.partner_btn?(
                    <div className="__flex __flex-center">
                      <Link to="/" className="__btn">
                        Contact Us
                      </Link>
                    </div>
                  ):<Fragment/>
                }
              </div>
            </div>
          ):<Fragment/>
        }
        <Footer />
      </div>
    );
  }


export default withRouter(AboutUs);
