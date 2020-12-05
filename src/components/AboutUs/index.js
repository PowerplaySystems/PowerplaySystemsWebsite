import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.scss";
import * as Constants from "./../common/constants";
class AboutUs extends Component {
  constructor(props) {
    super(props);
    window.scroll(0, 0);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };
  }
  markDown(text) {
    console.log(text);
    if (text) {
      //Here I replace special chars for html tags, this is the example: __ Text in bold __
      return text.replace(/__(.*?)__((_+|\W+|$))/g, "<strong>$1</strong>$2");
    }
  }
  componentDidMount() {
    window.scroll(0, 0);
    fetch("https://" + Constants.URL + "/api/website_footer/get_aboutus.php")
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          result = result.records;

          this.setState({
            data: result
          });
        },
        error => {
          this.setState({
            hasError: true,
            error: error
          });
        }
      );
  }
  render() {
    return (
      <div className="__about-us-page">
        <Header />
        <div className='__viewport __column'>
          <div className='__container __sb __column __f1'>
            <div className='__view-port-header'>
              <div className='__title'>PowerPlay Systems</div>
              <div className='__subtitle'>Driving disruptive change across the lottery, fantasy sports, and sports betting landscape</div>
            </div>
            <div className='__viewport-footer'>
              <div className='__title-2 __primary'>What We Do?</div>
              <div className='__subtitle-2'>Powerplay Systems is offering the worlds first patent pending Live-Play Lottery and Fantasy Sports solutions.</div>
              <div className='__subtitle-2 __hide-on-mediam'>Our solution can be used for charity fundraising, DFS, State run lotteries, lead generation, or promotional contests.</div>
            </div>
          </div>
        </div>

        <div className='__main'>
          <div className='__container'>
            <div className='__content'>
              <div className='__title __primary'>Live-Play Lottery Games</div>
              <div className='__paragraph'>
                <div>Utilize our Powerful fully customizable lottery platform to take your lottery offering to the next level.</div>
                <div  className='__hide-on-small'>Whether it is a Sporting event 50/50 draw or a Mega-Millions draw, our solution will provide your customers with the world’s most exciting lottery draw.</div>
              </div>
            </div>
            <div className='__content'>
              <div className='__title __primary'>Live-Play Sports Games</div>
              <div className='__paragraph'>
                <div className='__hide-on-small'>Would you like to ramp up customer engagement?</div>
                <div>Use our interactive live sports solution to drive customer behavior by offering exciting new fantasy sports games, bar games, promotional contests, sports betting games, and even sports based lotteries.</div>
              </div>
            </div>
            <div className='__flex'><Link to='/' className='__btn'>partner with us!</Link></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AboutUs);
