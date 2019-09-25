import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import Invertory from "./../common/inventory";
import * as Constants from "./../common/constants";
import { CSSTransitionGroup } from "react-transition-group"; // ES6
import "./index.css";
var mTotal = 0.0;

class PowerplayStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      cartItems: [],
      activeSport: 0
    };

    this.onSportClicked = this.onSportClicked.bind(this);
  }
  onSportClicked(index) {
    this.setState({
      activeSport: index
    });
  }
  onAddToCartClicked(index, amount) {
    if (this.state.cartItems.includes(index)) {
      const mIndex = this.state.cartItems.indexOf(index);
      this.state.cartItems.splice(mIndex, 1);
      mTotal = mTotal - amount;
      this.setState({
        cartIndex: this.state.cartItems
      });
    } else {
      this.state.cartItems.push(index);
      mTotal = mTotal + amount;
      this.setState({
        cartIndex: this.state.cartItems
      });
    }
  }
  componentDidMount() {
    fetch("https://" + Constants.URL + "/api/store_subscription/read.php")
      .then(res => res.json())
      .then(
        response => {
          let results = response.records;
          this.setState({
            mSubscriptions: results
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }

  render() {
    return (
      <div>
        <Header />
        <div class="container-fluid PowerPlayGames_PricingPage">
          <div className="store-header">
            Subscribe Now And Get <span>UNLIMITED</span> powerplay invenotory!
          </div>
          <div className="top-box">
            <div className="top-box-header">
              <span>Super Elite</span>
            </div>
            <div className="top-box-price">$40</div>
            <div className="top-box-detail">
              <img
                src={require("./../../assets/images/icons/icon_unlimited.png")}
                class="Group-8"
              />
              <p>UNLIMITED GAMES</p>
            </div>
            <div className="top-box-detail">
              <img
                src={require("./../../assets/images/icons/icon_score.png")}
                class="Group-8"
              />
              <p>LIVE SCORES</p>
            </div>
            <button className="top-box-button">Subscrive Now</button>
          </div>
          <div className="row-sport-buttons row">
            <div className="col-md-3">
              <button
                className={
                  this.state.activeSport == 0
                    ? "sport-button-active"
                    : "sport-button"
                }
                onClick={() => this.onSportClicked(0)}
              >
                Football
              </button>
            </div>
            <div className="col-md-3">
              <button
                className={
                  this.state.activeSport == 1
                    ? "sport-button-active"
                    : "sport-button"
                }
                onClick={() => this.onSportClicked(1)}
              >
                Baseball
              </button>
            </div>
            <div className="col-md-3">
              <button
                className={
                  this.state.activeSport == 2
                    ? "sport-button-active"
                    : "sport-button"
                }
                onClick={() => this.onSportClicked(2)}
              >
                Hockey
              </button>
            </div>
            <div className="col-md-3">
              <button
                className={
                  this.state.activeSport == 3
                    ? "sport-button-active"
                    : "sport-button"
                }
                onClick={() => this.onSportClicked(3)}
              >
                Basketball
              </button>
            </div>
          </div>
          <div className="row row-subscription" id = "slide">
            <div className={
                  this.state.activeSport == 0
                    ? "col-md-8 pricing-sport-tab-selected"
                    : "col-md-8 pricing-sport-tab"
                } id="football">
              <div className="col-md-6">
                <div
                  className={
                    this.state.cartItems.includes(0 + "-" + 0)
                      ? "sub-box-active"
                      : "sub-box"
                  }
                >
                  <div
                    className={
                      this.state.cartItems.includes(0 + "-" + 0)
                        ? "sub-box-added-active"
                        : "sub-box-added"
                    }
                  >
                    Added
                  </div>
                  <div className="sub-box-header">Basic</div>
                  <div className="sub-box-s-header">
                    <span className="span-amount">10</span>{" "}
                    <span className="span-text">games</span>
                  </div>
                  <div className="sub-box-price">
                    $13<span>/month</span>
                  </div>
                  <div className="sub-box-descr">
                    Enjoy the whatever lorem ipsum lorem ipsum. Enjoy the
                    whatever lorem yes ipsum lorem ipsum
                  </div>
                  <button
                    className={
                      this.state.cartItems.includes(0 + "-" + 0)
                        ? "sub-box-button-active"
                        : "sub-box-button"
                    }
                    onClick={() => this.onAddToCartClicked(0 + "-" + 0, 13)}
                  >
                    {this.state.cartItems.includes(0 + "-" + 0)
                      ? "Remove"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className={
                    this.state.cartItems.includes(0 + "-" + 1)
                      ? "sub-box-active"
                      : "sub-box"
                  }
                >
                  <div
                    className={
                      this.state.cartItems.includes(0 + "-" + 1)
                        ? "sub-box-added-active"
                        : "sub-box-added"
                    }
                  >
                    Added
                  </div>
                  <div className="sub-box-header">Basic</div>
                  <div className="sub-box-s-header">
                    <span className="span-amount">10</span>{" "}
                    <span className="span-text">games</span>
                  </div>
                  <div className="sub-box-price">
                    $20<span>/month</span>
                  </div>
                  <div className="sub-box-descr">
                    Enjoy the whatever lorem ipsum lorem ipsum. Enjoy the
                    whatever lorem yes ipsum lorem ipsum
                  </div>
                  <button
                    className={
                      this.state.cartItems.includes(0 + "-" + 1)
                        ? "sub-box-button-active"
                        : "sub-box-button"
                    }
                    onClick={() => this.onAddToCartClicked(0 + "-" + 1, 20)}
                  >
                    {this.state.cartItems.includes(0 + "-" + 1)
                      ? "Remove"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
            <div className={
                  this.state.activeSport == 1
                    ? "col-md-8 pricing-sport-tab-selected"
                    : "col-md-8 pricing-sport-tab"
                } id="baseball">
              <div className="col-md-6">
                <div
                  className={
                    this.state.cartItems.includes(1 + "-" + 0)
                      ? "sub-box-active"
                      : "sub-box"
                  }
                >
                  <div
                    className={
                      this.state.cartItems.includes(1 + "-" + 0)
                        ? "sub-box-added-active"
                        : "sub-box-added"
                    }
                  >
                    Added
                  </div>
                  <div className="sub-box-header">Basic</div>
                  <div className="sub-box-s-header">
                    <span className="span-amount">10</span>{" "}
                    <span className="span-text">games</span>
                  </div>
                  <div className="sub-box-price">
                    $13<span>/month</span>
                  </div>
                  <div className="sub-box-descr">
                    Enjoy the whatever lorem ipsum lorem ipsum. Enjoy the
                    whatever lorem yes ipsum lorem ipsum
                  </div>
                  <button
                    className={
                      this.state.cartItems.includes(1 + "-" + 0)
                        ? "sub-box-button-active"
                        : "sub-box-button"
                    }
                    onClick={() => this.onAddToCartClicked(1 + "-" + 0, 13)}
                  >
                    {this.state.cartItems.includes(1 + "-" + 0)
                      ? "Remove"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className={
                    this.state.cartItems.includes(1 + "-" + 1)
                      ? "sub-box-active"
                      : "sub-box"
                  }
                >
                  <div
                    className={
                      this.state.cartItems.includes(1 + "-" + 1)
                        ? "sub-box-added-active"
                        : "sub-box-added"
                    }
                  >
                    Added
                  </div>
                  <div className="sub-box-header">Basic</div>
                  <div className="sub-box-s-header">
                    <span className="span-amount">10</span>{" "}
                    <span className="span-text">games</span>
                  </div>
                  <div className="sub-box-price">
                    $20<span>/month</span>
                  </div>
                  <div className="sub-box-descr">
                    Enjoy the whatever lorem ipsum lorem ipsum. Enjoy the
                    whatever lorem yes ipsum lorem ipsum
                  </div>
                  <button
                    className={
                      this.state.cartItems.includes(1 + "-" + 1)
                        ? "sub-box-button-active"
                        : "sub-box-button"
                    }
                    onClick={() => this.onAddToCartClicked(1 + "-" + 1, 20)}
                  >
                    {this.state.cartItems.includes(1 + "-" + 1)
                      ? "Remove"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
            <div className={
                  this.state.activeSport == 2
                    ? "col-md-8 pricing-sport-tab-selected"
                    : "col-md-8 pricing-sport-tab"
                } id="hockey">
              <div className="col-md-6">
                <div
                  className={
                    this.state.cartItems.includes(2 + "-" + 0)
                      ? "sub-box-active"
                      : "sub-box"
                  }
                >
                  <div
                    className={
                      this.state.cartItems.includes(2 + "-" + 0)
                        ? "sub-box-added-active"
                        : "sub-box-added"
                    }
                  >
                    Added
                  </div>
                  <div className="sub-box-header">Basic</div>
                  <div className="sub-box-s-header">
                    <span className="span-amount">10</span>{" "}
                    <span className="span-text">games</span>
                  </div>
                  <div className="sub-box-price">
                    $13<span>/month</span>
                  </div>
                  <div className="sub-box-descr">
                    Enjoy the whatever lorem ipsum lorem ipsum. Enjoy the
                    whatever lorem yes ipsum lorem ipsum
                  </div>
                  <button
                    className={
                      this.state.cartItems.includes(2 + "-" + 0)
                        ? "sub-box-button-active"
                        : "sub-box-button"
                    }
                    onClick={() => this.onAddToCartClicked(2 + "-" + 0, 13)}
                  >
                    {this.state.cartItems.includes(2 + "-" + 0)
                      ? "Remove"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className={
                    this.state.cartItems.includes(2 + "-" + 1)
                      ? "sub-box-active"
                      : "sub-box"
                  }
                >
                  <div
                    className={
                      this.state.cartItems.includes(2 + "-" + 1)
                        ? "sub-box-added-active"
                        : "sub-box-added"
                    }
                  >
                    Added
                  </div>
                  <div className="sub-box-header">Basic</div>
                  <div className="sub-box-s-header">
                    <span className="span-amount">10</span>{" "}
                    <span className="span-text">games</span>
                  </div>
                  <div className="sub-box-price">
                    $20<span>/month</span>
                  </div>
                  <div className="sub-box-descr">
                    Enjoy the whatever lorem ipsum lorem ipsum. Enjoy the
                    whatever lorem yes ipsum lorem ipsum
                  </div>
                  <button
                    className={
                      this.state.cartItems.includes(2 + "-" + 1)
                        ? "sub-box-button-active"
                        : "sub-box-button"
                    }
                    onClick={() => this.onAddToCartClicked(2 + "-" + 1, 20)}
                  >
                    {this.state.cartItems.includes(2 + "-" + 1)
                      ? "Remove"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
            <div className={
                  this.state.activeSport == 3
                    ? "col-md-8 pricing-sport-tab-selected"
                    : "col-md-8 pricing-sport-tab"
                } id="basketball">
              <div className="col-md-6">
                <div
                  className={
                    this.state.cartItems.includes(3 + "-" + 0)
                      ? "sub-box-active"
                      : "sub-box"
                  }
                >
                  <div
                    className={
                      this.state.cartItems.includes(3 + "-" + 0)
                        ? "sub-box-added-active"
                        : "sub-box-added"
                    }
                  >
                    Added
                  </div>
                  <div className="sub-box-header">Basic</div>
                  <div className="sub-box-s-header">
                    <span className="span-amount">10</span>{" "}
                    <span className="span-text">games</span>
                  </div>
                  <div className="sub-box-price">
                    $13<span>/month</span>
                  </div>
                  <div className="sub-box-descr">
                    Enjoy the whatever lorem ipsum lorem ipsum. Enjoy the
                    whatever lorem yes ipsum lorem ipsum
                  </div>
                  <button
                    className={
                      this.state.cartItems.includes(3 + "-" + 0)
                        ? "sub-box-button-active"
                        : "sub-box-button"
                    }
                    onClick={() => this.onAddToCartClicked(3 + "-" + 0, 13)}
                  >
                    {this.state.cartItems.includes(3 + "-" + 0)
                      ? "Remove"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className={
                    this.state.cartItems.includes(3 + "-" + 1)
                      ? "sub-box-active"
                      : "sub-box"
                  }
                >
                  <div
                    className={
                      this.state.cartItems.includes(3 + "-" + 1)
                        ? "sub-box-added-active"
                        : "sub-box-added"
                    }
                  >
                    Added
                  </div>
                  <div className="sub-box-header">Basic</div>
                  <div className="sub-box-s-header">
                    <span className="span-amount">10</span>{" "}
                    <span className="span-text">games</span>
                  </div>
                  <div className="sub-box-price">
                    $20<span>/month</span>
                  </div>
                  <div className="sub-box-descr">
                    Enjoy the whatever lorem ipsum lorem ipsum. Enjoy the
                    whatever lorem yes ipsum lorem ipsum
                  </div>
                  <button
                    className={
                      this.state.cartItems.includes(3 + "-" + 1)
                        ? "sub-box-button-active"
                        : "sub-box-button"
                    }
                    onClick={() => this.onAddToCartClicked(3 + "-" + 1, 20)}
                  >
                    {this.state.cartItems.includes(3 + "-" + 1)
                      ? "Remove"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="pricing-box-total">
                <div className="pricing-box-total-header">Total</div>
                <div className="pricing-box-total-price">
                  {"$" + mTotal.toFixed(2)}
                </div>
                <button className="pricing-box-total-button">Checout</button>
              </div>
            </div>
          </div>
          <div className="row-footer-image" />
          <img
            src={require("./../../assets/images/pricing_footer.png")}
            class="footer-image"
          />
        </div>

        <Footer />
      </div>
    );
  }
}

export default withRouter(PowerplayStore);
