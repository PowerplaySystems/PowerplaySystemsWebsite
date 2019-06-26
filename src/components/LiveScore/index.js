import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import ListGroup from "react-bootstrap/lib/ListGroup";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";
import Cookies from "universal-cookie";

const pStyle = {
  fontSize: "15px",
  textAlign: "center"
};
//variables for swap team
var currentTeams = [];
var currentAction = null;

var newTeams = [],
  newEntry;
var counter = 0;
var mTotlaScore = 0;

//saving current game
var activeGame = null;
var mGameIndex = 0;
var isTeamNumberOkay = true;

//Selected Teams
var mPick = "";
var mPicks = [];

//for popup message
var popupText = "Error";
var popupHeader = "Sorry!";

var scrollKey = -1;
var hasGamesOnLeft = true;
var hasSubscription = false;
class LiveScore extends Component {
  constructor(props) {
    super(props);
    activeGame = this.props.location.state.game;
    mGameIndex = 0;
    this.state = {
      error: null,
      isLoaded: false,
      games: this.props.location.state.allGames,
      cc: 0,
      liveScores: [],
      prizeTable: [],
      powerplays: [],
      allMatches: [],
      show: false,
      showTeamModal: false,
      reload: true,
      meta: []
    };
    console.log(this.state.games);
    mGameIndex = this.state.games.indexOf(activeGame);
    setInterval(() => this.cronJob(mGameIndex), 60000);
    this.onUpdateTeamSelectionClicked = this.onUpdateTeamSelectionClicked.bind(
      this
    );
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowTeams = this.handleShowTeams.bind(this);
    this.handleCloseTeams = this.handleCloseTeams.bind(this);
  }

  cronJob(mGameIndex) {
    //check if the modal is open, if not, fectch updates
    if (!this.state.showTeamModal) {
      scrollKey = -1;
      this.fetchGame(mGameIndex);
    }
  }

  fetchGame(index) {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    const mGame = this.state.games[index];
    console.log(mGame);
    var entry = this.state.games[index].id;
    fetch(
      "https://mypowerplaygames.com/public_api/livescore/data.php?jwt=" +
        jwt +
        "&entry_id=" +
        entry +
        "&date=" +
        mGame.stat_time +
        "&prize_id=" +
        mGame.prize_id +
        "&game_id=" +
        mGame.game_id +
        "&gameset_id=" +
        mGame.gameset_id +
        "&league_id=" +
        mGame.league_id
    )
      .then(res => res.json())
      .then(
        result => {
          counter = counter + 1;
          this.setState({
            allMatches: result.matches,
            prizeTable: result.prizes,
            powerplays: result.powerplays,
            meta: result.meta,
            cc: counter
          });
          hasSubscription = this.state.meta.hasSubscription;
          this.sortMatchesOrder();
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
    mGameIndex = index;
    activeGame = this.state.games[index];

    fetch(
      "https://mypowerplaygames.com/public_api/schedule/mypicks.php?jwt=" +
        jwt +
        "&entry=" +
        entry
    )
      .then(res => res.json())
      .then(
        result => {
          result = result.records;
          var x = [];
          result.forEach(element => {
            x.push(element.pick);
          });
          mPicks = x;
        },
        error => {
          this.setState({
            hasError: true,
            error: error
          });
        }
      );
  }

  onLeftArrow() {
    var index = mGameIndex;
    if (this.state.games.length - 1 == index) {
      //index = 0;
    } else {
      index++;
      this.fetchGame(index);
    }
    if (this.state.games.length - 1 == index) {
      hasGamesOnLeft = false;
    } else {
      hasGamesOnLeft = true;
    }
  }

  onRightArrow() {
    var index = mGameIndex;
    if (index == 0) {
      popupHeader = "Sorry!";
      popupText = "You have not entered any future dated games";

      this.handleShow();
    } else {
      index--;
      this.fetchGame(index);
    }
    if (this.state.games.length - 1 == index) {
      hasGamesOnLeft = false;
    } else {
      hasGamesOnLeft = true;
    }
  }

  onUpdateTeamSelectionClicked(team, match, action, matchStatus, tScore) {
    var addOrDrop = "add";
    if (matchStatus == "LIVE" || matchStatus == "UNPLAYED") {
      var teams = [];
      var SelectedTeams = teams.length;
      var min = activeGame.min_teams_allowed;
      var max = activeGame.max_teams_allowed;
      var id = match + "-" + team;
      mPick = team;

      if (matchStatus == "LIVE") {
        //check if powerplay available
        var powerplay = this.state.powerplays.find(
          x => x.powerplay_id == 24
        );
        if (powerplay) {
          if (powerplay.amount_available <= 0) {
            popupText = "Powerplay has been fully used!";
            popupHeader = "Sorry!";
            this.handleShow();
            return;
          }
        }else{
          popupText = "Powerplay has been fully used!";
          popupHeader = "Sorry!";
          this.handleShow();
        }
        if (this.state.showTeamModal != true) {
          currentTeams = [];
          mPicks.forEach(element => {
            currentTeams.push(element);
          });
          if (!action) {
            addOrDrop = currentAction = "add";
            this.handleShowTeams();
            this.forceUpdate();
            currentTeams.push(id);
            console.log(currentTeams)
          } else {
            addOrDrop = currentAction = "minus";
            currentTeams = currentTeams.filter(item => item != id);
            this.handleShowTeams();
            this.forceUpdate();
          }
          return false;
        } else {
          if (currentAction == "add") {
            currentTeams = currentTeams.filter(item => item != id);
          } else {
            currentTeams.push(id);
          }
          teams = currentTeams.slice(0);
          this.handleCloseTeams();
          scrollKey = match;
          newTeams = teams.slice(0);
          this.onPowerplayClicked(team, match, tScore, "swap");
          return true;
        }
      } else {
        if (this.state.showTeamModal == true) {
          console.log(currentTeams)
          if (currentAction == "add") {
            currentTeams = currentTeams.filter(item => item != id);
            
          } else {
            currentTeams.push(id);
            
          }
          teams = currentTeams.slice(0);
          console.log(currentTeams)
          this.handleCloseTeams();
          scrollKey = match;
          newTeams = teams.slice(0);
          this.onPowerplayClicked(team, match, tScore, "swap");
          return true;
        }else{
          mPicks.forEach(element => {
            teams.push(element);
          });
          //action add team
          //id = 5
         
          if (!action) {
            addOrDrop = "add";
            if (!(teams.length >= max)) {
              isTeamNumberOkay = true;
              teams.push(id);
              mPicks = teams;
            } else {
              popupText = "You can Only Select " + max + "Teams!";
              popupHeader = "Sorry!";
              this.handleShow();
              return;
            }
          }
          //action drop team
          //id = 4
          else if (action) {
            SelectedTeams = teams.length;
            addOrDrop = "minus";
            if (isTeamNumberOkay) {
              if ( SelectedTeams<= min) {
                popupText = "Not Allowed";
                popupHeader = "Sorry!";
                this.handleShow();
              } else {
                teams = teams.filter(item => item !== id);
                mPicks = teams;
              }
            } else {
              popupText = "Please Add A team First";
              popupHeader = "Sorry!";
              this.handleShow();
              return;
            }
          } else {
            popupText = "Not Allowed";
            popupHeader = "Sorry!";
            this.handleShow();
          }
        }
  
        }
        console.log(currentTeams);
        console.log(teams);
       
      if (teams.length >= min && teams.length <= max) {
        scrollKey = match;
        const cookies = new Cookies();
        const jwt = cookies.get("jwt");
        if (matchStatus == "UNPLAYED") {
          var data =
            "teams=" + teams + "&jwt=" + jwt + "&entry=" + activeGame.id;

          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          var that = this;
          xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
              if (~this.responseText.indexOf("Successful")) {
                that.fetchGame(mGameIndex);
              } else {
                popupText = "Something Went Wrong, Please Try Again";
                popupHeader = "Sorry!";
                this.handleShow();
              }
            }
          });
          xhr.open(
            "POST",
            " https://www.mypowerplaygames.com/public_api/schedule/setmypicks.php"
          );
          xhr.setRequestHeader(
            "content-type",
            "application/x-www-form-urlencoded"
          );
          xhr.send(data);
        }
        if (matchStatus == "LIVE") {
          newTeams = teams.slice(0);
          this.onPowerplayClicked(team, match, tScore, "swap");
        }
      } else {
        popupText = "Something Went wrong, We are working to solve it.";
        popupHeader = "Sorry!";
        this.handleShow();
      }
    } else {
      popupText = "This Action Is not available at this time";
      popupHeader = "Sorry!";
      this.handleShow();
    }
  }
  onPowerplayClicked(team, match, score, powerplay) {
    if (!isTeamNumberOkay) {
      popupText = "Please Add A Team First";
      popupHeader = "Sorry!";
      this.handleShow();
      return;
    }
    if (!hasSubscription) {
      popupText = (
        <p style={pStyle}>
          You Need A live Score Subscription To Access Powerplays On this Page.
          <br /> Please{" "}
          <a onClick={() => this.props.history.push("/powerplay-store")}>
            CLICK HERE
          </a>{" "}
          to add!
        </p>
      );
      popupHeader = "Sorry!";
      this.handleShow();
      return;
    }
    var powerplay_id;
    if (powerplay == "bust") {
      powerplay_id = 19;
      this.updateScore(
        activeGame.game_id,
        activeGame.id,
        match,
        team,
        score,
        score + 1,
        powerplay_id
      );
    }
    if (powerplay == "super-bust") {
      powerplay_id = 18;
      if (score > 0)
        this.updateScore(
          activeGame.game_id,
          activeGame.id,
          match,
          team,
          score,
          score - 1,
          powerplay_id
        );
      else {
        popupText = "Not Allowed";
        popupHeader = "Sorry!";
        this.handleShow();
      }
    }
    if (powerplay == "referesh") {
      powerplay_id = 13;
      if (score == 11)
        this.updateScore(
          activeGame.game_id,
          activeGame.id,
          match,
          team,
          score,
          1,
          powerplay_id
        );
      else {
        popupText = "Score Is Not 11";
        popupHeader = "Sorry!";
        this.handleShow();
      }
    }
    if (powerplay == "lock") {
      powerplay_id = 1;
      if (score == 1)
        this.updateScore(
          activeGame.game_id,
          activeGame.id,
          match,
          team,
          score,
          1,
          powerplay_id
        );
      else {
        popupText = "Score Is Not 1";
        popupHeader = "Sorry!";
        this.handleShow();
      }
    }
    if (powerplay == "minus") {
      powerplay_id = 4;

      this.updateScore(
        activeGame.game_id,
        activeGame.id,
        match,
        team,
        score,
        score,
        powerplay_id
      );
    }
    if (powerplay == "add") {
      powerplay_id = 5;

      this.updateScore(
        activeGame.game_id,
        activeGame.id,
        match,
        team,
        score,
        score,
        powerplay_id
      );
    }
    if (powerplay == "undo") {
      powerplay_id = 21;
      this.updateScore(
        activeGame.game_id,
        activeGame.id,
        match,
        team,
        score,
        score,
        powerplay_id
      );
    }
    if (powerplay == "swap") {
      powerplay_id = 24;
      this.updateScore(
        activeGame.game_id,
        activeGame.id,
        match,
        team,
        score,
        score,
        powerplay_id
      );
    }
  }

  updateScore(
    game,
    entry,
    match,
    team,
    score_before,
    score_after,
    mPowerplay_id
  ) {
    var powerplay = this.state.powerplays.find(
      x => x.powerplay_id == mPowerplay_id
    );
    if (powerplay) {
      if (powerplay.amount_available > 0) {
        const cookies = new Cookies();
        const jwt = cookies.get("jwt");
        if (mPowerplay_id == 4 || mPowerplay_id == 5 || mPowerplay_id == 24) {
          var data =
            "team=" +
            team +
            "&jwt=" +
            jwt +
            "&game=" +
            game +
            "&entry=" +
            entry +
            "&match=" +
            match +
            "&score_before=" +
            score_before +
            "&score_after=" +
            score_after +
            "&powerplay=" +
            mPowerplay_id +
            "&teams=" +
            newTeams;
        } else {
          var data =
            "team=" +
            team +
            "&jwt=" +
            jwt +
            "&game=" +
            game +
            "&entry=" +
            entry +
            "&match=" +
            match +
            "&score_before=" +
            score_before +
            "&score_after=" +
            score_after +
            "&powerplay=" +
            mPowerplay_id;
        }
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        var that = this;
        xhr.addEventListener("readystatechange", function() {
          if (this.readyState === 4) {
            if (~this.responseText.indexOf("Updated")) {
              const index = that.state.games.indexOf(that.state.activeGame);
              that.fetchGame(mGameIndex);
            } else {
              popupText = "Something Went Wrong, Please Try Again";
              popupHeader = "Sorry!";
              that.handleShow();
            }
          }
        });
        xhr.open(
          "POST",
          " https://www.mypowerplaygames.com/public_api/livescore/setscore.php"
        );
        xhr.setRequestHeader(
          "content-type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(data);
      } else {
        popupText = "Powerplay has been fully used!";
        popupHeader = "Sorry!";
        this.handleShow();
        return;
      }
    } else {
      popupText = "Something Went Wrong, Please Try Again";
      popupHeader = "Sorry!";
      this.handleShow();
      return;
    }
  }
  tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  }
  componentDidMount() {
    mGameIndex = this.state.games.indexOf(activeGame);
    this.fetchGame(mGameIndex);
    const divToScrollTo = document.getElementById("match-" + scrollKey);
    if (divToScrollTo) {
      divToScrollTo.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }
  componentDidUpdate() {
    const divToScrollTo = document.getElementById("match-" + scrollKey);
    if (divToScrollTo) {
      divToScrollTo.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }
  sortMatchesOrder() {
    let rearranged = [];

    let bothMyteams = [];
    let singleMyTeam = [];
    let noneMyteam = [];

    let index = 0;
    let indexSingle = 0;
    this.state.allMatches.forEach(match => {
      var isHome = false;
      var isAway = false;
      if (match.isMyTeamAway) {
        isAway = true;
      }
      if (match.isMyTeamHome) {
        isHome = true;
      }
      if (isHome && isAway) {
        bothMyteams.push(match);
      } else if (isHome || isAway) {
        singleMyTeam.push(match);
      } else {
        noneMyteam.push(match);
      }
    });

    bothMyteams.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    singleMyTeam.sort(
      (a, b) => new Date(a.start_time) - new Date(b.start_time)
    );
    noneMyteam.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    rearranged = bothMyteams.concat(singleMyTeam, noneMyteam);
    this.setState({
      allMatches: rearranged
    });
  }
  getPeriod(i, sec, status, time) {
    var periodText = "";
    if (status == "LIVE") {
      if (i == 0) {
        return "Intermission";
      }
      if (i == 1) {
        periodText = i + "st";
      } else if (i == 2) {
        periodText = i + "nd";
      } else if (i == 3) {
        periodText = i + "rd";
      } else {
        periodText = "OT";
      }
      periodText = periodText + " | ";
      var minutes = Math.floor(sec / 60);
      var seconds = (sec % 60).toFixed(0);
      var secondsText = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      periodText = periodText + secondsText;
      return periodText;
    } else if (status == "FINISHED") {
      return "Final";
    } else if (status == "UNPLAYED") {
      return "Starts at: " + time;
    } else if (status == "INTRO") {
      return "Starting..";
    } else {
      return "Final";
    }
  }

  getInning(innings, half, intermission, status, time) {
    var periodText = "";
    if (status == "LIVE") {
      if (intermission != 0 && intermission != "") {
        return "End of Inning " + intermission;
      } else {
        return half + " " + innings;
      }
    } else if (status == "FINISHED") {
      return "Final";
    } else if (status == "UNPLAYED") {
      return "Starts at: " + time;
    } else if (status == "INTRO") {
      return "Starting..";
    } else {
      return "Final";
    }
  }

  tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? "AM" : "PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  }

  getGamesetStartTime() {
    if (this.state.allMatches.length != 0) {
      var newArray = this.state.allMatches.slice();

      //newArray.sort((a, b) => a.start_time < b.start_time);
      newArray.sort(function(a, b) {
        if (a.start_time < b.start_time) {
          return -1;
        }
        if (a.start_time > b.start_time) {
          return 1;
        }
        return 0;
      });
      return (
        newArray[0].start_time.split("T")[0] +
        " " +
        this.tConv24(
          newArray[0].start_time.split("T")[1].replace(":00.000Z", "")
        )
      );
    } else {
      return "";
    }
  }

  handleCloseTeams() {
    currentTeams = [];
    currentAction = null;
    this.setState({ showTeamModal: false });
  }

  handleShowTeams() {
    this.setState({ showTeamModal: true });
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
  pageForNHL() {}

  pageForHo() {
    mTotlaScore = 0;
    let prize = this.state.prizeTable;
    let teamCount = this.state.meta.myPicksCount;
    let game = activeGame;

    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {popupHeader} </Modal.Title>
          </Modal.Header>
          <Modal.Body dangerouslySetInnerHTML={{ __html: popupText }} />
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Header />
        <Modal show={this.state.showTeamModal} onHide={this.handleCloseTeams}>
          <Modal.Header closeButton>
            <Modal.Title>Select A Replacement!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {this.state.allMatches.map((item, key) => {
                if (item.isMyTeamHome || item.isMyTeamAway) {
                  if (item.isMyTeamHome && item.isMyTeamAway) {
                    return "";
                  } else if (item.isMyTeamHome) {
                    return (
                      <ListGroupItem
                        href=""
                        onClick={() =>
                          this.onUpdateTeamSelectionClicked(
                            item.away_team_id,
                            item.feed_game_id,
                            item.isMyTeamAway,
                            item.status,
                            item.away_score
                          )
                        }
                      >
                        <div>
                          <p className="match-details">
                            {"Match: " +
                              item.home_team +
                              " VS " +
                              item.away_team}
                          </p>
                          <p className="team-details">{item.away_team}</p>
                        </div>
                      </ListGroupItem>
                    );
                  } else {
                    return (
                      <ListGroupItem
                        href=""
                        onClick={() =>
                          this.onUpdateTeamSelectionClicked(
                            item.home_team_id,
                            item.feed_game_id,
                            item.isMyTeamHome,
                            item.status,
                            item.home_score
                          )
                        }
                      >
                        <div>
                          <p className="match-details">
                            {"Match: " +
                              item.home_team +
                              " VS " +
                              item.away_team}
                          </p>
                          <p className="team-details">{item.home_team}</p>
                        </div>
                      </ListGroupItem>
                    );
                  }
                } else {
                  return (
                    <>
                      <ListGroupItem
                        href=""
                        onClick={() =>
                          this.onUpdateTeamSelectionClicked(
                            item.home_team_id,
                            item.feed_game_id,
                            item.isMyTeamHome,
                            item.status,
                            item.home_score
                          )
                        }
                      >
                        <div>
                          <p className="match-details">
                            {"Match: " +
                              item.home_team +
                              " VS " +
                              item.away_team}
                          </p>
                          <p className="team-details">{item.home_team}</p>
                        </div>
                      </ListGroupItem>
                      <ListGroupItem
                        href=""
                        onClick={() =>
                          this.onUpdateTeamSelectionClicked(
                            item.away_team_id,
                            item.feed_game_id,
                            item.isMyTeamAway,
                            item.status,
                            item.away_score
                          )
                        }
                      >
                        <div className="div-team">
                          <p className="match-details">
                            {"Match: " +
                              item.home_team +
                              " VS " +
                              item.away_team}
                          </p>
                          <p className="team-details">{item.away_team}</p>
                        </div>
                      </ListGroupItem>
                    </>
                  );
                }
              })}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseTeams}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div>
          <div className="container-fluid p-o">
            <div className="container">
              <div className="row livescore-header">
                <div
                  className={
                    hasGamesOnLeft
                      ? "game-arrow-wraper game-arrow-left"
                      : "game-arrow-wraper game-arrow-left arrow-disabled"
                  }
                >
                  <a
                    onClick={() => this.onLeftArrow("r")}
                    className={hasGamesOnLeft ? "" : "arrow-disabled"}
                  >
                    <img
                      src={require("./../../assets/images/swap/main-prev.png")}
                      className={
                        hasGamesOnLeft
                          ? "game-arrow img-responsive"
                          : "game-arrow img-responsive arrow-disabled"
                      }
                    />
                  </a>
                </div>
                <div className="caption box_one_ply" id="top-div">
                  <img
                    src={
                      "http://mypowerplaygames.com/api/sport_league/get_image.php?id=" +
                      game.association_id +
                      "&type=header"
                    }
                    className="img-responsive livescore-header-img"
                  />
                </div>
                <div className="game-arrow-wraper game-arrow-right">
                  <a onClick={() => this.onRightArrow("r")}>
                    <img
                      src={require("./../../assets/images/swap/main-next.png")}
                      className="game-arrow img-responsive"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="container">
              <div className="col-md-12">
                {(() => {
                  if (this.state.meta.gameStatus == "FINISHED") {
                    return (
                      <div className="top-text">
                        <h3>
                          Gameset # {this.state.meta.setNumber} -{" "}
                          {activeGame.name}
                        </h3>
                        <h1>THE GAMESET IS NOW FINAL</h1>
                        <h2>Results are at the bottom of the page</h2>
                        <a
                          onClick={() =>
                            this.props.history.push("/select-games")
                          }
                        >
                          CLICK HERE TO PLAY AGAIN
                        </a>
                      </div>
                    );
                  } else if (this.state.meta.gameStatus == "LIVE") {
                    return (
                      <div className="top-text">
                        <h3>
                          Gameset # {this.state.meta.setNumber} -{" "}
                          {activeGame.name}
                        </h3>
                        <h1>YOUR GAMESET HAS STARTED</h1>
                        <h2>GOOD LUCK</h2>
                      </div>
                    );
                  } else {
                    return (
                      <div className="top-text">
                        <h3>
                          Gameset # {this.state.meta.setNumber} -{" "}
                          {activeGame.name}
                        </h3>
                        <h1>
                          {"Your game set starts at  " +
                            this.getGamesetStartTime()}
                        </h1>
                        <h2> {"You Selected " + teamCount + " Teams"} </h2>
                        {(() => {
                          let obj = prize.find(
                            obj => obj.no_of_team == teamCount
                          );
                          let currPrize = 0;
                          if (obj) {
                            currPrize = obj.prize;
                          }

                          return (
                            <p>
                              <span className="fa fa-info-circle infobtn" />
                              {"You will win " +
                                (game.prize_type == "cash"
                                  ? "$" + currPrize
                                  : currPrize + " Points") +
                                " " +
                                game.gametype_prize_text}
                            </p>
                          );
                        })()}
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          </div>
          <div className="container-fluid live_midle_cont">
            <div className="container">
              <div className="col-md-9">
                <div className="right_side_live">
                  <div className="score-all">
                    {this.state.allMatches.map((item, key) => {
                      return (
                        <div
                          className="score_live_box"
                          id={"match-" + item.feed_game_id}
                        >
                          <div className="right_top_head">
                            <h1>
                              {"Game " + (key + 1) + " "}
                              <span className="span1">{item.home_team}</span>
                              Vs.
                              <span className="span1">{item.away_team}</span>
                              <br />
                              <span className="span2">
                                {item.location} |
                                {item.start_time.split("T")[0] +
                                  " " +
                                  this.tConv24(
                                    item.start_time
                                      .split("T")[1]
                                      .replace(":00.000Z", "")
                                  )}
                              </span>
                            </h1>
                          </div>
                          {(() => {
                            var isHomeLocked = item.isHomeLocked;
                            var isAwayLocked = item.isAwayLocked;
                            if (item.isMyTeamHome && item.my_score_home == 1) {
                              mTotlaScore = mTotlaScore + 1;
                            }
                            if (item.isMyTeamAway && item.my_score_away == 1) {
                              mTotlaScore = mTotlaScore + 1;
                            }

                            return (
                              <div>
                                <div
                                  className={
                                    item.isMyTeamHome
                                      ? isTeamNumberOkay
                                        ? "boxes"
                                        : mPick == item.home_team_id
                                        ? "boxes not-select not-saved"
                                        : "boxes"
                                      : "boxes not-select"
                                  }
                                >
                                  <div className="plus-icons"> VS </div>
                                  <div className="minus-icons">
                                    <span
                                      className={
                                        item.isMyTeamHome
                                          ? "fa fa-minus"
                                          : "fa fa-plus"
                                      }
                                      onClick={() =>
                                        this.onUpdateTeamSelectionClicked(
                                          item.home_team_id,
                                          item.feed_game_id,
                                          item.isMyTeamHome,
                                          item.status,
                                          item.home_score
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-xs-5 p-o">
                                    <div className="boxes-cont">
                                      <div className="iner-box">
                                        <h1> {item.home_team} </h1>
                                        <h2> {item.home_score} </h2>
                                        <p className="goalie-name">
                                          In Goal:
                                          <span>
                                            {item.current_goalie_home_team ==
                                            null
                                              ? "--"
                                              : item.current_goalie_home_team.split(
                                                  " "
                                                )[0][0] +
                                                "." +
                                                item.current_goalie_home_team.split(
                                                  " "
                                                )[1]}
                                          </span>
                                          /
                                          <span>
                                            {item.current_goalie_gaa_home_team ==
                                              null ||
                                            item.current_goalie_gaa_home_team ==
                                              ""
                                              ? "--"
                                              : parseFloat(
                                                  item.current_goalie_gaa_home_team
                                                ).toFixed(2)}
                                          </span>
                                          GAA
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xs-5 p10">
                                    <div className="boxes-cont">
                                      <div className="iner-box ">
                                        <h1> Live Score Actions </h1>
                                        <ul
                                          className={
                                            item.status == "LIVE"
                                              ? item.isMyTeamHome
                                                ? ""
                                                : "div-disabled"
                                              : "div-disabled"
                                          }
                                        >
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.home_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_home,
                                                    "referesh",
                                                    item.isMyTeamHome
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/referesh.png")}
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.home_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_home,
                                                    "lock",
                                                    item.isMyTeamHome
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/lock.png")}
                                                id="locked"
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.home_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_home,
                                                    "bust",
                                                    item.isMyTeamHome
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/bust.png")}
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.home_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_home,
                                                    "super-bust",
                                                    item.isMyTeamHome
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/super-bust.png")}
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                        </ul>
                                        <h6 className="livescore-action-text">
                                          {item.status == "UNPLAYED"
                                            ? "Available at " +
                                              this.tConv24(
                                                item.powerplay_activation
                                                  .split("T")[1]
                                                  .replace(":00.000Z", "")
                                              )
                                            : ""}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xs-2 p-o">
                                    <div className="boxes-cont">
                                      <div className="iner-box">
                                        <h1> My Score </h1>
                                        {item.isMyTeamHome ? (
                                          <div>
                                            <h2> {item.my_score_home} </h2>
                                            <span className="locked-text">
                                              {isHomeLocked ? "Locked" : ""}
                                            </span>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.home_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_home,
                                                    "undo",
                                                    item.isMyTeamHome
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/undo.png")}
                                                className={
                                                  item.status == "LIVE"
                                                    ? item.isMyTeamHome
                                                      ? "img-responsive action-undo"
                                                      : "img-responsive action-undo div-disabled"
                                                    : " img-responsive action-undo div-disabled"
                                                }
                                              />
                                            </a>
                                          </div>
                                        ) : (
                                          <p>Team Not Selected</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    item.isMyTeamAway
                                      ? isTeamNumberOkay
                                        ? "boxes"
                                        : mPick == item.away_team_id
                                        ? "boxes not-select not-saved"
                                        : "boxes"
                                      : "boxes not-select"
                                  }
                                >
                                  <div className="minus-icons">
                                    <span
                                      className={
                                        item.isMyTeamAway
                                          ? "fa fa-minus"
                                          : "fa fa-plus"
                                      }
                                      onClick={() =>
                                        this.onUpdateTeamSelectionClicked(
                                          item.away_team_id,
                                          item.feed_game_id,
                                          item.isMyTeamAway,
                                          item.status,
                                          item.away_score
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-xs-5 p-o">
                                    <div className="boxes-cont">
                                      <div className="iner-box">
                                        <h1> {item.away_team} </h1>
                                        <h2> {item.away_score} </h2>
                                        <p className="goalie-name">
                                          In Goal:
                                          <span>
                                            {item.current_goalie_away_team ==
                                            null
                                              ? "--"
                                              : item.current_goalie_away_team.split(
                                                  " "
                                                )[0][0] +
                                                "." +
                                                item.current_goalie_away_team.split(
                                                  " "
                                                )[1]}
                                          </span>
                                          /
                                          <span>
                                            {item.current_goalie_gaa_away_team ==
                                              null ||
                                            item.current_goalie_gaa_away_team ==
                                              ""
                                              ? "--"
                                              : parseFloat(
                                                  item.current_goalie_gaa_away_team
                                                ).toFixed(2)}
                                          </span>
                                          GAA
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xs-5 p10">
                                    <div className="boxes-cont">
                                      <div className="iner-box">
                                        <h1> Live Score Actions </h1>
                                        <ul
                                          className={
                                            item.status == "LIVE"
                                              ? item.isMyTeamAway
                                                ? ""
                                                : "div-disabled"
                                              : "div-disabled"
                                          }
                                        >
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.away_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_away,
                                                    "referesh",
                                                    item.isMyTeamAway
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/referesh.png")}
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.away_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_away,
                                                    "lock",
                                                    item.isMyTeamAway
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/lock.png")}
                                                id="locked"
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.away_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_away,
                                                    "bust",
                                                    item.isMyTeamAway
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/bust.png")}
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.away_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_away,
                                                    "super-bust",
                                                    item.isMyTeamAway
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/super-bust.png")}
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                        </ul>
                                        <h6 className="livescore-action-text">
                                          {item.status == "UNPLAYED"
                                            ? "Available at " +
                                              this.tConv24(
                                                item.powerplay_activation
                                                  .split("T")[1]
                                                  .replace(":00.000Z", "")
                                              )
                                            : ""}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xs-2 p-o">
                                    <div className="boxes-cont">
                                      <div className="iner-box">
                                        <h1> My Score </h1>
                                        {item.isMyTeamAway ? (
                                          <div>
                                            <h2> {item.my_score_away} </h2>
                                            <span className="locked-text">
                                              {isAwayLocked ? "Locked" : ""}
                                            </span>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.away_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_away,
                                                    "undo",
                                                    item.isMyTeamAway
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/undo.png")}
                                                className={
                                                  item.status == "LIVE"
                                                    ? item.isMyTeamAway
                                                      ? "img-responsive action-undo"
                                                      : "img-responsive action-undo div-disabled"
                                                    : " img-responsive action-undo div-disabled"
                                                }
                                              />
                                            </a>
                                          </div>
                                        ) : (
                                          <p>Team Not Selected</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button className="scor_live">
                                  {this.getPeriod(
                                    item.current_period,
                                    item.current_period_time,
                                    item.status,
                                    this.tConv24(
                                      item.start_time
                                        .split("T")[1]
                                        .replace(":00.000Z", "")
                                    )
                                  )}
                                </button>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="left_side_live">
                  <h1>
                    <span className="fa fa-info-circle infobtn" /> Live Score
                    Powerplays
                  </h1>
                  <ul>
                    {this.state.powerplays.map((element, key) => {
                      if (element.powerplay_id == 13) {
                        return (
                          <li id="refersh">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span className="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 1) {
                        return (
                          <li id="lock">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 19) {
                        return (
                          <li id="bust">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 18) {
                        return (
                          <li id="superbust">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 4) {
                        return (
                          <li id="minus">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 5) {
                        return (
                          <li id="add">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 21) {
                        return (
                          <li id="undo">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 24) {
                        return (
                          <li id="swap">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                    })}
                  </ul>
                  {this.state.meta.hasSubscription ? (
                    ""
                  ) : (
                    <button
                      onClick={() =>
                        this.props.history.push("/powerplay-store")
                      }
                    >
                      Add Live Scores
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid p-o">
            <div className="container">
              <div className="row">
                <div className="col-md-12 live-score-selected-teams-num">
                  <h1>
                    You Selected <span>{this.state.meta.myPicksCount}</span>{" "}
                    Teams
                  </h1>
                </div>
              </div>
              <div className="col-md-9 bottom_btn_live">
                <div className="col-xs-8">
                  <button className="btn_one_live">Teams with 1 run </button>
                </div>
                <div className="col-xs-4">
                  <button className="btn_two_live">{mTotlaScore} </button>
                </div>
              </div>
            </div>
          </div>
          {(() => {
            var text = "";
            var hasLost = false;
            if (this.state.meta.gameStatus == "FINISHED") {
              if (this.state.meta.result == "WON") {
                text = "You Won";
              } else {
                text = "Better luck next time";
                hasLost = true;
              }
            } else {
              text = "You Could Win";
            }
            let currPrize = 0;
            if (this.state.meta.prize != null) {
              currPrize = this.state.meta.prize;
            } else {
              let obj = this.state.prizeTable.find(
                obj => obj.no_of_team == this.state.meta.myPicksCount
              );
              console.log("PRize");
              console.log(obj);
              if (obj) {
                currPrize = obj.prize;
              }
            }

            return (
              <div className="container-fluid p-o">
                <div className="container">
                  <div className="col-md-9 bottom_btn_live">
                    <div className={hasLost ? "col-xs-12" : "col-xs-8"}>
                      <button className="btn_three_live">{text} </button>
                    </div>
                    {hasLost ? (
                      ""
                    ) : (
                      <div className="col-xs-4">
                        <button className="btn_foure_live">
                          {activeGame.prize_type == "cash"
                            ? "$" + currPrize
                            : currPrize + " Pts"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
        <Footer />
      </div>
    );
  }
  pageForMLB() {
    mTotlaScore = 0;

    let prize = this.state.prizeTable;
    let teamCount = this.state.meta.myPicksCount;
    let game = activeGame;

    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {popupHeader} </Modal.Title>
          </Modal.Header>
          <Modal.Body> {popupText}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Header />
        <Modal show={this.state.showTeamModal} onHide={this.handleCloseTeams}>
          <Modal.Header closeButton>
            <Modal.Title>Select A Replacement!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {this.state.allMatches.map((item, key) => {
                if(item.status == "LIVE" ||  item.status == "UNPLAYED"){
                  let mId1 = item.feed_game_id + "-" + item.home_team_id;
                  let mId2 = item.feed_game_id + "-" + item.away_team_id;
                  let allTeamsTodisplay = [];
                  if (currentAction == "minus") {
                    if (
                      mPicks.indexOf(mId1) > -1 ||
                      mPicks.indexOf(mId2) > -1
                    ) {
                      if (
                        currentTeams.indexOf(mId1) > -1 &&
                        currentTeams.indexOf(mId2) > -1
                      ) {
                        return "";
                      } else if (currentTeams.indexOf(mId1) > -1) {
                        return (
                          <ListGroupItem
                            href=""
                            onClick={() =>
                              this.onUpdateTeamSelectionClicked(
                                item.away_team_id,
                                item.feed_game_id,
                                item.isMyTeamAway,
                                item.status,
                                item.away_score
                              )
                            }
                          >
                            <div>
                              <p className="match-details">
                                {"Match: " +
                                  item.home_team +
                                  " VS " +
                                  item.away_team}
                              </p>
                              <p className="team-details">{item.away_team}</p>
                            </div>
                          </ListGroupItem>
                        );
                      } else {
                        return (
                          <ListGroupItem
                            href=""
                            onClick={() =>
                              this.onUpdateTeamSelectionClicked(
                                item.home_team_id,
                                item.feed_game_id,
                                item.isMyTeamHome,
                                item.status,
                                item.home_score
                              )
                            }
                          >
                            <div>
                              <p className="match-details">
                                {"Match: " +
                                  item.home_team +
                                  " VS " +
                                  item.away_team}
                              </p>
                              <p className="team-details">{item.home_team}</p>
                            </div>
                          </ListGroupItem>
                        );
                      }
                    } else {
                      return (
                        <>
                          <ListGroupItem
                            href=""
                            onClick={() =>
                              this.onUpdateTeamSelectionClicked(
                                item.home_team_id,
                                item.feed_game_id,
                                item.isMyTeamHome,
                                item.status,
                                item.home_score
                              )
                            }
                          >
                            <div>
                              <p className="match-details">
                                {"Match: " +
                                  item.home_team +
                                  " VS " +
                                  item.away_team}
                              </p>
                              <p className="team-details">{item.home_team}</p>
                            </div>
                          </ListGroupItem>
                          <ListGroupItem
                            href=""
                            onClick={() =>
                              this.onUpdateTeamSelectionClicked(
                                item.away_team_id,
                                item.feed_game_id,
                                item.isMyTeamAway,
                                item.status,
                                item.away_score
                              )
                            }
                          >
                            <div className="div-team">
                              <p className="match-details">
                                {"Match: " +
                                  item.home_team +
                                  " VS " +
                                  item.away_team}
                              </p>
                              <p className="team-details">{item.away_team}</p>
                            </div>
                          </ListGroupItem>
                        </>
                      );
                    }
                  }else{
                    if (
                      mPicks.indexOf(mId1) > -1 ||
                      mPicks.indexOf(mId2) > -1
                    ) {
                      if (
                        mPicks.indexOf(mId1) > -1 &&
                        mPicks.indexOf(mId2) > -1
                      ) {
                        return (
                          <>
                            <ListGroupItem
                              href=""
                              onClick={() =>
                                this.onUpdateTeamSelectionClicked(
                                  item.home_team_id,
                                  item.feed_game_id,
                                  item.isMyTeamHome,
                                  item.status,
                                  item.home_score
                                )
                              }
                            >
                              <div>
                                <p className="match-details">
                                  {"Match: " +
                                    item.home_team +
                                    " VS " +
                                    item.away_team}
                                </p>
                                <p className="team-details">{item.home_team}</p>
                              </div>
                            </ListGroupItem>
                            <ListGroupItem
                              href=""
                              onClick={() =>
                                this.onUpdateTeamSelectionClicked(
                                  item.away_team_id,
                                  item.feed_game_id,
                                  item.isMyTeamAway,
                                  item.status,
                                  item.away_score
                                )
                              }
                            >
                              <div className="div-team">
                                <p className="match-details">
                                  {"Match: " +
                                    item.home_team +
                                    " VS " +
                                    item.away_team}
                                </p>
                                <p className="team-details">{item.away_team}</p>
                              </div>
                            </ListGroupItem>
                          </>
                        );
                      } else if (currentTeams.indexOf(mId2) > -1) {
                        return (
                          <ListGroupItem
                            href=""
                            onClick={() =>
                              this.onUpdateTeamSelectionClicked(
                                item.away_team_id,
                                item.feed_game_id,
                                item.isMyTeamAway,
                                item.status,
                                item.away_score
                              )
                            }
                          >
                            <div>
                              <p className="match-details">
                                {"Match: " +
                                  item.home_team +
                                  " VS " +
                                  item.away_team}
                              </p>
                              <p className="team-details">{item.away_team}</p>
                            </div>
                          </ListGroupItem>
                        );
                      } else {
                        return (
                          <ListGroupItem
                            href=""
                            onClick={() =>
                              this.onUpdateTeamSelectionClicked(
                                item.home_team_id,
                                item.feed_game_id,
                                item.isMyTeamHome,
                                item.status,
                                item.home_score
                              )
                            }
                          >
                            <div>
                              <p className="match-details">
                                {"Match: " +
                                  item.home_team +
                                  " VS " +
                                  item.away_team}
                              </p>
                              <p className="team-details">{item.home_team}</p>
                            </div>
                          </ListGroupItem>
                        );
                      }
                    } else {
                     
                    }
                  }
                }

              })}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseTeams}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div>
          <div className="container-fluid p-o">
            <div className="container">
              <div className="row livescore-header">
                <div
                  className={
                    hasGamesOnLeft
                      ? "game-arrow-wraper game-arrow-left"
                      : "game-arrow-wraper game-arrow-left arrow-disabled"
                  }
                >
                  <a
                    onClick={() => this.onLeftArrow("r")}
                    className={hasGamesOnLeft ? "" : "arrow-disabled"}
                  >
                    <img
                      src={require("./../../assets/images/swap/main-prev.png")}
                      className={
                        hasGamesOnLeft
                          ? "game-arrow img-responsive"
                          : "game-arrow img-responsive arrow-disabled"
                      }
                    />
                  </a>
                </div>
                <div className="caption box_one_ply" id="top-div">
                  <img
                    src={
                      "http://mypowerplaygames.com/api/sport_league/get_image.php?id=" +
                      game.association_id +
                      "&type=header"
                    }
                    className="img-responsive livescore-header-img"
                  />
                </div>
                <div className="game-arrow-wraper game-arrow-right">
                  <a onClick={() => this.onRightArrow("r")}>
                    <img
                      src={require("./../../assets/images/swap/main-next.png")}
                      className="game-arrow img-responsive"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="container">
              <div className="col-md-12">
                {(() => {
                  if (this.state.meta.gameStatus == "FINISHED") {
                    return (
                      <div className="top-text">
                        <h3>
                          Gameset # {this.state.meta.setNumber} -{" "}
                          {activeGame.name}
                        </h3>
                        <h1>THE GAMESET IS NOW FINAL</h1>
                        <h2>Results are at the bottom of the page</h2>
                        <a
                          onClick={() =>
                            this.props.history.push("/select-games")
                          }
                        >
                          CLICK HERE TO PLAY AGAIN
                        </a>
                      </div>
                    );
                  } else if (this.state.meta.gameStatus == "LIVE") {
                    return (
                      <div className="top-text">
                        <h3>
                          Gameset # {this.state.meta.setNumber} -{" "}
                          {activeGame.name}
                        </h3>
                        <h1>YOUR GAMESET HAS STARTED</h1>
                        <h2>GOOD LUCK</h2>
                      </div>
                    );
                  } else {
                    return (
                      <div className="top-text">
                        <h3>
                          Gameset # {this.state.meta.setNumber} -{" "}
                          {activeGame.name}
                        </h3>
                        <h1>
                          {"Your game set starts at  " +
                            this.getGamesetStartTime()}
                        </h1>
                        <h2> {"You Selected " + teamCount + " Teams"} </h2>
                        {(() => {
                          let obj = prize.find(
                            obj => obj.no_of_team == teamCount
                          );
                          let currPrize = 0;
                          if (obj) {
                            currPrize = obj.prize;
                          }

                          return (
                            <p>
                              <span className="fa fa-info-circle infobtn" />
                              {"You will win " +
                                (game.prize_type == "cash"
                                  ? "$" + currPrize
                                  : currPrize + " Points") +
                                " " +
                                game.gametype_prize_text}
                            </p>
                          );
                        })()}
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          </div>
          <div className="container-fluid live_midle_cont">
            <div className="container">
              <div className="col-md-9">
                <div className="right_side_live">
                  <div className="score-all">
                    {this.state.allMatches.map((item, key) => {
                      return (
                        <div
                          className="score_live_box"
                          id={"match-" + item.feed_game_id}
                        >
                          <div className="right_top_head">
                            <h1>
                              {"Game " + (key + 1) + " "}
                              <span className="span1">{item.home_team}</span>
                              Vs.
                              <span className="span1">{item.away_team}</span>
                              <br />
                              <span className="span2">
                                {item.location} |
                                {item.start_time.split("T")[0] +
                                  " " +
                                  this.tConv24(
                                    item.start_time
                                      .split("T")[1]
                                      .replace(":00.000Z", "")
                                  )}
                              </span>
                            </h1>
                          </div>
                          {(() => {
                            var isHomeLocked = item.isHomeLocked;
                            var isAwayLocked = item.isAwayLocked;
                            if (item.isMyTeamHome && item.my_score_home == 1) {
                              mTotlaScore = mTotlaScore + 1;
                            }
                            if (item.isMyTeamAway && item.my_score_away == 1) {
                              mTotlaScore = mTotlaScore + 1;
                            }

                            return (
                              <div>
                                <div
                                  className={
                                    item.isMyTeamHome
                                      ? isTeamNumberOkay
                                        ? "boxes"
                                        : mPick == item.home_team_id
                                        ? "boxes not-select not-saved"
                                        : "boxes"
                                      : "boxes not-select"
                                  }
                                >
                                  <div className="plus-icons"> VS </div>
                                  <div className="minus-icons">
                                    <span
                                      className={
                                        item.isMyTeamHome
                                          ? "fa fa-minus"
                                          : "fa fa-plus"
                                      }
                                      onClick={() =>
                                        this.onUpdateTeamSelectionClicked(
                                          item.home_team_id,
                                          item.feed_game_id,
                                          item.isMyTeamHome,
                                          item.status,
                                          item.home_score
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-xs-5 p-o">
                                    <div className="boxes-cont">
                                      <div className="iner-box">
                                        <h1> {item.home_team} </h1>
                                        <h2> {item.home_score} </h2>
                                        <p className="goalie-name">
                                          {item.status == "UNPLAYED"
                                            ? "Starting: "
                                            : "Pitching: "}
                                          <span>
                                            {item.current_pitcher_home ==
                                              null ||
                                            item.current_pitcher_home == ""
                                              ? "--"
                                              : item.current_pitcher_home.split(
                                                  " "
                                                )[0][0] +
                                                "." +
                                                item.current_pitcher_home.split(
                                                  " "
                                                )[1]}
                                          </span>
                                          /
                                          <span>
                                            {item.current_pitcher_home_era ==
                                            null
                                              ? "--"
                                              : parseFloat(
                                                  item.current_pitcher_home_era
                                                ).toFixed(2)}
                                          </span>
                                          ERA
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xs-5 p10">
                                    <div className="boxes-cont">
                                      <div className="iner-box ">
                                        <h1> Live Score Actions </h1>
                                        <ul
                                          className={
                                            item.status == "LIVE"
                                              ? item.isMyTeamHome
                                                ? ""
                                                : "div-disabled"
                                              : "div-disabled"
                                          }
                                        >
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.home_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_home,
                                                    "referesh",
                                                    item.isMyTeamHome
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/referesh.png")}
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.home_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_home,
                                                    "lock",
                                                    item.isMyTeamHome
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/lock.png")}
                                                id="locked"
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.home_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_home,
                                                    "bust",
                                                    item.isMyTeamHome
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/bust.png")}
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.home_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_home,
                                                    "super-bust",
                                                    item.isMyTeamHome
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/super-bust.png")}
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                        </ul>
                                        <h6 className="livescore-action-text">
                                          {item.status == "UNPLAYED"
                                            ? "Available at " +
                                              this.tConv24(
                                                item.powerplay_activation
                                                  .split("T")[1]
                                                  .replace(":00.000Z", "")
                                              )
                                            : ""}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xs-2 p-o">
                                    <div className="boxes-cont">
                                      <div className="iner-box">
                                        <h1> My Score </h1>
                                        {item.isMyTeamHome ? (
                                          <div>
                                            <h2> {item.my_score_home} </h2>
                                            <span className="locked-text">
                                              {isHomeLocked ? "Locked" : ""}
                                            </span>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.home_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_home,
                                                    "undo",
                                                    item.isMyTeamHome
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/undo.png")}
                                                className={
                                                  item.status == "LIVE"
                                                    ? item.isMyTeamHome
                                                      ? "img-responsive action-undo"
                                                      : "img-responsive action-undo div-disabled"
                                                    : " img-responsive action-undo div-disabled"
                                                }
                                              />
                                            </a>
                                          </div>
                                        ) : (
                                          <p>Team Not Selected</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={
                                    item.isMyTeamAway
                                      ? isTeamNumberOkay
                                        ? "boxes"
                                        : mPick == item.away_team_id
                                        ? "boxes not-select not-saved"
                                        : "boxes"
                                      : "boxes not-select"
                                  }
                                >
                                  <div className="minus-icons">
                                    <span
                                      className={
                                        item.isMyTeamAway
                                          ? "fa fa-minus"
                                          : "fa fa-plus"
                                      }
                                      onClick={() =>
                                        this.onUpdateTeamSelectionClicked(
                                          item.away_team_id,
                                          item.feed_game_id,
                                          item.isMyTeamAway,
                                          item.status,
                                          item.away_score
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-xs-5 p-o">
                                    <div className="boxes-cont">
                                      <div className="iner-box">
                                        <h1> {item.away_team} </h1>
                                        <h2> {item.away_score} </h2>
                                        <p className="goalie-name">
                                          {item.status == "UNPLAYED"
                                            ? "Starting: "
                                            : "Pitching: "}
                                          <span>
                                            {item.current_pitcher_away ==
                                              null ||
                                            item.current_pitcher_away == ""
                                              ? "--"
                                              : item.current_pitcher_away.split(
                                                  " "
                                                )[0][0] +
                                                "." +
                                                item.current_pitcher_away.split(
                                                  " "
                                                )[1]}
                                          </span>
                                          /
                                          <span>
                                            {item.current_pitcher_away_era ==
                                            null
                                              ? "--"
                                              : parseFloat(
                                                  item.current_pitcher_away_era
                                                ).toFixed(2)}
                                          </span>
                                          ERA
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xs-5 p10">
                                    <div className="boxes-cont">
                                      <div className="iner-box">
                                        <h1> Live Score Actions </h1>
                                        <ul
                                          className={
                                            item.status == "LIVE"
                                              ? item.isMyTeamAway
                                                ? ""
                                                : "div-disabled"
                                              : "div-disabled"
                                          }
                                        >
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.away_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_away,
                                                    "referesh",
                                                    item.isMyTeamAway
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/referesh.png")}
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.away_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_away,
                                                    "lock",
                                                    item.isMyTeamAway
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/lock.png")}
                                                id="locked"
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.away_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_away,
                                                    "bust",
                                                    item.isMyTeamAway
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/bust.png")}
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                          <li>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.away_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_away,
                                                    "super-bust",
                                                    item.isMyTeamAway
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/super-bust.png")}
                                                className="img-responsive"
                                              />
                                            </a>
                                          </li>
                                        </ul>
                                        <h6 className="livescore-action-text">
                                          {item.status == "UNPLAYED"
                                            ? "Available at " +
                                              this.tConv24(
                                                item.powerplay_activation
                                                  .split("T")[1]
                                                  .replace(":00.000Z", "")
                                              )
                                            : ""}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xs-2 p-o">
                                    <div className="boxes-cont">
                                      <div className="iner-box">
                                        <h1> My Score </h1>
                                        {item.isMyTeamAway ? (
                                          <div>
                                            <h2> {item.my_score_away} </h2>
                                            <span className="locked-text">
                                              {isAwayLocked ? "Locked" : ""}
                                            </span>
                                            <a>
                                              <img
                                                onClick={() =>
                                                  this.onPowerplayClicked(
                                                    item.away_team_id,
                                                    item.feed_game_id,
                                                    item.my_score_away,
                                                    "undo",
                                                    item.isMyTeamAway
                                                  )
                                                }
                                                src={require("./../../assets/images/livescore/undo.png")}
                                                className={
                                                  item.status == "LIVE"
                                                    ? item.isMyTeamAway
                                                      ? "img-responsive action-undo"
                                                      : "img-responsive action-undo div-disabled"
                                                    : " img-responsive action-undo div-disabled"
                                                }
                                              />
                                            </a>
                                          </div>
                                        ) : (
                                          <p>Team Not Selected</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button className="scor_live">
                                  {this.getInning(
                                    item.current_inning,
                                    item.current_inning_half,
                                    item.current_intermission,
                                    item.status,
                                    this.tConv24(
                                      item.start_time
                                        .split("T")[1]
                                        .replace(":00.000Z", "")
                                    )
                                  )}
                                </button>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="left_side_live">
                  <h1>
                    <span className="fa fa-info-circle infobtn" /> Live Score
                    Powerplays
                  </h1>
                  <ul>
                    {this.state.powerplays.map((element, key) => {
                      if (element.powerplay_id == 13) {
                        return (
                          <li id="refersh">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span className="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 1) {
                        return (
                          <li id="lock">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 19) {
                        return (
                          <li id="bust">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 18) {
                        return (
                          <li id="superbust">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 4) {
                        return (
                          <li id="minus">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 5) {
                        return (
                          <li id="add">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 21) {
                        return (
                          <li id="undo">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                      if (element.powerplay_id == 24) {
                        return (
                          <li id="swap">
                            {element.powerplay_name} &nbsp; &nbsp;
                            <span class="spans">
                              {element.amount_available}
                            </span>
                          </li>
                        );
                      }
                    })}
                  </ul>
                  {this.state.meta.hasSubscription ? (
                    ""
                  ) : (
                    <button
                      onClick={() =>
                        this.props.history.push("/powerplay-store")
                      }
                    >
                      Add Live Scores
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid p-o">
            <div className="container">
              <div className="row">
                <div className="col-md-9 live-score-selected-teams-num">
                  <h1>
                    You Selected <span>{this.state.meta.myPicksCount}</span>{" "}
                    Teams
                  </h1>
                </div>
              </div>
              <div className="col-md-9 bottom_btn_live">
                <div className="col-xs-8">
                  <button className="btn_one_live">Teams with 1 run </button>
                </div>
                <div className="col-xs-4">
                  <button className="btn_two_live">{mTotlaScore} </button>
                </div>
              </div>
            </div>
          </div>
          {(() => {
            var text = "";
            var hasLost = false;
            if (this.state.meta.gameStatus == "FINISHED") {
              if (this.state.meta.result == "WON") {
                text = "You Won";
              } else {
                text = "Better luck next time";
                hasLost = true;
              }
            } else {
              text = "You Could Win";
            }
            let currPrize = 0;
            if (this.state.meta.prize != null) {
              currPrize = this.state.meta.prize;
            } else {
              let obj = this.state.prizeTable.find(
                obj => obj.no_of_team == this.state.meta.myPicksCount
              );
              console.log("PRize");
              console.log(obj);
              if (obj) {
                currPrize = obj.prize;
              }
            }
            return (
              <div className="container-fluid p-o">
                <div className="container">
                  <div className="col-md-9 bottom_btn_live">
                    <div className={hasLost ? "col-xs-12" : "col-xs-8"}>
                      <button className="btn_three_live">{text} </button>
                    </div>
                    {hasLost ? (
                      ""
                    ) : (
                      <div className="col-xs-4">
                        <button className="btn_foure_live">
                          {activeGame.prize_type == "cash"
                            ? "$" + currPrize
                            : currPrize + " Pts"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
        <Footer />
      </div>
    );
  }
  render() {
    if (activeGame != null) {
      //if NHL
      if (activeGame.league_id == 14) {
        return this.pageForHo();
      }
      //if MLB
      if (activeGame.league_id == 15) {
        return this.pageForMLB();
      }
    } else {
      return <h2>Loading...</h2>;
    }
  }
}

export default withRouter(LiveScore);
