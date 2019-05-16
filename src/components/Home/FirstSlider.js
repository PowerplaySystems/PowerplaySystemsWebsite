import React, { Component } from 'react';
import './index.css'
import { withRouter } from 'react-router-dom';
class FirstSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            sliderImages: []
        };
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        fetch("https://mypowerplaygames.com/api/images/read.php?type=home")
            .then(res => res.json())
            .then((xx) => {
                console.log(xx.records)
                this.setState({
                    sliderImages: xx.records
                });
            },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )

    }
    render() {
        return (
            <div className="container-fluid main-top-slider">
                <div className="left-arrow main-left"><img src={require("./../../assets/images/swap/main-prev.png")} className="img-responsive" /></div>
                <div className="right-arrow main-right"><img src={require("./../../assets/images/swap/main-next.png")} className="img-responsive" /></div>
                <div id="main-slider">
                    <div className="col-md-12 p-o">
                        <div className="slide-one" style={{ background: `url(${require('./../../assets/images/slide1new.png')})` }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1>Power Up!</h1>
                                        <p>
                                            For An Exciting New Contests Experience<br />
                                            <span className="span1">NO PURCHASE NECESSARY</span>
                                        </p>
                                        <a onClick={() => this.props.history.push('/register')}>Sign Up</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 p-o">
                        <div className="slide-two" style={{ background: `url(${require('./../../assets/images/slide2.png')})` }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1>How to play</h1>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="box1">
                                            <div className="boxes-iner">
                                                <div className="iner-main">
                                                    <div className="counter">1</div>
                                                    <h2>
                                                    &nbsp; &nbsp; Enter<br /><span> &nbsp; &nbsp;Contests</span>
                                                    </h2>
                                                </div>
                                            </div>
                                            <p>
                                                Explore Contest games on <br />the <span  onClick={() => this.props.history.push('/select-games')}>Explore Games</span> page
                                            </p>
                                        </div>
                                        <div className="box1">
                                            <div className="boxes-iner">
                                                <div className="iner-main">
                                                    <div className="counter">2</div>
                                                    <h2>
                                                        Pick<br /><span>teams</span>
                                                    </h2>
                                                </div>
                                            </div>
                                            <p>
                                                Pick your teams on the<br /><span>Team Selection</span> page.
                                            </p>
                                        </div>
                                        <div className="box3">
                                            <div className="boxes-iner">
                                                <div className="iner-main">
                                                    <div className="counter">3</div>
                                                    <h2>
                                                        Manipulate LiveScores using<br /><span>powerplays</span>
                                                    </h2>
                                                </div>
                                            </div>
                                            <p>Use Powerplays to change your score on the <span>Live Score</span> page.
                                            </p></div>
                                        <div className="box4">
                                            <div className="boxes-iner">
                                                <div className="iner-main">
                                                    <div className="counter">4</div>
                                                    <h2>
                                                        <span>Win</span>
                                                    </h2>
                                                </div>
                                            </div>
                                            <p>
                                                See prize details on the <span> Explore Games </span> page.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 p-o">
                        <div className="slide-three" style={{ background: `url(${require('./../../assets/images/slide3.png')})` }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="slide-three-left">
                                            <h1>Not happy with how your teams are performing?</h1>
                                            <h2>
                                                Use <span>PowerPlays</span> to change the score<br /><span>You have the power</span>
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="slide-three-right">
                                            <h2>Live Score Actions Available</h2>
                                            <div className="list-item">
                                                <ul>

                                                    <li>
                                                        <span className="icons-left"><img src={require("./../../assets/images/livescore/referesh.png")} className="img-responsive" /></span>
                                                        Swap 1 for 11
                                                        </li>
                                                    <li>
                                                        <span className="icons-left"><img src={require("./../../assets/images/livescore/lock.png")} className="img-responsive" /></span>
                                                        Lock Score
                                                        </li>
                                                    <li>
                                                        <span className="icons-left"><img src={require("./../../assets/images/livescore/bust.png")} className="img-responsive" /></span>
                                                        Increase score
                                                        </li>
                                                    <li>
                                                        <span className="icons-left"><img src={require("./../../assets/images/livescore/super-bust.png")} className="img-responsive" /></span>
                                                        Decrease score
                                                        </li>
                                                    <li>
                                                        <span className="icons-left"><img src={require("./../../assets/images/livescore/drop.png")} className="img-responsive" /></span>
                                                        Drop Teams
                                                        </li>
                                                    <li>
                                                        <span className="icons-left"><img src={require("./../../assets/images/livescore/add.png")} className="img-responsive" /></span>
                                                        Add Team
                                                        </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 p-o">
                        <div className="slide-foure" style={{ background: `url(${require('./../../assets/images/slide4.png')})` }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1>Try one of our exciting contests today </h1>
                                    </div>
                                </div>
                                <div className="row list-item">
                                    {
                                        this.state.sliderImages.map((img, key) => {
                                            return (
                                                <div className="col-xs-3" style={{"marginBottom":"20px"}}>
                                                    <img src={"https://mypowerplaygames.com/api/images/readimage.php?id=" + img.id} className="img-responsive" />
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(FirstSlider);