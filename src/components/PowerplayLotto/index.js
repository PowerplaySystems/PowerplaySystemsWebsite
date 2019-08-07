import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";
import Cookies from "universal-cookie";

//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

var bg = require("./../../assets/images/lotto/lottohomehero.png");
let mCircleStyles = {
  backgroundImage: "url(" + bg + ")",
  backgroundSize: "cover",
  overflow: "hidden",
  width: "100%",
  height: "570px"
};
let mDivStyle = {
  lineHeight: "48px"
};
class PowerplayLotto extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      error: null,
      isLoaded: false,
      game747: [],
      sweet16: [],
      gridlock: [],
      elite8: [],
      content: "",
      showPrize: false,
      prizes: []
    };
    this.getDays = this.getDays.bind(this);
    this.getHours = this.getHours.bind(this);
    this.getMinuts = this.getMinuts.bind(this);
    this.getJackpot = this.getJackpot.bind(this);
    this.onPickNumbersClicked = this.onPickNumbersClicked.bind(this);
    this.onAllGames = this.onAllGames.bind(this);
    this.handleShowPrize = this.handleShowPrize.bind(this);
    this.handleClosePrize = this.handleClosePrize.bind(this);
  }
  handleClosePrize() {
    this.setState({
      showPrize: false
    });
  }

  handleShowPrize(game_type) {
    let prizesToShow = [];
    if (game_type == "747") {
      prizesToShow = this.state.game747.prize;
    } else if (game_type == "sweet16") {
      prizesToShow = this.state.sweet16.prize;
    } else if (game_type == "elite8") {
      prizesToShow = this.state.elite8.prize;
    } else if (game_type == "gridlock") {
      prizesToShow = this.state.gridlock.prize;
    }
    if (prizesToShow.length == 0) {
      return;
    }
    this.setState({
      showPrize: true,
      prizes: prizesToShow
    });
  }
  getLotteryGames() {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    var link = "https://mypowerplaygames.com/public_api/lottery_games/data.php";
    if (jwt) {
      link = link + "?jwt=" + jwt;
    }
    fetch(link)
      .then(res => res.json())
      .then(
        xx => {
          this.setState({
            game747: xx.records[0],
            sweet16: xx.records[1],
            elite8: xx.records[2],
            gridlock: xx.records[3],
            isLoaded: true
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }
  onAllGames() {
    const explore = document.getElementById("explore-games");
    if (explore) {
      explore.scrollIntoView({ block: "start", behavior: "smooth" });
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
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getLotteryGames();
  }
  getJackpot(prizeArray) {
    if (prizeArray) {
      prizeArray.sort((a, b) => parseFloat(a.hits) - parseFloat(b.hits));
      return "$" + prizeArray[prizeArray.length - 1].prize;
    } else {
      return "Coming soon";
    }
  }
  onPickNumbersClicked(path, game) {
    let action = "pick";
    if (path == "/747") {
      action = this.state.game747.entry ? "game_center" : "pick";
    } else if (path == "/sweet16") {
      action = this.state.sweet16.entry ? "game_center" : "pick";
    } else if (path == "/gridlock") {
      action = this.state.gridlock.entry ? "game_center" : "pick";
    } else if (path == "/elite8") {
      action = this.state.elite8.entry ? "game_center" : "pick";
    }
    if (action == "pick") {
      this.props.history.push({
        pathname: path,
        state: {
          gameData: game
        }
      });
    } else {
      this.props.history.push({
        pathname: "/game-central"
      });
    }
  }
  getStringDate(mDate) {
    if (mDate == null) {
      return "";
    }
    var mydate = new Date(mDate);
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ][mydate.getMonth()];
    var str =
      month + " " + mydate.getDate() + ", " + mydate.getFullYear() + " ";
    return str;
  }
  getStringTime(time) {
    if (time) {
      time = time.split(" ")[1];
    } else {
      return "-/-";
    }
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[3] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  render() {
    if (this.state.isLoaded == true) {
      return (
        <div>
          <Header />
          <div className="container-fluid">
            <div className="container">
              <div style={mCircleStyles}>
                <div className="lotto-header">
                  <div className="lotto-heading-main">POWERPLAY LOTTO</div>
                  <div className="lotto-heading-sub">
                    <span>
                      Disrupting the 'pick & wait' paper based lottery system
                    </span>
                  </div>
                  <div className="lotto-header-button-wrapper">
                    <button
                      className="lotto-header-button"
                      onClick={this.onAllGames}
                    >
                      Explore All Games
                    </button>
                  </div>
                </div>
              </div>

              <div className="lotto-section-2-heading">
                <span>
                  Enter one of our exciting lottery games utilizing our
                  revolutionary interactive lottery platform.
                </span>
              </div>
              <div className="lotto-divider" />
              <div className="lotto-block-even" id="explore-games">
                <div className="lotto-even-image">
                  <img
                    src={require("./../../assets/images/lotto/lotto_icon_747.png")}
                    className="img-responsive"
                  />
                </div>
                <div className="lotto-even-details">
                  <div className="lotto-even-details-header">
                    747{" "}
                    <span>
                      {this.state.game747.entry
                        ? "Your numbers have been saved"
                        : ""}
                    </span>
                  </div>
                  <div className="lotto-even-details-sub-heading">
                    <span>
                      Pick 7 numbers. Use Powerplays to change your numbers
                      during the draw!
                    </span>
                  </div>
                  <div className="lotto-even-details-jackpot">
                    <span>Jackpot</span>
                  </div>
                  <div className="lotto-even-details-amount">
                    <div>
                      <span>{this.getJackpot(this.state.game747.prize)}</span>
                    </div>
                    <div style={mDivStyle}>
                      <button
                        onClick={e => this.handleShowPrize("747")}
                        style={
                          this.state.game747.id == null
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        View All Prizes
                      </button>
                    </div>
                  </div>
                  <div className="lotto-even-details-odds">
                    <span>Odds of winning</span>
                  </div>
                  <div className="lotto-even-details-odds-amount">
                    <span>{this.state.game747.odds_text}</span>
                  </div>

                  <div class="lotto-even-details-draw">
                    <div className="lotto-game-date-wrapper">
                      <div className="lotto-game-date-text">
                        Next game start date
                      </div>
                      <div className="lotto-game-date">
                        {this.getStringDate(this.state.game747.start_datetime)}
                        <span>
                          {this.getStringTime(
                            this.state.game747.start_datetime
                          )}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div class="row lotto-even-details_draw_box">
                        <div>
                          <p>
                            {this.getDays(this.state.game747.start_datetime)}
                          </p>
                          Days
                        </div>
                        <div>
                          <p>
                            {this.getHours(this.state.game747.start_datetime)}
                          </p>
                          hours
                        </div>
                        <div>
                          <p>
                            {this.getMinuts(this.state.game747.start_datetime)}
                          </p>
                          Mins
                        </div>
                        <span>left</span>
                      </div>
                    </div>
                    <div>
                      <button
                        className={
                          this.state.game747.entry ? "btn_edit_numbers" : ""
                        }
                        onClick={e =>
                          this.onPickNumbersClicked("/747", this.state.game747)
                        }
                        style={
                          this.state.game747.id == null
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        {this.state.game747.entry
                          ? "View In Game Center"
                          : "Pick your Numbers now"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lotto-block-odd">
                <div className="lotto-even-image">
                  <img
                    src={require("./../../assets/images/lotto/lotto_icon_elite.png")}
                    className="img-responsive"
                  />
                </div>
                <div className="lotto-even-details">
                  <div className="lotto-even-details-header">
                    ELITE 8{" "}
                    <span>
                      {this.state.game747.entry
                        ? "Your numbers have been saved"
                        : ""}
                    </span>
                  </div>
                  <div className="lotto-even-details-sub-heading">
                    <span>
                      Go one step further and pick 8 numbers for this game!
                    </span>
                  </div>
                  <div className="lotto-even-details-jackpot">
                    <span>Jackpot</span>
                  </div>
                  <div className="lotto-even-details-amount">
                    <div>
                      <span>{this.getJackpot(this.state.elite8.prize)}</span>
                    </div>
                    <div style={mDivStyle}>
                      <button
                        style={
                          this.state.elite8.id == null
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        View All Prizes
                      </button>
                    </div>
                  </div>
                  <div className="lotto-even-details-odds">
                    <span>Odds of winning</span>
                  </div>
                  <div className="lotto-even-details-odds-amount">
                    <span>
                      {this.state.elite8.odds_text
                        ? this.state.elite8.odds_text
                        : "--/--"}
                    </span>
                  </div>

                  <div class="lotto-even-details-draw">
                    <div className="lotto-game-date-wrapper">
                      <div className="lotto-game-date-text">
                        Next game start date
                      </div>
                      <div className="lotto-game-date">
                        {this.getStringDate(this.state.elite8.start_datetime)}
                        <span>
                          {this.getStringTime(this.state.elite8.start_datetime)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div class="row lotto-even-details_draw_box">
                        <div>
                          <p>
                            {this.getDays(this.state.elite8.start_datetime)}
                          </p>
                          Days
                        </div>
                        <div>
                          <p>
                            {this.getHours(this.state.elite8.start_datetime)}
                          </p>
                          hours
                        </div>
                        <div>
                          <p>
                            {this.getMinuts(this.state.elite8.start_datetime)}
                          </p>
                          Mins
                        </div>
                        <span>left</span>
                      </div>
                    </div>
                    <div>
                      <button
                        className={
                          this.state.elite8.entry ? "btn_edit_numbers" : ""
                        }
                        style={
                          this.state.elite8.id == null
                            ? { display: "none" }
                            : { display: "block" }
                        }
                        onClick={e =>
                          this.onPickNumbersClicked(
                            "/elite8",
                            this.state.elite8
                          )
                        }
                      >
                        {this.state.elite8.entry
                          ? "View In Game Center"
                          : "Pick your Numbers now"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lotto-block-even">
                <div className="lotto-even-image">
                  <img
                    src={require("./../../assets/images/lotto/lotto_icon_sweet16.png")}
                    className="img-responsive"
                  />
                </div>
                <div className="lotto-even-details">
                  <div className="lotto-even-details-header">
                    Sweet 16
                    <span>
                      {this.state.sweet16.entry
                        ? "Your numbers have been saved"
                        : ""}
                    </span>
                  </div>
                  <div className="lotto-even-details-sub-heading">
                    <span>
                      You will need to closely manage your Powerplays for this
                      challenging 16 ball game!
                    </span>
                  </div>
                  <div className="lotto-even-details-jackpot">
                    <span>Jackpot</span>
                  </div>
                  <div className="lotto-even-details-amount">
                    <div>
                      <span>{this.getJackpot(this.state.sweet16.prize)}</span>
                    </div>
                    <div style={mDivStyle}>
                      <button
                        style={
                          this.state.sweet16.id == null
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        View All Prizes
                      </button>
                    </div>
                  </div>
                  <div className="lotto-even-details-odds">
                    <span>Odds of winning</span>
                  </div>
                  <div className="lotto-even-details-odds-amount">
                    <span>
                      {this.state.sweet16.odds_text
                        ? this.state.sweet16.odds_text
                        : "--/--"}
                    </span>
                  </div>

                  <div class="lotto-even-details-draw">
                    <div className="lotto-game-date-wrapper">
                      <div className="lotto-game-date-text">
                        Next game start date
                      </div>
                      <div className="lotto-game-date">
                        {this.getStringDate(this.state.sweet16.start_datetime)}
                        <span>
                          {this.state.sweet16.start_datetime
                            ? this.getStringTime(
                                this.state.sweet16.start_datetime
                              )
                            : "-/-"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div class="row lotto-even-details_draw_box">
                        <div>
                          <p>
                            {this.getDays(this.state.sweet16.start_datetime)}
                          </p>
                          Days
                        </div>
                        <div>
                          <p>
                            {this.getHours(this.state.sweet16.start_datetime)}
                          </p>
                          hours
                        </div>
                        <div>
                          <p>
                            {this.getMinuts(this.state.sweet16.start_datetime)}
                          </p>
                          Mins
                        </div>
                        <span>left</span>
                      </div>
                    </div>
                    <div>
                      <button
                        className={
                          this.state.sweet16.entry ? "btn_edit_numbers" : ""
                        }
                        style={
                          this.state.sweet16.id == null
                            ? { display: "none" }
                            : { display: "block" }
                        }
                        onClick={e =>
                          this.onPickNumbersClicked(
                            "/sweet16",
                            this.state.sweet16
                          )
                        }
                      >
                        {this.state.sweet16.entry
                          ? "View In Game Center"
                          : "Pick your Numbers now"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lotto-block-odd">
                <div className="lotto-even-image">
                  <img
                    src={require("./../../assets/images/lotto/lotto_icon_gridlock.png")}
                    className="img-responsive"
                  />
                </div>
                <div className="lotto-even-details">
                  <div className="lotto-even-details-header">
                    Gridlock{" "}
                    <span>
                      {this.state.gridlock.entry
                        ? "Your numbers have been saved"
                        : ""}
                    </span>
                  </div>
                  <div className="lotto-even-details-sub-heading">
                    <span>
                      Pick one # from each of the 12 grids! Being stuck in a
                      Gridlock is finally exciting!
                    </span>
                  </div>
                  <div className="lotto-even-details-jackpot">
                    <span>Jackpot</span>
                  </div>
                  <div className="lotto-even-details-amount">
                    <div>
                      <span>{this.getJackpot(this.state.gridlock.prize)}</span>
                    </div>
                    <div style={mDivStyle}>
                      <button
                        style={
                          this.state.gridlock.id == null
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        View All Prizes
                      </button>
                    </div>
                  </div>
                  <div className="lotto-even-details-odds">
                    <span>Odds of winning</span>
                  </div>
                  <div className="lotto-even-details-odds-amount">
                    <span>
                      {this.state.gridlock.odds_text
                        ? "this.state.gridlock.odds_text"
                        : "--/--"}
                    </span>
                  </div>

                  <div class="lotto-even-details-draw">
                    <div className="lotto-game-date-wrapper">
                      <div className="lotto-game-date-text">
                        Next game start date
                      </div>
                      <div className="lotto-game-date">
                        {this.getStringDate(this.state.gridlock.start_datetime)}
                        <span>
                          {this.state.gridlock.start_datetime
                            ? this.getStringTime(
                                this.state.gridlock.start_datetime
                              )
                            : "-/-"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div class="row lotto-even-details_draw_box">
                        <div>
                          <p>
                            {this.getDays(this.state.gridlock.start_datetime)}
                          </p>
                          Days
                        </div>
                        <div>
                          <p>
                            {this.getHours(this.state.gridlock.start_datetime)}
                          </p>
                          hours
                        </div>
                        <div>
                          <p>
                            {this.getMinuts(this.state.gridlock.start_datetime)}
                          </p>
                          Mins
                        </div>
                        <span>left</span>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={e =>
                          this.onPickNumbersClicked(
                            "/gridlock",
                            this.state.gridlock
                          )
                        }
                        className={
                          this.state.gridlock.entry ? "btn_edit_numbers" : ""
                        }
                        style={
                          this.state.gridlock.id == null
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        {this.state.gridlock.entry
                          ? "View In Game Center"
                          : "Pick your Numbers now"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
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
                            <p>{"$" + prize.prize}</p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              }
            </Modal.Body>
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
        </div>
      );
    }
  }
}

export default withRouter(PowerplayLotto);
