import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";
import * as Constants from "./../common/constants";
import * as Functions from "./../common/functions";
import Cookies from "universal-cookie";

class LottoResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      gameData: this.props.location.state.gameData,
      draw: this.props.location.state.draw,
      result: this.props.location.state.result,
      picks: this.props.location.state.picks
    };
    console.log(this.state.picks);
    this.isAMatch = this.isAMatch.bind(this);
  }
  /* Checking if the element matches any draw number*/
  isAMatch(element) {
    let obj = this.state.draw.find(
      obj => obj.daw_ball_number == element.number
    );
    if (obj) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <>
        <Header />
        <div className="content">
          <div className="lotto-result-header">
            <span>Lotto 747</span> Draw Results{" "}
          </div>
          <div className="lotto-result-winning-numbers">
            <div className="lotto-result-numbers-left">
              <span>Winning Numbers</span>
              <div className="lotto-result-balls-wrapper">
                <div className="lotto-result-ball">
                  {this.state.draw[0].daw_ball_number}
                </div>
                <div className="lotto-result-ball">
                  {this.state.draw[1].daw_ball_number}
                </div>
                <div className="lotto-result-ball">
                  {this.state.draw[2].daw_ball_number}
                </div>
                <div className="lotto-result-ball">
                  {this.state.draw[3].daw_ball_number}
                </div>
                <div className="lotto-result-ball">
                  {this.state.draw[4].daw_ball_number}
                </div>
                <div className="lotto-result-ball">
                  {this.state.draw[5].daw_ball_number}
                </div>
                <div className="lotto-result-ball">
                  {this.state.draw[6].daw_ball_number}
                </div>
              </div>
            </div>
            <div className="lotto-result-number-right">
              <span>Please select draw date</span>
              <div className="lotto-result-dropdown">
                <select>
                  <option value="volvo">
                    {Functions.getStringDate(
                      this.state.gameData.start_datetime
                    )}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="lotto-result-winning-matches">
            <div className="lotto-result-matches-left">
              <div className="lotto-result-matched-text">
                Matched <span>{this.state.result.balls_matched}</span> of 7
                numbers
              </div>
              <div className= {this.state.result.prize > 0 ?"lotto-result-matched-outcome" :"lotto-result-matched-outcome fail"}>
                {this.state.result.prize > 0 ? "Congratulations! You are a winner" : "Sorry! You did not win any Prize"}
            
              </div>
              <div className="lotto-result-matches-balls-wrapper">
                {this.state.picks.map(home => {
                  if (this.isAMatch(home)) {
                    return (
                      <div className="lotto-result-matches-ball active">
                        {home.number}
                        <img
                          src={require("./../../assets/images/747_live/checked.png")}
                          className="img-responsive prize-img"
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className="lotto-result-matches-ball">{home.number}</div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="lotto-result-matches-right">
              <div className="lotto-result-prize-top">
                <img
                  src={require("./../../assets/images/747_live/trophy.png")}
                  className="img-responsive prize-img"
                />
                <div className="lotto-result-prize-top-left">
                  <div className="text-1">You Won</div>
                  <div className="text-2">
                    {"$" + this.state.result.prize_won}
                  </div>
                </div>
              </div>
              <div className="lotto-result-prize-bottom">
                <button>Go to Balance</button>
              </div>
            </div>
          </div>
          <div>
            <table className="lottery-result-table">
              <thead>
                <tr>
                  <td>Numbers Matched</td>
                  <td>Total Prize</td>
                  <td>Number of Winners</td>
                  <td>Payout</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  className={
                    this.state.result.balls_matched ==
                    this.state.gameData.prize[0].hits
                      ? "row-active"
                      : ""
                  }
                >
                  <td> {this.state.gameData.prize[0].hits + " of 7"}</td>
                  <td>
                    {"$" +
                      Functions.numberWithCommas(
                        this.state.gameData.prize[0].prize
                      )}
                  </td>
                  <td>1</td>
                  <td>
                    {"$" +
                      Functions.numberWithCommas(
                        this.state.gameData.prize[0].prize
                      )}
                  </td>
                </tr>
                <tr
                  className={
                    this.state.result.balls_matched ==
                    this.state.gameData.prize[1].hits
                      ? "row-active"
                      : ""
                  }
                >
                  <td> {this.state.gameData.prize[1].hits + " of 7"}</td>
                  <td>
                    {"$" +
                      Functions.numberWithCommas(
                        this.state.gameData.prize[1].prize
                      )}
                  </td>
                  <td>1</td>
                  <td>
                    {"$" +
                      Functions.numberWithCommas(
                        this.state.gameData.prize[1].prize
                      )}
                  </td>
                </tr>
                <tr
                  className={
                    this.state.result.balls_matched ==
                    this.state.gameData.prize[2].hits
                      ? "row-active"
                      : ""
                  }
                >
                  <td> {this.state.gameData.prize[2].hits + " of 7"}</td>
                  <td>
                    {"$" +
                      Functions.numberWithCommas(
                        this.state.gameData.prize[2].prize
                      )}
                  </td>
                  <td>1</td>
                  <td>
                    {"$" +
                      Functions.numberWithCommas(
                        this.state.gameData.prize[2].prize
                      )}
                  </td>
                </tr>
                <tr
                  className={
                    this.state.result.balls_matched ==
                    this.state.gameData.prize[2].hits
                      ? "row-active"
                      : ""
                  }
                >
                  <td> {this.state.gameData.prize[3].hits + " of 7"}</td>
                  <td>
                    {"$" +
                      Functions.numberWithCommas(
                        this.state.gameData.prize[3].prize
                      )}
                  </td>
                  <td>1</td>
                  <td>
                    {"$" +
                      Functions.numberWithCommas(
                        this.state.gameData.prize[3].prize
                      )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
export default withRouter(LottoResult);
