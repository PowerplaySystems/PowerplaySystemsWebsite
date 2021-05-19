import React, { useEffect,useState,Fragment } from "react";
import {Helmet} from "react-helmet";
import "./Services.scss";
import Footer from "../common/Footer";
import Header from "../common/Header";
import img1 from "../../assets/images/services/bitmap@2x.jpg";
import { Link } from "react-router-dom";
import CallCenter from "../../icons/CallCenter";
import img2 from "../../assets/images/services/bitmap.jpg";
import {useQuery,gql} from '@apollo/react-hooks'
import {SERVICES,PARTNER} from '../../GraphQL/Queries'
const Services = (props) => {

  const { error,loading,data } =useQuery(SERVICES)
  const data1 =useQuery(PARTNER)
  const [banner,getBanner]=useState({})
  const [partner,getPartner]=useState({})
  const [list,getList]=useState([])
  const [numbers,setNumber]=useState({visible:null,num:null})
  useEffect(() => {
    if(data){
      getBanner(data.service.banner)
      getPartner(data.service.partner)
      getList(data.service.list)
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
    const isMobile2 = Boolean(viewportWidth <= MOBILE_BREAKPOINT2);
  return (
    <div className="__Services">
      <Helmet>
        <title>Everything You Need To Power Your Gaming Revenue</title>
        <meta
          name="description"
          content="We've got the gaming industry covered - from Fantasy Sports, Lottery games, and Sports Betting we provide everything you need to Power your gaming revenue."
        />
      </Helmet>
      <Header />

      {
        Object.keys(banner).length>0?(
          <div className="__viewport" style={{backgroundImage:isMobile1?'none':`url(${banner.bg_image.url})`,backgroundRepeat:'no-repeat'}}>
            <div className="__container">
              <div className="__title" style={{marginBottom:isMobile2?'1rem':''}}>
                {banner.title}
              </div>
              <div className="__flex __flex-center __image-container">
                <div className="__subtitle" style={{width:'35rem'}}>
                  <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: banner.desc }}/>
                  {/* We've got the gaming industry covered - from Fantasy Sports,{" "}
                  <br className="__hide-on-mediam" /> Lottery games, and Sports
                  Betting we provide everything you{" "}
                  <br className="__hide-on-mediam" /> need to Power your gaming
                  revenue. */}
                </div>
                {
                  isMobile2?<Fragment/>:<img src={img1} alt="" className="__show-on-mediam" />
                }
                
              </div>
            </div>
          </div>
        ):<Fragment/>
      }
      <div className="__main">
        <div className="__content __container">
          {
            list.map(item=>(
              <div>
                <div className="__primary __title">
                  {item.title}
                </div>
                <div>
                  {item.desc}
                </div>
              </div>
            ))
          }
          {/* <div>
            <div className="__primary __title">Off-The-Shelf (OTS) games</div>
            <div>
              Leverage any of our ready to launch OTS games to boost your
              revenue. Fast to launch. Fast to generate revenue.
            </div>
          </div>
          <div>
            <div className="__primary __title">
              World Series of DFS/Sports betting
            </div>
            <div>
              Use our platform and our expertise to bring together the world's
              best players for a POWERFUL branded event.
            </div>
          </div>
          <div>
            <div className="__primary __title">Powered Dashboard Analytics</div>
            <div>
              Live game analytics where you can see how your games are
              performing with live revenue updates.
            </div>
          </div>
          <div>
            <div className="__primary __title">
              Custom game design and development
            </div>
            <div>
              Do you have a game idea and need help designing and developing? We
              can help.
            </div>
          </div>
          <div>
            <div className="__primary __title">API Integration</div>
            <div>
              Easy and secure integration with our random number generator,
              player management, live sports feeds, and analytics.
            </div>
          </div>
          <div>
            <div className="__primary __title">Custom Website development</div>
            <div>
              Interested in building your very own custom game platform? We can
              help.
            </div>
          </div>

          <div>
            <div className="__primary __title">
              #GenR8 Random Number Generation
            </div>
            <div>
              Utilizing #GenR8 we provide random numbers for any lottery game.
            </div>
          </div>
          <div>
            <div className="__primary __title">#GenR8 Instant Audit</div>
            <div>
              Utilizing #GenR8 we provide instant audit capability for any of
              our games or even your existing games.
            </div>
          </div>
          <div>
            <div className="__primary __title">Royalty Options</div>
            <div>
              Want to build your own version of our games? No problem. We have
              flexibly royalty options for all our games.
            </div>
          </div>
          <div>
            <div className="__primary __title">Consulting Services</div>
            <div>
              We also offer our expertise across the gaming spectrum. Call to
              discuss how we can help.
            </div>
          </div>
          <div>
            <div className="__primary __title">White label Options</div>
            <div>Your brand, your style. Our Engine.</div>
          </div> */}
        </div>
        {
          Object.keys(partner).length>0?(
            <>
              <div className="__content-footer __container">
                {
                  partner.partner_btn?(
                    <Link to="/partner" className="__services-btn">
                      Partner with us!
                    </Link>
                  ):<Fragment/>
                }
                <div className="__call-today">
                  {partner.title}
                </div>
                <div className="__flex __primary __phone-number __flex-center">
                  <CallCenter />
                  {numbers.num}
                </div>
              </div>
              <img src={partner.bg_image.url} alt="" className="__img-2" />
            </>
          ):<Fragment/>
        }
      </div>
      <Footer />
    </div>
  );
};

export default Services;
