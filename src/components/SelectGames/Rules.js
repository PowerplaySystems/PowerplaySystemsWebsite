import React, { Component } from 'react';

class Rules extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };
    }
    componentDidMount() {


    }

    render() {
        return (
            <div id={"rule-hocky-" + this.props.value[0].association_id} className="tab-pane fade">
                <div className="container-fluid game_rules">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="game_rules_tables">
                                <table>
                                    <thead>
                                        <tr>


                                            {
                                                this.props.value.map((data, key) => (
                                                    <th scope="col" className="active_rules">
                                                        <a data-toggle="tab" href={"#rule-" + + data.id}>{data.rule}
                                                        </a>
                                                    </th>
                                                ))


                                            }



                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="tab-content">
                                {
                                    this.props.value.map((data, key) => (
                                        <div id={"rule-" + data.id} className={"tab-pane fade in " + (key == 0 ? "active" : "")}
                                        >
                                            <ul>
                                                {
                                                    (() => {
                                                       var rules = data.text.split("<br />");
                                                       var newRules = rules.map((rule, index) => (
                                                            rule.replace(/<(?:.|\n)*?>/gm, '')                                                           
                                                       ))
                                                       return newRules.map((rule, index) => (
                                                          
                                                        <li>

                                                        <span className="fa fa-circle" /> &nbsp; {rule} </li>
                                                       ))

                                                    })()
                                                }
                                            
                                            </ul>
                                        </div>

                                    ))


                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Rules;