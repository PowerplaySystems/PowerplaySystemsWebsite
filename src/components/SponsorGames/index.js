import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../common/Header'
import Footer from '../common/Footer'
import VirtualCardVideos from './VirtualCardVideos'
import './index.css'

class SponsorGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            activeHTP: false,
            activeHTPIndex: 0,
            HTPs: [],
            assocIds: []
        };

    }
    componentDidMount() {
        window.scrollTo(0, 0);
        fetch("https://mypowerplaygames.com/api/select_game/readhow.php?id=1")
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

    }
    onRightArrow() {
        var index = this.state.activeHTPIndex;
        if ((this.state.assocIds.length - 1) == index) {
            index = 0
        } else {
            index++;
        }
        let actHTP = []
        actHTP = (this.state.HTPs.filter(how => how.association_id == (this.state.assocIds[index])))
        this.setState({
            activeHTPIndex: index,
            activeHTP: actHTP
        });
    }
    onLeftArrow() {
        var index = this.state.activeHTPIndex;
        if (index == 0) {
            index = this.state.assocIds.length - 1;
        } else {
            index--;
        }
        let actHTP = []
        actHTP = this.state.HTPs.filter(how => how.association_id == this.state.assocIds[index])
        console.log(actHTP);
        this.setState({
            activeHTPIndex: index,
            activeHTP: actHTP
        });
    }
    setActiveHTP() {

    }
    render() {
        let currentHTP = this.state.activeHTP
        if (currentHTP) {
            return (
                <div>
                    <Header />
                    <div className="container-fluid p-o">
                        <div className="how-to-play-section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">

                                        <div className="page-main-title box_one_ply">
                                            <h5 style={{ "textAlign": "center" }}>Sponsor A Game Prize And see the benefits! More Details Below</h5>
                                        </div>
                                        {
                                            (() => {
                                                if (this.state.activeHTP) {

                                                    return (
                                                        <div className="how-to-play-content">
                                                            <div className="row htp-header">

                                                                <div className="caption box_one_ply">
                                                                    <h3 className="htp-title">BENEFITS</h3>
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
                </div>
            )
        } else {
            return <h1>Loading...</h1>;
        }
    }
}

export default withRouter(SponsorGames);