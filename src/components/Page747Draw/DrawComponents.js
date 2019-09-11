import * as Functions from "./../common/functions";
import React, { Component, useState, useEffect } from "react";
import * as Constants from "./../common/constants";

export const InPlay = props => {
  var ticker;
  const [secondsTimer, setsecondsTimer] = useState("59");
  function startTimer() {
    ticker = setInterval(function() {
      setsecondsTimer(Functions.getSeconds(props.gameData.start_datetime));
    });
  }
  function stopTimer() {
    if (ticker) {
      clearInterval(ticker);
      ticker = null;
    }
  }
  function shouldShowTickTok() {
    var dt = new Date(props.gameData.start_datetime);
    var countDownDate = new Date(dt).getTime();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York"
    });
    usaTime = new Date(usaTime);
    var now = usaTime.getTime();
    var distance = countDownDate - now;
    return distance > 59000 ? false : true;
  }

  //if no number drawn
  if (props.drawRaw.length == 0) {
    //if game is unplayed
    if (props.gameData.status == "unplayed") {
      startTimer();
      return (
        <div className="live_draw_in_play">
          <p>In Play</p>
          <div className="live_draw_in_play_timer">
            {/* if time to start is greater than 60 seconds */}
            {!shouldShowTickTok() ? (
              <>
                {" "}
                <div className="live_draw_in_play_circle">-</div>
                {/* <div className="page747_live_draw_timer">
                  <div style={{ textAlign: "center" }}>
                    <p>Next draw starts in</p>
                    <div className="row page747_main_draw_inner secs_draw">
                      <div>
                        <p>
                          {" "}
                          {Functions.getDays(props.gameData.start_datetime)}
                        </p>
                        Days
                      </div>
                      <div>
                        <p>
                          {" "}
                          {Functions.getHours(props.gameData.start_datetime)}
                        </p>
                        hours
                      </div>

                      <div>
                        <p>
                          {" "}
                          {Functions.getMinuts(props.gameData.start_datetime)}
                        </p>
                        Mins
                      </div>
                      <div>
                        <p> {secondsTimer}</p>
                        Sec
                      </div>
                    </div>
                  </div>
                </div> */}
                  <div className="live_draw_in_play_timer_bottom text_only" style ={{marginTop: "44px"}}>
                  Next Number Drawn In -{" "}
                  
                </div>
              </>
            ) : (
              //if game is live and last minute
              <>
                <div className="live_draw_numbers_text">Number 1 of 7</div>
                <div
                  className={
                    secondsTimer < 1 &&
                    Functions.getMinuts(props.gameData.start_datetime) < 1
                      ? "live_draw_in_play_circle circle_active"
                      : "live_draw_in_play_circle circle_active double_line"
                  }
                >
                  {" "}
                  {secondsTimer < 1 &&
                  Functions.getMinuts(props.gameData.start_datetime) < 1 ? (
                    "GO!"
                  ) : (
                    <>
                      GET <br />
                      READY!
                    </>
                  )}
                </div>
                <div className="live_draw_in_play_timer_bottom">
                  Next Number Drawn In <span id="m-timer">{secondsTimer}</span>{" "}
                  sec.
                </div>
              </>
            )}
          </div>
        </div>
      );
    } //if game is live and no number is drawn
    else if (props.gameData.status == "live") {
      stopTimer();
      return (
        <div className="live_draw_in_play">
          <p>In Play</p>
          <div className="live_draw_in_play_timer">
            <div className="live_draw_numbers_text">Number 1 of 7</div>
            <div className="live_draw_in_play_circle circle_active">-</div>

            <>
              <div className="live_draw_in_play_timer_bottom">
                {props.mtimer == "#" ? (
                  <>Generating Numbers</>
                ) : (
                  <>
                    Next Number Drawn In{" "}
                    <span id="m-timer">{props.mtimer}</span> sec.
                  </>
                )}
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
  else if (props.gameData.status == "finished") {
    return (
      <div className="live_draw_in_play">
        <p>In Play</p>
        <div className="live_draw_in_play_timer">
          <div className="live_draw_numbers_text">
            {"Number " + props.drawRaw.length + " of 7"}
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
  } else {
    //if draw is in prgress with atlest one number drawn
    return (
      <div className="live_draw_in_play">
        <p>In Play</p>
        <div className="live_draw_in_play_timer">
          <div className="live_draw_numbers_text">
            {"Number " + props.drawRaw.length + " of 7"}
          </div>
          <div className="live_draw_in_play_circle">
            {props.drawRaw[props.drawRaw.length - 1].daw_ball_number}
          </div>

          <>
            <div className="live_draw_in_play_timer_bottom text_only">
              {props.mtimer == "#" ? (
                <>Generating Numbers</>
              ) : (
                <>
                  Next Number Drawn In <span id="m-timer">{props.mtimer}</span>{" "}
                  sec.
                </>
              )}
            </div>
          </>
        </div>
      </div>
    );
  }
};
