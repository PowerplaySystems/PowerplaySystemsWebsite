import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import SelectGames from './components/SelectGames'
import HowToPlay from './components/HowToPlay'
import AboutUs from './components/AboutUs'
import TermsOfUse from './components/TermsOfUse'
import Privacy from './components/Privacy'
import FAQ from './components/FAQ'
import ResponsibleGaming from './components/ResponsibleGaming'
import TrustAndSafety from './components/TrustAndSafety'
import AccountSecurity from './components/AccountSecurity'
import PowerplayStore from './components/PowerplayStore'
import GameCentral from './components/GameCentral'
import SponsorGames from './components/SponsorGames'
import CTA from './components/SelectTeams/cta'
import PowerplayLotto from './components/PowerplayLotto'
import Zones from './components/SelectTeams/zones'
import Powerplay from './components/SelectTeams/powerplay'
import Pickfive from './components/SelectTeams/pickfive'
import Highfive from './components/SelectTeams/highfive'
import Brackets from './components/SelectTeams/brackets'
import LiveScore from './components/LiveScore'
import MyAccount from './components/MyAccount'
import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Home} />
            <Route exact path="/select-games" component={SelectGames} />
            <Route exact path="/select-games/:id" component={SelectGames} />
            <Route exact path="/how-to-play" component={HowToPlay} />
            <Route exact path="/about-us" component={AboutUs} />
            <Route exact path="/terms-of-use" component={TermsOfUse} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/responsible-gaming" component={ResponsibleGaming} />
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/powerplay-lotto" component={PowerplayLotto} />
            <Route exact path="/trust-and-safety" component={TrustAndSafety} />
            <Route exact path="/account-security" component={AccountSecurity} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/powerplay-store" component={PowerplayStore} />
            <Route exact path="/sponsor-games" component={SponsorGames} />
            <Route exact path="/game-central" component={GameCentral} />
            <Route exact path="/select-teams-cta" component={CTA} />
            <Route exact path="/select-teams-zones" component={Zones} />
            <Route exact path="/select-teams-powerplay" component={Powerplay} />
            <Route exact path="/select-teams-pick5" component={Pickfive} />
            <Route exact path="/select-teams-high5" component={Highfive} />
            <Route exact path="/select-teams-brackets" component={Brackets} />
            <Route exact path="/livescore" component={LiveScore} />
            <Route path="/my-account" component={MyAccount} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
