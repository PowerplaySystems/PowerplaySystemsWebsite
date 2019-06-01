import React, { Component } from "react";

class Rules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      activeHeaderKey: 0,
      rules: []
    };
  }
  componentDidMount() {
    this.rearrangeRUles();
  }
  rearrangeRUles() {
    let reArranged = [];
    let GeneralRules = "",
      Gamesets = "",
      Powerplays = "",
      SuspendedGames = "",
      CanceledGames = "";
    this.props.value.forEach(element => {
      if (element.rule.trim() == "General Rules") {
        GeneralRules = element;
      }
      if (element.rule.trim() == "Gamesets") {
        Gamesets = element;
      }
      if (element.rule.trim() == "Powerplays") {
        Powerplays = element;
      }
      if (element.rule.trim() == "Suspended Games") {
        SuspendedGames = element;
      }
      if (element.rule.trim() == "Canceled Games") {
        CanceledGames = element;
      }
    });

    console.log(GeneralRules);
    console.log(Gamesets);
    console.log(Powerplays);
    console.log(SuspendedGames);
    let index = 0;

    if (GeneralRules != "") {
      reArranged[index] = GeneralRules;
      index++;
    }
    if (Gamesets != "") {
      reArranged[index] = Gamesets;
      index++;
    }
    if (Powerplays != "") {
      reArranged[index] = Powerplays;
      index++;
    }
    if (SuspendedGames != "") {
      reArranged[index] = SuspendedGames;
      index++;
    }
    if (CanceledGames != "") {
      reArranged[index] = CanceledGames;
      index++;
    }
    this.setState({
      rules: reArranged
    });
  }
  render() {
    return (
      <div
        id={"rule-hocky-" + this.props.value[0].association_id}
        className="tab-pane fade"
      >
        <div className="container-fluid game_rules">
          <div className="container">
            <div className="col-md-12">
              <div className="game_rules_tables">
                <table>
                  <thead>
                    <tr>
                      {this.state.rules.map((data, key) => (
                        <th
                          scope="col"
                          className={
                            this.state.activeHeaderKey == key
                              ? "active_rules rules_tab_active"
                              : "active_rules"
                          }
                        >
                          <a
                            data-toggle="tab"
                            onClick={() =>
                              this.setState({ activeHeaderKey: key })
                            }
                            href={"#rule-" + +data.id}
                          >
                            {data.rule}
                          </a>
                        </th>
                      ))}
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="tab-content">
                {this.state.rules.map((data, key) => (
                  <div
                    id={"rule-" + data.id}
                    className={"tab-pane fade in " + (key == 0 ? "active" : "")}
                    
                  >
                    <p dangerouslySetInnerHTML={{ __html: data.text }}></p>
                   
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Rules;
