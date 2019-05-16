import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import "./index.css";

class AboutUs extends Component {
  constructor(props) {
    super(props);

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
    fetch("https://mypowerplaygames.com/api/website_footer/get_aboutus.php")
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
    if (this.state.data.length > 0) {
      return (
        <div>
          <Header />
          <div className="container-fluid p-o">
            <div
              className="about-us-first-banner"
              style={{
                background: `url(${require("./../../assets/images/about-bd-1.png")}`
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="about-caption">
                    <h2>About Us</h2>
                  </div>
                  <div className="col-sm-6">
                    <div className="first-image">
                      <img
                        src={require("./../../assets/images/about-img-1.png")}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div
                      className="about-description"
                      dangerouslySetInnerHTML={{
                        __html: this.markDown(
                          this.markDown(this.state.data[0].content)
                        )
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="about-us-second-banner"
              style={{
                background: `url(${require("./../../assets/images/about-bg-2.png")})`
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <div
                      className="about-description"
                      dangerouslySetInnerHTML={{
                        __html: this.markDown(this.state.data[1].content)
                      }}
                    />
                  </div>
                  <div className="col-sm-6">
                    <div className="first-image">
                      <img
                        src={require("./../../assets/images/about-img-2.png")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="stay-tuned">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12">
                    <div
                      className="stay-tuned-content"
                      dangerouslySetInnerHTML={{
                        __html: this.markDown(this.state.data[2].content)
                      }}
                    />
                    <div className="find-us-section">
                      <div className="find-us-caption">
                        <h4>Where To find us?</h4>
                      </div>
                      <div className="find-us-main-content">
                        <div className="building-pic">
                          <img
                            src={require("./../../assets/images/building-pic.png")}
                          />
                        </div>
                        <div className="building-location">
                          <div className="building-address">
                            <img
                              src={require("./../../assets/images/location-icon.png")}
                            />
                            <div className="building-address-details"
                            dangerouslySetInnerHTML={{
                                __html: this.markDown(this.state.data[3].content)
                              }}>
                            
                            </div>
                          </div>
                          <div className="building-phone-num-content">
                            <img
                              src={require("./../../assets/images/phone-contac-icont.png")}
                            />
                            <div className="building-address-details"
                            dangerouslySetInnerHTML={{
                                __html: this.markDown(this.state.data[4].content)
                              }}>
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
      return <h1>Nothing Here</h1>;
    }
  }
}

export default withRouter(AboutUs);
