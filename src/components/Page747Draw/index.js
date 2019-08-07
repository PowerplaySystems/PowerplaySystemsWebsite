import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";
import * as DES from "./../common/DES";
import * as Constants from "./../common/constants";
import Cookies from "universal-cookie";
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
var isInDelay = true;
var ballSelected = null;
var countdown = null;
var mTotalMatched = 0;
var selectedNumbers = [];
class Page747Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      content: "",
      picks: [],
      gameData: this.props.location.state.gameData,
      draw: [],
      drawRaw: []
    };

    this.getJackpot = this.getJackpot.bind(this);
    this.isAMatch = this.isAMatch.bind(this);
    this.onPowerplayClicked = this.onPowerplayClicked.bind(this);
    this.getPowerplayAmount = this.getPowerplayAmount.bind(this);
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
    console.log("In Countdown: " + lastDrawTime);
    var that = this;
    if (countdown) {
      clearInterval(countdown);
      countdown = null;
    }
    if (lastDrawTime == "check") {
      var myVar = setTimeout(function() {
        that.getData();
      }, 5000);
    } else if (lastDrawTime == null) {
      document.getElementById("m-timer").innerHTML = "#";
      document.getElementById("sec-text").innerHTML = "Comming Up!";
      var myVar = setTimeout(function() {
        that.getData();
      }, delay * 1000);
    } else {
      document.getElementById("sec-text").innerHTML = "sec";
      isInDelay = false;
      var dt = new Date(lastDrawTime);
      dt.setSeconds(dt.getSeconds() + timer);
      var countDownDate = new Date(dt).getTime();
      var countdown = setInterval(function() {
        var usaTime = new Date().toLocaleString("en-US", {
          timeZone: "America/New_York"
        });
        usaTime = new Date(usaTime);
        var now = usaTime.getTime();
        var distance = countDownDate - now;
        console.log(countDownDate);
        console.log(dt);
        console.log(usaTime);
        console.log(now);
        console.log(distance);
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("m-timer").innerHTML = seconds;
        // If the count down is finished, write some text
        if (distance < 0) {
          document.getElementById("m-timer").innerHTML = "0";
          clearInterval(countdown);
          isInDelay = true;
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
  }
  getJackpot(prizeArray) {
    if (prizeArray) {
      prizeArray.sort((a, b) => parseFloat(a.hits) - parseFloat(b.hits));
      return "$" + prizeArray[prizeArray.length - 1].prize;
    } else {
      return "Coming soon";
    }
  }
  onBallClicked(text) {
    if (ballSelected == text) {
      ballSelected = null;
    } else {
      ballSelected = text;
    }

    this.setState(this.state);
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  getRandomInts(num) {
    selectedNumbers = [];
    while (selectedNumbers.length < num) {
      var randNum = this.getRandomInt(1, 47);
      if (!selectedNumbers.indexOf(randNum) > -1) {
        selectedNumbers.push(randNum);
      }
    }
    return selectedNumbers;
  }

  onPowerplayClicked(powerplay) {
    selectedNumbers = [];
    //check if the game is live
    if (
      this.state.gameData.status != "live" &&
      this.state.gameData.status != "In Progress"
    ) {
      alert("Function Not available At this time");
      return;
    }
    //check if the any ball is selected
    if (powerplay != Constants.LOTETRY_POWERPLAY_REFRESH) {
      if (ballSelected == null) {
        alert("Please select a number");
        return;
      }
    }
    if (isInDelay) {
      alert("Please wait for the next Number!");
      return true;
    }
    //check if amount remaining is > 0
    if (this.getPowerplayAmount(powerplay) < 1) {
      alert("Cannot use this powerplay");
      return;
    }

    var newNumber;
    switch (powerplay) {
      case Constants.LOTETRY_POWERPLAY_CHANGE:
        newNumber = Math.floor(Math.random() * 47);
        break;
      case Constants.LOTETRY_POWERPLAY_REFRESH:
        console.log("Hi refresh");
        this.getRandomInts(7);
        break;
      case Constants.LOTETRY_POWERPLAY_INCREASE:
        newNumber = ballSelected + 1;
        break;
      case Constants.LOTETRY_POWERPLAY_DECREASE:
        newNumber = ballSelected - 1;
        break;
      case Constants.LOTETRY_POWERPLAY_FORCE_MATCH:
        newNumber = this.state.drawRaw[this.state.drawRaw.length - 1]
          .daw_ball_number;
        break;
      default:
        alert("Something Went Wrong With Powerplays!");
    }

    if (powerplay == Constants.LOTETRY_POWERPLAY_REFRESH) {
    } else {
      if (this.state.picks == undefined) return 0;
      this.state.picks.forEach(element => {
        selectedNumbers.push(element.number);
      });
      if (selectedNumbers.indexOf(newNumber) > -1) {
        alert("Not Allowed To have duplicate numbers!");
        return;
      }
      selectedNumbers = [];
      let obj = this.state.picks.find(obj => obj.number == ballSelected);
      if (obj) {
        obj.number = newNumber;
        this.state.picks.forEach(element => {
          selectedNumbers.push(element.number);
        });
      }
    }

    this.updatePowerplaysInDatabase(powerplay);
  }
  getData() {
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
          let myDraws = [...result.draw];
          let myPicks = result.picks;
          if (myDraws.length > 0) {
            myDraws.sort(
              (a, b) =>
                parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
            );
          }
          if (myPicks.length > 0) {
            myPicks.sort((a, b) => parseFloat(a.number) - parseFloat(b.number));
          }
          this.setState({
            isLoaded: true,
            drawRaw: result.draw,
            draw: myDraws,
            picks: myPicks,
            gameData: result.game,
            powerplays: result.powerplays
          });
          that.setTotalMatched();
          if (result.draw.length > 0) {
            that.countdownTimer(
              result.draw[result.draw.length - 1].date_time,
              this.state.gameData.countdown_timer,
              this.state.gameData.delay
            );
          } else if (
            result.game.status == "live" ||
            result.game.status == "In Progress"
          ) {
            that.countdownTimer(null, null, result.game.delay);
          } else {
            that.countdownTimer("check", null, null);
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
  getPowerplayAmount(id) {
    if (this.state.powerplays == undefined) return 0;
    let obj = this.state.powerplays.find(obj => obj.id == id);
    if (obj) {
      return obj.ramining_amount;
    } else {
      return 0;
    }
  }
  updatePowerplaysInDatabase(powerplay) {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    var data =
      "balls=" +
      selectedNumbers +
      "&jwt=" +
      jwt +
      "&game=" +
      this.state.gameData.id +
      "&type=" +
      Constants.LOTTO_747_ID +
      "&powerplay=" +
      powerplay;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var that = this;
    console.log(data);
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        if (~this.responseText.indexOf("Updated")) {
          that.getData();
        } else {
          alert("Something Went Wrong!");
        }
      }
    });
    xhr.open(
      "POST",
      " https://www.mypowerplaygames.com/public_api/live_draw/powerplay_use.php"
    );
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
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
            <div className="row page747_live_rows">
              <div className="col-md-12">
                <img
                  className="img-responsive"
                  src={require("./../../assets/images/747/747_header.png")}
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
                  <div className="row winning_box_numbers">
                    <div className="winning_box_circle" style={mCircleStyles}>
                      {typeof this.state.draw[0] === "undefined"
                        ? "?"
                        : this.state.draw[0].daw_ball_number}
                    </div>
                    <div className="winning_box_circle" style={mCircleStyles}>
                      {typeof this.state.draw[1] === "undefined"
                        ? "?"
                        : this.state.draw[1].daw_ball_number}
                    </div>
                    <div className="winning_box_circle" style={mCircleStyles}>
                      {typeof this.state.draw[2] === "undefined"
                        ? "?"
                        : this.state.draw[2].daw_ball_number}
                    </div>
                    <div className="winning_box_circle" style={mCircleStyles}>
                      {typeof this.state.draw[3] === "undefined"
                        ? "?"
                        : this.state.draw[3].daw_ball_number}
                    </div>
                    <div className="winning_box_circle" style={mCircleStyles}>
                      {typeof this.state.draw[4] === "undefined"
                        ? "?"
                        : this.state.draw[4].daw_ball_number}
                    </div>
                    <div className="winning_box_circle" style={mCircleStyles}>
                      {typeof this.state.draw[5] === "undefined"
                        ? "?"
                        : this.state.draw[5].daw_ball_number}
                    </div>
                    <div className="winning_box_circle" style={mCircleStyles}>
                      {typeof this.state.draw[6] === "undefined"
                        ? "?"
                        : this.state.draw[6].daw_ball_number}
                    </div>
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
                          {typeof this.state.drawRaw[
                            this.state.drawRaw.length - 1
                          ] === "undefined"
                            ? "-/-"
                            : this.state.drawRaw[this.state.drawRaw.length - 1]
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
                                    className={
                                      element.number == ballSelected
                                        ? " edit_numbers_circle_active pick_button_active"
                                        : "edit_numbers_circle_active"
                                    }
                                    style={mLockedCircleStyles}
                                    onClick={e =>
                                      this.onBallClicked(element.number)
                                    }
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
                                    className={
                                      element.number == ballSelected
                                        ? "edit_numbers_circle pick_button_active"
                                        : "edit_numbers_circle"
                                    }
                                    style={mCircleStyles}
                                    onClick={e =>
                                      this.onBallClicked(element.number)
                                    }
                                  >
                                    {element.number}
                                  </div>
                                );
                              }
                            })}
                          </div>
                          <p className="live_draw_my_numbers_matched">
                            Matched{" "}
                            <span id="total-matched">{mTotalMatched}</span> of 7
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
                                  onClick={e =>
                                    this.onPowerplayClicked(
                                      Constants.LOTETRY_POWERPLAY_REFRESH
                                    )
                                  }
                                  className="img-responsive"
                                  src={require("./../../assets/images/747_live/refresh.png")}
                                />
                              </div>
                              <div className="item_right">
                                <p>
                                  Refresh All
                                  <br />
                                  <span>
                                    {this.getPowerplayAmount(
                                      Constants.LOTETRY_POWERPLAY_REFRESH
                                    )}
                                  </span>
                                  Left
                                </p>
                              </div>
                            </div>
                            <div className="mright_powerplays_item">
                              <div className="item_img_wrapper">
                                <img
                                  onClick={e =>
                                    this.onPowerplayClicked(
                                      Constants.LOTETRY_POWERPLAY_CHANGE
                                    )
                                  }
                                  className="img-responsive"
                                  src={require("./../../assets/images/747_live/shuffle.png")}
                                />
                              </div>
                              <div className="item_right">
                                <p>
                                  Change
                                  <br />
                                  <span>
                                    {" "}
                                    {this.getPowerplayAmount(
                                      Constants.LOTETRY_POWERPLAY_CHANGE
                                    )}
                                  </span>{" "}
                                  Left
                                </p>
                              </div>
                            </div>
                            <div className="mright_powerplays_item">
                              <div className="item_img_wrapper">
                                <img
                                  onClick={e =>
                                    this.onPowerplayClicked(
                                      Constants.LOTETRY_POWERPLAY_FORCE_MATCH
                                    )
                                  }
                                  className="img-responsive"
                                  src={require("./../../assets/images/747_live/force.png")}
                                />
                              </div>
                              <div className="item_right">
                                <p>
                                  Power Match
                                  <br />
                                  <span>
                                    {" "}
                                    {this.getPowerplayAmount(
                                      Constants.LOTETRY_POWERPLAY_FORCE_MATCH
                                    )}
                                  </span>{" "}
                                  Left
                                </p>
                              </div>
                            </div>
                            <div className="mright_powerplays_item">
                              <div className="item_img_wrapper">
                                <img
                                  onClick={e =>
                                    this.onPowerplayClicked(
                                      Constants.LOTETRY_POWERPLAY_INCREASE
                                    )
                                  }
                                  className="img-responsive"
                                  src={require("./../../assets/images/747_live/increase.png")}
                                />
                              </div>
                              <div className="item_right">
                                <p>
                                  Increase
                                  <br />
                                  <span>
                                    {" "}
                                    {this.getPowerplayAmount(
                                      Constants.LOTETRY_POWERPLAY_INCREASE
                                    )}
                                  </span>{" "}
                                  Left
                                </p>
                              </div>
                            </div>
                            <div className="mright_powerplays_item">
                              <div className="item_img_wrapper">
                                <img
                                  onClick={e =>
                                    this.onPowerplayClicked(
                                      Constants.LOTETRY_POWERPLAY_DECREASE
                                    )
                                  }
                                  className="img-responsive"
                                  src={require("./../../assets/images/747_live/decrease.png")}
                                />
                              </div>
                              <div className="item_right">
                                <p>
                                  Decrease
                                  <br />
                                  <span>
                                    {" "}
                                    {this.getPowerplayAmount(
                                      Constants.LOTETRY_POWERPLAY_DECREASE
                                    )}
                                  </span>{" "}
                                  Left
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
                <div className="page747_main_prize">
                  <div class="page747_prize_image-wraper">
                    <img
                      className="img-responsive"
                      src={require("./../../assets/images/747/747_prize.png")}
                    />
                  </div>

                  <div className="page747_prize_details">
                    <div className="page747_prize_content">
                      <div class="page747_prize_header row">
                        <div className="row">
                          <span>Prizes</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="page747-prize-box-wrapper">
                          <div className="page747-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                        <div className="page747-prize-box-wrapper">
                          <div className="page747-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                        <div className="page747-prize-box-wrapper">
                          <div className="page747-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                        <div className="page747-prize-box-wrapper">
                          <div className="page747-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                      </div>

                      <div className="page747_prize_note">
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

export default withRouter(Page747Draw);
