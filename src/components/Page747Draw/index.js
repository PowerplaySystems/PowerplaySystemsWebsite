import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";
import * as Constants from "./../common/constants";
import * as Functions from "./../common/functions";
import Cookies from "universal-cookie";
import * as DrawComponents from "./DrawComponents";
import InPlay from "./InPlay";

//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
//Popup variables
var popupText = "Error";
var popupHader = "Sorry!";

var bg = require("./../../assets/images/747_live/circle.png");
var isClockTicking = false;
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
var mTotalMatchedLast = 0;
var isInDelay = true;

var ballSelected = null;

var countdown = null;
var ticker = null;
var mTotalMatched = 0;
var selectedNumbers = [];
var ticker = null;
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
      drawRaw: [],
      result: [],
      clickedBall: null,
      secondsRemaining: 60,
      mtimer: 0,
      drawNumbersRow: [],
      showInfo: false,
      secondsTime: 0,
      prizes: [],
      nextGame: [],
      secondsTimer: 59,
      ticker: null,
      updatedAt: null,
      requestedDraw: false
    };
    mTotalMatchedLast = 0;

    this.getJackpot = this.getJackpot.bind(this);
    this.isAMatch = this.isAMatch.bind(this);
    this.onPowerplayClicked = this.onPowerplayClicked.bind(this);
    this.getPowerplayAmount = this.getPowerplayAmount.bind(this);
    this.handleShowPrize = this.handleShowPrize.bind(this);
    this.onPickNumbersClicked = this.onPickNumbersClicked.bind(this);
    this.handleClosePrize = this.handleClosePrize.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.shouldShowTickTok = this.shouldShowTickTok.bind(this);
    this.hasWonPrize = this.hasWonPrize.bind(this);
    this.getDraws = this.getDraws.bind(this);
    this.getData = this.getData.bind(this);
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

  startTimer() {
    var that = this;
    if (this.state.ticker == null) {
      if (that.state.gameData) {
        this.state.ticker = setInterval(function() {
          that.setState({
            secondsTimer: Functions.getSeconds(
              that.state.gameData.start_datetime
            )
          });
        });
      }
    }
  }
  stopTimer() {
    if (this.state.ticker) {
      clearInterval(ticker);
      ticker = null;
    }
  }
  shouldShowTickTok() {
    var dt = new Date(this.state.gameData.start_datetime);
    var countDownDate = new Date(dt).getTime();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York"
    });
    usaTime = new Date(usaTime);
    var now = usaTime.getTime();
    var distance = countDownDate - now;
    return distance > 59000 ? false : true;
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
    if (document.getElementById("total-matched")) {
      document.getElementById("total-matched").innerHTML = mTotalMatched;
    }

    if (mTotalMatchedLast < mTotalMatched) {
      mTotalMatchedLast = mTotalMatched;
      this.showInfo();
    }
  }
  showInfo() {
    this.setState({
      showInfo: true
    });
    var that = this;
    var set = setTimeout(function() {
      that.setState({
        showInfo: false
      });
    }, 3000);
  }

  countdownTimer(lastDrawTime, timer, delay) {
    var that = this;
    if (countdown) {
      clearInterval(countdown);
      countdown = null;
    }
    if (lastDrawTime == "check") {
      var tempTimeDiff = Functions.getTimeDifferenceEST(
        this.state.gameData.start_datetime
      );
      if (tempTimeDiff > 1000) {
        var myVar = setTimeout(function() {
          that.getData();
        }, tempTimeDiff - 1000);
      } else {
        var myVar = setTimeout(function() {
          that.getData();
        }, 1000);
      }
    } else if (lastDrawTime == null) {
      var myVar = setTimeout(function() {
        that.getData();
      }, 500);
    } else {
      isInDelay = false;
      // var dt = new Date(lastDrawTime);
      // dt.setSeconds(dt.getSeconds() + timer);
      // var countDownDate = new Date(dt).getTime();
      // var countdown = setInterval(function() {
      //   var usaTime = new Date().toLocaleString("en-US", {
      //     timeZone: "America/New_York"
      //   });
      //   usaTime = new Date(usaTime);
      //   var now = usaTime.getTime();
      //   var distance = countDownDate - now;
      //   // If the count down is finished, write some text
      //   if (distance < 0) {
      //     clearInterval(countdown);
      //     isInDelay = true;
      //     if (
      //       that.state.gameData.status == "live" ||
      //       that.state.gameData.status == "In Progress"
      //     ) {
      //       that.getData();
      //     }
      //   }
      // }, 10);
    }
  }
  getJackpot(prizeArray) {
    if (prizeArray) {
      return "$" + Functions.numberWithCommas(prizeArray[0].prize);
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
        while (true) {
          newNumber = Math.floor(Math.random() * 47);
          let obj = this.state.picks.find(obj => obj.number == newNumber);
          if (!obj) {
            break;
          }
        }

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
    if (powerplay == Constants.LOTETRY_POWERPLAY_REFRESH) {
      ballSelected = null;
    } else {
      ballSelected = newNumber;
    }

    this.updatePowerplaysInDatabase(powerplay);
  }
  getDraws() {
    console.log("Requesting Draw!");

    this.state.requestedDraw = true;
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    var that = this;
    fetch(
      "https://" +
        Constants.URL +
        "/public_api/live_draw/draws.php?jwt=" +
        jwt +
        "&game_id=" +
        that.state.gameData.id
    )
      .then(res => res.json())
      .then(result => {
        let myDraws = [...result.draw];
        let myDrawnRow = [...result.draw];
        //if there isn't new draw return without doing anything!
        if (this.state.draw.length == myDraws.length) {
          return;
        } else {
          if (myDraws.length > 0) {
            myDraws.sort(
              (a, b) =>
                parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
            );
          }
          //for the top row in live draw page
          if (myDrawnRow.length > 0) {
            if (
              this.state.gameData.status == "live" ||
              this.state.gameData.status == "In Progress"
            ) {
              myDrawnRow.pop();
            }

            myDrawnRow.sort(
              (a, b) =>
                parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
            );
          }
          this.setState({
            updatedAt: Functions.getCurrentTimeEST(),
            drawRaw: result.draw,
            draw: myDraws,
            drawNumbersRow: myDrawnRow,
            requestedDraw: false
          });
        }
      });
  }
  getData() {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    var that = this;
    fetch(
      "https://" +
        Constants.URL +
        "/public_api/live_draw/data.php?jwt=" +
        jwt +
        "&game_id=" +
        this.state.gameData.id
    )
      .then(res => res.json())
      .then(
        result => {
          let myDraws = [...result.draw];
          let myDrawnRow = [...result.draw];
          let myPicks = result.picks;
          if (result.game.status === "finished") {
            this.getLotteryGames();
          }
          if (myDraws.length > 0) {
            myDraws.sort(
              (a, b) =>
                parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
            );
          }
          if (myDrawnRow.length > 0) {
            if (
              result.game.status == "live" ||
              result.game.status == "In Progress"
            ) {
              myDrawnRow.pop();
            }

            myDrawnRow.sort(
              (a, b) =>
                parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
            );
          }
          if (myPicks.length > 0) {
            myPicks.sort((a, b) => parseFloat(a.number) - parseFloat(b.number));
          }
          if (this.state.draw.length == myDraws.length) {
            console.log("No New Draw");
            if (this.state.gameData.status == result.game.status) {
              console.log("No New Draw, no new status");
              this.setState({
                isLoaded: true,
                picks: myPicks,
                powerplays: result.powerplays,
                result: result.result
              });
            } else {
              console.log("No New Draw, new Status");
              this.setState({
                isLoaded: true,
                picks: myPicks,
                gameData: result.game,
                powerplays: result.powerplays,
                result: result.result
              });
            }
          } else {
            if (this.state.gameData.status == result.game.status) {
              console.log("New Draw, no new Status");
              this.setState({
                isLoaded: true,
                drawRaw: result.draw,
                draw: myDraws,
                drawNumbersRow: myDrawnRow,
                picks: myPicks,
                powerplays: result.powerplays,
                result: result.result,
                updatedAt: Functions.getCurrentTimeEST(),
                requestedDraw: false
              });
            } else {
              console.log("New Draw,new Status");
              this.setState({
                isLoaded: true,
                drawRaw: result.draw,
                draw: myDraws,
                drawNumbersRow: myDrawnRow,
                picks: myPicks,
                gameData: result.game,
                powerplays: result.powerplays,
                result: result.result
              });
            }
          }

          that.setTotalMatched();
          //if started the draw and atlest one number drawn

          if (result.draw.length > 0) {
            that.countdownTimer(
              result.draw[result.draw.length - 1].date_time,
              this.state.gameData.countdown_timer,
              this.state.gameData.delay
            );
          } else if (
            //if started the draw and and no number drawn
            result.game.status == "live" ||
            result.game.status == "In Progress"
          ) {
            that.countdownTimer(null, null, result.game.delay);
          } else {
            //if draw not started
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
      " https://" +
        Constants.URL +
        "/public_api/live_draw/powerplay_use.php"
    );
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }

  componentDidMount() {
    document.getElementById("scroller").scrollIntoView(true);
    this.props.location.state.gameData.status == "unplayed"
      ? this.startTimer()
      : this.stopTimer();
    this.getData();
  }
  getLotteryGames() {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    var link =
      "https://" + Constants.URL + "/public_api/lottery_games/data.php";
    if (jwt) {
      link = link + "?jwt=" + jwt;
    }
    fetch(link)
      .then(res => res.json())
      .then(
        xx => {
          this.setState({
            nextGame: xx.records[0]
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }
  onPickNumbersClicked(path, game) {
    if (game.id == null) {
      alert("No Game Available!");
      return;
    }
    let action = "pick";
    action = this.state.nextGame.entry ? "game_center" : "pick";
    this.props.history.push({
      pathname: path,
      state: {
        gameData: game
      }
    });
  }
  handleClosePrize() {
    this.setState({
      showPrize: false
    });
  }

  handleShowPrize(game_type) {
    var prizesToShow = this.state.gameData.prize;
    prizesToShow.sort(function(a, b) {
      return parseFloat(b.prize) - parseFloat(a.prize);
    });

    this.setState({
      showPrize: true,
      prizes: prizesToShow
    });
  }

  hasWonPrize(matches) {
    let obj = this.state.prizes.find(obj => obj.hits == matches);
    if (obj) {
      if (obj.prize > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid _faq_wrap">
          <div className="container">
            <div className="row page747_live_rows">
              <div>
                <img
                  className="img-responsive header-live-draw"
                  src={require("./../../assets/images/747/747_header.png")}
                />
              </div>
              <div>
                <div className="live_draw_div_jackpot">
                  <p className="live_draw_div_jackpot_header" id="scroller">
                    Jackpot
                  </p>
                  <p className="live_draw_div_jackpot_amount">
                    {this.getJackpot(this.state.gameData.prize)}
                  </p>
                  <p className="live_draw_div_jackpot_odds">
                    {"Odds of Winning: " + this.state.gameData.odds_text}
                  </p>
                </div>
              </div>
              <center>
                <div className="live_draw_content">
                  <div className="live_draw_content_left">
                    <div className="live_draw_winning_box_content">
                      <p>Winning Numbers</p>
                      <div className="row winning_box_numbers">
                        <div
                          className="winning_box_circle"
                          style={mCircleStyles}
                        >
                          {typeof this.state.drawNumbersRow[0] === "undefined"
                            ? "?"
                            : this.state.drawNumbersRow[0].daw_ball_number}
                        </div>
                        <div
                          className="winning_box_circle"
                          style={mCircleStyles}
                        >
                          {typeof this.state.drawNumbersRow[1] === "undefined"
                            ? "?"
                            : this.state.drawNumbersRow[1].daw_ball_number}
                        </div>
                        <div
                          className="winning_box_circle"
                          style={mCircleStyles}
                        >
                          {typeof this.state.drawNumbersRow[2] === "undefined"
                            ? "?"
                            : this.state.drawNumbersRow[2].daw_ball_number}
                        </div>
                        <div
                          className="winning_box_circle"
                          style={mCircleStyles}
                        >
                          {typeof this.state.draw[3] === "undefined"
                            ? "?"
                            : this.state.draw[3].daw_ball_number}
                        </div>
                        <div
                          className="winning_box_circle"
                          style={mCircleStyles}
                        >
                          {typeof this.state.drawNumbersRow[4] === "undefined"
                            ? "?"
                            : this.state.drawNumbersRow[4].daw_ball_number}
                        </div>
                        <div
                          className="winning_box_circle"
                          style={mCircleStyles}
                        >
                          {typeof this.state.drawNumbersRow[5] === "undefined"
                            ? "?"
                            : this.state.drawNumbersRow[5].daw_ball_number}
                        </div>
                        <div
                          className="winning_box_circle"
                          style={mCircleStyles}
                        >
                          {typeof this.state.drawNumbersRow[6] === "undefined"
                            ? "?"
                            : this.state.drawNumbersRow[6].daw_ball_number}
                        </div>
                      </div>
                    </div>
                    <InPlay
                      drawRaw={this.state.drawRaw}
                      gameData={this.state.gameData}
                      getNumbersDraw={this.getDraws}
                      getData={this.getData}
                      updatedAt={this.state.updatedAt}
                    />
                    <div className="live_draw_my_numbers">
                      <p>My Numbers</p>

                      <div className="live_draw_my_numbers_edit">
                        <p className="mleft_top_text">Cick a number to edit</p>
                        <div className="row edit_numbers">
                          {this.state.picks.map((element, key) => {
                            if (this.isAMatch(element)) {
                              return (
                                <div
                                  className={
                                    element.number == ballSelected
                                      ? " edit_numbers_circle_active pick_button_active"
                                      : ballSelected == null
                                      ? "edit_numbers_circle_active"
                                      : "edit_numbers_circle_active circle_disabled"
                                  }
                                >
                                  <img
                                    className="img-responsive img-checked"
                                    src={require("./../../assets/images/747_live/checked.png")}
                                  />
                                  <div
                                    className="inner-div-select"
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
                                </div>
                              );
                            } else {
                              return (
                                <>
                                  <div
                                    className={
                                      element.number == ballSelected
                                        ? "edit_numbers_circle pick_button_active"
                                        : ballSelected == null
                                        ? "edit_numbers_circle"
                                        : "edit_numbers_circle circle_disabled"
                                    }
                                    style={mCircleStyles}
                                    onClick={e =>
                                      this.onBallClicked(element.number)
                                    }
                                  >
                                    {element.number}
                                  </div>
                                  {element.number == ballSelected ? (
                                    <div
                                      className={
                                        "powerplay_box " + "box_" + key
                                      }
                                    >
                                      <img
                                        onClick={e =>
                                          this.onPowerplayClicked(
                                            Constants.LOTETRY_POWERPLAY_CHANGE
                                          )
                                        }
                                        className="img-responsive"
                                        src={require("./../../assets/images/747_live/shuffle.png")}
                                      />
                                      <img
                                        onClick={e =>
                                          this.onPowerplayClicked(
                                            Constants.LOTETRY_POWERPLAY_FORCE_MATCH
                                          )
                                        }
                                        className="img-responsive"
                                        src={require("./../../assets/images/747_live/force.png")}
                                      />
                                      <img
                                        onClick={e =>
                                          this.onPowerplayClicked(
                                            Constants.LOTETRY_POWERPLAY_INCREASE
                                          )
                                        }
                                        className="img-responsive"
                                        src={require("./../../assets/images/747_live/increase.png")}
                                      />
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
                                  ) : (
                                    ""
                                  )}
                                </>
                              );
                            }
                          })}
                        </div>
                        <div
                          className={
                            "live_draw_match_info " +
                            (this.state.showInfo ? "show" : "hide")
                          }
                        >
                          Congrats ! It’s a match !
                        </div>
                      </div>
                    </div>
                    <div className="live_draw_my_prize_wrapper">
                      {this.state.gameData.status == "unplayed" ? (
                        !this.shouldShowTickTok() ? (
                          <>
                            <div className="live_draw_my_prize">
                              <DrawComponents.CountdownTimer
                                gameData={this.state.gameData}
                              />
                              <p className="live_draw_loser_note5">
                                Draw Date: &nbsp;
                                {Functions.getStringDate(
                                  this.state.gameData.start_datetime
                                )}
                                {" at "}
                                {Functions.getStringTime(
                                  this.state.gameData.start_datetime
                                )}{" "}
                                EST
                              </p>
                            </div>
                          </>
                        ) : (
                          //if game is live and last minute
                          <>
                            {" "}
                            <div className="live_draw_my_prize">
                              <p className="live_draw_my_numbers_matched">
                                Numbers Matched:{" "}
                                <span id="total-matched">{mTotalMatched}</span>
                                /7
                              </p>
                              <p className="live_draw_my_numbers_notes">
                                Click a number and use your powerplays to edit!
                              </p>
                            </div>
                          </>
                        )
                      ) : this.state.result.prize_won ? (
                        !this.hasWonPrize(mTotalMatched) ? (
                          <div className="live_draw_my_prize">
                            <div className="live_draw_result">
                              <div className="live_draw_result_top">
                                <p className="live_draw_prize_matches">
                                  Matched{" "}
                                  <span id="total-matched">
                                    {mTotalMatched}
                                  </span>{" "}
                                  of 7 numbers
                                </p>
                                <p className="live_draw_loser_note">
                                  Sorry You didn't win this time!
                                </p>
                                <p className="live_draw_loser_note4">
                                  Next Draw Date
                                </p>
                                <p className="live_draw_loser_note5">
                                  {Functions.getStringDate(
                                    this.state.nextGame.start_datetime
                                  )}
                                  {Functions.getStringTime(
                                    this.state.nextGame.start_datetime
                                  )}{" "}
                                  EST
                                </p>
                              </div>
                              <button
                                className="live_draw_loser_button"
                                onClick={e =>
                                  this.onPickNumbersClicked(
                                    "/747",
                                    this.state.nextGame
                                  )
                                }
                              >
                                Pick Numbers for Next Draw
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="live_draw_my_prize winner">
                            <div className="live_draw_winner_left">
                              <img
                                className="img-responsive"
                                src={require("./../../assets/images/747_live/trophy.png")}
                              />
                            </div>
                            <div className="live_draw_winner_right">
                              <p className="live_draw_prize_matches">
                                Matched{" "}
                                <span id="total-matched">{mTotalMatched}</span>{" "}
                                of 7 numbers
                              </p>
                              <p className="live_draw_winner_note">
                                Congratulations! You are a winner
                              </p>
                              <p className="live_draw_winner_note2">
                                Individual prizes will be calculated & added to
                                your <span>account balance</span> within 24
                                hours
                              </p>
                              <p className="live_draw_winner_note3">
                                * All prizes are divided equally among winners
                              </p>
                              <p className="live_draw_winner_note4">
                                Next Draw Date
                              </p>
                              <p className="live_draw_winner_note5">
                                {Functions.getStringDate(
                                  this.state.nextGame.start_datetime
                                )}
                                {Functions.getStringTime(
                                  this.state.nextGame.start_datetime
                                )}{" "}
                                EST
                              </p>
                            </div>

                            <button
                              onClick={e =>
                                this.onPickNumbersClicked(
                                  "/747",
                                  this.state.nextGame
                                )
                              }
                            >
                              Pick Numbers for Next Draw
                            </button>
                          </div>
                        )
                      ) : (
                        <>
                          {" "}
                          <div className="live_draw_my_prize">
                            <p className="live_draw_my_numbers_matched">
                              Numbers Matched:{" "}
                              <span id="total-matched">{mTotalMatched}</span>/7
                            </p>
                            <p className="live_draw_my_numbers_notes">
                              Click a number and use your powerplays to edit!
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="live_draw_content_right">
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
                            <p>Refresh All&nbsp;</p>
                          </div>
                          <div className="lotto_live_powerplay_amount">
                            {this.getPowerplayAmount(
                              Constants.LOTETRY_POWERPLAY_REFRESH
                            )}
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
                            <p>Change</p>
                          </div>
                          <div className="lotto_live_powerplay_amount">
                            {this.getPowerplayAmount(
                              Constants.LOTETRY_POWERPLAY_CHANGE
                            )}
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
                            <p>Power Match</p>
                          </div>
                          <div className="lotto_live_powerplay_amount">
                            {this.getPowerplayAmount(
                              Constants.LOTETRY_POWERPLAY_FORCE_MATCH
                            )}
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
                            <p>Increase</p>
                          </div>
                          <div className="lotto_live_powerplay_amount">
                            {this.getPowerplayAmount(
                              Constants.LOTETRY_POWERPLAY_INCREASE
                            )}
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
                            <p>Decrease</p>
                          </div>
                          <div className="lotto_live_powerplay_amount">
                            {this.getPowerplayAmount(
                              Constants.LOTETRY_POWERPLAY_DECREASE
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </center>

              <div>
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
                          <span>Top Prizes</span>
                          <div className="button_show_prize_wrapper">
                            <button
                              className="button_show_prize"
                              onClick={e => this.handleShowPrize("747")}
                            >
                              View All Prizes
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="page747-prize-box-wrapper">
                          <div className="page747-prize-box">
                            {this.state.gameData.prize[0].hits + "/7"} <br />
                            <span>
                              {"$" +
                                Functions.numberWithCommas(
                                  this.state.gameData.prize[0].prize
                                )}
                            </span>
                          </div>
                        </div>
                        <div className="page747-prize-box-wrapper">
                          <div className="page747-prize-box">
                            {this.state.gameData.prize[1].hits + "/7"}
                            <br />
                            <span>
                              {"$" +
                                Functions.numberWithCommas(
                                  this.state.gameData.prize[1].prize
                                )}
                            </span>
                          </div>
                        </div>
                        <div className="page747-prize-box-wrapper">
                          <div className="page747-prize-box">
                            {this.state.gameData.prize[2].hits + "/7"}
                            <br />
                            <span>
                              {"$" +
                                Functions.numberWithCommas(
                                  this.state.gameData.prize[2].prize
                                )}
                            </span>
                          </div>
                        </div>
                        <div className="page747-prize-box-wrapper">
                          <div className="page747-prize-box">
                            {this.state.gameData.prize[3].hits + "/7"}
                            <br />
                            <span>
                              {"$" +
                                Functions.numberWithCommas(
                                  this.state.gameData.prize[3].prize
                                )}
                            </span>
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
        <Modal show={this.state.showPrize} onHide={this.handleClosePrize}>
          <Modal.Header closeButton>
            <Modal.Title>Prizes</Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-body">
            {
              <table className="modal-prize-table">
                <thead>
                  <tr>
                    <th scope="col"> Matches </th>
                    <th scope="col"> Prize </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.prizes.map((prize, key) => {
                    return (
                      <tr className="prize-row" key={key}>
                        <td>
                          <p> {prize.hits} </p>
                        </td>
                        <td>
                          <p>{"$" + Functions.numberWithCommas(prize.prize)}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            }
          </Modal.Body>
        </Modal>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Page747Draw);
