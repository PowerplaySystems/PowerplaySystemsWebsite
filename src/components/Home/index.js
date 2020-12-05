import React, { Component } from "react";
import "./index.scss";
import Header from "./../common/Header";
import { Link } from "react-router-dom";
import img1 from '../../assets/images/home/bitmap-2.png';

class Home extends Component {
  render() {
    return (
      <div className='__home-page'>
        <Header />
        <div className='__viewport __flex'>
          <div className='__container __flex'>
            <div className='__title'>Powering Innovative Gaming Solutions</div>
            <div className='__subtitle'>
              Driving disruptive change across the lottery, <br />
              fantasy sports, and sports betting landscape
            </div>
            <Link to='/' className='__homepage-btn'>Partner with us!</Link>
          </div>
        </div>

        <div className='__content __content-1'>
          <div className='__container'>
            <div className='__main __right'>
              <div>PowerPlay Systems provides patent-pending gaming solutions that changes the way the world plays lottery, DFS, and Sports betting games.  With our exclusive live-play experience, we put the <span className='__primary'>Players in control.</span></div>
              <div>Say goodbye to the 'pick-and-wait' game format. No longer will games be played simply by making picks and waiting for results. With our games, players have the power to control their own destiny by <span className='__primary'>making live-play changes.</span></div>
              <div className='__subtitle __primary'>Now that is Powerful!</div>
            </div>
            <Link to='/' className='__homepage-btn'>Partner with us!</Link>
            <img src={img1} alt='' className='__background' />
          </div>
        </div>

        <div className='__content __content-2'>
          <div className='__primary __title'>Powerful Live-game engagement</div>
          <div className='__container'>
            <div className='__main'>
              <div>We provide players with <span className='__primary'>Powers</span> to make changes to their lottery picks, fantasy sports picks, and bet slips during live gameplay.</div>
              <div>If a fantasy pick is injured early in a game, players can swap him out in real-time!</div>
              <div>There are different Powers for each type of game but all Powers add another level of engagement and excitement to gameplay.</div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;
