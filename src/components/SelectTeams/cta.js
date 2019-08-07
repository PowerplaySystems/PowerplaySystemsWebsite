import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./../common/constants.js";
import "./index.css";
import Cookies from "universal-cookie";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
//Modal.setAppElement('body')
var path = "";
var popupText = "Error";
var popupHader = "Sorry!";

var MySelections = props => {
  function createPrizeText() {
    var prizeText = "";
    var SelectedTeams = props.teams.length;
    var minAllowed = props.gameData.min_teams_allowed;
    if (SelectedTeams < minAllowed) {
      prizeText =
        "Select At least " + minAllowed + " Teams To Enter This Contest";
    } else {
      prizeText =
        "You could win " +
        (props.gameData.prize_type == "cash"
          ? "$" + props.prizeCurrent
          : props.prizeCurrent + " Points") +
        " " +
        props.gameData.gametype_prize_text;
    }
    return prizeText;
  }
  function getTeamName(id) {
    var matchId = id.split("-")[0];
    var teamId = id.split("-")[1];
    console.log(matchId);
    console.log(props.matches);
    let obj = props.matches.find(obj => obj.feed_game_id == matchId);
    if (obj) {
      return obj.home_team_id == teamId ? obj.home_team : obj.away_team;
    } else {
      return ":(";
    }
  }
  function passClick(id) {
    props.onClickClose(id);
  }
  if (props.teams.length > 0) {
    return (
      <div className="select_team_box_details">
        <center>
          <div className="selected_teams_wrapper">
            {props.teams.map((team, key) => {
              return (
                <div className="selected_team_box">
                  {getTeamName(team)}
                  <a onClick={() => passClick(team)} class="close-thin" />
                </div>
              );
            })}
          </div>

          <div className="total_teams_selected_info">
            {props.teams.length +
              "/" +
              props.gameData.max_teams_allowed +
              "Teams Selected"}
          </div>
          <div className="max_teams_selected_info">
            {props.teams.length == props.gameData.max_teams_allowed
              ? "Maximum Teams Selected"
              : ""}
          </div>
          <div className="select_teams_game_info">{createPrizeText()}</div>
          <div
            className="select_teams_button_submit"
            onClick={props.onClickSubmit}
          >
            Submit My Picks
          </div>
        </center>
      </div>
    );
  } else {
    return (
      <div className="select_team_box_details">
        <center>
          <div className="no_teams_selected_wrapper">
            <img
              src={require("./../../assets/images/select_team/check.png")}
              className="img-responsive"
            />
            <div className="selected_teams_info">
              Your selected teams will appear here{" "}
            </div>
            <div className="total_teams_selected_info">
              {props.teams.length +
                "/" +
                props.gameData.max_teams_allowed +
                "Teams Selected"}
            </div>
            <div className="selected_a_team_info">
              Select at least 1 team to sumbit your picks
            </div>
          </div>

          <div className="select_teams_button_submit_inactive">
            Submit My Picks
          </div>
        </center>
      </div>
    );
  }
};
class CTA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: "",
      isLoaded: false,
      gamesArraysInPair: [],
      matches: [],
      selectedTeams: [],
      show: false,
      showPrize: false,
      gameData: this.props.location.state.gameData,
      prizeTable: [],
      prizeCurrent: 0,
      modalIsOpen: false
    };

    this.onSelectClicked = this.onSelectClicked.bind(this);
    this.updateCurrentPrize = this.updateCurrentPrize.bind(this);
    this.onViewPrizeGridClicked = this.onViewPrizeGridClicked.bind(this);
    this.onSubmitClicked = this.onSubmitClicked.bind(this);
    this.tConv24 = this.tConv24.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleShowPrize = this.handleShowPrize.bind(this);
    this.handleClosePrize = this.handleClosePrize.bind(this);
  }
  removeClicked = teamId => {
    this.onSelectClicked(teamId);
  };
  onSelectClicked(id) {
    //saving a copy
    var teams = this.state.selectedTeams.slice();
    var max = this.state.gameData.max_teams_allowed;
    //if the id exists i.e is already selected
    if (teams.includes(id)) {
      //de-select it by removing it from the array
      teams = teams.filter(item => item !== id);
      //update prize and teams state
      this.updateCurrentPrize(teams);
    } else {
      if (!(teams.length >= max)) {
        teams.push(id);
        this.updateCurrentPrize(teams);
      } else {
        popupText = "You can Only Select " + max + "Teams!";
        popupHader = "Sorry!";
        this.handleShow();
      }
    }
  }

  updateCurrentPrize(teams) {
    let obj = this.state.prizeTable.find(obj => obj.no_of_team == teams.length);
    let currPrize = 0;
    if (obj) {
      currPrize = obj.prize;
      this.setState({
        selectedTeams: teams,
        prizeCurrent: currPrize
      });
    } else {
      this.setState({
        selectedTeams: teams,
        prizeCurrent: currPrize
      });
    }
  }

  onViewPrizeGridClicked() {}

  onSubmitClicked() {
    var SelectedTeams = this.state.selectedTeams.length;
    var minAllowed = this.state.gameData.min_teams_allowed;
    if (SelectedTeams < minAllowed) {
      popupText =
        "Select at least " + this.state.gameData.min_teams_allowed + " Team(s)";
      popupHader = "Sorry!";
      this.handleShow();
    } else {
      const cookies = new Cookies();
      const jwt = cookies.get("jwt");
      var data =
        "teams=" +
        this.state.selectedTeams +
        "&jwt=" +
        jwt +
        "&entry=" +
        this.state.gameData.id;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      var that = this;
      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          if (~this.responseText.indexOf("Successful")) {
            popupText = "Submited";
            popupHader = "Done!";
            alert("Updated");
            that.props.history.push({
              pathname: "/game-central"
            });
          } else {
            popupText = "Something Went Wrong, Please Try Again";
            popupHader = "Sorry!";
            that.handleShow();
          }
        }
      });
      xhr.open(
        "POST",
        " https://www.mypowerplaygames.com/public_api/schedule/setmypicks.php"
      );
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }
  }

  tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    fetch(
      "https://mypowerplaygames.com/public_api/schedule/getschedule.php?date=" +
        this.props.location.state.date +
        "&gameset_id=" +
        this.state.gameData.gameset_id +
        "&league_id=" +
        this.state.gameData.league_id
    )
      .then(res => res.json())
      .then(
        dd => {
          var arrays = [],
            size = 2;
          var mymatches = [...dd.records];

          dd = dd.records;
          while (dd.length > 0) arrays.push(dd.splice(0, size));
          this.setState({
            isLoaded: true,
            gamesArraysInPair: arrays,
            matches: mymatches
          });
        },
        error => {
          this.setState({
            hasError: true,
            error: error
          });
        }
      );
    fetch(
      "https://mypowerplaygames.com/public_api/schedule/prize.php?id=" +
        this.state.gameData.prize_id
    )
      .then(res => res.json())
      .then(
        result => {
          result = result.records;
          this.setState({
            isLoaded: true,
            prizeTable: result
          });
        },
        error => {
          this.setState({
            hasError: true,
            error: error
          });
        }
      );
    if (this.state.gameData.has_picks) {
      const cookies = new Cookies();
      const jwt = cookies.get("jwt");
      fetch(
        "https://mypowerplaygames.com/public_api/schedule/mypicks.php?jwt=" +
          jwt +
          "&entry=" +
          this.state.gameData.id
      )
        .then(res => res.json())
        .then(
          result => {
            result = result.records;
            var x = this.state.selectedTeams.slice();
            result.forEach(element => {
              x.push(element.pick);
            });

            this.setState({
              isLoaded: true,
              selectedTeams: x
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

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true
    };
  }
  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error);
    console.log(info);
  }
  getGolaieInfo(goalie, gaa) {
    if (goalie == "" || goalie == null) {
      return "-/-";
    } else {
      return goalie + " - " + gaa;
    }
  }
  getPitcherInfo(pitcher, era) {
    if (pitcher == "" || pitcher == null) {
      return "TBA";
    } else {
      return pitcher + " - " + era;
    }
  }

  getPrizeAmount() {
    var prizeText = "";
    var SelectedTeams = this.state.selectedTeams.length;
    var minAllowed = this.state.gameData.min_teams_allowed;
    if (SelectedTeams < minAllowed) {
      prizeText = this.state.gameData.prize_type == "cash" ? "$0" : "0 Pts.";
    } else {
      prizeText =
        this.state.gameData.prize_type == "cash"
          ? "$" + this.state.prizeCurrent
          : this.state.prizeCurrent + " Pts.";
    }
    return prizeText;
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

  handleClosePrize() {
    this.setState({
      showPrize: false
    });
  }

  handleShowPrize() {
    this.setState({
      showPrize: true
    });
  }
  openLineupWindow() {
    var win = window.open(
      "https://www.mlb.com/starting-lineups/" +
        this.state.gameData.stat_time.split(" ")[0],
      "_blank"
    );
    win.focus();
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
  pageforNHL() {
    return (
      <>
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
        <Header />
        <div className="container-fluid game_zones">
          <Modal show={this.state.showPrize} onHide={this.handleClosePrize}>
            <Modal.Header closeButton>
              <Modal.Title>Prizes</Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-body">
              {
                <table>
                  <thead>
                    <tr>
                      <th scope="col"> # of Teams </th>
                      <th scope="col"> Prize </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.prizeTable.map((prize, key) => {
                      if (
                        prize.no_of_team >=
                          this.state.gameData.min_teams_allowed &&
                        prize.no_of_team <=
                          this.state.gameData.max_teams_allowed
                      )
                        return (
                          <tr className="prize-row" key={key}>
                            <td>
                              <p> {prize.no_of_team} </p>
                            </td>
                            <td>
                              <p>
                                {this.state.gameData.prize_type == "cash"
                                  ? "$" + prize.prize
                                  : prize.prize + " Points"}
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
          <div className="container">
            <div className="row top-area">
              <div className="col-md-12">
                <img
                  src={require("./../../assets/images/header/nhl/CTA.png")}
                  className="img-responsive"
                />
                <h1>
                  <span> {this.state.gameData.name} </span>
                </h1>
                <br />
                <h1> {this.state.gameData.header_text} </h1>
              </div>
            </div>
            <div className="game_zones_main">
              {this.state.gamesArraysInPair.map((data, index) => (
                <div className="row game_zones_score">
                  {(() => {
                    if (data.length > 0) {
                      return (
                        <div
                          className={
                            data[0].status != "UNPLAYED"
                              ? "col-md-6 left_box div-disabled"
                              : "col-md-6 left_box"
                          }
                        >
                          <div className="col-sm-8 boxes-left">
                            <div className="box-one">
                              {(() => {
                                if (
                                  this.state.selectedTeams.includes(
                                    data[0].feed_game_id +
                                      "-" +
                                      data[0].home_team_id
                                  )
                                ) {
                                  return (
                                    <div className="col-sm-3 zones zones_box">
                                      <div
                                        className="iner-zones"
                                        onClick={() =>
                                          this.onSelectClicked(
                                            data[0].feed_game_id +
                                              "-" +
                                              data[0].home_team_id
                                          )
                                        }
                                      >
                                        Selected
                                      </div>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div className="col-sm-3 zones zone-sel">
                                      <div
                                        className="iner-zones"
                                        onClick={() =>
                                          this.onSelectClicked(
                                            data[0].feed_game_id +
                                              "-" +
                                              data[0].home_team_id
                                          )
                                        }
                                      >
                                        Click to <br className="hidden-xs" />
                                        Select
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              <div className="col-sm-9 zones-det">
                                <div className="iner-zones">
                                  <p>
                                    {data[0].home_team} <br />
                                    <span className="span1">
                                      Starting Goalie
                                    </span>
                                    <br />
                                    <span className="span2">
                                      {this.getGolaieInfo(
                                        data[0].starting_goalie_home_team,
                                        data[0].starting_goalie_home_team_gaa
                                      )}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="clearfix" />
                            </div>
                            <p className="vs"> -VS. - </p>
                            <div className="box-one">
                              {(() => {
                                if (
                                  this.state.selectedTeams.includes(
                                    data[0].feed_game_id +
                                      "-" +
                                      data[0].away_team_id
                                  )
                                ) {
                                  return (
                                    <div className="col-sm-3 zones zones_box">
                                      <div
                                        className="iner-zones"
                                        onClick={() =>
                                          this.onSelectClicked(
                                            data[0].feed_game_id +
                                              "-" +
                                              data[0].away_team_id
                                          )
                                        }
                                      >
                                        Selected
                                      </div>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div className="col-sm-3 zones zone-sel">
                                      <div
                                        className="iner-zones"
                                        onClick={() =>
                                          this.onSelectClicked(
                                            data[0].feed_game_id +
                                              "-" +
                                              data[0].away_team_id
                                          )
                                        }
                                      >
                                        Click to <br className="hidden-xs" />
                                        Select
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              <div className="col-sm-9 zones-det">
                                <div className="iner-zones">
                                  <p>
                                    {data[0].away_team} <br />
                                    <span className="span1">
                                      Starting Goalie
                                    </span>
                                    <br />
                                    <span className="span2">
                                      {this.getGolaieInfo(
                                        data[0].starting_goalie_away_team,
                                        data[0].starting_goalie_away_team_gaa
                                      )}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                          <div className="col-sm-4 boxes-right">
                            <div className="iner-zones">
                              <p>
                                Location <br />
                                <span className="span">{data[0].location}</span>
                                <br /> <br />
                                Start Time <br />
                                <span className="span">
                                  {data[0].status != "UNPLAYED"
                                    ? data[0].status
                                    : data[0].start_time.split("T")[0] +
                                      " " +
                                      this.tConv24(
                                        data[0].start_time
                                          .split("T")[1]
                                          .replace(":00.000Z", "")
                                      )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })()}
                  {(() => {
                    if (data.length > 1) {
                      return (
                        <div
                          className={
                            data[1].status != "UNPLAYED"
                              ? "col-md-6 right_box div-disabled"
                              : "col-md-6 right_box"
                          }
                        >
                          <div className="col-sm-8 boxes-left">
                            <div className="box-one">
                              {(() => {
                                if (
                                  this.state.selectedTeams.includes(
                                    data[1].feed_game_id +
                                      "-" +
                                      data[1].home_team_id
                                  )
                                ) {
                                  return (
                                    <div className="col-sm-3 zones zones_box">
                                      <div
                                        className="iner-zones"
                                        onClick={() =>
                                          this.onSelectClicked(
                                            data[1].feed_game_id +
                                              "-" +
                                              data[1].home_team_id
                                          )
                                        }
                                      >
                                        Selected
                                      </div>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div className="col-sm-3 zones zone-sel">
                                      <div
                                        className="iner-zones"
                                        onClick={() =>
                                          this.onSelectClicked(
                                            data[1].feed_game_id +
                                              "-" +
                                              data[1].home_team_id
                                          )
                                        }
                                      >
                                        Click to <br className="hidden-xs" />
                                        Select
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              <div className="col-sm-9 zones-det">
                                <div className="iner-zones">
                                  <p>
                                    {data[1].home_team} <br />
                                    <span className="span1">
                                      Starting Goalie
                                    </span>
                                    <br />
                                    <span className="span2">
                                      {this.getGolaieInfo(
                                        data[1].starting_goalie_home_team,
                                        data[1].starting_goalie_home_team_gaa
                                      )}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="clearfix" />
                            </div>
                            <p className="vs"> -VS. - </p>
                            <div className="box-one">
                              {(() => {
                                if (
                                  this.state.selectedTeams.includes(
                                    data[1].feed_game_id +
                                      "-" +
                                      data[1].away_team_id
                                  )
                                ) {
                                  return (
                                    <div className="col-sm-3 zones zones_box">
                                      <div
                                        className="iner-zones"
                                        onClick={() =>
                                          this.onSelectClicked(
                                            data[1].feed_game_id +
                                              "-" +
                                              data[1].away_team_id
                                          )
                                        }
                                      >
                                        Selected
                                      </div>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div className="col-sm-3 zones zone-sel">
                                      <div
                                        className="iner-zones"
                                        onClick={() =>
                                          this.onSelectClicked(
                                            data[1].feed_game_id +
                                              "-" +
                                              data[1].away_team_id
                                          )
                                        }
                                      >
                                        Click to <br className="hidden-xs" />
                                        Select
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              <div className="col-sm-9 zones-det">
                                <div className="iner-zones">
                                  <p>
                                    {data[1].away_team} <br />
                                    <span className="span1">
                                      Starting Goalie
                                    </span>
                                    <br />
                                    <span className="span2">
                                      {this.getGolaieInfo(
                                        data[1].starting_goalie_away_team,
                                        data[1].starting_goalie_away_team_gaa
                                      )}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                          <div className="col-sm-4 boxes-right">
                            <div className="iner-zones">
                              <p>
                                Location <br />
                                <span className="span">{data[1].location}</span>
                                <br /> <br />
                                Start Time <br />
                                <span className="span">
                                  {data[1].status != "UNPLAYED"
                                    ? data[1].status
                                    : data[1].start_time.split("T")[0] +
                                      " " +
                                      this.tConv24(
                                        data[1].start_time
                                          .split("T")[1]
                                          .replace(":00.000Z", "")
                                      )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return "";
                    }
                  })()}
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-md-9 col-sm-8">
                <a href="#">
                  <button className="btn_one_zones"> Maximum Prize </button>
                </a>
              </div>
              <div className="col-md-3 col-sm-4">
                <a href="#">
                  <button className="btn_two_zones">
                    {this.getPrizeAmount()}
                  </button>
                </a>
              </div>
            </div>
            <div className="row gamzone_price">
              <div className="col-md-12">
                <h2>
                  <span className="fa fa-info-circle infobtn" />
                  {this.createPrizeText()}
                </h2>
              </div>
            </div>
            <div className="row game_zone_sub">
              <div className="col-sm-12">
                <a>
                  <button onClick={e => this.onSubmitClicked()}>
                    {this.getButtonText()}
                  </button>
                </a>
              </div>
            </div>
            <div className="row game_zone_btn">
              <div className="col-sm-6">
                <a>
                  <button onClick={e => this.handleShowPrize()}>
                    View Prize Grid
                  </button>
                </a>
              </div>
              <div className="col-sm-6">
                <a href="#">
                  <button> Game Rules </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  pageForMLB() {
    return (
      <>
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
        <Header />
        <div className="page_main">
          <Modal show={this.state.showPrize} onHide={this.handleClosePrize}>
            <Modal.Header closeButton>
              <Modal.Title>Prizes</Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-body">
              {
                <table className="modal-prize-table">
                  <thead>
                    <tr>
                      <th scope="col"> # of Teams </th>
                      <th scope="col"> Prize </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.prizeTable.map((prize, key) => {
                      if (
                        prize.no_of_team >=
                          this.state.gameData.min_teams_allowed &&
                        prize.no_of_team <=
                          this.state.gameData.max_teams_allowed
                      )
                        return (
                          <tr className="prize-row" key={key}>
                            <td>
                              <p> {prize.no_of_team} </p>
                            </td>
                            <td>
                              <p>
                                {this.state.gameData.prize_type == "cash"
                                  ? "$" + prize.prize
                                  : prize.prize + " Points"}
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
          <div className="">
            <img
              src={
                "http://mypowerplaygames.com/api/sport_league/get_image.php?id=" +
                this.state.gameData.association_id +
                "&type=header"
              }
              style={{ width: "100%" }}
            />
            <div className="select_game_description">
              Sponsored by: &nbsp; &nbsp; &nbsp;
              <img
                className="select_teams_sponsor_img"
                src={require("./../../assets/images/logo.png")}
              />
              <div className="select_teams_game_title">
                Summer Fantasy Battle
              </div>
              <div className="select_teams_game_time">
                Game Set Start Date&nbsp;
                <span>
                  {this.getStringDate(this.state.gameData.stat_time) +
                    ", " +
                    this.getStringTime(this.state.gameData.stat_time)}
                </span>
              </div>
              <div className="select_teams_header_buttons_wrapper">
                <div className="select_team_button_rules">Game Rules</div>
                <div
                  className="select_team_button_grid"
                  onClick={e => this.handleShowPrize()}
                >
                  Prize Grid
                </div>
              </div>
            </div>
            <div style={{ margin: "20px" }}>
              <div
                className="select_team_row"
                style={{ margin: "60px 0px 20px 0px" }}
              >
                <div className="select_team_heading">Select Your Teams</div>
                <div
                  className="select_team_button_lineup"
                  onClick={e => this.openLineupWindow()}
                >
                  Starting Lineups
                </div>
                <div className="select_team_heading_right">My Selections</div>
              </div>
              <p className="select_team_game_info">
                Pick teams that you think will have a final score equal to 1
              </p>
              <div className="select_team_row">
                <div className="select_team_box_teams">
                  {this.state.matches.map((data, index) => (
                    <div
                      className={
                        data.status != "UNPLAYED"
                          ? "select_team_box_select_team div-disabled"
                          : "select_team_box_select_team"
                      }
                    >
                      <div
                        style={{
                          borderBottom: "solid 1px #232323",
                          height: "160px"
                        }}
                      >
                        <div className="select_team_box_inner_left">
                          <div
                            className={
                              this.state.selectedTeams.includes(
                                data.feed_game_id + "-" + data.home_team_id
                              )
                                ? "select_team_box_name_active"
                                : "select_team_box_name"
                            }
                          >
                            {data.home_team}
                          </div>
                          <div className="select_team_box_starting">
                            Starting Pitcher
                          </div>
                          <div className="select_team_box_pitcher">
                            {this.getPitcherInfo(
                              data.starting_pitcher_home_team,
                              data.starting_pitcher_home_team_era
                            )}
                          </div>
                          {(() => {
                            if (
                              this.state.selectedTeams.includes(
                                data.feed_game_id + "-" + data.home_team_id
                              )
                            ) {
                              return (
                                <div
                                  className="select_team_box_select_active"
                                  onClick={() =>
                                    this.onSelectClicked(
                                      data.feed_game_id +
                                        "-" +
                                        data.home_team_id
                                    )
                                  }
                                >
                                  <span
                                    style={{
                                      color: "#fb6e00",
                                      marginRight: "10px"
                                    }}
                                    class="glyphicon glyphicon-record"
                                    aria-hidden="true"
                                  />
                                  {data.status == "UNPLAYED"
                                    ? "Selected"
                                    : data.status == "COMPLETED"
                                    ? "Selected (Finished)"
                                    : "Selected (LIVE)"}
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className="select_team_box_select"
                                  onClick={() =>
                                    this.onSelectClicked(
                                      data.feed_game_id +
                                        "-" +
                                        data.home_team_id
                                    )
                                  }
                                >
                                  <span aria-hidden="true">
                                    {data.status == "UNPLAYED"
                                      ? "Select This Team"
                                      : data.status == "COMPLETED"
                                      ? "Finished"
                                      : "LIVE"}
                                  </span>
                                </div>
                              );
                            }
                          })()}
                        </div>
                        <div className="select_teams_vs">vs.</div>
                        <div className="select_team_box_inner_left">
                          <div
                            className={
                              this.state.selectedTeams.includes(
                                data.feed_game_id + "-" + data.away_team_id
                              )
                                ? "select_team_box_name_active"
                                : "select_team_box_name"
                            }
                          >
                            {data.away_team}
                          </div>
                          <div className="select_team_box_starting">
                            Starting Pitcher
                          </div>
                          <div className="select_team_box_pitcher">
                            {this.getPitcherInfo(
                              data.starting_pitcher_away_team,
                              data.starting_pitcher_away_team_era
                            )}
                          </div>
                          {(() => {
                            if (
                              this.state.selectedTeams.includes(
                                data.feed_game_id + "-" + data.away_team_id
                              )
                            ) {
                              return (
                                <div
                                  className="select_team_box_select_active"
                                  onClick={() =>
                                    this.onSelectClicked(
                                      data.feed_game_id +
                                        "-" +
                                        data.away_team_id
                                    )
                                  }
                                >
                                  <span
                                    style={{
                                      color: "#fb6e00",
                                      marginRight: "10px"
                                    }}
                                    class="glyphicon glyphicon-record"
                                    aria-hidden="true"
                                  />
                                  {data.status == "UNPLAYED"
                                    ? "Selected"
                                    : data.status == "COMPLETED"
                                    ? "Selected (Finished)"
                                    : "Selected (LIVE)"}
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className="select_team_box_select"
                                  onClick={() =>
                                    this.onSelectClicked(
                                      data.feed_game_id +
                                        "-" +
                                        data.away_team_id
                                    )
                                  }
                                >
                                  <span aria-hidden="true">
                                    {data.status == "UNPLAYED"
                                      ? "Select This Team"
                                      : data.status == "COMPLETED"
                                      ? "Finished"
                                      : "LIVE"}
                                  </span>
                                </div>
                              );
                            }
                          })()}
                        </div>
                        <div className="select_team_box_inner_bottom">
                          <div className="select_team_box_inner_bottom_item">
                            <img
                              className="select_team_box_inner_bottom_img"
                              src={require("./../../assets/images/select_team/clock.png")}
                            />
                            <div className="select_team_box_inner_bottom_text">
                              {this.tConv24(
                                data.start_time
                                  .split("T")[1]
                                  .replace(":00.000Z", "")
                              )}
                            </div>
                          </div>
                          <div className="select_team_box_inner_bottom_item">
                            <img
                              className="select_team_box_inner_bottom_img"
                              src={require("./../../assets/images/select_team/calendar.png")}
                            />
                            <div className="select_team_box_inner_bottom_text">
                              {data.start_time.split("T")[0]}
                            </div>
                          </div>
                          <div className="select_team_box_inner_bottom_item">
                            <img
                              className="select_team_box_inner_bottom_img"
                              src={require("./../../assets/images/select_team/stadium.png")}
                            />
                            <div className="select_team_box_inner_bottom_text">
                              {data.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <MySelections
                  teams={this.state.selectedTeams}
                  onClickClose={this.removeClicked}
                  onClickSubmit={this.onSubmitClicked}
                  gameData={this.state.gameData}
                  prizeCurrent={this.state.prizeCurrent}
                  matches={this.state.matches}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1> Something went wrong. </h1>;
    }
    if (this.state.isLoaded) {
      //if NHL
      if (this.state.gameData.league_id == 14) {
        return this.pageforNHL();
      }
      //if MLB
      if (this.state.gameData.league_id == 15) {
        return this.pageForMLB();
      }
    } else {
      return "Loading";
    }
  }
}

export default withRouter(CTA);
