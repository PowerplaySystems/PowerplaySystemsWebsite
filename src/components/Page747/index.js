import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";

import "./index.css";
import * as Constants from "./../common/constants";
import * as Functions from "./../common/functions";
import Cookies from "universal-cookie";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import './index.scss';
import backgroudImage from '../../assets/images/747/hero-image@2x.png';
import Popup from "../../ui/Popup";

var DEMO_PICKS = [];
var DEMO_DRAW = [];
var DEMO_GAME_DATA = {
  id: 122,
  game_type: 1,
  start_datetime: "2019-12-30 12:59:00",
  prize_id: 44,
  prize: [
    { hits: 7, prize: 1000 },
    { hits: 6, prize: 400 },
    { hits: 5, prize: 200 },
    { hits: 4, prize: 100 },
    { hits: 3, prize: 50 },
    { hits: 2, prize: 25 },
    { hits: 1, prize: 15 }
  ],
  countdown_timer: 30,
  delay: 1,
  game_text: "1",
  rules: "undefined",
  odds_text: "1 in 10,000",
  code: null,
  status: "unplayed",
  deadline: "2019-12-30 12:59:00",
  entry: 109
};

//Popup variables
var popupText = "Error";
var popupHader = "Sorry!";

//game Defaults
let ballsTotal = 47;
let allowedToSelect = 7;
let ballElements = [];

var bg = require("./../../assets/images/747_live/circle.png");
let mCircleStyles = {
  backgroundImage: "url(" + bg + ")",
  backgroundSize: "cover",
  overflow: "hidden"
};

class Page747 extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.state.gameData == "demo") {
      this.state = {
        isDemo: true,
        error: null,
        isLoaded: false,
        content: "",
        gameData: DEMO_GAME_DATA,
        show: false,
        selected: [],
        prizes: [],
        confirm: false
      };
    } else {
      this.state = {
        isDemo: false,
        error: null,
        isLoaded: false,
        content: "",
        gameData: DEMO_GAME_DATA,
        show: false,
        selected: [],
        prizes: [],
        confirm: false
      };
    }

    this.canSelectMore = this.canSelectMore.bind(this);
    this.getJackpot = this.getJackpot.bind(this);
    this.scrollToNumbers = this.scrollToNumbers.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onBallClicked = this.onBallClicked.bind(this);
    this.handleShowPrize = this.handleShowPrize.bind(this);
    this.handleClosePrize = this.handleClosePrize.bind(this);
    this.handleCloseConfirm = this.handleCloseConfirm.bind(this);
    this.handleShowConfirm = this.handleShowConfirm.bind(this);
    this.submitBalls = this.submitBalls.bind(this);
  }
  handleClose() {
    this.setState({
      show: false
    });
  }
  handleShow() {
    this.setState({
      show: true
    });
  }
  handleCloseConfirm() {
    this.setState({
      confirm: false
    });
  }
  handleShowConfirm() {
    this.state.selected.sort(function (a, b) {
      return a - b;
    });
    this.setState({
      confirm: true
    });
  }
  getJackpot(prizeArray) {
    if (prizeArray) {
      return "$" + Functions.numberWithCommas(prizeArray[0].prize);
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
  onBallClicked(mNumber) {
    console.log(mNumber);
    var selectedNumbers = this.state.selected;
    var index = selectedNumbers.indexOf(mNumber);
    if (index > -1) {
      var filtered = selectedNumbers.filter(function (value, index, arr) {
        return value != mNumber;
      });
      this.setState({
        selected: [...filtered]
      });
    } else {
      if (this.canSelectMore()) {
        selectedNumbers.push(mNumber);
        this.setState({
          selected: selectedNumbers
        });
      } else {
        popupHader = "Selection Limit";
        popupText = "Cannot select More than " + allowedToSelect;
        this.handleShow();
      }
    }
  }
  getMyPickedNumbers() {
    if (this.state.isDemo) {
    } else {
      const cookies = new Cookies();
      const jwt = cookies.get("jwt");
      var that = this;
      fetch(
        "https://" +
        Constants.URL +
        "/public_api/lottery_games/getMyNumbers.php?jwt=" +
        jwt +
        "&game_id=" +
        this.state.gameData.id
      )
        .then(res => res.json())
        .then(
          result => {
            result = result.records;
            var selectedNumbers = [];
            result.forEach(element => {
              selectedNumbers.push(element.number);
              this.setState({
                selected: [...selectedNumbers]
              });
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
  }
  componentDidMount() {
    document.getElementsByTagName("META")[2].content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    window.scrollTo(0, 0);
    window.scroll(0, 0);
    this.setBalls();
    this.getMyPickedNumbers();
    var buttons = document.getElementsByClassName("page747_selection_button");
    var that = this;

    document
      .getElementById("submit_selection_ball")
      .addEventListener("click", function (e) {
        if (that.canSubmit()) {
          that.submitUserSelections();
        } else {
          popupHader = "Selection Minimum";
          popupText = "Can not submit less than " + allowedToSelect;
          that.handleShow();
          return;
        }
      });
  }
  canSelectMore() {
    if (this.state.selected.length >= allowedToSelect) {
      return false;
    } else {
      return true;
    }
  }
  canSubmit() {
    if (this.state.selected.length == allowedToSelect) {
      return true;
    } else {
      return false;
    }
  }
  submitUserSelections() {
    this.handleShowConfirm();
  }
  submitBalls() {
    DEMO_PICKS = this.state.selected;
    if (this.state.isDemo) {
      this.props.history.push({
        pathname: "/747-draw",
        state: {
          gameData: "demo",
          picks: this.state.selected
        }
      });
    } else {
      const cookies = new Cookies();
      const jwt = cookies.get("jwt");
      if (jwt == "" || jwt == undefined) {
        popupText = "Please Login First";
        popupHader = "Authentication Failed!";
        this.handleShow();
        return false;
      }
      var data =
        "numbers=" +
        this.state.selected +
        "&jwt=" +
        jwt +
        "&game_id=" +
        this.state.gameData.id +
        "&gametype_id=" +
        Constants.LOTTO_747_ID;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      var that = this;
      console.log(data);
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          if (~this.responseText.indexOf("Successful")) {
            popupHader = "Successful";
            popupText = "Your Selected Numbers Have been saved!";
            that.handleShow();
            that.props.history.push({
              pathname: "/powerplay-lotto"
            });
          } else {
          }
        }
      });
      xhr.open(
        "POST",
        " https://" +
        Constants.URL +
        "/public_api/lottery_games/setMyNumbers.php"
      );
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }
  }
  setBalls() {
    const allElements = [];

    for (let counter = 1; counter <= ballsTotal; counter++) {
      const x = counter;
      allElements.push(
        <div
          className={
            "__game-ball" +
            (this.state.selected.indexOf(counter) == -1 ? "" : " __active")
          }
          onClick={() => this.onBallClicked(x)}
        >
          {counter}
        </div>
      );
    }
    return allElements;
  }
  handleClosePrize() {
    this.setState({
      showPrize: false
    });
  }

  handleShowPrize(game_type) {
    var prizesToShow = this.state.gameData.prize;
    prizesToShow.sort(function (a, b) {
      return parseFloat(b.prize) - parseFloat(a.prize);
    });

    this.setState({
      showPrize: true,
      prizes: prizesToShow
    });
  }
  render() {
    return (
      <div>
        <Header />
        <Popup title={popupHader} closeButton footer={[<button onClick={this.handleClose}>Close</button>]} show={this.state.show} onHide={this.handleClose}>
          {popupText}
        </Popup>

        <Modal show={this.state.showPrize} onHide={this.handleClosePrize}>
          <Modal.Header closeButton>
            <Modal.Title>Prizes</Modal.Title>
            <div className="prize-note">
              *Note: All Prizes Will be divided equally among Winners
            </div>
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
        <Popup
          show={this.state.confirm}
          onHide={this.handleCloseConfirm}
          title='Review my numbers'
          closeButton
          footer={
            [
              <button onClick={this.handleCloseConfirm}>Cancel</button>,
              <button onClick={this.submitBalls}>Submit</button>
            ]
          }
        >
          <div>My Numbers</div>
          <div className='__flex __popup-game-wrapper'>
            {this.state.selected.map((number, key) => {
              return (
                <div className='__game-ball'>
                  {number}
                </div>
              );
            })}
          </div>
        </Popup>
        <div className='__747-page'>
          <div className='__viewport'>
            <div className='__content'>
              <img src={require('../../assets/images/747/hero-image@2x.png')} alt='' className='__viewport-image' />
              <div className="__container">
                <div className='__main-title __flex'>747</div>
                <div className='__subtitle'>You are about to experience the world's</div>
                <div className='__primary __title'>First Live-Play Lottery Game!</div>
                <div>The most exciting lottery game you will ever play! Guaranteed.</div>
              </div>
              <div className='__747-card __flex'>
                <div>Pick and submit <span className='__primary'>7 numbers</span> below and you will be taken to the live-play game. Use your live-play Powers to <span className='__primary'>adjust your picks</span> during the live draw!</div>
                <div className='__border'></div>
                <img src={require('../../assets/images/747/group-2@2x.png')} className='__balls' alt='' />
              </div>
            </div>
          </div>
          <div className='__main __container'>
            <div className='__flex __poweplays __flex-start'>
              <img
                className='__powerplays-left-image'
                src={require("./../../assets/images/747/747_powerplays.png")}
              />
              <div className='__f1'>
                <div className='__title'>Powerplays</div>
                <div className='__wrap __powerplays-content-wrapper __flex __sb'>

                  <div className='__powerplays-content __flex __sb'>
                    <div className='__powerplays-card __column'>
                      <img
                        src={require("./../../assets/images/747/747_2.png")}
                        className='__powerplays-card-image'
                      />
                      <div className='__powerplays-card-footer'>Increase/Decrease</div>
                    </div>
                    <div className='__powerplyas-content-details'>You can increase or decrease your pick live during the draw</div>
                  </div>

                  <div className='__powerplays-content __flex __sb'>
                    <div className='__powerplays-card __column'>
                      <img
                        src={require("./../../assets/images/747/747_3.png")}
                        className='__powerplays-card-image'
                      />
                      <div className='__powerplays-card-footer'>Power Match</div>
                    </div>
                    <div className='__powerplyas-content-details'>Use force match to change your pick to match the drawn #</div>
                  </div>

                  <div className='__powerplays-content __flex __sb'>
                    <div className='__powerplays-card __column'>
                      <img
                        src={require("./../../assets/images/747/shuffle.png")}
                        className='__powerplays-card-image'
                      />
                      <div className='__powerplays-card-footer'>Increase/Decrease</div>
                    </div>
                    <div className='__powerplyas-content-details'>Use change to replace one # with a random new Number</div>
                  </div>

                  <div className='__powerplays-content __flex __sb'>
                    <div className='__powerplays-card __column'>
                      <img
                        src={require("./../../assets/images/747/747_1.png")}
                        className='__powerplays-card-image'
                      />
                      <div className='__powerplays-card-footer'>Refresh All</div>
                    </div>
                    <div className='__powerplyas-content-details'>Use refresh all to refresh all your numbers with a random new set.</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="__container __game-wrapper" id="pick-numbers">
            <div className='__title'>Pick Your Numbers !</div>
            <div className="page747_number_rules">CONTEST RULES</div>
            <div className='__game'>{this.setBalls()}</div>
            <div className='__helper-text'>{this.state.selected.length + " of " + allowedToSelect + " Numbers chosen"}</div>
            <button id="submit_selection_ball" className="__submit-btn" disabled={this.canSelectMore()}>SUBMIT!</button>
          </div>
        </div>
        {/* Not worked on this, Ubaid */}
        <div className="container-fluid _faq_wrap">
          <div className="container-fluid">
            <div className="page747_rows">

              <div className="pick_numbers_mobile_box">
                <p className="mobile_box_text_1">Jackpot</p>
                {!this.state.isDemo ? (
                  <p
                    className="mobile_box_text_2"
                    style={{ marginBottom: "20px !important" }}
                  >
                    Can be fixed or progressive
                  </p>
                ) : (
                    <>
                      <p className="mobile_box_text_2b">
                        {this.getJackpot(this.state.gameData.prize)}
                      </p>
                      <p className="mobile_box_text_3">
                        Odds of Winning:{" "}
                        <span>{this.state.gameData.odds_text}</span>
                      </p>
                      <p className="mobile_box_text_4">Next Draw Date</p>
                      <p className="mobile_box_text_5">
                        Sunday Apr 12 2019, 12:15 PM EST
                    </p>{" "}
                      <p className="mobile_box_text_6">Entry Deadline</p>
                      <p className="mobile_box_text_7">11:15 PM EST</p>
                    </>
                  )}
              </div>

              {/* Not worked on this, Ubaid */}
              <div className="col-md-12">
                {this.state.isDemo ? (
                  ""
                ) : (
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
                                  {Functions.getDays(
                                    this.state.gameData.start_datetime
                                  )}
                                </p>
                              Days
                            </div>
                              <div>
                                <p>
                                  {" "}
                                  {Functions.getHours(
                                    this.state.gameData.start_datetime
                                  )}
                                </p>
                              hours
                            </div>
                              <div>
                                <p>
                                  {" "}
                                  {Functions.getMinuts(
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
                  )}
              </div>
              {/* Not worked on this too */}
              {this.state.isDemo ? (
                ""
              ) : (
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
                              <span>Top Prizes</span>{" "}
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
                                  {"$" + this.state.gameData.prize[3].prize}
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
                )}
              <div className="col-md-12">
                <div className="col-md-12">
                  {this.state.isDemo ? (
                    ""
                  ) : (
                      <div className="page747_number_rules">CONTEST RULES</div>
                    )}

                  {this.state.isDemo ? (
                    ""
                  ) : (
                      <div class="page747_number_box">
                        <div>
                          <p>Till Next Draw</p>
                          <div className="row page747_next_draw_box">
                            <div>
                              <p>
                                {" "}
                                {Functions.getDays(
                                  this.state.gameData.start_datetime
                                )}
                              </p>
                            Days
                          </div>
                            <div>
                              <p>
                                {" "}
                                {Functions.getHours(
                                  this.state.gameData.start_datetime
                                )}
                              </p>
                            hours
                          </div>
                            <div>
                              <p>
                                {" "}
                                {Functions.getMinuts(
                                  this.state.gameData.start_datetime
                                )}
                              </p>
                            Mins
                          </div>
                          </div>
                        </div>
                      </div>
                    )}
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

export default withRouter(Page747);
