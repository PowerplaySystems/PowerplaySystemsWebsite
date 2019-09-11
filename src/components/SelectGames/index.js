import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";
import $ from "jquery";
import "slick-carousel";
import Cookies from "universal-cookie";

import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
// import { connect } from 'react-redux';

var bgFirst = require("./../../assets/images/select-game/header.jpg");
var bg3 = require("./../../assets/images/select-game/row-3.jpg");

var pid, ptype, min, max;
var activeAssociation = -1;
var popupText = "Error";
var popupHader = "Sorry!";
var mGameTypeId = -1,
  mLeagueId = -1;
var mSportId = -1;
var enterGameId = -1;
var entryGame = [];
async function waiter() {}
var allSportsArray = [
  { id: 1, name: "Hockey" },
  { id: 2, name: "Baseball" },
  { id: 3, name: "Basketball" },
  { id: 4, name: "Football" }
];

let firstRowStyle = {
  backgroundImage: "url(" + bgFirst + ")",
  backgroundSize: "cover",
  overflow: "hidden",
  width: "100%",
  height: "751px"
};
let row3bg = {
  backgroundImage: "url(" + bg3 + ")",
  backgroundSize: "cover",
  overflow: "hidden",
  width: "100%",
  height: "961px",
  marginTop: "150px"
};

var Gametypes = props => {
  return (
    <a onClick={props.onClick}>
      <img
        src={
          "http://powerplaysystems.com/api/sport_league/get_image.php?id=" +
          props.data.association_id +
          "&type=image"
        }
        className={
          props.data.association_id == activeAssociation
            ? "game_type_img_selected"
            : "game_type_img "
        }
      />
    </a>
  );
};
function GamesTable(props) {
  //conponet funcitons
  function calculateMaxPrize(pid, ptype, max) {
    var text = "0.00";
    if (ptype == "items") {
      text = "View";
    } else {
      props.prizes.forEach(prize => {
        if (pid == prize.id) {
          if (prize.no_of_team == max) {
            text = ptype == "cash" ? "$" + prize.prize : prize.prize + " Pts.";
          }
        }
      });
    }

    return text;
  }
  function onPrizeClicked(mpid, mptype, mmin, mmax) {
    pid = mpid;
    ptype = mptype;
    min = mmin;
    max = mmax;

    props.onPrizeClick();
  }
  function onGameEntry(mGameId, game) {
    entryGame = game;
    enterGameId = mGameId;
    props.enterGameClicked();
  }
  //returning component
  return (
    <table className="games-table" id="m-table">
      <thead>
        <tr>
          <th scope="col"> Game Name </th>
          <th scope="col">Sponsored By</th>
          <th scope="col">Game Type</th>
          <th scope="col">Start Date</th>
          <th scope="col">Max Prize</th>
          <th scope="col">Eligibility</th>
          <th scope="col">Entries</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.allGames.map((data1, key) => {
          if (data1.association_id == props.data.association_id) {
            return (
              <tr key={key}>
                <td>
                  <p>{data1.name}</p>
                </td>
                <td>
                  <p>{data1.sponsor}</p>
                </td>
                <td>
                  <p>{data1.game_type}</p>
                </td>
                <td>
                  <p>{data1.game}</p>
                </td>
                <td>
                  <p>
                    <a
                      onClick={e =>
                        onPrizeClicked(
                          data1.prize_id,
                          data1.prize_type,
                          data1.min_teams_allowed,
                          data1.max_teams_allowed
                        )
                      }
                    >
                      {calculateMaxPrize(
                        data1.prize_id,
                        data1.prize_type,
                        data1.max_teams_allowed
                      )}
                    </a>
                  </p>
                </td>
                <td>
                  <p>{data1.eligibility}</p>
                </td>
                <td>
                  <p>{data1.entries}</p>
                </td>
                <td data-label="Action">
                  {(() => {
                    if (props.enteredGames.indexOf(data1.id) > -1) {
                      return (
                        <button
                          className="action-button"
                          onClick={() =>
                            props.myProp.history.push("/game-central")
                          }
                        >
                          View Entry
                        </button>
                      );
                    } else {
                      return (
                        <button
                          className="action-button"
                          onClick={e => onGameEntry(data1.id, data1)}
                        >
                          Enter
                        </button>
                      );
                    }
                  })()}
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
}

class SelectGames extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    // when user want to get specific game by url params
    let id = this.props.match.params.id;
    if (id && id > -1) {
      this.onTabClicked(id);
    } else {
      this.onTabClicked(1);
    }
    if (this.props.location.state != undefined) {
      let sport_id = this.props.location.state.sport;
      if (sport_id) {
        mGameTypeId = this.props.location.state.gametype;
        mLeagueId = this.props.location.state.league;
        this.onTabClicked(sport_id);
      }
    }

    this.fetchSport = this.fetchSport.bind(this);
  }
  goToLogin() {
    this.props.history.push("../login");
  }
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      activeTab: 0,
      associations: [],
      allGames: [],
      enteredGames: [],
      mAssociationId: -1,
      prizes: [],
      prize_id: 0,
      prize_type: "",
      max_teams_allowed: 0,
      min_teams_allowed: 0,
      showPrize: false,
      user: []
    };

    //alerts
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    //Prize Modal
    this.handleShowPrizeModal = this.handleShowPrizeModal.bind(this);
    this.handleClosPrizeModal = this.handleClosPrizeModal.bind(this);

    //On Enter Game
    this.enterGame = this.enterGame.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    //alerts Functions
  }

  //functions To Handle UI elements Clicks
  onGameTypeClicked(data) {
    const gameTable = document.getElementById("inner-tabs");
    if (gameTable) {
      gameTable.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    activeAssociation = data.association_id;

    this.setState(
      {
        mAssociationId: data
      },
      () => {
        mGameTypeId = -1;
      }
    );
  }
  onExploreGamesClicked() {
    const explore = document.getElementById("explore-games");
    if (explore) {
      explore.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }
  onTabClicked(index) {
    this.setState({
      activeTab: index
    });
    this.fetchSport(index);
  }

  //Fetch data for a perticular sport using ID
  fetchSport(id) {
    mSportId = id;
    const cookies = new Cookies();
    const jwt = (this.mJwt = cookies.get("jwt"));
    if (jwt == undefined || jwt == "") {
      Promise.all([
        fetch(
          "https://powerplaysystems.com/public_api/association/read.php?id=" +
            id
        ),
        fetch(
          "https://www.powerplaysystems.com/api/select_game/read.php?id=" + id
        ),
        fetch("https://powerplaysystems.com/api/prize/read.php")
      ])
        .then(([res1, res2, res3]) =>
          Promise.all([res1.json(), res2.json(), res3.json()])
        )
        .then(([data1, data2, data3]) => {
          data3.records.sort(
            (a, b) => parseFloat(b.prize) - parseFloat(a.prize)
          );
          this.setState(
            {
              associations: data1.records,
              allGames: data2.records,
              prizes: data3.records,
              isLoaded: true
            },
            () => {
              if (mGameTypeId != -1) {
                let obj = this.state.associations.find(
                  o => o.gametype_id == mGameTypeId && o.league_id == mLeagueId
                );
                if (obj) {
                  this.onGameTypeClicked(obj);
                }
              }
            }
          );
        });
    } else {
      Promise.all([
        fetch(
          "https://powerplaysystems.com/public_api/association/read.php?id=" +
            id
        ),
        fetch(
          "https://www.powerplaysystems.com/api/select_game/read.php?id=" + id
        ),
        fetch("https://powerplaysystems.com/api/prize/read.php"),
        fetch(
          "https://powerplaysystems.com/public_api/entry/read.php?jwt=" + jwt
        )
      ])
        .then(([res1, res2, res3, res4]) =>
          Promise.all([res1.json(), res2.json(), res3.json(), res4.json()])
        )
        .then(([data1, data2, data3, data4]) => {
          data3.records.sort(
            (a, b) => parseFloat(b.prize) - parseFloat(a.prize)
          );
          this.setState(
            {
              associations: data1.records,
              allGames: data2.records,
              prizes: data3.records,
              enteredGames: data4.records,
              user: data4.user,
              isLoaded: true
            },
            () => {
              if (mGameTypeId != -1) {
                let obj = this.state.associations.find(
                  o => o.gametype_id == mGameTypeId && o.league_id == mLeagueId
                );
                if (obj) {
                  this.onGameTypeClicked(obj);
                }
              }
            }
          );
        });
    }
  }
  //Modal Functions
  handleShowPrizeModal() {
    this.setState({
      showPrize: true,
      prize_id: pid,
      prize_type: ptype,
      min_teams_allowed: min,
      max_teams_allowed: max
    });
  }
  handleClosPrizeModal() {
    this.setState({ showPrize: false });
  }
  canEnter() {
    let eligibility = entryGame.eligibility;
    let club = this.state.user.club;
    if (club == null) {
      club = "basic";
    }
    if (entryGame.restriction.toUpperCase() == "ENTRY") {
      if (
        eligibility == null ||
        eligibility == undefined ||
        eligibility == "All"
      ) {
        return true;
      } else if (eligibility.toUpperCase() == "BASIC") {
        return true;
      } else if (eligibility.toUpperCase() == "ELITE") {
        if (club.toUpperCase == "BASIC") return false;
        return true;
      } else if (eligibility.toUpperCase() == "SUPER ELITE") {
        console.log(club);
        console.log(eligibility);
        if (club.toUpperCase() == "SUPER ELITE") return true;
        return false;
      }
    } else {
      return true;
    }
  }
  //enter A Game
  enterGame(id) {
    id = enterGameId;

    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    if (jwt == "" || jwt == undefined) {
      popupText = "Please Login First";
      popupHader = "Authentication Failed!";
      this.handleShow();
      this.goToLogin();
    } else {
      if (!this.canEnter()) {
        popupText =
          "You are not eligible to enter This game. Please Increase your points to upgrade your Club.";
        popupHader = "Sorry!";
        this.handleShow();
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
                that.fetchSport(mSportId);
              }
            }
          });
          xhr.open(
            "POST",
            " https://www.powerplaysystems.com/public_api/entry/create.php"
          );
          xhr.setRequestHeader(
            "content-type",
            "application/x-www-form-urlencoded"
          );
          xhr.send(data);
        } else {
          alert("Something iS wrong");
        }
      }
    }
  }

  //alert functions
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

  //render function
  render() {
    if (this.state.isLoaded) {
      $(".autoplay")
        .not(".slick-initialized")
        .slick({
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 1000
        });

      return (
        <div>
          <Header />

          <div className="container-fluid">
            <div className="content">
              <div className="select_game_top_row" style={firstRowStyle}>
                <center>
                  <div className="select_sport_heading">
                    POWERPLAY LIVE SPORTS
                  </div>
                  <div className="select_sport_icons_sport">
                    <div className="select_sport_icon">
                      <img
                        className="select_sport_icon_img"
                        src={require("./../../assets/images/select-game/nfl.png")}
                      />
                      <div className="select_sport_icon_text">NFL</div>
                    </div>
                    <div className="select_sport_icon">
                      <img
                        className="select_sport_icon_img"
                        src={require("./../../assets/images/select-game/nhl.png")}
                      />
                      <div className="select_sport_icon_text">NHL</div>
                    </div>
                    <div className="select_sport_icon">
                      <img
                        className="select_sport_icon_img"
                        src={require("./../../assets/images/select-game/nba.png")}
                      />
                      <div className="select_sport_icon_text">NBA</div>
                    </div>
                    <div className="select_sport_icon">
                      <img
                        className="select_sport_icon_img"
                        src={require("./../../assets/images/select-game/mlb.png")}
                      />
                      <div className="select_sport_icon_text">MLB</div>
                    </div>
                  </div>
                  <button
                    className="select_game_top_row_button"
                    onClick={this.onExploreGamesClicked}
                  >
                    Explore All Games
                  </button>
                </center>
              </div>
              <div className="select_game_row_2" id="explore-games">
                <center>
                  <div className="select_game_row_2_header">
                    EXPLORE OUR GAMES
                  </div>
                  <div className="select_game_row_2_sub">
                    1- Select a <span>Sport</span> to see game types
                  </div>
                  <div className="select_game_row_2_buttons_container">
                    {allSportsArray.map((sport, key) => (
                      <button
                        className={
                          this.state.activeTab == sport.id
                            ? "select_game_row_2_button_active"
                            : "select_game_row_2_button"
                        }
                        onClick={e => this.onTabClicked(sport.id)}
                      >
                        {sport.name}
                      </button>
                    ))}
                  </div>
                  <div className="select_game_row_2_sub">
                    2- Select <span>Game Type</span> to see available contests
                  </div>
                  <div className="iner" id="inner-tabs">
                    {this.state.associations.map((data, key) => (
                      <div className="col-sm-3 game-slide">
                        <Gametypes
                          data={data}
                          key={key}
                          onClick={() => this.onGameTypeClicked(data)}
                        />
                      </div>
                    ))}
                  </div>
                  {(() => {
                    let arr = this.state.allGames;

                    let obj = arr.find(
                      o =>
                        o.association_id ==
                        this.state.mAssociationId.association_id
                    );
                    if (obj) {
                      return (
                        <GamesTable
                          allGames={this.state.allGames}
                          data={this.state.mAssociationId}
                          prizes={this.state.prizes}
                          enteredGames={this.state.enteredGames}
                          onPrizeClick={this.handleShowPrizeModal}
                          myProp={this.props}
                          enterGameClicked={e => this.enterGame(obj)}
                        />
                      );
                    } else {
                      return (
                        <>
                          <h1>
                            <span className="span1">-</span>
                            <span className="span2">
                              {this.state.mAssociationId.name}
                            </span>
                            <span className="span1">-</span>
                          </h1>
                          <h1>
                            <span className="span2">
                              {this.state.mAssociationId.no_game_text}
                            </span>
                          </h1>
                        </>
                      );
                    }
                  })()}
                </center>
              </div>
              <div className="select_game_row_3" style={row3bg}>
                <center>
                  <div className="select_game_row_2_header">
                    PLAYING IS EASY
                  </div>
                </center>
                <div className="how_to_item how_to_item_1">
                  <img
                    className="how_to_item_img"
                    src={require("./../../assets/images/select-game/group_19.png")}
                  />
                   <div className="how_to_item_text">
                    <div className="how_to_item_header">
                      Enter a Sponsored Contest
                    </div>
                    <div className="how_to_item_sub">
                      See all prizes details on Explore games page
                    </div>
                  </div>
               
                </div>
                <div className="how_to_item how_to_item_2">
                  <img
                    className="how_to_item_img"
                    src={require("./../../assets/images/select-game/group_19_2.png")}
                  />
                     <div className="how_to_item_text">
                    <div className="how_to_item_header">Pick Teams</div>
                    <div className="how_to_item_sub">
                      Pick your teams on the Team Selection page
                    </div>
                  </div>
               
                </div>
                <div className="how_to_item how_to_item_3">
                  <img
                    className="how_to_item_img"
                    src={require("./../../assets/images/select-game/group_19_3.png")}
                  />
                     <div className="how_to_item_text">
                    <div className="how_to_item_header">
                      Manipulate Live Scores
                    </div>
                    <div className="how_to_item_sub">
                      Use your PowerPlays to change your teams score on Live
                      Score page.
                    </div>
                  </div>
               
                </div>
                <div className="how_to_item how_to_item_4">
                  <img
                    className="how_to_item_img"
                    src={require("./../../assets/images/select-game/group_19_4.png")}
                  />
                    <div className="how_to_item_text">
                    <div className="how_to_item_header">Win!</div>
                    <div className="how_to_item_sub">
                      Explore all games on the Explore Games page
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <center>
                  <div className="select_game_row_2_header">OUR GAMES</div>
                </center>
                <div className="autoplay mSlick">
                  <div>
                    <div className="our_games_item">
                      <div className="our_games_inner_leaf">High 5</div>
                      <div className="our_games_item_content">
                        <div className="our_games_item_header">
                          Choose 5 teams
                        </div>
                        <div className="our_games_item_sub">
                          you think will have the highest combined score
                        </div>
                        <img
                          className="our_games_item_img"
                          src={require("./../../assets/images/select-game/group_11.png")}
                        />
                        <button className="our_games_item_button">
                          Read more
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="our_games_item">
                      <div className="our_games_inner_leaf">Chase the Ace</div>
                      <div className="our_games_item_content">
                        <div className="our_games_item_header">
                          Choose 1 to 10 teams
                        </div>
                        <div className="our_games_item_sub">
                          you think will have a low final score
                        </div>
                        <img
                          className="our_games_item_img"
                          src={require("./../../assets/images/select-game/group_11.png")}
                        />
                        <button className="our_games_item_button">
                          Read more
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="our_games_item">
                      <div className="our_games_inner_leaf">Zones</div>
                      <div className="our_games_item_content">
                        <div className="our_games_item_header">Predict</div>
                        <div className="our_games_item_sub">
                          if final game score will land in one of our predefined
                          zones
                        </div>
                        <img
                          className="our_games_item_img"
                          src={require("./../../assets/images/select-game/group_11.png")}
                        />
                        <button className="our_games_item_button">
                          Read more
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="our_games_item">
                      <div className="our_games_inner_leaf">Pick 5</div>
                      <div className="our_games_item_content">
                        <div className="our_games_item_header">
                          Pick 5 teams
                        </div>
                        <div className="our_games_item_sub">
                          you think will have the highest combined score
                        </div>
                        <img
                          className="our_games_item_img"
                          src={require("./../../assets/images/select-game/group_11.png")}
                        />
                        <button className="our_games_item_button">
                          Read more
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> {popupHader} </Modal.Title>
            </Modal.Header>
            <Modal.Body dangerouslySetInnerHTML={{ __html: popupText }} />
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.showPrize} onHide={this.handleClosPrizeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Prizes</Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-body">
              {
                <table className="modal-prize-table">
                  <thead>
                    {this.state.prize_type == "items" ? (
                      <tr>
                        <th scope="col">Number of Teams</th>
                        <th scope="col">Prize Description</th>
                        <th scope="col">Retail Vaule</th>
                      </tr>
                    ) : (
                      <tr>
                        <th scope="col">Number of Teams</th>
                        <th scope="col">Prize</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {this.state.prize_type == "items" ? (
                      <>
                        {this.state.prizes.map((prize, key) => {
                          if (this.state.prize_id == prize.id) {
                            if (
                              prize.no_of_team >=
                                this.state.min_teams_allowed &&
                              prize.no_of_team <= this.state.max_teams_allowed
                            ) {
                              return (
                                <tr className="prize-row" key={key}>
                                  <td>
                                    <p>{prize.no_of_team}</p>
                                  </td>
                                  <td>
                                    <p>{prize.description}</p>
                                  </td>
                                  <td>
                                    <p>
                                      {this.state.prize_type == "points"
                                        ? prize.prize + " Pts."
                                        : "$" + prize.prize}
                                    </p>
                                  </td>
                                </tr>
                              );
                            }
                          }
                        })}
                      </>
                    ) : (
                      <>
                        {" "}
                        {this.state.prizes.map((prize, key) => {
                          if (this.state.prize_id == prize.id) {
                            if (
                              prize.no_of_team >=
                                this.state.min_teams_allowed &&
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
                      </>
                    )}
                  </tbody>
                </table>
              }
            </Modal.Body>
          </Modal>
        </div>
      );
    } else {
      return (
        <>
          <Header />
        </>
      );
    }
  }
}

export default withRouter(SelectGames);
