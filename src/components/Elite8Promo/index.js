import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import DrawTimer from "./../common/DrawTimer";
import * as Functions from "./../common/functions";
import "./index.css";
import Cookies from "universal-cookie";
import * as Constants from "./../common/constants";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

class Elite8Promo extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {};
  }

  //component Functions
  componentDidMount() {}
  render() {
    return (
      <>
       <Header />
        <DrawTimer/>
        <div className="promo-content">
          <div className="elite8-promo-header">
            <div className="elite8-promo-header-content">
              <div className="elite8-promo-header-text1">Elite 8</div>
              <div className="elite8-promo-header-text2">
                Promotional Contest
              </div>
            </div>
            <button className="elite8-promo-header-button"
          onClick={() => this.props.history.push("/elite8")}>ENTER NOW!</button>
          </div>
          <div className="elite8-promo-row1">
            <img
              className="elite8-promo-row1-img"
              src={require("./../../assets/images/elite8-promo/prie.png")}
            />
            <div className="elite8-promo-row-content">
              <div className="elite8-promo-row-header">Prizes</div>
              <div className="elite8-promo-row-prizes">
                <div className="elite8-promo-row-prize">
                  <div className="elite8-promo-row-prize-header">1st</div>
                  <div className="elite8-promo-row-prize-text">$500</div>
                </div>
                <div className="elite8-promo-row-prize">
                  <div className="elite8-promo-row-prize-header">1st</div>
                  <div className="elite8-promo-row-prize-text">$500</div>
                </div>
                <div className="elite8-promo-row-prize">
                  <div className="elite8-promo-row-prize-header">1st</div>
                  <div className="elite8-promo-row-prize-text">$500</div>
                </div>
              </div>
              <button className="elite8-promo-header-button">Win 500$ !</button>
            </div>
          </div>
          <div className="elite8-promo-row2">
            <img
              className="elite8-promo-row2-img"
              src={require("./../../assets/images/elite8-promo/time.png")}
            />
            <div className="elite8-promo-row2-content">
              <div className="elite8-promo-row2-header">
                Pick your winning numbers weekly by 8pm on Sunday.
              </div>
              <div className="elite8-promo-row2-sub">
                Contest runs from Jan 10 to Feb 28th
              </div>
              <div className="elite8-promo-header-button m-btn"
                 onClick={() => this.props.history.push("/elite8")}>ENTER NOW!</div>
            </div>
          </div>
          <div className="page747_main_power">
            <div class="page747_power_image-wraper">
              <img
                className="img-responsive"
                src={require("./../../assets/images/747/747_powerplays.png")}
              />
            </div>
            <div className="page747_power_details">
              <div className="page747_power_heading">Powerplays</div>
              <div className="page747_power_heading_sub">
                Use powerplays to edit your numbers live during the draw
              </div>
              <div className="page747_power_content">
                <div className="power_content_box">
                  <div className="power_content_box_left">
                    <div className="power_content_box_left_image_wrapper">
                      <img
                        className="img-responsive power_content_box_left_image"
                        src={require("./../../assets/images/747/747_2.png")}
                      />
                    </div>
                    <div className="power_content_box_left_text">
                      Increase/Decrease
                    </div>
                  </div>
                  <div className="power_content_box_right">
                    <span>
                      You can increase or decrease your selections live during
                      the game.
                    </span>
                  </div>
                </div>
                <div className="power_content_box">
                  <div className="power_content_box_left">
                    <div className="power_content_box_left_image_wrapper">
                      <img
                        className="img-responsive power_content_box_left_image"
                        src={require("./../../assets/images/747/747_3.png")}
                      />
                    </div>
                    <div className="power_content_box_left_text">
                      Power Match
                    </div>
                  </div>
                  <div className=" power_content_box_right">
                    <span>
                      Use Power Match to change your pick to match the in-play
                      numbers.
                    </span>
                  </div>
                </div>
                <div className=" power_content_box">
                  <div className=" power_content_box_left">
                    <div className="power_content_box_left_image_wrapper">
                      <img
                        className="img-responsive power_content_box_left_image"
                        style={{ width: "57px" }}
                        src={require("./../../assets/images/lotto/shuffle.png")}
                      />
                    </div>
                    <div className="power_content_box_left_text">Replace</div>
                  </div>
                  <div className=" power_content_box_right">
                    <span>
                      Use Replace to swap one of your selections with a random
                      new number.
                    </span>
                  </div>
                </div>
                <div className=" power_content_box">
                  <div className=" power_content_box_left">
                    <div className="power_content_box_left_image_wrapper">
                      <img
                        className="img-responsive power_content_box_left_image"
                        src={require("./../../assets/images/747/747_1.png")}
                      />
                    </div>
                    <div className="power_content_box_left_text">
                      Replace All
                    </div>
                  </div>
                  <div className=" power_content_box_right">
                    <span>
                      Use Replace All to replace all your selections with a
                      random new set.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
export default withRouter(Elite8Promo);
