import React, { Component } from 'react';
import './index.css'

class Sidebar extends Component {
    render() {
        return (
            <div className="admin-profile-main-content">
                <div className="admin-controls">
                    <h5>My Controls</h5>
                    <div className="control-content">
                        <a className="c-p" onClick={() => this.props.history.push('/my-account')}>
                            <img src={require("./../../assets/images/settings-icon.png")} />
                            <h6>My settings</h6>
                        </a>
                    </div>
                    <div className="control-content">
                        <a className="c-p" onClick={() => this.props.history.push('/my-account/my-balance')}>
                            <img src={require("./../../assets/images/withdraw.png")} />
                            <h6>My Balance</h6>
                        </a>
                    </div>
                    
                    <div className="control-content">
                        <a className="c-p" onClick={() => this.props.history.push('/my-account/my-powerplays')}>
                            <img src={require("./../../assets/images/My-Vcs.png")} />
                            <h6>My Transactions</h6>
                        </a>
                    </div>
                    <div className="control-content">
                        <a className="c-p" onClick={() => this.props.history.push('/my-account')}>
                            <img src={require("./../../assets/images/subscription.png")} />
                            <h6>My Subscriptions</h6>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;