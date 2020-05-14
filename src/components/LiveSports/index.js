import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import DrawTimer from "./../common/DrawTimer";
import "./index.css";
import $ from "jquery";
import "slick-carousel";

import * as Constants from "./../common/constants";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
// import { connect } from 'react-redux';

var bgFirst = require("./../../assets/images/live_sports/live_sports_platform.jpg");
var bg3 = require("./../../assets/images/select-game/row-3.jpg");

var pid, ptype, min, max;
var activeAssociation = -1;
var popupText = "Error";
var popupHader = "Sorry!";

var mSportId = -1;
var enterGameId = -1;
var entryGame = [];

var allSportsArray = [
  { id: 1, name: "Hockey" },
  { id: 2, name: "Baseball" },
  { id: 3, name: "Basketball" },
  { id: 4, name: "Football" },
];

let firstRowStyle = {
  backgroundImage: "url(" + bgFirst + ")",
  backgroundSize: "cover",
  overflow: "hidden",
  width: "100%",
  height: "573px",
};
let row3bg = {
  backgroundImage: "url(" + bg3 + ")",
  backgroundSize: "cover",
  overflow: "hidden",
  width: "100%",
  height: "961px",
  marginTop: "150px",
};

class SelectGames extends Component {
  componentDidMount() {
   
    window.scrollTo(0, 0);
    $("#slider").slick({
      dots: true,
      centerMode: true,
      slidesToShow: 1,
      variableWidth: true,
      initialSlide: 1,
    
      swipe: true,
      infinite: true,
      dotsClass: "slider-dots",
      prevArrow: $(".corousal-arrow-left"),
      nextArrow: $(".corousal-arrow-right"),
      // appendDots: $('.slider-dots')
    });
  }
  goToSelectGames(sport, leagues, gametype) {
    console.log("Hi");
    let path = "/select-games";
    this.props.history.push({
      pathname: path,
      state: {
        league: leagues,
        gametype: gametype,
        sport: sport,
      },
    });
  }
  goToLogin() {
    //this.props.history.push("../login");
  }
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      activeTab: 0,
    };

    //alerts
    this.goToSelectGames = this.goToSelectGames.bind(this);
  }

  //functions To Handle UI elements Clicks

  onExploreGamesClicked() {
    // const explore = document.getElementById("explore-games_live");
    // if (explore) {
    //   explore.scrollIntoView({ block: "start", behavior: "smooth" });
    // }
  }

  componentWillUnmount() {
    // document.getElementsByTagName("META")[2].content = "width=1400";
  }
  ////////////////////////////
  //PAGE COMPONENTS
  ////////////////////////////

  componentPartnerButton() {
    return (
      <div className="partner-with-us-button-wrapper">
        <div
          className="partner-with-us-button"
          onClick={(e) =>
            this.props.history.push({
              pathname: "/partner",
            })
          }
        >
          <div className="partner-with-us-text"> Partner With Us!</div>
        </div>
      </div>
    );
  }
  componentEnterButton() {
    return (
      <div className="contest-wrapper-button-wrapper">
        <div
          className="contest-wrapper-button"
          onClick={(e) =>
            this.props.history.push({
              pathname: "/draft-day",
            })
          }
        >
          <div className="contest-wrapper-btn-text"> Enter Now!</div>
        </div>
      </div>
    );
  }
  ////////////////////////////
  //PAGE COMPONENTS END
  ////////////////////////////
  //render function
  render() {
    return (
      <>
        <Header />
        <div className="live-sports-content">
          <div className="live-sports">
            Our Live Sports Games <br />
            Defy Reality.
          </div>
          <br />
          <div className="interactive-live">
            Interactive live-game Powerplays allow players to create their own
            alternate winning results
          </div>
          <br />
          <div className="engage">
            Engage your customers with our integrated marketing live sports
            platform. We offer you a cutting-edge live sports platform that puts
            your customers in control and allows you to directly steer their
            behavior.
          </div>
          {this.componentPartnerButton()}
          <div className="macbook-air-img-wrapper">
            <img
              className="mac-img"
              src={require("../../assets/images/live_sports/macbook-air.png")}
            />
            <img
              className="mac1-img"
              src={require("../../assets/images/live_sports/phone-11-pro-back.png")}
            />
          </div>
          <br />
          <div className="headings-text">Ultimate Interactive Engagement</div>
          <br />
          <div className="paltform-text">
            Our platform allows players to utilize{" "}
            <span className="text-span"> Powerplays </span> which can be used to
            boost their point total live during the game. With powerplays,
            participants can perform many
            <span className="text-span">
              {" "}
              interactive actions during the live game{" "}
            </span>{" "}
            adding a new level of excitement.
          </div>
          <br />
          <div className="img-text-wrapper">
            <div className="imag1-div">
              <img
                className="img1"
                src={require("../../assets/images/live_sports/group-4.png")}
              />
              <img
                className="img2"
                src={require("../../assets/images/live_sports/group-4a.png")}
              />
            </div>
            <div className="textboxes-wrapper">
              <div className="img1-wrapper">
                <div className="img1-heading1">Imagine the Power</div>
                <div className="img1-txt">
                  If a player runs out of Powerplays, we can even motivate them
                  to earn Powerplays by performing tasks that{" "}
                  <span className="text-span">
                    {" "}
                    increase engagement with your business!{" "}
                  </span>
                </div>
              </div>
              <div className="img1-wrapper">
                <div className="img1-heading1">Eyes on-screen</div>
                <div className="img1-txt">
                  we are ultimately focused on interactive sessions, which means
                  ‘eyes on-screen’ during our events. Our interactive lottery
                  platform is designed to keep player engagement high,
                  therefore,{" "}
                  <span className="text-span">
                    {" "}
                    increasing the number of players in every event.{" "}
                  </span>
                </div>
              </div>
              <div className="img1-wrapper">
                <div className="img1-heading1">Unlimited Access</div>
                <div className="img1-txt">
                  Our platform is designed for{" "}
                  <span className="text-span">
                    {" "}
                    all PC and mobile devices,{" "}
                  </span>{" "}
                  bringing customers access to your Powerplay based events at
                  any time, in any place, without boundaries.
                </div>
              </div>
              <div
                className="read-more-button"
                onClick={() => this.props.history.push("/live-sports-more")}
              >
                <div className="read-more-button-txt"> Read More </div>
                <span className="arrow">→</span>
              </div>
            </div>
          </div>
          <div className="sec-2">
            <div className="sec-2-left">
              <div className="sec-2-left-heading">Do you want to</div>
              <div className="sec-2-left-text1">
                Run promotional contests that are fully customized and
                integrated with your existing website{" "}
                <span className="text-span"> ? </span>
              </div>
              <div className="sec-2-left-hr" />
              <br />
              <div className="sec-2-left-text2">
                Advertise to players during the live game{" "}
                <span className="text-span"> ? </span>
              </div>
              {this.componentPartnerButton()}
            </div>
            <div className="sec-2-right">
              <div className="sec-2-right-text1">
                Powerplay live sports offers you unique and engaging
                sports-based experiences with an interactive twist.
              </div>
              <div className="sec-2-right-l">
                <div className="sec-2-right-l-wrapper sec-2-right-l-wrapper-first">
                  <div>
                    <img
                      src={require("../../assets/images/live_sports/noun-rugby-betting-2084913.png")}
                    />
                  </div>
                  <div className="sec-2-right-l-wrapper-heading">
                    Sports Betting
                  </div>
                  <div className="sec-2-right-l-wrapper-text">
                    We are taking parlay sports betting to another level with
                    multiple game variations and real time interaction.
                  </div>
                </div>
                <div className="sec-2-right-l-wrapper sec-2-right-l-wrapper-second">
                  <div>
                    <img
                      src={require("../../assets/images/live_sports/trophy.png")}
                    />
                  </div>
                  <div className="sec-2-right-l-wrapper-heading">
                    Promotional Contests
                  </div>
                  <div className="sec-2-right-l-wrapper-text">
                    All of our games can be utilized for promotional contests
                    that are fully customized to your needs.
                  </div>
                </div>
                <div className="sec-2-right-l-wrapper sec-2-right-l-wrapper-third">
                  <div>
                    <img
                      src={require("../../assets/images/live_sports/group-2.png")}
                    />
                  </div>
                  <div className="sec-2-right-l-wrapper-heading">
                    Fantasy Sports
                  </div>
                  <div className="sec-2-right-l-wrapper-text">
                    We have unique engaging Fantasy Sports games with an
                    interactive twist.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="headings-text-try">
            Try one of our promotional contests
          </div>
        
          <div id="slider">
            <div class="corousal-img-wrapper">
              <div className="contest-solo-wrapper">
                <div className="contest-solo-content fff">
                  <div className="text-heading-wrapper">
                    <div className="contest-wrapper-heading1">
                      WIN <span className="text-span"> $25k </span>
                    </div>
                    <div className="contest-wrapper-heading2">
                      Chase The Ace
                    </div>
                    <div className="contest-wrapper-text">
                      April 23rd, 2020 @ 8:00PM EST
                    </div>
                    {this.componentEnterButton()}
                  </div>
                </div>
              </div>
            </div>
            <div class="corousal-img-wrapper">
              <div className="contest-solo-wrapper">
                <div className="contest-solo-content ccc">
                  <div className="text-heading-wrapper">
                    <div className="contest-wrapper-heading1">
                      WIN <span className="text-span"> $25k </span>
                    </div>
                    <div className="contest-wrapper-heading2">
                      2020 NFL Power Draft
                    </div>
                    <div className="contest-wrapper-text">
                      April 23rd, 2020 @ 8:00PM EST
                    </div>
                    {this.componentEnterButton()}
                  </div>
                </div>
              </div>
            </div>
            <div class="corousal-img-wrapper">
              <div className="contest-solo-wrapper">
                <div className="contest-solo-content fff">
                  <div className="text-heading-wrapper">
                    <div className="contest-wrapper-heading1">
                      WIN <span className="text-span"> $25k </span>
                    </div>
                    <div className="contest-wrapper-heading2">
                      Chase The Ace
                    </div>
                    <div className="contest-wrapper-text">
                      April 23rd, 2020 @ 8:00PM EST
                    </div>
                    {this.componentEnterButton()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="corousal-arrows">
            <div className="corousal-arrow-left" />
            <div className="corousal-arrow-right" />
          </div>
          <div className="headings-text">
            Motivate players to complete a marketing focused task
          </div>
          <br />
          <div className="text-grey">
            If a player runs out of Powerplays, you can motivate them to earn
            more by completing a marketing focused task such as:
          </div>
          <div className="player-motivate-wrapper">
            <div className="player-motivate-solo-wrapper">
              <div className="player-motivate-img">
                <img
                  src={require("../../assets/images/live_sports/social-media.png")}
                />
              </div>
              <div className="player-motivate-text1">
                Visit your social media pages &amp; engage with your social
                media activities.
              </div>
            </div>
            <div className="player-motivate-solo-wrapper">
              <div className="player-motivate-img">
                <img src={require("../../assets/images/live_sports/www.png")} />
              </div>
              <div className="player-motivate-text23">
                Visit your website or any other media platform.
              </div>
            </div>
            <div className="player-motivate-solo-wrapper">
              <div className="player-motivate-img">
                <img
                  src={require("../../assets/images/live_sports/survey.png")}
                />
              </div>
              <div className="player-motivate-text23">
                Asking your to Complete a Survey
              </div>
            </div>
          </div>
          <div classsName="player-experience-div">
            <div className="headings-text">Player Experience</div>
            <br />
            <div className="text-grey">
              We are passionate about making sure that all your customers have
              an interactive and fun-filled experience when they use our
              service, whether they win or lose.
            </div>

            <div className="player-experience-wrapper">
              <div className="player-experience-solo-wrapper">
                <div className="player-experience-img">
                  <img
                    src={require("../../assets/images/live_sports/responsive.png")}
                  />
                </div>
                <div className="player-experience-text">
                  Unlimited pc/mobile access
                </div>
              </div>
              <div className="player-experience-solo-wrapper">
                <div className="player-experience-img">
                  <img
                    src={require("../../assets/images/live_sports/support-1-copy.png")}
                  />
                </div>
                <div className="player-experience-text">
                  24/7 Customer Support
                </div>
              </div>
              <div className="player-experience-solo-wrapper">
                <div className="player-experience-img">
                  <img
                    src={require("../../assets/images/live_sports/tap.png")}
                  />
                </div>
                <div className="player-experience-text">
                  interactive user-friendly platform
                </div>
              </div>
            </div>
            <div className="text-grey">
              Integrate with our platform and watch your{" "}
              <span className="text-span"> conversions </span> soar.
            </div>
            {this.componentPartnerButton()}
          </div>

          <div className="headings-text">Imagine the Power</div>
          <div className="text-grey-align">
            <div className="text-grey-power">
              Winners are determined based on each players edited picks.{" "}
              <span className="text-span">
                {" "}
                Players can edit their selections{" "}
              </span>{" "}
              using Powerplays.
            </div>
          </div>
          <div className="cards-wrapper">
            <div className="solo-card-wrapper">
              <div className="card-img">
                <img
                  src={require("../../assets/images/live_sports/cards.png")}
                />
              </div>
              <div className="card-heading">Swap Teams</div>
              <div className="card-text">
                Drop and add selections in real time during the event!
              </div>
            </div>
            <div className="solo-card-wrapper">
              <div className="card-img">
                <img
                  src={require("../../assets/images/live_sports/card2.png")}
                />
              </div>
              <div className="card-heading">Increase / decrease scores</div>
              <div className="card-text">
                Don’t like the score… you have the power to change it!
              </div>
            </div>
            <div className="solo-card-wrapper">
              <div className="card-img">
                <img
                  src={require("../../assets/images/live_sports/undo.png")}
                />
              </div>
              <div className="card-heading">Undo Action</div>
              <div className="card-text">
                In case you make a mistake, you have the power to undo!
              </div>
            </div>
            <div className="solo-card-wrapper">
              <div className="card-img">
                <img
                  src={require("../../assets/images/live_sports/lock.png")}
                />
              </div>
              <div className="card-heading">Lock Score</div>
              <div className="card-text">
                You can lock in a teams score regardless of what the final score
                turns out to be.
              </div>
            </div>
            <div className="solo-card-wrapper">
              <div className="card-img">
                <img
                  src={require("../../assets/images/live_sports/one11.png")}
                />
              </div>
              <div className="card-heading">11 to 1 / 1 to 11</div>
              <div className="card-text">
                Make an 11 = 1 (good for chase the ace) or make a 1 into an 11
                (good for high 50)
              </div>
            </div>
          </div>
          {this.componentPartnerButton()}
          <div className="headings-text">Trust and Security</div>
          <br />
          <div className="text-grey">
            PowerPlay Systems Live Sports is an interactive live sports platform
            that offers seamless and safe sports-based experiences for your
            customers.
          </div>
          <div className="shields-wrappers">
            <div className="shield-text-wrapper">
              <div className="shield">
                <img
                  src={require("../../assets/images/live_sports/shield.png")}
                />
              </div>
              <div className="shield-text">
                Ultra-fast, <span className="text-span"> SSL encrypted</span>{" "}
                and digitally secured.
              </div>
            </div>
            <div className="shield-text-wrapper">
              <div className="shield">
                <img
                  src={require("../../assets/images/live_sports/shield.png")}
                />
              </div>
              <div className="shield-text">
                Customers’ <span className="text-span"> personal data </span> is
                stored <span className="text-span" /> securely
              </div>
            </div>
            <div className="shield-text-wrapper">
              <div className="shield">
                <img
                  src={require("../../assets/images/live_sports/shield.png")}
                />
              </div>
              <div className="shield-text">
                Completely <span className="text-span"> transparent </span> in
                all our transactions.
              </div>
            </div>
          </div>
          {this.componentPartnerButton()}
          <div className="significant-text">
            Significantly boost and expand your existing revenue generating
            strategy.
          </div>
          <br />
          <div className="text-white-significant1">
            <span className="text-span">
              {" "}
              Do you want to tap into the mobile generation?{" "}
            </span>{" "}
            Partner with us and start your customized experience that is
            perfectly tailored to meet your needs.
          </div>
          <br />
          <div className="text-white-significant2">
            Let us help you with your licensing and legal requirements, business
            strategy, game design, and integrated marketing to ensure you stay
            ahead of the competition.
          </div>
          {this.componentPartnerButton()}
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(SelectGames);
