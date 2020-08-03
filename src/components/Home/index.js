import React, { Component } from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Notify from "./Notify";
import Footer from "./../common/Footer";
import DrawTimer from "./../common/DrawTimer";
// import { connect } from 'react-redux';
import * as Constants from "./../common/constants";
import $ from "jquery";
import "slick-carousel";

class Home extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      tabActive: "sports",
      sportsActive: "nfl",
    };
  }

  ///////////////////////////////////
  ////// FUNCTIONAL COMPONENT //////
  //////////////////////////////////

  componentDraftDayBox() {
    return (
      <>
        <div className="home-draft-day-box">
          <div className="home-draft-day-box-left">
            <div className="home-draf-day-img1" />
          </div>
          <div className="home-draft-day-box-right">
            <div className="home-draf-day-text1">WIN $25k</div>
            <div className="home-draf-day-text2">USD</div>

            <div className="home-draf-day-text3">2020 NFL Power Draft</div>

            <div className="home-draf-day-text4">
              April 23rd, 2020 @ 8:00PM EST
            </div>

            <div
              className="home-draf-day-btn1"
              onClick={() => this.props.history.push("/draft-day")}
            >
              Enter Now!
            </div>
          </div>
        </div>
      </>
    );
  }
  componentSportsTab() {
    if (this.state.tabActive == "sports") {
      if (this.state.sportsActive == "nfl") {
        return (
          <div>
            <div className={"slider-wrapper"} id="slider">
              <div class="corousal-img-wrapper">
                <div class="corousal-img img-1">
                  <div className="corousal-content-wrapper">
                    <div className="corousal-content-text3">
                      TDN NFL Fantasy Football
                    </div>
                    <div className="corousal-content-text2">Comming Soon</div>
                    <div className="corousal-content-text4">Sept 2020</div>
                    <div className="corousal-content-text5">
                      Prizes will be announced soon!
                    </div>
                  </div>
                </div>
                <Notify
                  buttonClass={"corousal-button-active"}
                  property={"TDN Fantasy"}
                />
                {/* <button className="corousal-button-active">Notify Me</button> */}
              </div>
              <div class="corousal-img-wrapper">
                <div class="corousal-img img-2">
                  <div className="corousal-content-wrapper">
                    <div className="corousal-content-text6">
                      WIN <span>$2000</span>
                      <div className="corousal-content-text6a">USD</div>
                    </div>
                    <div className="corousal-content-text7">NFL PowerLine</div>
                    <div className="corousal-content-text8">
                      Coming Fall 2020
                    </div>
                    <div className="corousal-content-text9">
                      Progressive Powerplay Contest
                    </div>
                    <div className="corousal-content-text10">
                      Each week a Powerplay will be added until we have a
                      winner!
                    </div>
                  </div>
                </div>
                <Notify
                  buttonClass={"corousal-button-active"}
                  property={"Powerline"}
                />
                {/* <button className="corousal-button-active">Notify Me</button> */}
              </div>
              <div class="corousal-img-wrapper">
                <div class="corousal-img img-3">
                  <div className="corousal-content-wrapper">
                    <div className="corousal-content-img-wrapper">
                      <div className="corousal-content-img" />
                    </div>
                    <div className="corousal-content-text1">
                      WIN <span>$25k</span>
                      <div className="corousal-content-text1a">USD</div>
                    </div>
                    <div className="corousal-content-text2">
                      TDN 2020 Mock Draft Contest
                    </div>
                  </div>
                </div>
                <button className="corousal-button-incative">
                  Contest Complete
                </button>
              </div>
              <div class="corousal-img-wrapper">
                <div class="corousal-img img-4">
                  <div className="corousal-content-wrapper">
                    <div className="corousal-content-text11">
                      Integrate one of our NFL Games into your site and watch
                      your site visits <span>soar!</span>
                    </div>
                    <div className="corousal-content-text12">
                      Games available
                    </div>
                    <div className="corousal-content-text13">
                      NFL Fantasy, PowerLine, Chase the Ace, Zones, High 5, and
                      Power Draft
                    </div>
                  </div>
                </div>
                <button
                  className="corousal-button-active"
                  onClick={() => this.props.history.push("/partner")}
                >
                  Partner With Us
                </button>
              </div>
            </div>
            <div className="corousal-arrows">
              <div className="corousal-arrow-left" />
              <div className="corousal-arrow-right" />
            </div>
          </div>
        );
      } else if (this.state.sportsActive == "nhl") {
        return (
          <div className="home-sports-tab-wrapper">
            <div className="home-sports-tab-header">
              Get your game up and running for the 2020 season.
            </div>
            <div className="home-sports-tab  h-sports-tab-nhl">
              <div className="home-sports-tab-text">
                <div className="home-sports-tab-text1">
                  Integrate one of our NHL Games into your site and watch your
                  site visits soar!
                </div>
                <div className="home-sports-tab-text2">Games available</div>
                <div className="home-sports-tab-text3">
                  Fantasy, PowerLine, Chase the Ace, Power Draft.
                </div>
              </div>
              <button
                className="home-sports-tab-button"
                onClick={() => this.props.history.push("/partner")}
              >
                Partner With us
              </button>
            </div>
          </div>
        );
      } else if (this.state.sportsActive == "mlb") {
        return (
          <div className="home-sports-tab-wrapper">
            <div className="home-sports-tab-header">
              Get your game up and running for the 2020 season.
            </div>
            <div className="home-sports-tab   h-sports-tab-mlb">
              <div className="home-sports-tab-text">
                <div className="home-sports-tab-text1">
                  Integrate one of our MLB Games into your site and watch your
                  traffic <span>soar!</span>
                </div>
                <div className="home-sports-tab-text2">Games available</div>
                <div className="home-sports-tab-text3">
                  MLB Fantasy, PowerLine, Chase the Ace, Zones, Pick 5, and
                  Power Draft
                </div>
              </div>
              <button
                className="home-sports-tab-button"
                onClick={() => this.props.history.push("/partner")}
              >
                Partner With us
              </button>
            </div>
          </div>
        );
      } else if (this.state.sportsActive == "nba") {
        return (
          <div className="home-sports-tab-wrapper">
            <div className="home-sports-tab-header">
              Get your game up and running for the 2020 season.
            </div>
            <div className="home-sports-tab  h-sports-tab-nba">
              <div className="home-sports-tab-text">
                <div className="home-sports-tab-text1">
                  Integrate one of our NBA Games into your site and watch your
                  traffic <span>soar!</span>
                </div>
                <div className="home-sports-tab-text2">Games available</div>
                <div className="home-sports-tab-text3">
                  NBA Fantasy, PowerLine, Chase the Ace, High 5, Zones, and
                  Power Draft.
                </div>
              </div>
              <button
                className="home-sports-tab-button"
                onClick={() => this.props.history.push("/partner")}
              >
                Partner With us
              </button>
            </div>
          </div>
        );
      }
    }
  }
  componentSportsButtons() {
    return (
      <div className="tryone-buttons-wrapper">
        <button
          className={
            "tryone-button" +
            (this.state.sportsActive == "nfl" ? " tryone-active " : "")
          }
          onClick={() =>
            this.state.sportsActive != "nfl"
              ? this.setState({ sportsActive: "nfl" })
              : ""
          }
        >
          <div className="tryone-img t-m3" />
          <span className="tryone-button-text">NFL</span>
        </button>
        <button
          className={
            "tryone-button" +
            (this.state.sportsActive == "nba" ? " tryone-active " : "")
          }
          onClick={() => this.setState({ sportsActive: "nba" })}
        >
          <div className="tryone-img t-m2" />
          <span className="tryone-button-text">NBA</span>
        </button>
        <button
          className={
            "tryone-button" +
            (this.state.sportsActive == "mlb" ? " tryone-active " : "")
          }
          onClick={() => this.setState({ sportsActive: "mlb" })}
        >
          <div className="tryone-img t-m1" />
          <span className="tryone-button-text">MLB</span>
        </button>

        <button
          className={
            "tryone-button" +
            (this.state.sportsActive == "nhl" ? " tryone-active " : "")
          }
          onClick={() => this.setState({ sportsActive: "nhl" })}
        >
          <div className="tryone-img t-m4" />
          <span className="tryone-button-text">NHL</span>
        </button>
      </div>
    );
  }
  componentLottoTab() {
    return (
      <div>
        <div
          className={
            "home-lotto-items" +
            (this.state.tabActive == "sports" ? " home-hidden" : "")
          }
        >
          <div className="home-lotto-item-wrapper hl-item1">
            <div className="home-lotto-item-text">
              <div className="home-lotto-item-text1">
                Integrate one of our interactive lottery games with your charity
                and watch your donations <span>soar!</span>
              </div>
              <div className="home-lotto-item-text2">Games available</div>
              <div className="home-lotto-item-text3">
                50/50 Power, a variety interactive Lottery ball games and
                Powerplay Bingo
              </div>
              <div className="home-lotto-item-text4">#GenR8™ Technology</div>
            </div>
            <button
              onClick={() => this.props.history.push("/partner")}
              className="home-lotto-item-button"
            >
              Partner With Us
            </button>
          </div>
          <div className="home-lotto-item-wrapper hl-item2">
            <div className="home-lotto-item-text">
              <div className="home-lotto-item-text5">
                WIN <span>$2000 CAD</span>
              </div>
              <div className="home-lotto-item-text6">
                Elite 8 Promotional Contest
              </div>
              <div className="home-lotto-item-text7">
                A progressive Powerplay Lotto
              </div>
            </div>
            <Notify
              buttonClass={"home-lotto-item-button2"}
              property={"Elite 8"}
            />
            {/* <button className="home-lotto-item-button2">Notify Me</button> */}
          </div>
        </div>
      </div>
    );
  }

  ///////////////////////////////////
  //-----------------------------////
  //////////////////////////////////

  ////////////////////////////////////
  // CORE REACT COMPONENT FUCNTIONS //
  ///////////////////////////////////

  componentDidMount() {
    $("._burger").click(function(e) {
      $(".nav-bar").slideToggle();
    });
    if (document.getElementById("slider")) {
      $("#slider").not('.slick-initialized').slick({
        dots: true,
        centerMode: true,
        slidesToShow: 1,
        variableWidth: true,
        initialSlide: 1,
        swipe: true,
        infinite: false,
        dotsClass: "slider-dots",
        prevArrow: $(".corousal-arrow-left"),
        nextArrow: $(".corousal-arrow-right"),
        // appendDots: $('.slider-dots')
      });
    }
  }
  componentWillUnmount() {}
  componentDidUpdate() {
    if (document.getElementById("slider")) {
      $("#slider").not('.slick-initialized').slick({
        dots: true,
        centerMode: true,
        slidesToShow: 1,
        variableWidth: true,
        initialSlide: 1,
        swipe: true,
        infinite: false,
        dotsClass: "slider-dots",
        prevArrow: $(".corousal-arrow-left"),
        nextArrow: $(".corousal-arrow-right"),
        // appendDots: $('.slider-dots')
      });
    }
  }
  componentWillUpdate() {
    if (typeof Node === "function" && Node.prototype) {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function(child) {
        if (child.parentNode !== this) {
          if (console) {
            console.error(
              "Cannot remove a child from a different parent",
              child,
              this
            );
          }
          return child;
        }
        return originalRemoveChild.apply(this, arguments);
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function(newNode, referenceNode) {
        if (referenceNode && referenceNode.parentNode !== this) {
          if (console) {
            console.error(
              "Cannot insert before a reference node from a different parent",
              referenceNode,
              this
            );
          }
          return newNode;
        }
        return originalInsertBefore.apply(this, arguments);
      };
    }
  }
  //////////////////////////////////
  //-----------------------------//
  //////////////////////////////////

  render() {
    return (
      <>
        <Header />
        <DrawTimer />
        <div className="content-wrapper">
          <div className="home-header">
            <div className="header-heading">
              Our Games Defy Reality.{" "}
              <span className="heading-subtext">TM</span>
            </div>
            <br />
            <div className="header-heading1">
              Revolutionary new concept for
              <br />
              interactive live sports and lottery games.*
            </div>
            <div className="header-text-wrapper">
              <div className="header-text-solo-wrapper">
                <div className="header-text-solo-wrapper-image">
                  <img
                    className="header-img"
                    src={require("../../assets/images/home/correct-copy-3.png")}
                  />
                </div>
                <div className="header-text-solo-wrapper-text">
                  Exceptional <div className="desktop-break" />
                  User Engagement
                </div>
              </div>
              <div className="header-text-solo-wrapper">
                <div className="header-text-solo-wrapper-image">
                  <img
                    className="header-img"
                    src={require("../../assets/images/home/correct-copy-3.png")}
                  />
                </div>
                <div className="header-text-solo-wrapper-text">
                  Real Time <div className="desktop-break" />
                  Interactive Excitement
                </div>
              </div>
              <div className="header-text-solo-wrapper">
                <div className="header-text-solo-wrapper-image">
                  <img
                    className="header-img"
                    src={require("../../assets/images/home/correct-copy-3.png")}
                  />
                </div>
                <div className="header-text-solo-wrapper-text">
                  Wide Variety <br />
                  of Games.
                </div>
              </div>
            </div>
            <button
              className="header-button"
              onClick={() => this.props.history.push("/partner")}
            >
              <span className="header-button-text">Partner With Us</span>
            </button>
            <br />
            <div className="header-text">
              <div className="header-subtext">
                *International Patent Pending
              </div>
            </div>
          </div>
          <div className="real-excitement-wrapper">
            <div className="real-excitement-text1">Real Excitement !</div>
            <br />
            <div className="real-excitement-text2">
              Utilizing our platform your customers will be fully engaged.
              <br />
              <br className="brr" />
              They can utilize Powerplays to boost their point total live during
              a game or change selections live during a lottery draw.
              <div className="mobile-break" />
              <span className="orange-text"> Now that is EXCITEMENT!</span>
              <br />
              <br className="brr" />
              <span className="real-span">
                Available exclusively from PowerPlay Systems.
              </span>
            </div>
            <br />
            <button
              className="header-button"
              id="real-btn"
              onClick={() => this.props.history.push("/partner")}
            >
              <span className="header-button-text">Partner With Us</span>
            </button>
          </div>
          <div className="powerplay-wrapper">
            <div className="powerplay-left-container">
              <div className="powerplay-wrapper-left">
                <div className="powerplay-wrapper-left-img desktop-break">
                  <img src={require("../../assets/images/home/group-11.png")} />
                </div>
                <br />
                <div className="powerplay-wrapper-left-heading">
                  Powerplay Live Sports Platform
                </div>
                <br />
                <div className="powerplay-wrapper-left-text">
                  Interactive games covering all major North American Sports
                  leagues
                </div>
                <br />
                <div className="powerplay-wrapper-left-btns">
                  <button className="powerplay-solo-btn-1">
                    <span className="powerplay-solo-btn-text">
                      Promotional Contest
                    </span>
                  </button>
                  <button className="powerplay-solo-btn-2">
                    <span className="powerplay-solo-btn-text">
                      Charity contests
                    </span>
                  </button>
                  <button className="powerplay-solo-btn-3">
                    <span className="powerplay-solo-btn-text">
                      Casino based sports betting
                    </span>
                  </button>
                  <button className="powerplay-solo-btn-4">
                    <span className="powerplay-solo-btn-text">
                      State run sports betting
                    </span>
                  </button>
                  <button className="powerplay-solo-btn-5">
                    <span className="powerplay-solo-btn-text">
                      Local sports bar - interactive games / contests
                    </span>
                  </button>
                </div>
                <br />
                <div className="powerplay-wrapper-left-img mobile">
                  <img src={require("../../assets/images/home/group-11.png")} />
                </div>
                <div className="break-mobile" />
                <button
                  className="powerplay-wrapper-left-orange-btn"
                  onClick={() => this.props.history.push("/live-sports")}
                >
                  <span className="powerplay-btn-text">
                    Explore Powerplay Live Sports!
                  </span>
                </button>
              </div>
            </div>
            <div className="powerplay-right-container">
              <div className="powerplay-wrapper-right">
                <div className="powerplay-wrapper-right-img desktop-break">
                  <img
                    src={require("../../assets/images/home/lottery-orig-copy.png")}
                  />
                </div>
                <br />
                <div className="powerplay-wrapper-right-heading">
                  Powerplay Lotto Platform
                </div>
                <br />
                <div className="powerplay-wrapper-right-text">
                  Interactive lottery format where players can
                  <br />
                  adjust selections during the live draw
                </div>
                <br />
                <div className="powerplay-wrapper-right-btns">
                  <button className="powerplay-solo-btn-right-1">
                    <span className="powerplay-solo-btn-right-text">
                      State run lotteries
                    </span>
                  </button>
                  <button className="powerplay-solo-btn-right-2">
                    <span className="powerplay-solo-btn-right-text">
                      Casino based lotteries
                    </span>
                  </button>
                  <button className="powerplay-solo-btn-right-3">
                    <span className="powerplay-solo-btn-right-text">
                      Promotional lotteries
                    </span>
                  </button>
                  <button className="powerplay-solo-btn-right-4">
                    <span className="powerplay-solo-btn-right-text">
                      Charity lotteries
                    </span>
                  </button>
                </div>
                <br />
                <div className="powerplay-wrapper-right-img mobile">
                  <img
                    src={require("../../assets/images/home/lottery-orig-copy.png")}
                  />
                </div>
                <button
                  id="btn-height-change"
                  className="powerplay-wrapper-left-orange-btn"
                  onClick={() => this.props.history.push("/powerplay-lotto")}
                >
                  <span className="powerplay-btn-text">
                    Explore Powerplay Lotto!
                  </span>
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className="tryone-wrapper">
            <div className="tryone-heading">
              Try one of our <br />
              promotional contests
            </div>
            <br />
            <div className="tryone-tabs-wrapper">
              <div
                className={
                  "tryone-tab-left" +
                  (this.state.tabActive == "sports" ? " home_tab_active " : "")
                }
                onClick={() => this.setState({ tabActive: "sports" })}
              >
                Powerplay Live Sports
                {this.state.tabActive == "sports" ? (
                  <div className="tryone-selected-line" />
                ) : (
                  ""
                )}
              </div>
              <div
                className={
                  "tryone-tab-right" +
                  (this.state.tabActive == "lotto" ? " home_tab_active " : "")
                }
                onClick={() => this.setState({ tabActive: "lotto" })}
              >
                Powerplay Lotto
                {this.state.tabActive == "lotto" ? (
                  <div className="tryone-selected-line" />
                ) : (
                  ""
                )}
              </div>
              <br />
              {this.state.tabActive == "sports"
                ? this.componentSportsButtons()
                : ""}
            </div>
            <div
              className={
                "outer-div-slider" +
                (this.state.tabActive == "sports" ? "" : " home-hidden")
              }
            >
              {this.componentSportsTab()}
            </div>
            {this.componentLottoTab()}
          </div>
          <div>
            <br />
            <div className="whatweoffer-wrapper">
              <div className="whatweoffer-heading">What We Offer</div>
              <br />
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <img src={require("../../assets/images/home/service.svg")} />
                </div>
                <br className="brr" />
                <div className="whatweoffer-solo-right">
                  <div className="whatweoffer-solo-wrapper-heading">
                    Full service promotional/
                    <br />
                    charity contests
                  </div>
                  <br />
                  <div className="whatweoffer-solo-wrapper-text">
                    We will take care of everything for you. Any legal
                    requirements will be covered and all the behind the scenes
                    administrative work will be done by us.
                  </div>
                </div>
              </div>
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <img src={require("../../assets/images/home/state.svg")} />
                </div>
                <br className="brr" />
                <div className="whatweoffer-solo-right">
                  <div className="whatweoffer-solo-wrapper-heading">
                    State run
                    <br />
                    lottery offering
                  </div>
                  <br />
                  <div className="whatweoffer-solo-wrapper-text">
                    We will take care of everything for you. Any legal
                    requirements will be covered and all the behind the scenes
                    administrative work will be done by us.
                  </div>
                </div>
              </div>
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <img src={require("../../assets/images/home/lead.svg")} />
                </div>
                <br className="brr" />
                <div className="whatweoffer-solo-right">
                  <div className="whatweoffer-solo-wrapper-heading">
                    Lead
                    <br />
                    Generation
                  </div>
                  <br />
                  <div className="whatweoffer-solo-wrapper-text">
                    Utilize our platform to generate 100% true leads by driving
                    customer behavior through the use of PowerPlays
                  </div>
                </div>
              </div>
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <img src={require("../../assets/images/home/prize.svg")} />
                </div>
                <br className="brr" />
                <div className="whatweoffer-solo-right">
                  <div className="whatweoffer-solo-wrapper-heading">
                    Prize Indemnity
                    <br />
                    Insurance
                  </div>
                  <br />
                  <div className="whatweoffer-solo-wrapper-text">
                    Prize indemnity gives you the ability to offer special
                    contests and promotions while transferring the risk to an
                    experienced and financially bound insurer.
                  </div>
                </div>
              </div>
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <img src={require("../../assets/images/home/location.svg")} />
                </div>
                <br className="brr" />
                <div className="whatweoffer-solo-right">
                  <div className="whatweoffer-solo-wrapper-heading">
                    Mobile
                    <br />
                    Geo-Fencing
                  </div>
                  <br />
                  <div className="whatweoffer-solo-wrapper-text">
                    Our Geo-Fencing technology, we will help you set up a
                    geofence right around your business or event to entice
                    players to play at your establishment. Great for sports
                    bars!
                  </div>
                </div>
              </div>
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <img src={require("../../assets/images/home/law.svg")} />
                </div>
                <br className="brr" />
                <div className="whatweoffer-solo-right">
                  <div className="whatweoffer-solo-wrapper-heading">
                    Compliance with
                    <br />
                    the law
                  </div>
                  <br />
                  <div className="whatweoffer-solo-wrapper-text">
                    We will ensure that your event complied with all applicable
                    regional laws, policies, and regulations.
                  </div>
                </div>
              </div>
            </div>
            <br />
            <button
              className="whatweoffer-button mobile"
              onClick={() => this.props.history.push("/partner")}
            >
              <span className="whatweoffer-button-text">Partner With Us</span>
            </button>
            <br />
            <div className="customized-wrapper">
              <div className="whatweoffer-heading desktop-break">
                All options are fully customizable
              </div>
              <br />
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <img src={require("../../assets/images/home/security.svg")} />
                </div>
                <br className="brr" />
                <div className="whatweoffer-solo-right">
                  <div className="whatweoffer-solo-wrapper-heading">
                    Security! Security!
                    <br />
                    Security!
                  </div>
                  <br />
                  <div className="whatweoffer-solo-wrapper-text">
                    Multilevel security measures in place to protect the
                    integrity of our games so you don’t have to worry.
                  </div>
                </div>
              </div>
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <img src={require("../../assets/images/home/result.svg")} />
                </div>
                <br className="brr" />
                <div className="whatweoffer-solo-right">
                  <div className="whatweoffer-solo-wrapper-heading">
                    Results
                    <br />
                    analysis
                  </div>
                  <br />
                  <div className="whatweoffer-solo-wrapper-text">
                    When you run a promotion, you will want to know how
                    successful it was. Our analysis will do just that.
                  </div>
                </div>
              </div>
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <img src={require("../../assets/images/home/email.svg")} />
                </div>
                <br className="brr" />
                <div className="whatweoffer-solo-right">
                  <div className="whatweoffer-solo-wrapper-heading">
                    Email
                    <br />
                    campaign
                  </div>
                  <br />
                  <div className="whatweoffer-solo-wrapper-text">
                    As part of each contest, we also offer email campaign
                    options tailored to your needs.
                  </div>
                </div>
              </div>
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <img src={require("../../assets/images/home/white.svg")} />
                </div>
                <br className="brr" />
                <div className="whatweoffer-solo-right">
                  <div className="whatweoffer-solo-wrapper-heading">
                    White label
                    <br />
                    options
                  </div>
                  <br />
                  <div className="whatweoffer-solo-wrapper-text">
                    Would you like to host a game on your site with your
                    branding? No problem. We offer full white label integration.
                  </div>
                </div>
              </div>
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <img src={require("../../assets/images/home/game.svg")} />
                </div>
                <br className="brr" />
                <div className="whatweoffer-solo-right">
                  <div className="whatweoffer-solo-wrapper-heading">
                    Custom game
                    <br />
                    development
                  </div>
                  <br />
                  <div className="whatweoffer-solo-wrapper-text">
                    Want to design an interactive game that’s more suited to
                    your brand? If you can imagine it, we can make it happen!
                  </div>
                </div>
              </div>
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <img
                    src={require("../../assets/images/home/mobile-app.svg")}
                  />
                </div>
                <br className="brr" />
                <div className="whatweoffer-solo-right">
                  <div className="whatweoffer-solo-wrapper-heading">
                    Mobile App
                    <br />
                    <span style={{ fontStyle: "italic" }}>(coming soon!)</span>
                  </div>
                  <br />
                  <div className="whatweoffer-solo-wrapper-text">
                    We are working on a mobile app to let offer even more
                    interactive options to contest/lottery participants. Stay
                    tuned!
                  </div>
                </div>
              </div>
              <br />
              <button
                className="whatweoffer-button"
                onClick={() => this.props.history.push("/partner")}
              >
                <span className="whatweoffer-button-text">Partner With Us</span>
              </button>
              <br />
            </div>
            <br />
            <div className="significant-wrapper">
              <div className="significant-wrapper-heading">
                Significantly boost and expand your existing <br />
                revenue generating strategy.
              </div>
              <br />
              <div className="significant-wrapper-text">
                <span className="orange-text">
                  Do you want to tap into the mobile generation?&nbsp;
                </span>
                Partner with us and start your customized experience that is
                perfectly tailored to meet your needs.
              </div>
              <br />
              <div className="significant-wrapper-text">
                Let us help you with your licensing and legal requirements,
                business strategy, game design, and integrated marketing to
                ensure you stay ahead of the competition.
              </div>
              <br />
              <br />
              <button
                className="whatweoffer-button"
                onClick={() => this.props.history.push("/partner")}
              >
                <span className="whatweoffer-button-text">Partner With Us</span>
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default withRouter(Home);
