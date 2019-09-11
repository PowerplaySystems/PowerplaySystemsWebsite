import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";
import "slick-carousel";
import * as Constants from "./../common/constants";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
// import { connect } from 'react-redux';

var bgFirst = require("./../../assets/images/live_sports/live_sports_platform.jpg");
var bg3 = require("./../../assets/images/select-game/row-3.jpg");

var pid, ptype, min, max;
var activeAssociation = -1;
var popupText = "Error";
var popupHader = "Sorry!";

var mSportId = -1;
var enterGameId = -1;
var entryGame = [];

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
  height: "573px"
};
let row3bg = {
  backgroundImage: "url(" + bg3 + ")",
  backgroundSize: "cover",
  overflow: "hidden",
  width: "100%",
  height: "961px",
  marginTop: "150px"
};

class SelectGames extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  goToSelectGames(sport, leagues, gametype) {
    console.log("Hi");
    let path = "/select-games";
    this.props.history.push({
      pathname: path,
      state: {
        league: leagues,
        gametype: gametype,
        sport: sport
      }
    });
  }
  goToLogin() {
    this.props.history.push("../login");
  }
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      activeTab: 0
    };

    //alerts
    this.goToSelectGames = this.goToSelectGames.bind(this);
  }

  //functions To Handle UI elements Clicks

  onExploreGamesClicked() {
    const explore = document.getElementById("explore-games_live");
    if (explore) {
      explore.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  //render function
  render() {
    return (
      <div>
        <Header />

        <div className="container-fluid">
          <div className="content">
            <div className="select_game_top_row" style={firstRowStyle}>
              <center>
                <div className="live_sport_heading">POWERPLAY LIVE SPORTS</div>
                <div className="select_sport_heading_sub">
                  Interactive games covering all major North American Sports
                  leagues
                </div>
                <button
                  className="select_game_top_row_button"
                  onClick={this.onExploreGamesClicked}
                >
                  Explore All Games
                </button>
              </center>
            </div>
            <div className="lotto-section-2-heading">
              <p>
                {" "}
                Imagine being able to change your sports selections
                <span> LIVE during the draw!</span>
              </p>
              <div className="lotto-section-2-heading-note">
                Utilizing our revolutionary interactive live sports platform,
                you can do just that! Try one of our Demo games below or enter
                one of our promotional contests (coming soon).
              </div>
              <div className="lotto-section-2-heading-pointer">
                <img
                  src={require("./../../assets/images/lotto/group.png")}
                  className="img-responsive"
                />
              </div>
            </div>
            <div className="live_sports_heading">The Magic of Power Plays!</div>
            <div className="live_sports_sub_heading">
              All of our exciting interactive games utilize powerplays to help
              you win!
            </div>
            <div className="live_sports_powerplays">
              <div className="live_sports_powerplay_item">
                <center>
                  <img
                    className="live_sports_powerplay_item_img"
                    src={require("./../../assets/images/live_sports/replace.png")}
                  />
                </center>

                <div className="live_sports_powerplay_item_name">
                  Swap Teams
                </div>
                <div className="live_sports_powerplay_item_details">
                  Drop and add selections in real time during the event!
                </div>
              </div>
              <div className="live_sports_powerplay_item">
                <center>
                  <img
                    className="live_sports_powerplay_item_img"
                    src={require("./../../assets/images/live_sports/add.png")}
                  />
                </center>

                <div className="live_sports_powerplay_item_name">
                  Increase / decrease scores
                </div>
                <div className="live_sports_powerplay_item_details">
                  Don’t like the score… you have the power to change it!
                </div>
              </div>
              <div className="live_sports_powerplay_item">
                <center>
                  <img
                    className="live_sports_powerplay_item_img"
                    src={require("./../../assets/images/live_sports/undo.png")}
                  />
                </center>

                <div className="live_sports_powerplay_item_name">
                  Undo Action
                </div>
                <div className="live_sports_powerplay_item_details">
                  in case you make a mistake, you have the power to undo!
                </div>
              </div>
              <div
                className="live_sports_powerplay_item"
                style={{ marginLeft: "245px" }}
              >
                <center>
                  <img
                    className="live_sports_powerplay_item_img"
                    src={require("./../../assets/images/live_sports/lock.png")}
                  />
                </center>

                <div className="live_sports_powerplay_item_name">
                  Lock Score
                </div>
                <div className="live_sports_powerplay_item_details">
                  You can lock in a teams score regardless of what the final
                  score turns out to be.
                </div>
              </div>
              <div className="live_sports_powerplay_item">
                <center>
                  <img
                    className="live_sports_powerplay_item_img"
                    src={require("./../../assets/images/live_sports/11.png")}
                  />
                </center>

                <div className="live_sports_powerplay_item_name">
                  11 to 1 / 1 to 11
                </div>
                <div className="live_sports_powerplay_item_details">
                  Make an 11 = 1 (good for CHASE THE ACE) or make a 1 into an 11
                  (good for High 5)
                </div>
              </div>
            </div>
            <div className="live_sports_heading" id="explore-games_live">
              Our Games
            </div>
            <div className="live_sports_game_light_bg">
              <center>
                <div className="live_sports_game_name">CHASE THE ACE</div>
                <div className="live_sports_game_desc">
                  An exciting game where players try to <br />
                  <span>pick 1 to 10 low scoring teams</span> to win!
                </div>
                <div className="live_sports_game_try">
                  Try now by choosing a sport
                </div>
                <div className="live_sports_game_tabs">
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.HOCKEY_ID,
                        Constants.LEAGUE_ID_NHL,
                        Constants.GAMETYPE_ID_CTA
                      )
                    }
                    src={require("./../../assets/images/live_sports/nhl_cta.png")}
                  />
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.BASEBALL_ID,
                        Constants.LEAGUE_ID_MLB,
                        Constants.GAMETYPE_ID_CTA
                      )
                    }
                    src={require("./../../assets/images/live_sports/mlb_cta.png")}
                  />
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.BASKETBALL_ID,
                        Constants.LEAGUE_ID_NBA,
                        Constants.GAMETYPE_ID_CTA
                      )
                    }
                    src={require("./../../assets/images/live_sports/nba_cta.png")}
                  />
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.FOOTBALL_ID,
                        Constants.LEAGUE_ID_NFL,
                        Constants.GAMETYPE_ID_CTA
                      )
                    }
                    src={require("./../../assets/images/live_sports/nfl_cta.png")}
                  />
                </div>
              </center>
            </div>
            <div className="live_sports_game_dark_bg">
              <center>
                <div className="live_sports_game_name">ZONES</div>
                <div
                  className="live_sports_game_desc"
                  style={{ height: "116px", width: "582px" }}
                >
                  An exciting game where players try to pick
                  <br />
                  <span>a final score range for 1 to 10 teams</span> <br />
                  You choose how hard you want to make it!
                  <s>*Score ranges vary by sport.</s>
                </div>
                <div className="live_sports_game_try">
                  Try now by choosing a sport
                </div>
                <div className="live_sports_game_tabs">
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.HOCKEY_ID,
                        Constants.LEAGUE_ID_NHL,
                        Constants.GAMETYPE_ID_ZONES
                      )
                    }
                    src={require("./../../assets/images/live_sports/nhl_zones.png")}
                  />
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.BASEBALL_ID,
                        Constants.LEAGUE_ID_MLB,
                        Constants.GAMETYPE_ID_ZONES
                      )
                    }
                    src={require("./../../assets/images/live_sports/mlb_zones.png")}
                  />
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.BASKETBALL_ID,
                        Constants.LEAGUE_ID_NBA,
                        Constants.GAMETYPE_ID_ZONES
                      )
                    }
                    src={require("./../../assets/images/live_sports/nba_zones.png")}
                  />
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.FOOTBALL_ID,
                        Constants.LEAGUE_ID_NFL,
                        Constants.GAMETYPE_ID_ZONES
                      )
                    }
                    src={require("./../../assets/images/live_sports/nfl_zones.png")}
                  />
                </div>
              </center>
            </div>
          </div>
          <div className="live_sports_game_light_bg">
            <center>
              <div className="live_sports_game_name">HIGH 5</div>
              <div
                className="live_sports_game_desc"
                style={{ height: "116px", width: "714px" }}
              >
                An exciting game where you <br />
                <span>
                  pick 5 teams you think will have the highest combined score!
                </span>
                <br /> You choose how hard you want to make it! <br />
              </div>
              <div className="live_sports_game_try">
                Try now by choosing a sport
              </div>
              <div className="live_sports_game_tabs">
                <img
                  onClick={() =>
                    this.goToSelectGames(
                      Constants.HOCKEY_ID,
                      Constants.LEAGUE_ID_NHL,
                      Constants.GAMETYPE_ID_HIGH5
                    )
                  }
                  src={require("./../../assets/images/live_sports/nhl_high5.png")}
                />
                <img
                  onClick={() =>
                    this.goToSelectGames(
                      Constants.BASEBALL_ID,
                      Constants.LEAGUE_ID_MLB,
                      Constants.GAMETYPE_ID_HIGH5
                    )
                  }
                  src={require("./../../assets/images/live_sports/mlb_high5.png")}
                />
                <img
                  onClick={() =>
                    this.goToSelectGames(
                      Constants.BASKETBALL_ID,
                      Constants.LEAGUE_ID_NBA,
                      Constants.GAMETYPE_ID_HIGH5
                    )
                  }
                  src={require("./../../assets/images/live_sports/nba_high5.jpg")}
                />
                <img
                  onClick={() =>
                    this.goToSelectGames(
                      Constants.FOOTBALL_ID,
                      Constants.LEAGUE_ID_NFL,
                      Constants.GAMETYPE_ID_HIGH5
                    )
                  }
                  src={require("./../../assets/images/live_sports/nfl_high5.jpg")}
                />
              </div>
            </center>
          </div>
          <div className="live_sports_game_dark_bg">
            <center>
              <div className="live_sports_game_name">PICK 5</div>
              <div
                className="live_sports_game_desc"
                style={{ height: "93px", width: "582px" }}
              >
                An exciting game where you <br />
                <span>pick 5 teams to make poker-like hands!</span>
                <br />
                Can you get a high straight?
              </div>
              <div className="live_sports_game_try">
                Try now by choosing a sport
              </div>
              <div className="live_sports_game_tabs tab_smaller">
                <img
                  onClick={() =>
                    this.goToSelectGames(
                      Constants.HOCKEY_ID,
                      Constants.LEAGUE_ID_NHL,
                      Constants.GAMETYPE_ID_ZONES
                    )
                  }
                  src={require("./../../assets/images/live_sports/nhl_pick5.png")}
                />
                <img
                  onClick={() =>
                    this.goToSelectGames(
                      Constants.BASEBALL_ID,
                      Constants.LEAGUE_ID_MLB,
                      Constants.GAMETYPE_ID_ZONES
                    )
                  }
                  src={require("./../../assets/images/live_sports/mlb_pick5.png")}
                />
              </div>
            </center>
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
      </div>
    );
  }
}

export default withRouter(SelectGames);
