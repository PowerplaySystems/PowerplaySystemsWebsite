import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import DrawTimer from "./../common/DrawTimer";
import "./index.css";
import * as Constants from "./../common/constants";
import * as Functions from "./../common/functions";
import Cookies from "universal-cookie";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

var DEMO_PICKS = [];
var DEMO_DRAW = [];
var DEMO_GAME_DATA = {
  id: 122,
  game_type: 1,
  start_datetime: "2020-12-30 12:59:00",
  prize_id: 44,
  prize: [
    { hits: 8, prize: 5000 },
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
  deadline: "2020-12-30 12:59:00",
  entry: 109
};

//Popup variables
var popupText = "Error";
var popupHader = "Sorry!";

//game Defaults
let ballsTotal = 50;
let allowedToSelect = 8;
let ballElements = [];

var bg = require("./../../assets/images/747_live/circle.png");
let mCircleStyles = {
  backgroundImage: "url(" + bg + ")",
  backgroundSize: "cover",
  overflow: "hidden"
};

class Elite8 extends Component {
  constructor(props) {
    super(props);
    // // if (this.props.location.state.gameData == "demo") {
    // this.state = {
    //   isDemo: true,
    //   error: null,
    //   isLoaded: false,
    //   content: "",
    //   gameData: DEMO_GAME_DATA,
    //   show: false,
    //   selected: [],
    //   prizes: [],
    //   confirm: false
    // };
    // } else {
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
    // }

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
    this.getContestData = this.getContestData.bind(this);
  }
  getContestData() {
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
          if (xx.records) {
            this.setState({
              gameData: xx.records[2],
              isLoaded: true
            });
            this.getMyPickedNumbers();
          } else {
            this.setState({
              gameData: [],
              isLoaded: false
            });
          }
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
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
    if (this.state.gameData.prize) {
      this.state.selected.sort(function(a, b) {
        return a - b;
      });
      this.setState({
        confirm: true
      });
    } else {
      popupText = "There is no game Available At the moment!";
      popupHader = "Sorry!";
      this.setState({
        show: true
      });
    }
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
      var filtered = selectedNumbers.filter(function(value, index, arr) {
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
    this.getContestData();

    //if comming back from signup/login
    if (this.props.location.state) {
      if (this.props.location.state.selected) {
        this.props.location.state.selected.sort(function(a, b) {
          return a - b;
        });
      }
      this.setState({
        selected: this.props.location.state.selected,
        confirm: true
      });
    }
    document.getElementsByTagName("META")[2].content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    window.scrollTo(0, 0);
    window.scroll(0, 0);
    this.setBalls();

    var buttons = document.getElementsByClassName("page747_selection_button");
    var that = this;
    if (document.getElementById("submit_selection_ball")) {
      document
        .getElementById("submit_selection_ball")
        .addEventListener("click", function(e) {
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
    const cookies = new Cookies();
    DEMO_PICKS = this.state.selected;
    if (this.state.isDemo) {
      this.props.history.push({
        pathname: "/elite8-draw",
        state: {
          gameData: "demo",
          picks: this.state.selected
        }
      });
    } else {
      const jwt = cookies.get("jwt");
      if (jwt == "" || jwt == undefined) {
        popupText = "Please Login First";
        popupHader = "Authentication Failed!";
        this.handleShow();
        this.props.history.push({
          pathname: "/register",
          state: {
            backlink: "elite8",
            selected: this.state.selected
          }
        });
        return false;
      }
      var data =
        "numbers=" +
        this.state.selected +
        "&jwt=" +
        cookies.get("jwt") +
        "&game_id=" +
        this.state.gameData.id +
        "&gametype_id=" +
        Constants.ELITE8_ID +
        "&contest_id=" +
        this.state.gameData.contest_id;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      var that = this;
      console.log(data);
      xhr.addEventListener("readystatechange", function() {
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
    var allElements = [];

    for (let counter = 1; counter <= ballsTotal; counter++) {
      const x = counter;
      allElements.push(
        <div
          className={
            "page747_selection_button" +
            (this.state.selected.indexOf(counter) == -1 ? "" : " btn-active")
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
    prizesToShow.sort(function(a, b) {
      return parseFloat(b.prize) - parseFloat(a.prize);
    });

    this.setState({
      showPrize: true,
      prizes: prizesToShow
    });
  }
  componentPickNumbersButton() {
    return (
      <button
        onClick={e => this.scrollToNumbers()}
        className="pick-your-number-btn"
      >
        <div className="pick-your-number-txt">Pick Your Numbers</div>
      </button>
    );
  }
  componentelite8Top() {
    return (
      <div className="elite-8-content">
        <div className="header-wrapper">
          <div className="header-wrapper-heading">Elite 8</div>
          <div className="header-wrapper-text1">
            win <span className="orange-text"> $2000 </span>
            <span className="header-wrapper-CAD">CAD</span>
          </div>
          <div className="header-wrapper-text2a">
            Starts on Feb 23rd, 2020 @ 9:00PM EST
          </div>
          {this.componentPickNumbersButton()}
          <div className="header-wrapper-text2b">
            Contest runs weekly from Feb 23rd to April 26th 2020
          </div>
          <div className="header-wrapper-text3">*No Purchase Necessary</div>
          <div className="header-wrapper-text4">SEE CONTEST RULES</div>
        </div>
        <div className="fun-play-wrapper">
          <div className="fun-play-iphone">
            <img
              className="fun-play-iphone-img1"
              src={require("../../assets/images/elite8-promo/phone-11-pro-back.png")}
            />
          </div>
          <div className="fun-play-left">
            <div className="fun-play-left-heading1">A Fun New Way to Play!</div>
            <div className="fun-play-left-text1">
              Have you ever played a state-run lottery like super 7, 4/49, or
              Powerball? <br />
              At Powerplay Systems, we think the current state-run format is
              kind of boring (except for the winner!) so, we invented a fun new
              way to play! We would like to find out if you feel the same way.
            </div>
            <div className="fun-play-left-text2">
              Try out our mobile friendly interactive lotto game in this
              promotional contest for a chance to win great prizes.
            </div>
            {this.componentPickNumbersButton()}
          </div>
          <div className="fun-play-right">
            <img
              className="fun-play-right-img"
              src={require("../../assets/images/elite8-promo/macbook-air.png")}
            />
          </div>
        </div>
        <div className="edit-sections-wrapper">
          <div className="edit-section-left">
            <div className="edit-section-left-heading">
              Edit your selections during the live draw!
            </div>
            <div className="edit-section-left-text">
              To make it more fun, you can make use of
              <span className="orane-italics-text">Powerplays</span> during the
              live draw to edit your selections and improve your chances of
              winning. The powerplays we have available are Increase, Decrease,
              Power Match, Replace, and Replace all. You can increase or
              decrease your selections, force match a selection, replace a
              single selection with a random new #, or replace all your
              selections with a random new set. All this during the live draw!!
            </div>
          </div>
          <div className="edit-section-right">
            <div className="edit-section-right-item">
              <div className="edit-solo-wrapper">
                <div className="edit-solo-wrapper-heading">
                  Increase/ Decrease
                </div>
                <img
                  className="edit-solo-wrapper-img"
                  src={require("../../assets/images/elite8-promo/group-19.png")}
                />
              </div>
              <div className="edit-solo-wrapper-text">
                You can increase or decrease your pick live during the draw.
              </div>
            </div>
            <div className="edit-section-right-item">
              {" "}
              <div className="edit-solo-wrapper">
                <div className="edit-solo-wrapper-heading">Power Match</div>
                <img
                  className="edit-solo-wrapper-img"
                  src={require("../../assets/images/elite8-promo/7.png")}
                />
              </div>
              <div className="edit-solo-wrapper-text">
                Use Power Match to to match the in-play number.
              </div>
            </div>
            <div className="edit-section-right-item">
              <div className="edit-solo-wrapper">
                <div className="edit-solo-wrapper-heading">Replace</div>
                <div className="edit-solo-wrapper-img-replace" />
              </div>
              <div className="edit-solo-wrapper-text">
                Use Replace to replace one number with a random new Number.
              </div>
            </div>
            <div className="edit-section-right-item">
              {" "}
              <div className="edit-solo-wrapper">
                <div className="edit-solo-wrapper-heading">Replace All</div>
                <img
                  className="edit-solo-wrapper-img"
                  src="..//assets/img/elite8/group-11.png"
                  src={require("../../assets/images/747_live/refresh.png")}
                />
              </div>
              <div className="edit-solo-wrapper-text">
                Use Replace All to refresh all your numbers with a random new
                set.
              </div>
            </div>
          </div>
        </div>
        <div className="match-8-wrapper">
          <div className="match-8-wrapper-left">
            <div className="match-8-wrapper-left-heading">
              Match 8 of 8 numbers &amp; Win $2,000 CAD
            </div>
            <div className="match-8-wrapper-left-text">
              Smaller prizes available – 7/8 $500 / 6/8 - $100
            </div>
            <div className="match-8-btn">
              {this.componentPickNumbersButton()}
            </div>
          </div>
          <div className="match-8-wrapper-right">
            <img
              src={require("../../assets/images/elite8-promo/lottery-orig-copy.png")}
              className="match-8-img"
            />
          </div>
          <div className="match-8-media">
            <div className="match-8-media-text1">Smaller prizes available</div>
            <div className="match-8-media-text-wrapper">
              <div className="match-8-media-text2">7/8</div>
              <div className="match-8-media-bg">
                <div className="match-8-media-text3">$500</div>
              </div>
            </div>
            <br />
            <div className="match-8-media-text-wrapper">
              <div className="match-8-media-text2">6/8</div>
              <div className="match-8-media-bg">
                <div className="match-8-media-text3">$100</div>
              </div>
            </div>
            <br />
            {this.componentPickNumbersButton()}
          </div>
        </div>
        <div className="elite8-wrapper">
          <div className="elite8-img">
            <div className="elite8-img-wrapper">
              <div className="elite8-img-heading">Elite8</div>
              <div className="elite8-img-text1">
                Our platform is designed for all PC and mobile devices, bringing
                you access at any time, in any place, without boundaries.
              </div>
              <div className="elite8-img-text2">
                Elite8 will start at
                <span className="orange-text">9:00 pm EST</span> on
                <span className="orange-text">Feb 27th, 2020.</span>
              </div>
              <br />
              <div className="elite8-img-text3">
                The deadline for choosing or modifying your picks
                <span className="orange-text">
                  is one hour before the draw (8:00PM ET)
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-wrapper">
          <div className="white-text-1">
            No purchase necessary. Contest closes at 8:00pm ET on April 26,
            2020. Open to residents of Canada (excluding Quebec) and United
            States who are over the age of majority.
          </div>
          <br />
          <div className="white-text-2">
            Full contest rules{" "}
            <span className="orange-under-itlaics"> here</span>
          </div>
        </div>
        <div className="rules-wrapper">
          <div className="rules-wrapper-background">
            <img
              className="rules-wrapper-line"
              src={require("../../assets/images/elite8-promo/path-5.png")}
            />
            <div className="rules-solo-wrapper">
              <div className="oval" />
              <div className="rules-solo-wrapper-text1">
                Thirty (30) prizes available to be won. See full rules for
                complete details of all prizes.
              </div>
            </div>
            <div className="rules-solo-wrapper">
              <div className="oval" />
              <div className="rules-solo-wrapper-text1">
                One entry per person.
              </div>
            </div>
            <div className="rules-solo-wrapper">
              <div className="oval" />
              <div className="rules-solo-wrapper-text1">
                Odds of winning depend on participants use of Powerplays.
              </div>
            </div>
            <div className="rules-solo-wrapper">
              <div className="oval" />
              <div className="rules-solo-wrapper-text1">
                Skill-testing question must be correctly answered to win.
              </div>
            </div>
          </div>
        </div>
        <div className="pick-numbers-wrapper">
          <div className="pick-numbers-heading">Pick Your Numbers</div>
          <br />
          <div className="pick-numbers-text">
            Select 8 numbers in total by clicking the the lottery balls below.<br/>
            <span className="orange-text">
              Don't forget, you can use Powerplays to edit your selections
              during the live draw!
            </span>
          </div>
        </div>
      </div>
    );
  }
  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          <Header />
          <DrawTimer />
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> {popupHader} </Modal.Title>
            </Modal.Header>
            <Modal.Body> {popupText}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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
                            <p>
                              {"$" + Functions.numberWithCommas(prize.prize)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              }
            </Modal.Body>
          </Modal>
          <Modal
            className="modal-confirm"
            show={this.state.confirm}
            onHide={this.handleCloseConfirm}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Your picks have been entered! Good Luck!{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-body">
              <div className="confirm_submit_header">My Numbers</div>
              <div className="row confirm_submit_numbers">
                {this.state.selected.map((number, key) => {
                  return (
                    <div
                      className="confirm_submit_circle"
                      style={mCircleStyles}
                    >
                      {number}
                    </div>
                  );
                })}
              </div>
              <div className="confirm_submit_footer">
                <button
                  className="footer_btn_cancel"
                  onClick={this.handleCloseConfirm}
                >
                  Cancel
                </button>
                <button
                  className="footer_btn_submit"
                  onClick={this.submitBalls}
                >
                  Submit
                </button>
              </div>
            </Modal.Body>
          </Modal>
          <div className="container-fluid _faq_wrap">
            <div className="container-fluid">
              <div className="page747_rows">
                {this.componentelite8Top()}
                <div className="col-md-12">
                  <div className="col-md-12">
                    <div className="page747_selection_box" id="pick-numbers">
                      {this.setBalls()}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="page747_selection_box_submit_info">
                      {this.state.selected.length +
                        " of " +
                        allowedToSelect +
                        " Numbers chosen"}
                    </div>

                    <div
                      id="submit_selection_ball"
                      onClick={e => this.submitUserSelections()}
                      className={
                        "page747_selection_box_submit" +
                        (this.canSelectMore() ? " deactivate" : "")
                      }
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
    } else {
      return <>Loading</>;
    }
  }
}

export default withRouter(Elite8);
