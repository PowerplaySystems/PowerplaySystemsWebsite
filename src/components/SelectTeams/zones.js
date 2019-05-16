import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './../common/Header'
import Footer from './../common/Footer'
import './index.css'

class Zones extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid game_zones">
                    <div className="container">
                        <div className="row top-area">
                            <div className="col-md-12">
                                <h1>Place <span>1 to 10</span> Teams in the correct Score Zone</h1>
                                <h2>Game Zones</h2>
                            </div>
                            <div className="col-md-12 top-boxes">
                                <div className="cont">
                                    <div className="counter">1</div>
                                    0 - 1
              </div>
                                <div className="cont">
                                    <div className="counter">2</div>
                                    2 - 3
              </div>
                                <div className="cont">
                                    <div className="counter">3</div>
                                    4 - 5
              </div>
                                <div className="cont">
                                    <div className="counter">4</div>
                                    5 - 7
              </div>
                                <div className="cont">
                                    <div className="counter">5</div>
                                    8 - 12
              </div>
                            </div>
                        </div>
                        <div className="game_zones_main">
                            <div className="row game_zones_score">
                                <div className="col-md-6 left_box">
                                    <div className="col-sm-8 boxes-left">
                                        <div className="box-one">
                                            <div className="col-sm-3 zones">
                                                <div className="iner-zones">
                                                    Click to<br className="hidden-xs" /> Select<br className="hidden-xs" /> Zone
                      </div>
                                            </div>
                                            <div className="col-sm-9 zones-det">
                                                <div className="iner-zones">
                                                    <p>
                                                        Toronto  Blue Jays (21 - 8)<br />
                                                        <span className="span1">Starting Pitcher</span><br /><span className="span2">Ryan Boureki – 3.49 ERA</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="col-xs-8 proj-run">
                                                Projected Runs
                    </div>
                                            <div className="col-xs-4 proj-totl">
                                                17
                    </div>
                                        </div>
                                        <div className="box-one">
                                            <div className="col-sm-3 zones">
                                                <div className="iner-zones">
                                                    Click to<br className="hidden-xs" /> Select<br className="hidden-xs" /> Zone
                      </div>
                                            </div>
                                            <div className="col-sm-9 zones-det">
                                                <div className="iner-zones">
                                                    <p>
                                                        New York Yankees (22- 7)<br />
                                                        <span className="span1">Starting Pitcher</span><br /><span className="span2">Ryan Boureki – 3.49 ERA</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="col-xs-8 proj-run">
                                                Projected Runs
                    </div>
                                            <div className="col-xs-4 proj-totl show_me">
                                                Show Me
                    </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 boxes-right">
                                        <div className="iner-zones">
                                            <p>
                                                Location<br />
                                                <span className="span">Nationals Park</span><br /><br />
                                                Start Time <br />
                                                <span className="span">7:05 PM EST </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 right_box">
                                    <div className="col-sm-8 boxes-left">
                                        <div className="box-one">
                                            <div className="col-sm-3 zones zones_box">
                                                <div className="iner-zones">
                                                    Zone 2
                      </div>
                                            </div>
                                            <div className="col-sm-9 zones-det">
                                                <div className="iner-zones">
                                                    <p>
                                                        Toronto  Blue Jays (21 - 8)<br />
                                                        <span className="span1">Starting Pitcher</span><br /><span className="span2">Ryan Boureki – 3.49 ERA</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="col-xs-8 proj-run">
                                                Projected Runs
                    </div>
                                            <div className="col-xs-4 proj-totl">
                                                17
                    </div>
                                        </div>
                                        <div className="box-one">
                                            <div className="col-sm-3 zones">
                                                <div className="iner-zones ">
                                                    Click to<br className="hidden-xs" /> Select<br className="hidden-xs" /> Zone
                      </div>
                                            </div>
                                            <div className="col-sm-9 zones-det">
                                                <div className="iner-zones">
                                                    <p>
                                                        New York Yankees (22- 7)<br />
                                                        <span className="span1">Starting Pitcher</span><br /><span className="span2">Ryan Boureki – 3.49 ERA</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="col-xs-8 proj-run">
                                                Projected Runs
                    </div>
                                            <div className="col-xs-4 proj-totl show_me">
                                                Show Me
                    </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 boxes-right">
                                        <div className="iner-zones">
                                            <p>
                                                Location<br />
                                                <span className="span">Nationals Park</span><br /><br />
                                                Start Time <br />
                                                <span className="span">7:05 PM EST </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row game_zones_score">
                                <div className="col-md-6 left_box">
                                    <div className="col-sm-8 boxes-left">
                                        <div className="box-one">
                                            <div className="col-sm-3 zones profrs_zone">
                                                <div className="iner-zones">
                                                    Game in<br className="hidden-xs" /> Progress
                      </div>
                                            </div>
                                            <div className="col-sm-9 zones-det">
                                                <div className="iner-zones">
                                                    <p>
                                                        Toronto  Blue Jays (21 - 8)<br />
                                                        <span className="span1">Starting Pitcher</span><br /><span className="span2">Ryan Boureki – 3.49 ERA</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="col-xs-8 proj-run">
                                                Projected Runs
                    </div>
                                            <div className="col-xs-4 proj-totl">
                                                17
                    </div>
                                        </div>
                                        <div className="box-one">
                                            <div className="col-sm-3 zones profrs_zone">
                                                <div className="iner-zones">
                                                    Game in<br className="hidden-xs" /> Progress
                      </div>
                                            </div>
                                            <div className="col-sm-9 zones-det">
                                                <div className="iner-zones">
                                                    <p>
                                                        New York Yankees (22- 7)<br />
                                                        <span className="span1">Starting Pitcher</span><br /><span className="span2">Ryan Boureki – 3.49 ERA</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="col-xs-8 proj-run">
                                                Projected Runs
                    </div>
                                            <div className="col-xs-4 proj-totl show_me">
                                                Show Me
                    </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 boxes-right">
                                        <div className="iner-zones">
                                            <p>
                                                Location<br />
                                                <span className="span">Nationals Park</span><br /><br />
                                                Start Time <br />
                                                <span className="span">7:05 PM EST </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 right_box">
                                    <div className="col-sm-8 boxes-left">
                                        <div className="box-one">
                                            <div className="col-sm-3 zones zones_box">
                                                <div className="iner-zones">
                                                    Zone 2
                      </div>
                                            </div>
                                            <div className="col-sm-9 zones-det">
                                                <div className="iner-zones">
                                                    <p>
                                                        Toronto  Blue Jays (21 - 8)<br />
                                                        <span className="span1">Starting Pitcher</span><br /><span className="span2">Ryan Boureki – 3.49 ERA</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="col-xs-8 proj-run">
                                                Projected Runs
                    </div>
                                            <div className="col-xs-4 proj-totl">
                                                17
                    </div>
                                        </div>
                                        <div className="box-one">
                                            <div className="col-sm-3 zones zones_box">
                                                <div className="iner-zones ">
                                                    Selected
                      </div>
                                            </div>
                                            <div className="col-sm-9 zones-det">
                                                <div className="iner-zones">
                                                    <p>
                                                        New York Yankees (22- 7)<br />
                                                        <span className="span1">Starting Pitcher</span><br /><span className="span2">Ryan Boureki – 3.49 ERA</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="col-xs-8 proj-run">
                                                Projected Runs
                    </div>
                                            <div className="col-xs-4 proj-totl show_me">
                                                Show Me
                    </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 boxes-right">
                                        <div className="iner-zones">
                                            <p>
                                                Location<br />
                                                <span className="span">Nationals Park</span><br /><br />
                                                Start Time <br />
                                                <span className="span">7:05 PM EST </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row game_zones_score">
                                <div className="col-md-6 left_box">
                                    <div className="col-sm-8 boxes-left">
                                        <div className="box-one">
                                            <div className="col-sm-3 zones">
                                                <div className="iner-zones">
                                                    Click to<br className="hidden-xs" /> Select<br className="hidden-xs" /> Zone
                      </div>
                                            </div>
                                            <div className="col-sm-9 zones-det">
                                                <div className="iner-zones">
                                                    <p>
                                                        Toronto  Blue Jays (21 - 8)<br />
                                                        <span className="span1">Starting Pitcher</span><br /><span className="span2">Ryan Boureki – 3.49 ERA</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="col-xs-8 proj-run">
                                                Projected Runs
                    </div>
                                            <div className="col-xs-4 proj-totl">
                                                17
                    </div>
                                        </div>
                                        <div className="box-one">
                                            <div className="col-sm-3 zones">
                                                <div className="iner-zones">
                                                    Click to<br className="hidden-xs" /> Select<br className="hidden-xs" /> Zone
                      </div>
                                            </div>
                                            <div className="col-sm-9 zones-det">
                                                <div className="iner-zones">
                                                    <p>
                                                        New York Yankees (22- 7)<br />
                                                        <span className="span1">Starting Pitcher</span><br /><span className="span2">Ryan Boureki – 3.49 ERA</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="col-xs-8 proj-run">
                                                Projected Runs
                    </div>
                                            <div className="col-xs-4 proj-totl show_me">
                                                Show Me
                    </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 boxes-right">
                                        <div className="iner-zones">
                                            <p>
                                                Location<br />
                                                <span className="span">Nationals Park</span><br /><br />
                                                Start Time <br />
                                                <span className="span">7:05 PM EST </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 right_box">
                                    <div className="col-sm-8 boxes-left">
                                        <div className="box-one">
                                            <div className="col-sm-3 zones">
                                                <div className="iner-zones">
                                                    Click to<br className="hidden-xs" /> Select<br className="hidden-xs" /> Zone
                      </div>
                                            </div>
                                            <div className="col-sm-9 zones-det">
                                                <div className="iner-zones">
                                                    <p>
                                                        Toronto  Blue Jays (21 - 8)<br />
                                                        <span className="span1">Starting Pitcher</span><br /><span className="span2">Ryan Boureki – 3.49 ERA</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="col-xs-8 proj-run">
                                                Projected Runs
                    </div>
                                            <div className="col-xs-4 proj-totl">
                                                17
                    </div>
                                        </div>
                                        <div className="box-one">
                                            <div className="col-sm-3 zones">
                                                <div className="iner-zones">
                                                    Click to<br className="hidden-xs" /> Select<br className="hidden-xs" /> Zone
                      </div>
                                            </div>
                                            <div className="col-sm-9 zones-det">
                                                <div className="iner-zones">
                                                    <p>
                                                        New York Yankees (22- 7)<br />
                                                        <span className="span1">Starting Pitcher</span><br /><span className="span2">Ryan Boureki – 3.49 ERA</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="clearfix" />
                                            <div className="col-xs-8 proj-run">
                                                Projected Runs
                    </div>
                                            <div className="col-xs-4 proj-totl show_me">
                                                Show Me
                    </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 boxes-right">
                                        <div className="iner-zones">
                                            <p>
                                                Location<br />
                                                <span className="span">Nationals Park</span><br /><br />
                                                Start Time <br />
                                                <span className="span">7:05 PM EST </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9 col-sm-8">
                                <a href="#"><button className="btn_one_zones">Projected Run Total</button></a>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <a href="#"><button className="btn_two_zones">Show me</button></a>
                            </div>
                        </div>
                        <div className="row gamzone_price">
                            <div className="col-md-12">
                                <h2><span className="fa fa-info-circle infobtn" /> You will win $100 if your teams score 21 runs</h2>
                            </div>
                        </div>
                        <div className="row game_zone_sub">
                            <div className="col-sm-12">
                                <a href="#"><button>Submit My Picks</button></a>
                            </div>
                        </div>
                        <div className="row game_zone_btn">
                            <div className="col-sm-6">
                                <a href="#"><button>View Prize Grid</button></a>
                            </div>
                            <div className="col-sm-6">
                                <a href="#"><button>Game Rules</button></a>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        );
    }
}

export default withRouter(Zones);