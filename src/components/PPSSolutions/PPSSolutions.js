import React from "react";
import {Helmet} from "react-helmet";
import Footer from "../common/Footer";
import Header from "../common/Header";
import "./PPSSolutions.scss";
import img1 from "../../assets/images/solutions/bitmap@2x.jpg";
import img2 from "../../assets/images/solutions/bitmap@2x (02).jpg";
import ListItem from "../../ui/ListItem";
import { Link } from "react-router-dom";
import CallCenter from "../../icons/CallCenter";

const PPSSolutions = (props) => {
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
      <div className="__viewport">
        <div className="__container __flex __flex-center">
          <div className="__f1">
            <div className="__title">SOLUTIONS FOR YOUR INDUSTRY</div>
            <div className="__subtitle">
              No matter your industry, we have a solution to expand your{" "}
              <br className="__hide-on-mediam" /> gaming options and generate
              new revenue streams.
            </div>
          </div>
          <img src={img1} alt="" className="__show-on-mediam" />
        </div>
      </div>
      <div className="__content __content-1">
        <div className="__container __flex __flex-start __sb">
          <div className="__img-1 __hide-on-mediam">
            <img src={img1} alt="" />
          </div>
          <div className="__custom-list">
            <ListItem>
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
            </ListItem>
          </div>
        </div>
      </div>
      <div className="__content __content-2">
        <div className="__container">
          <div className="__custom-list">
            <ListItem>
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
            </ListItem>
          </div>
          <div className="__content-footer">
            <Link to="/partner" className="__solution-btn">
              Partner with us!
            </Link>
            <div className="__call-today">
              Call today for an over-view of our solution and a live demo
            </div>
            <div className="__flex __primary __phone-number __flex-center">
              <CallCenter />
              1-888-777-666-555
            </div>
          </div>
        </div>
        <img src={img2} alt="" className="__img-2" />
      </div>
      <Footer />
    </div>
  );
};

export default PPSSolutions;
