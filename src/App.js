import React, { useContext, useReducer, useEffect } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./store/store";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import SelectGames from "./components/SelectGames";
import HowToPlay from "./components/HowToPlay";
import AboutUs from "./components/AboutUs";
import TermsOfUse from "./components/TermsOfUse";
import Privacy from "./components/Privacy";
import FAQ from "./components/FAQ";
import ResponsibleGaming from "./components/ResponsibleGaming";
import TrustAndSafety from "./components/TrustAndSafety";
import AccountSecurity from "./components/AccountSecurity";
import PowerplayStore from "./components/PowerplayStore";
import GameCentral from "./components/GameCentral";
import SponsorGames from "./components/SponsorGames";
import CTA from "./components/SelectTeams/cta";

import Zones from "./components/SelectTeams/zones";
import Powerplay from "./components/SelectTeams/powerplay";
import Pickfive from "./components/SelectTeams/pickfive";
import Highfive from "./components/SelectTeams/highfive";
import Brackets from "./components/SelectTeams/brackets";
import LiveScore from "./components/LiveScore";
import MyAccount from "./components/MyAccount";
import Page747 from "./components/Page747";
import Page747Draw from "./components/Page747Draw";
import PartnerWithUs from "./components/PartenerWithUs";
import Sweet16 from "./components/Sweet16";
import Sweet16Draw from "./components/Sweet16Draw";
import Elite8 from "./components/Elite8";
import Elite8Draw from "./components/Elite8Draw";
import LotteryPlatform from "./components/LotteryPlatform";

import LottoResult from "./components/LottoResult";
import Elite8Promo from "./components/Elite8Promo";
//sports landing
import LiveSports from "./components/LiveSports";
import LiveSportsMore from "./components/LiveSports/ReadMore";
//lotto landing
import PowerplayLotto from "./components/LottoLanding";
import PowerplayLottoMore from "./components/LottoLanding/ReadMore";
//fantasy
import FantasySelectPlayers from "./components/Fantasy/SelectPlayer";
import FantasyLive from "./components/Fantasy/Live";
//draft day
import DraftDayLanding from "./components/DrafDay/Landing";
import DraftDaySelect from "./components/DrafDay/Selection";
import DraftDayLive from "./components/DrafDay/Live";

import "./App.css";
import PPSSolutions from "./components/PPSSolutions/PPSSolutions";
import Services from "./components/Services/Services";

import AppStore from './store'
import reducer from './reducer'

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   HttpLink,
//   from,
// } from '@apollo/client'
// import {
//   onError
// } from '@apollo/client/link/error'
import client from "./utils/apolloClient";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
const App =()=> {

  // const errorLink=onError(({graphqlErrors,networkError})=>{
  //   if(graphqlErrors){
  //     graphqlErrors.map(({message,location,path})=>{
  //       alert(`Graphql error ${message}`)
  //     })
  //   }
  // }) 

  // const link=from([
  //   errorLink,
  //   new HttpLink({uri:'http://localhost:1337/graphql'})
  // ])

  // const client=new ApolloClient({
  //   cache: new InMemoryCache(),
  //   link:link
  // })
  const initialState = useContext(AppStore);
  const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
        <AppStore.Provider value={{ state, dispatch }}>
          <Router>
            <div className="App">
              <Route exact path="/" component={Home} />
              <Route exact path="/select-games" component={SelectGames} />
              <Route exact path="/select-games/:id" component={SelectGames} />
              <Route exact path="/how-to-play" component={HowToPlay} />
              <Route exact path="/about-us" component={AboutUs} />
              <Route exact path="/terms-of-use" component={TermsOfUse} />
              <Route exact path="/privacy" component={Privacy} />
              <Route
                exact
                path="/responsible-gaming"
                component={ResponsibleGaming}
              />
              <Route exact path="/faq" component={FAQ} />
              <Route exact path="/powerplay-lotto" component={PowerplayLotto} />
              <Route
                exact
                path="/powerplay-lotto-more"
                component={PowerplayLottoMore}
              />

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
              <Route exact path="/747" component={Page747} />
              <Route exact path="/747-draw" component={Page747Draw} />
              <Route exact path="/sweet16" component={Sweet16} />
              <Route exact path="/sweet16-draw" component={Sweet16Draw} />
              <Route exact path="/elite8" component={Elite8} />
              <Route exact path="/elite8-draw" component={Elite8Draw} />
              <Route path="/my-account" component={MyAccount} />
              <Route path="/sport-platform" component={LotteryPlatform} />
              <Route path="/live-sports" component={LiveSports} />
              <Route path="/live-sports-more" component={LiveSportsMore} />
              <Route path="/partner" component={PartnerWithUs} />
              <Route path="/lotto-result" component={LottoResult} />
              <Route exact path="/elite8-promo" component={Elite8Promo} />
              <Route path="/fantasy-players" component={FantasySelectPlayers} />
              <Route path="/fantasy-live" component={FantasyLive} />
              <Route path="/draft-day" component={DraftDayLanding} />
              <Route path="/draft-day-teams" component={DraftDaySelect} />
              <Route path="/draft-day-live" component={DraftDayLive} />
              <Route path='/solutions' component={PPSSolutions} />
              <Route path='/services' component={Services} />
            </div>
          </Router>
          </AppStore.Provider>
          </ApolloHooksProvider>
        </ApolloProvider>
    );
  }

export default App;
