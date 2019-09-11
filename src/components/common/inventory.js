import React, { Component } from "react";
import "./index.css";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
var hockeyText = "",
  baseballText = "",
  basketballText = "",
  footballText = "",
  hasSuperElite = false;
class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      mSubscriptions: [],
      mBalanceCash: 0,
      mBalancePoints: 0,
      showMore: this.props.showMore
    };
  }
  handleBalanceChange = () => {
    var bal = this.state.mBalanceCash;
    this.props.onBalanceUpdate(bal);
  };
  getSubscriptionButtonText() {
    let subs = this.state.mSubscriptions;
    if (subs.length == 0) return "Subscribe Now!";
    else return "Get Super Elite Now!";
  }
  componentDidMount() {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    fetch(
      "https://powerplaysystems.com/public_api/subscription/my_subscriptions.php?jwt=" +
        jwt
    )
      .then(res => res.json())
      .then(
        records => {
          let pows = records.subscriptions;

          this.setState({
            mSubscriptions: pows,
            mBalanceCash: records.balance.cash,
            mBalancePoints: records.balance.points
          });
          this.handleBalanceChange();
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }
  render() {
    this.state.mSubscriptions.forEach(element => {
      if (element.sport_id == 1) {
        hockeyText = element.subscription_name;
        element.subscription_id == 7 ? hasSuperElite = true : hasSuperElite = hasSuperElite
      }
      if (element.sport_id == 2) {
        baseballText = element.subscription_name;
        element.subscription_id == 10 ? hasSuperElite = true : hasSuperElite = hasSuperElite
      }
      if (element.sport_id == 3) {
        basketballText = element.subscription_name;
        element.subscription_id == 13 ? hasSuperElite = true : hasSuperElite = hasSuperElite
      }
      if (element.sport_id == 4) {
        footballText = element.subscription_name;
        element.subscription_id == 16 ? hasSuperElite = true : hasSuperElite = hasSuperElite
      }
    });
    return (
      <div class="col-md-4">
        <div class="left_side_live left-score">
          <h1>
            <span class="fa fa-info-circle infobtn" /> My Powerplay
            Subscriptions
          </h1>
          <ul>
            <li className="inventory-li">
              {hockeyText == "" ? (
                <>
                  <img
                    className="img-responsive subscription-icon"
                    src={require("./../../assets/images/icons/check-box-unchecked.png")}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="sub-spans">{"Hockey - No Subscription"}</span>
                </>
              ) : (
                <>
                  <img
                    className="img-responsive subscription-icon"
                    src={require("./../../assets/images/icons/check-box-checked.png")}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="sub-spans">{hockeyText}</span>
                </>
              )}
            </li>
            <li className="inventory-li">
              {baseballText == "" ? (
                <>
                  <img
                    className="img-responsive subscription-icon"
                    src={require("./../../assets/images/icons/check-box-unchecked.png")}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="sub-spans">{"Baseball - No Subscription"}</span>
                </>
              ) : (
                <>
                  <img
                    className="img-responsive subscription-icon"
                    src={require("./../../assets/images/icons/check-box-checked.png")}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="sub-spans">{baseballText}</span>
                </>
              )}
            </li>
            <li className="inventory-li">
              {basketballText == "" ? (
                <>
                  <img
                    className="img-responsive subscription-icon"
                    src={require("./../../assets/images/icons/check-box-unchecked.png")}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="sub-spans">
                    {"Basketball - No Subscription"}
                  </span>
                </>
              ) : (
                <>
                  <img
                    className="img-responsive subscription-icon"
                    src={require("./../../assets/images/icons/check-box-checked.png")}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="sub-spans">{basketballText}</span>
                </>
              )}
            </li>
            <li className="inventory-li">
              {footballText == "" ? (
                <>
                  <img
                    className="img-responsive subscription-icon"
                    src={require("./../../assets/images/icons/check-box-unchecked.png")}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="sub-spans">{"Football - No Subscription"}</span>
                </>
              ) : (
                <>
                  <img
                    className="img-responsive subscription-icon"
                    src={require("./../../assets/images/icons/check-box-checked.png")}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="sub-spans">{footballText}</span>
                </>
              )}
            </li>
          </ul>
          {/* {(() => {
            if (!hasSuperElite) {
              return (
                <a onClick={() => this.props.history.push("/powerplay-store")}>
                  <button>MANAGE SUBSCRIPTIONS</button>
                </a>
              );
            }
          })()} */}
        </div>
        {(() => {
          if (!hasSuperElite) {
            return (
              <div class="left-score">
                <div class="m-subs">
                <center>
                <button
                    onClick={() =>
                      this.props.history.push("/powerplay-store")
                    }>
                      {this.getSubscriptionButtonText()
                      }
                    </button>
                  </center>                
                  
             
                </div>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

export default withRouter(Inventory);
