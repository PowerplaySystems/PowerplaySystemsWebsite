import React, { Component } from "react";
import axios from "axios";
import "./index.css";
import "./notify.css";
class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClass: this.props.buttonClass,
      property: this.props.property,
      //states --> normal, clicked, notify,hidden
      buttonState: "normal",
      email: "",
    };
    this.onButtonClicked = this.onButtonClicked.bind(this);
  }
  onButtonClicked() {
    if (this.state.buttonState == "normal") {
      this.setState({
        buttonState: "clicked",
      });
    } else if (this.state.buttonState == "clicked") {
      this.uploadData();
      this.setState({
        buttonState: "notify",
      });
    } else if (this.state.buttonState == "notify") {
      this.uploadData();
      this.setState({
        buttonState: "hidden",
      });
    }
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  uploadData() {
    if (this.validateEmail(this.state.email)) {
      axios.get(``).then((res) => {
        const persons = res.data;
        this.setState({ persons });
      });
    }
  }
  render() {
    if (this.state.buttonState == "normal") {
      return (
        <>
          {" "}
          <button
            className={this.state.buttonClass}
            onClick={this.onButtonClicked}
          >
            Notify Me
          </button>
        </>
      );
    } else if (this.state.buttonState == "clicked") {
      return (
        <div
          className={
            "home-notify-wrapper" +
            (this.state.property == "Elite 8" ? " home-box-elite8" : "")
          }
        >
          <input
            type="email"
            className="home-notify-email"
            placeholder="Enter your email here"
          />
          <button className="home-notify-button" onClick={this.onButtonClicked}>
            Notify Me
          </button>
        </div>
      );
    } else if (this.state.buttonState == "notify") {
      return (
        <div
          className={
            "home-notify-wrapper home-notify-dismiss-wrapper" +
            (this.state.property == "Elite 8" ? " home-box-elite8" : "")
          }
        >
          <div className="home-notify-img" />
          <div className="home-notify-text1">
            Thank you! You will be notified when this game launches
          </div>
          <div className="home-notify-dismiss" onClick = {this.onButtonClicked}>DISMISS</div>
        </div>
      );
    } else if (this.state.buttonState == "hidden") {
      return <></>;
    }
  }
}
export default Notify;
