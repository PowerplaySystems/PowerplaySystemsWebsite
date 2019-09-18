import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";
import * as Constants from "./../common/constants";
class AboutUs extends Component {
  constructor(props) {
    super(props);
    window.scroll(0, 0);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
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
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          result = result.records;

          this.setState({
            data: result
          });
        },
        error => {
          this.setState({
            hasError: true,
            error: error
          });
        }
      );
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid p-o">
          <div className="about_us_row_one">
            <p className="about_us_heading">
              <span>Changing</span> the landscape for interactive games and
              contests
            </p>
          </div>
          <center>
            <div className="about_us_section_heading">What We Do?</div>
            <div className="about_us_section_sub">
              Powerplay Systems is offering the worlds first patent pending
              interactive Live Sports and Lottery platform. Our platform can be
              used for charity fundraising, State run lotteries, lead
              generation, or promotional contests.
            </div>
            <div className="about_us_row_two" />
            <div className="about_us_row_three">
              <div className="about_us_row_left">
                <div className="row_three_header">Powerplay Lotto</div>
                <div className="row_three_text">
                  Utilize our Powerful fully customizable lottery platform to
                  take your lottery offering to the next level. Whether it is a
                  Sporting event 50/50 draw or a Mega-Millions draw, our
                  platform will provide your customers with an exceptionally
                  exciting experience.
                </div>
                <button
                  className="row_three_button"
                  onClick={() => this.props.history.push("/powerplay-lotto")}
                >
                  Explore Games
                </button>
              </div>
              <div className="about_us_row_right">
                <div className="row_three_header">Powerplay Live Sports</div>
                <div className="row_three_text">
                  Would you like to ramp up customer engagement? Use our
                  interactive live sports platform to drive customer behavior by
                  offering exciting new fantasy sports games, bar games,
                  promotional contests, sports betting games, and even sports
                  based lotteries.
                </div>
                <button
                  className="row_three_button"
                  onClick={() => this.props.history.push("/live-sports")}
                >
                  Explore Games
                </button>
              </div>
            </div>
            <div className="about_us_section_heading">Our Partners</div>
            <div className="about_us_section_sub">
              Partner with us to engage with your customers and offer exiting
              new customer interaction points. You will have truly engaged
              customers, new leads, and access to the mobile generation. Let's
              get started.{" "}
            </div>

            <button
              onClick={() => this.props.history.push("/partner")}
              className="about_us_button_partner"
            >
              Become a Partner
            </button>
            <div className="about_us_section_heading">Our Mission</div>
            <br/>
            <div className="about_us_section_sub">
            To have our games used and loved by millions around the globe.
            </div>
            {/* <div className="about_us_row_players">
              <div className="about_us_player_box">
                <div className="about_us_player_header">
                  <img src={require("./../../assets/images/about_us/pp.png")} />
                  <span>Adams Sandler</span>
                </div>
                <div className="about_us_coment">
                  Oh Powerplay I Love3 you soooo much. You helped me do some
                  wonderful work today.
                </div>
              </div>
              <div className="about_us_player_box_active">
                <div className="about_us_player_header">
                  <img src={require("./../../assets/images/about_us/pp.png")} />
                  <span>Adams Sandler</span>
                </div>
                <div className="about_us_coment">
                  Oh Powerplay I Love3 you soooo much. You helped me do some
                  wonderful work today.
                </div>
              </div>
              <div className="about_us_player_box">
                <div className="about_us_player_header">
                  <img src={require("./../../assets/images/about_us/pp.png")} />
                  <span>Adams Sandler</span>
                </div>
                <div className="about_us_coment">
                  Oh Powerplay I Love3 you soooo much. You helped me do some
                  wonderful work today.
                </div>
              </div>
            </div> */}
            <div className="about_us_section_heading">Where to Find Us?</div>
            <div className="about_us_address_row">
              <img
                className="about_us_address_img"
                src={require("./../../assets/images/about_us/map.PNG")}
              />

              <div className="about_us_address">
                <img
                  src={require("./../../assets/images/about_us/placeholder.png")}
                />

                <span>140 Yonge St., S.200 Toronto, Ontario M5C 1X</span>
                <br />
                <img
                  src={require("./../../assets/images/about_us/phone_call.png")}
                />
                <span>1-833-361-TBD</span>
                <br />
                <button className="btn_contact_us">Contact Us</button>
              </div>
            </div>
          </center>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(AboutUs);
