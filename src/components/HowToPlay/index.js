import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './../common/Header'
import Footer from './../common/Footer'
import * as Constants from "./../common/constants";
import VirtualCardVideos from './VirtualCardVideos'
import './index.css'

class HowToPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            activeHTP: false,
            activeHTPIndex: 0,
            HTPs: [],
            assocIds: [],
            promoImages: [],
            activePromo: false,
            activePromoIndex: 0,

        };

    }
    componentDidMount() {
        window.scrollTo(0, 0);
        fetch("https://" + Constants.URL + "/api/select_game/read_all_how_to.php")
            .then(res => res.json())
            .then((xx) => {
                let results = xx.records;
                let ids = [];
                results.forEach(element => {
                    if (ids.indexOf(element.association_id) == -1)
                        ids.push(element.association_id)
                })
                let actHTP = []
                actHTP = results.filter(how => how.association_id == ids[0])
                console.log(actHTP);
                this.setState({
                    HTPs: results,
                    assocIds: ids,
                    activeHTPIndex: 0,
                    activeHTP: actHTP
                });
            },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )
            fetch("https://" + Constants.URL + "/api/images/read.php?type=promo")
            .then(res => res.json())
            .then((xx) => {
                this.setState({
                    promoImages: xx.records,
                    activePromo: xx.records[0],
                });
            },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )

    }
    onRightArrow() {
        var index = this.state.activePromoIndex;
        if ((this.state.promoImages.length - 1) == index) {
            index = 0
        } else {
            index++;
        }
        this.setState({
            activePromoIndex: index,
            activePromo: this.state.promoImages[index]
        });
    }
    onLeftArrow() {
        var index = this.state.activePromoIndex;
        if (index == 0) {
            index = this.state.promoImages.length - 1;
        } else {
            index--;
        }
        this.setState({
            activePromoIndex: index,
            activePromo: this.state.promoImages[index]
        });
    }

    render() {
        let currentHTP = this.state.activeHTP
        let currentPromo = this.state.activePromo
        if (currentPromo) {
            return (
                <div>
                    <Header />
                    <div className="container-fluid p-o">
                        <div className="how-to-play-section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row htp-header-wraper">
                                            <div className="pro-arrow-wraper game-arrow-left">
                                                <a onClick={() => this.onLeftArrow("r")} ><img src={require("./../../assets/images/swap/main-prev.png")} className="game-arrow img-responsive" /></a>
                                            </div>
                                            <div className="caption box_one_ply pro-img">
                                            <img src={"https://" + Constants.URL + "/api/images/readimage.php?id=" + currentPromo.id} className="htp-title-img img-responsive" />
                                            </div>
                                            <div className="pro-arrow-wraper game-arrow-right">
                                                <a onClick={() => this.onRightArrow("r")}><img src={require("./../../assets/images/swap/main-next.png")} className="game-arrow img-responsive" /></a>
                                            </div>
                                        </div>
                                      

                                    <div className="page-main-title box_one_ply">
                                            <h5>In the game of Baseball Blackjack, the objective is to pick between one and ten
                                              teams whose combined scores will total 21. You will be awarded points based
                                              on the values in the Points Grid. Just like in the card game of blackjack,
                                        if your teams score more than 21 runs, you will bust!</h5>
                                        </div>
                                        {
                                            (() => {
                                                if (this.state.activeHTP) {

                                                    return (
                                                        <div className="how-to-play-content">
                                                            <div className="row htp-header">

                                                                <div className="caption box_one_ply">
                                                                    <h3 className="htp-title">HOW TO PLAY</h3>
                                                                </div>

                                                            </div>

                                                            <div className="htp-inner-content">
                                                                <div className="counting-block-section">
                                                                    <div className="counter-block box_one_ply">
                                                                        <h3>1</h3>
                                                                    </div>
                                                                </div>
                                                                <div className="htp-text-section">
                                                                    <h5 className="box_one_ply">{currentHTP[0].header}</h5>
                                                                    <p className="color-white">{currentHTP[0].step_text.replace(/<(?:.|\n)*?>/gm, '')}</p>
                                                                </div>
                                                            </div>
                                                            <div className="htp-inner-content right-side-section">
                                                                <div className="counting-block-section">
                                                                    <div className="counter-block">
                                                                        <h3 className="box_one_ply">2</h3>
                                                                    </div>
                                                                </div>
                                                                <div className="htp-text-section">
                                                                    <h5 className="box_one_ply">{currentHTP[1].header}</h5>
                                                                    <p className="color-white">{currentHTP[1].step_text.replace(/<(?:.|\n)*?>/gm, '')}</p>
                                                                </div>
                                                            </div>
                                                            <div className="htp-inner-content">
                                                                <div className="counting-block-section">
                                                                    <div className="counter-block box_one_ply">
                                                                        <h3>3</h3>
                                                                    </div>
                                                                </div>
                                                                <div className="htp-text-section">
                                                                    <h5 className="box_one_ply">{currentHTP[2].header}</h5>
                                                                    <p className="color-white">{currentHTP[2].step_text.replace(/<(?:.|\n)*?>/gm, '')}</p>
                                                                </div>
                                                            </div>
                                                            <div className="htp-inner-content right-side-section">
                                                                <div className="counting-block-section">
                                                                    <div className="counter-block box_one_ply">
                                                                        <h3>4</h3>
                                                                    </div>
                                                                </div>
                                                                <div className="htp-text-section">
                                                                    <h5 className="box_one_ply">{currentHTP[3].header}</h5>
                                                                    <p className="color-white">{currentHTP[3].step_text.replace(/<(?:.|\n)*?>/gm, '')}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })()
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                        <VirtualCardVideos />
                    </div>
                    <Footer />
                </div >
            )
        } else {
            return <h1>Loading...</h1>;
        }
    }
}

export default withRouter(HowToPlay);