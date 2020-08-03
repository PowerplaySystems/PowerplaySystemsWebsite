import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../../common/Header";
import Footer from "./../../common/Footer";
import DrawTimer from "./../../common/DrawTimer";
import "./../../common/constants.js";
import "./index.css";
import * as Constants from "./../../common/constants";
import * as TeamComponent from "./../../LiveScore/team";
import Cookies from "universal-cookie";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
var popupText = "Error";
var popupHader = "Sorry!";
var players = [
  {
    id: "0",

    name: "Connor McDavid",
    score: 4,
    myScore: 5,
    text: "Starting",
    team: "Chicago Blackhawks",
    g: 1,
    a: 3
  },
  {
    id: "1",
    name: "John Taveres",
    text: "Bench",
    score: 1,
    myScore: 0,
    team: "Calgary Flames",
    g: 1,
    a: 0
  },
  {
    id: "2",
    name: "Brent Burns",
    score: 0,
    text: "Starting",
    myScore: 0,
    team: "Toronto Maple Leaf",
    g: 0,
    a: 0
  },
  {
    id: "3",
    text: "Bench",
    name: "John Carlson",
    score: 2,
    myScore: 4,
    team: "NY Rangers",
    g: 1,
    a: 1
  },
  {
    id: "4",
    text: "Starting",
    name: "Winnipeg Jets",
    score: -1,
    myScore: 0,
    team: "Chicago redbulls",
    g: 1,
    a: 0
  }
];
var powerplays = [];
class FantasyLive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: "",
      isLoaded: false
    };
  }

  componentHeader() {
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="select_game_description">
            Sponsored by: &nbsp; &nbsp; &nbsp;
            <img
              className="select_teams_sponsor_img"
              src={require("./../../../assets/images/live_sports/Logo.png")}
            />
            <div className="select_teams_game_title">NHL Fantasy Week</div>
            <div className="select_teams_game_time">Game Set Started&nbsp;</div>
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
        </div>
      </div>
    );
  }
  componentLiveScores() {
    return (
      <div className="fantasy_live_scores">
        <div className="fantasy_live_scores_heading">Live Scores</div>
        <div className="fantasy_live_scores_main">
          {this.componetPosition("C")}
          {this.componetPosition("D2")}
          {this.componetPosition("G")}
        </div>
      </div>
    );
  }
  componetPosition(name) {
    var index1, index2;
    if (name == "C") {
      index1 = 0;
      index2 = 1;
    }
    if (name == "D2") {
      index1 = 2;
      index2 = 3;
    }
    if (name == "G") {
      index1 = 4;
      index2 = 4;
    }
    return (
      <div className="fantasy_score_match_details_box">
        <div className="fantasy_score_match_status">{name}</div>
        <div className="fantasy_score_match_details_top">
          <div className="fantasy_scor_match_details_left">
            {this.componentTeam(
              players[index1].name,
              players[index1].team,
              players[index1].score,
              players[index1].myScore,
              players[index1].text,
              players[index1].g,
              players[index1].a
            )}
          </div>

          <div className="fantasy_scor_match_details_right">
            {this.componentTeam(
              players[index2].name,
              players[index2].team,
              players[index2].score,
              players[index2].myScore,
              players[index2].text,
              players[index2].g,
              players[index2].a
            )}
          </div>
        </div>
      </div>
    );
  }
  componentTeam(name, team, score, myScore, header, g, a) {
    return (
      <>
        {" "}
        <div className="fantasy_score_match_details_heading">{header}</div>
        <div className="fantasy_score_match_details_top_row">
          <div className="fantasy_score_match_details_team_name">{name}</div>
          <div className="fantasy_score_match_details_team_score">{score}</div>
        </div>
        <div className="fantasy_score_match_details_second_row">
          vs
          <div className="fantasy_score_team">{team}</div>
          <div className="fantasy_score_player_details">
            {"G" + g}
            <span> {"A" + a}</span>
          </div>
        </div>
        <div className="fantasy_score_match_details_row3">
          <div className="fantasy_live_powerplay fantsy_powerplay_1"></div>
          <div className="fantasy_live_powerplay fantsy_powerplay_2"></div>
          <div className="fantasy_live_powerplay fantsy_powerplay_3"></div>
          <div className="fantasy_score_match_details_my_score_wrapper">
            <div className="fantasy_score_match_details_my_score_txt">
              My
              <br /> Score
            </div>
            <span className="fantasy_score_match_details_my_score">
              {myScore}
            </span>
          </div>
        </div>
        <div className="fantasy_score_match_details_row4">
          <div className="fantasy_details_row4_item">
            <div className="fantasy_details_row4_item_img">
              <img
                src={require("./../../../assets/images/select_team/clock.png")}
              />
            </div>
            <div className="fantasy_details_row4_item_text">Game started</div>
          </div>
          <div className="fantasy_details_row4_item">
            <div className="fantasy_details_row4_item_img">
              <img
                src={require("./../../../assets/images/select_team/calendar.png")}
              />
            </div>
            <div className="fantasy_details_row4_item_text">2019-07-28</div>
          </div>
          <div className="fantasy_details_row4_item">
            <div className="fantasy_details_row4_item_img">
              <img
                src={require("./../../../assets/images/select_team/stadium.png")}
              />
            </div>
            <div className="fantasy_details_row4_item_text">
              Citizens Bank Park
            </div>
          </div>
        </div>
      </>
    );
  }
  componentPlayerScore(pos, name, score) {
    return (
      <div className="fantasy_live_player_score_wrapper">
        <div className="fantasy_live_player_score_text1">{pos}</div>
        <div className="fantasy_live_player_score_score_box">
          <div className="fantasy_live_player_score_text2">{name}</div>
          <div className="fantasy_live_player_score_text3">{score}</div>
        </div>
      </div>
    );
  }
  componentMyScores() {
    return (
      <div className="fantasy_my_scores">
        <div className="fantasy_my_scores_heading">
          <div className="fantasy_live_scores_heading_text1">My Scores</div>
          <div className="fantasy_live_scores_heading_text2">12</div>
        </div>
        <div className="fantasy_my_scores_main">
          {this.componentPlayerScore("C", players[0].name, players[0].myScore)}
          {this.componentPlayerScore("LW", "Alex Ovechkin", "2")}
          {this.componentPlayerScore("RW", "Nikita Kucherov", "0")}
          {this.componentPlayerScore("D1", "Erik Karlsson", "0")}
          {this.componentPlayerScore("D2", players[2].name, players[2].myScore)}
          {this.componentPlayerScore("G", "Nikita Kucherov", "0")}
          {this.componentPlayerScore(
            "Bench 1",
            players[1].name,
            players[1].myScore
          )}
          {this.componentPlayerScore(
            "Bench 2",
            players[3].name,
            players[3].myScore
          )}
          {this.componentPlayerScore("Bench 3", "Erik Karlsson", "2")}
        </div>
      </div>
    );
  }
  componentMyInventory() {
    return (
      <div className="fantasy_live_invetory">
        <div className="fantasy_live_invetory_heading">
          My Powerplays Inventory
        </div>
        <div className="fantasy_live_invetory_main">
          <div className="fantasy_live_powerplay_item_1">
            <div className="fantasy_live_powerplay_item_img"></div>
            <div className="fantasy_live_powerplay_item_number">3</div>
            <div className="fantasy_live_powerplay_item_name"> Star Power</div>
          </div>
          <div className="fantasy_live_powerplay_item_2">
            <div className="fantasy_live_powerplay_item_img"></div>
            <div className="fantasy_live_powerplay_item_number">1</div>
            <div className="fantasy_live_powerplay_item_name"> Double</div>
          </div>
          <div className="fantasy_live_powerplay_item_3">
            <div className="fantasy_live_powerplay_item_img"></div>
            <div className="fantasy_live_powerplay_item_number">2</div>
            <div className="fantasy_live_powerplay_item_name"> Triple</div>
          </div>
          <div className="fantasy_live_powerplay_item_4">
            <div className="fantasy_live_powerplay_item_img"></div>
            <div className="fantasy_live_powerplay_item_number">3</div>
            <div className="fantasy_live_powerplay_item_name"> Swap</div>
          </div>
          <div className="fantasy_live_powerplay_item_5">
            <div className="fantasy_live_powerplay_item_img"></div>
            <div className="fantasy_live_powerplay_item_number">1</div>
            <div className="fantasy_live_powerplay_item_name"> 6th Staker</div>
          </div>
          <div className="fantasy_live_powerplay_item_6">
            <div className="fantasy_live_powerplay_item_img"></div>
            <div className="fantasy_live_powerplay_item_number">3</div>
            <div className="fantasy_live_powerplay_item_name"> Powerplay</div>
          </div>
          <div className="fantasy_live_powerplay_item_7">
            <div className="fantasy_live_powerplay_item_img"></div>
            <div className="fantasy_live_powerplay_item_number">3</div>
            <div className="fantasy_live_powerplay_item_name"> No Goal</div>
          </div>
        </div>
      </div>
    );
  }
  componentInventoryItem() {
    return <div className="fantasy_live_powerplay_item"></div>;
  }
  render() {
    return (
      <>
       <Header />
        <DrawTimer/>
        <div className="container-fluid p-o">
          {this.componentHeader()}
          <div className="fantasy-live-main">
            {this.componentLiveScores()}
            <div className="fantasy_live_main_right">
              {this.componentMyScores()}
              {this.componentMyInventory()}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(FantasyLive);
