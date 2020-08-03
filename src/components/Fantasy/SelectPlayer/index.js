import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../../common/Header";
import Footer from "./../../common/Footer";
import DrawTimer from "./../../common/DrawTimer";
import "./../../common/constants.js";
import "./index.css";
import * as Constants from "./../../common/constants";
import Cookies from "universal-cookie";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import { map } from "rxjs-compat/operator/map";
var popupText = "Error";
var popupHader = "Sorry!";
var tabs = [
  "CENTER",
  "LEFT WING",
  "RIGHT WING",
  "DEFENCE",
  "GOALIE",
  "STAR PLAYER"
];
var players = [
  {
    id: "0",
    vs: "Totonto Maple Leafs",
    name: "Connor McDavid",
    score: 4,
    myScore: 5,
    text: "Starting",
    team: "Chicago Blackhawks",
    type: "CENTER",
    g: 1,
    a: 3
  },
  {
    id: "1",
    vs: "Totonto Maple Leafs",
    name: "John Taveres",
    text: "Bench",
    score: 1,
    myScore: 0,
    type: "CENTER",
    team: "Calgary Flames",
    g: 1,
    a: 0
  },
  {
    id: "2",
    vs: "Totonto Maple Leafs",
    name: "Brent Burns",
    score: 0,
    text: "Starting",
    myScore: 0,
    type: "CENTER",
    team: "Toronto Maple Leaf",
    g: 0,
    a: 0
  },
  {
    id: "3",
    vs: "Totonto Maple Leafs",
    text: "Bench",
    name: "John Carlson",
    score: 2,
    myScore: 4,
    type: "LEFT WING",
    team: "NY Rangers",
    g: 1,
    a: 1
  },
  {
    id: "4",
    vs: "Totonto Maple Leafs",
    text: "Starting",
    name: "Winnipeg Jets",
    score: -1,
    myScore: 0,
    type: "LEFT WING",
    team: "Chicago redbulls",
    g: 1,
    a: 0
  },
  {
    id: "5",
    vs: "Totonto Maple Leafs",
    text: "Bench",
    name: "Sidney Crosby",
    team: "Chicago Blackhawks",
    type: "GOALIE",
    g: 1,
    a: 0,
    score: 1,
    myScore: 0
  },
  {
    id: "5",
    vs: "Totonto Maple Leafs",
    text: "Bench",
    name: "Nathan Macn",
    team: "Chicago Blackhawks",
    type: "RIGHT WING",
    g: 1,
    a: 0,
    score: 1,
    myScore: 0
  },
  ,
  {
    id: "5",
    vs: "Auston Matthews",
    text: "Bench",
    name: "Nathan Macn",
    team: "Chicago Blackhawks",
    type: "DEFENCE",
    g: 1,
    a: 0,
    score: 1,
    myScore: 0
  }
];
class FantasySelectPlayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: "",
      isLoaded: false,
      show: false,
      showPrize: false,
      tabIndex: 0,
      selectedTeams: [],
      benchPlayers: [],
      gameData: {
        id: "222",
        max_teams_allowed: "8",
        min_teams_allowed: "1"
      }
    };
    this.onAddClicked = this.onAddClicked.bind(this);
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.onAddBench = this.onAddBench.bind(this);
  }
  componentDidMount() {
    this.setState({
      isLoaded: true
    });
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

  onTabClicked(index) {
    this.setState({
      tabIndex: index
    });
  }
  onAddClicked(item) {
    var newTeams = [...this.state.selectedTeams];
    newTeams.push(item);
    this.setState({
      selectedTeams: newTeams
    });
  }
  onDeleteClicked(item) {
    var filtered = this.state.selectedTeams.filter(function(el) {
      return el.name != item.name;
    });
    this.setState({
      selectedTeams: filtered
    });
  }
  onAddBench(e, item) {
    if (e.target.checked) {
      var newTeams = [...this.state.benchPlayers];
      newTeams.push(item);
      this.setState({
        benchPlayers: newTeams
      });
    } else {
      var filtered = this.state.benchPlayers.filter(function(el) {
        return el.name != item.name;
      });
      this.setState({
        benchPlayers: filtered
      });
    }
  }

  componentPlayerBox(item) {
    return (
      <div className="fantasy_player_box">
        <div className="fantasy_player_box_row1">
          <div className="player_box_row1_text">{item.name}</div>
          <div
            className="player_box_header_img_btn"
            onClick={e => this.onAddClicked(item)}
          ></div>
        </div>
        <div className="fantasy_player_box_row2">
          <div className="player_box_row2_text1">{item.team}</div>
          <div className="player_box_row2_text2">Pts: 12</div>
          <div className="player_box_row2_text3">
            {"G:" + item.g + "  A:" + item.a}
          </div>
        </div>
        <div className="player_box_divider"></div>
        <div className="player_box_row3">
          <div className="player_box_row3_text1">VS.</div>
          <div className="player_box_row3_text2">{item.vs}</div>
        </div>
        <div className="player_box_row4">
          <div className="player_box_row4_item">
            <img
              className="select_team_box_inner_bottom_img"
              src={require("./../../../assets/images/select_team/clock.png")}
            />
            <div className="select_team_box_inner_bottom_text">01:07 PM</div>
          </div>
          <div className="player_box_row4_item">
            <img
              className="select_team_box_inner_bottom_img"
              src={require("./../../../assets/images/select_team/calendar.png")}
            />
            <div className="select_team_box_inner_bottom_text">2019-07-28</div>
          </div>
          <div className="player_box_row4_item">
            <img
              className="select_team_box_inner_bottom_img"
              src={require("./../../../assets/images/select_team/stadium.png")}
            />
            <div className="select_team_box_inner_bottom_text">
              Citizens Bank Park
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentPlayerBoxActive(item) {
    return (
      <div className="fantasy_player_box box_active">
        <div className="fantasy_player_box_row1">
          <div className="player_box_row1_text">{item.name}</div>
          <div className="player_box_header_img_btn"></div>
          <div className="player_box_header_text2">Added</div>
          <div
            className="player_box_header_icon_del"
            onClick={e => this.onDeleteClicked(item)}
          ></div>
          <div className="player_box_header_text3">Bench Player</div>
          <label class="switch">
            <input type="checkbox" onChange={e => this.onAddBench(e, item)} />
            <span class="slider round"></span>
          </label>
        </div>
        <div className="fantasy_player_box_row2">
          <div className="player_box_row2_text1">{item.team}</div>
          <div className="player_box_row2_text2">Pts: 12</div>
          <div className="player_box_row2_text3">
            {"G:" + item.g + "  A:" + item.a}
          </div>
        </div>
        <div className="player_box_divider"></div>
        <div className="player_box_row3">
          <div className="player_box_row3_text1">VS.</div>
          <div className="player_box_row3_text2">{item.vs}</div>
        </div>
        <div className="player_box_row4">
          <div className="player_box_row4_item">
            <img
              className="select_team_box_inner_bottom_img"
              src={require("./../../../assets/images/select_team/clock.png")}
            />
            <div className="select_team_box_inner_bottom_text">01:07 PM</div>
          </div>
          <div className="player_box_row4_item">
            <img
              className="select_team_box_inner_bottom_img"
              src={require("./../../../assets/images/select_team/calendar.png")}
            />
            <div className="select_team_box_inner_bottom_text">2019-07-28</div>
          </div>
          <div className="player_box_row4_item">
            <img
              className="select_team_box_inner_bottom_img"
              src={require("./../../../assets/images/select_team/stadium.png")}
            />
            <div className="select_team_box_inner_bottom_text">
              Citizens Bank Park
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentTab(index) {
    return (
      <div
        className={
          "select_player_tab " +
          (index == this.state.tabIndex ? "tab_active" : "")
        }
        onClick={e => this.onTabClicked(index)}
      >
        {tabs[index]}
      </div>
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
        <DrawTimer/>
        <div className="page_main">
          <div className="">
            <div className="select_game_description">
              Sponsored by: &nbsp; &nbsp; &nbsp;
              <img
                className="select_teams_sponsor_img"
                src={require("./../../../assets/images/logo.png")}
              />
              <div className="select_teams_game_title">
                Summer Fantasy Battle
              </div>
              <div className="select_teams_game_time">
                Game Set Start Date&nbsp;
                <span>10 Jan 2019, 7:19 PM</span>
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
                Pick players that you think will have the highest points
              </p>
              <div className="select_player_row">
                <div className="select_player_box_header">
                  <div className="select_player_tabs">
                    {tabs.map((element, index) => {
                      return this.componentTab(index);
                    })}
                  </div>
                  <div className="select_player_search_wrapper">
                    <input
                      className="select_player_search"
                      type="text"
                      placeholder="Search by player name …"
                    />
                  </div>
                </div>
                <div className="select_player_box_teams">
                  {players.map(element => {
                    let obj = this.state.selectedTeams.find(
                      o => o.id === element.id
                    );
                    if (element.type == tabs[this.state.tabIndex]) {
                      if (obj) {
                        return this.componentPlayerBoxActive(element);
                      } else {
                        return this.componentPlayerBox(element);
                      }
                    } else {
                      return "";
                    }
                  })}
                </div>
                <MySelections
                  teams={this.state.selectedTeams}
                  onClickClose={this.onDeleteClicked}
                  gameData={this.state.gameData}
                  tab={this.state.tabIndex}
                  benchPlayers={this.state.benchPlayers}
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
      //if MLB
      return this.pageForMLB();
    } else {
      return "Loading";
    }
    return <>Hi</>;
  }
}
var MySelections = props => {
  function passClick(id) {
    props.onClickClose(id);
  }
  function componentPlayer(team, key) {
    var abbrev = team.type.match(/\b([A-Z])/g).join("");
    return (
      <div className="selected_player_main">
        <div className="selected_player_type">{abbrev}</div>
        <div className="selected_player_box">
          {team.name}
          <a onClick={() => passClick(team)} class="close-thin" />
        </div>
      </div>
    );
  }
  function componentPlayerBench(team, key) {
    var abbrev = team.type.match(/\b([A-Z])/g).join("");
    return (
      <div className="selected_player_main type_small">
        <div className="selected_player_type">
          {"Bench " + (key + 1) + "(" + abbrev + ")"}
        </div>
        <div className="selected_player_box">
          {team.name}
          <a onClick={() => passClick(team)} class="close-thin" />
        </div>
      </div>
    );
  }
  if (props.teams.length > 0) {
    return (
      <div className="select_player_box_details">
        <center>
          <div className="selected_player_wrapper">
            {props.teams.map((team, key) => {
              return componentPlayer(team, key);
            })}
          </div>
          <div className="selected_player_dvider"></div>
          <>
            {props.benchPlayers.map((team, key) => {
              return componentPlayerBench(team, key);
            })}
          </>
          <div className="total_teams_selected_info">
            {props.teams.length + " Players(s) Selected"}
          </div>
          <div className="max_teams_selected_info">
            {props.teams.length == props.gameData.max_teams_allowed
              ? "Maximum Teams Selected"
              : "Maximum Teams = " + props.gameData.max_teams_allowed}
          </div>

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
      <div className="select_player_box_details">
        <center>
          <div className="no_teams_selected_wrapper">
            <img
              src={require("./../../../assets/images/select_team/check.png")}
              className="img-responsive"
            />
            <div className="selected_teams_info">
              Your selected teams will appear here{" "}
            </div>
            <div className="total_teams_selected_info">
              {props.teams.length + " Teams Selected"}
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

export default withRouter(FantasySelectPlayers);
