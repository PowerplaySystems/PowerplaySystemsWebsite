import React, { Component } from "react";
import "./index.css";
import Cookies from "universal-cookie";
import * as Constants from "./../common/constants";
class MyAccountRoot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      name: "",
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSaveClicked = this.onSaveClicked.bind(this);
  }
  editInput() {}

  onEditClikced(inputType, inputValue) {
    if (inputType == "name") {
      this.setState({
        name: inputValue
      });
    }
    if (inputType == "email") {
      this.setState({
        email: inputValue
      });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSaveClicked(inputType){
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    let link = "https://" + Constants.URL + "/public_api/account/update.php?jwt=" + jwt;
    if (inputType == "name") {
     link = link + "&name=" + this.state.name + "&email=" + this.state.data.email;
    }
    if (inputType == "email") {
      link = link + "&name=" + this.state.data.fname + "&email=" + this.state.email;
    }
    
    fetch(link)
    .then(res => res.json())
    .then(
      xx => {
        alert(xx.message);
        this.showSaved(inputType);
      },
      error => {
        this.setState({
          error: error
        });
      }
    );
  }

  showSaved(type){
    if (type == "name") {
      this.state.data.fname = this.state.name;
      this.setState({
        name : ""
      })
     }
     if (type == "email") {
      this.state.data.email = this.state.email;
      this.setState({
        email : ""
      })
     }
  }
  getAccount(){
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    fetch("https://" + Constants.URL + "/public_api/account/data.php?jwt=" + jwt)
      .then(res => res.json())
      .then(
        xx => {
          let mData = xx.data;
          this.setState({
            data: mData
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }
  componentDidMount() {
    this.getAccount();
  }
  render() {
    
    return (
      <div id="profile" className="profile">
        <div className="profile-caption">
          <div className="caption-text">
            <h6>Profile</h6>
          </div>
          <div className="caption-btn">
            <button
              className="btn"
              style={{ display: "none", float: "right !important" }}
              id="saveButton"
            >
              Save
            </button>
          </div>
        </div>
        <div className="profile-inner-content">
          <div className="profile-pic-title">
            <h6>My Name</h6>
          </div>
          <div className="admin-record-updateion">
            {this.state.name == "" ? (
              <div className="recorde-details">
                <div className="record-updatetion-title">
                  <p id="editNameDiv">{this.state.data.fname}</p>
                </div>
                <div className="update-icon">
                  <img
                    onClick={() =>
                      this.onEditClikced("name", this.state.data.fname)
                    }
                    src={require("./../../assets/images/update-icon.png")}
                    id="editName"
                  />
                </div>
              </div>
            ) : (
              <div className="recorde-details">
                <div className="record-updatetion-title">
                  <input
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="update-icon">
                  <img
                    onClick={() =>
                      this.onSaveClicked("name")
                    }
                    src={require("./../../assets/images/save-icon.png")}
                    id="editName"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="clearfix" />
          <div className="profile-pic-title">
            <h6>My Display Name</h6>
          </div>
          <div className="admin-record-updateion">
            <div className="recorde-details">
              <div className="record-updatetion-title">
                <p id="editUserNameDiv">{this.state.data.dname}</p>
              </div>
            </div>
          </div>
          <div className="clearfix" />
          <div className="profile-pic-title">
            <h6>My Email Address</h6>
          </div>
          <div className="admin-record-updateion">
            <div className="recorde-details">
              {this.state.email == "" ? (
                <div className="recorde-details">
                  <div className="record-updatetion-title">
                    <p id="editNameDiv">{this.state.data.email}</p>
                  </div>
                  <div className="update-icon">
                    <img
                      onClick={() =>
                        this.onEditClikced("email", this.state.data.email)
                      }
                      src={require("./../../assets/images/update-icon.png")}
                      id="editName"
                    />
                  </div>
                </div>
              ) : (
                <div className="recorde-details">
                  <div className="record-updatetion-title">
                    <input
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="update-icon">
                    <img
                      onClick={() =>
                        this.onSaveClicked("email")
                      }
                      src={require("./../../assets/images/save-icon.png")}
                      id="editName"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

export default MyAccountRoot;
