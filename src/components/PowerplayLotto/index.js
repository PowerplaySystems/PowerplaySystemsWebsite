import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";

class PowerplayLotto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      content: ""
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <img
                src={require("./../../assets/images/lotto/looto_header.jpg")}
                className="img-responsive lotto-header"
              />
            </div>
            <div className="row lotto-section-2">
              <center>
                <h1>Offerning The following Promotional Lottery Games</h1>
              </center>
              <center>
                <div className="lotto-divider" />
              </center>
              <div className="row">
                <div className="col-sm-3">
                  <img
                    src={require("./../../assets/images/lotto/looto_elite.png")}
                    className="img-responsive"
                  />
                </div>
                <div className="col-sm-3">
                  <img
                    src={require("./../../assets/images/lotto/looto_747.png")}
                    className="img-responsive"
                  />
                </div>
                <div className="col-sm-3">
                  <img
                    src={require("./../../assets/images/lotto/looto_gridlock.png")}
                    className="img-responsive"
                  />
                </div>
                <div className="col-sm-3">
                  <img
                    src={require("./../../assets/images/lotto/looto_sweet.png")}
                    className="img-responsive"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(PowerplayLotto);
