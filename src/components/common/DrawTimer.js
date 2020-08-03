import React, { Component } from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Constants from "./constants";
import * as Functions from "./functions";
var isClosed = false;

class DrawTimer extends Component {
  mEmail = "";
  mJwt = "";
  mPlayerID = "";

  constructor(props) {
    super(props);
    var mLogged = false;
    const cookies = new Cookies();
    const jwt = (this.mJwt = cookies.get("jwt"));
    if (jwt == undefined || jwt == "") {
      mLogged = false;
    } else {
      mLogged = true;
    }
    this.state = {
      error: null,
      isLoaded: false,
      isLogedin: mLogged,
      expanded: false,
      closed: isClosed,
      hasNextGame: false,
      gameTime: null
    };
    this.onIconClicked = this.onIconClicked.bind(this);
    this.onCloseClicked = this.onCloseClicked.bind(this);
  }

  onIconClicked() {
    console.log(this.state.expanded);
    this.setState({
      expanded: !this.state.expanded
    });
  }
  onCloseClicked() {
    isClosed = true;
    this.setState({
      closed: true
    });
  }
  getData() {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    fetch(
      "https://" +
        Constants.URL +
        "/public_api/lottery_games/next_game.php?jwt=" +
        jwt
    )
      .then(res => res.json())
      .then(
        records => {
          if (records.records.length > 0) {
            this.setState({
              hasNextGame: records.records[0].entry,
              gameTime: records.records[0].start_datetime
            });
          }
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }
  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.hasNextGame) {
      return (
        <div
          className="global_timer_wrapper"
          style={{ display: this.state.closed ? "none" : "block" }}
        >
          <div
            className="global_timer_icon_close"
            onClick={this.onCloseClicked}
          ></div>
          <div
            className={this.state.expanded ? "icon_expand" : "icon_contract"}
            onClick={this.onIconClicked}
          ></div>
          <div
            className={
              "global_timer_header " + (this.state.expanded ? "" : "div_hide")
            }
          >
            747 Lotto
          </div>
          <div className="global_timer_main">
            <div className="global_timer_main_text">Next draw starts in</div>
            <div className="global_timer_main_watch">
              <div className="global_timer_main_item">
                <div className="global_timer_main_item_box">
                  {Functions.getDays(this.state.gameTime)}
                </div>
                <div className="global_timer_main_item_text">Days</div>
              </div>
              <div className="global_timer_main_item">
                <div className="global_timer_main_item_box">
                  {" "}
                  {Functions.getHours(this.state.gameTime)}
                </div>
                <div className="global_timer_main_item_text">Hours</div>
              </div>
              <div className="global_timer_main_item">
                <div className="global_timer_main_item_box">
                  {Functions.getMinuts(this.state.gameTime)}
                </div>
                <div className="global_timer_main_item_text">Mints</div>
              </div>
            </div>
          </div>
          <div
            className={
              "global_timer_button " + (this.state.expanded ? "" : "div_hide")
            }
          >
            Go to Game
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default withRouter(DrawTimer);
