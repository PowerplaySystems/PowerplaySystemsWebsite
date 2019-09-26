import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import * as Constants from "./../common/constants";
import "./index.css";
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
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.uploadData = this.uploadData.bind(this);
  }
  handleClose() {
    this.setState({
      show: false
    },function(){
      this.props.history.push("/")
    });
  }

  handleShow() {
    this.setState({
      show: true
    });
  }
  componentDidMount() {
    window.scroll(0, 0);
  }
  uploadData() {
    var name = document.getElementById("input-name").value;
    var email = document.getElementById("input-email").value;
    var phone = document.getElementById("input-number").value;
    var business = document.getElementById("input-business").value;
    var message = document.getElementById("input-message").value;
    if (email == "" || name == "" || phone == "" || business == "") {
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
        // if (~this.responseText.indexOf("successfully")) {
        //   popupText = "We will contact you in a short while!";
        //   popupHader = "Successful!";
        //   that.handleShow();
        //   that.props.history.push("/");
        // } else {
        //   popupText = "Something Went Wrong, Please Try Again";
        //   popupHader = "Sorry!";
        //   that.handleShow();
        // }
        popupText = "We will contact you in a short while!";
        popupHader = "Successful!";
        that.handleShow();
       
      }
    });
    xhr.open("POST", " https://" + Constants.URL + "/public_api/partner.php");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }
  render() {
    return (
      <>
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
        <div className="container" style={{ background: "#1e1e1e" }}>
          <div className="partner_slide_bg_wapper">
            <div className="partner_slide_bg">
              <div className="partner_heading_content">
                <div className="partner_heading">
                  Partner with <span>Powerplay Systems</span>
                </div>
                <div className="partner_heading_details">
                  Utilize our contest platform to expand your reach, increase
                  revenue and enhance customer engagement. <br />
                  We look forward to hearing from you!
                </div>
              </div>
            </div>
          </div>
          <div className="partner_row_2_wrapper">
            <div className="partner_row_2_left">
              <div className="partner_row_2_item">
                <img
                  className="img-responsive"
                  src={require("./../../assets/images/partner/interaction.png")}
                />
                <div className="partner_row_2_item_text">
                  <div className="partner_row_2_item_header">
                    Customer Engagement
                  </div>
                  <div className="partner_row_2_item_details">
                    - Engage your customers with an exciting interactive
                    experience. <br />- Tap into the Mobile generation
                  </div>
                </div>
              </div>
              <div className="partner_row_2_item">
                <img
                  className="img-responsive"
                  src={require("./../../assets/images/partner/megaphone.png")}
                />
                <div className="partner_row_2_item_text">
                  <div className="partner_row_2_item_header">
                    Build Your Brand
                  </div>
                  <div className="partner_row_2_item_details">
                    - Offering a contest has been proven to increase brand
                    awareness <br />- An email campaign is included with all our
                    interactive options
                  </div>
                </div>
              </div>
              <div className="partner_row_2_item">
                <img
                  className="img-responsive"
                  src={require("./../../assets/images/partner/excited.png")}
                />
                <div className="partner_row_2_item_text">
                  <div className="partner_row_2_item_header">
                    Drive Customer Behavior/Generate Leads
                  </div>
                  <div className="partner_row_2_item_details">
                    - PowerPlays are very valuable to our games, you can use
                    this knowledge to drive customer actions (i.e. like us on
                    Facebook to obtain an extra PowerPlay) <br />- Live In-game
                    options are also available to increase interaction.
                    <br />- A promotional contest is a great way to generate new
                    sales leads.
                  </div>
                </div>
              </div>
            </div>
            <div className="partner_row_2_right">
              <div className="partner_form_box">
                <div className="partner_form_group">
                  <label>Name</label>
                  <input id="input-name" type="text"></input>
                </div>
                <div className="partner_form_group">
                  <label>Email</label>
                  <input id="input-email" type="email"></input>
                </div>
                <div className="partner_form_group">
                  <label>Phone Number</label>
                  <input id="input-number" type="phone"></input>
                </div>
                <div className="partner_form_group">
                  <label>Business Name</label>
                  <input id="input-business" type="text"></input>
                </div>
                <div className="partner_form_group">
                  <label>Message</label>
                  <textarea id="input-message" type="text"></textarea>
                </div>
                <button
                  onClick={this.uploadData}
                  className="partner_form_box_button"
                >
                  Partner With Us
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(PartnerWithUs);
