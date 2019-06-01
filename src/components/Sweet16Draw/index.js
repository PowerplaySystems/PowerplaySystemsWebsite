import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "./index.css";
var bg = require("./../../assets/images/747_live/circle.png");
let mCircleStyles = {
    backgroundImage: 'url(' + bg + ')',
    backgroundSize: 'cover',
    overflow: 'hidden',
}
let mLockedCircleStyles = {
    backgroundImage: 'url(' + bg + ')',
    backgroundSize: 'cover',
    overflow: 'hidden',
}
class Sweet16Draw extends Component {
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
        <div className="container-fluid _faq_wrap">
          <div className="container">
            <div className="row sweet16_live_rows">
              <div className="col-md-12">
                <img
                  className="img-responsive"
                  src={require("./../../assets/images/lotto/sweet16/sweet16_header.png")}
                />
              </div>
              <div className="col-md-12">
                <div className="live_draw_header_content">
                  <span>Jackpot</span>
                  <h2>$100,000</h2>
                </div>
              </div>
              <div className="col-md-12">
                <div className="live_draw_header_content">
                  <span>Live Draw</span>
                </div>
                <div className="live_draw_winning_box_content">
                  <p>Winning Number</p>
                  <div className="row winning_box_numbers_sweet16"
                  >
                    <div className="winning_box_circle_sweet16"   style={mCircleStyles}>?</div>
                    <div className="winning_box_circle_sweet16"   style={mCircleStyles}>?</div>
                    <div className="winning_box_circle_sweet16_active" style={mCircleStyles}>13</div>
                    <div className="winning_box_circle_sweet16" style={mCircleStyles}>?</div>
                    <div className="winning_box_circle_sweet16_active" style={mCircleStyles}>22</div>
                    <div className="winning_box_circle_sweet16_active" style={mCircleStyles}>27</div>
                    <div className="winning_box_circle_sweet16" style={mCircleStyles}>?</div>
                    <div className="winning_box_circle_sweet16" style={mCircleStyles}>?</div>
                    <div className="winning_box_circle_sweet16"   style={mCircleStyles}>?</div>
                    <div className="winning_box_circle_sweet16"   style={mCircleStyles}>?</div>
                    <div className="winning_box_circle_sweet16_active" style={mCircleStyles}>13</div>
                    <div className="winning_box_circle_sweet16" style={mCircleStyles}>?</div>
                    <div className="winning_box_circle_sweet16_active" style={mCircleStyles}>22</div>
                    <div className="winning_box_circle_sweet16_active" style={mCircleStyles}>27</div>
                    <div className="winning_box_circle_sweet16" style={mCircleStyles}>?</div>
                    <div className="winning_box_circle_sweet16" style={mCircleStyles}>?</div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="live_draw_in_play">
                  <p>In Play</p>
                  <div className="live_draw_in_play_timer">
                    <div className="live_draw_in_play_circle" style={mCircleStyles}>13</div>
                    <div className="live_draw_in_play_text">
                      Timer Till Next Number Draw
                    </div>
                    <div className="live_draw_in_play_time">
                      9 <span>sec.</span>
                    </div>
                  </div>
                </div>
                <div className="live_draw_my_numbers">
                  <div className="live_draw_my_numbers_header_wrapper">
                    {" "}
                    <p>My Numbers</p>
                  </div>

                  <div className="live_draw_my_numbers_edit">
                    <div className="mleft">
                      <p className="mleft_top_text">Cick a number to edit</p>
                      <div className="row edit_numbers">
                        <div className="edit_numbers_circle_sweet16" style={mCircleStyles}>2</div>
                        <div className="edit_numbers_circle_sweet16" style={mCircleStyles}>7</div>
                        <div className="edit_numbers_circle_sweet16" style={mCircleStyles}>7</div>
                        <div className="edit_numbers_circle_sweet16_active" style = {mLockedCircleStyles}>
                        
                          13
                          <img
                            className="img-responsive"
                            src={require("./../../assets/images/747_live/lock.png")}
                          />
                        </div>
                        <div
                          className="edit_numbers_circle_sweet16"
                          style={mCircleStyles}
                        >
                          21
                        </div>
                        <div className="edit_numbers_circle_sweet16_active" style = {mLockedCircleStyles}>
                          22
                          <img
                            className="img-responsive"
                            src={require("./../../assets/images/747_live/lock.png")}
                          />
                        </div>
                        <div className="edit_numbers_circle_sweet16_active" style = {mLockedCircleStyles}>
                          27
                          <img
                            className="img-responsive"
                            src={require("./../../assets/images/747_live/lock.png")}
                          />
                        </div>
                        <div className="edit_numbers_circle_sweet16" style={mCircleStyles}>17</div>
                        <div className="edit_numbers_circle_sweet16" style={mCircleStyles}>2</div>
                        <div className="edit_numbers_circle_sweet16" style={mCircleStyles}>7</div>
                        <div className="edit_numbers_circle_sweet16" style={mCircleStyles}>7</div>
                        <div className="edit_numbers_circle_sweet16_active" style = {mLockedCircleStyles}>
                        
                          13
                          <img
                            className="img-responsive"
                            src={require("./../../assets/images/747_live/lock.png")}
                          />
                        </div>
                        <div
                          className="edit_numbers_circle_sweet16"
                          style={mCircleStyles}
                        >
                          21
                        </div>
                        <div className="edit_numbers_circle_sweet16_active" style = {mLockedCircleStyles}>
                          22
                          <img
                            className="img-responsive"
                            src={require("./../../assets/images/747_live/lock.png")}
                          />
                        </div>
                        <div className="edit_numbers_circle_sweet16_active" style = {mLockedCircleStyles}>
                          27
                          <img
                            className="img-responsive"
                            src={require("./../../assets/images/747_live/lock.png")}
                          />
                        </div>
                        <div className="edit_numbers_circle_sweet16" style={mCircleStyles}>17</div>
                      </div>
                      <p className="live_draw_my_numbers_matched">
                        Matched <span>0</span> of 7 numbers
                      </p>
                      <p className="live_draw_my_numbers_notes">
                        You havn’t won any prizes so far <br />
                        Keep matching numbers!
                      </p>
                    </div>
                    <div className="mright">
                      <p className="mright_top_text">My Powerplays</p>
                      <div className="mright_powerplays">
                        <div className="mright_powerplays_item">
                          <div className="item_img_wrapper">
                            <img
                              className="img-responsive"
                              src={require("./../../assets/images/747_live/refresh.png")}
                            />
                          </div>
                          <div className="item_right">
                            <p>
                              Refresh All
                              <br />
                              <span>1</span> Left
                            </p>
                          </div>
                        </div>
                        <div className="mright_powerplays_item">
                          <div className="item_img_wrapper">
                            <img
                              className="img-responsive"
                              src={require("./../../assets/images/747_live/shuffle.png")}
                            />
                          </div>
                          <div className="item_right">
                            <p>
                              Change
                              <br />
                              <span>2</span> Left
                            </p>
                          </div>
                        </div>
                        <div className="mright_powerplays_item">
                          <div className="item_img_wrapper">
                            <img
                              className="img-responsive"
                              src={require("./../../assets/images/747_live/force.png")}
                            />
                          </div>
                          <div className="item_right">
                            <p>
                              Power Match
                              <br />
                              <span>2</span> Left
                            </p>
                          </div>
                        </div>
                        <div className="mright_powerplays_item">
                          <div className="item_img_wrapper">
                            <img
                              className="img-responsive"
                              src={require("./../../assets/images/747_live/increase.png")}
                            />
                          </div>
                          <div className="item_right">
                            <p>
                              Increase
                              <br />
                              <span>1</span> Left
                            </p>
                          </div>
                        </div>
                        <div className="mright_powerplays_item">
                          <div className="item_img_wrapper">
                            <img
                              className="img-responsive"
                              src={require("./../../assets/images/747_live/decrease.png")}
                            />
                          </div>
                          <div className="item_right">
                            <p>
                              Decrease
                              <br />
                              <span>1</span> Left
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="sweet16_main_prize">
                  <div class="sweet16_prize_image-wraper">
                    <img
                      className="img-responsive"
                      src={require("./../../assets/images/747/747_prize.png")}
                    />
                  </div>

                  <div className="sweet16_prize_details">
                    <div className="sweet16_prize_content">
                      <div class="sweet16_prize_header row">
                        <div className="row">
                          <span>Prizes</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="sweet16-prize-box-wrapper">
                          <div className="sweet16-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                        <div className="sweet16-prize-box-wrapper">
                          <div className="sweet16-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                        <div className="sweet16-prize-box-wrapper">
                          <div className="sweet16-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                        <div className="sweet16-prize-box-wrapper">
                          <div className="sweet16-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                      </div>

                      <div className="sweet16_prize_note">
                        *All prizes will be divided equally among winners
                      </div>
                    </div>
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

export default withRouter(Sweet16Draw);
