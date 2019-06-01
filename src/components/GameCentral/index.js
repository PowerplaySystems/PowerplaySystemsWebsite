import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import Invertory from "./../common/inventory";
import "./index.css";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import Cookies from "universal-cookie";

var activeGame = false;
var activeGameIndex = 0;

var popupText = "Error";
var popupHader = "Sorry!";

var totalWithOne = 0;
class GameCentral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      show: false,
      games: [],
      balance: 0,
      liveScores: [],
      aciveFilters: ["", "", ""],
      prizeTable: [],
      meta: []
    };
    this.onPickTeamsClicked = this.onPickTeamsClicked.bind(this);
    this.onPowerplayClicked = this.onPowerplayClicked.bind(this);
    this.onEnterMoreClicked = this.onEnterMoreClicked.bind(this);
    this.onGameNameClicked = this.onGameNameClicked.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
          this.setState({
            prizeTable: result.prizes,
            liveScores: result.scores,
            meta: result.meta
          });
        },
        error => {
          this.setState({
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
    
    fetch(
      "https://mypowerplaygames.com/public_api/entry/readmygames.php?jwt=" + jwt
    )
      .then(res => res.json())
      .then(
        xx => {
          console.log(xx.records);
          this.setState({
            games: xx.records
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
        <Header />
        <div>
          <div className="container-fluid game_center">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1>
                    Power<span>Play</span> Game Centre
                  </h1>
                  <h2>My Game Summary</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div
                    className={
                      (this.state.games.length > 5 ? "do-scroll " : "") +
                      "game_center_table"
                    }
                  >
                    <table>
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
                                  <a
                                    className="c-p"
                                    onClick={() =>
                                      this.onPickTeamsClicked(
                                        data1.gametype_name,
                                        data1.stat_time,
                                        data1,
                                        text
                                      )
                                    }
                                  >
                                    {text}
                                  </a>
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
            </div>
          </div>
          <div className="container-fluid cta_wki">
            <div className="container">
              <div className="row top-text">
                {(() => {
                  if (activeGame) {
                    return (
                      <div className="row game-name-header">
                        <div className="game-arrow-wraper game-arrow-left">
                          <a onClick={() => this.onLeftArrow("r")}>
                            <img
                              src={require("./../../assets/images/swap/main-prev.png")}
                              className="game-arrow img-responsive"
                            />
                          </a>
                        </div>
                        <h1 className="game-name">{activeGame.name}</h1>
                        <div className="game-arrow-wraper game-arrow-right">
                          <a onClick={() => this.onRightArrow("r")}>
                            <img
                              src={require("./../../assets/images/swap/main-next.png")}
                              className="game-arrow img-responsive"
                            />
                          </a>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="row game-name-header">
                        <h1 className="game-name">{activeGame.name}</h1>
                      </div>
                    );
                  }
                })()}
              </div>
              <div className="row">
                <div className="col-md-7">
                  <div className="cta_wki_table">
                    <table>
                      {(() => {
                        if (this.state.meta.myPicksCount > 0) {
                          return (
                            <tbody>
                              <tr>
                                <th>Team</th>
                                <th>Live Score</th>
                                <th>My Score</th>
                              </tr>
                              {this.state.liveScores.map((item, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{item.name}</td>
                                    <td>{item.status}</td>
                                    <td>{item.my_score}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          );
                        } else {
                          return (
                            <tbody>
                              <tr>
                                <th>Team</th>
                                <th>Live Score</th>
                                <th>My Score</th>
                              </tr>
                              <tr>
                                {(() => {
                                  if (activeGame == [] || activeGame == false) {
                                    return (
                                      <td
                                        colSpan="3"
                                        style={{ padding: "60px" }}
                                      >
                                        Click The Game Name In the Table Above
                                        To see Your Picks
                                      </td>
                                    );
                                  } else if (activeGame.entries == "#") {
                                    return (
                                      <td
                                        colSpan="3"
                                        style={{ padding: "60px" }}
                                      >
                                        <a>No Selections Made</a>
                                      </td>
                                    );
                                  } else {
                                    return (
                                      <td
                                        colSpan="3"
                                        style={{ padding: "60px" }}
                                      >
                                        <a
                                          onClick={() =>
                                            this.onPickTeamsClicked(
                                              activeGame.gametype_name,
                                              activeGame.stat_time,
                                              activeGame,
                                              "Pick Teams"
                                            )
                                          }
                                        >
                                          Click Here to Pick Teams
                                        </a>
                                      </td>
                                    );
                                  }
                                })()}
                              </tr>
                            </tbody>
                          );
                        }
                      })()}
                    </table>
                  </div>
                </div>
                <Invertory
                  showMore={false}
                  onBalanceUpdate={this.updateBalance}
                />
              </div>
            </div>
            <div className="container-fluid current_score_game">
              <div className="container">
                {(() => {
                  let obj = this.state.prizeTable.find(
                    obj => obj.no_of_team == this.state.meta.myPicksCount
                  );
                  let currPrize = 0;
                  if (obj) {
                    currPrize = obj.prize;
                  }
                  if (activeGame && this.state.meta.myPicksCount > 0) {
                    let obj = this.state.prizeTable.find(
                      obj => obj.no_of_team == this.state.meta.myPicksCount
                    );
                    let currPrize = 0;
                    if (obj) {
                      currPrize = obj.prize;
                    }
                    var mTotlaScore = 0;
                    this.state.liveScores.forEach(element => {
                      if (element.my_score == 1) {
                        mTotlaScore = mTotlaScore + 1;
                      }
                    });
                    var text = "";
                    var addLink = false;
                    if (this.state.meta.gameStatus == "FINISHED") {
                      if (this.state.meta.result == "WON") {
                        addLink = true;
                        text =
                          "Congratulations!! You won " +
                          (activeGame.prize_type == "cash"
                            ? "$" + this.state.meta.prize
                            : this.state.meta.prize + " Points") +
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
                      <div className="row">
                        <div className="col-md-12">
                          <h1>
                            Teams Selected:{" "}
                            <span>{this.state.meta.myPicksCount}</span> | Teams
                            With 1 Run: <span>{totalWithOne}</span>
                          </h1>
                          <h2>
                            <span className="fa fa-info-circle infobtn" />{" "}
                            {text}
                            <br />
                            {addLink ? (
                              <a onClick={e => this.onPowerplayClicked()}>
                                Click here to view results{" "}
                              </a>
                            ) : (
                              ""
                            )}
                          </h2>
                        </div>
                      </div>
                    );
                  }
                })()}
                <div class="left-score">
                  <div class="m-balance row">
                    <div className="col-md-3" />
                    <div className="col-md-3">
                      <div className="balance-label-wraper">
                        <span>My $ Balance</span>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <a
                        onClick={() =>
                          this.props.history.push("/my-account/my-balance")
                        }
                      >
                        <button>
                          {"$" +
                            (this.state.balance == null
                              ? "0"
                              : this.state.balance)}
                        </button>
                      </a>
                    </div>
                    <div className="col-md-3" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <a>
                      <button onClick={e => this.onEnterMoreClicked()}>
                        Enter More Games
                      </button>
                    </a>
                  </div>
                  <div className="col-sm-6">
                    <a>
                      <button onClick={e => this.onPowerplayClicked()}>
                        Edit Live Scores
                      </button>
                    </a>
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

export default withRouter(GameCentral);
