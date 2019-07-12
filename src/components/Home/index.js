import React, { Component } from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
// import { connect } from 'react-redux';
import $ from "jquery";
import "slick-carousel";
var bgFirst = require("./../../assets/images/home/first.jpg");
var bgSecond = require("./../../assets/images/home/second.jpg");
var bgThird = require("./../../assets/images/home/third.jpg");
var bgFourth = require("./../../assets/images/home/fourth.jpg");
let firstRowStyle = {
  backgroundImage: "url(" + bgFirst + ")",
  backgroundSize: "cover",
  overflow: "hidden",
  width: "100%",
  height: "805px"
};
let secondRows = {
  backgroundImage: "url(" + bgSecond + ")",
  backgroundSize: "cover",
  overflow: "hidden",
  width: "100%",
  height: "550px"
};

let thirdRows = {
  backgroundImage: "url(" + bgThird + ")",
  backgroundSize: "cover",
  overflow: "hidden",
  width: "100%",
  height: "550px"
};

let fourthRows = {
  backgroundImage: "url(" + bgFourth + ")",
  backgroundSize: "cover",
  overflow: "hidden",
  width: "100%",
  height: "550px"
};

class Home extends Component {
  componentDidMount() {
    $("._burger").click(function(e) {
      $(".nav-bar").slideToggle();
    });

    $(".zone-sel").click(function(e) {
      $(this).css("background", "#39b54a ");
      $(this).text("Selected");
      $(this).css("color", "#FFF");
    });
    $("#sports-slider").slick({
      dots: false,
      infinite: true,
      speed: 1000,
      autoplay: false,
      autoplaySpeed: 2500,
      slidesToShow: 4,
      slidesToScroll: 1,

      prevArrow: $(".sports-left"),
      nextArrow: $(".sports-right"),
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });

    $("#main-slider").slick({
      dots: false,
      infinite: true,
      speed: 1500,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,

      prevArrow: $(".main-left"),
      nextArrow: $(".main-right")
    });
  }
  render() {
    return (
      <>
        <Header />
        <div className="container-fluid">
          <div className="container">
            <div class="content">
              <div className="home_first_row" style={firstRowStyle}>
                <center>
                  <div className="header-main">
                    Revolutionary new concept for interactive live sports and
                    lottery games.*
                  </div>
                  <div className="first_row_details_container">
                    <div className="home_first_row_details">
                      <img
                        className="main_img_icon"
                        src={require("./../../assets/images/home/correct_icon.png")}
                      />
                      <div className="main_icon_text">
                        Exceptional User Engagement
                      </div>
                    </div>
                    <div className="home_first_row_details">
                      <img
                        className="main_img_icon"
                        src={require("./../../assets/images/home/correct_icon.png")}
                      />
                      <div className="main_icon_text">
                        Real time interactive excitement
                      </div>
                    </div>
                    <div className="home_first_row_details">
                      <img
                        className="main_img_icon"
                        src={require("./../../assets/images/home/correct_icon.png")}
                      />
                      <div className="main_icon_text">
                        Wide Variety of games.
                      </div>
                    </div>
                  </div>
                  <button className="first_row_button">Partner With Us</button>
                </center>
                <div className="first_row_extra_info">
                *International Patents Pending
                </div>
              </div>
              <div class="home_first_row" style={secondRows}>
                <center>
                  <div className="header_row_2">Real Excitement !</div>
                  <div className="detail_row_2">
                    Imagine offering lottery and sports games where players can
                    adjust selections in real time during the live event! Now,
                    that is EXCITEMENT! Available exclusively from Powerplay
                    Games.
                  </div>
                </center>
              </div>
              <div class="home_first_row" style={thirdRows}>
                <div className="home_row_3_content">
                  <div className="header_row_3">
                    Powerplay Live Sports Platform
                  </div>
                  <div className="detail_row_3">
                    Interactive games covering all major North American Sports
                    leagues
                  </div>
                  <div className="row_3_items_container">
                    <div className="row_3_item">Promotional Contest</div>
                    <div className="row_3_item">Charity contests</div>
                    <div className="row_3_item">State run sports betting</div>
                    <div className="row_3_item">
                      Casino based sports betting
                    </div>
                    <div className="row_3_item">
                      Local sports bar - interactive games / contests
                    </div>
                  </div>
                  <button className="row_3_button"
                   onClick={() => this.props.history.push("/select-games")}>
                    Explore Free Demo Games Now !
                  </button>
                </div>
              </div>
              <div class="home_first_row" style={fourthRows}>
                <div className="home_row_3_content">
                  <div className="header_row_3">Powerplay Lotto Platform</div>
                  <div className="detail_row_3">
                    Interactive lottery format where players can adjust
                    selections during the live draw
                  </div>
                  <div className="row_3_items_container">
                    <div className="row_3_item">Promotional lotteries</div>
                    <div className="row_3_item">Charity lotteries</div>
                    <div className="row_3_item">State run lotteries</div>
                    <div className="row_3_item">Casino based lotteries</div>
                  </div>
                  <button className="row_3_button"
                  onClick={() => this.props.history.push("/powerplay-lotto")}>>
                    Explore Free Demo Games Now !
                  </button>
                </div>
              </div>
              <div className="home_sub_heading">
                <center>What We Offer</center>
              </div>
              <div className="home_offers">
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18.png")}
                    />
                    <div className="home_offer_heading">
                      Full service promotional/charity contests
                    </div>
                    <div className="home_offer_details">
                      We will take care of everything for you. Any legal
                      requirements will be covered and all the behind the scenes
                      administrative work will be done by us.
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18_5.png")}
                    />
                    <div className="home_offer_heading_small">
                      State run lottery offering
                    </div>
                    <div className="home_offer_details">
                      We will take care of everything for you. Any legal
                      requirements will be covered and all the behind the scenes
                      administrative work will be done by us.
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18_9.png")}
                    />
                    <div className="home_offer_heading">
                      For Canadian businesses, Quebec ready promotions!
                    </div>
                    <div className="home_offer_details">
                      We will take care of everything for you. Any legal
                      requirements will be covered and all the behind the scenes
                      administrative work will be done by us.
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18_3.png")}
                    />
                    <div className="home_offer_heading_small">
                      Mobile Geo-Fencing
                    </div>
                    <div className="home_offer_details">
                      Entice players to play at your location
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18_7.png")}
                    />
                    <div className="home_offer_heading_small">
                      Prize Indemnity Insurance
                    </div>
                    <div className="home_offer_details">
                      Prize indemnity gives you the ability to offer special
                      contests and promotions while transferring the risk to an
                      experienced and financially bound insurer. Instead of
                      keeping cash,
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18_11.png")}
                    />
                    <div className="home_offer_heading_small">
                      Compliance with the law
                    </div>
                    <div className="home_offer_details">
                      Each sweepstakes or contest must include a set of official
                      rules that identify the material terms and conditions that
                      govern the promotion, and various laws provide that they
                      must meet certain requirements.
                    </div>
                  </center>
                </div>
                <center>
                  <button className="home_offer_button">Partner With Us</button>
                </center>
              </div>
              <div className="home_offers">
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18_2.png")}
                    />
                    <div className="home_offer_heading">
                      Security! Security! Security!
                    </div>
                    <div className="home_offer_details">
                      Multilevel security measures in place to protect the
                      integrity of our games so you don’t have to worry.
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18_6.png")}
                    />
                    <div className="home_offer_heading_small">
                      Results analysis
                    </div>
                    <div className="home_offer_details">
                      When you run a promotion, you will want to know how
                      successful it was. Our analysis will do just that.
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18_10.png")}
                    />
                    <div className="home_offer_heading_small">
                      Email campaign
                    </div>
                    <div className="home_offer_details">
                      As part of each contest, we also offer email campaign
                      options tailored to your needs.
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18_4.png")}
                    />
                    <div className="home_offer_heading_small">
                      White label options
                    </div>
                    <div className="home_offer_details">
                      Would you like to host a game on your site with your
                      branding? No problem. We offer full white label
                      integration.
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18_8.png")}
                    />
                    <div className="home_offer_heading_small">
                      Custom game development
                    </div>
                    <div className="home_offer_details">
                      Want to design an interactive game that’s more suited to
                      your brand? If you can imagine it, we can make it happen!
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/mobile-app.png")}
                    />
                    <div className="home_offer_heading_small">
                      Mobile App (coming soon!)
                    </div>
                    <div className="home_offer_details">
                      We are working on a mobile app to let offer even more
                      interactive options to contest/lottery participants. Stay
                      tuned!
                    </div>
                  </center>
                </div>
                <center>
                  <button className="home_offer_button">Partner With Us</button>
                </center>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(Home);
