import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import MyAccountRoot from "./MyAccountRoot";
import MyTransactions from "./MyTransactions";
import MyWithdrawals from "./MyWithdrawals";
import SelfExclusion from "./SelfExclusion";
import SelfImposedLimits from "./SelfImposedLimits";
import Sidebar from "./Sidebar";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import DrawTimer from "./../common/DrawTimer";

import "./index.css";
import * as Constants from "./../common/constants";
class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      tabIndex: 0,
      data: [],
      mBalancePoints: 0,
      mBalanceCash: 0,
      isredeemFormOpen: false
    };

    this.onTabClicked = this.onTabClicked.bind(this);
    this.onRedeemClicked = this.onRedeemClicked.bind(this);
  }
  getAccount() {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    fetch(
      "https://" + Constants.URL + "/public_api/account/data.php?jwt=" + jwt
    )
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
  getBalance() {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    fetch(
      "https://" +
        Constants.URL +
        "/public_api/powerplay/my_powerplays.php?jwt=" +
        jwt
    )
      .then(res => res.json())
      .then(
        records => {
          this.setState({
            mBalanceCash: records.balance.cash,
            mBalancePoints: records.balance.points
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }
  onRedeemClicked() {
    this.setState({
      isredeemFormOpen: !this.state.isredeemFormOpen
    });
  }
  onTabClicked(index) {
    console.log(index);
    this.setState({
      tabIndex: index
    });
  }
  componentRedeemForm() {
    return (
      <div
        className="balance_redeem_form_wrapper"
        style={{ display: this.state.isredeemFormOpen ? "block" : "none" }}
      >
        <div className="balance_redeem_form">
          <div className="redeem_form_section1">
            <div className="redeem_form_heading">Withdrawal Info</div>
            <div className="redeem_form_group form_group1">
              <label>Withdrawal amount (min $100)</label>
              <div
                className="redeem_form_input_group"
                style={{ marginRight: "40px" }}
              >
                <label className="redeem_form_input_group_label">$</label>
                <input
                  className="redeem_form_input form_group1_input"
                  placeholder="00"
                />
              </div>
            </div>
            <div className="redeem_form_group form_group2">
              <label>Send funds to</label>
              <input
                className="redeem_form_input"
                placeholder="Enter your paypal email here"
              />
            </div>
          </div>
          <div className="redeem_form_section2">
            <div className="redeem_form_heading">Billing info</div>
            <div
              className="redeem_form_group form_group3"
              style={{ marginRight: "40px" }}
            >
              <label>Address Line 1</label>
              <input
                className="redeem_form_input"
                placeholder="Enter address here"
              />
            </div>
            <div className="redeem_form_group form_group4">
              <label>Address Line 2</label>
              <input
                className="redeem_form_input"
                placeholder="Enter address here"
              />
            </div>
          </div>
          <div className="redeem_form_section3">
            <div className="redeem_form_heading">Personal info</div>
            <div className="redeem_form_group form_group5">
              <label>First Name</label>
              <input
                type="text"
                name="first-name"
                className="redeem_form_input"
                placeholder="Enter First Name"
              />
            </div>
            <div className="redeem_form_group form_group6">
              <label>Last Name</label>
              <input
                type="text"
                name="last-name"
                className="redeem_form_input"
                placeholder="Enter Last Name"
              />
            </div>
            <div className="redeem_form_group form_group7">
              <label>Day</label>
              <select
                name="day"
                className="redeem_form_input"
                placeholder="Select Day"
              >
                <option>- Day -</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
            </div>
            <div className="redeem_form_group form_group8">
              <label>Month</label>
              <select
                name="month"
                className="redeem_form_input"
                placeholder="Select Month"
              >
                <option>- Month -</option>
                <option value="January">January</option>
                <option value="Febuary">Febuary</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div className="redeem_form_group form_group9">
              <label>Year</label>
              <select
                name="year"
                className="redeem_form_input"
                placeholder="Select Year"
              >
                <option>- Year -</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
                <option value="1979">1979</option>
                <option value="1978">1978</option>
                <option value="1977">1977</option>
                <option value="1976">1976</option>
                <option value="1975">1975</option>
                <option value="1974">1974</option>
                <option value="1973">1973</option>
                <option value="1972">1972</option>
                <option value="1971">1971</option>
                <option value="1970">1970</option>
                <option value="1969">1969</option>
                <option value="1968">1968</option>
                <option value="1967">1967</option>
                <option value="1966">1966</option>
                <option value="1965">1965</option>
                <option value="1964">1964</option>
                <option value="1963">1963</option>
                <option value="1962">1962</option>
                <option value="1961">1961</option>
                <option value="1960">1960</option>
                <option value="1959">1959</option>
                <option value="1958">1958</option>
                <option value="1957">1957</option>
                <option value="1956">1956</option>
                <option value="1955">1955</option>
                <option value="1954">1954</option>
                <option value="1953">1953</option>
                <option value="1952">1952</option>
                <option value="1951">1951</option>
                <option value="1950">1950</option>
                <option value="1949">1949</option>
                <option value="1948">1948</option>
                <option value="1947">1947</option>
                <option value="1946">1946</option>
                <option value="1945">1945</option>
                <option value="1944">1944</option>
                <option value="1943">1943</option>
                <option value="1942">1942</option>
                <option value="1941">1941</option>
                <option value="1940">1940</option>
                <option value="1939">1939</option>
                <option value="1938">1938</option>
                <option value="1937">1937</option>
                <option value="1936">1936</option>
                <option value="1935">1935</option>
                <option value="1934">1934</option>
                <option value="1933">1933</option>
                <option value="1932">1932</option>
                <option value="1931">1931</option>
                <option value="1930">1930</option>
              </select>
            </div>

            <p>
              <input
                type="checkbox"
                id="terms"
                name="terms"
                value={this.state.terms}
                onChange={this.handleChange}
              />
              <label
                for="terms"
                className="terms-label"
                style={{ marginLeft: "10px" }}
              >
                {"     "}
                By clicking join now you agree to our <a>Terms & Conditions</a>
              </label>
            </p>
          </div>
          <div className="redeem_form_section4">
            <button onClick={this.onRedeemClicked}>Submit Request</button>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getAccount();
    this.getBalance();
  }
  render() {
    return (
      <>
        <Header />
        <DrawTimer />
        <div className="page_main_Settings">
          <div className="content_settings">
            <div className="settings_heading">Settings</div>
            <div className="settings_tabs">
              <div
                className={
                  "settings_tab " + (this.state.tabIndex == 0 ? "act" : "")
                }
                onClick={e => this.onTabClicked(0)}
              >
                Account Info
              </div>
              <div
                className={
                  "settings_tab " + (this.state.tabIndex == 1 ? "act" : "")
                }
                onClick={e => this.onTabClicked(1)}
              >
                Balance
              </div>
              <div
                className={
                  "settings_tab " + (this.state.tabIndex == 2 ? "act" : "")
                }
                onClick={e => this.onTabClicked(2)}
              >
                Results&nbsp;&nbsp;<div>2</div>
              </div>
            </div>
            <div
              className={
                "settings_tab_account " +
                (this.state.tabIndex == 0 ? "settings_active_tab" : "")
              }
            >
              <div className="tab_account_row">
                <div className="setting_item setting_name">Full Name</div>
                <div className="setting_item">
                  <div className="setting_value">
                    {this.state.data.fname + " " + this.state.data.lname}
                  </div>
                  <div className="setting_edit">Edit</div>
                </div>
              </div>
              <div className="tab_account_row">
                <div className="setting_item setting_name">Display Name</div>
                <div className="setting_item">
                  <div className="setting_value"> {this.state.data.dname}</div>
                  <div className="setting_edit">Edit</div>
                </div>
              </div>
              <div className="tab_account_row">
                <div className="setting_item setting_name">Email</div>
                <div className="setting_item">
                  <div className="setting_value">{this.state.data.email}</div>
                  <div className="setting_edit">Edit</div>
                </div>
              </div>
              <div className="tab_account_row">
                <div className="setting_item setting_name">Country</div>
                <div className="setting_item">
                  <div className="setting_value">---</div>
                  <div className="setting_edit">Edit</div>
                </div>
              </div>
              <div className="tab_account_row">
                <div className="setting_item setting_name">Province</div>
                <div className="setting_item">
                  <div className="setting_value">---</div>
                  <div className="setting_edit">Edit</div>
                </div>
              </div>
              <div className="tab_account_row">
                <div className="setting_item setting_name">Change Password</div>
                <div className="setting_item">
                  <div className="setting_value"></div>
                  <div className="setting_edit">Change</div>
                </div>
              </div>
            </div>
            <div
              className={
                "settings_tab_balance " +
                (this.state.tabIndex == 1 ? "settings_active_tab" : "")
              }
            >
              <div className="tab_balance_row">
                <div className="tab_balance_current">
                  <div className="tab_balance_current_icon"></div>
                  <div className="tab_balance_current_text1">
                    My Current Balance
                  </div>
                  <div className="tab_balance_current_text2">
                    {"$" +
                      (this.state.mBalanceCash == null
                        ? 0
                        : this.state.mBalanceCash)}
                  </div>
                </div>
                <div className="tab_balance_redeem">
                  <div
                    style={{
                      display: this.state.isredeemFormOpen ? "none" : "block"
                    }}
                    className="tab_balance_redeem_button"
                    onClick={this.onRedeemClicked}
                  >
                    Redeem
                  </div>
                  <div className="tab_balance_redeem_text">
                    Min. Amount: $100
                  </div>
                </div>
              </div>
              {this.componentRedeemForm()}
            </div>
            <div
              className={
                "settings_tab_results " +
                (this.state.tabIndex == 2 ? "settings_active_tab" : "")
              }
            >
              <table className="tab_results_table">
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>Time</td>
                    <td>Game Type</td>
                    <td>Game Desc</td>
                    <td>Amount won</td>
                    <td>Results</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>15 June</td>
                    <td>11:00 am</td>
                    <td>Lottery</td>
                    <td>747</td>
                    <td>$200</td>
                    <td>Verified</td>
                    <td>
                      <button className="settings_button_view_results">
                        View Results
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>15 June</td>
                    <td>11:00 am</td>
                    <td>Lottery</td>
                    <td>747</td>
                    <td>$200</td>
                    <td>Verified</td>
                    <td>
                      <button className="settings_button_view_results">
                        View Results
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  componentOLD() {
    return (
      <Route
        path="/my-account"
        render={props => (
          <div>
            <Header {...props} />
            <div className="container-fluid p-o">
              <div id="admin-profile" className="admin-profile">
                <div className="custom-container">
                  <div className="admin-profile-whole-content">
                    <Sidebar {...props} />
                    <Route
                      exact
                      path="/my-account"
                      render={props => <MyAccountRoot {...props} />}
                    />

                    <Route
                      exact
                      path="/my-account/my-balance"
                      render={props => <MyWithdrawals {...props} />}
                    />
                    <Route
                      exact
                      path="/my-account/my-powerplays"
                      render={props => <MyTransactions {...props} />}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Footer {...props} />
          </div>
        )}
      />
    );
  }
}

export default withRouter(MyAccount);
