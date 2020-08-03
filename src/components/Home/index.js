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
    document.getElementsByTagName("META")[2].content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
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
  componentWillUnmount() {}
  render() {
    return (
      <>
        <Header />
        <DrawTimer />
        <div className="container-fluid">
          <div className="container-fluid">
            <div class="container-fluid">
              <div className="home_first_row" style={firstRowStyle}>
                <center>
                  <div className="header-main">
                    Leverage Our Revolutionary Interactive Platform to
                    Maximize Customer Engagement*
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
                        Wide Variety of Experiences
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => this.props.history.push("/partner")}
                    className="first_row_button"
                  >
                    Partner With Us
                  </button>
                </center>
                <div className="first_row_extra_info">
                  *International Patents Pending
                </div>
              </div>
              <div class="home_first_row" style={secondRows}>
                <center>
                  <div className="header_row_2">
                    Provide Your Customers with Real Excitement !
                  </div>
                  <div className="detail_row_2">
                    Utilizing our platform your customers will be fully engaged.
                    They can utilize Powerplays to boost their point total live
                    during a game or change selections live during a lottery
                    draw. Now that is EXCITEMENT! <br />
                    Available exclusively from PowerPlay Systems.
                  </div>
                </center>
              </div>
              <div class="home_first_row" style={thirdRows}>
                <div className="home_row_3_content">
                  <div className="header_row_3">
                    Powerplay Live Sports Platform
                  </div>
                  <div className="detail_row_3">
                    Leverage our platform to offer experiences covering all
                    major North American sports leagues.
                  </div>
                  <div className="row_3_items_container">
                    <div className="row_3_item">Promotional Contests</div>
                    <div className="row_3_item">Charity Contests</div>
                    <div className="row_3_item">State Level Solutions</div>
                    <div className="row_3_item">Casino Solutions</div>
                    <div className="row_3_item">
                      Local sports bar - interactive games / contests
                    </div>
                  </div>
                  <button
                    className="row_3_button"
                    onClick={() => this.props.history.push("/live-sports")}
                  >
                    Explore Our Live Sports Platform Now!
                  </button>
                </div>
              </div>
              <div class="home_first_row" style={fourthRows}>
                <div className="home_row_3_content">
                  <div className="header_row_3">Powerplay Lotto Platform</div>
                  <div className="detail_row_3">
                    Utilize our Interactive Lottery platform to offer your
                    customers an exceptional interactive experience.
                  </div>
                  <div className="row_3_items_container">
                    <div className="row_3_item">Promotional lotteries</div>
                    <div className="row_3_item">Charity lotteries</div>
                    <div className="row_3_item">State run lotteries</div>
                    <div className="row_3_item">Casino Solutions</div>
                    <div className="row_3_item">50/50 Raffles</div>
                  </div>
                  <button
                    className="row_3_button"
                    style={{ width: "550px" }}
                    onClick={() => this.props.history.push("/powerplay-lotto")}
                  >
                    Explore Our Interactive Platform Now!
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
                      Full Service Promotional/Charity Contests
                    </div>
                    <div className="home_offer_details">
                      Utilize our platform to run an interactive
                      promotional/charity contest that is fully tailored to your
                      needs. With our interactive platform, we offer your
                      players an exciting and unmatched excitement. We also take
                      care of all legal requirements and administrative tasks
                      leaving you to focus on your business or charity.
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18_5.png")}
                    />
                    <div className="home_offer_heading">
                      State Run Lottery<br/> Offering
                    </div>
                    <div className="home_offer_details">
                      Using our game changing Platform, state-run lotteries can
                      offer fully integrated, mobile friendly interactive
                      lottery options. Our solution is designed to keep player
                      engagement high, therefore, increasing the number of
                      players in every event while offering you a high revenue
                      stream
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group_18.png")}
                    />
                    <div className="home_offer_heading">
                      Lead <br />
                      Generation
                    </div>
                    <div className="home_offer_details">
                      Utilize our platform to generate 100% true leads by
                      steering customer behavior through the use of Powerplays.
                      You can steer consumer behavior to obtain more powerplays
                      either before the game starts or even during the game by
                      performing any customized action you can think of.
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
                      Using our Geo-Fencing technology, we will help you set up
                      a geofence right around your business or event to entice
                      players to play at your establishment. Great for sports
                      bars!
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
                      experienced and financially bound insurer. We offer you a
                      prize indemnification coverage on your contests and
                      promotions as this will increase traffic, excitement, and
                      sales during your event.
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
                      Compliance With The Law
                    </div>
                    <div className="home_offer_details">
                      Each contest will include a set of official rules that
                      identify the material terms and conditions that govern the
                      promotion. We will ensure that your event complied with
                      all applicable regional laws, policies, and regulations.
                    </div>
                  </center>
                </div>
                <center>
                  <button
                    onClick={() => this.props.history.push("/partner")}
                    className="home_offer_button"
                  >
                    Partner With Us
                  </button>
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
                      Our platform is built using an Industry Leading Technology
                      that is scalable, ultra-fast, SSL encrypted and digitally
                      secured. We have put in place multilevel security measures
                      to protect the integrity of our games so you don’t have to
                      worry.
                    </div>
                  </center>
                </div>
                <div className="home_offers_item">
                  <center>
                    <img
                      className="home_offer_icon"
                      src={require("./../../assets/images/home/group-18_6.png")}
                    />
                    <div className="home_offer_heading_small">Analysis</div>
                    <div className="home_offer_details">
                      When you run a promotion, you will want to know how
                      successful it was. We will analyze your promotion and
                      relevant gaming variables to determine when your promotion
                      was most successful and how to improve on it. Our analysis
                      will do just that.
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
                      Email Campaign
                    </div>
                    <div className="home_offer_details">
                      When you run a promotion, you will want to know how
                      successful it was. We will analyze your promotion and
                      relevant gaming variables to determine when your promotion
                      was most successful and how to improve on it. Our analysis
                      will do just that.
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
                      White Label Options
                    </div>
                    <div className="home_offer_details">
                      All of our solutions are fully customized to be integrated
                      with your brand. We offer full white label integration
                      where we will deploy our unique solution and make it
                      seamless with your brand’s purposes and objectives.
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
                      Custom Game Development
                    </div>
                    <div className="home_offer_details">
                      Want to design an interactive game that’s more suited to
                      your brand? If you can imagine it, we can make it happen!
                      We will work with you to create a unique and special game
                      to meet your exact technical specifications and marketing
                      needs.
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
                      We are working on a mobile app that will make it very easy
                      for all participants to access their games at any time and
                      in any place without limitations. Our mobile app will
                      offer exciting and more interactive options to
                      contest/lottery participants. Stay tuned!
                    </div>
                  </center>
                </div>
                <center>
                  <button
                    onClick={() => this.props.history.push("/partner")}
                    className="home_offer_button"
                  >
                    Partner With Us
                  </button>
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
