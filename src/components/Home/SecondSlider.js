import React, { Component } from 'react';
import './index.css'

class SecondSlider extends Component {
    render() {
        return (
            <div className="container-fluid sports-slider">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Offering promotional contests in the following sports</h1>
                            <p>
                                {/*Mobiel platform voor teamsport en speler statistieken. Rankings, uitslagen aanmaken van wedstrijden en communicatie*/}
                                Choose your favorite sport below to see available contests.
                            </p>
                            <div className="clearfix" />
                            <div className="yelow-line" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="sports-box">
                            <div className="left-arrow sports-left"><img src={require("./../../assets/images/sports-left.png")} className="img-responsive" /></div>
                            <div className="right-arrow sports-right"><img src={require("./../../assets/images/sports-right.png")} className="img-responsive" /></div>
                            <div id="sports-slider">
                                <div className="col-sm-3">
                                    <a onClick={()=>this.props.history.push('select-games/0')}><img src={require("./../../assets/images/baseball-one.png")} className="img-responsive" /></a>
                                </div>
                                <div className="col-sm-3">
                                    <a onClick={()=>this.props.history.push('select-games/1')}><img src={require("./../../assets/images/hockey-one.png")} className="img-responsive" /></a>
                                </div>
                                <div className="col-sm-3">
                                    <a onClick={()=>this.props.history.push('select-games/3')}><img src={require("./../../assets/images/football-one.png")} className="img-responsive" /></a>
                                </div>
                                <div className="col-sm-3">
                                    <a onClick={()=>this.props.history.push('select-games/2')}><img src={require("./../../assets/images/basketball-one.png")} className="img-responsive" /></a>
                                </div>
                                <div className="col-sm-3">
                                    <a onClick={()=>this.props.history.push('select-games/0')}><img src={require("./../../assets/images/baseball-one.png")} className="img-responsive" /></a>
                                </div>
                                <div className="col-sm-3">
                                    <a onClick={()=>this.props.history.push('select-games/1')}><img src={require("./../../assets/images/hockey-one.png")} className="img-responsive" /></a>
                                </div>
                                <div className="col-sm-3">
                                    <a onClick={()=>this.props.history.push('select-games/3')}><img src={require("./../../assets/images/football-one.png")} className="img-responsive" /></a>
                                </div>
                                <div className="col-sm-3">
                                    <a onClick={()=>this.props.history.push('select-games/2')}><img src={require("./../../assets/images/basketball-one.png")} className="img-responsive" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SecondSlider;