import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './../common/Header'
import Footer from './../common/Footer'
import './index.css'

class Powerplay extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid power_play_step1">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-offset-3 col-sm-6 col-xs-12">
                                <div className="steps-top">
                                    <div className="box1">
                                        <div className="boxes">
                                            Step 1
                  </div>
                                        <p>Formulate Your Team</p>
                                    </div>
                                    <div className="box2">
                                        <div className="boxes">
                                            Step 1
                  </div>
                                        <p>Choose you Team Name</p>
                                    </div>
                                    <div className="dots-top" />
                                </div>
                            </div>
                            <div className="col-md-12 team-player">
                                <h1>My Team Player</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="power-play-top">
                                    <div className="power-play-label">
                                        Filter Your Result
                </div>
                                    <div className="iners">
                                        <div className="checkbox-btn-option">
                                            <input id="center_play" type="checkbox" name="center_play" defaultValue="center_play" />
                                            <label htmlFor="center_play"><span /></label>
                                        </div>
                                        <label>Center Player </label>
                                    </div>
                                    <div className="iners">
                                        <div className="checkbox-btn-option">
                                            <input id="lw_play" type="checkbox" name="lw_play" defaultValue="lw_play" />
                                            <label htmlFor="lw_play"><span /></label>
                                        </div>
                                        <label>LW Player</label>
                                    </div>
                                    <div className="iners">
                                        <div className="checkbox-btn-option">
                                            <input id="rw_play" type="checkbox" name="rw_play" defaultValue="rw_play" />
                                            <label htmlFor="rw_play"><span /></label>
                                        </div>
                                        <label>RW Player </label>
                                    </div>
                                    <div className="iners">
                                        <div className="checkbox-btn-option">
                                            <input id="def_play" type="checkbox" name="def_play" defaultValue="def_play" />
                                            <label htmlFor="def_play"><span /></label>
                                        </div>
                                        <label>Defence </label>
                                    </div>
                                    <div className="iners">
                                        <div className="checkbox-btn-option">
                                            <input id="gol_play" type="checkbox" name="gol_play" defaultValue="gol_play" />
                                            <label htmlFor="gol_play"><span /></label>
                                        </div>
                                        <label>Golie </label>
                                    </div>
                                    <div className="iners">
                                        <div className="checkbox-btn-option">
                                            <input id="star_play" type="checkbox" name="star_play" defaultValue="star_play" />
                                            <label htmlFor="star_play"><span /></label>
                                        </div>
                                        <label>Star Player </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="power-play-main">
                                    <div className="col-md-12">
                                        <div className="top-search">
                                            <input type="text" defaultValue="Search by name" />
                                            <button><span className="fa fa-search" /></button>
                                        </div>
                                    </div>
                                    <div className="clearfix" />
                                    <div className="col-md-4 yel-bord">
                                        <div className="right-games">
                                            <h1>My Team Player</h1>
                                            <div className="iner-box">
                                                <h2>Center (2/2 Players)</h2>
                                                <div className="box">
                                                    <div className="iner-lengt">
                                                        Jonathen Towes<br />
                                                        Jonathen Towes
                        </div>
                                                    <div className="del">
                                                        <span className="fa fa-trash-alt" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iner-box">
                                                <h2>LW (2/2 Players)</h2>
                                                <div className="box">
                                                    <div className="iner-lengt">
                                                        Jonathen Towes<br />
                                                        Jonathen Towes
                        </div>
                                                    <div className="del">
                                                        <span className="fa fa-trash-alt" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iner-box">
                                                <h2>RW (2/2 Players)</h2>
                                                <div className="box">
                                                    <div className="iner-lengt">
                                                        Jonathen Towes<br />
                                                        Jonathen Towes
                        </div>
                                                    <div className="del">
                                                        <span className="fa fa-trash-alt" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iner-box">
                                                <h2>Defence (2/2 Players)</h2>
                                                <div className="box">
                                                    <div className="iner-lengt">
                                                        Jonathen Towes<br />
                                                        Jonathen Towes
                        </div>
                                                    <div className="del">
                                                        <span className="fa fa-trash-alt" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iner-box">
                                                <h2>Golie  (1/1 Players)</h2>
                                                <div className="box">
                                                    <div className="iner-lengt">
                                                        Jonathen Towes<br />
                                                        Jonathen Towes
                        </div>
                                                    <div className="del">
                                                        <span className="fa fa-trash-alt" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="add-btn-power">
                                            <a href="#"><img src={require('./../../assets/images/step/add-button.png')} className="img-responsive" /></a>
                                        </div>
                                        <div className="left-games">
                                            <div className="iner-box">
                                                <div className="col-sm-6 rgh-pow-bord">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left">
                                                                <div className="iner-lengt">
                                                                    Click<br />to<br /> select
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left sel-power">
                                                                <div className="iner-lengt">
                                                                    Selected
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iner-box">
                                                <div className="col-sm-6 rgh-pow-bord">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left">
                                                                <div className="iner-lengt">
                                                                    Click<br />to<br /> select
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left sel-power">
                                                                <div className="iner-lengt">
                                                                    Selected
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iner-box">
                                                <div className="col-sm-6 rgh-pow-bord">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left">
                                                                <div className="iner-lengt">
                                                                    Click<br />to<br /> select
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left sel-power">
                                                                <div className="iner-lengt">
                                                                    Selected
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iner-box">
                                                <div className="col-sm-6 rgh-pow-bord">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left">
                                                                <div className="iner-lengt">
                                                                    Click<br />to<br /> select
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left sel-power">
                                                                <div className="iner-lengt">
                                                                    Selected
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iner-box">
                                                <div className="col-sm-6 rgh-pow-bord">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left">
                                                                <div className="iner-lengt">
                                                                    Click<br />to<br /> select
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left sel-power">
                                                                <div className="iner-lengt">
                                                                    Selected
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iner-box">
                                                <div className="col-sm-6 rgh-pow-bord">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left">
                                                                <div className="iner-lengt">
                                                                    Click<br />to<br /> select
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left sel-power">
                                                                <div className="iner-lengt">
                                                                    Selected
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="iner-box">
                                                <div className="col-sm-6 rgh-pow-bord">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left">
                                                                <div className="iner-lengt">
                                                                    Click<br />to<br /> select
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="box">
                                                        <div className="iner-lengt">
                                                            <div className="left sel-power">
                                                                <div className="iner-lengt">
                                                                    Selected
                              </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="iner-lengt">
                                                                    <span>Jonathen Towes</span><br />
                                                                    Center<br />
                                                                    5g/10a15pts<br />
                                                                    chikago Balkhakws
                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="next-btn">
                                    <a href="step2.html"><button>nEXT</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        );
    }
}

export default withRouter(Powerplay);