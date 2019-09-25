import * as Functions from "./../common/functions";
import React, { Component, useState, useEffect } from "react";
import * as Constants from "./../common/constants";
class InPlay extends Component {
  intervalIDSecs = null;
  intervalIDTimer = null;
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      steps: [],
      secondsTimer: 59,
      intervaler: null,
      drawTimer: null
    };
    this.shouldShowTickTok = this.shouldShowTickTok.bind(this);
  }
  componentDidMount() {
    this.checkIt();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.gameData.status != this.props.gameData.status ||
      prevProps.updatedAt != this.props.updatedAt
    ) {
      this.checkIt();
    }
  }
  checkIt() {
    if (this.props.gameData.status == "unplayed") {
      this.startTimer();
    } else if (
      this.props.gameData.status == "live" ||
      this.props.gameData.status == "In Progress"
    ) {
      this.stopTimer();
      if (this.props.drawRaw.length == 0) {
        this.setState({
          secondsTimer: this.props.gameData.countdown_timer
        });
      } else {
        this.startDrawTimer();
      }
    } else if (this.props.gameData.status == "finished") {
      this.stopTimer();
      this.stopDrawTimer();
    }
  }

  startTimer() {
    if (this.intervalIDSecs == null) {
      var that = this;
      this.intervalIDSecs = setInterval(function() {
        that.setState({
          secondsTimer: Functions.getSeconds(that.props.gameData.start_datetime)
        });
      }, 1000);
    }
  }
  stopTimer() {
    clearInterval(this.intervalIDSecs);
    this.intervalIDSecs = null;
  }
  startDrawTimer() {
    if (this.intervalIDTimer == null) {
      var that = this;
      var remains = that.getNextTime();
      console.log(remains);
      that.setState(
        {
          secondsTimer: remains
        },
        () => {
          this.intervalIDTimer = setInterval(function() {
            var remains = that.getNextTime();
            console.log(remains);
            that.setState({
              secondsTimer: remains
            });
          }, 1000);
        }
      );
    }
  }
  stopDrawTimer() {
    if (this.intervalIDTimer != null) {
      clearInterval(this.intervalIDTimer);
      this.intervalIDTimer = null;
    }
  }

  getNextTime() {
    if (this.props.drawRaw.length < 1) {
      return;
    }
    if (this.props.updatedAt == null) {
      var dt = new Date(
        this.props.drawRaw[this.props.drawRaw.length - 1].date_time
      );
    } else {
      var dt = new Date(this.props.updatedAt);
    }
    dt.setSeconds(dt.getSeconds() + this.props.gameData.countdown_timer);
    var countDownDate = new Date(dt).getTime();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York"
    });
    usaTime = new Date(usaTime);
    var now = usaTime.getTime();
    var distance = countDownDate - now;

    if (distance > 0) {
      if (distance > this.props.gameData.countdown_timer * 1000) {
        return this.props.gameData.countdown_timer;
      }

      return parseInt(distance / 1000, 10);
    } else {
      var that = this;
      if (this.props.drawRaw.length == 7) {
        clearInterval(this.intervalIDSecs);
        this.props.getData();
        return 0;
      } else {
        clearInterval(this.intervalIDSecs);
        setTimeout(function() {
          that.props.getNumbersDraw();
        }, this.props.gameData.delay * 1000);

        return this.props.gameData.countdown_timer;
      }
    }
  }

  shouldShowTickTok() {
    var dt = new Date(this.props.gameData.start_datetime);
    var countDownDate = new Date(dt).getTime();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York"
    });
    usaTime = new Date(usaTime);
    var now = usaTime.getTime();
    var distance = countDownDate - now;
    return distance > 59000 ? false : true;
  }
  render() {
    //if no number drawn
    if (this.props.drawRaw.length == 0) {
      //if game is unplayed
      if (this.props.gameData.status == "unplayed") {
        return (
          <div className="live_draw_in_play">
            <p>In Play</p>
            <div className="live_draw_in_play_timer">
              {/* if time to start is greater than 60 seconds */}
              {!this.shouldShowTickTok() ? (
                <>
                  {" "}
                  <div className="live_draw_in_play_circle">-</div>
                  <div
                    className="live_draw_in_play_timer_bottom text_only"
                    style={{ marginTop: "44px" }}
                  >
                    Next Number Drawn In -{" "}
                  </div>
                </>
              ) : (
                //if game is not live and last minute
                <>
                  <div className="live_draw_numbers_text">Number 1 of 7</div>
                  <div
                    className={
                      this.state.secondsTimer < 1 &&
                      Functions.getMinuts(this.props.gameData.start_datetime) <
                        1
                        ? "live_draw_in_play_circle circle_active"
                        : "live_draw_in_play_circle circle_active double_line"
                    }
                  >
                    {" "}
                    {this.state.secondsTimer < 1 &&
                    Functions.getMinuts(this.props.gameData.start_datetime) <
                      1 ? (
                      "GO!"
                    ) : (
                      <>
                        GET <br />
                        READY!
                      </>
                    )}
                  </div>
                  <div className="live_draw_in_play_timer_bottom">
                    Next Number Drawn In{" "}
                    <span id="m-timer">{this.state.secondsTimer}</span> sec.
                  </div>
                </>
              )}
            </div>
          </div>
        );
      } //if game is live and no number is drawn
      else if (this.props.gameData.status == "live") {
        return (
          <div className="live_draw_in_play">
            <p>In Play</p>
            <div className="live_draw_in_play_timer">
              <div className="live_draw_numbers_text">Number 1 of 7</div>
              <div className="live_draw_in_play_circle circle_active">-</div>

              <>
                <div className="live_draw_in_play_timer_bottom">
                  <>
                    Next Number Drawn In{" "}
                    <span id="m-timer">{this.state.secondsTimer}</span> sec.
                  </>
                </div>
              </>
            </div>
          </div>
        );
      } else {
        return <div className="live_draw_in_play" />;
      }
    }
    //if finished
    else if (this.props.gameData.status == "finished") {
      return (
        <div className="live_draw_in_play">
          <p>In Play</p>
          <div className="live_draw_in_play_timer">
            <div className="live_draw_numbers_text">
              {"Number " + this.props.drawRaw.length + " of 7"}
            </div>
            <div className="live_draw_in_play_circle">-</div>

            <>
              <div className="live_draw_in_play_timer_bottom text_only draw_finished">
                Draw Completed!
              </div>
            </>
          </div>
        </div>
      );
    }
    //if draw is in prgress with atlest one number drawn
    else {
      return (
        <div className="live_draw_in_play">
          <p>In Play</p>
          <div className="live_draw_in_play_timer">
            <div className="live_draw_numbers_text">
              {"Number " + this.props.drawRaw.length + " of 7"}
            </div>
            <div className="live_draw_in_play_circle">
              {
                this.props.drawRaw[this.props.drawRaw.length - 1]
                  .daw_ball_number
              }
            </div>

            <>
              <div className="live_draw_in_play_timer_bottom text_only">
                <>
                  Next Number Drawn In{" "}
                  <span id="m-timer">{this.state.secondsTimer}</span> sec.
                </>
              </div>
            </>
          </div>
        </div>
      );
    }
  }
}
export default InPlay;
