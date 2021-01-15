import React, { Component } from "react";
import {Helmet} from "react-helmet";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import DrawTimer from "./../common/DrawTimer";
import * as Constants from "./../common/constants";
import "./index.scss";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

//Popup variables
var popupText = "Error";
var popupHader = "Sorry!";

class PartnerWithUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      show: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.uploadData = this.uploadData.bind(this);
  }
  handleClose() {
    this.setState(
      {
        show: false,
      },
      function() {
        this.props.history.push("/");
      }
    );
  }

  handleShow() {
    this.setState({
      show: true,
    });
  }
  componentDidMount() {
    window.scroll(0, 0);
  }
  uploadData(e) {
    e.preventDefault();
    var name = document.getElementById("input-name").value;
    var email = document.getElementById("input-email").value;
    var phone = document.getElementById("input-number").value;
    var business = "";
    var message = document.getElementById("input-message").value;
    if (email == "" || name == "" || phone == "") {
      alert("Please Fill out the form");
      return;
    }
    var data =
      "name=" +
      name +
      "&email=" +
      email +
      "&phone=" +
      phone +
      "&business=" +
      business +
      "&message=" +
      message;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var that = this;
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        alert("We will contact you in a short while!");
        // popupText = "We will contact you in a short while!";
        // popupHader = "Successful!";
        // that.handleShow();
        that.props.history.push({
          pathname: "/",
        });
      }
    });
    xhr.open("POST", " https://" + Constants.URL_WEBSITE + "/public_api/partner.php");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Partner with Powerplay Systems</title>
          <meta
            name="description"
            content="We’re here to help you boost your business via using our contest platform. We look forward to hearing from you. Partner with us to increase your Gaming Revenue"
          />
        </Helmet>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {popupHader} </Modal.Title>
          </Modal.Header>
          <Modal.Body> {popupText}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Header />
        <DrawTimer />

        <div className="__partner-with-us">
          <div className="__viewport">
            <div className="__container-2">
              <div className="__title">
                Partner with{" "}
                <span className="__primary">Powerplay Systems</span>
              </div>
              <div className="__subtitle">
                We’re here to help you boost your business via using our contest
                platfrom. <br /> We look forward to hearing from you{" "}
              </div>
              <button className="__btn">Partner With Us!</button>
            </div>
          </div>

          <div className="__main">
            <div className="__reverse-rotate">
              <div className="__container-2 __flex __sb">
                <div className="__left">
                  <img
                    src={require("./../../assets/images/partner/interaction.png")}
                  />
                  <div>
                    <div className="__title">Customer Engagement</div>
                    <div>
                      - Engage your customers with an exciting interactive
                      experience. <br />- Tap into the Mobile generation
                    </div>
                  </div>

                  <img
                    className="img-responsive"
                    src={require("./../../assets/images/partner/megaphone.png")}
                  />
                  <div>
                    <div className="__title">Build Your Brand</div>
                    <div>
                      - Offering a contest has been proven to increase brand
                      awareness <br />- An email campaign is included with all
                      our interactive options
                    </div>
                  </div>

                  <img
                    className="img-responsive"
                    src={require("./../../assets/images/partner/excited.png")}
                  />
                  <div>
                    <div className="__title">Drive customers behavior</div>
                    <div>
                      - PowerPlays are very valuable to our games, you can use
                      this knowledge to drive customer actions (i.e. like us on
                      Facebook to obtain an extra PowerPlay) <br />- Live
                      In-game options are also available to increase
                      interaction.
                    </div>
                  </div>
                </div>
                <div className="__show-on-mediam __title">
                  We look forward to hearing from you{" "}
                </div>
                <form className="__right" onSubmit={this.uploadData}>
                  <div className="__input-field">
                    <label htmlFor="input-name">Name</label>
                    <input id="input-name" type="text" />
                  </div>
                  <div className="__input-field">
                    <label htmlFor="input-email">Email</label>
                    <input id="input-email" type="email" />
                  </div>
                  <div className="__input-field">
                    <label>Phone Number</label>
                    <input id="input-number" type="number" min={0} />
                  </div>
                  <div className="__input-field">
                    <label htmlFor="input-message">Message</label>
                    <textarea id="input-message" type="text" rows={6} />
                  </div>
                  <button className="__btn">Partner with us!</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div />
        <Footer />
      </>
    );
  }
}

export default withRouter(PartnerWithUs);
