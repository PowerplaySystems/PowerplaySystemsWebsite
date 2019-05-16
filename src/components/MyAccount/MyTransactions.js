import React, { Component } from 'react';
import './index.css'

class MyTransactions extends Component {
    render() {
        return (
            <div id="profile" className="profile">
                <div className="profile-caption">
                    <div className="caption-text">
                        <img src={require("./../../assets/images/transaction.png")} />
                        <h6>My Transactions</h6>
                    </div>
                </div>
                <div className="profile-inner-content">
                    <div className="col-md-12">
                        <div id="transactions">
                            <div className="transactions-title">
                                <div className="title-contant">
                                    <p>showing results for</p>
                                </div>
                                <div className="transactin-duration">
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Last 3 months
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" onclick="filterByYear('3m')">Last 3 Months</a>
                                            <a className="dropdown-item" onclick="filterByYear('6m')">Last 6 Months</a>
                                            <a className="dropdown-item" onclick="filterByYear('9m')">Last 9 Months</a>
                                            <a className="dropdown-item" onclick="filterByYear('1y')">Last Year</a>
                                        </div>
                                    </div>
                                </div>
                                <div id="filter" className="filter-btn">
                                    <a href="javascript:void(0);" className="btn">
                                        <img src={require("./../../assets/images/filters.png")} />filter
                                    </a>
                                </div>
                            </div>
                            <div className="status-and-type no-filter">
                                <div className="transaction-status">
                                    <h6>By Transaction Status</h6>
                                    <div className="status-and-type-dropdown">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Choose Status
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" onclick="filterByStatus('complete')">Complete</a>
                                                <a className="dropdown-item" onclick="filterByStatus('pending')">Pending</a>
                                                <a className="dropdown-item" onclick="filterByStatus('cancel')">Cancel</a>
                                                <a className="dropdown-item" onclick="filterByStatus('refund')">Refund</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="transaction-details-table table-responsive" style={{ maxHeight: '327px', height: '40px', overflowY: 'scroll' }}>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyTransactions;