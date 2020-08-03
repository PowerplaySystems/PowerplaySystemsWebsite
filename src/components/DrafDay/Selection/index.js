import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
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
      prizes: prizeArray,
      show_confirm_dialog: false,
      showPrize: false,
      entry_data: []
    };
  }
  ////////////////////////
  //BUTTON CLICK FUNCTIONS
  ////////////////////////
  onUpClicked(element) {
    let oldRanking = 0,
      newRanking = 0,
      oldTeam = "",
      newTeam = "";
    for (var i in this.state.data) {
      if (this.state.data[i].id == element.id) {
        oldRanking = this.state.data[i].my_ranking;
        oldTeam = this.state.data[i].projected_team;
        newRanking = this.state.data[i].my_ranking - 1;
        for (var z in this.state.data) {
          if (this.state.data[z].my_ranking == newRanking) {
            this.state.data[z].my_ranking = oldRanking;
            newTeam = this.state.data[z].projected_team;
            this.state.data[z].projected_team = oldTeam;

            break; //Stop this loop, we found it!
          }
        }
        this.state.data[i].my_ranking = newRanking;
        this.state.data[i].projected_team = newTeam;

        break; //Stop this loop, we found it!
      }
    }
    this.sortData();
    this.setState({
      data: this.state.data
    });
  }
  onDownClicked(element) {
    let oldRanking = 0,
      newRanking = 0,
      oldTeam = "",
      newTeam = "";
    for (var i in this.state.data) {
      if (this.state.data[i].id == element.id) {
        oldRanking = this.state.data[i].my_ranking;
        oldTeam = this.state.data[i].projected_team;
        newRanking = this.state.data[i].my_ranking + 1;
        for (var z in this.state.data) {
          if (this.state.data[z].my_ranking == newRanking) {
            this.state.data[z].my_ranking = oldRanking;
            newTeam = this.state.data[z].projected_team;
            this.state.data[z].projected_team = oldTeam;
            break; //Stop this loop, we found it!
          }
        }
        this.state.data[i].my_ranking = newRanking;
        this.state.data[i].projected_team = newTeam;
        break; //Stop this loop, we found it!
      }
    }
    this.sortData();
    this.setState({
      data: this.state.data
    });
  }
  onSubmitClicked() {
    this.showModal();
  }
  onBackClicked() {
    this.hideModal();
  }
  ////////////////////////////
  //BUTTON CLICK FUNCTIONS END
  ////////////////////////////

  ////////////////////////////
  //PAGE COMPONENTS
  ////////////////////////////
  componentDraftTable() {
    if (this.state.entry_data.length > 0) {
      this.updateDraftSequence();
    }
    return (
      <table className="draft_day_table">
        <thead>
          <tr>
            <td>DraftSite Ranking</td>
            <td>My Ranking</td>
            <td>Projected Team</td>
            <td>Player</td>
            <td>Pos</td>
            <td>Ht</td>
            <td>Wt</td>
            <td>School</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((element, key) => {
            return (
              <tr className={key > 31 ? "bg-light" : ""}>
                <td>{element.pre_draft_rank}</td>
                <td>{element.my_ranking}</td>
                <td>{element.projected_team}</td>
                <td>{element.player_name}</td>
                <td>{element.player_pos}</td>
                <td>{element.player_ht}</td>
                <td>{element.player_wt}</td>
                <td>{element.player_school}</td>
                <td>
                  <div
                    onClick={e => this.onUpClicked(element)}
                    className="draft_day_table_icon_up"
                  ></div>
                  <div
                    onClick={e => this.onDownClicked(element)}
                    className="draft_day_table_icon_down"
                  ></div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  componentConfirmDialog() {
    return (
      <div className="confirm_dialog_wrapper">
        <div className="confirm_dialog_content">
          <div className="confirm_dialog_header">
            <div className="confirm_dialog_header_text1">
              Confirm your selections
            </div>
            <div className="confirm_dialog_header_text2">
              My Final Draft list for 2020 NFL Power Draft
            </div>
            <div className="confirm_dialog_header_text3">
              Dont forget during the live draft you can edit your selections in
              real time
            </div>
          </div>
          <div className="confirm_dialog_main">
            <div className="confirm_dialog_main_Players">
              {this.state.data.map((element, key) => {
                if (key < 32)
                  return (
                    <div className="confirm_dialog_main_player">
                      {key + 1}
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
  ////////////////////////////
  //PAGE COMPONENTS END
  ////////////////////////////

  ////////////////////////////
  //HELPING FUNCTIONS
  ////////////////////////////

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

  updateDraftSequence() {}
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
          this.setState({
            data: xx.draf_day_data,
            entry_data: xx.entry_details ? xx.entry_details : [],
            isLoaded: true
          });
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
        if (~this.responseText.indexOf("Successful")) {
          popupHader = "Successful";
          popupText = "Your Selected Numbers Have been saved!";
          that.shoInfoModal();
          that.props.history.push({
            pathname: "/"
          });
        } else {
        }
      }
    });
    xhr.open("POST", link);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }

  ////////////////////////////
  //FUNCTION TO GET/POST DATA END
  ////////////////////////////

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
  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          {this.componentConfirmDialog}
          <Header />
          {this.componentPrizeModal()}
          <div className="container container-main">
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
                    Prize Grid
                  </button>
                </div>
              </div>
            </div>
            <div className="draf_day_main">
              <div className="draft_day_text5">
                Correctly <span>pick</span> the first round of the 2020 NFL
                Entry Draft
              </div>
              <div className="draft_day_table_wrapper">
                {this.componentDraftTable()}
              </div>
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
                    Four (4) prizes to be won. See full rules for complete
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
