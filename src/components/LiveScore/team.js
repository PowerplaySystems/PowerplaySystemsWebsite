import React, { Component, useState, useEffect } from "react";
import Modal from "react-bootstrap/lib/Modal";
import * as Constants from "./../common/constants";
var text;
export const TeamSelected = props => {
  var item = props.data;
  function passPowerplayClicks(
    id,
    feed_game_id,
    my_score_home,
    mType,
    isMyTeamHome
  ) {
    props.onClickPowerplay(
      id,
      feed_game_id,
      my_score_home,
      mType,
      isMyTeamHome
    );
  }
  function passSwapClicks(id, feed_game_id, isMyTeamHome, status, home_score) {
    props.onSwapClicked(id, feed_game_id, isMyTeamHome, status, home_score);
  }
  function canUsePowerplay(powerplay, score, isLocked) {
    let obj = props.powerplays.find(o => o.id == powerplay);
    if (!obj) {
      text = "Can not Use";
      return false;
    }
    if (isLocked && obj.id != Constants.SPORTS_POWERPLAY_UNDO) {
      text = "Locked Score can’t be changed.You can use Undo powerplay";
      return false;
    }
    if (obj.id == Constants.SPORTS_POWERPLAY_LOCK) {
      if (score != 1) {
        text = "My Score Must be 1";
        return false;
      }
      if (obj.amount_available < 1) {
        text = "You Have 0 Locks";
        return false;
      }
      text = obj.amount_available + " left";
      return true;
    }
    if (obj.id == Constants.SPORTS_POWERPLAY_SWAP) {
      if (obj.amount_available < 1) {
        text = "You Have 0 Swaps";
        return false;
      }
      text = obj.amount_available + " left";
      return true;
    }
    if (obj.id == Constants.SPORTS_POWERPLAY_11_TO_1) {
      if (score != 11) {
        text = "My Score Must be 11";
        return false;
      }
      if (obj.amount_available < 1) {
        text = "You Have 0 Refreshes";
        return false;
      }
      text = obj.amount_available + " left";
      return true;
    }
    if (obj.id == Constants.SPORTS_POWERPLAY_UNDO) {
      if (obj.amount_available < 1) {
        text = "You Have 0 Undo";
        return false;
      }
      text = obj.amount_available + " left";
      return true;
    }
    if (obj.id == Constants.SPORTS_POWERPLAY_DESCREASE) {
      if (score < 1) {
        text = "My Score Must be > 0";
        return false;
      }
      if (obj.amount_available < 1) {
        text = "You Have 0 Decreses";
        return false;
      }
      text = obj.amount_available + " left";
      return true;
    }
    if (obj.id == Constants.SPORTS_POWERPLAY_INCREASE) {
      if (obj.amount_available < 1) {
        text = "You Have 0 Increases";
        return false;
      }
      text = obj.amount_available + " left";
      return true;
    }
  }
  if (props.type == "home") {
    return (
      <>
        {" "}
        <div className="live_score_match_details_top_row">
          <div className="live_score_match_details_team_name">
            {item.home_team}
          </div>
          <div className="live_score_match_details_team_score">
            {item.home_score}
          </div>
        </div>
        <div className="live_score_match_details_second_row">
          <div className="live_score_match_details_pitcher">
            {item.status == "UNPLAYED" ? "Starting Pitcher " : "Pitching "}
            <span>
              {item.current_pitcher_home == null ||
              item.current_pitcher_home == ""
                ? "--"
                : item.current_pitcher_home.split(" ")[0][0] +
                  "." +
                  item.current_pitcher_home.split(" ")[1]}
              /
              {item.current_pitcher_home_era == null
                ? "--"
                : parseFloat(item.current_pitcher_home_era).toFixed(2)}
            </span>
          </div>
          <div className="live_score_match_details_my_score_wrapper">
            <div className="live_score_match_details_my_score_txt">
              My Score
            </div>
            <span className="live_score_match_details_my_score">
              {item.my_score_home}
            </span>
            {props.isHomeLocked ? (
              <img
                src={require("./../../assets/images/livescore/lock.png")}
                className="img-responsive img-locked"
              />
            ) : (
              ""
            )}
          </div>
          <div
            className={
              "" + item.status == "LIVE"
                ? item.isMyTeamHome
                  ? "live_score_match_details_swap_wrapper"
                  : "live_score_match_details_swap_wrapper  div-disabled"
                : "live_score_match_details_swap_wrapper  div-disabled"
            }
          >
            <img
              src={require("./../../assets/images/livescore/group_13_15.png")}
              className="img-responsive"
              onClick={() =>
                passPowerplayClicks(
                  item.home_team_id,
                  item.feed_game_id,
                  item.my_score_home,
                  "undo",
                  item.isMyTeamHome
                )
              }
            />
            {/* <span>Hi</span> */}
          </div>
        </div>
        <div
          className={
            "" + item.status == "LIVE"
              ? item.isMyTeamHome
                ? "live_score_match_details_powerplays_wrapper"
                : "live_score_match_details_powerplays_wrapper  div-disabled"
              : "live_score_match_details_powerplays_wrapper  div-disabled"
          }
        >
          <div>
            <img
              src={require("./../../assets/images/livescore/group_18.png")}
              className="img-responsive"
              onClick={() =>
                passPowerplayClicks(
                  item.home_team_id,
                  item.feed_game_id,
                  item.my_score_home,
                  "lock",
                  item.isMyTeamHome
                )
              }
            />
          </div>
          <div>
            <img
              src={require("./../../assets/images/livescore/group_13_12.png")}
              className="img-responsive"
              onClick={() =>
                passPowerplayClicks(
                  item.home_team_id,
                  item.feed_game_id,
                  item.my_score_home,
                  "refresh",
                  item.isMyTeamHome
                )
              }
            />
          </div>
          <div>
            <img
              src={require("./../../assets/images/livescore/group_13_copy_2.png")}
              className="img-responsive"
              onClick={() =>
                passPowerplayClicks(
                  item.home_team_id,
                  item.feed_game_id,
                  item.my_score_home,
                  "super-bust",
                  item.isMyTeamHome
                )
              }
            />
          </div>
          <div>
            <img
              src={require("./../../assets/images/livescore/group_13_13.png")}
              className="img-responsive"
              onClick={() =>
                passPowerplayClicks(
                  item.home_team_id,
                  item.feed_game_id,
                  item.my_score_home,
                  "bust",
                  item.isMyTeamHome
                )
              }
            />
          </div>
          <div>
            <img
              src={require("./../../assets/images/livescore/group_24.png")}
              className="img-responsive"
              onClick={() =>
                passSwapClicks(
                  item.home_team_id,
                  item.feed_game_id,
                  item.isMyTeamHome,
                  item.status,
                  item.home_score
                )
              }
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {" "}
        <div className="live_score_match_details_top_row">
          <div className="live_score_match_details_team_name">
            {item.away_team}
          </div>
          <div className="live_score_match_details_team_score">
            {item.away_score}
          </div>
        </div>
        <div className="live_score_match_details_second_row">
          <div className="live_score_match_details_pitcher">
            {item.status == "UNPLAYED" ? "Starting Pitcher " : "Pitching "}
            <span>
              {item.current_pitcher_away == null ||
              item.current_pitcher_away == ""
                ? "--"
                : item.current_pitcher_away.split(" ")[0][0] +
                  "." +
                  item.current_pitcher_away.split(" ")[1]}
              /
              {item.current_pitcher_away_era == null
                ? "--"
                : parseFloat(item.current_pitcher_away_era).toFixed(2)}
            </span>
          </div>
          <div className="live_score_match_details_my_score_wrapper">
            <div className="live_score_match_details_my_score_txt">
              My Score
            </div>
            <span className="live_score_match_details_my_score">
              {item.my_score_away}
            </span>
            {props.isAwayLocked ? (
              <img
                src={require("./../../assets/images/livescore/lock.png")}
                className="img-responsive img-locked"
              />
            ) : (
              ""
            )}
          </div>
          <div
            className={
              "" + item.status == "LIVE"
                ? item.isMyTeamAway
                  ? "live_score_match_details_swap_wrapper"
                  : "live_score_match_details_swap_wrapper  div-disabled"
                : "live_score_match_details_swap_wrapper  div-disabled"
            }
          >
            <img
              src={require("./../../assets/images/livescore/group_13_15.png")}
              className="img-responsive"
              onClick={() =>
                passPowerplayClicks(
                  item.away_team_id,
                  item.feed_game_id,
                  item.my_score_away,
                  "undo",
                  item.isMyTeamAway
                )
              }
            />
          </div>
        </div>
        <div
          className={
            "" + item.status == "LIVE"
              ? item.isMyTeamAway
                ? "live_score_match_details_powerplays_wrapper"
                : "live_score_match_details_powerplays_wrapper  div-disabled"
              : "live_score_match_details_powerplays_wrapper  div-disabled"
          }
        >
          <div>
            <img
              src={require("./../../assets/images/livescore/group_18.png")}
              className="img-responsive"
              onClick={() =>
                passPowerplayClicks(
                  item.away_team_id,
                  item.feed_game_id,
                  item.my_score_away,
                  "lock",
                  item.isMyTeamAway
                )
              }
            />
            <span>HH</span>
          </div>
          <div>
            <img
              src={require("./../../assets/images/livescore/group_13_12.png")}
              className="img-responsive"
              onClick={() =>
                passPowerplayClicks(
                  item.away_team_id,
                  item.feed_game_id,
                  item.my_score_away,
                  "refresh",
                  item.isMyTeamAway
                )
              }
            />
            <span>HH</span>
          </div>
          <div>
            <img
              src={require("./../../assets/images/livescore/group_13_copy_2.png")}
              className="img-responsive"
              onClick={() =>
                passPowerplayClicks(
                  item.away_team_id,
                  item.feed_game_id,
                  item.my_score_away,
                  "super-bust",
                  item.isMyTeamAway
                )
              }
            />
            <span>HH</span>
          </div>
          <div>
            <img
              src={require("./../../assets/images/livescore/group_13_13.png")}
              className="img-responsive"
              onClick={() =>
                passPowerplayClicks(
                  item.away_team_id,
                  item.feed_game_id,
                  item.my_score_away,
                  "bust",
                  item.isMyTeamAway
                )
              }
            />
            <span>HH</span>
          </div>
          <div>
            <img
              src={require("./../../assets/images/livescore/group_24.png")}
              className="img-responsive"
              onClick={() =>
                this.passSwapClicks(
                  item.away_team_id,
                  item.feed_game_id,
                  item.isMyTeamAway,
                  item.status,
                  item.away_score
                )
              }
            />
            <span>HH</span>
          </div>
        </div>
      </>
    );
  }
};

export const TeamNotSelected = props => {
  var item = props.data;
  if (props.type == "home") {
    return (
      <div className="live_score_team_unselected">
        <div className="live_score_match_details_top_row">
          <div className="live_score_match_details_team_name">
            {item.home_team}
          </div>
          <div className="live_score_match_details_team_score">
            {" "}
            {item.home_score}
          </div>
        </div>
        <div className="live_score_match_details_second_row">
          <div className="live_score_match_details_pitcher">
            {item.status == "UNPLAYED" ? "Starting Pitcher " : "Pitching "}
            <span>
              {item.current_pitcher_home == null ||
              item.current_pitcher_home == ""
                ? "--"
                : item.current_pitcher_home.split(" ")[0][0] +
                  "." +
                  item.current_pitcher_home.split(" ")[1]}
              /
              {item.current_pitcher_home_era == null
                ? "--"
                : parseFloat(item.current_pitcher_home_era).toFixed(2)}
            </span>
          </div>
          <div className="live_score_not_selected_text">
            Team Not selected. No Powerplays for this team.
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="live_score_team_unselected">
        <div className="live_score_match_details_top_row">
          <div className="live_score_match_details_team_name">
            {item.away_team}
          </div>
          <div className="live_score_match_details_team_score">
            {" "}
            {item.away_score}
          </div>
        </div>
        <div className="live_score_match_details_second_row">
          <div className="live_score_match_details_pitcher">
            {item.status == "UNPLAYED" ? "Starting Pitcher " : "Pitching "}
            <span>
              {item.current_pitcher_away == null ||
              item.current_pitcher_away == ""
                ? "--"
                : item.current_pitcher_away.split(" ")[0][0] +
                  "." +
                  item.current_pitcher_away.split(" ")[1]}
              /
              {item.current_pitcher_away_era == null
                ? "--"
                : parseFloat(item.current_pitcher_away_era).toFixed(2)}
            </span>
          </div>
          <div className="live_score_not_selected_text">
            Team Not selected. No Powerplays for this team.
          </div>
        </div>
      </div>
    );
  }
};

export const MyScores = props => {
  if (props.gameStatus == "UNPLAYED") {
    return (
      <div className="live_score_my_score">
        <div className="live_score_my_score_heading">
          Your Game Set has not started.
        </div>
        <div className="live_score_my_score_descr">
          In this section, you will see your selected teams and scores.
        </div>
      </div>
    );
  } else {
    return (
      <div className="live_score_my_score">
        {props.matches.map((item, key) => {
          if (item.isMyTeamHome && item.isMyTeamAway) {
            return (
              <>
                <div className="live_score_selected_team_box">
                  {item.home_team} &nbsp; &nbsp; <div>{item.my_score_home}</div>
                  {item.status == "COMPLETED" ? (
                    <div className="team_match_status">Game Ended</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="live_score_selected_team_box">
                  {item.away_team} &nbsp; &nbsp; <div>{item.my_score_away}</div>
                  {item.status == "COMPLETED" ? (
                    <div className="team_match_status">Game Ended</div>
                  ) : (
                    ""
                  )}
                </div>
              </>
            );
          } else if (item.isMyTeamHome) {
            return (
              <div className="live_score_selected_team_box">
                {item.home_team} &nbsp; &nbsp; <div>{item.my_score_home}</div>
                {item.status == "COMPLETED" ? (
                  <div className="team_match_status">Game Ended</div>
                ) : (
                  ""
                )}
              </div>
            );
          } else if (item.isMyTeamAway) {
            return (
              <div className="live_score_selected_team_box">
                {item.away_team} &nbsp; &nbsp; <div>{item.my_score_away}</div>
                {item.status == "COMPLETED" ? (
                  <div className="team_match_status">Game Ended</div>
                ) : (
                  ""
                )}
              </div>
            );
          }
        })}
      </div>
    );
  }
};

export const TeamDetails = props => {
  if (props.gameStatus == "UNPLAYED") {
    return (
      <div className="live_score_current_score_details_unplayed">
        <img
          src={require("./../../assets/images/livescore/winner.png")}
          className="img-responsive"
        />
        <div className="live_score_score_details_heading">
          Check here for live updates to your potential winnings.{" "}
        </div>
        <div className="live_score_my_score_descr">
          Upon game set start, you will be watching your live point total in
          this section.
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="live_score_current_score_details_top_wapper">
          <div className="live_score_current_score_details_img_wapper">
            <img
              src={require("./../../assets/images/livescore/winner.png")}
              className="img-responsive"
            />
          </div>
          <div className="live_score_current_score_details_right_wrapper">
            <div className="live_score_status_teams">
              Teams with 1 run &nbsp;&nbsp;
              <span>{props.mTotlaScore + "/" + props.meta.myPicksCount}</span>
            </div>{" "}
            <div className="live_score_status_points">
              Live Point total &nbsp;&nbsp;
              <span>
                {props.meta.myPicksCount && props.meta.myPicksCount != undefined
                  ? (props.mTotlaScore / props.meta.myPicksCount) * 100 + "/100"
                  : "0/100"}
              </span>
            </div>
          </div>
        </div>
        <div className="live_score_current_score_details_bottom_wapper">
          <div className="live_score_current_score_details_text">
            The Live Point Total is based on your current scores and will be
            updated as your scores change
          </div>
        </div>
      </>
    );
  }
};
export const MyPowerplaysInventory = props => {
  return (
    <div className="live_score_powerplay_inventory">
      {props.powerplays.map((element, key) => {
        if (element.powerplay_id == 13) {
          return (
            <div className="live_score_inventory_item_wapper">
              <img
                src={require("./../../assets/images/livescore/group_13_12.png")}
                className="img-responsive"
              />
              <div className="live_score_powerplay_name">
                {element.powerplay_name} &nbsp;
                <span> {element.amount_available}</span>
              </div>
            </div>
          );
        }
        if (element.powerplay_id == 1) {
          return (
            <div className="live_score_inventory_item_wapper">
              <img
                src={require("./../../assets/images/livescore/group_18.png")}
                className="img-responsive"
              />
              <div className="live_score_powerplay_name">
                {element.powerplay_name} &nbsp;
                <span> {element.amount_available}</span>
              </div>
            </div>
          );
        }
        if (element.powerplay_id == 18) {
          return (
            <div className="live_score_inventory_item_wapper">
              <img
                src={require("./../../assets/images/livescore/group_13_copy_2.png")}
                className="img-responsive"
              />
              <div className="live_score_powerplay_name">
                Decrease: &nbsp;
                <span> {element.amount_available}</span>
              </div>
            </div>
          );
        }
        if (element.powerplay_id == 19) {
          return (
            <div className="live_score_inventory_item_wapper">
              <img
                src={require("./../../assets/images/livescore/group_13_13.png")}
                className="img-responsive"
              />
              <div className="live_score_powerplay_name">
                Increase: &nbsp;
                <span> {element.amount_available}</span>
              </div>
            </div>
          );
        }
        if (element.powerplay_id == 21) {
          return (
            <div className="live_score_inventory_item_wapper">
              <img
                src={require("./../../assets/images/livescore/group_13_15.png")}
                className="img-responsive"
              />
              <div className="live_score_powerplay_name">
                {element.powerplay_name} &nbsp;
                <span> {element.amount_available}</span>
              </div>
            </div>
          );
        }
        if (element.powerplay_id == 24) {
          return (
            <div className="live_score_inventory_item_wapper">
              <img
                src={require("./../../assets/images/livescore/group_24.png")}
                className="img-responsive"
              />
              <div className="live_score_powerplay_name">
                {element.powerplay_name} &nbsp;
                <span> {element.amount_available}</span>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export const GameRules = props => {
  const [tab, setTab] = useState(0);
  const [content, setContent] = useState("Content");
  const [heading, setHeading] = useState("Heading");
  const [rules, setRules] = useState("");
  // const [visible, setVisible] = useState(props.isVisible);
  function handleClose() {
    props.updateModalState(false);
  }
  function setActiveTab(tabIndex) {
    console.log(tabIndex);
    setTab(tabIndex);
  }
  useEffect(() => {
    if (rules == "") {
      getData();
    }
  });
  async function getData() {
    fetch("https://www.powerplaysystems.com/api/select_game/readrules.php?id=2")
      .then(res => res.json())
      .then(xx => {
        let reArranged = [];
        let GeneralRules = "",
          Gamesets = "",
          Powerplays = "",
          SuspendedGames = "",
          CanceledGames = "";
        if (xx.records != "") {
          xx.records.forEach(element => {
            if (element.rule.trim() == "General Rules") {
              GeneralRules = element;
            }
            if (element.rule.trim() == "Gamesets") {
              Gamesets = element;
            }
            if (element.rule.trim() == "Powerplays") {
              Powerplays = element;
            }
            if (element.rule.trim() == "Suspended Games") {
              SuspendedGames = element;
            }
            if (element.rule.trim() == "Canceled Games") {
              CanceledGames = element;
            }
          });
        }
        let index = 0;

        if (GeneralRules != "") {
          reArranged[index] = GeneralRules;
          index++;
        }
        if (Gamesets != "") {
          reArranged[index] = Gamesets;
          index++;
        }
        if (Powerplays != "") {
          reArranged[index] = Powerplays;
          index++;
        }
        if (SuspendedGames != "") {
          reArranged[index] = SuspendedGames;
          index++;
        }
        if (CanceledGames != "") {
          reArranged[index] = CanceledGames;
          index++;
        }
        setRules(reArranged);
      });
  }
  if (props.shouldShow) {
    if (rules == "") {
      return "Getting Rules";
    } else {
      return (
        <Modal className="rules_modal" show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Game Rules </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="rules_tabs_wrapper">
              {rules.map((data, key) => (
                <button
                  className={"rules_tab " + (tab == key ? "active" : "")}
                  onClick={() => setActiveTab(key)}
                >
                  {data.rule}
                </button>
              ))}
            </div>

            <div className="rules_tab_content">
              <p
                className="rules_content"
                dangerouslySetInnerHTML={{ __html: rules[tab].text }}
              />
            </div>
          </Modal.Body>
        </Modal>
      );
    }
  } else {
    return "x";
  }
};
