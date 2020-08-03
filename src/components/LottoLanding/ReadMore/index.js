import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import Cookies from "universal-cookie";
import * as Constants from "../../common/constants";

import "./readmore.css";
class PowerplayLottoMore extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      error: null,
    };
  }

  render() {
    return (
      <div>
        <Header />
        <div style={{ backgroundColor: "#202124", paddingBottom: "120px" }}>
          <div className="lotto-rm-content-wrapper">
            <div className="lotto-rm-header">Powerplay Lotto</div>
            <div className="lotto-rm-engage-wrapper">
              <div className="lotto-rm-engage-wrapper-media" />
              <div className="lotto-rm-engage-wrapper-left">
                <div className="lotto-rm-heading">
                  Give your customers a unique online interactive lottery
                  experience.
                </div>
                <br />
                <br />
                Our cutting-edge Lotto Platform offers players an interactive
                lottery format where lottery selections can be adjusted during a
                live draw.
                <br />
                <br />
                Our platform is built to offer a fantastic set of gameplay
                options. At PowerPlay Systems, we provide a platform where you
                can run promotional, charity, state-run, or casino-based
                lotteries/raffles.
                <br />
                <br />
                Our platform offers you and your customers a new high revenue
                stream, industry-leading conversions, and unmatched excitement.
                <button
                  className="lotto-rm-partner-with-us-btn"
                  onClick={() => this.props.history.push("/partner")}
                >
                  Partner With Us
                </button>
              </div>
              <div className="lotto-rm-engage-wrapper-right" />
            </div>
            <div className="lotto-rm-ultimate-wrapper">
              <div className="lotto-rm-ultimate-wrapper-left" />
              <div className="lotto-rm-ultimate-wrapper-right">
                <div className="lotto-rm-heading">
                  Ultimate Interactive <br className="lotto-rm-media-br" /> Engagement
                </div>
                <br />
                With our interactive platform, we offer players a compelling and
                irresistible experience where they can adjust their picks during
                live draws by making use of ‘Powerplays’. If a player runs out
                of Powerplays, we can even motivate them to earn Powerplays by
                performing tasks that increase engagement with your business!
                <br />
                <br />
                At PowerPlay Systems, we are ultimately focused on interactive
                sessions, which means ‘eyes on-screen’ during our events. Our
                interactive lottery platform is designed to keep player
                engagement high, therefore, increasing the number of players in
                every event.
                <br />
                <br />
                Our platform is designed for all PC and mobile devices, bringing
                customers access to your Powerplay based events at any time, in
                any place, without boundaries.
                <button
                  className="lotto-rm-partner-with-us-btn"
                  onClick={() => this.props.history.push("/partner")}
                >
                  Partner With Us
                </button>
              </div>
            </div>
            <div className="lotto-rm-powerplay-wrapper">
              <div className="lotto-rm-powerplay-wrapper-media" />
              <div className="lotto-rm-powerplay-wrapper-left">
                <div className="lotto-rm-heading">Player Experience</div>
                <br />
                PowerPlay offers competitive pricing, 24/7 customer support, and
                an interactive user-friendly platform. Tested and loved by users
                globally, our promotional lotteries, charity lotteries,
                state-run lotteries, casino-based lotteries, and 50/50 raffles
                are fully optimized to attract players while retaining existing
                customers.
                <br />
                <br />
                Integrate with our platform and watch your conversions soar.
                <br />
                <br />
                We are passionate about making sure that all your customers have
                an interactive and fun-filled experience when they use our
                service, whether they win or lose.
                <button
                  className="lotto-rm-partner-with-us-btn"
                  onClick={() => this.props.history.push("/partner")}
                >
                  Partner With Us
                </button>
              </div>
              <div className="lotto-rm-powerplay-wrapper-right" />
            </div>
            <div className="lotto-rm-trust-wrapper">
              <div className="lotto-rm-trust-wrapper-left" />
              <div className="lotto-rm-trust-wrapper-right">
                <div className="lotto-rm-heading">Trust and Security</div>
                <br />
                PowerPlay Lotto is an interactive platform that offers seamless
                and safe lottery style experiences for your customers.
                <br />
                <br />
                Our platform is built using industry leading technology that is
                scalable, ultra-fast, SSL encrypted and digitally secured. We
                have ensured that your customers’ personal data is stored
                securely and we are completely transparent in all our
                transactions.
                <button
                  className="lotto-rm-partner-with-us-btn"
                  onClick={() => this.props.history.push("/partner")}
                >
                  Partner With Us
                </button>
              </div>
            </div>
            <div className="lotto-rm-genR8-wrapper">
              <div className="lotto-rm-genR8-wrapper-left">
                <div className="lotto-rm-genR8-wrapper-right-media">
                  <img
                    src={require("../../../assets/images/lotto/pngwave.png")}
                    className="lotto-rm-genR8-wrapper-right-img-media"
                  />
                </div>
                <div className="lotto-rm-genR8-wrapper-left-button">
                  <div className="lotto-rm-genR8-wrapper-left-button-txt">
                    #GenR8™ Technology
                  </div>
                </div>
                <div className="lotto-rm-genR8-wrapper-left-text1">
                  Our platform is based on our patent pending #GenR8™ Technology
                  – a cutting edge random lottery number generator that is 100%
                  safe, secure, and instantly auditable.
                </div>
                <div className="lotto-rm-genR8-wrapper-left-text2">
                  Our <span className="lotto-rm-white-text"> #GenR8™ Technology </span>
                  integrates real-life time-events to our number generating
                  engine paired with block-chain technology to provide a random
                  number generator that provides truly random, 100% fraud
                  resistant, instantly auditable inputs to your lottery games.
                </div>
                <button
                  className="lotto-rm-partner-with-us-btn"
                  onClick={() => this.props.history.push("/partner")}
                >
                  Partner With Us
                </button>
              </div>
              <div className="lotto-rm-genR8-wrapper-right">
                <img
                  src={require("../../../assets/images/lotto/pngwave.png")}
                  className="lotto-rm-genR8-wrapper-right-img"
                />
              </div>
            </div>
            <div className="lotto-rm-partner-wrapper">
              <div className="lotto-rm-partner-wrapper-media">
                <img
                  className="lotto-rm-partner-img"
                  src={require("../../../assets/images/lotto/lotto-landing-copy-only-version.png")}
                />
              </div>
              <div className="lotto-rm-partner-wrapper-left">
                <div className="lotto-rm-heading">Partner With Us</div>
                <br />
                Start your customized experience that is perfectly tailored to
                meet your needs. Are you finding it difficult to generate funds
                at your promotional/charity events?
                <br />
                <br />
                Do you want to tap into the mobile generation? Our interactive
                live sports platform is what you need to significantly boost and
                expand your existing revenue generating strategy.
                <br />
                <br />
                Let us help you with your licensing and legal requirements,
                business strategy, game design, and integrated marketing to
                ensure you stay ahead of the competition.
                <br />
                <button
                  className="lotto-rm-partner-with-us-btn desktop"
                  onClick={() => this.props.history.push("/partner")}
                >
                  Partner With Us
                </button>
              </div>
              <div className="lotto-rm-partner-wrapper-right">
                <img
                  src={require("../../../assets/images/lotto/lotto-landing-copy-only-version.png")}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(PowerplayLottoMore);
