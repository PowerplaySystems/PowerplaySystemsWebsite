import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";
let ballsTotal = 48;
let allowedToSelect = 16;
let ballElements = [];
let selectedNumbers = [];
class Sweet16 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      content: ""
    };
    this.setBalls();
    this.canSelectMore = this.canSelectMore.bind(this);
  }
  componentDidMount() {
    window.scroll(0, 0);
    var buttons = document.getElementsByClassName("sweet16_selection_button");
    var that = this;
    for (var x = 0; x < buttons.length; x++) {
      buttons[x].addEventListener("click", function(e) {
        var mTarget = e.target;

        var number = mTarget.textContent;
        var index = selectedNumbers.indexOf(number);
        if (index > -1) {
          var filtered = selectedNumbers.filter(function(value, index, arr) {
            return value != number;
          });
          selectedNumbers = [...filtered];
          mTarget.classList.toggle("btn-active");
        } else {
          if (that.canSelectMore()) {
            selectedNumbers.push(number);
            mTarget.classList.toggle("btn-active");
          } else {
            alert("Cannot select More than " + allowedToSelect);
          }
        }
      });
    }
    document
      .getElementById("submit_selection_ball")
      .addEventListener("click", function(e) {
        if (that.canSubmit()) {
          that.submitUserSelections();
        } else {
          alert("Can not submit less than " + allowedToSelect);
          return;
        }
      });
  }
  canSelectMore() {
    if (selectedNumbers.length >= allowedToSelect) {
      return false;
    } else {
      return true;
    }
  }
  canSubmit() {
    if (selectedNumbers.length == allowedToSelect) {
      return true;
    } else {
      return false;
    }
  }
  submitUserSelections() {
    alert("Submited");
  }
  setBalls() {
    for (var i = 1; i <= ballsTotal; i++) {
      ballElements.push(
        <div className="sweet16_selection_button" id={"ball-" + i}>
          {i}
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid _faq_wrap">
          <div className="container">
            <div className="row sweet16_rows">
              <div className="col-md-12">
                <img
                  className="img-responsive"
                  src={require("./../../assets/images/lotto/sweet16/sweet16_header.png")}
                />
              </div>
              <div className="col-md-12">
                <div className="page747_main_bar row">
                  <div className="col-md-6">
                    <div class="main_bar_inner">
                      <div>
                        <p>Jackpot</p>
                        <p className="main_bar_inner_bigger">$100,000</p>
                      </div>
                      <div className="page747_main_left_lower_text">
                        Draw date <s>June 5th, 2019 , 8:00 pm EST</s>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div class="page747_main_draw_box">
                      <div>
                        <p>Next draw starts in</p>
                        <div className="row page747_main_draw_inner">
                          <div>
                            <p>1</p>
                            Days
                          </div>
                          <div>
                            <p>14</p>
                            hours
                          </div>
                          <div>
                            <p>23</p>
                            Mints
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="page747_main_lower_text">
                      Draw date <s>June 5th, 2019 , 8:00 pm EST</s>
                    </div>
                  </div>
                </div>
                <center class="main_bar_button">
                  <button>Pick Your Numbers Now!</button>
                </center>
              </div>
              <div className="col-md-12">
                <div className="sweet16_main_prize">
                  <div class="sweet16_prize_image-wraper">
                    <img
                      className="img-responsive"
                      src={require("./../../assets/images/747/747_prize.png")}
                    />
                  </div>

                  <div className="sweet16_prize_details">
                    <div className="sweet16_prize_content">
                      <div class="sweet16_prize_header row">
                        <div className="row">
                          <span>Prizes</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="sweet16-prize-box-wrapper">
                          <div className="sweet16-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                        <div className="sweet16-prize-box-wrapper">
                          <div className="sweet16-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                        <div className="sweet16-prize-box-wrapper">
                          <div className="sweet16-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                        <div className="sweet16-prize-box-wrapper">
                          <div className="sweet16-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                      </div>

                      <div className="sweet16_prize_note">
                        *All prizes will be divided equally among winners
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="sweet16_main_power">
                  <div class="sweet16_power_image-wraper">
                    <img
                      className="img-responsive"
                      src={require("./../../assets/images/747/747_powerplays.png")}
                    />
                  </div>
                  <div className="sweet16_power_details">
                    <div className="sweet16_power_heading">Powerplays</div>
                    <div className="sweet16_power_content">
                      <div className="col-md-6 power_content_box">
                        <div className="col-md-4 power_content_box_left">
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
                        <div className="col-md-6 power_content_box_right">
                          <span>
                            You can increase or decrease your pick live during
                            the draw
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6 power_content_box">
                        <div className="col-md-4 power_content_box_left">
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
                        <div className="col-md-6 power_content_box_right">
                          <span>
                            Use force match to change your pick to match the
                            drawn #
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6 power_content_box">
                        <div className="col-md-4 power_content_box_left">
                          <div className="power_content_box_left_image_wrapper">
                            <img
                              className="img-responsive power_content_box_left_image"
                              src={require("./../../assets/images/lotto/shuffle.png")}
                            />
                          </div>
                          <div className="power_content_box_left_text">
                            Change
                          </div>
                        </div>
                        <div className="col-md-6 power_content_box_right">
                          <span>
                            Use change to replace one # with a random new Number
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6 power_content_box">
                        <div className="col-md-4 power_content_box_left">
                          <div className="power_content_box_left_image_wrapper">
                            <img
                              className="img-responsive power_content_box_left_image"
                              src={require("./../../assets/images/747/747_1.png")}
                            />
                          </div>
                          <div className="power_content_box_left_text">
                            Refresh All
                          </div>
                        </div>
                        <div className="col-md-6 power_content_box_right">
                          <span>
                            Use refresh all to refresh all your numbers with a
                            random new set.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="page747_number_header">
                  <span>Pick Your Numbers!</span>
                </div>

                <div className="col-md-12">
                  <div className="page747_number_rules">CONTEST RULES</div>
                  <div class="page747_number_box">
                    <div>
                      <p>Till Next Draw</p>
                      <div className="row page747_next_draw_box">
                        <div>
                          <p>1</p>
                          Days
                        </div>
                        <div>
                          <p>14</p>
                          hours
                        </div>
                        <div>
                          <p>23</p>
                          Mints
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="sweet16_selection_box">{ballElements}</div>
                </div>
                <div className="col-md-12">
                  <div
                    className="sweet16_selection_box_submit"
                    id="submit_selection_ball"
                  >
                    SUBMIT!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Sweet16);
