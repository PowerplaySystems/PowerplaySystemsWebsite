import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {Helmet} from "react-helmet";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.scss";
import * as Constants from "./../common/constants";
import CallCenter from "../../icons/CallCenter";
import PlaceHolder from "../../icons/PlaceHolder";
class AboutUs extends Component {
  constructor(props) {
    super(props);
    window.scroll(0, 0);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
    };
  }
  markDown(text) {
    console.log(text);
    if (text) {
      //Here I replace special chars for html tags, this is the example: __ Text in bold __
      return text.replace(/__(.*?)__((_+|\W+|$))/g, "<strong>$1</strong>$2");
    }
  }
  componentDidMount() {
    window.scroll(0, 0);
    fetch("https://" + Constants.URL + "/api/website_footer/get_aboutus.php")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          result = result.records;

          this.setState({
            data: result,
          });
        },
        (error) => {
          this.setState({
            hasError: true,
            error: error,
          });
        }
      );
  }
  render() {
    return (
      <div className="__about-us-page __page">
        <Helmet>
          <title>About US | Lottery and Fantasy Sports solutions</title>
          <meta
            name="description"
            content="Powerplay Systems is offering the worlds first patent pending Live-Play Lottery and Fantasy Sports solutions. Visit our website for more details"
          />
        </Helmet>
        <Header />
        <div className="__viewport __column">
          <div className="__container __sb __column __f1">
            <div className="__view-port-header">
              <div className="__title">PowerPlay Systems</div>
              <div className="__subtitle">
                Driving disruptive change across the lottery, fantasy sports,
                and sports betting landscape
              </div>
            </div>
            <div className="__viewport-footer">
              <div className="__title-2 __primary">What We Do?</div>
              <div className="__subtitle-2">
                Powerplay Systems is offering the worlds first patent pending
                Live-Play Lottery and Fantasy Sports solutions.
              </div>
              <div className="__subtitle-2 __hide-on-large">
                Our solution can be used for charity fundraising, DFS, State run
                lotteries, lead generation, or promotional contests.
              </div>
            </div>
          </div>
        </div>

        <div className="__main">
          <div className="__container">
            <div className="__content">
              <div className="__title __primary">
                Live-Play Lottery <span className="__hide-on-small">Games</span>
              </div>
              <div className="__paragraph">
                <div>
                  Utilize our Powerful fully customizable lottery platform to
                  take your lottery offering to the next level.
                </div>
                <div className="__hide-on-small">
                  Whether it is a Sporting event 50/50 draw or a Mega-Millions
                  draw, our solution will provide your customers with the
                  world’s most exciting lottery draw.
                </div>
              </div>
            </div>
            <div className="__content">
              <div className="__title __primary">
                Live-Play Sports <span className="__hide-on-small">Games</span>
              </div>
              <div className="__paragraph">
                <div className="__hide-on-small">
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
                </div>
              </div>
            </div>
            <div className="__flex">
              <Link to="/partner" className="__btn">
                partner with us!
              </Link>
            </div>
          </div>
        </div>

        <div className="__about-us">
          <div className="__container">
            <div className="__title __primary">Our Mission</div>
            <div className="__subtitle">
              Drive disruptive change across the gaming industry by giving Power
              to the Players.
            </div>
          </div>
        </div>

        <div className="__map">
          <div className="__container">
            <div className="__title __primary">Where to find us?</div>
            <div className="__subtitle __primary __flex __flex-center">
              <CallCenter /> 844-268-1573
            </div>
            <div className="__subtitle __primary __flex __flex-center">
              <PlaceHolder /> 140 Yonge St., S.200 Toronto, Ontario
            </div>
            <div className="__subtitle-2">
              Call today for an over-view of our solution and a live demo
            </div>
            <div className="__flex __flex-center">
              <Link to="/" className="__btn">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(AboutUs);
