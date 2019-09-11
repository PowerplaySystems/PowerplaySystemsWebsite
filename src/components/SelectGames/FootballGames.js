import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import HowTo from "./HowToPlay";
import Rules from "./Rules";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import * as Constants from "./../common/constants";
import "./SelectGame.css";
var popupText = "Error";
var popupHader = "Sorry!";
class FootballGames extends Component {
  mEmail = "";
  mJwt = "";
  mPlayerID = "";

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      associations: [],
      allGames: [],
      howTo: [],
      rules: [],
      prizes: [],
      isHowToPlay: true,
      prize_id: 0,
      prize_type: "",
      modalIsOpen: false,
      enteredGames: [],
      entriesCounter: 0,
      min_teams_allowed: 0,
      max_teams_allowed: 0
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.enterGame = this.enterGame.bind(this);
    this.gotoGameCentral = this.gotoGameCentral.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.handleShowPrize = this.handleShowPrize.bind(this);
    this.handleClosePrize = this.handleClosePrize.bind(this);
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

  enterGame(id) {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    if (jwt == "" || jwt == undefined) {
      popupText = "Please Login First";
      popupHader = "Authentication Failed!";
      this.handleShow();
      this.goToLogin();
    } else {
      if (this.state.enteredGames.indexOf(id) == -1) {
        var x = this.state.enteredGames.slice();
        x.push(id);
        this.setState({
          enteredGames: x
        });
        var data = "game=" + id + "&jwt=" + jwt;
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        that = this;
        xhr.addEventListener("readystatechange", function() {
          if (this.readyState === 4) {
            if (~this.responseText.indexOf("Created")) {
              fetch(
                "https://www." + Constants.URL + "/api/select_game/read.php?id=4"
              )
                .then(res => res.json())
                .then(
                  result => {
                    result = result.records;

                    that.setState({
                      allGames: result
                    });
                  },
                  error => {
                    that.setState({
                      error: error
                    });
                  }
                );
            } else {
              popupText = "Something Went Wrong, Please Try Again";
              popupHader = "Sorry!";
              this.handleShow();
            }
          }
        });
        xhr.open(
          "POST",
          " https://www." + Constants.URL + "/public_api/entry/create.php"
        );
        xhr.setRequestHeader(
          "content-type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(data);
      } else {
      }
    }
  }
  gotoGameCentral() {
    this.props.history.push("../game-central");
  }
  goToLogin() {
    this.props.history.push("../login");
  }
  updateTabArrow(isHowToPlayOpen) {
    const topDiv = document.getElementById("games-table");
    if (topDiv) {
      topDiv.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    this.setState({ isHowToPlay: isHowToPlayOpen });
  }
  componentDidMount() {
    fetch("https://" + Constants.URL + "/public_api/association/read.php?id=4")
      .then(res => res.json())
      .then(
        dd => {
          this.setState({
            associations: dd.records
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
    fetch("https://www." + Constants.URL + "/api/select_game/read.php?id=4")
      .then(res => res.json())
      .then(
        result => {
          result = result.records;

          this.setState({
            allGames: result
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );

    fetch("https://www." + Constants.URL + "/api/select_game/readhow.php?id=4")
      .then(res => res.json())
      .then(
        dd => {
          this.setState({
            howTo: dd.records
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
    fetch("https://www." + Constants.URL + "/api/select_game/readrules.php?id=4")
      .then(res => res.json())
      .then(
        xx => {
          this.setState({
            isLoaded: true,
            rules: xx.records
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
    fetch("https://" + Constants.URL + "/api/prize/read.php")
      .then(res => res.json())
      .then(
        data => {
          data.records.sort(
            (a, b) => parseFloat(b.prize) - parseFloat(a.prize)
          );
          this.setState({
            prizes: data.records
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
    const cookies = new Cookies();
    const jwt = (this.mJwt = cookies.get("jwt"));
    if (jwt == undefined || jwt == "") {
    } else {
      fetch("https://" + Constants.URL + "/public_api/entry/read.php?jwt=" + jwt)
        .then(res => res.json())
        .then(
          xx => {
            this.setState({
              enteredGames: xx.records
            });
          },
          error => {
            this.setState({
              error: error
            });
          }
        );
    }
  }

  handleClosePrize() {
    this.setState({ showPrize: false });
  }

  handleShowPrize(pid, ptype, min, max) {
    this.setState({
      showPrize: true,
      prize_id: pid,
      prize_type: ptype,
      min_teams_allowed: min,
      max_teams_allowed: max
    });
  }
  render() {
    const { error, isLoaded, allGames, associations } = this.state;
    if (error) {
      return <div>Something went Wrong</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container-fluid p-o">
          <div className="game_prod_slide">
            <div className="container">
              <h5 style={{ textAlign: "center", marginBottom: "20px" }}>
                Click One of these Game Types To See Available Games
                <br /> In The table Below
              </h5>
              <div className="row">
                <div className="iner">
                  {this.state.associations.map((data, key) => (
                    <div className="col-sm-3 game-slide">
                      <a
                        onClick={e => this.updateTabArrow(true)}
                        href={"#hockey-game-" + key}
                        data-toggle="tab"
                      >
                        <img
                          src={
                            "http://" + Constants.URL + "/api/sport_league/get_image.php?id=" +
                            data.association_id +
                            "&type=image"
                          }
                          className="img-responsive"
                        />
                      </a>
                    </div>
                  ))}
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
                <table>
                  <thead>
                    <tr>
                      <th scope="col"> # of Teams </th>
                      <th scope="col">Prize</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.prizes.map((prize, key) => {
                      if (this.state.prize_id == prize.id) {
                        if (
                          prize.no_of_team >= this.state.min_teams_allowed &&
                          prize.no_of_team <= this.state.max_teams_allowed
                        ) {
                          return (
                            <tr className="prize-row" key={key}>
                              <td>
                                <p>{prize.no_of_team}</p>
                              </td>
                              <td>
                                <p>
                                  {this.state.prize_type == "cash"
                                    ? "$" + prize.prize
                                    : prize.prize + " Pts."}
                                </p>
                              </td>
                            </tr>
                          );
                        }
                      }
                    })}
                  </tbody>
                </table>
              }
            </Modal.Body>
          </Modal>

          <div className="tab-content" id="games-table">
            {this.state.associations.map((data, key) => (
              <div
                className={"tab-pane fade in " + (key == 0 ? "active" : "")}
                id={"hockey-game-" + key}
              >
                <div className="container-fluid games_tables">
                  <div className="container">
                    <div className="row">
                      {(() => {
                        let arr = this.state.allGames;

                        let obj = arr.find(
                          o => o.association_id == data.association_id
                        );
                        if (obj) {
                          return (
                            <div className="col-md-12">
                              <h1>
                                <span className="span1">-</span>
                                <span className="span2">{data.name}</span>
                                <span className="span1">-</span>
                              </h1>
                              <div>
                                <table>
                                  <thead>
                                    <tr>
                                      <th scope="col"> Game </th>
                                      <th scope="col">Start Date</th>
                                      <th scope="col">Top Prize</th>
                                      <th scope="col">Eligibility</th>
                                      <th scope="col">Entries</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.allGames.map((data1, key) => {
                                      if (
                                        data1.association_id ==
                                        data.association_id
                                      ) {
                                        return (
                                          <tr key={key}>
                                            <td>
                                              <p>{data1.name}</p>
                                            </td>
                                            <td>
                                              <p>{data1.game}</p>
                                            </td>
                                            <td>
                                              <p>
                                                <button
                                                  onClick={e =>
                                                    this.handleShowPrize(
                                                      data1.prize_id,
                                                      data1.prize_type,
                                                      data1.min_teams_allowed,
                                                      data1.max_teams_allowed
                                                    )
                                                  }
                                                  className="entries"
                                                >
                                                  {data1.prize_type == "cash"
                                                    ? "$" + data1.prize
                                                    : data1.prize + " Pts."}
                                                </button>
                                              </p>
                                            </td>
                                            <td>
                                              <p>{data1.eligibility}</p>
                                            </td>
                                            <td>
                                              <p>{data1.entries}</p>
                                            </td>
                                            <td data-label="Action">
                                              <button
                                                onClick={e =>
                                                  this.enterGame(data1.id)
                                                }
                                                className="entries"
                                              >
                                                {(() => {
                                                  if (
                                                    this.state.enteredGames.indexOf(
                                                      data1.id
                                                    ) > -1
                                                  ) {
                                                    return "Entered";
                                                  } else {
                                                    return "Enter";
                                                  }
                                                })()}
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    })}
                                  </tbody>
                                </table>
                              </div>
                              {(() => {
                                if (this.state.enteredGames.length > 0) {
                                  return (
                                    <button
                                      type="button"
                                      onClick={this.gotoGameCentral}
                                      className="gameButton entries "
                                    >
                                      View My Entered Games
                                    </button>
                                  );
                                } else {
                                  return "";
                                }
                              })()}
                            </div>
                          );
                        } else {
                          return (
                            <>
                              <h1>
                                <span className="span1">-</span>
                                <span className="span2">{data.name}</span>
                                <span className="span1">-</span>
                              </h1>
                              <h1>
                                <span className="span2">
                                  {data.no_game_text}
                                </span>
                              </h1>
                            </>
                          );
                        }
                      })()}
                    </div>
                  </div>
                </div>
                <div className="container-fluid how_game_sec">
                  <div className="container">
                    <div className="row">
                      <div className="col-xs-2" />
                      <div
                        className={
                          "col-xs-4 how_btn1 howbtn " +
                          (this.state.isHowToPlay ? "how_btn_active" : "")
                        }
                      >
                        <a
                          href={"#howto-hocky-" + data.association_id}
                          data-toggle="tab"
                        >
                          <button
                            className="btn1"
                            onClick={e => this.updateTabArrow(true)}
                          >
                            How to play?
                          </button>
                        </a>
                        <div class="up">
                          <div class="arrow-up" />
                        </div>
                      </div>
                      <div
                        className={
                          "col-xs-4 how_btn3 howbtn " +
                          (this.state.isHowToPlay ? "" : "how_btn_active")
                        }
                      >
                        <a
                          href={"#rule-hocky-" + data.association_id}
                          data-toggle="tab"
                        >
                          <button
                            className="btn3"
                            onClick={e => this.updateTabArrow(false)}
                          >
                            Game Rules
                          </button>
                        </a>
                        <div class="up">
                          <div class="arrow-up" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-content">
                  {(() => {
                    const howToPlayData = this.state.howTo.filter(
                      how => how.association_id == data.association_id
                    );
                    if (
                      howToPlayData == undefined ||
                      howToPlayData.length == 0
                    ) {
                      return "";
                    } else {
                      return <HowTo value={howToPlayData} />;
                    }
                  })()}
                  {(() => {
                    const howToPlayData = this.state.rules.filter(
                      how => how.association_id == data.association_id
                    );

                    if (
                      howToPlayData == undefined ||
                      howToPlayData.length == 0
                    ) {
                      return "";
                    } else {
                      return <Rules value={howToPlayData} />;
                    }
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default withRouter(FootballGames);
