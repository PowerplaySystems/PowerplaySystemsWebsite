import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";
import * as Constants from "./../common/constants";
import Cookies from "universal-cookie";

let ballsTotal = 48;
let allowedToSelect = 8;
let ballElements = [];
let selectedNumbers = [];
class Elite8 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      content: "",
      gameData: this.props.location.state.gameData
    };
    this.setBalls();
    this.canSelectMore = this.canSelectMore.bind(this);
    this.getJackpot = this.getJackpot.bind(this);
    this.getDays = this.getDays.bind(this);
    this.getHours = this.getHours.bind(this);
    this.getMinuts = this.getMinuts.bind(this);
    this.scrollToNumbers = this.scrollToNumbers.bind(this);
  }
  getJackpot(prizeArray) {
    if (prizeArray) {
      prizeArray.sort((a, b) => parseFloat(a.hits) - parseFloat(b.hits));
      return "$" + prizeArray[prizeArray.length - 1].prize;
    } else {
      return "Coming soon";
    }
  }
  scrollToNumbers() {
    const gameTable = document.getElementById("pick-numbers");
    if (gameTable) {
      gameTable.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }
  getDays(timestamp) {
    if (!timestamp) {
      return "-";
    }
    const now = new Date();
    const gameDate = new Date(timestamp);
    const diffTime = Math.abs(gameDate.getTime() - now.getTime());
    const diffDays = parseInt(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  getHours(timestamp) {
    if (!timestamp) {
      return "-";
    }
    const now = new Date();
    const gameDate = new Date(timestamp);
    // get total seconds between the times
    var delta = Math.abs(gameDate - now) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    return hours;
    // // calculate (and subtract) whole minutes
    // var minutes = Math.floor(delta / 60) % 60;
    // delta -= minutes * 60;

    // // what's left is seconds
    // var seconds = delta % 60; // in theory the modulus is not required
  }
  getMinuts(timestamp) {
    if (!timestamp) {
      return "-";
    }
    const now = new Date();
    const gameDate = new Date(timestamp);
    // get total seconds between the times
    var delta = Math.abs(gameDate - now) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    return minutes;
    // // what's left is seconds
    // var seconds = delta % 60; // in theory the modulus is not required
  }
  getMyPickedNumbers() {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    var that = this;
    fetch(
      "https://" + Constants.URL + "/public_api/lottery_games/getMyNumbers.php?jwt=" +
        jwt +
        "&game_id=" +
        this.state.gameData.id
    )
      .then(res => res.json())
      .then(
        result => {
          result = result.records;
          result.forEach(element => {
            selectedNumbers.push(element.number + "");
            that.updateButtons(element.number);
          });

          this.setState({
            isLoaded: true
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
  updateButtons(text) {
    var allBalls = document.getElementsByClassName("elite8_selection_button");
    var searchText = text + "";
    var found;

    for (var i = 0; i < allBalls.length; i++) {
      if (allBalls[i].textContent == searchText) {
        found = allBalls[i];
        break;
      }
    }
    if (found) {
      found.classList.toggle("btn-active");
    }
  }
  componentDidMount() {
    window.scroll(0, 0);
    this.getMyPickedNumbers();
    var buttons = document.getElementsByClassName("elite8_selection_button");
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
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    var data =
      "numbers=" +
      selectedNumbers +
      "&jwt=" +
      jwt +
      "&game_id=" +
      this.state.gameData.id +
      "&gametype_id=" +
      Constants.ELITE8_ID;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var that = this;
    console.log(data);
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        if (~this.responseText.indexOf("Successful")) {
          alert("Updated");
          that.props.history.push({
            pathname: "/powerplay-lotto"
          });
        } else {
        }
      }
    });
    xhr.open(
      "POST",
      " https://" + Constants.URL + "/public_api/lottery_games/setMyNumbers.php"
    );
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }
  setBalls() {
    for (var i = 1; i <= ballsTotal; i++) {
      ballElements.push(
        <div className="elite8_selection_button" id={"ball-" + i}>
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
            <div className="row elite8_rows">
              <div className="col-md-12">
                <img
                  className="img-responsive"
                  src={require("./../../assets/images/lotto/elite8/elite8_header.png")}
                />
              </div>
              <div className="col-md-12">
                <div className="page747_main_bar row">
                  <div className="col-md-6">
                    <div class="main_bar_inner">
                      <div>
                        <p>Jackpot</p>
                        <p className="main_bar_inner_bigger">
                          {this.getJackpot(this.state.gameData.prize)}
                        </p>
                      </div>
                      <div className="page747_main_left_lower_text">
                        Draw date <s>{this.state.gameData.start_datetime}</s>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div class="page747_main_draw_box">
                      <div>
                        <p>Next draw starts in</p>
                        <div className="row page747_main_draw_inner">
                          <div>
                            <p>
                              {" "}
                              {this.getDays(this.state.gameData.start_datetime)}
                            </p>
                            Days
                          </div>
                          <div>
                            <p>
                              {" "}
                              {this.getHours(
                                this.state.gameData.start_datetime
                              )}
                            </p>
                            hours
                          </div>
                          <div>
                            <p>
                              {" "}
                              {this.getMinuts(
                                this.state.gameData.start_datetime
                              )}
                            </p>
                            Mins
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="page747_main_lower_text">
                      Draw date <s>{this.state.gameData.start_datetime}</s>
                    </div>
                  </div>
                </div>
                <center class="main_bar_button">
                  <button onClick={this.scrollToNumbers}>
                    Pick Your Numbers Now!
                  </button>
                </center>
              </div>
              <div className="col-md-12">
                <div className="elite8_main_prize">
                  <div class="elite8_prize_image-wraper">
                    <img
                      className="img-responsive"
                      src={require("./../../assets/images/747/747_prize.png")}
                    />
                  </div>

                  <div className="elite8_prize_details">
                    <div className="elite8_prize_content">
                      <div class="elite8_prize_header row">
                        <div className="row">
                          <span>Prizes</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="elite8-prize-box-wrapper">
                          <div className="elite8-prize-box">
                            {this.state.gameData.prize[0].hits + " Number of 8"}{" "}
                            <br />
                            <span>
                              {"$" + this.state.gameData.prize[0].prize}
                            </span>
                          </div>
                        </div>
                        <div className="elite8-prize-box-wrapper">
                          <div className="elite8-prize-box">
                            {this.state.gameData.prize[1].hits + " Number of 8"}{" "}
                            <br />
                            <span>
                              {"$" + this.state.gameData.prize[1].prize}
                            </span>
                          </div>
                        </div>
                        <div className="elite8-prize-box-wrapper">
                          <div className="elite8-prize-box">
                            {this.state.gameData.prize[2].hits + " Number of 8"}{" "}
                            <br />
                            <span>
                              {"$" + this.state.gameData.prize[2].prize}
                            </span>
                          </div>
                        </div>
                        <div className="elite8-prize-box-wrapper">
                          <div className="elite8-prize-box">
                            {this.state.gameData.prize[3].hits + " Number of 8"}{" "}
                            <br />
                            <span>
                              {"$" + this.state.gameData.prize[3].prize}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="elite8_prize_note">
                        *All prizes will be divided equally among winners
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="elite8_main_power">
                  <div class="elite8_power_image-wraper">
                    <img
                      className="img-responsive"
                      src={require("./../../assets/images/747/747_powerplays.png")}
                    />
                  </div>
                  <div className="elite8_power_details">
                    <div className="elite8_power_heading">Powerplays</div>
                    <div className="elite8_power_content">
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
                          <p>
                            {" "}
                            {this.getDays(this.state.gameData.start_datetime)}
                          </p>
                          Days
                        </div>
                        <div>
                          <p>
                            {" "}
                            {this.getHours(this.state.gameData.start_datetime)}
                          </p>
                          hours
                        </div>
                        <div>
                          <p>
                            {" "}
                            {this.getMinuts(this.state.gameData.start_datetime)}
                          </p>
                          Mins
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="elite8_selection_box" id = "pick-numbers">{ballElements}</div>
                </div>
                <div className="col-md-12">
                  <div
                    className="elite8_selection_box_submit"
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

export default withRouter(Elite8);
