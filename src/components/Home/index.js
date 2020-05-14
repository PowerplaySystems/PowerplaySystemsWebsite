import React, { Component } from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import DrawTimer from "./../common/DrawTimer";
// import { connect } from 'react-redux';
import * as Constants from "./../common/constants";
import $ from "jquery";
import "slick-carousel";

class Home extends Component {
  ///////////////////////////////////
  ////// FUNCTIONAL COMPONENT ///////
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
  //////////////////////////////////
  //-----------------------------//
  //////////////////////////////////

  ////////////////////////////////////
  // CORE REACT COMPONENT FUCNTIONS //
  ///////////////////////////////////

  componentDidMount() {
    $("._burger").click(function(e) {
      $(".nav-bar").slideToggle();
    });

    $("#slider").slick({
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
  componentWillUnmount() {}
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
              Our Games Defy Reality <span className="heading-subtext">TM</span>
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
                  Exceptional <br />
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
                  Real time <br />
                  interactive excitement
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
                  of games.
                </div>
              </div>
            </div>
            <button className="header-button">
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
              <span className="orange-text"> Now that is EXCITEMENT</span>!
              <br />
              <br className="brr" />
              <span className="real-span">
                Available exclusively from Powerplay Games.
              </span>
            </div>
            <br />
            <button className="header-button" id="real-btn">
              <span className="header-button-text">Partner With Us</span>
            </button>
          </div>
          <div className="powerplay-wrapper">
            <div className="powerplay-wrapper-left">
              <div className="powerplay-wrapper-left-img">
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
              <button className="powerplay-wrapper-left-orange-btn">
                <span className="powerplay-btn-text">
                  Explore Live Sports Platform!
                </span>
              </button>
            </div>
            <div className="powerplay-wrapper-right">
              <div className="powerplay-wrapper-right-img">
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
              <button
                id="btn-height-change"
                className="powerplay-wrapper-left-orange-btn"
              >
                <span className="powerplay-btn-text">
                  Explore Lotto Platform!
                </span>
              </button>
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
              <div className="tryone-tab-left">
                Powerplay Live Sports
                <div className="tryone-selected-line" />
              </div>
              <div className="tryone-tab-right">
                Powerplay Lotto
                <div className="tryone-selected-line-2" />
              </div>
              <br />
              <div className="tryone-buttons-wrapper">
                <button className="tryone-button-1">
                  <span className="tryone-button-text" id="tryone-selected">
                    All Sports
                  </span>
                </button>
                <button className="tryone-button-2">
                  <span className="tryone-button-text">NBA</span>
                </button>
                <button className="tryone-button-3">
                  <span className="tryone-button-text">NFL</span>
                </button>
                <button className="tryone-button-4">
                  <span className="tryone-button-text">NHL</span>
                </button>
              </div>
            </div>
            <div className="slider-wrapper" id="slider">
              <div class="corousal-img-wrapper">
                <div class="corousal-img img-1" />
                <button className="corousal-button-active">Enter Now!</button>
              </div>
              <div class="corousal-img-wrapper">
                <div class="corousal-img img-2" />
                <button className="corousal-button-active">Enter Now!</button>
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
            </div>
            <div className="corousal-arrows">
              <div className="corousal-arrow-left" />
              <div className="corousal-arrow-right" />
            </div>
          </div>
          <div>
            <br />
            <div className="whatweoffer-wrapper">
              <div className="whatweoffer-heading">What We Offer</div>
              <br />
              <div className="whatweoffer-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <br />
                  <img
                    src={require("../../assets/images/home/group-18(11).png")}
                  />
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
                  <br />
                  <img
                    src={require("../../assets/images/home/group-18(4).png")}
                  />
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
                  <br />
                  <img
                    src={require("../../assets/images/home/group-18(8).png")}
                  />
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
                  <br />
                  <img
                    src={require("../../assets/images/home/group-18(6).png")}
                  />
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
                  <br />
                  <img
                    src={require("../../assets/images/home/group-18(2).png")}
                  />
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
                  <br />
                  <img
                    src={require("../../assets/images/home/group-18(10).png")}
                  />
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
            <div className="customized-wrapper">
              <div className="whatweoffer-heading">
                All options are fully customizable
              </div>
              <br />
              <div className="customized-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <br />
                  <img
                    src={require("../../assets/images/home/group-18(1).png")}
                  />
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
              <div className="customized-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <br />
                  <img
                    src={require("../../assets/images/home/group-18(5).png")}
                  />
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
              <div className="customized-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <br />
                  <img
                    src={require("../../assets/images/home/group-18(9).png")}
                  />
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
              <div className="customized-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <br />
                  <img
                    src={require("../../assets/images/home/group-18(3).png")}
                  />
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
              <div className="customized-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <br />
                  <img
                    src={require("../../assets/images/home/group-18(7).png")}
                  />
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
              <div className="customized-solo-wrapper">
                <div className="whatweoffer-solo-wrapper-img">
                  <br />
                  <img
                    src={require("../../assets/images/home/mobile-app.png")}
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
              <button className="whatweoffer-button">
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
                  Do you want to tap into the mobile generation?
                </span>
                Partner with us and start your <br />
                customized experience that is perfectly tailored to meet your
                needs.
              </div>
              <br />
              <div className="significant-wrapper-text">
                Let us help you with your licensing and legal requirements,
                business strategy, game <br />
                design, and integrated marketing to ensure you stay ahead of the
                competition.
              </div>
              <br />
              <br />
              <button className="whatweoffer-button">
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
