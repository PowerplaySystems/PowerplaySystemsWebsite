import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import DrawTimer from "../common/DrawTimer";
import * as Functions from "../common/functions";
import "./index.css";
import "./index2.css";
import Cookies from "universal-cookie";
import * as Constants from "../common/constants";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

var bg = require("./../../assets/images/lotto/lottohomehero.png");
let mCircleStyles = {
  backgroundImage: "url(" + bg + ")",
  backgroundSize: "cover",
  overflow: "hidden",
  width: "100%",
  height: "570px"
};
let mDivStyle = {
  lineHeight: "48px"
};
class PowerplayLotto extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      error: null,
      isLoaded: false,
      game747: [],
      sweet16: [],
      gridlock: [],
      elite8: [],
      content: "",
      showPrize: false,
      prizes: []
    };

    this.onPickNumbersClicked = this.onPickNumbersClicked.bind(this);
    this.onAllGames = this.onAllGames.bind(this);
    this.handleShowPrize = this.handleShowPrize.bind(this);
    this.handleClosePrize = this.handleClosePrize.bind(this);
    this.goToDemo = this.goToDemo.bind(this);
    this.liveDraw = this.liveDraw.bind(this);
  }

  ///////////////////////////
  /////COMPONENTS///////////
  //////////////////////////
  componentButton(text, action) {
    if (action == "partner") {
      return (
        <button
          onClick={() => this.props.history.push("/partner")}
          className="lotto-landing-button"
        >
          {text}
        </button>
      );
    } else {
      return (
        <button
          onClick={() => this.props.history.push("/elite8")}
          className="lotto-landing-button"
        >
          {text}
        </button>
      );
    }
  }
  componentButtonTransparent(text) {
    return (
      <button
        onClick={e => this.goToDemo()}
        className="lotto-landing-button-transparent"
      >
        {text}
      </button>
    );
  }
  handleClosePrize() {
    this.setState({
      showPrize: false
    });
  }
  handleShowPrize(game_type) {
    var prizesToShow = [];
    if (game_type == "747") {
      prizesToShow = this.state.game747.prize;
    } else if (game_type == "sweet16") {
      prizesToShow = this.state.sweet16.prize;
    } else if (game_type == "elite8") {
      prizesToShow = this.state.elite8.prize;
    } else if (game_type == "gridlock") {
      prizesToShow = this.state.gridlock.prize;
    }
    if (prizesToShow.length == 0) {
      return;
    }
    prizesToShow.sort(function(a, b) {
      return parseFloat(b.prize) - parseFloat(a.prize);
    });

    this.setState({
      showPrize: true,
      prizes: prizesToShow
    });
  }
  getLotteryGames() {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    var link =
      "https://" + Constants.URL + "/public_api/lottery_games/data.php";
    if (jwt) {
      link = link + "?jwt=" + jwt;
    }
    fetch(link)
      .then(res => res.json())
      .then(
        xx => {
          this.setState({
            game747: xx.records[0],
            sweet16: xx.records[1],
            elite8: xx.records[2],
            gridlock: xx.records[3],
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
  onAllGames() {
    const explore = document.getElementById("explore-games");
    if (explore) {
      explore.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }
  componentDidMount() {
    document.getElementsByTagName("META")[2].content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    window.scrollTo(0, 0);
    this.getLotteryGames();
  }
  componentWillUnmount() {
    document.getElementsByTagName("META")[2].content = "width=1400";
  }
  onPickNumbersClicked(path, game) {
    let action = "pick";
    if (path == "/747") {
      action = this.state.game747.entry ? "game_center" : "pick";
    } else if (path == "/sweet16") {
      action = this.state.sweet16.entry ? "game_center" : "pick";
    } else if (path == "/gridlock") {
      action = this.state.gridlock.entry ? "game_center" : "pick";
    } else if (path == "/elite8") {
      action = this.state.elite8.entry ? "game_center" : "pick";
    }

    this.props.history.push({
      pathname: path,
      state: {
        gameData: game
      }
    });
  }
  liveDraw(path, game) {
    this.props.history.push({
      pathname: path,
      state: {
        gameData: game
      }
    });
  }
  getStringDate(mDate) {
    if (mDate == null) {
      return "";
    }
    var mydate = new Date(mDate);
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ][mydate.getMonth()];
    var str =
      month + " " + mydate.getDate() + ", " + mydate.getFullYear() + " ";
    return str;
  }
  getStringTime(time) {
    if (time) {
      time = time.split(" ")[1];
    } else {
      return "-/-";
    }
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[3] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  goToDemo() {
    this.props.history.push({
      pathname: "/747",
      state: {
        gameData: "demo"
      }
    });
  }
  render() {
    if (this.state.isLoaded == true) {
      return (
        <div>
          <Header />
          <div className="lotto-landing-container">
            <div className="lotto-landing-heading">
              Powerplay Systems offers a Full-Service Interactive Lottery
              Platform{" "}
              <div className="lotto-landing-heading-fancy">
                #GenR8 Technology
              </div>
            </div>
            <div className="lotto-landing-text2">
              Our cutting-edge lottery platform includes #GenR8 technology,
              seamless web Integration, full player management, and exciting
              Interactive play options where players can adjust picks during
              live draws.
            </div>
            <br />
            {this.componentButton("Partner With Us!", "partner")}
            <div className="div-laptop-img"></div>
            {this.componentButtonTransparent("Try our Demo Game")}
            <div className="lotto-landing-text3">
              Ultimate Interactive Engagement
            </div>
            <div className="lotto-landing-text4">
              With our interactive platform, we offer players a compelling and
              irresistible experience where they can
              <span> adjust their picks during live draws</span> by making use
              of <span>‘Powerplays’</span>.
            </div>
            <div className="lotto-landing-ingagement-content">
              <div className="lotto-landing-people-img"></div>
              <div className="lotto-landing-ingagement-right">
                <div className="lotto-landing-ingagement-box1">
                  <div className="lotto-landing-text5">Imagine the Power</div>
                  <div className="lotto-landing-text7">
                    If a player runs out of Powerplays, we can even motivate
                    them to earn Powerplays by performing tasks that{" "}
                    <span>increase engagement with your business!</span>
                  </div>
                </div>
                <div className="lotto-landing-ingagement-box1">
                  <div className="lotto-landing-text5">Eyes on-screen</div>
                  <div className="lotto-landing-text7">
                    we are ultimately focused on interactive sessions, which
                    means ‘eyes on-screen’ during our events. Our interactive
                    lottery platform is designed to keep player engagement high,
                    therefore,
                    <span>
                      increasing the number of players in every event.
                    </span>
                  </div>
                </div>
                <div className="lotto-landing-ingagement-box1">
                  <div className="lotto-landing-text5">Unlimited Access</div>
                  <div className="lotto-landing-text7">
                    Our platform is designed for{" "}
                    <span>all PC and mobile devices</span>, bringing customers
                    access to your Powerplay based events at any time, in any
                    place, without boundaries.
                  </div>
                </div>
              </div>
            </div>
            <div className="lotto-landing-row">
              <div className="lotto-landing-want">
                <div className="lotto-landing-text6">Do you want to</div>
                <div className="lotto-landing-text27">
                  Raise funds for an event or charity?
                </div>
                <br />
                <div className="lotto-landing-breaker"></div>
                <br />
                <div className="lotto-landing-text27">
                  Create additional government revenue?
                </div>
                <br />
                <div className="lotto-landing-breaker"></div>
                <br />
                <div className="lotto-landing-text27">
                  Drive additional revenue for your casino ?
                </div>
                <br />
                {this.componentButton("Partner With Us!", "partner")}
              </div>
              <div className="lotto-landing-want-right">
                <div className="lotto-landing-boxes-wrapper">
                  <div className="lotto-landing-box2">
                    <div className="lotto-landing-icon1"></div>
                    <div className="lotto-landing-text8">
                      State Run Lotteries
                    </div>
                    <div className="lotto-landing-text9">
                      We are taking state run lotteries to another level with
                      multiple game variations and real time interaction.{" "}
                    </div>
                  </div>
                  <div className="lotto-landing-box2">
                    <div className="lotto-landing-icon11"></div>
                    <div className="lotto-landing-text8">
                      Fundraising Lotteries
                    </div>
                    <div className="lotto-landing-text9">
                      We can build unique interactive Lottery games with an
                      interactive twist to generate more funds for your charity
                      or event.
                    </div>
                  </div>
                  <div className="lotto-landing-box2">
                    <div className="lotto-landing-icon111"></div>
                    <div className="lotto-landing-text8">
                      Promotional Contests
                    </div>
                    <div className="lotto-landing-text9">
                      Our lottery platform can be used to run a promotional
                      contest to engage with and drive customer behavior.
                    </div>
                  </div>
                </div>
                <div className="lotto-landing-text10">
                  We will take care of all legal requirements and administrative
                  tasks and also tailor the Powerplay platform to fit your
                  needs,
                </div>
                <div className="lotto-landing-text11">
                  Thereby leaving you to focus fully on your charity, business,
                  or government function.
                </div>
              </div>
            </div>
            <div className="lotto-landing-elite8">
              <div className="lotto-landing-text12">Elite 8</div>
              <div className="lotto-landing-text13">
                Try out our mobile friendly interactive lotto game in this
                promotional contest for a chance to win great prizes.
              </div>
              {this.componentButton("Enter Now", "enter")}
            </div>
            <div className="lotto-landing-text14">Player Experience</div>
            <div className="lotto-landing-text15">
              We are passionate about making sure that all your customers have
              an interactive and fun-filled experience when they use our
              service, whether they win or lose.
            </div>
            <div className="lotto-landing-experince">
              <div className="lotto-landing-experince-item">
                <div className="lotto-landing-icon21"> </div>
                <div className="lotto-landing-text16">
                  Unlimited pc/mobile access
                </div>
              </div>
              <div className="lotto-landing-experince-item">
                <div className="lotto-landing-icon22"> </div>
                <div className="lotto-landing-text16">
                  24/7 Customer Support
                </div>
              </div>
              <div className="lotto-landing-experince-item">
                <div className="lotto-landing-icon23"> </div>
                <div className="lotto-landing-text16">
                  interactive user-friendly platform
                </div>
              </div>
              <br />
              <div className="lotto-landing-text14a">
                Integrate with our platform and watch your{" "}
                <span>conversions </span>soar.
              </div>
              <br />
              {this.componentButton("Partner With Us!", "partner")}
              <div className="lotto-landing-space"> </div>
              {this.componentButtonTransparent("Try a Demo Game")}
              <br />
            </div>
            <div className="lotto-landing-text14">Imagine the Power</div>
            <div className="lotto-landing-text17">
              Winners are determined based on each players edited picks.
              <span> Players can edit their selections </span>using Powerplays.
            </div>
            <div className="lotto-work-items-wrapper">
              <div className="lotto-work-item">
                <div className="lotto-work-item-box">
                  <img
                    style={{ width: "98px" }}
                    src={require("./../../assets/images/lotto/group_19.png")}
                    className="img-responsive lotto-work-icon"
                  />
                  <div className="lotto-work-item-text">Increase/ Decrease</div>
                </div>
                <div className="lotto-work-item-note">
                  Players can increase or decrease in single increments.
                </div>
              </div>
              <div className="lotto-work-item">
                <div className="lotto-work-item-box">
                  <img
                    src={require("./../../assets/images/lotto/power.png")}
                    className="img-responsive lotto-work-icon"
                  />
                  <div className="lotto-work-item-text">Power Match</div>
                </div>
                <div className="lotto-work-item-note">
                  Players can use this ultra powerful powerplay to force match
                  one of their selections.
                </div>
              </div>
              <div className="lotto-work-item">
                <div className="lotto-work-item-box">
                  <img
                    src={require("./../../assets/images/lotto/group_11.png")}
                    className="img-responsive lotto-work-icon"
                  />
                  <div className="lotto-work-item-text">Replace All</div>
                </div>
                <div className="lotto-work-item-note">
                  Players can get a whole new random set of numbers during the
                  draw.
                </div>
              </div>
              <div className="lotto-work-item">
                <div className="lotto-work-item-box">
                  <img
                    src={require("./../../assets/images/lotto/shuffle.png")}
                    className="img-responsive lotto-work-icon"
                  />
                  <div className="lotto-work-item-text">Replace</div>
                </div>
                <div className="lotto-work-item-note">
                  Players can replace a single selection with a random new
                  selection.
                </div>
              </div>
              <div className="lotto-work-item">
                <div className="lotto-work-item-box">
                  <img
                    src={require("./../../assets/images/lotto/group_22.png")}
                    className="img-responsive lotto-work-icon"
                  />
                  <div className="lotto-work-item-text">Undo</div>
                </div>
                <div className="lotto-work-item-note">
                  Allows players to undo the latest change.
                </div>
              </div>
            </div>
            <br />
            {this.componentButtonTransparent("Try a Demo Game")}
            <br />
            <div className="lotto-landing-text14">Trust and Security</div>
            <div className="lotto-landing-text15">
              PowerPlay Lotto is an interactive platform that offers seamless
              and safe lottery style experiences for your customers.
            </div>
            <div className="lotto-landing-trust-items">
              <div className="lotto-landing-trust-item">
                <div className="lotto-landing-icon3"></div>
                <div className="lotto-landing-text18">
                  Ultra-fast,<span> SSL encrypted</span> and digitally secured.
                </div>
              </div>
              <div className="lotto-landing-trust-item">
                <div className="lotto-landing-icon3"></div>
                <div className="lotto-landing-text18">
                  Customers’<span> personal data</span> is stored{" "}
                  <span>securely</span>
                </div>
              </div>
              <div className="lotto-landing-trust-item">
                <div className="lotto-landing-icon3"></div>
                <div className="lotto-landing-text18">
                  Completely<span> transparent</span> in all our transactions.
                </div>
              </div>
              <div className="lotto-landing-trust-item">
                <div className="lotto-landing-icon3"></div>
                <div className="lotto-landing-text18">
                  <span>Instantly</span> Auditable Lottery Number Generation
                </div>
              </div>
            </div>
            <br />
            {this.componentButton("Partner With Us!", "partner")}
            <br />
            <div className="lotto-landing-genr8">
              <div className="lotto-landing-genr8-left">
                <div className="lotto-landing-text19">#GenR8™ Technology</div>
                <div className="lotto-landing-text20">
                  Our platform is based on our patent pending #GenR8™ Technology
                  – a cutting edge random lottery number generator that is 100%
                  safe, secure, and instantly auditable.
                </div>
                <div className="lotto-landing-text21">
                  Our #GenR8™ Technology integrates real-life time-events to our
                  number generating engine paired with block-chain technology to
                  provide a random number generator that provides truly random,
                  100% fraud resistant, instantly auditable inputs to your
                  lottery games.
                </div>
              </div>
              <div className="lotto-landing-icon4"></div>
            </div>
            <br />
            <div className="lotto-landing-text22">
              Significantly boost and expand your existing revenue generating
              strategy.
            </div>
            <br />
            <div className="lotto-landing-text23">
              <span>Do you want to tap into the mobile generation?</span>{" "}
              Partner with us and start your customized experience that is
              perfectly tailored to meet your needs.
            </div>
            <br />
            <div className="lotto-landing-text24">
              Let us help you with your licensing and legal requirements,
              business strategy, game design, and integrated marketing to ensure
              you stay ahead of the competition.
            </div>
            <br />
            {this.componentButton("Partner With Us!", "partner")}
          </div>
          <Footer />
          <Modal show={this.state.showPrize} onHide={this.handleClosePrize}>
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
                            <p>
                              {"$" + Functions.numberWithCommas(prize.prize)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              }
            </Modal.Body>
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <DrawTimer />
        </div>
      );
    }
  }
}

export default withRouter(PowerplayLotto);
