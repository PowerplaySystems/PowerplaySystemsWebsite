import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";

class Page747 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      content: ""
    };
  }
  componentDidMount() {
    window.scroll(0,0);
    var buttons = document.getElementsByClassName("page747_selection_button");
    for (var x = 0; x < buttons.length; x++) {
      buttons[x].addEventListener("click",function(e){
        console.log(e);
       var mTarget = e.target;
       mTarget.classList.toggle("btn-active");
      });
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid _faq_wrap">
          <div className="container">
            <div className="row page747_rows">
              <div className="col-md-12">
                <img
                  className="img-responsive"
                  src={require("./../../assets/images/747/747_header.png")}
                />
              </div>
              <div className="col-md-12">
                <div className="page747_main_bar row">
                  <div className="col-md-6">
                    <div class="main_bar_inner">
                      <div>
                        <p>Jackpot</p>
                        <p className = "main_bar_inner_bigger">$100,000</p>
                      </div>
                      <div className="page747_main_left_lower_text">
                        Draw date <s>June 5th, 2019 , 8:00 pm EST</s>
                      </div>
                    </div>
                     
                  </div>
                  <div className="col-md-6">
                    <div class="page747_main_draw_box">
                      <div>
                        <p>Next draw starts in</p>
                        <div className="row page747_main_draw_inner">
                          <div>
                            <p>1</p>
                            Days
                          </div>
                          <div>
                            <p>14</p>
                            hours
                          </div>
                          <div>
                            <p>23</p>
                            Mints
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="page747_main_lower_text">
                      Draw date <s>June 5th, 2019 , 8:00 pm EST</s>
                    </div>
                  </div>
                </div>
                <center class="main_bar_button">
                  <button>Pick Your Numbers Now!</button>
                </center>
              </div>

              <div className="col-md-12">
                <div className="page747_main_prize">
                  <div class="page747_prize_image-wraper">
                    <img
                      className="img-responsive"
                      src={require("./../../assets/images/747/747_prize.png")}
                    />
                  </div>

                  <div className="page747_prize_details">
                    <div className="page747_prize_content">
                      <div class="page747_prize_header row">
                        <div className="row">
                          <span>Prizes</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="page747-prize-box-wrapper">
                          <div className="page747-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                        <div className="page747-prize-box-wrapper">
                          <div className="page747-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                        <div className="page747-prize-box-wrapper">
                          <div className="page747-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                        <div className="page747-prize-box-wrapper">
                          <div className="page747-prize-box">
                            3 Number of 7 <br />
                            <span>$10</span>
                          </div>
                        </div>
                      </div>

                      <div className="page747_prize_note">
                        *All prizes will be divided equally among winners
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="page747_main_power">
                  <div class="page747_power_image-wraper">
                    <img
                      className="img-responsive"
                      src={require("./../../assets/images/747/747_powerplays.png")}
                    />
                  </div>
                  <div className="page747_power_details">
                    <div className="page747_power_heading">Powerplays</div>
                    <div className="page747_power_content">
                    <div className="col-md-6 power_content_box">
                        <div className="col-md-4 power_content_box_left">
                          <div className="power_content_box_left_image_wrapper">
                            <img
                              className="img-responsive power_content_box_left_image"
                              src={require("./../../assets/images/747/747_2.png")}
                            />
                          </div>
                          <div className="power_content_box_left_text">
                            Increase/Decrease
                          </div>
                        </div>
                        <div className="col-md-6 power_content_box_right">
                          <span>
                            You can increase or decrease your pick live during
                            the draw
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6 power_content_box">
                        <div className="col-md-4 power_content_box_left">
                          <div className="power_content_box_left_image_wrapper">
                            <img
                              className="img-responsive power_content_box_left_image"
                              src={require("./../../assets/images/747/747_3.png")}
                            />
                          </div>
                          <div className="power_content_box_left_text">
                            Power Match
                          </div>
                        </div>
                        <div className="col-md-6 power_content_box_right">
                          <span>
                            Use force match to change your pick to match the
                            drawn #
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6 power_content_box">
                        <div className="col-md-4 power_content_box_left">
                          <div className="power_content_box_left_image_wrapper">
                            <img
                              className="img-responsive power_content_box_left_image"
                              src={require("./../../assets/images/lotto/shuffle.png")}
                            />
                          </div>
                          <div className="power_content_box_left_text">
                            Change
                          </div>
                        </div>
                        <div className="col-md-6 power_content_box_right">
                          <span>
                          Use change to replace one # with a random new Number
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6 power_content_box">
                        <div className="col-md-4 power_content_box_left">
                          <div className="power_content_box_left_image_wrapper">
                            <img
                              className="img-responsive power_content_box_left_image"
                              src={require("./../../assets/images/747/747_1.png")}
                            />
                          </div>
                          <div className="power_content_box_left_text">
                            Refresh All
                          </div>
                        </div>
                        <div className="col-md-6 power_content_box_right">
                          <span>
                            Use refresh all to refresh all your numbers with a
                            random new set.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="page747_number_header">
                  <span>Pick Your Numbers!</span>
                </div>

                <div className="col-md-12">
                  <div className = "page747_number_rules">
                    CONTEST RULES
                  </div>
                  <div class="page747_number_box">
                    <div>
                      <p>Till Next Draw</p>
                      <div className="row page747_next_draw_box">
                        <div>
                          <p>1</p>
                          Days
                        </div>
                        <div>
                          <p>14</p>
                          hours
                        </div>
                        <div>
                          <p>23</p>
                          Mints
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="page747_selection_box">
                    <div className="page747_selection_button">1</div>
                    <div className="page747_selection_button">2</div>
                    <div className="page747_selection_button">3</div>
                    <div className="page747_selection_button">4</div>
                    <div className="page747_selection_button">15</div>
                    <div className="page747_selection_button">6</div>
                    <div className="page747_selection_button">1</div>
                    <div className="page747_selection_button">2</div>
                    <div className="page747_selection_button">3</div>
                    <div className="page747_selection_button">4</div>
                    <div className="page747_selection_button">5</div>
                    <div className="page747_selection_button">6</div>
                    <div className="page747_selection_button">1</div>
                    <div className="page747_selection_button">2</div>
                    <div className="page747_selection_button">3</div>
                    <div className="page747_selection_button">4</div>
                    <div className="page747_selection_button">5</div>
                    <div className="page747_selection_button">6</div>
                    <div className="page747_selection_button">1</div>
                    <div className="page747_selection_button">2</div>
                    <div className="page747_selection_button">3</div>
                    <div className="page747_selection_button">4</div>
                    <div className="page747_selection_button">5</div>
                    <div className="page747_selection_button">6</div>
                    <div className="page747_selection_button">1</div>
                    <div className="page747_selection_button">2</div>
                    <div className="page747_selection_button">3</div>
                    <div className="page747_selection_button">4</div>
                    <div className="page747_selection_button">5</div>
                    <div className="page747_selection_button">6</div>
                    <div className="page747_selection_button">1</div>
                    <div className="page747_selection_button">2</div>
                    <div className="page747_selection_button">3</div>
                    <div className="page747_selection_button">4</div>
                    <div className="page747_selection_button">5</div>
                    <div className="page747_selection_button">6</div>
                    <div className="page747_selection_button">1</div>
                    <div className="page747_selection_button">2</div>
                    <div className="page747_selection_button">3</div>
                    <div className="page747_selection_button">4</div>
                    <div className="page747_selection_button">5</div>
                    <div className="page747_selection_button">6</div>
                    <div className="page747_selection_button">1</div>
                    <div className="page747_selection_button">2</div>
                    <div className="page747_selection_button">3</div>
                    <div className="page747_selection_button">4</div>
                    <div className="page747_selection_button">5</div>
                    <div className="page747_selection_button">6</div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="page747_selection_box_submit">SUBMIT!</div>
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

export default withRouter(Page747);
