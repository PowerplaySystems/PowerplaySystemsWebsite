import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../../common/Header";
import Footer from "./../../common/Footer";
import $ from "jquery";
import "./../../common/constants.js";
import "./index.css";
import * as Constants from "./../../common/constants";
import Cookies from "universal-cookie";
import * as Functions from "../../common/functions";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
var popupText = "Error";
var popupHader = "Sorry!";

var prizeArray = [
  {
    id: 1,
    hits: 32,
    prize: 25000
  },
  {
    id: 2,
    hits: 31,
    prize: 1000
  },
  {
    id: 1,
    hits: 30,
    prize: 500
  },
  {
    id: 1,
    hits: 29,
    prize: 200
  },
  {
    id: 1,
    hits: 28,
    prize: 100
  }
];
var powerplaysArray = [
  {
    id: Constants.DRAFT_POWERPLAY_UP,
    name: "up",
    amount: 10
  },
  {
    id: Constants.DRAFT_POWERPLAY_DOWN,
    name: "down",
    amount: 10
  },
  {
    id: Constants.DRAFT_POWERPLAY_SWAP,
    name: "swap",
    amount: 10
  },
  {
    id: Constants.DRAFT_POWERPLAY_UNDO,
    name: "undo",
    amount: 10
  }
];

var liveDrawData = [];
var swapElement = null;
var swapConfirmElement = null;

//FOR UNDO FUNCTION
var lastDataState = null;
var lastPowerplayState = null;
var lastPoweplayid = null;

class DraftDayLive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: "",
      data: [],
      isLoaded: false,
      prizes: prizeArray,
      showPrize: false,
      entry_id: false,
      orignal_data: [],
      showSwapDialog: false,
      totalMatched: 0
    };
  }
  ////////////////////////////////////////////
  /////////////PAGE COMPONENTS///////////////
  ///////////////////////////////////////////

  componentButton() {
    return (
      <button
        onClick={() =>
          this.props.history.push({
            pathname: "/draft-day-teams"
          })
        }
        className="nfl-draft-draft_day_heading_button1"
      >
        {this.state.entry_id ? "View My Mock Draft Selections" : "Enter Now!"}
      </button>
    );
  }

  componentPrizeModal() {
    return (
      <Modal show={this.state.showPrize} onHide={e => this.handleClosePrize()}>
        <Modal.Header closeButton>
          <Modal.Title>Prizes</Modal.Title>
          <div className="nfl-draft-prize-note">
            *Note: All Prizes Will be divided equally among Winners
          </div>
        </Modal.Header>
        <Modal.Body className="nfl-draft-grid-body">
          {
            <table className="nfl-draft-modal-prize-table">
              <thead>
                <tr>
                  <th scope="col"> Matches </th>
                  <th scope="col"> Prize </th>
                </tr>
              </thead>
              <tbody>
                {this.state.prizes.map((prize, key) => {
                  return (
                    <tr className="nfl-draft-prize-row" key={key}>
                      <td>
                        <p> {prize.hits} </p>
                      </td>
                      <td>
                        <p>{"$" + Functions.numberWithCommas(prize.prize)}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        </Modal.Body>
      </Modal>
    );
  }
  componentBottom() {
    return (
      <>
        <div className="draft_day_text6">
          No purchase necessary. Contest closes at 11:59pm ET on April 27, 2020.
          Open to residents of Canada (excluding Quebec) and United States who
          are over the age of majority.
        </div>
        <div className="draft_day_text7">
          Registration and full contest rules <a>here</a>
        </div>
        <div className="draft_day_bottom_box">
          <ul className="draft_day_list">
            <li>
              {" "}
              Five (5) prizes to be won. See full rules for complete details of
              all prizes.
            </li>
            <li> One entry per person.</li>
            <li>
              {" "}
              Odds of winning depend on player knowledge and use of Powerplays.
            </li>
            <li> Skill-testing question must be correctly answered to win.</li>
          </ul>
        </div>
        <br />
        {/* <button
          className="draft_day_buton2"
          onClick={e => this.handleShowPrize()}
        >
          View All Prizes
        </button> */}
      </>
    );
  }
  componentInventory() {
    return (
      <div className="nfl-draft-powerplay">
        <div className="nfl-draft-section-heading">Powerplay Inventory</div>
        <div className="nfl-draft-inventory-content">
          <div className="inventory-item-wrapper">
            <img
              src={require("../../../assets/images/draft_day/up-active.png")}
              className="nfl-draft-powerplay-icon"
            />
            <span className="nfl-draft-powerplay-amount">
              {this.getPowerplayAmount(Constants.DRAFT_POWERPLAY_UP)}
            </span>
            <div className="nfl-draft-Move">Move Up</div>
          </div>
          <div className="inventory-item-wrapper">
            <img
              src={require("../../../assets/images/draft_day/down-active.png")}
              className="nfl-draft-powerplay-icon"
            />
            <span className="nfl-draft-powerplay-amount">
              {" "}
              {this.getPowerplayAmount(Constants.DRAFT_POWERPLAY_DOWN)}
            </span>
            <div className="nfl-draft-Move">Move Down</div>
          </div>
          <div className="inventory-item-wrapper">
            <img
              src={require("../../../assets/images/draft_day/swap.png")}
              className="nfl-draft-powerplay-icon"
            />
            <span className="nfl-draft-powerplay-amount">
              {" "}
              {this.getPowerplayAmount(Constants.DRAFT_POWERPLAY_SWAP)}
            </span>
            <div className="nfl-draft-Move">Swap</div>
          </div>
          <div className="inventory-item-wrapper">
            <img
              src={require("../../../assets/images/draft_day/undo.png")}
              className="nfl-draft-powerplay-icon"
              onClick={e =>
                this.onPowerplaysClicked(e, Constants.DRAFT_POWERPLAY_UNDO)
              }
            />
            <span className="nfl-draft-powerplay-amount">
              {" "}
              {this.getPowerplayAmount(Constants.DRAFT_POWERPLAY_UNDO)}
            </span>
            <div className="nfl-draft-Move">Undo</div>
          </div>
        </div>
      </div>
    );
  }
  componentDraftmanager() {
    return (
      <div className="nfl-draft-manager">
        <div className="nfl-draft-section-heading">
          My Draft Manager
          <div className="nfl-draft-section-match-wrapper">
            <div className="nfl-draft-section-match-icon"></div>
            <span className="nfl-draft--Matched">
              {this.state.totalMatched}/32 Matched
            </span>
          </div>
        </div>
        <div className="nfl-draft-liveBar">
          <p className="nfl-draft-text-picks">My Pick</p>
          <p id="Powerplays" className="nfl-draft-Name">
            Powerplays
          </p>
          <p id="Match" className="nfl-draft-Team">
            Match
          </p>
        </div>
        <div className="nfl-draft-manager-box" id="draft-manager">
          {this.state.data.map((element, key) => {
            if (key < 32) {
              return (
                <>
                  <div className="nfl-draft-managerRowWrapper">
                    <div className="nfl-draft-NameWrapper">
                      <div className="nfl-draft-circle">
                        <span className="nfl-draft-num">
                          {element.my_ranking}
                        </span>
                      </div>
                      <div className="nfl-draft-draft_manager_name">
                        {element.player_name}
                      </div>
                    </div>
                    <div className="nfl-draft-iconsWrapper">
                      <img
                        src={require("../../../assets/images/draft_day/up_active.png")}
                        className={
                          "nfl-draft-manager-icon" +
                          (key == 0 ? " inactive" : "")
                        }
                        onClick={e =>
                          this.onPowerplaysClicked(
                            e,
                            Constants.DRAFT_POWERPLAY_UP,
                            element
                          )
                        }
                      />
                      <img
                        src={require("../../../assets/images/draft_day/down_active.png")}
                        className="nfl-draft-manager-icon"
                        onClick={e =>
                          this.onPowerplaysClicked(
                            e,
                            Constants.DRAFT_POWERPLAY_DOWN,
                            element
                          )
                        }
                      />
                      <img
                        src={require("../../../assets/images/draft_day/swap.png")}
                        className="nfl-draft-manager-icon"
                        onClick={e =>
                          this.onPowerplaysClicked(
                            e,
                            Constants.DRAFT_POWERPLAY_SWAP,
                            element
                          )
                        }
                      />
                    </div>
                    {this.componentMatchText(element, key)}
                  </div>
                  <div className="nfl-draft-myDrafthr" />
                </>
              );
            } else {
              return "";
            }
          })}
        </div>
      </div>
    );
  }
  componentLiveDraft() {
    return (
      <div className="nfl-draft-live">
        <div className="nfl-draft-section-heading">Live Draft</div>
        <div className="nfl-draft-liveBar">
          <p className="nfl-draft-draft-num">Draft #</p>
          <p className="nfl-draft-Name">Name</p>
          <p className="nfl-draft-Team">Team</p>
        </div>
        <div className="nfl-draft-liveDrftCon" id="live-draft">
          {this.state.orignal_data.map((element, key) => {
            if (key < 32) {
              if (key > 19) {
                return (
                  <>
                    <div className="nfl-draft-Live_draft_wrapper">
                      <div className="nfl-draft-circle-wrapper">
                        <div className="nfl-draft-circle">
                          <span className="nfl-draft-num">
                            {element.pre_draft_rank}
                          </span>
                        </div>
                      </div>

                      <div className="nfl-draft-name-wrapper">
                        <div className="nfl-draft-tbd">TBD</div>
                      </div>
                      <div className="nfl-draft-team-wrapper">
                        <div className="nfl-draft-live_draft_team">
                          {element.projected_team}
                        </div>
                      </div>
                    </div>
                    <div className="nfl-draft-myhr" />
                  </>
                );
              } else {
                return (
                  <>
                    <div className="nfl-draft-Live_draft_wrapper">
                      <div className="nfl-draft-circle-wrapper">
                        <div className="nfl-draft-live_draft_circle">
                          <span className="nfl-draft-num">
                            {element.pre_draft_rank}
                          </span>
                        </div>
                      </div>
                      <div className="nfl-draft-name-wrapper">
                        <div className="nfl-draft-Live_Draft_Name">
                          {" "}
                          {element.player_name}
                        </div>
                      </div>
                      <div className="nfl-draft-team-wrapper">
                        <div className="nfl-draft-team-icon"></div>
                        <div className="nfl-draft-live_draft_team_White">
                          {element.projected_team}
                        </div>
                      </div>

                      <div className="nfl-draft-jersy">
                        <div className="nfl-draft-jersy-icon"></div>
                        <a
                          className="nfl-draft-jersy-ref"
                          target="_blank"
                          href={"//" + element.team_gear_link}
                        >
                          Be the first to get a jersey!
                        </a>
                      </div>
                    </div>
                    <div className="nfl-draft-myhr" />
                  </>
                );
              }
            } else {
              return "";
            }
          })}
        </div>
      </div>
    );
  }
  componentMatchText(element, key) {
    if (key < 20) {
      if (element.my_ranking == element.pre_draft_rank) {
        return <div className="nfl-draft-button-match">Match!</div>;
      } else {
        return (
          <div className="nfl-draft-button-match-disabled">Not Matched!</div>
        );
      }
    } else {
      return <div className="nfl-draft-button-tbd">TBD</div>;
    }
  }
  componentSwapModal() {
    return (
      <div className="confirm_dialog_wrapper">
        <div className="main-dialog-wrapper">
          <div className="dialog-box_header">
            <div className="Swap_name">
              Swap “{swapElement ? swapElement.player_name : "Player"}” with
            </div>
          </div>
          <div className="dialog-box_body">
            {this.state.data.map((element, key) => {
              return (
                <div className="dialog_wrapper">
                  <div className="checkbox">
                    <input
                      type="radio"
                      id={element.player_id}
                      name="cb-draft"
                      className="draft-swap-cb"
                      onChange={e => this.onSwapCBChange(element)}
                    />
                    <label
                      htmlFor={element.player_id}
                      className="draft-swap-cb-label"
                    />
                  </div>
                  <div className="dialog-circle">
                    <span className="num">{element.my_ranking}</span>
                  </div>
                  <div className="dialog-name">{element.player_name}</div>
                </div>
              );
            })}
          </div>
          <div className="dialog-button" onClick={e => this.confirmSwap()}>
            <div className="dialog-button-text">Swap</div>
          </div>
        </div>
      </div>
    );
  }
  /////////////////////////////////////////////
  /////////////END COMPONENTS/////////////////
  /////////////////////////////////////////////

  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//

  /////////////////////////////////////////////
  ////////// STATE CHANGING FUNCTIONS ////////
  /////////////////////////////////////////////

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
  handleCloseSwap() {
    console.log("SWAP Close");
    this.state.showSwapDialog = false;
    this.setState(this.state, this.logIt());
  }
  handleShowSwap() {
    console.log("SWAP");
    this.state.showSwapDialog = true;
    this.setState(this.state, this.logIt());
  }
  logIt() {
    console.log(this.state.showSwapDialog);
  }
  onSwapCBChange(element) {
    swapConfirmElement = element;
  }
  /////////////////////////////////////////////
  ///////// END STATE CHANGING FUNCTIONS /////
  /////////////////////////////////////////////

  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//

  /////////////////////////////////////////////
  /////////////// HELPERS /////////////////////
  /////////////////////////////////////////////

  onPowerplaysClicked(e, powerplay_id, element) {
    let powerplayObject = powerplaysArray.find(o => o.id === powerplay_id);
    let powerplayObjectIndex = powerplaysArray.findIndex(
      o => o.id === powerplay_id
    );
    if (powerplayObject.amount < 1) {
      console.log("Amount Low!");
      return;
    }
    if (
      lastPoweplayid == null &&
      powerplay_id == Constants.DRAFT_POWERPLAY_UNDO
    ) {
      console.log("No action To Undo!");
      return;
    }
    if (
      lastPoweplayid == Constants.DRAFT_POWERPLAY_UNDO &&
      powerplay_id == Constants.DRAFT_POWERPLAY_UNDO
    ) {
      console.log("No action To Undo!");
      return;
    }

    if (powerplay_id != Constants.DRAFT_POWERPLAY_UNDO) {
      var rawArray = this.state.data;

      lastDataState = []; // create empty array to hold copy

      for (var i = 0, len = rawArray.length; i < len; i++) {
        lastDataState[i] = {}; // empty object to hold properties added below
        for (var prop in rawArray[i]) {
          lastDataState[i][prop] = rawArray[i][prop]; // copy properties from rawArray to arrToUpdate
        }
      }
      lastPowerplayState = [];
      var rawPowerplayArray = powerplaysArray;
      for (var i = 0, len = rawPowerplayArray.length; i < len; i++) {
        lastPowerplayState[i] = {}; // empty object to hold properties added below
        for (var prop in rawPowerplayArray[i]) {
          lastPowerplayState[i][prop] = rawPowerplayArray[i][prop]; // copy properties from rawArray to arrToUpdate
        }
      }
    }
    powerplaysArray[powerplayObjectIndex].amount =
      powerplaysArray[powerplayObjectIndex].amount - 1;
    if (powerplay_id == Constants.DRAFT_POWERPLAY_UP) {
      this.onUpClicked(e, element);
    }
    if (powerplay_id == Constants.DRAFT_POWERPLAY_DOWN) {
      this.onDownClicked(e, element);
    }
    if (powerplay_id == Constants.DRAFT_POWERPLAY_SWAP) {
      this.onSwapClicked(e, element);
    }
    if (powerplay_id == Constants.DRAFT_POWERPLAY_UNDO) {
      this.onUndoClicked();
    }
    lastPoweplayid = powerplay_id;
    this.checkMatched();
  }
  onUpClicked(e, element) {
    let oldRanking = 0,
      newRanking = 0,
      oldTeam = "",
      oldTeamGear = "",
      newTeam = "",
      newTeamGear = "";
    for (var i in this.state.data) {
      if (this.state.data[i].id == element.id) {
        oldRanking = this.state.data[i].my_ranking;
        oldTeam = this.state.data[i].projected_team;
        oldTeamGear = this.state.data[i].team_gear_link;
        newRanking = this.state.data[i].my_ranking - 1;
        for (var z in this.state.data) {
          if (this.state.data[z].my_ranking == newRanking) {
            this.state.data[z].my_ranking = oldRanking;
            newTeam = this.state.data[z].projected_team;
            newTeamGear = this.state.data[z].team_gear_link;
            this.state.data[z].projected_team = oldTeam;
            this.state.data[z].team_gear_link = oldTeamGear;

            break; //Stop this loop, we found it!
          }
        }
        this.state.data[i].my_ranking = newRanking;
        this.state.data[i].projected_team = newTeam;
        this.state.data[i].team_gear_link = newTeamGear;

        break; //Stop this loop, we found it!
      }
    }
    this.sortData();
    var row = $(e.target)
      .parent()
      .parent();
    var prevRow = row.prev().prev();
    var fadeSpeed = 300;
    prevRow.fadeTo(fadeSpeed, 0.1, () => {
      row.fadeTo(fadeSpeed, 0.1, () => {
        row.fadeTo(400, 1);
      });
      prevRow.fadeTo(400, 1);
      this.setState({
        data: this.state.data
      });
    });
  }
  onDownClicked(e, element) {
    let oldRanking = 0,
      newRanking = 0,
      oldTeam = "",
      oldTeamGear = "",
      newTeam = "",
      newTeamGear = "";
    for (var i in this.state.data) {
      if (this.state.data[i].id == element.id) {
        oldRanking = this.state.data[i].my_ranking;
        oldTeam = this.state.data[i].projected_team;
        oldTeamGear = this.state.data[i].team_gear_link;
        newRanking = this.state.data[i].my_ranking + 1;
        for (var z in this.state.data) {
          if (this.state.data[z].my_ranking == newRanking) {
            this.state.data[z].my_ranking = oldRanking;
            newTeam = this.state.data[z].projected_team;
            newTeamGear = this.state.data[z].team_gear_link;
            this.state.data[z].projected_team = oldTeam;
            this.state.data[z].team_gear_link = oldTeamGear;
            break; //Stop this loop, we found it!
          }
        }
        this.state.data[i].my_ranking = newRanking;
        this.state.data[i].projected_team = newTeam;
        this.state.data[i].team_gear_link = newTeamGear;
        break; //Stop this loop, we found it!
      }
    }
    this.sortData();
    var row = $(e.target)
      .parent()
      .parent();

    var nextRow = row.next().next();
    var fadeSpeed = 300;
    nextRow.fadeTo(fadeSpeed, 0.1, () => {
      row.fadeTo(fadeSpeed, 0.1, () => {
        row.fadeTo(400, 1);
      });
      nextRow.fadeTo(400, 1);
      this.setState({
        data: this.state.data
      });
    });
  }
  onSwapClicked(e, element) {
    swapElement = element;

    this.handleShowSwap();
  }
  onUndoClicked() {
    this.state.data = lastDataState;
    powerplaysArray = [];
    var rawPowerplayArray = lastPowerplayState;
    for (var i = 0, len = rawPowerplayArray.length; i < len; i++) {
      powerplaysArray[i] = {}; // empty object to hold properties added below
      for (var prop in rawPowerplayArray[i]) {
        powerplaysArray[i][prop] = rawPowerplayArray[i][prop]; // copy properties from rawArray to arrToUpdate
      }
    }
    powerplaysArray[3].amount = powerplaysArray[3].amount - 1;
    this.setState(this.state);
  }
  checkMatched() {
    var total = 0;
    this.state.data.forEach((element, key) => {
      if (key < 32 && element.pre_draft_rank < 21) {
        if (element.my_ranking == element.pre_draft_rank) {
          total = total + 1;
        }
      }
    });
    this.setState({
      totalMatched: total
    });
  }
  getPowerplayAmount(powerplay_id) {
    let powerplayObject = powerplaysArray.find(o => o.id === powerplay_id);
    if (powerplayObject) {
      return powerplayObject.amount;
    } else {
      return 0;
    }
  }
  sortData() {
    this.state.data.sort(function(a, b) {
      return a.my_ranking - b.my_ranking;
    });
  }
  updateDraftSequence(draft_data, entry_data) {
    if (entry_data) {
      entry_data.forEach(element => {
        var player_id = element.player_id;
        var projected_team = element.projected_team;
        var my_ranking = element.my_ranking;

        var old_ranking = "";
        var old_team = "";
        var old_team_gear = "";

        let draftObject = draft_data.find(o => o.player_id === player_id);
        let draftObjectIndex = draft_data.findIndex(
          o => o.player_id === player_id
        );

        old_ranking = draft_data[draftObjectIndex].my_ranking;
        old_team = draft_data[draftObjectIndex].projected_team;
        old_team_gear = draft_data[draftObjectIndex].team_gear_link;
        draft_data[draftObjectIndex].my_ranking = my_ranking;
        draft_data[draftObjectIndex].projected_team = projected_team;
      });
      draft_data.sort(function(a, b) {
        return a.my_ranking - b.my_ranking;
      });
    }
    return draft_data;
  }
  confirmSwap() {
    this.handleCloseSwap();
    var element = swapConfirmElement;
    let oldRanking = 0,
      newRanking = 0,
      oldTeam = "",
      oldTeamGear = "",
      newTeam = "",
      newTeamGear = "";
    for (var i in this.state.data) {
      if (this.state.data[i].id == element.id) {
        oldRanking = this.state.data[i].my_ranking;
        oldTeam = this.state.data[i].projected_team;
        oldTeamGear = this.state.data[i].team_gear_link;
        newRanking = swapElement.my_ranking;
        for (var z in this.state.data) {
          if (this.state.data[z].my_ranking == newRanking) {
            this.state.data[z].my_ranking = oldRanking;
            newTeam = this.state.data[z].projected_team;
            newTeamGear = this.state.data[z].team_gear_link;
            this.state.data[z].projected_team = oldTeam;
            this.state.data[z].team_gear_link = oldTeamGear;
            break; //Stop this loop, we found it!
          }
        }
        this.state.data[i].my_ranking = newRanking;
        this.state.data[i].projected_team = newTeam;
        this.state.data[i].team_gear_link = newTeamGear;
        break; //Stop this loop, we found it!
      }
    }
    this.sortData();
    this.checkMatched();
    this.setState(this.state);
  }
  /////////////////////////////////////////////
  //////////// HELPERS END ///////////////////
  /////////////////////////////////////////////

  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//

  /////////////////////////////////////////////
  //////////// SERVER  DATA ///////////////////
  /////////////////////////////////////////////
  getData() {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");

    var link =
      "https://" + Constants.URL + "/public_api/draft_day/get_draft_data.php";
    if (jwt) {
      link = link + "?jwt=" + jwt;
    }
    fetch(link)
      .then(res => res.json())
      .then(
        xx => {
          var rawArray = xx.draf_day_data;

          var arrToUpdate = []; // create empty array to hold copy

          for (var i = 0, len = rawArray.length; i < len; i++) {
            arrToUpdate[i] = {}; // empty object to hold properties added below
            for (var prop in rawArray[i]) {
              arrToUpdate[i][prop] = rawArray[i][prop]; // copy properties from rawArray to arrToUpdate
            }
          }
          var data = this.updateDraftSequence(arrToUpdate, xx.entry_details);

          this.setState(
            {
              data: data,
              orignal_data: rawArray,
              entry_data: xx.entry_details ? xx.entry_details : [],
              isLoaded: true
            },
            this.addScrollListener()
          );
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }
  addScrollListener() {
    var target = document.getElementById("live-draft");

    $("#draft-manager").scroll(function() {
      $(target)
        .prop("scrollTop", this.scrollTop)
        .prop("scrollLeft", this.scrollLeft);
    });
    $(document.getElementById("live-draft")).scroll(function() {
      $("#draft-manager")
        .prop("scrollTop", this.scrollTop)
        .prop("scrollLeft", this.scrollLeft);
    });
    this.checkMatched();
  }
  /////////////////////////////////////////////
  ////////// SERVER DATA END //////////////////
  /////////////////////////////////////////////

  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//

  /////////////////////////////////////////////
  //////////// CORE COMPONENT FNCTIONS ////////
  /////////////////////////////////////////////

  componentDidMount() {
    this.getData();
    this.checkMatched();

    var that = this;
    $(document).on("keydown", function(e) {
      if (e.keyCode === 27) {
        that.state.showSwapDialog = false;
        that.setState(that.state);
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoaded !== this.state.isLoaded) {
      this.addScrollListener();
    }
  }
  render() {
    if (this.state.isLoaded) {
      return (
        <>
          <Header />

          <div>
            <div>
              <div>
                <div className="nfl-draft-Sponsord">
                  <span>Sponsord By:</span>
                  <span>Image</span>
                </div>
              </div>
              <div className="nfl-draft-heading-text">
                <div className="nfl-draft-NFL-Power-Draft">
                  2020 NFL Power Draft
                </div>
              </div>
              <div className="nfl-draft-buttons">
                <div className="nfl-draft-Rectangle-Copy ">
                  <img
                    src={require("../../../assets/images/draft_day/document.png")}
                    className="nfl-draft-document"
                  />
                  <p className="nfl-draft-Contest-Rules">Contest Rules</p>
                </div>
                <div className="nfl-draft-prizeGrid">
                  <img
                    src={require("../../../assets/images/draft_day/trophy.png")}
                    className="nfl-draft-trophy"
                  />
                  <p className="nfl-draft-Prize-Grid">Prize Grid</p>
                </div>
              </div>
              <div className="nfl-draft-header-status">
                <div className="nfl-draft-text-style-1">
                  Status:{" "}
                  <span className="nfl-draft-Status-In-Progress">
                    In Progress
                  </span>
                </div>
              </div>
              <div className="nfl-draft-header-prize">
                <div>
                  <div className="nfl-draft-Use-Your-Powerplays">
                    Use Your Powerplays to Match Your Picks
                    <br />
                    and win up to{" "}
                    <span className="nfl-draft-text-style-2">$25k!</span>
                  </div>
                </div>
                <div className="nfl-draft-text">
                  <div className="nfl-draft-outer">
                    <div className="nfl-draft-outerCenter">
                      <p className="nfl-draft-rd-Overall-Selectio">
                        <span className="nfl-draft-text-style-outer">20th</span>{" "}
                        Overall selection
                      </p>
                    </div>
                    <div className="nfl-draft-current">
                      <div className="nfl-draft-current-icon"></div>
                      <div className="nfl-draft-current-text">Trey Adams</div>
                    </div>
                    <div className="nfl-draft-text-style-4">
                      Drafted by:{" "}
                      <span className="nfl-draft-Drafted-by">Jacksonville</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nfl-draft-text">
                {this.componentLiveDraft()}
                {this.componentDraftmanager()}
                {this.componentInventory()}
              </div>
            </div>
            <div style={{ textAlign: "center", margin: "40px" }}>
              {this.componentBottom()}
            </div>
          </div>

          {this.state.showSwapDialog ? this.componentSwapModal() : ""}
          <Footer />
        </>
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

export default withRouter(DraftDayLive);
