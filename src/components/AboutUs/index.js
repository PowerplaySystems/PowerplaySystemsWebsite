import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";

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
    fetch("https://powerplaysystems.com/api/website_footer/get_aboutus.php")
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
              <span>Changing</span>the promotional contest/sweepstakes landscape
            </p>
          </div>
          <center>
            <div className="about_us_section_heading">What We Do?</div>
            <div className="about_us_section_sub">
              Powerplay Games is changing the promotional contest/sweepstakes
              landscape by offering the worlds first patent pending interactive
              lottery and sports platform.
            </div>
            <div className="about_us_row_two" />
            <div className="about_us_row_three">
              <div className="about_us_row_left">
                <div className="row_three_header">Powerplay Lotto</div>
                <div className="row_three_text">
                  Bla bla for powerplay Lotto another bla bla till we fill this
                  paragraph with all blas blas Bla bla for powerplay lotto
                  another bla bla till we fill this paragraph with all blas blas
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
                  Bla bla for powerplay live sports another bla bla till we fill
                  this paragraph with all blas blas Bla bla for powerplay live
                  sports another bla bla till we fill this paragraph with all
                  blas blas
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
              This should be a promotional sentence about why i should apply as
              powerplay partner, maybe some stats about how my sales will
              increase{" "}
            </div>

            <button
              onClick={() => this.props.history.push("/partner")}
              className="about_us_button_partner"
            >
              Become a Partner
            </button>
            <div className="about_us_section_heading">Our Players</div>
            <div className="about_us_section_sub">
              Powerplay platfrom is used and loved by millions of people around
              the globe.
            </div>
            <div className="about_us_row_players">
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
            </div>
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
