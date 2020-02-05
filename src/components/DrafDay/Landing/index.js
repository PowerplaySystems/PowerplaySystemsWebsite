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

class DraftDayLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: "",
      isLoaded: false
    };
  }
  ////////////////////////////////////////////
  /////////////PAGE COMPONENTS///////////////
  ///////////////////////////////////////////
  componentHeader() {
    return (
      <div className="draft_day_heading">
        <div className="draft_day_heading_content">
          <div className="draft_day_heading_text1">
            WIN $25k <span>USD</span>
          </div>
          <div className="draft_day_heading_text2">2020 NFL Power Draft</div>
          <div className="draft_day_heading_text3">
            April 23rd, 2020 @ 8:00PM EST
          </div>
          {this.componentButton()}
        </div>
      </div>
    );
  }
  componentButton() {
    return (
      <button
        onClick={() =>
          this.props.history.push({
            pathname: "/draft-day-teams"
          })
        }
        className="draft_day_heading_button1"
      >
        Enter Now!
      </button>
    );
  }
  componentDraftImageBox() {
    return (
      <div className="draft_day_imgbox">
        <div className="draft_day_imgbox_text1">
          Use Powerplays to edit selections live during the Draft and{" "}
          <span>win $25k!</span>
        </div>
        <div className="draft_day_imgbox_text2">
          The 2020 NFL Draft will start at <span>8:00 pm EST</span> on{" "}
          <span>April 23rd, 2020</span>.
        </div>
        <div className="draft_day_imgbox_text3">
          The deadline for choosing or modifying your draft picks is{" "}
          <span>April 22nd</span>
          at <span>11:59PM</span>.
        </div>
        {this.componentButton()}
      </div>
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
              Four (4) prizes to be won. See full rules for complete details of
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
      </>
    );
  }
  componentDraftMain() {
    return (
      <div className="draft_day_main">
        <div className="draft_day_main_row1">
          <div className="draft_day_main_row1_col1">
            <div className="draft_day_main_text1">
              The 2020 NFL Draft is inching closer!
            </div>
            <div className="draft_day_main_text2">
              which means teams are preparing to pick the next franchise
              cornerstone.
            </div>
            <div className="draft_day_main_text3">What about you?</div>
            <div className="draft_day_main_text4">
              How much draft knowledge do you have? Do you think can you predict
              the correct order for the NFL entry draft to win great prizes?
            </div>
            <div className="draft_day_main_text5">
              Powerplay Systems is offering sports fans a chance to win{" "}
              <span>$25,000 USD </span>
              if they can correctly pick the draft order for the first round of
              the 2020 NFL Entry Draft.
            </div>
          </div>
          <div className="draft_day_main_row1_col2">
            <div className="draft_day_main_row_img1"></div>
            {this.componentButton()}
          </div>
        </div>
        <div className="draft_day_main_row2">
          <div className="draft_day_main_row2_col1">
            <div className="draft_day_main_row_img2"></div>
          </div>
          <div className="draft_day_main_row2_col2">
            <div className="draft_day_main_text6">
              Imagine the excitment during the live draft!
            </div>
            <div className="draft_day_main_text7">
              To make it more fun, you can make use of Powerplays during the
              live draft to edit your selections to improve your chances of
              winning.
            </div>
            <div className="draft_day_main_text8">
              The Powerplays we have available are Move up, Move Down, Swap, and
              Undo.
              <br />
              <span>
                You can move a pick up or move down the draft order, swap
                players, and you can undo your last Powerplay in case of error.
              </span>
            </div>
            {this.componentButton()}
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <>
        <Header />
        <div className="container-fluid p-o" style={{ "text-align": "center" }}>
          <>{this.componentHeader()}</>
          <>{this.componentDraftMain()}</>
          <>{this.componentDraftImageBox()}</>
          <>{this.componentBottom()}</>
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(DraftDayLanding);
