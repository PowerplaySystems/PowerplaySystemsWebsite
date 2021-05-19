import React, { useEffect,useState,Fragment } from "react";
import {Helmet} from "react-helmet";
import Footer from "../common/Footer";
import Header from "../common/Header";
import "./PPSSolutions.scss";
import img1 from "../../assets/images/solutions/bitmap@2x.jpg";
import img2 from "../../assets/images/solutions/bitmap@2x (02).jpg";
import ListItem from "../../ui/ListItem";
import { Link } from "react-router-dom";
import CallCenter from "../../icons/CallCenter";

import {useQuery,gql} from '@apollo/react-hooks'
import { SOLUTIONS,PARTNER } from '../../GraphQL/Queries'
const PPSSolutions = (props) => {

  const { error,loading,data } =useQuery(SOLUTIONS)
  const data1 =useQuery(PARTNER)
  const [banner,getBanner]=useState({})
  const [charity,getCharity]=useState({})
  const [partner,getPartner]=useState({})
  const [numbers,setNumber]=useState({visible:null,num:null})
  useEffect(() => {
    if(data){
      getBanner(data.solution.banner)
      getCharity(data.solution.charity)
      getPartner(data.solution.partner)
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
    <div className="__PPSSolutions">
      <Helmet>
        <title>
          Gaming solutions for your industry | Generate revenue Streams
        </title>
        <meta
          name="description"
          content="No matter your industry, we have a solution to expand your gaming options and generate new revenue streams. Visit our website for more details"
        />
      </Helmet>
      <Header />
      {
        Object.keys(banner).length>0?(
          <div className="__viewport" style={{backgroundImage:isMobile1?'none':`url(${banner.bg_image.url})`,backgroundRepeat:'no-repeat'}}>
            <div className="__container __flex __flex-center">
              <div className="__f1">
                <div className="__title">
                  {banner.title}
                </div>
                <div className="__subtitle">
                  <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: banner.desc }}/>
                  {/* No matter your industry, we have a solution to expand your{" "}
                  <br className="__hide-on-mediam" /> gaming options and generate
                  new revenue streams. */}
                </div>
              </div>
              <img src={img1} alt="" className="__show-on-mediam" />
            </div>
          </div>
        ):<Fragment/>
      }

      {
        Object.keys(charity).length>0?(
          <Fragment>
            <div className="__content __content-1">
              <div className="__container __flex __flex-start __sb">
                <div className="__img-1 __hide-on-mediam">
                  <img src={charity.image1.url} alt="" />
                </div>
                <div className="__custom-list">
                  <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: charity.desc1 }}/>
                  {/* <ListItem>
                    <span className="__primary __title">Charity Organizations</span>{" "}
                    <span className="__hide-on-mediam">-</span>{" "}
                    <div className="__show-on-mediam"></div> Power-up your charity
                    fundraising. Leverage any of our games to create engaging
                    experiences for your charity{" "}
                    <span className="__hide-on-small">such as:</span>
                    <ListItem className="__first-child __hide-on-mediam">
                      Progressive 50/50 live-play lotteries
                    </ListItem>
                    <ListItem className="__hide-on-mediam">
                      Sports based options to appeal to the sports fan (also for
                      sports based charity)
                    </ListItem>
                    <ListItem className="__hide-on-mediam">
                      Custom designed experiences to match your brand.
                    </ListItem>
                  </ListItem>
                  <ListItem>
                    <span className="__primary __title">DFS Operators</span>{" "}
                    <span className="__hide-on-mediam">-</span>{" "}
                    <div className="__show-on-mediam"></div> Offer our Live-Play DFS
                    on your site for a new source of revenue.{" "}
                    <span className="__hide-on-mediam">
                      Integrate our games or choose a royalty based option.
                    </span>
                  </ListItem>
                  <ListItem>
                    <span className="__primary __title">
                      On-line Gaming Operators
                    </span>{" "}
                    <span className="__hide-on-mediam">-</span>{" "}
                    <div className="__show-on-mediam"></div>{" "}
                    <span className="__hide-on-mediam">For online integration,</span>{" "}
                    any of our games can be seamlessly integrated with your existing
                    offering.{" "}
                    <span className="__hide-on-small">
                      Royalty options also available.
                    </span>
                  </ListItem>
                  <ListItem>
                    <span className="__primary __title">Casinos</span>{" "}
                    <span className="__hide-on-mediam">-</span>{" "}
                    <div className="__show-on-mediam"></div> Integrate our games into
                    your brick and mortar location or with your online presence.
                    <ListItem className="__hide-on-mediam">
                      We provide a geo-fencing option where players have to be on-site
                      at your casino property to play. Players can pay-to-play for
                      cash jackpots or free-to-play for casino credits, food, frequent
                      player points, etc.
                    </ListItem>
                    <ListItem className="__hide-on-mediam">
                      For your in-person sportsbook operation we can integrate our
                      games with your existing options for added revenue.
                    </ListItem>
                    <ListItem className="__hide-on-mediam">
                      For online integration, any of our games can be seamlessly
                      integrated with your existing offering.
                    </ListItem>
                    <ListItem className="__hide-on-mediam">
                      Custom designed experiences to match your brand
                    </ListItem>
                  </ListItem> */}
                </div>
              </div>
            </div>
            
            <div className="__content __content-2">
              <div className="__container">
                <div className="__custom-list">
                <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: charity.desc2 }}/>
                  {/* <ListItem>
                    <span className="__primary __title">
                      Professional Sports organizations
                    </span>{" "}
                    <span className="__hide-on-mediam">
                      - Utilize our solution to
                    </span>{" "}
                    <div className="__show-on-small"></div> raise funds at your live
                    sporting events via in-game contests
                    <span className="__hide-on-small">
                      {" "}
                      and integrated merchandise marketing. More excitement. More
                      revenue
                    </span>
                    .
                  </ListItem>
                  <ListItem>
                    <span className="__primary __title">State-Run Gaming</span>
                    <ListItem className="__custom-list-item">
                      Offer any of our exciting interactive games to compliment your
                      existing portfolio of games.
                    </ListItem>
                    <ListItem className="__hide-on-mediam">
                      Offer a new line of sports based lotteries to open a whole new
                      market.
                    </ListItem>
                    <ListItem className="__hide-on-mediam">
                      Increase revenue by tapping into a new mobile market and
                      increased advertising options.
                    </ListItem>
                    <ListItem className="__hide-on-mediam">
                      Custom designed experiences to match your brand
                    </ListItem>
                  </ListItem>
                  <ListItem>
                    <span className="__primary __title">
                      Media or Retail Businesses
                    </span>
                    <ListItem className="__custom-list-item">
                      Our games can be utilized as a promotional contest to drive
                      players to your media platform or website.{" "}
                      <span className="__hide-on-mediam">
                        Games can have an integrated marketing component to push
                        players to TV/Radio or purchase merchandise.
                      </span>
                    </ListItem>
                    <ListItem className="__hide-on-mediam">
                      Custom designed experiences to match your brand
                    </ListItem>
                  </ListItem> */}
                </div>
                <div className="__content-footer">
                  {
                    partner.partner_btn?(
                      <Link to="/partner" className="__solution-btn">
                        Partner with us!
                      </Link>
                    ):<Fragment/>
                  }
                  <div className="__call-today">
                  <div style={{whiteSpace:'pre-wrap'}}  dangerouslySetInnerHTML={{ __html: partner.desc }}/>
                    {/* Call today for an over-view of our solution and a live demo */}
                  </div>
                  <div className="__flex __primary __phone-number __flex-center">
                    <CallCenter />
                    {numbers.num}
                  </div>
                </div>
              </div>
              <img src={charity.image2.url} alt="" className="__img-2" />
            </div>
          </Fragment>
        ):<Fragment/>
      }
      <Footer />
    </div>
  );
};

export default PPSSolutions;
