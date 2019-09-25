import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./index.css";

class Footer extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid contact-us">
          <div className="container">
            <div className="row ">
              <div className="col-sm-5" />
              <div className="col-sm-2">
                <div className="box">
                  <h2>Legal / Privacy</h2>
                  <a
                    className="c-p"
                    onClick={() => this.props.history.push("/terms-of-use")}
                  >
                    Term Of Use
                  </a>
                  <a
                    className="c-p"
                    onClick={() => this.props.history.push("/privacy")}
                  >
                    Privacy
                  </a>
                  <a
                    className="c-p"
                    onClick={() => this.props.history.push("/account-security")}
                  >
                    Account Security
                  </a>
                </div>
              </div>
              {/* <div className="col-sm-2">
                <div className="box">
                  <h2>Company</h2>
                  <a
                    className="c-p"
                    onClick={() => this.props.history.push("/faq")}
                  >
                    FAQs
                  </a>
                  <a
                    className="c-p"
                    onClick={() => this.props.history.push("/trust-and-safety")}
                  >
                    Trust And Safety
                  </a>

                  <a
                    className="c-p"
                    onClick={() => this.props.history.push("/about-us")}
                  >
                    About US
                  </a>
                </div>
              </div> */}
              <footer>
                <div className="col-md-12">
                  <p>
                    Copyright © 2019 PowerPlay Systems Inc. - All Rights
                    Reserved
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>
        <div className="container-fluid p-o" />
      </div>
    );
  }
}

export default withRouter(Footer);
