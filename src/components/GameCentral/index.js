import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import Invertory from "./../common/inventory";
import "./index.css";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

import Cookies from "universal-cookie";

var popupText = "Error";
var popupHader = "Sorry!";

var totalWithOne = 0;
//active Game Data variables
var activeGame = false;
var activeGameIndex = 0;
var activeText = "";

//Components
function GameDetailsPopUp(props) {
  totalWithOne = 0;
  function onButtonClick(text) {
    activeText = text;
    props.buttonClick();
  }
  props.liveScores.forEach(element => {
    if (element.my_score == 1) {
      totalWithOne = totalWithOne + 1;
    }
  });
  return (
    <div
      className={
        props.showSummry
          ? "fade show in game_center_summry_modal"
          : "modal fade"
      }
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-con" role="document">
        <div className="game_center_summry_body" id="details-modal">
          <div className="game_center_summry_header flex">
            <div className="col-md-6">
              <center>
                <div className="summry_header_sport_name">Summer Baseball</div>
                <button
                  className="summry_header_score_button"
                  onClick={e => onButtonClick("livescore")}
                >
                  Edit Live Scores
                </button>
              </center>
            </div>
            <div className="col-md-6">
              <center>
                <div className="summry_header_right">
                  <div className="summry_header_right_col">
                    <div className="summry_header_right_col_text">
                      Selected Teams
                    </div>
                    <div className="summry_header_right_col_score">
                      {props.myPicksCount}
                    </div>
                  </div>

                  <div className="summry_header_right_col">
                    <div className="summry_header_right_col_text">
                      Teams with 1 Run
                    </div>
                    <div className="summry_header_right_col_score">
                      {totalWithOne}
                    </div>
                  </div>
                </div>
              </center>
              <div />
            </div>
          </div>
          <div className="game_center_summry_body flex">
            <table className="summry-table">
              {(() => {
                if (props.myPicksCount > 0) {
                  return (
                    <>
                      <thead>
                        <tr>
                          <th>Suit</th>
                          <th>Team Name</th>
                          <th>Live Score</th>
                          <th>My Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.liveScores.map((item, key) => {
                          return (
                            <tr key={key}>
                              <td>
                                <img
                                  className="summry_table_img"
                                  src={require("./../../assets/images/game-center/spade_black.jpg")}
                                />
                              </td>
                              <td>{item.name}</td>
                              <td>{item.status}</td>
                              <td>{item.my_score}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </>
                  );
                } else {
                  return (
                    <>
                      <thead>
                        <tr>
                          <th>Suit</th>
                          <th>Team Name</th>
                          <th>Live Score</th>
                          <th>My Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {(() => {
                            if (activeGame == [] || activeGame == false) {
                              return (
                                <td colSpan="4" style={{ padding: "60px" }}>
                                  Click The Game Name In the Table To see Your
                                  Picks
                                </td>
                              );
                            } else if (activeGame.entries == "#") {
                              return (
                                <td colSpan="4" style={{ padding: "60px" }}>
                                  <a>No Selections Made</a>
                                </td>
                              );
                            } else {
                              return (
                                <td colSpan="4" style={{ padding: "60px" }}>
                                  <a onClick={e => onButtonClick("Pick Teams")}>
                                    Click Here to Pick Teams
                                  </a>
                                </td>
                              );
                            }
                          })()}
                        </tr>
                      </tbody>
                    </>
                  );
                }
              })()}
            </table>
            {(() => {
              let obj = props.prizeTable.find(
                obj => obj.no_of_team == props.meta.myPicksCount
              );
              let currPrize = 0;
              if (obj) {
                currPrize = obj.prize;
              }
              if (activeGame && props.meta.myPicksCount > 0) {
                let obj = props.prizeTable.find(
                  obj => obj.no_of_team == props.meta.myPicksCount
                );
                let currPrize = 0;
                if (obj) {
                  currPrize = obj.prize;
                }
                var mTotlaScore = 0;
                props.liveScores.forEach(element => {
                  if (element.my_score == 1) {
                    mTotlaScore = mTotlaScore + 1;
                  }
                });
                var text = "";
                var addLink = false;
                if (props.meta.gameStatus == "FINISHED") {
                  if (props.meta.result == "WON") {
                    addLink = true;
                    text =
                      "Congratulations!! You won " +
                      (activeGame.prize_type == "cash"
                        ? "$" + props.meta.prize
                        : props.meta.prize + " Points") +
                      "!. Your account balance has been updated";
                  } else {
                    text = "Sorry, you did not win this time.";
                    addLink = true;
                  }
                } else {
                  text =
                    "You could win up to " +
                    (activeGame.prize_type == "cash"
                      ? "$" + currPrize
                      : currPrize + " Points") +
                    " " +
                    activeGame.gametype_prize_text;
                }
                return (
                  <div>
                    <center>
                      <img
                        className="game_summry_results_img"
                        src={require("./../../assets/images/game-center/win.png")}
                      />
                      <div className="game_summry_results_text">{text}</div>
                    </center>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

class GameCentral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      show: false,
      games: [],
      user: [],
      balance: [],
      balance: 0,
      liveScores: [],
      aciveFilters: ["", "", ""],
      prizeTable: [],
      meta: [],
      showDetails: false
    };
    this.onPickTeamsClicked = this.onPickTeamsClicked.bind(this);
    this.onPowerplayClicked = this.onPowerplayClicked.bind(this);
    this.onEnterMoreClicked = this.onEnterMoreClicked.bind(this);
    this.onGameNameClicked = this.onGameNameClicked.bind(this);
    this.onLiveScoreCliced = this.onLiveScoreCliced.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onLiveScoreCliced() {
    this.onPickTeamsClicked(
      activeGame.gametype_name,
      activeGame.stat_time,
      activeGame,
      activeText
    );
  }
  handleClose() {
    this.setState({
      show: false
    });
  }

  updateBalance = ball => {
    this.setState({ balance: ball });
  };

  handleShow() {
    this.setState({
      show: true
    });
  }
  onPickTeamsClicked(gametype, dateTime, game, action) {
    if (action == "Pick Teams" || action == "Edit Picks") {
      var path = "/select-teams-cta";
      if (gametype == "CTA") path = "/select-teams-cta";
      if (gametype == "Pick 5") path = "/select-teams-pick5";
      if (gametype == "Zones") path = "/select-teams-zones";
      if (gametype == "PowerPlay") path = "/select-teams-powerplay";
      if (gametype == "High 5") path = "/select-teams-high5";
      if (gametype == "Brackets") path = "/select-teams-brackets";

      if (dateTime == "Waiting For Players") {
        popupText =
          "Cannot perform action untill the required number of players join";
        popupHader = "Sorry!";
        this.handleShow();
        return;
      }
      this.props.history.push({
        pathname: path,
        state: {
          date: dateTime,
          gameData: game
        }
      });
    } else {
      this.props.history.push({
        pathname: "/livescore",
        state: {
          game: game,
          allGames: this.state.games
        }
      });
    }
  }
  onPowerplayClicked() {
    if (!activeGame) {
      popupText = "Please Select A Game To Edit";
      popupHader = "Sorry!";
      this.handleShow();
    } else {
      this.props.history.push({
        pathname: "/livescore",
        state: {
          score: this.state.liveScores,
          game: activeGame,
          prize: this.state.prizeTable,
          allGames: this.state.games,
          activeGameIndex: activeGameIndex
        }
      });
      activeGame = false;
    }
  }
  onEnterMoreClicked() {
    this.props.history.push({
      pathname: "/select-games"
    });
  }

  onGameNameClicked(index) {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    activeGame = this.state.games[index];
    activeGameIndex = index;
    var entry = this.state.games[index].id;
    var league = this.state.games[index].league_id;
    var that = this;
    fetch(
      "https://mypowerplaygames.com/public_api/entry/game_data.php?prize_id=" +
        activeGame.prize_id +
        "&jwt=" +
        jwt +
        "&entry=" +
        entry +
        "&league=" +
        league
    )
      .then(res => res.json())
      .then(
        result => {
          that.setState({
            prizeTable: result.prizes,
            liveScores: result.scores,
            meta: result.meta,
            showDetails: true
          });
        },
        error => {
          that.setState({
            error: error
          });
        }
      );
  }

  onFilterApplied(index, text) {
    var filters = this.state.aciveFilters.slice();
    filters[index] = text;
    this.setState({
      aciveFilters: filters
    });
  }
  onRightArrow() {
    var index = activeGameIndex;
    if (this.state.games.length - 1 == index) {
      index = 0;
    } else {
      index++;
    }

    this.onGameNameClicked(index);
  }
  onLeftArrow() {
    var index = activeGameIndex;
    if (index == 0) {
      index = this.state.games.length - 1;
    } else {
      index--;
    }

    this.onGameNameClicked(index);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    var that = this;
    window.addEventListener("click", function(e) {
      var mod = document.getElementById("details-modal");
      if (mod != null) {
        if (document.getElementById("details-modal").contains(e.target)) {
        } else {
          that.setState({
            showDetails: false
          });
        }
      }
    });
    fetch(
      "https://mypowerplaygames.com/public_api/entry/readmygames.php?jwt=" + jwt
    )
      .then(res => res.json())
      .then(
        xx => {
          console.log(xx.records);
          this.setState({
            games: xx.records,
            user: xx.user,
            balance: xx.balance
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }

  render() {
    totalWithOne = 0;
    this.state.liveScores.forEach(element => {
      if (element.my_score == 1) {
        totalWithOne = totalWithOne + 1;
      }
    });
    return (
      <div>
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

        <GameDetailsPopUp
          showSummry={this.state.showDetails}
          liveScores={this.state.liveScores}
          myPicksCount={this.state.meta.myPicksCount}
          prizeTable={this.state.prizeTable}
          meta={this.state.meta}
          buttonClick={this.onLiveScoreCliced}
        />

        <Header />
        <div>
          <div className="container-fluid game_center">
            <div className="container">
              <div className="game_center_user">
                <div className="game_center_user_name">
                  {this.state.user.dname}
                </div>
                <div className="game_center_user_date">
                  {"Member since " +
                    Date(this.state.user.join_date)
                      .toString()
                      .substr(4, 11)}
                </div>
              </div>
              <div className="game_center_first_row">
                <div className="game_center_first_row_item">
                  <center>
                    <div style={{ width: "155px", marginTop: "7px" }}>
                      <img
                        className="game_center_first_row_img"
                        src={require("./../../assets/images/game-center/group_21.png")}
                      />
                      <div className="game_center_item_details">
                        <div className="game_center_item_details_header">
                          {"$" + this.state.balance.cash}
                        </div>
                        <div className="game_center_item_details_sub">
                          Prizes Won
                        </div>
                      </div>
                    </div>
                  </center>
                </div>
                <div className="game_center_first_row_item">
                  <center>
                    <div style={{ width: "155px", marginTop: "7px" }}>
                      <img
                        className="game_center_first_row_img"
                        src={require("./../../assets/images/game-center/group_21_2.png")}
                      />
                      <div className="game_center_item_details">
                        <div className="game_center_item_details_header">
                          10,000
                        </div>
                        <div className="game_center_item_details_sub">
                          Pts Collected
                        </div>
                      </div>
                    </div>
                  </center>
                </div>
                <div className="game_center_first_row_item">
                  <center>
                    <div style={{ width: "155px", marginTop: "7px" }}>
                      <img
                        className="game_center_first_row_img"
                        src={require("./../../assets/images/game-center/group_21_3.png")}
                      />
                      <div className="game_center_item_details">
                        <div className="game_center_item_details_header">
                          Elite
                        </div>
                        <div className="game_center_item_details_sub">
                          Player Club
                        </div>
                      </div>
                    </div>
                  </center>
                </div>
                <button className="game_center_first_row_button">
                  Redeem Now!
                </button>
              </div>

              <div className="game_center_table_header">My Game Summary</div>
              <div className="row">
                <div className="col-md-12">
                  <div
                    // className={
                    //   (this.state.games.length > 5 ? "do-scroll " : "") +
                    //   "game_center_table"
                    // }
                    className="game_center_table"
                  >
                    <table className="game-center-table">
                      <tbody>
                        <tr>
                          <th>Game</th>
                          <th>
                            <div className="dropdown">
                              <span className="drop-tab" data-toggle="dropdown">
                                {this.state.aciveFilters[0] == ""
                                  ? "Game Type"
                                  : this.state.aciveFilters[0]}
                                <span className="caret" />
                              </span>
                              <ul className="dropdown-menu progrs-list">
                                <li>
                                  <a
                                    onClick={() => this.onFilterApplied(0, "")}
                                  >
                                    All
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.onFilterApplied(0, "Chase The Ace")
                                    }
                                  >
                                    Chase The Ace
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.onFilterApplied(0, "Pick 5")
                                    }
                                  >
                                    Pick 5
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.onFilterApplied(0, "High 5")
                                    }
                                  >
                                    High 5
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.onFilterApplied(0, "Powerplay")
                                    }
                                  >
                                    Powerplay
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.onFilterApplied(0, "Brackets")
                                    }
                                  >
                                    Brackets
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </th>
                          <th>
                            <div className="dropdown">
                              <span className="drop-tab" data-toggle="dropdown">
                                {this.state.aciveFilters[1] == ""
                                  ? "Status"
                                  : this.state.aciveFilters[1]}
                                <span className="caret" />
                              </span>
                              <ul className="dropdown-menu progrs-list">
                                <li>
                                  <a
                                    onClick={() => this.onFilterApplied(1, "")}
                                  >
                                    All
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.onFilterApplied(1, "In Progress")
                                    }
                                  >
                                    In Progress
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.onFilterApplied(1, "Not Started")
                                    }
                                  >
                                    Not Started
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.onFilterApplied(1, "Finished")
                                    }
                                  >
                                    Finished
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.onFilterApplied(1, "Archived")
                                    }
                                  >
                                    Archived
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </th>
                          <th>Start Date</th>
                          <th>Max Prize</th>
                          <th>Entries</th>
                          <th>
                            <div className="dropdown">
                              <span className="drop-tab" data-toggle="dropdown">
                                {this.state.aciveFilters[2] == ""
                                  ? "Action"
                                  : this.state.aciveFilters[2]}
                                <span className="caret" />
                              </span>
                              <ul className="dropdown-menu progrs-list">
                                <li>
                                  <a
                                    onClick={() => this.onFilterApplied(2, "")}
                                  >
                                    All
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.onFilterApplied(2, "Pick Teams")
                                    }
                                  >
                                    Pick Teams
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      this.onFilterApplied(2, "Edit Picks")
                                    }
                                  >
                                    Edit Picks
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </th>
                        </tr>
                        {this.state.games.map((data1, key) => {
                          var filters = this.state.aciveFilters.slice();

                          var shouldShowGame = true;
                          if (
                            filters[0] != "" &&
                            data1.gametype_name != filters[0]
                          ) {
                            shouldShowGame = false;
                          }
                          if (filters[1] != "" && data1.status != filters[1]) {
                            shouldShowGame = false;
                          }
                          if (filters[1] == "" && data1.status == "Archived") {
                            shouldShowGame = false;
                          }
                          if (filters[2] != "") {
                            if (
                              filters[2] == "Edit Picks" &&
                              !data1.has_picks
                            ) {
                              shouldShowGame = false;
                            }
                            if (filters[2] == "Pick Teams" && data1.has_picks) {
                              shouldShowGame = false;
                            }
                          }
                          if (shouldShowGame) {
                            var text = "";
                            if (data1.status == "Finished") {
                              text = "View Results";
                            } else {
                              if (data1.has_picks) {
                                text =
                                  data1.status == "In Progress"
                                    ? "Edit Scores"
                                    : "Edit Picks";
                              } else {
                                text = "Pick Teams";
                              }
                            }

                            return (
                              <tr key={key}>
                                <td>
                                  <a
                                    className="c-p"
                                    onClick={() => this.onGameNameClicked(key)}
                                  >
                                    {data1.name}
                                  </a>
                                </td>
                                <td>
                                  <p>{data1.gametype_name}</p>
                                </td>
                                <td>
                                  <p>{data1.status}</p>
                                </td>

                                <td>
                                  <p>{data1.stat_time}</p>
                                </td>
                                <td>
                                  <p>
                                    {data1.prize_type == "cash"
                                      ? "$" + data1.prize
                                      : data1.prize + " Pts."}
                                  </p>
                                </td>
                                <td>{data1.entries}</td>
                                <td>
                                  <div class="dropdown dropleft">
                                    <img
                                      class="btn btn-secondary dropdown-toggle"
                                     
                                      id="dropdownMenuButton"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      src={require("./../../assets/images/game-center/dots.png")}
                                    />
                                     
                                  
                                    <div
                                      class="dropdown-menu game_center_action_menu"
                                      aria-labelledby="dropdownMenuButton"
                                    >
                                      <div
                                        className="dropdown-item action_menu_item"
                                        onClick={() =>
                                          this.onPickTeamsClicked(
                                            data1.gametype_name,
                                            data1.stat_time,
                                            data1,
                                            "Edit Live Score"
                                          )
                                        }
                                      >
                                        <img
                                          className="action_menu_item_img"
                                          src={require("./../../assets/images/game-center/group_19.png")}
                                        />
                                        <div className="action_menu_item_text">
                                          Edit Live Scores
                                        </div>
                                      </div>

                                      <div
                                        className="dropdown-item action_menu_item"
                                        onClick={() =>
                                          this.onPickTeamsClicked(
                                            data1.gametype_name,
                                            data1.stat_time,
                                            data1,
                                            "Pick Teams"
                                          )
                                        }
                                      >
                                        <img
                                          className="action_menu_item_img"
                                          src={require("./../../assets/images/game-center/group_19_2.png")}
                                        />
                                        <div className="action_menu_item_text">
                                          Show my Picks
                                        </div>
                                      </div>

                                      <div
                                        className="dropdown-item action_menu_item"
                                        onClick={() =>
                                          this.onGameNameClicked(key)
                                        }
                                      >
                                        <img
                                          className="action_menu_item_img"
                                          src={require("./../../assets/images/game-center/group_19_3.png")}
                                        />
                                        <div className="action_menu_item_text">
                                          Show Game Summary
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <center>
                <button
                  onClick={this.onEnterMoreClicked}
                  className="game_center_more_games_button"
                >
                  Enter More Games
                </button>
              </center>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default withRouter(GameCentral);
