import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./index.css";
import * as Constants from "./../common/constants";
import Cookies from "universal-cookie";

var countdown = null;
var mTotalMatched = 0;

var bg = require("./../../assets/images/747_live/circle.png");
let mCircleStyles = {
  backgroundImage: "url(" + bg + ")",
  backgroundSize: "cover",
  overflow: "hidden"
};
let mLockedCircleStyles = {
  backgroundImage: "url(" + bg + ")",
  backgroundSize: "cover",
  overflow: "hidden"
};
class Sweet16Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      content: "",
      picks: [],
      gameData: this.props.location.state.gameData,
      draw: []
    };
    this.getJackpot = this.getJackpot.bind(this);
    this.isAMatch = this.isAMatch.bind(this);
  }
  isAMatch(element) {
    let obj = this.state.draw.find(
      obj => obj.daw_ball_number == element.number
    );
    if (obj) {
      return true;
    } else {
      return false;
    }
  }
  setTotalMatched() {
    mTotalMatched = 0;
    this.state.picks.forEach(element => {
      let obj = this.state.draw.find(
        obj => obj.daw_ball_number == element.number
      );
      if (obj) {
        mTotalMatched = mTotalMatched + 1;
      }
    });
    document.getElementById("total-matched").innerHTML = mTotalMatched;
  }
  countdownTimer(lastDrawTime, timer, delay) {
    if (countdown) {
      clearInterval(countdown);
      countdown = null;
    }
    document.getElementById("sec-text").innerHTML = "sec";
    var dt = new Date(lastDrawTime);
    dt.setSeconds(dt.getSeconds() + timer);
    var countDownDate = new Date(dt).getTime();
    var that = this;
    var countdown = setInterval(function() {
      var usaTime = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York"
      });
      usaTime = new Date(usaTime);
      var now = usaTime.getTime();
      var distance = countDownDate - now;
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("m-timer").innerHTML = seconds;
      // If the count down is finished, write some text
      if (distance < 0) {
        document.getElementById("m-timer").innerHTML = "0";
        clearInterval(countdown);
        console.log(delay * 1000);
        if (
          that.state.gameData.status == "live" ||
          that.state.gameData.status == "In Progress"
        ) {
          document.getElementById("m-timer").innerHTML = "#";

          document.getElementById("sec-text").innerHTML = "Comming Up!";
          var myVar = setTimeout(function() {
            that.getData();
          }, delay * 1000);
        }
      }
    }, 1000);
  }
  getJackpot(prizeArray) {
    if (prizeArray) {
      prizeArray.sort((a, b) => parseFloat(a.hits) - parseFloat(b.hits));
      return "$" + prizeArray[prizeArray.length - 1].prize;
    } else {
      return "Coming soon";
    }
  }
  getData() {
    console.log("GETTING DATA");
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    var that = this;
    fetch(
      "https://mypowerplaygames.com/public_api/live_draw/data.php?jwt=" +
        jwt +
        "&game_id=" +
        this.state.gameData.id
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            draw: result.draw,
            picks: result.picks,
            gameData: result.game
          });
          that.setTotalMatched();
          if (result.draw.length > 0) {
            that.countdownTimer(
              result.draw[result.draw.length - 1].date_time,
              this.state.gameData.countdown_timer,
              this.state.gameData.delay
            );
          }
        },
        error => {
          this.setState({
            hasError: true,
            error: error
          });
        }
      );
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid _faq_wrap">
          <div className="container">
            <div className="row sweet16_live_rows">
              <div className="col-md-12">
                <img
                  className="img-responsive"
                  src={require("./../../assets/images/lotto/sweet16/sweet16_header.png")}
                />
              </div>
              <div className="col-md-12">
                <div className="live_draw_header_content">
                  <span>Jackpot</span>
                  <h2> {this.getJackpot(this.state.gameData.prize)}</h2>
                </div>
              </div>
              <div className="col-md-12">
                <div className="live_draw_header_content">
                  <span>Live Draw</span>
                </div>
                <div className="live_draw_winning_box_content">
                  <p>Winning Number</p>
                  <div className="row winning_box_numbers_sweet16">
                    {this.state.picks.map((element, key) => {
                      return (
                        <div
                          className="winning_box_circle_sweet16"
                          style={mCircleStyles}
                        >
                          {typeof this.state.draw[key] === "undefined"
                            ? "?"
                            : this.state.draw[key].daw_ball_number}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <center>
                  <div className="draw_wrapper">
                    <div className="live_draw_in_play">
                      <p>In Play</p>
                      <div className="live_draw_in_play_timer">
                        <div
                          className="live_draw_in_play_circle"
                          style={mCircleStyles}
                        >
                          {typeof this.state.draw[
                            this.state.draw.length - 1
                          ] === "undefined"
                            ? "-/-"
                            : this.state.draw[this.state.draw.length - 1]
                                .daw_ball_number}
                        </div>
                        <div className="live_draw_in_play_text">
                          Timer Till Next Number Draw
                        </div>
                        <div className="live_draw_in_play_time">
                          <t id="m-timer">9</t> <span id="sec-text">sec.</span>
                        </div>
                      </div>
                    </div>
                    <div className="live_draw_my_numbers">
                      <div className="live_draw_my_numbers_header_wrapper">
                        {" "}
                        <p>My Numbers</p>
                      </div>

                      <div className="live_draw_my_numbers_edit">
                        <div className="mleft">
                          <p className="mleft_top_text">
                            Cick a number to edit
                          </p>
                          <div className="row edit_numbers">
                            {this.state.picks.map((element, key) => {
                              if (this.isAMatch(element)) {
                                return (
                                  <div
                                    className="edit_numbers_circle_sweet16_active"
                                    style={mLockedCircleStyles}
                                  >
                                    {element.number}
                                    <img
                                      className="img-responsive"
                                      src={require("./../../assets/images/747_live/lock.png")}
                                    />
                                  </div>
                                );
                              } else {
                                return (
                                  <div
                                    className="edit_numbers_circle_sweet16"
                                    style={mCircleStyles}
                                  >
                                    {element.number}
                                  </div>
                                );
                              }
                            })}
                          </div>
                          <p className="live_draw_my_numbers_matched">
                            Matched <span id="total-matched">0</span> of 16
                            numbers
                          </p>
                          <p className="live_draw_my_numbers_notes">
                            You havn’t won any prizes so far <br />
                            Keep matching numbers!
                          </p>
                        </div>
                        <div className="mright">
                          <p className="mright_top_text">My Powerplays</p>
                          <div className="mright_powerplays">
                            <div className="mright_powerplays_item">
                              <div className="item_img_wrapper">
                                <img
                                  className="img-responsive"
                                  src={require("./../../assets/images/747_live/refresh.png")}
                                />
                              </div>
                              <div className="item_right">
                                <p>
                                  Refresh All
                                  <br />
                                  <span>1</span> Left
                                </p>
                              </div>
                            </div>
                            <div className="mright_powerplays_item">
                              <div className="item_img_wrapper">
                                <img
                                  className="img-responsive"
                                  src={require("./../../assets/images/747_live/shuffle.png")}
                                />
                              </div>
                              <div className="item_right">
                                <p>
                                  Change
                                  <br />
                                  <span>2</span> Left
                                </p>
                              </div>
                            </div>
                            <div className="mright_powerplays_item">
                              <div className="item_img_wrapper">
                                <img
                                  className="img-responsive"
                                  src={require("./../../assets/images/747_live/force.png")}
                                />
                              </div>
                              <div className="item_right">
                                <p>
                                  force match
                                  <br />
                                  <span>2</span> Left
                                </p>
                              </div>
                            </div>
                            <div className="mright_powerplays_item">
                              <div className="item_img_wrapper">
                                <img
                                  className="img-responsive"
                                  src={require("./../../assets/images/747_live/increase.png")}
                                />
                              </div>
                              <div className="item_right">
                                <p>
                                  Increase
                                  <br />
                                  <span>1</span> Left
                                </p>
                              </div>
                            </div>
                            <div className="mright_powerplays_item">
                              <div className="item_img_wrapper">
                                <img
                                  className="img-responsive"
                                  src={require("./../../assets/images/747_live/decrease.png")}
                                />
                              </div>
                              <div className="item_right">
                                <p>
                                  Decrease
                                  <br />
                                  <span>1</span> Left
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                            {this.state.gameData.prize[0].hits +
                              " Number of 16"}{" "}
                            <br />
                            <span>
                              {"$" + this.state.gameData.prize[0].prize}
                            </span>
                          </div>
                        </div>
                        <div className="sweet16-prize-box-wrapper">
                          <div className="sweet16-prize-box">
                            {this.state.gameData.prize[1].hits +
                              " Number of 16"}{" "}
                            <br />
                            <span>
                              {"$" + this.state.gameData.prize[1].prize}
                            </span>
                          </div>
                        </div>
                        <div className="sweet16-prize-box-wrapper">
                          <div className="sweet16-prize-box">
                            {this.state.gameData.prize[2].hits +
                              " Number of 16"}{" "}
                            <br />
                            <span>
                              {"$" + this.state.gameData.prize[2].prize}
                            </span>
                          </div>
                        </div>
                        <div className="sweet16-prize-box-wrapper">
                          <div className="sweet16-prize-box">
                            {this.state.gameData.prize[3].hits +
                              " Number of 16"}{" "}
                            <br />
                            <span>
                              {"$" + this.state.gameData.prize[3].prize}
                            </span>
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
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Sweet16Draw);
