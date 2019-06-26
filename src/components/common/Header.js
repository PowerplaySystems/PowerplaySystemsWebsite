import React, { Component } from 'react';
import './index.css'
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
class Header extends Component {
    mEmail = "";
    mJwt = "";
    mPlayerID = "";

    constructor(props) {
        super(props);
        var mLogged = false;
        const cookies = new Cookies();
        const jwt = this.mJwt = cookies.get('jwt');
        if (jwt == undefined || jwt == "") {
            mLogged = false;
        } else {
            mLogged = true;
        }
        this.state = {
            error: null,
            isLoaded: false,
            isLogedin: mLogged,
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {


    }
    
    logout() {
        const cookies = new Cookies();
        cookies.set('jwt', '', { path: '/' });
        this.props.history.push('/')
    }
    render() {
        //if user logged IN
        if (this.state.isLogedin) {
            return (
                <div className="container-fluid p-o">
                    <header>
                        <div className="container">
                            <div className="row" style={{ display: 'block', flexWrap: 'unset' }}>
                                <nav className="navbar">
                                    <div className="col-md-2 col-sm-3 col-xs-7">
                                        <div onClick={() => this.props.history.push('/')} className="logo c-p"><a><img src={require("./../../assets/images/logo.png")} className="img-responsive" /></a> </div>
                                    </div>
                                    <div className="col-xs-4 pull-rights" id="burger">
                                        <div className="_burger">
                                            <button type="button" className="navbar-toggle collapsed">
                                                <span className="sr-only">Toggle navigation</span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-10  main_navigation pull-right">
                                        <div className="nav-bar">
                                            <ul className="nav navbar-nav">
                                            <li className="c-p"><a>My Shortcuts</a>
                                                    <ul className="drop-down"> 
                                                        <ul className="c-p"><a onClick={() => this.props.history.push('/select-games')}>Explore Games</a></ul>
                                                        <ul className="c-p"><a onClick={() => this.props.history.push('/game-central')}>Game Center</a></ul>
                                                        {/* <ul className="c-p"><a onClick={() => this.props.history.push('/powerplay-store')}>Power Up</a></ul> */}
                                                    </ul>
                                                </li>
                                               
                                                
                                                <li className="c-p"><a>Platforms</a>
                                                    <ul className="drop-down"> 
                                                        <ul className="c-p"><a onClick={() => this.props.history.push('/powerplay-lotto')}>Powerplay Lotto</a></ul>
                                                        <ul className="c-p"><a onClick={() =>  this.props.history.push('/select-games')}>Powerplay Live Sports</a></ul>
                                                    </ul>
                                                </li>
                                                
                                                <li className="c-p"><a onClick={() => this.props.history.push('/how-to-play')} >How To Play</a></li>
                                                <li className="c-p"><a>Corporate</a>
                                                    <ul className="drop-down"> 
                                                    <ul className="c-p"><a onClick={() => this.props.history.push('/sport-platform')}>Live Sports Platform</a></ul>
                                                    <ul className="c-p"><a onClick={() => this.props.history.push('/sponsor-games')}>Lottery Platform</a></ul>
                                                    </ul>
                                                </li>
                                                <li className="block-btn c-p"> <a onClick={() => this.props.history.push('/my-account')}>My Account</a> &nbsp; | &nbsp; <a onClick={() => this.logout()}>Logout</a> </li>

                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </header>
                </div>
            );
        } else {
            return (
                <div className="container-fluid p-o">
                    <header>
                        <div className="container">
                            <div className="row" style={{ display: 'block', flexWrap: 'unset' }}>
                                <nav className="navbar">
                                    <div className="col-md-2 col-sm-3 col-xs-7">
                                        <div onClick={() => this.props.history.push('/')} className="logo c-p"><a><img src={require("./../../assets/images/logo.png")} className="img-responsive" /></a> </div>
                                    </div>
                                    <div className="col-xs-4 pull-rights" id="burger">
                                        <div className="_burger">
                                            <button type="button" className="navbar-toggle collapsed">
                                                <span className="sr-only">Toggle navigation</span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-10  main_navigation pull-right">
                                        <div className="nav-bar">
                                            <ul className="nav navbar-nav">
                                          
                                                <li className="c-p"><a onClick={() => this.props.history.push('/select-games')}>Explore Games</a></li>
                                                {
                                                    this.state.isLoaded ? <li><a>Powerplays</a></li> : ''
                                                }
                                               <li className="c-p"><a>Platforms</a>
                                                <ul className="drop-down"> 
                                                    <li className="c-p"><a onClick={() =>  this.props.history.push('/powerplay-lotto')}>Powerplay Lotto</a></li>
                                                    <li className="c-p"><a onClick={() =>  this.props.history.push('/select-games')}>Powerplay Live Sports</a></li>
                                                </ul>
                                                </li>
                                                <li className="c-p"><a onClick={() => this.props.history.push('/how-to-play')} >How To Play</a></li>
                                                <li className="c-p"><a>Corporate</a>
                                                    <ul className="drop-down"> 
                                                    <li className="c-p"><a onClick={() => this.props.history.push('/sport-platform')}>Live Sports Platform</a></li>
                                                    <li className="c-p"><a onClick={() => this.props.history.push('/sponsor-games')}>Lottery Platform</a></li>
                                                    </ul>
                                                </li>
                                                <li className="block-btn c-p"> <a onClick={() => this.props.history.push('/login')}>Login</a> &nbsp; | &nbsp; <a onClick={() => this.props.history.push('/register')}>Sign-Up</a> </li>

                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </header>
                </div>
            );
        }

    }
}

export default withRouter(Header);