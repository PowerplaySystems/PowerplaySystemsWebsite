import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './../common/Header'
import Footer from './../common/Footer'
import $ from 'jquery';
import 'slick-carousel';
// import { connect } from 'react-redux';
import ChangeGameSlider from './ChangeGameSlider'
import BaseBallGames from './BaseBallGames'
import HockeyGames from './HockeyGames'
import BasketballGames from './BasketballGames'
import FootballGames from './FootballGames'

class SelectGames extends Component {

    componentDidMount() {
        /*****Select Games ****/
        $('.game_rules_tables th').click(function (e) {
            $('.game_rules_tables th').not(this).removeClass('active_rules');
            $(this).addClass('active_rules');
        });



        // when user want to get specific game by url params
        let id = this.props.match.params.id
        if (id && id > -1) {
            $('.slick-slider').slick('slickGoTo', id, true);
        }
    }
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            activeTab: 0

        };


    }
    onTabClicked(index) {
        this.setState({
            activeTab: index
        })
    }
    render() {
        return (
            <div>
                <Header />
                <div>
                    <div className="container-fluid select-game-slider">
                        <div className="col-md-12 p-o">
                            <div id="game-top-slider">
                                {
                                    (() => {

                                        if (this.state.activeTab == 0) {
                                            return (
                                                <img src={require("./../../assets/images/hockey.png")} className="img-responsive" />

                                            )
                                        }
                                        if (this.state.activeTab == 1) {
                                            return (
                                                <img src={require("./../../assets/images/footbal.png")} className="img-responsive" />
                                            )
                                        }
                                        if (this.state.activeTab == 2) {
                                            return (
                                                <img src={require("./../../assets/images/basket.png")} className="img-responsive" />
                                            )
                                        }
                                        if (this.state.activeTab == 3) {
                                            return (
                                                <img src={require("./../../assets/images/baseball.png")} className="img-responsive" />
                                            )
                                        }
                                    })()
                                }




                            </div>
                            <div className="tab-nav">
                                <div onClick={() => this.onTabClicked(0)} className={this.state.activeTab == 0 ? "col-md-3 sport-tab tab-active" : "col-md-3 sport-tab "}>
                                    <span>
                                        HOCKEY
                                    </span>
                                </div>
                                <div onClick={() => this.onTabClicked(1)} className={this.state.activeTab == 1 ? "col-md-3 sport-tab tab-active" : "col-md-3 sport-tab "}>
                                    <span>
                                        FOOTBALL
                                    </span>
                                </div>
                                <div onClick={() => this.onTabClicked(2)} className={this.state.activeTab == 2 ? "col-md-3 sport-tab tab-active" : "col-md-3 sport-tab "}>
                                    <span>
                                        BASKETBALL
                                    </span>
                                </div>
                                <div onClick={() => this.onTabClicked(3)} className={this.state.activeTab == 3 ? "col-md-3 sport-tab tab-active" : "col-md-3 sport-tab "}>
                                    <span>
                                        BASEBALL
                                    </span>
                                </div>


                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="container-fluid">
                    <div className="slider-for">
                        {
                            (() => {

                                if (this.state.activeTab == 0) {
                                    return (
                                        <HockeyGames />

                                    )
                                }
                                if (this.state.activeTab == 1) {
                                    return (
                                        <FootballGames />
                                    )
                                }
                                if (this.state.activeTab == 2) {
                                    return (
                                        <BasketballGames />
                                    )
                                }
                                if (this.state.activeTab == 3) {
                                    return (
                                        <BaseBallGames />
                                    )
                                }
                            })()
                        }
                     
                       
                      
                       
                    </div>
                </div >
                <Footer />
            </div>
        );
    }
}

export default withRouter(SelectGames);