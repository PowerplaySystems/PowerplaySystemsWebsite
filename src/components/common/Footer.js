import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./index.css";

class Footer extends Component {
  render() {
    return (
      <div>
        <div className="footer-contaier">
          <div>
            <div className="footer-left">
              <div className="box">
                <h2>Legal / Privacy</h2>

                {/* <a
                    className="c-p"
                    onClick={() => this.props.history.push("/terms-of-use")}
                  >
                    Term Of Use
                  </a> */}
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
                <a
                  className="c-p"
                  onClick={() => this.props.history.push("/trust-and-safety")}
                >
                  Trust And Safety
                </a>
              </div>
            </div>
            <div className="footer-right">
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
                  onClick={() => this.props.history.push("/about-us")}
                >
                  About US
                </a>
              </div>
            </div>
            <footer>
              <div className="col-md-12">
                <p>
                  Copyright © 2019 PowerPlay Systems Inc. - All Rights Reserved
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);
