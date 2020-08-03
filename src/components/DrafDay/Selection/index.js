import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import $ from "jquery";
import "jquery-ui-bundle";
import "./index.css";
import * as Constants from "../../common/constants";
import * as Functions from "../../common/functions";
import Cookies from "universal-cookie";
/////////MODAL IMPORTS AND VARIABLES////////
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
//Popup variables
var popupText = "Error";
var popupHader = "Sorry!";

/////////MODAL IMPORTS AND VARIABLES END////////

//drag variables
var indexBeforeDrag = 0;
var indexAfterDrag = 0;
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
class DrafDay extends Component {
  constructor(props) {
    super(props);
    window.scroll(0, 0);
    this.state = {
      error: null,
      isLoaded: false,
      show: false,
      data: [],
      rawData: [],
      prizes: prizeArray,
      show_confirm_dialog: false,
      showPrize: false,
      entry_data: []
    };
  }
  ////////////////////////
  //BUTTON CLICK FUNCTIONS
  ////////////////////////
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
    if (e == null) {
      return;
    } else {
      var row = $(e.target)
        .parent()
        .parent();
      var prevRow = row.prev();

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
  }
  onDownClicked(e, element) {
    console.log(element);
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
    if (e == null) {
      return;
    } else {
      var row = $(e.target)
        .parent()
        .parent();
      var nextRow = row.next();

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
  }
  onSubmitClicked() {
    if (this.state.show_confirm_dialog) {
      this.postData();
    } else {
      this.showModal();
    }
  }
  onBackClicked() {
    this.hideModal();
  }
  onDragged() {
    var dragLength = indexAfterDrag - indexBeforeDrag;

    if (dragLength > 0) {
      for (var x = indexBeforeDrag; x < indexAfterDrag; x++) {
        console.log(x);
        this.onDownClicked(null, this.state.data[x]);
      }
    } else {
      for (var x = indexBeforeDrag; x > indexAfterDrag; x--) {
        console.log(x);
        this.onUpClicked(null, this.state.data[x]);
      }
    }
    // this.setState(this.state);
  }
  ////////////////////////////
  //BUTTON CLICK FUNCTIONS END
  ////////////////////////////

  ////////////////////////////
  //PAGE COMPONENTS
  ////////////////////////////
  componentDraftTable() {
    return (
      <div className="twin-table-wrapper">
        <table className="draft_day_table-left">
          <thead>
            <tr>
              <td>Pick #</td>
              <td>Projected Team</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((element, key) => {
              return (
                <tr className={key > 31 ? "bg-light" : ""}>
                  <td>{element.my_ranking}</td>
                  <td>
                    {element.projected_team}
                    <br />
                    <div className="draft_day_table_gear_wrpper">
                      <div className="draft_day_table_gear_icon"></div>
                      <a
                        // onClick={e => this.goTolink(element.team_gear_link)}
                        target="_blank"
                        href={"//" + element.team_gear_link}
                        className="draft_day_table_gear_text1"
                      >
                        {" "}
                        Get {element.projected_team} gear
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className="draft_day_table">
          <thead>
            <tr>
              <td>Draft Ranking</td>
              <td>Player</td>
              <td>Pos</td>
              <td>Ht</td>
              <td>Wt</td>
              <td>School</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody id="tb-body">
            {this.state.data.map((element, key) => {
              return (
                <tr className={key > 31 ? "bg-light" : ""}>
                  <td>{element.pre_draft_rank}</td>
                  <td>{element.player_name}</td>
                  <td>{element.player_pos}</td>
                  <td>{element.player_ht}</td>
                  <td>{element.player_wt}</td>
                  <td>
                    {element.player_school}
                    <br />
                    <div className="draft_day_table_gear_wrpper">
                      <div className="draft_day_table_gear_icon"></div>
                      <a
                        // onClick={e => this.goTolink(element.team_gear_link)}
                        target="_blank"
                        href={
                          element.school_gear_link == null
                            ? "//fanatics.ncw6.net/c/2068372/612772/9663"
                            : "//" + element.school_gear_link
                        }
                        className="draft_day_table_gear_text1"
                      >
                        {" "}
                        {element.school_gear_link == null
                          ? "Get NCAA Gear"
                          : "Get " + element.player_school + " gear"}
                      </a>
                    </div>
                  </td>

                  <td>
                    <div
                      // onClick={e => this.onDownClicked(e, element)}
                      className="draft_day_table_icon_drag"
                    ></div>
                    {/* <div
                      onClick={e => this.onUpClicked(e, element)}
                      className="draft_day_table_icon_up move_up"
                    ></div>
                    <div
                      onClick={e => this.onDownClicked(e, element)}
                      className="draft_day_table_icon_down move_down"
                    ></div> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  componentConfirmDialog() {
    return (
      <div className="confirm_dialog_wrapper">
        <div className="confirm_dialog_content">
          <div className="confirm_dialog_header">
            <div
              className="confirm_dialog_close_icon"
              onClick={e => this.onBackClicked()}
            >
              X
            </div>
            <div className="confirm_dialog_header_text1">
              Confirm your selections
            </div>
            <div className="confirm_dialog_header_text2">
              My Final Draft list for 2020 NFL Power Draft
            </div>
            <div className="confirm_dialog_header_text3">
              Don't forget during the live draft you can edit your selections in
              real time
            </div>
          </div>
          <div className="confirm_dialog_main">
            <div className="confirm_dialog_main_Players">
              {this.state.data.map((element, key) => {
                if (key < 32)
                  return (
                    <div className="confirm_dialog_main_player">
                      {element.my_ranking}
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      {element.player_name}
                    </div>
                  );
              })}
            </div>
          </div>
          <div className="confirm_dialog_footer">
            <button
              className="confirm_dialog_btn1"
              onClick={e => this.postData()}
            >
              Submit Selections <span>&#8594;</span>
            </button>
            <button
              className="confirm_dialog_btn2"
              onClick={e => this.onBackClicked()}
            >
              <span>&#8592;</span> Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  componentInfoModal() {
    return (
      <Modal show={this.state.show} onHide={this.hideInforModal}>
        <Modal.Header closeButton>
          <Modal.Title> {popupHader} </Modal.Title>
        </Modal.Header>
        <Modal.Body> {popupText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.hideInforModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  componentPrizeModal() {
    return (
      <Modal show={this.state.showPrize} onHide={e => this.handleClosePrize()}>
        <Modal.Header closeButton>
          <Modal.Title>Prizes</Modal.Title>
          <div className="prize-note">
            *Note: All Prizes Will be divided equally among Winners
          </div>
        </Modal.Header>
        <Modal.Body className="grid-body">
          {
            <table className="modal-prize-table">
              <thead>
                <tr>
                  <th scope="col"> Matches </th>
                  <th scope="col"> Prize </th>
                </tr>
              </thead>
              <tbody>
                {this.state.prizes.map((prize, key) => {
                  return (
                    <tr className="prize-row" key={key}>
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
  componentMobileItemBox() {
    return (
      <div className="draft-mobile-box">
        {this.state.data.map((element, key) => {
          if (element) {
            return (
              <>
                <div
                  className={
                    key > 31
                      ? "draft-mobile-box-item bg-light opacity-50"
                      : "draft-mobile-box-item"
                  }
                >
                  <div className="draft-mobile-box-item-left">
                    <div className="draft-mobile-box-item-text1">
                      Draft Ranking {element.pre_draft_rank}
                    </div>
                    <div className="draft-mobile-box-item-inner1">
                      <div className="draft-mobile-box-item-text1a">
                        {element.my_ranking}
                      </div>
                    </div>
                    <div className="draft-mobile-box-item-inner2">
                      <div className="draft-mobile-box-item-text2">
                        {element.player_name}
                      </div>
                      <div className="draft-mobile-box-item-text3">
                        &nbsp;&nbsp;(
                        {element.player_pos
                          ? element.player_pos.match(/\b([A-Z])/g).join("")
                          : ""}
                        )
                      </div>
                      <div className="draft-mobile-box-item-text4">
                        {element.projected_team}
                      </div>
                      <div className="draft_day_table_gear_wrpper align-left">
                        <div className="draft_day_table_gear_icon"></div>
                        <a
                          // onClick={e => this.goTolink(element.team_gear_link)}
                          target="_blank"
                          href={"//" + element.team_gear_link}
                          className="draft_day_table_gear_text1"
                        >
                          {" "}
                          Get {element.projected_team} gear
                          {/* Get Bengals gear */}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="draft-mobile-box-item-right">
                    <div
                      onClick={e => this.onUpClicked(e, element)}
                      className="draft_day_table_icon_up move_up draft-mobile-icon-up"
                    ></div>
                    <div
                      onClick={e => this.onDownClicked(e, element)}
                      className="draft_day_table_icon_down move_down draft-mobile-icon-down"
                    ></div>
                  </div>
                </div>
                {key == 31 ? (
                  <div className="draft-mobile-divider">
                    <div class="separator">Top 32 will be submitted</div>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          } else {
            return "";
          }
        })}
        <button
          className="draft-mobile-button"
          onClick={e => this.onSubmitClicked()}
        >
          Submit my Draft Picks
        </button>
      </div>
    );
  }
  ////////////////////////////
  //PAGE COMPONENTS END
  ////////////////////////////

  ////////////////////////////
  //HELPING FUNCTIONS
  ////////////////////////////
  goTolink(url) {
    var win = window.open(url, "_blank");
    win.focus();
    //window.location.href = "www." + link;
  }
  sortData() {
    this.state.data.sort(function(a, b) {
      return a.my_ranking - b.my_ranking;
    });
  }
  createArrayForServer() {
    var arr = this.state.data.slice(0, 32);
    arr.forEach(function(v) {
      delete v.id;
      delete v.pre_draft_rank;
      delete v.actual_draft_rank;
      delete v.actual_team;
      delete v.player_name;
      delete v.player_pos;
      delete v.player_school;
      delete v.player_wt;
      delete v.player_ht;
    });
    return arr;
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

  showModal() {
    this.setState({
      show_confirm_dialog: true
    });
  }
  hideModal() {
    this.setState({
      show_confirm_dialog: false
    });
  }

  shoInfoModal() {
    this.setState({
      show: true
    });
  }

  hideInforModal() {
    this.setState({
      show: false
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
  ////////////////////////////
  //FUNCTION TO GET/POST DATA
  ////////////////////////////
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
          var data;
          if (xx.entry_details) {
            data = this.updateDraftSequence(xx.draf_day_data, xx.entry_details);
          }else{
            data = xx.draf_day_data;
          }

          this.setState(
            {
              data: data,
              entry_data: xx.entry_details ? xx.entry_details : [],
              isLoaded: true
            },
            this.afterLoadingData()
          );
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }

  postData() {
    const cookies = new Cookies();
    var link =
      "https://" + Constants.URL + "/public_api/draft_day/add_entry.php";
    const jwt = cookies.get("jwt");
    if (jwt == "" || jwt == undefined) {
      popupText = "Please Login First";
      popupHader = "Authentication Failed!";
      this.shoInfoModal();
      var that = this;
      this.props.history.push({
        pathname: "/register",
        state: {
          backlink: "draft-day-teams",
          selected: that.state.data
        }
      });
      return false;
    }
    var data =
      "data=" +
      JSON.stringify(this.createArrayForServer()) +
      "&jwt=" +
      cookies.get("jwt");

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var that = this;
    console.log(data);
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        if (~this.responseText.indexOf("Submitted")) {
          popupHader = "Successful";
          popupText = "Your Selected Numbers Have been saved!";
          that.shoInfoModal();
          that.props.history.push({
            pathname: "/game-central"
          });
        } else {
        }
      }
    });
    xhr.open("POST", link);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    xhr.send(data);
  }
  afterLoadingData() {
    this.sortData();
  }
  ////////////////////////////
  //FUNCTION TO GET/POST DATA END
  ////////////////////////////
  attachListeners() {
    var that = this;
    $("#tb-body").sortable({
      handle: ".draft_day_table_icon_drag",
      start: function(e, ui) {
        var elements = ui.item
          .siblings(".selected.hidden")
          .not(".ui-sortable-placeholder");
        ui.item.data("items", elements);
        // $(this).addClass("bg_grey");
        $(ui.helper).addClass("bg_grey");
        indexBeforeDrag = ui.item.index();
      },
      update: function(e, ui) {
        ui.item.after(ui.item.data("items"));
        indexAfterDrag = ui.item.index();

        $(ui.helper).removeClass("bg_grey");
        that.onDragged();
      },
      stop: function(e, ui) {
        ui.item.siblings(".selected").removeClass("hidden");
        $("tr.selected").removeClass("selected");
        $("tr.bg_grey").removeClass("bg_grey");
        // $(ui.helper).removeClass('bg_grey');
      }
    });
    $("#tb-body").disableSelection();
  }
  ////////////////////////////
  //HELPING FUNCTIONS END
  ////////////////////////////
  componentDidMount() {
    window.scroll(0, 0);
    //if comming back from signup/login

    if (this.props.location.state) {
      this.setState({
        data: this.props.location.state.selected,
        isLoaded: true,
        show_confirm_dialog: true
      });
    } else {
      this.getData();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoaded !== this.state.isLoaded) {
      this.attachListeners();
    }
  }
  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          <Header />
          {this.componentPrizeModal()}
          <div className="draft-container">
            <div className="draft_day_header">
              <div className="draft_day_header_content">
                <div className="draft_day_text1">2020 NFL Power Draft</div>
                <div className="draft_day_text2">
                  Win up to <div className="draft_day_text2a">$25k USD</div>
                </div>
                <div className="draft_day_text3">
                  Begins on <span>April 23rd, 2020 @ 8:00PM EST</span>
                </div>
                <div className="draft_day_text4">Las Vegas, NV</div>
                <div className="draft_day_header_buttons">
                  <button className="draft_day_buton1">Contest Rules</button>
                  <button
                    className="draft_day_buton2"
                    onClick={e => this.handleShowPrize()}
                  >
                    View All Prizes
                  </button>
                </div>
              </div>
            </div>
            <div className="draf_day_main">
              <div className="draft_day_text5">
                Correctly <span>pick</span> the first round of the 2020 NFL
                Entry Draft
              </div>
              <div className="draft_day_text5a">
                Use <span></span> to drag and drop players
              </div>
              <div className="draft_day_table_wrapper">
                {this.componentDraftTable()}
              </div>
              {this.componentMobileItemBox()}
              <br />
              <button
                onClick={e => this.onSubmitClicked()}
                className="draft_day_buton3"
              >
                Submit my Draft Picks <span>&#8594;</span>
              </button>
              <br />
              <div className="draft_day_text6">
                No purchase necessary. Contest closes at 11:59pm ET on April 27,
                2020. Open to residents of Canada (excluding Quebec) and United
                States who are over the age of majority.
              </div>
              <div className="draft_day_text7">
                Registration and full contest rules <a>here</a>
              </div>
              <div className="draft_day_bottom_box">
                <ul className="draft_day_list">
                  <li>
                    {" "}
                    Five (5) prizes to be won. See full rules for complete
                    details of all prizes.
                  </li>
                  <li> One entry per person.</li>
                  <li>
                    {" "}
                    Odds of winning depend on player knowledge and use of
                    Powerplays.
                  </li>
                  <li>
                    {" "}
                    Skill-testing question must be correctly answered to win.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {this.state.show_confirm_dialog ? this.componentConfirmDialog() : ""}
          <Footer />
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

export default withRouter(DrafDay);
