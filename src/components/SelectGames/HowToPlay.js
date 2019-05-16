import React, { Component } from 'react';

class HowTo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };
    }
    componentDidMount() {


    }

    render() {
        return (
            <div id={"howto-hocky-" + this.props.value[0].association_id} className="tab-pane fade in active">
                <div className="container-fluid howto_main">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div>
                                    {
                                        this.props.value.map((data1, key) => {
                                            return (
                                                <div className="howto_iner">
                                                    <div className="counter">{key+1}</div>
                                                    <h1>{data1.header}</h1>
                                                    <p> {data1.step_text.replace(/<(?:.|\n)*?>/gm, '')} </p>
                                                </div>
                                            )

                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default HowTo;