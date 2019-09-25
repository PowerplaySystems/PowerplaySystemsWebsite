import * as Functions from "./../common/functions";
import React, { Component, useState, useEffect } from "react";
import * as Constants from "./../common/constants";

export const InPlay = props => {
  let ticker;
  var drawInterval = null;
  const [secondsTimer, setsecondsTimer] = useState("59");
  const [nextDrawTime, setnextDrawTime] = useState(
    props.gameData.countdown_timer
  );
  function startTimer() {
    ticker = setInterval(function() {
      setsecondsTimer(Functions.getSeconds(props.gameData.start_datetime));
    }, 1000);
  }
  function stopTimer() {
    if (ticker) {
      clearInterval(ticker);
    }
  }
  function startDrawTimer() {
    if (drawInterval == null) {
      drawInterval = setInterval(function() {
        var remains = getNextTime();
        console.log(remains);
        setnextDrawTime(remains);
      }, 1000);
    }
  }
  function stopDrawTimer() {
    if (drawInterval) {
      clearInterval(drawInterval);
    }
  }

  function getNextTime() {
    if (props.drawRaw.length < 1) {
      return;
    }
    if (props.updatedAt == null) {
      var dt = new Date(props.drawRaw[props.drawRaw.length - 1].date_time);
    } else {
      var dt = new Date(props.updatedAt);
    }

    console.log(dt);
    dt.setSeconds(dt.getSeconds() + props.gameData.countdown_timer);
    var countDownDate = new Date(dt).getTime();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York"
    });
    usaTime = new Date(usaTime);
    var now = usaTime.getTime();
    var distance = countDownDate - now;

    if (distance > 0) {
      if (distance > props.gameData.countdown_timer * 1000) {
        return props.gameData.countdown_timer;
      }
      return parseInt(distance / 1000, 10);
    } else {
      if (props.drawRaw.length == 7) {
        clearInterval(drawInterval);
        props.getData();
        return 0;
      } else {
        clearInterval(drawInterval);
        setTimeout(function() {
          props.getNumbersDraw();
        }, props.gameData.delay * 1000);

        return props.gameData.countdown_timer;
      }
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
  console.log("In component");
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
                <>
                  Next Number Drawn In <span id="m-timer">{nextDrawTime}</span>{" "}
                  sec.
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
  else if (props.gameData.status == "finished") {
    stopDrawTimer();
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
  }
  //if draw is in prgress with atlest one number drawn
  else {
    startDrawTimer();
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
              <>
                Next Number Drawn In <span id="m-timer">{nextDrawTime}</span>{" "}
                sec.
              </>
            </div>
          </>
        </div>
      </div>
    );
  }
};
export const CountdownTimer = props => {
  var ticker = null;
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
  startTimer();
  return (
    <div className="page747_live_draw_timer">
      <div className="prize-none" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "22.4px", marginTop: "-20px !important" }}>
          Next draw starts in
        </p>
        <div className="row page747_main_draw_inner secs_draw">
          <div>
            <p> {Functions.getDays(props.gameData.start_datetime)}</p>
            Days
          </div>
          <div>
            <p> {Functions.getHours(props.gameData.start_datetime)}</p>
            hours
          </div>

          <div>
            <p> {Functions.getMinuts(props.gameData.start_datetime)}</p>
            Mints
          </div>
          <div>
            <p> {secondsTimer}</p>
            Sec
          </div>
        </div>
      </div>
    </div>
  );
};
