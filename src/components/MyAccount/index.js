import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import MyAccountRoot from './MyAccountRoot'
import MyTransactions from './MyTransactions'
import MyWithdrawals from './MyWithdrawals'
import SelfExclusion from './SelfExclusion'
import SelfImposedLimits from './SelfImposedLimits'
import Sidebar from './Sidebar'
import Header from './../common/Header'
import Footer from './../common/Footer'
import './index.css'
import * as Constants from "./../common/constants";
class MyAccount extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <Route path="/my-account"
                render={props =>
                    <div>
                        <Header {...props} />
                        <div className="container-fluid p-o">
                            <div id="admin-profile" className="admin-profile">
                                <div className="custom-container">
                                    <div className="admin-profile-whole-content">
                                        <Sidebar {...props}/>
                                        <Route exact path="/my-account"
                                            render={props => <MyAccountRoot {...props} />}
                                        />
                                        
                                        <Route exact path="/my-account/my-balance"
                                            render={props => <MyWithdrawals {...props} />}
                                        />
                                        <Route exact path="/my-account/my-powerplays"
                                            render={props => <MyTransactions {...props} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer {...props} />
                    </div>
                }
            />
        );
    }
}

export default withRouter(MyAccount);