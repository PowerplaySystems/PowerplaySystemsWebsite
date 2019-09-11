import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import VirtualCardVideos from "./VirtualCardVideos";
import "./index.css";
import * as Constants from "./../common/constants";
class LotteryPlatform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      steps: []
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    fetch(
      "https://" + Constants.URL + "/api/website_corporate/get.php?type=sport"
    )
      .then(res => res.json())
      .then(
        xx => {
          this.setState({
            steps: xx.records
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
    if (this.state.steps.length == 0) {
      return (
        <div>
          <Header />
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <div className="container-fluid p-o">
            <div className="how-to-play-section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-main-title box_one_ply">
                      <h5 style={{ textAlign: "center" }}>
                      Powerplay Live Sports offers an exciting way to engage with your customer base!
                      </h5>
                    </div>

                    <div className="how-to-play-content">
                      <div className="row htp-header">
                        <div className="caption box_one_ply">
                          <h3 className="htp-title">Highlights</h3>
                        </div>
                      </div>

                      <div className="htp-inner-content">
                        <div className="counting-block-section">
                          <div className="counter-block box_one_ply">
                            <h3>1</h3>
                          </div>
                        </div>
                        <div
                          className="step-content"
                          dangerouslySetInnerHTML={{__html: this.state.steps[0].content}}
                        />
                      </div>
                      <div className="htp-inner-content right-side-section">
                        <div className="counting-block-section">
                          <div className="counter-block">
                            <h3 className="box_one_ply">2</h3>
                          </div>
                        </div>
                        <div
                          className="step-content"
                          dangerouslySetInnerHTML={{__html: this.state.steps[1].content}}
                        />
                      </div>
                      <div className="htp-inner-content">
                        <div className="counting-block-section">
                          <div className="counter-block box_one_ply">
                            <h3>3</h3>
                          </div>
                        </div>
                        <div
                          className="step-content"
                          dangerouslySetInnerHTML={{__html: this.state.steps[2].content}}
                        />
                      </div>
                      <div className="htp-inner-content right-side-section">
                        <div className="counting-block-section">
                          <div className="counter-block box_one_ply">
                            <h3>4</h3>
                          </div>
                        </div>
                        <div
                          className="step-content"
                          dangerouslySetInnerHTML={{__html: this.state.steps[3].content}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <VirtualCardVideos />
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default withRouter(LotteryPlatform);
