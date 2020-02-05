import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import DrawTimer from "./../common/DrawTimer";
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
    document.getElementsByTagName("META")[2].content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
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
    //this.props.history.push("../login");
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
  componentWillUnmount() {
    document.getElementsByTagName("META")[2].content = "width=1400";
  }
  //render function
  render() {
    return (
      <div>
        <Header />
        <DrawTimer />
        <div className="container-fluid">
          <div className="container-fluid">
            <div className="select_game_top_row" style={firstRowStyle}>
              <center>
                <div className="live_sport_heading">POWERPLAY LIVE SPORTS</div>
                <div className="select_sport_heading_sub">
                  Our interactive platform covers all major North American
                  Sports Leagues
                </div>
                <button
                  className="select_game_top_row_button"
                  onClick={this.onExploreGamesClicked}
                >
                  Demo Coming Soon
                </button>
              </center>
            </div>
            <div className="lotto-why-us">
              <div>
                <img
                  src={require("./../../assets/images/live_sports/laptop.png")}
                  className="img-responsive sport-laptop"
                />
                <div className="lotto-why-us-right">
                  <div className="lotto-why-us-right-header">
                    Why Choose Us ?
                  </div>
                  <div className="lotto-why-us-bullet">
                    <div className="bullet-number">01</div>
                    <div className="bullet-text">
                      The PowerPlay platform delivers a solution that changes
                      the way your customers are engaged.
                    </div>
                  </div>
                  <div className="lotto-why-us-bullet">
                    <div className="bullet-number">02</div>
                    <div className="bullet-text">
                      We bring a whole new level of excitement to Sports based
                      games with the ability to manipulate results in real time.
                    </div>
                  </div>
                  <div className="lotto-why-us-bullet">
                    <div className="bullet-number">03</div>
                    <div className="bullet-text">
                      It's not just an interactive platform but also an
                      integrated marketing system that can be used to steer
                      consumer behavior.
                    </div>
                  </div>
                  <button
                    onClick={() => this.props.history.push("/partner")}
                    className="lotto-button-partner orange"
                  >
                    Partner With Us
                  </button>
                  <p className="lotto-why-us-note">
                    Or you can contact us to{" "}
                    <span onClick={() => this.props.history.push("/partner")}>
                      request an on-site demo
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="lotto-industries">
              <div className="lotto-industries-header">Industries We Serve</div>
              <div className="lotto-industries-items-wrapper">
                <div className="lotto-industries-item">
                  <img
                    src={require("./../../assets/images/live_sports/group_2.png")}
                    className="img-responsive lotto-industries-icon"
                  />
                  <div className="lotto-industries-item-header">
                    Legal Sports Betting
                  </div>
                  <div className="lotto-industries-item-text">
                    Do you offer legal sports betting? Contact us to learn how
                    we can increase revenue.
                  </div>
                </div>
                <div className="lotto-industries-item">
                  <img
                    src={require("./../../assets/images/live_sports/group_2_2.png")}
                    className="img-responsive lotto-industries-icon"
                  />
                  <div className="lotto-industries-item-header">
                    Fantasy Sports
                  </div>
                  <div className="lotto-industries-item-text">
                    Do you offer legal fantasy sports games? Contact us to
                    create a whole new revenue stream.
                  </div>
                </div>
                <div className="lotto-industries-item">
                  <img
                    src={require("./../../assets/images/live_sports/group_2_3.png")}
                    className="img-responsive lotto-industries-icon"
                  />
                  <div className="lotto-industries-item-header">
                    Promotional Contests
                  </div>
                  <div className="lotto-industries-item-text">
                    Offering a free fantasy sports experience on your website
                    guarantees return visits. Partner with us and watch sales
                    take off!
                  </div>
                </div>
              </div>
              <div className="live-sports-industries-buttons-wrapper">
                <button
                  onClick={() => this.props.history.push("/partner")}
                  className="lotto-button-partner big orange"
                >
                  Partner With Us
                </button>
                <button
                  className="lotto-button-try big"
                  onClick={this.goToDemo}
                >
                  Demo Coming Soon
                </button>
              </div>
              <p className="lotto-industries-note">
                Or you can contact us to{" "}
                <span onClick={() => this.props.history.push("/partner")}>
                  request an on-site demo
                </span>
              </p>
            </div>
            <div className="live-sports-gt">
              <div className="live-sports-gt-header">
                Sports Based Experiences
                <br />
                <span>
                  Experiences can by fully integrated with your existing website
                </span>
              </div>

              <div className="live-sports-gt-header-text">
                Based on Team Results
              </div>
              <div className="live-sports-gt-divider"></div>
              <div className="live-sports-gt-items-wrapper">
                <div className="live-sports-gt-item">
                  <div className="live-sports-gt-item-header">Zones</div>
                  <div className="live-sports-gt-item-text">
                    Players Pick teams whose final score will fall in a
                    pre-determined range.
                  </div>
                </div>
                <div className="live-sports-gt-item">
                  <div className="live-sports-gt-item-header big">
                    Chase The Ace
                  </div>
                  <div className="live-sports-gt-item-text">
                    Players Pick teams whose final score is equal to 1
                  </div>
                </div>
                <div className="live-sports-gt-item">
                  <div className="live-sports-gt-item-header">High 5</div>
                  <div className="live-sports-gt-item-text">
                    Players Pick 5 teams and sum total scores, highest wins.
                  </div>
                </div>
                <div className="live-sports-gt-item">
                  <div className="live-sports-gt-item-header">Pick 5</div>
                  <div className="live-sports-gt-item-text">
                    Players pick 5 teams whose final scores will make poker like
                    hands.
                  </div>
                </div>
              </div>
              <div className="live-sports-gt-header-text">
                Based on Player Results
              </div>
              <div className="live-sports-gt-divider"></div>
              <div className="live-sports-pr-item-wapper">
                <div className="live-sports-pr-item">
                  <div className="live-sports-pr-item-header">
                    Interactive Fantasy Games
                  </div>
                  <div className="live-sports-pr-item-text">
                    Players pick their teams and use Powerplays to manage their
                    line-up live during the big game.
                  </div>
                </div>
              </div>
              <div className="live-sports-gt-header-text">
                Event Based Contests
              </div>
              <div className="live-sports-gt-divider"></div>
              <div className="live-sports-pr-item-wapper">
                <div className="live-sports-pr-item">
                  <div className="live-sports-pr-item-header">
                    One Time Events
                  </div>
                  <div className="live-sports-pr-item-text">
                    Power Draft - Players try to pick the correct draft order for
                    Round 1 to win!
                  </div>
                </div>
              </div>
              <div className="live-sports-gt-buttons-wapper">
                <button
                  onClick={() => this.props.history.push("/partner")}
                  className="live-sports-gt-button orange"
                >
                  Partner With Us
                </button>
                <button
                  className="live-sports-gt-button transparent"
                  onClick={this.goToDemo}
                >
                  Demo Coming Soon
                </button>
              </div>
              <p className="lotto-industries-note">
                Or you can contact us to{" "}
                <span onClick={() => this.props.history.push("/partner")}>
                  request an on-site demo
                </span>
              </p>
            </div>
            <div className="live-sports-adventures">
              <div className="lotto-adventures-header">
                The powerplay Advantage!{" "}
              </div>
              <div className="live-sports-adventures-note">
                The core advantage of our platform is the Live Interaction!
                <br />
                Players <span>edit </span>live results (using Powerplays) to
                adjust ‘My Scores’.
                <br />
                They can swap out teams/players, increase/decrease scores, lock
                scores, etc.
              </div>
              <div className="lotto-adventures-items-wrapper">
                <div className="lotto-adventures-item">
                  <img
                    src={require("./../../assets/images/lotto/correct.png")}
                    className="img-responsive lotto-adventures-icon"
                  />
                  <div className="lotto-adventures-item-text">
                    Powerplays are odds levers.
                  </div>
                </div>
                <div className="lotto-adventures-item">
                  <img
                    src={require("./../../assets/images/lotto/correct.png")}
                    className="img-responsive lotto-adventures-icon"
                  />
                  <div className="lotto-adventures-item-text">
                    Ad revenue – eyes on screen.
                  </div>
                </div>
                <div className="lotto-adventures-item">
                  <img
                    src={require("./../../assets/images/lotto/correct.png")}
                    className="img-responsive lotto-adventures-icon"
                  />
                  <div className="lotto-adventures-item-text">
                    Powerplays can drive consumer behavior
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="lotto-section-2-heading">
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
            </div> */}
            <div className="live_sports_heading">How Does It Work ?</div>
            <div className="live_sports_sub_heading_2">
              Winners are determined based on each players{" "}
              <span>edited picks. </span>
              Players can <span>edit </span> their selections using Powerplays.
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
              <div className="live_sports_powerplay_item">
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
            <center>
              <div className="lotto-boost">
                <div className="lotto-boost-header">
                  Ready to boost your business ?
                </div>
                <div className="live-sports-boost-buttons">
                  <button
                    onClick={() => this.props.history.push("/partner")}
                    className="lotto-button-partner big white"
                  >
                    Partner With Us
                  </button>
                  <button
                    className="lotto-button-try big white"
                    onClick={this.goToDemo}
                  >
                    Demo Coming Soon
                  </button>
                </div>
                <div className="lotto-boost-note">
                  Or you can contact us to{" "}
                  <span onClick={() => this.props.history.push("/partner")}>
                    request an on-site demo
                  </span>
                </div>
              </div>
            </center>
            {/* <div className="live_sports_heading" id="explore-games_live">
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
            <div className="live_sports_game_light_bg">
              <center>
                <div className="live_sports_game_name">Draft Day</div>
                <div
                  className="live_sports_game_desc"
                  style={{ height: "93px", width: "582px" }}
                >
                  An exciting game where you <br />
                  <span>Pick the exact draft order for Round 1!</span>
                  <br />
                  Are you smarter than Draft Central?
                </div>
                <div className="live_sports_game_try">
                  Try now by choosing a sport
                </div>
                <div className="live_sports_game_tabs tab_medium">
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.HOCKEY_ID,
                        Constants.LEAGUE_ID_NHL,
                        Constants.GAMETYPE_ID_DRAFT_DAY
                      )
                    }
                    src={require("./../../assets/images/live_sports/nhl_draft.png")}
                  />
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.BASEBALL_ID,
                        Constants.LEAGUE_ID_NBA,
                        Constants.GAMETYPE_ID_DRAFT_DAY
                      )
                    }
                    src={require("./../../assets/images/live_sports/nba_draft.png")}
                  />
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.BASEBALL_ID,
                        Constants.LEAGUE_ID_NFL,
                        Constants.GAMETYPE_ID_DRAFT_DAY
                      )
                    }
                    src={require("./../../assets/images/live_sports/nfl_draft.png")}
                  />
                </div>
              </center>
            </div>
            <div className="live_sports_game_dark_bg">
              <center>
                <div className="live_sports_game_name">Powerplay Fantasy</div>
                <div
                  className="live_sports_game_desc"
                  style={{ height: "93px", width: "582px" }}
                >
                  An exciting Fantasy game where you <br />
                  <span>Manage your players in real time!</span>
                  <br />
                  Can you coach your team to to be the best?
                </div>
                <div className="live_sports_game_try">
                  Try now by choosing a sport
                </div>
                <div className="live_sports_game_tabs tab_medium">
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.HOCKEY_ID,
                        Constants.LEAGUE_ID_NHL,
                        Constants.GAMETYPE_ID_POWERPLAY
                      )
                    }
                    src={require("./../../assets/images/live_sports/nhl_powerplay.png")}
                  />
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.BASEBALL_ID,
                        Constants.LEAGUE_ID_MLB,
                        Constants.GAMETYPE_ID_POWERPLAY
                      )
                    }
                    src={require("./../../assets/images/live_sports/mlb_powerplay.png")}
                  />
                  <img
                    onClick={() =>
                      this.goToSelectGames(
                        Constants.BASEBALL_ID,
                        Constants.LEAGUE_ID_NBA,
                        Constants.GAMETYPE_ID_POWERPLAY
                      )
                    }
                    src={require("./../../assets/images/live_sports/nba_powerplay.png")}
                  />
                </div>
              </center>
            </div> */}
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
