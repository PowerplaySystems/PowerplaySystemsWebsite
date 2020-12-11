import React, { Component } from "react";
import "./index.scss";
import Header from "./../common/Header";
import { Link } from "react-router-dom";
import genrlogo from '../../assets/images/home/genr-8-logo@2x.png';
import Footer from "../common/Footer";
import logo from '../../assets/images/logo.png'

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
          <div className='__wrapper'>
            <div className='__container'>
              <div className='__main __right'>
                <div>PowerPlay Systems provides patent-pending gaming solutions that changes the way the world plays lottery, DFS, and Sports betting games.  <span className='__hide-on-mediam'>With our exclusive live-play experience,</span> we put the <span className='__primary'>Players in control.</span></div>
                <div>Say goodbye to the 'pick-and-wait' game format. <span className='__hide-on-mediam'>No longer will games be played simply by making picks and waiting for results. With our games,</span> players have the power to control their own destiny by <span className='__primary'>making live-play changes.</span></div>
                <div className='__subtitle __primary'>Now that is Powerful!</div>
              </div>
              <Link to='/' className='__homepage-btn'>Partner with us!</Link>
            </div>
          </div>
        </div>

        <div className='__content __content-2'>
          <div className='__wrapper'>
            <div className='__container'>
              <div className='__primary __title'>Powerful Live-game engagement</div>
              <div className='__main'>
                <div>We provide players with <span className='__primary'>Powers</span> to make changes <span className='__hide-on-mediam'>to their lottery picks, fantasy sports picks, and bet slips</span> during live gameplay.</div>
                <div>If a fantasy pick is injured early in a game, players can swap him out in real-time!</div>
                <div><span className='__hide-on-mediam'>There are different Powers for each type of game but all</span> Powers add another level of engagement and excitement to gameplay.</div>
              </div>
            </div>
          </div>
        </div>

        <div className='__content __content-3'>
          <div className='__wrapper'>
            <div className='__container'>
              <div className='__title __primary'>Powerful Revenue</div>
              <div className='__main'>
                <div>With Live-Play gaming, you will open up a whole new revenue stream by driving players to your game during live lottery or sporting events. <span className='__hide-on-mediam'>With more players interacting with your live games, you can generate additional sponsorship and advertising revenue.</span></div>
                <div className='__hide-on-mediam'>Live-play Powers are valuable to players! You can sell branded game Powers to <span className='__primary'>generate additional revenue</span> during live gameplay.</div>
                <div><span className='__hide-on-mediam'>Whether you are a casino, state-run gaming operator, media or retail business, or a charity operation...</span> our live-play game options will power exciting new revenue streams.</div>
              </div>
            </div>
          </div>
        </div>

        <div className='__content __content-4'>
          <div className='__wrapper'>
            <div className='__container'>
              <div className='__title __primary'>Powerful Odds Management</div>
              <div className='__main'>
                <div>With Live-Play Powers, you can control the odds for every game at every level providing unparalleled flexibility.</div>
                <div>You can decide how many winners there will be and how often they win. You can make it super easy or very difficult to win prizes/jackpots.</div>
                <div>With our solution, you control the odds.</div>
              </div>
            </div>
          </div>
        </div>

        <div className='__content __powerfulgame-options'>
          <div className='__wrapper'>
            <div className='__container'>

              <div className='__title __primary'>Powerful Game Options</div>
              <div className='__title-wrapper'><div className='__subtitle __primary'>Live-Play Lottery Games</div></div>
              <div className='__main __left'>
                <div className='__li'>
                  <div><span className='__primary'>Live-play Lottery and Bingo games</span> - <span className='__hide-on-mediam'>Players can change their picks during the live draw! </span> We guarantee this is the most exciting lottery game you will ever play.</div>
                </div>
                <div className='__li'>
                  <div>Play our <span className='__primary'>«747»</span>  demo lottery game now.</div>
                </div>
              </div>
              <div className='__btn-wrapper'><Link to='/' className='__outine-btn'>Play 747 Demo Lottery</Link></div>

              <div className='__subtitle-wrapper'>
                <div className='__subtitle __primary'>Live-Play Sports-Based Games</div>
                <i>Available for any sport, any league... worldwide.</i>
              </div>
              <div className='__main __right'>
                <div className='__li'>
                  <div><span className='__primary'>Live-play sports-based lottery games</span> - Unique parlay style games that are sure to captivate the sports fan.</div>
                </div>
                <div className='__li'>
                  <div><span className='__primary'>Live-Play Daily Fantasy Sports (DFS) games</span> - Our PowerdFS game  puts players in control during the live game. <span className='__hide-on-large'>Swap players, boost points, and more! Also available in a lottery format.</span></div>
                </div>
                <div className='__li'>
                  <div><span className='__primary'>Live-play Sports betting games</span> - enhance your sports bet offering with our sports betting games<span className='__hide-on-large'> that are sure to appeal to novice bettor and casual bettors</span>.</div>
                </div>
                <div className='__li'>
                  <div><span className='__primary'>World Series Gaming Events</span> - Think World Series of Poker... Only for DFS or Sports betting. <span className='__hide-on-large'>Bring the world's best DFS players or Sports Bettors together for your event! We can make it happen.</span></div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='__content __content-6'>
          <div className='__wrapper'>
            <div className='__container'>
              <div>
                <img className='__brand-logo' src={logo} alt='' />
                <div className='__paragraph'>Visit PowerPlay Games to experience our ground-breaking live-play games where you have the Power to control your destiny!</div>
                <div className='__homepage-btn'>Comming Soon</div>
              </div>
            </div>
          </div>
        </div>
        <div className='__content __content-7'>
          <div className='__wrapper'>
            <div className='__container'>
              <div className='__title __primary'>Powerful Game Audits</div>
              <div className='__main'>
                <div>Our games use our patent-pending  <span className='__primary'>#GenR8 technology</span> to ensure all games are secure and 100% fraud-proof.</div>
                <div className='__hide-on-small'>#GenR8 audits will be performed within seconds of game completion providing instant verified results.</div>
                <div>That's right! No more expensive <span className='__hide-on-small'>and time-consuming</span> lottery audits required. <div className='__show-on-small'> </div> Instant results. Instantly verified. Only from PowerPlay Systems.</div>
                <img src={genrlogo} alt='' className='__genrlogo' />
              </div>
            </div>
          </div>
        </div>
        <div className='__content __content-8'>
          <div className='__wrapper'>
            <div className='__container'>
              <div className='__title __primary'>Trust and Security</div>
              <div className='__main'>
                <div>PowerPlay Systems offers seamless and safe live-play experiences <span className='__hide-on-small'>for your customers</span>.</div>
                <div>Our platform is built using industry-leading technology that is scalable, ultra-fast, SSL encrypted, and digitally secured.</div>
                <div className='__hide-on-small'>We have ensured that your customers' personal data is stored securely, and we are completely transparent in all our transactions.</div>
              </div>
              <div className='__we-are-prepare'>We are passionate about making sure that your customers will have an interactive and fun-filled experience when they use our service, whether they win or lose.</div>
              <Link to='/' className='__homepage-btn'>Partner with us!</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
