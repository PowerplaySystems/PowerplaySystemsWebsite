import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

import "./index.css";
class LiveSportsMore extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      error: null,
    };
  }

  render() {
    return (
      <>
        <Header />
        <div className="ls-rm">
          <div className="ls-rm-content-wrapper">
            <div className="ls-rm-header">
              PowerPlay <span className="ls-rm-text-Hide"> Systems </span>Live
              Sports
            </div>
            <div className="ls-rm-engage-wrapper">
              <div className="ls-rm-engage-wrapper-media" />
              <div className="ls-rm-engage-wrapper-left">
                <span className="ls-rm-orange-text">
                  {" "}
                  Engage your customers{" "}
                </span>{" "}
                <br className="ls-rm-engage-br" />
                with our integrated marketing live sports platform. We offer you
                a cutting-edge live sports platform that puts your customers in
                control and allows you to directly steer their behavior.&nbsp;
                <br />
                <br />
                Our platform is built to allow you to offer your clients a
                fantastic set of Interactive experiences covering all major
                North American Sports leagues - NHL/NFL/NBA/MLB.
                <br />
                <br />
                PowerPlay Live Sports offers you unique and engaging
                sports-based experiences with an interactive twist. Our platform
                can be utilized for promotional contests that are fully
                customized and integrated with your existing website. You can
                also generate additional revenue by advertising to players
                during the live game.
                <br />
                <button
                  className="ls-rm-partner-with-us-btn"
                  onClick={() => this.props.history.push("/partner")}
                >
                  Partner With Us
                </button>
              </div>
              <div className="ls-rm-engage-wrapper-right" />
            </div>
            <div className="ls-rm-ultimate-wrapper">
              <div className="ls-rm-ultimate-wrapper-left" />
              <div className="ls-rm-ultimate-wrapper-right">
                <div className="ls-rm-heading">
                  Ultimate Customer Experience
                </div>
                <br />
                Our platform allows players to utilize Powerplays to boost their
                point total live during the game. With Powerplays, participants
                can access many exciting and interactive actions during the live
                game. If a player runs out of Powerplays, we can motivate them
                to earn more by completing a marketing focused task that is
                valuable to your business.
                <br />
                <br />
                At Powered Bar Games, we are ultimately focused on interactive
                sessions. Our sports-based experiences are designed to keep
                player engagement high, whether it is one game or an entire
                season.
                <br />
                <br />
                Our platform is designed for all PC and mobile devices, bringing
                customers access to your Powerplay based events at any time, in
                any place, without boundaries.
                <button
                  className="ls-rm-partner-with-us-btn"
                  onClick={() => this.props.history.push("/partner")}
                >
                  Partner With Us
                </button>
              </div>
            </div>
            <div className="ls-rm-powerplay-wrapper">
              <div className="ls-rm-powerplay-wrapper-media" />
              <div className="ls-rm-powerplay-wrapper-left">
                <div className="ls-rm-heading">
                  Powered Bar Games Live Sports Benefits
                </div>
                <br />
                Powered Bar Games offers competitive pricing, 24/7 customer
                support, and an interactive mobile-friendly platform. Integrate
                with our platform and watch your conversions soar.
                <br />
                <br />
                We are passionate about making sure that your customers will
                have an interactive and fun-filled experience when they use our
                service, whether they win or lose.
                <br/>
                <button
                  className="ls-rm-partner-with-us-btn"
                  onClick={() => this.props.history.push("/partner")}
                >
                  Partner With Us
                </button>
              </div>
              <div className="ls-rm-powerplay-wrapper-right" />
            </div>
            <div className="ls-rm-trust-wrapper">
              <div className="ls-rm-trust-wrapper-left" />
              <div className="ls-rm-trust-wrapper-right">
                <div className="ls-rm-heading">Trust and Security</div>
                <br />
                Powered Bar Games Live Sports is an interactive live sports
                platform that offers seamless and safe sports-based experiences
                for your customers. Our platform is built using industry leading
                technology that is scalable, ultra-fast, SSL encrypted and
                digitally secured. We have ensured that your customers personal
                data is stored securely, and we are completely transparent in
                all our transactions.
                <br />
                <button
                  className="ls-rm-partner-with-us-btn"
                  onClick={() => this.props.history.push("/partner")}
                >
                  Partner With Us
                </button>
              </div>
            </div>
            <div className="ls-rm-partner-wrapper">
              <div className="ls-rm-partner-wrapper-media">
                <img
                  className="ls-rm-partner-img"
                  src={require("../../../assets/images/live_sports/lotto-landing-copy-only-version.png")}
                />
              </div>
              <div className="ls-rm-partner-wrapper-left">
                <div className="ls-rm-heading">Partner With Us</div>
                <br />
                Are you finding it difficult to generate funds through your
                promotional or charity events? Do you want to tap into the
                mobile generation? Our interactive live sports platform is what
                you need to significantly boost and expand your existing revenue
                generating strategy.
                <br />
                Integrate our game platform with your digital business strategy
                and we will power you ahead of the competition.
                <br />
                Start your customized experience today!
                <br />
                <button
                  className="ls-rm-partner-with-us-btn"
                  onClick={() => this.props.history.push("/partner")}
                >
                  Partner With Us
                </button>
              </div>
              <div className="ls-rm-partner-wrapper-right">
                <img
                  src={require("../../../assets/images/live_sports/lotto-landing-copy-only-version.png")}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
export default withRouter(LiveSportsMore);
