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

    this.state = {
      error: null,
      isLoaded: false,
      content: "",
      gameData: this.props.location.state.gameData,
      show: false,
      selected: [],
      prizes: [],
      confirm: false
    };
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
    this.state.selected.sort(function(a, b){return a-b});
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
  componentDidMount() {
    window.scroll(0, 0);
    this.setBalls();
    this.getMyPickedNumbers();
    var buttons = document.getElementsByClassName("page747_selection_button");
    var that = this;

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
      " https://www." + Constants.URL + "/public_api/lottery_games/setMyNumbers.php"
    );
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
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
  render() {
    return (
      <div>
        <Header />
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
        <Modal
          className="modal-confirm"
          show={this.state.confirm}
          onHide={this.handleCloseConfirm}
        >
          <Modal.Header closeButton>
            <Modal.Title>Review my numbers</Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-body">
            <div className="confirm_submit_header">My Numbers</div>
            <div className="row confirm_submit_numbers">
              {this.state.selected.map((number, key) => {
                return (
                  <div className="confirm_submit_circle" style={mCircleStyles}>
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
              <button className="footer_btn_submit" onClick={this.submitBalls}>
                Submit
              </button>
            </div>
          </Modal.Body>
        </Modal>
        <div className="container-fluid _faq_wrap">
          <div className="container">
            <div className="row page747_rows">
              <div className="col-md-12">
                <img
                  style={{ margin: "0 auto", width: "1400px" }}
                  className="img-responsive"
                  src={require("./../../assets/images/747/747_header.png")}
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
                <center class="main_bar_button">
                  <button onClick={this.scrollToNumbers}>
                    Pick Your Numbers Now!
                  </button>
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
              <div className="col-md-12">
                <div className="page747_main_power">
                  <div class="page747_power_image-wraper">
                    <img
                      className="img-responsive"
                      src={require("./../../assets/images/747/747_powerplays.png")}
                    />
                  </div>
                  <div className="page747_power_details">
                    <div className="page747_power_heading">Powerplays</div>
                    <div className="page747_power_content">
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
                            Use Power Match to change your pick to match the
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
                </div>
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
  }
}

export default withRouter(Page747);
