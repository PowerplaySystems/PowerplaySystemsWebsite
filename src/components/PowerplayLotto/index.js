import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";

var bg = require("./../../assets/images/lotto/lotto_header.png");
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

    this.state = {
      error: null,
      isLoaded: false,
      content: ""
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="container">
            <div style={mCircleStyles}>
              <div className="lotto-header">
                <div className="lotto-heading-main">
                  <span>PowerPlay Lotto</span>
                </div>
                <div className="lotto-heading-sub">
                  <span>
                    Disrupting the 'pick & wait' paper based lottery system
                  </span>
                </div>
                <div className="lotto-header-button-wrapper">
                  <button className="lotto-header-button">
                    Explore All Games
                  </button>
                </div>
              </div>
            </div>

            <div className="lotto-section-2-heading">
              <span>
                Enter one of our exciting lottery games utilizing our
                revolutionary interactive lottery platform.
              </span>
            </div>
            <div className="lotto-divider" />
            <div className="lotto-block-even">
              <div className="lotto-even-image">
                <img
                  src={require("./../../assets/images/lotto/lotto_icon_747.png")}
                  className="img-responsive"
                />
              </div>
              <div className="lotto-even-details">
                <div className="lotto-even-details-header">
                  <span>747</span>
                </div>
                <div className="lotto-even-details-sub-heading">
                  <span>
                    Pick 7 numbers. Use Powerplays to change your numbers during
                    the draw!
                  </span>
                </div>
                <div className="lotto-even-details-jackpot">
                  <span>Jackpot</span>
                </div>
                <div className="lotto-even-details-amount">
                  <div>
                    <span>$100,000</span>
                  </div>
                  <div style={mDivStyle}>
                    <button>View All Prizes</button>
                  </div>
                </div>
                <div className="lotto-even-details-odds">
                  <span>Odds of winning</span>
                </div>
                <div className="lotto-even-details-odds-amount">
                  <span>1 in 384,000,000</span>
                </div>

                <div class="lotto-even-details-draw">
                  <div>
                    <p>Next Draw Starts</p>
                    <div class="row lotto-even-details_draw_box">
                      <div>
                        <p>1</p>Days
                      </div>
                      <div>
                        <p>14</p>hours
                      </div>
                      <div>
                        <p>23</p>Mints
                      </div>
                    </div>
                  </div>
                  <div>
                    <button>Pick your Numbers now</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lotto-block-odd">
              <div className="lotto-even-image">
                <img
                  src={require("./../../assets/images/lotto/lotto_icon_elite.png")}
                  className="img-responsive"
                />
              </div>
              <div className="lotto-even-details">
                <div className="lotto-even-details-header">
                  <span>ELITE 8</span>
                </div>
                <div className="lotto-even-details-sub-heading">
                  <span>
                  Go one step further and pick 8 numbers for this game!
                  </span>
                </div>
                <div className="lotto-even-details-jackpot">
                  <span>Jackpot</span>
                </div>
                <div className="lotto-even-details-amount">
                  <div>
                    <span>$100,000</span>
                  </div>
                  <div style={mDivStyle}>
                    <button>View All Prizes</button>
                  </div>
                </div>
                <div className="lotto-even-details-odds">
                  <span>Odds of winning</span>
                </div>
                <div className="lotto-even-details-odds-amount">
                  <span>1 in 384,000,000</span>
                </div>

                <div class="lotto-even-details-draw">
                  <div>
                    <p>Next Draw Starts</p>
                    <div class="row lotto-even-details_draw_box">
                      <div>
                        <p>1</p>Days
                      </div>
                      <div>
                        <p>14</p>hours
                      </div>
                      <div>
                        <p>23</p>Mints
                      </div>
                    </div>
                  </div>
                  <div>
                    <button>Pick your Numbers now</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lotto-block-even">
              <div className="lotto-even-image">
                <img
                  src={require("./../../assets/images/lotto/lotto_icon_sweet16.png")}
                  className="img-responsive"
                />
              </div>
              <div className="lotto-even-details">
                <div className="lotto-even-details-header">
                  <span>Sweet 16</span>
                </div>
                <div className="lotto-even-details-sub-heading">
                  <span>
                  You will need to closely manage your Powerplays for this challenging 16 ball game!
                  </span>
                </div>
                <div className="lotto-even-details-jackpot">
                  <span>Jackpot</span>
                </div>
                <div className="lotto-even-details-amount">
                  <div>
                    <span>$100,000</span>
                  </div>
                  <div style={mDivStyle}>
                    <button>View All Prizes</button>
                  </div>
                </div>
                <div className="lotto-even-details-odds">
                  <span>Odds of winning</span>
                </div>
                <div className="lotto-even-details-odds-amount">
                  <span>1 in 384,000,000</span>
                </div>

                <div class="lotto-even-details-draw">
                  <div>
                    <p>Next Draw Starts</p>
                    <div class="row lotto-even-details_draw_box">
                      <div>
                        <p>1</p>Days
                      </div>
                      <div>
                        <p>14</p>hours
                      </div>
                      <div>
                        <p>23</p>Mints
                      </div>
                    </div>
                  </div>
                  <div>
                    <button>Pick your Numbers now</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lotto-block-odd">
              <div className="lotto-even-image">
                <img
                  src={require("./../../assets/images/lotto/lotto_icon_gridlock.png")}
                  className="img-responsive"
                />
              </div>
              <div className="lotto-even-details">
                <div className="lotto-even-details-header">
                  <span>Gridlock</span>
                </div>
                <div className="lotto-even-details-sub-heading">
                  <span>
                  Pick one # from each of the 12 grids! Being stuck in a Gridlock is finally exciting!
                  </span>
                </div>
                <div className="lotto-even-details-jackpot">
                  <span>Jackpot</span>
                </div>
                <div className="lotto-even-details-amount">
                  <div>
                    <span>$100,000</span>
                  </div>
                  <div style={mDivStyle}>
                    <button>View All Prizes</button>
                  </div>
                </div>
                <div className="lotto-even-details-odds">
                  <span>Odds of winning</span>
                </div>
                <div className="lotto-even-details-odds-amount">
                  <span>1 in 384,000,000</span>
                </div>

                <div class="lotto-even-details-draw">
                  <div>
                    <p>Next Draw Starts</p>
                    <div class="row lotto-even-details_draw_box">
                      <div>
                        <p>1</p>Days
                      </div>
                      <div>
                        <p>14</p>hours
                      </div>
                      <div>
                        <p>23</p>Mints
                      </div>
                    </div>
                  </div>
                  <div>
                    <button>Pick your Numbers now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(PowerplayLotto);
