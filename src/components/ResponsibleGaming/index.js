import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './../common/Header'
import Footer from './../common/Footer'
import './index.css'

class Privacy extends Component {

    render() {
        return (
            <div>
                <Header />

                <div className="container-fluid _faq_wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>RESPONSIBLE GAMING</h1>
                            </div>
                            <div className="col-md-12">
                                <div className="_faq_cont">
                                    <h2>OVERVIEW</h2>
                                    <p>
                                        Blackjack Sports(BJS) is innovator in the online gaming industry. Blackjack sports is committed to integrity, fairness and reliability. We do everything possible to prevent gaming-related problems. We’ve developed measures to maintain a responsible, safe and reliable place for online gaming.<br /><br />
                                        Blackjack sports offers the options to self-exclude and self limit. If, at any point, you think you're spending too much time or money on Blackjack Sports, you have the option of taking a break from Blackjack sports entirely. Self-limiting allows you to still play, however, within the parameters that you set for yourself. To learn more, view our <a href="FAQ.html">FAQ page.</a>
                                    </p>
                                    <ul>
                                        <li><a href="self-exclusion.html">Self-Exclusion</a></li>
                                        <li><a href="self-limitation.html">Self-Limitation</a></li>
                                    </ul>
                                    <p>
                                        Blackjack Sports also provides options to limit the amount you spend by choosing an amount over a daily, weekly or monthly period. If you have an account you can view more details about the deposit limit options here.
                </p>
                                    <h2>NEED HELP?</h2>
                                    <p>If you have questions or concerns about your own gaming behavior or about that of a friend or family member, please contact <a href>
                                        NCRG</a> or <a href="http://www.responsiblegambling.org" className="footer-pages-link">RGC</a> .<br /><br />
                                        You can also contact NCPG 24 Hour Confidential National Helpline  Number in the United States: <a href="tel:+1-833-361-5269"> +1-833-361-5269</a> or <a href="tel:+1-833-361-5269"> +1-833-361-5269</a> to contact RGC in Canadafor additional assistance.
                </p>
                                    <h2>NCRG</h2>
                                    <p>
                                        Founded in 1996 as a charitable organization, the National Center for Responsible Gaming is exclusively devoted to funding research for gaming-related issues and effective methods of treatment. The research is scientific, peer-reviewed, and focused on prevention, diagnostic, intervention and treatment strategies, and advancing public education about responsible gaming.<br /><br />
                                        The NCRG website provides a variety of support and referral sources for help with counseling and crisis support for any affected by a gaming-related issue.
                </p>
                                    <h2>RGC</h2>
                                    <p>
                                        The Responsible Gambling Council (RGC) is an independent non-profit organization dedicated to problem gambling prevention.<br /><br />
                                        RGC works to reduce gambling risks by creating and delivering innovative awareness and information programs. It also promotes the adoption of improved play safeguards through best practices research, standards development and the RG Check accreditation program.<br /><br />
                                        RGC is committed to bringing together all perspectives in the reduction of gambling problems including those of people with firsthand experience with gambling problems, gaming providers, regulators, policy makers and treatment professionals.
                </p>
                                    <h2>CONCERNED ABOUT A FAMILY MEMBER?</h2>
                                    <p>
                                        If you believe that a member of your family is a problem gamer or is overspending please contact <a href="mailto:support@BlackjackSports.net"> support@BlackjackSports.net</a> for assistance.<br /><br />
                                        You may be able to exclude the BJS consumer(s) from participating in contests or to set deposit or loss limits. In order to process such requests, Blackjack sports will require the following proof: (1) that the requestor is jointly obligated on the credit or debit card associated with the BJS Consumer’s account; (2) proof of legal dependency of the BJS Consumer; (3) the existence of a court order requiring the DFS consumer to pay unmet child support obligations; and (4) any additional identifiable verification documentation validating the relationship between the requestor and BJS Consumer.
                </p>
                                    <h2>PARENTAL CONTROLS</h2>
                                    <p>
                                        If there are children under 18 who have access to your computer, you may want to consider installing parental control software to prevent access to online gaming site and other material, such as:
                </p>
                                    <ul>
                                        <li><a href=" "> NetNanny </a>- US Toll Free at <a href="tel:+1-833-361-5269"> +1-833-361-5269</a> .
                  </li>
                                        <li><a href=" "> CyberSitter </a></li>
                                    </ul>
                                    <p>If you believe that a minor is improperly using Blackjack sports please contact <a href="mailto:support@BlackjackSports.net"> support@BlackjackSports.net</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        );
    }
}

export default withRouter(Privacy);