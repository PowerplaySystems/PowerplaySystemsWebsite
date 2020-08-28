import React from "react";
import "./index.css";
//importing required components
import SelectNumbers from "./SelectNumbers.js";
import Header from "../common/Header.js";
import Footer from "../common/Footer.js";

function ComponentPickNumbersBtn(props) {
  return <button className="c-pick-your-numbers-btn">Pick Your Numbers</button>;
}
//functional conponents,
// can be defined in the same file or a seperate file.
// as in SelectNumbers.js
function StaticContent(props) {
  return (
    <div className="elite8-content">
      <section className="hero-section">
        <div className="hero-image">
          <div className="hero-content-wrapper">
            <div className="hero-heading"> ELITE 8 </div>
            <div className="hero-text1">
              Starts on Feb 23rd, 2020 @ 9:00PM EST
            </div>
            <div className="hero-text2">
              <span className="hero-bars" />
              &ensp; win up to &ensp;
              <span className="hero-bars" />
            </div>
            <div className="hero-text3">
              {" "}
              $2000
              <span className="CAD"> CAD </span>
            </div>
            <ComponentPickNumbersBtn />
            <div className="hero-text4">*No Purchase Necessary</div>
          </div>
        </div>
      </section>
      <div className="fun-play-wrapper">
        <div className="fun-play-left">
          <div className="fun-play-heading"> A Fun New Way to Play! </div>
          <div className="fun-play-text1">
            {" "}
            Have you ever played a pick-and-wait game like Super 7, 6/49, or
            Powerball?{" "}
          </div>
          <div className="fun-play-text2a">
            {" "}
            At PowerPlay Systems,
            <div className="fun-play-text2b">
              We think the current pick-and-wait format is kind of boring. So we
              invented a fun new way to play!
            </div>
          </div>
          <ComponentPickNumbersBtn />
        </div>
        <div className="fun-play-right">
          <img
            className="fun-play-right-img"
            src={require("../../assets/images/elite8-promo/rectangle-2.png")}
          />
        </div>
      </div>
      <div className="edit-selections-wrapper">
        <div className="edit-selections-heading">
          {" "}
          Edit your selections during the live draw!{" "}
        </div>
        <div className="edit-selections-subheading">
          To make it more exciting, you can make use of Powerplays during the
          live draw to edit your selections and improve your chances of winning.
        </div>
        <div className="edit-selections-box-container">
          <div className="edit-selections-box">
            <img
              className="edit-selections-box1-img"
              src={require("../../assets/images/elite8-promo/7.png")}
            />
            <div className="edit-selections-box-heading"> Power Match </div>
            <div className="edit-selections-box-text">
              {" "}
              Use Power Match to match the in-play number.{" "}
            </div>
          </div>
          <div className="edit-selections-box">
            <img
              className="edit-selections-box2-img"
              src={require("../../assets/images/elite8-promo/up-active.png")}
            />
            <img
              className="edit-selections-box2-img"
              src={require("../../assets/images/elite8-promo/down-active.png")}
            />
            <div className="edit-selections-box-heading">
              {" "}
              Increase/ Decrease{" "}
            </div>
            <div className="edit-selections-box-text">
              You can increase or decrease your pick during live draw.{" "}
            </div>
          </div>
          <div className="edit-selections-box">
            <img
              className="edit-selections-box3-box4-img"
              src={require("../../assets/images/elite8-promo/swap.png")}
            />
            <div className="edit-selections-box-heading"> Replace </div>
            <div className="edit-selections-box-text">
              Used to replace one number with a random new Number.{" "}
            </div>
          </div>
          <div className="edit-selections-box">
            <img
              className="edit-selections-box3-box4-img"
              src={require("../../assets/images/747_live/refresh.png")}
            />
            <div className="edit-selections-box-heading"> Replace All </div>
            <div className="edit-selections-box-text">
              Used to replace one number with a random new Number.{" "}
            </div>
          </div>
        </div>
        <div className="edit-selections-bottom-text">
          {" "}
          We will give you three free Powerplays to start!
        </div>
        <ComponentPickNumbersBtn />
      </div>

      <div className="match8-wrapper">
        <div className="match8-left">
          <div className="match8-heading">
            {" "}
            Match 8 of 8 numbers &amp; Win
            <span className="orange-text"> $2,000 </span> CAD{" "}
          </div>
          <div className="match8-subheading"> Smaller prizes available </div>
          <div className="match8-box-container">
            <div className="match8-greybox">7/8</div>
            <div className="match8-brownbox bx1">$500</div>
            <div className="match8-greybox">6/8</div>
            <div className="match8-brownbox bx2">$100</div>
          </div>
        </div>
        <div className="match8-right">
          <img
            src={require("../../assets/images/elite8-promo/lottery-orig-copy.png")}
          />
        </div>
      </div>
    </div>
  );
}
class Elite8 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        {/* Static content section on top */}
        <StaticContent />
        {/* Bottom select numbers section */}
        <SelectNumbers />
        <Footer />
      </div>
    );
  }
}

export default Elite8;
