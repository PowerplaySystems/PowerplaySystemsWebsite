import React, { useState,useEffect,Fragment } from "react";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";

import "./index.css";
import * as Constants from "./../common/constants";
import * as Functions from "./../common/functions";
import Cookies from "universal-cookie";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import './index.scss';
import backgroudImage from '../../assets/images/747/hero-image@2x.png';
import Popup from "../../ui/Popup";


import { gql, useQuery } from '@apollo/client';
import {PAGE747} from '../../GraphQL/Queries'

var DEMO_PICKS = [];
var DEMO_DRAW = [];
var DEMO_GAME_DATA = {
  id: 122,
  game_type: 1,
  start_datetime: "2019-12-30 12:59:00",
  prize_id: 44,
  prize: [
    { hits: 7, prize: 1000 },
    { hits: 6, prize: 400 },
    { hits: 5, prize: 200 },
    { hits: 4, prize: 100 },
    { hits: 3, prize: 50 },
    { hits: 2, prize: 25 },
    { hits: 1, prize: 15 }
  ],
  countdown_timer: 30,
  delay: 1,
  game_text: "1",
  rules: "undefined",
  odds_text: "1 in 10,000",
  code: null,
  status: "unplayed",
  deadline: "2019-12-30 12:59:00",
  entry: 109
};

//Popup variables
var popupText = "Error";
var popupHader = "Sorry!";

//game Defaults
let ballsTotal = 47;
let allowedToSelect = 7;
let ballElements = [];

var bg = require("./../../assets/images/747_live/circle.png");
let mCircleStyles = {
  backgroundImage: "url(" + bg + ")",
  backgroundSize: "cover",
  overflow: "hidden"
};

const Page747 =(props)=>{
    var value={}
    // if (props.location.state) {
    //   if (props.location.state.gameData == "demo") {
        value = {
          isDemo: true,
          error: null,
          isLoaded: false,
          content: "",
          gameData: DEMO_GAME_DATA,
          show: false,
          selected: [],
          prizes: [],
          confirm: false
        };
      // }
    // } else {
    //   value = {
    //     isDemo: false,
    //     error: null,
    //     isLoaded: false,
    //     content: "",
    //     gameData: DEMO_GAME_DATA,
    //     show: false,
    //     selected: [],
    //     prizes: [],
    //     confirm: false,

    //   };
    // }
  const [state,setState]=useState(value)
  
  function handleClose() {
    setState({
      ...state,
      show: false
    });
  }
  function handleShow() {
    setState({
      ...state,
      show: true
    });
  }
  function handleCloseConfirm() {
    setState({
      ...state,
      confirm: false
    });
  }
  function handleShowConfirm() {
    state.selected.sort(function (a, b) {
      return a - b;
    });
    setState({
      ...state,
      confirm: true
    });
  }
  function getJackpot(prizeArray) {
    if (prizeArray) {
      return "$" + Functions.numberWithCommas(prizeArray[0].prize);
    } else {
      return "Coming soon";
    }
  }
  function scrollToNumbers() {
    const gameTable = document.getElementById("pick-numbers");
    if (gameTable) {
      gameTable.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }
  function onBallClicked(mNumber) {
    console.log(mNumber);
    var selectedNumbers = state.selected;
    var index = selectedNumbers.indexOf(mNumber);
    if (index > -1) {
      var filtered = selectedNumbers.filter(function (value, index, arr) {
        return value != mNumber;
      });
      setState({
        ...state,
        selected: [...filtered]
      });
    } else {
      if (canSelectMore()) {
        selectedNumbers.push(mNumber);
        setState({
          ...state,
          selected: selectedNumbers
        });
      } else {
        popupHader = "Selection Limit";
        popupText = "Cannot select More than " + allowedToSelect;
        handleShow();
      }
    }
  }
  function getMyPickedNumbers() {
    if (state.isDemo) {
    } else {
      const cookies = new Cookies();
      const jwt = cookies.get("jwt");
      var that = this;
      fetch(
        "https://" +
        Constants.URL +
        "/public_api/lottery_games/getMyNumbers.php?jwt=" +
        jwt +
        "&game_id=" +
        state.gameData.id
      )
        .then(res => res.json())
        .then(
          result => {
            result = result.records;
            var selectedNumbers = [];
            result.forEach(element => {
              selectedNumbers.push(element.number);
              setState({
                ...state,
                selected: [...selectedNumbers]
              });
            });

            setState({
              ...state,
              isLoaded: true
            });
          },
          error => {
            setState({
              ...state,
              hasError: true,
              error: error
            });
          }
        );
    }
  }
  useEffect(()=> {
    document.getElementsByTagName("META")[2].content =
      "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    window.scrollTo(0, 0);
    window.scroll(0, 0);
    setBalls();
    getMyPickedNumbers();
    var buttons = document.getElementsByClassName("page747_selection_button");
    var that = this;

    document
      .getElementById("submit_selection_ball")
      .addEventListener("click", function (e) {
        if (canSubmit()) {
          submitUserSelections();
        } else {
          popupHader = "Selection Minimum";
          popupText = "Can not submit less than " + allowedToSelect;
          handleShow();
          return;
        }
      });
  },[])
  function canSelectMore() {
    if (state.selected.length >= allowedToSelect) {
      return false;
    } else {
      return true;
    }
  }
  function canSubmit() {
    if (state.selected.length == allowedToSelect) {
      return true;
    } else {
      return false;
    }
  }
  function submitUserSelections() {
    handleShowConfirm();
  }
  function submitBalls() {
    DEMO_PICKS = state.selected;
    if (state.isDemo) {
      props.history.push({
        pathname: "/747-draw",
        state: {
          gameData: "demo",
          picks: state.selected
        }
      });
    } else {
      const cookies = new Cookies();
      const jwt = cookies.get("jwt");
      if (jwt == "" || jwt == undefined) {
        popupText = "Please Login First";
        popupHader = "Authentication Failed!";
        handleShow();
        return false;
      }
      var data =
        "numbers=" +
        state.selected +
        "&jwt=" +
        jwt +
        "&game_id=" +
        state.gameData.id +
        "&gametype_id=" +
        Constants.LOTTO_747_ID;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      var that = this;
      console.log(data);
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          if (~this.responseText.indexOf("Successful")) {
            popupHader = "Successful";
            popupText = "Your Selected Numbers Have been saved!";
            that.handleShow();
            that.props.history.push({
              pathname: "/powerplay-lotto"
            });
          } else {
          }
        }
      });
      xhr.open(
        "POST",
        " https://" +
        Constants.URL +
        "/public_api/lottery_games/setMyNumbers.php"
      );
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }
  }
  function setBalls() {
    const allElements = [];
    console.log('ddddd')
    for (let counter = 1; counter <= ballsTotal; counter++) {
      const x = counter;
      allElements.push(
        <div
          className={
            "__game-ball" +
            (state.selected.indexOf(counter) == -1 ? "" : " __active")
          }
          onClick={() => onBallClicked(x)}
        >
          {counter}
        </div>
      );
    }
    return allElements;
  }
  function handleClosePrize() {
    setState({
      ...state,
      showPrize: false
    });
  }

  function handleShowPrize(game_type) {
    var prizesToShow = state.gameData.prize;
    prizesToShow.sort(function (a, b) {
      return parseFloat(b.prize) - parseFloat(a.prize);
    });

    setState({
      ...state,
      showPrize: true,
      prizes: prizesToShow
    });
  }
  const { error,loading,data } =useQuery(PAGE747)
  const [banner,getBanner]=useState({})
  const [compo1,getCompo1]=useState({})
  const [compo2,getCompo2]=useState({})
  useEffect(() => {
    if(data){
      getBanner(data.page747.banner)
      getCompo1(data.page747.compo1)
      getCompo2(data.page747.compo2)
      
    }
  }, [data])
    return (
      <div>
        <Header />
        <Popup title={popupHader} closeButton footer={[<button onClick={()=>handleClose()}>Close</button>]} show={state.show} onHide={()=>handleClose()}>
          {popupText}
        </Popup>

        <Modal show={state.showPrize} onHide={()=>handleClosePrize()}>
          <Modal.Header closeButton>
            <Modal.Title>Prizes</Modal.Title>
            <div className="prize-note">
              *Note: All Prizes Will be divided equally among Winners
            </div>
          </Modal.Header>
          <Modal.Body className="grid-body">
            {
              <table className="modal-prize-table">
                <thead>
                  <tr>
                    <th scope="col"> Matches </th>
                    <th scope="col"> Prize </th>
                  </tr>
                </thead>
                <tbody>
                  {state.prizes.map((prize, key) => {
                    return (
                      <tr className="prize-row" key={key}>
                        <td>
                          <p> {prize.hits} </p>
                        </td>
                        <td>
                          <p>{"$" + Functions.numberWithCommas(prize.prize)}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            }
          </Modal.Body>
        </Modal>
        <Popup
          show={state.confirm}
          onHide={()=>handleCloseConfirm()}
          title='Review my numbers'
          closeButton
          footer={
            [
              <button onClick={()=>handleCloseConfirm()}>Cancel</button>,
              <button onClick={()=>submitBalls()}>Submit</button>
            ]
          }
        >
          <div>My Numbers</div>
          <div className='__flex __popup-game-wrapper'>
            {state.selected.map((number, key) => {
              return (
                <div className='__game-ball'>
                  {number}
                </div>
              );
            })}
          </div>
        </Popup>
        <div className='__747-page'>
          {
            Object.keys(banner).length>0?(
              <div className='__viewport'>
                <div className='__content'>
                  <img src={banner.image.url} alt='' className='__viewport-image' />
                  <div className="__container">
                    <div className='__main-title __flex'>{banner.title}</div>
                    <div  className="page747banner"  dangerouslySetInnerHTML={{ __html: banner.desc }}/>
                    {/* <div className='__subtitle'>You are about to experience the world's</div>
                    <div className='__primary __title'>First Live-Play Lottery Game!</div>
                    <div>The most exciting lottery game you will ever play! Guaranteed.</div> */}
                  </div>
                  <div className='__747-card __flex'>
                  <div    dangerouslySetInnerHTML={{ __html: compo1.desc }}/>
                    {/* <div>Pick and submit <span className='__primary'>7 numbers</span> below and you will be taken to the live-play game. Use your live-play Powers to <span className='__primary'>adjust your picks</span> during the live draw!</div> */}
                    <div className='__border'></div>
                    <img src={compo1.image.url} className='__balls' alt='' />
                  </div>
                </div>
              </div>
            ):<Fragment/>
          }

          <div className='__main __container'>
            {
              Object.keys(compo2).length>0?(
                <div className='__flex __poweplays __flex-start'>
                  <img
                    className='__powerplays-left-image'
                    src={compo2.bg_image.url}
                  />
                  <div className='__f1'>
                    <div className='__title'>{compo2.title}</div>
                    <div className='__wrap __powerplays-content-wrapper __flex __sb'>
                      {
                        compo2.list.map((item,i)=>(
                            <div className='__powerplays-content __flex __sb' key={i}>
                              <div className='__powerplays-card __column'>
                                <img
                                  src={item.img.url}
                                  className='__powerplays-card-image'
                                />
                                <div className='__powerplays-card-footer'>{item.title}</div>
                              </div>
                              <div className='__powerplyas-content-details'>{item.desc}</div>
                            </div>
                        ))
                      }

                      {/* <div className='__powerplays-content __flex __sb'>
                        <div className='__powerplays-card __column'>
                          <img
                            src={require("./../../assets/images/747/747_3.png")}
                            className='__powerplays-card-image'
                          />
                          <div className='__powerplays-card-footer'>Power Match</div>
                        </div>
                        <div className='__powerplyas-content-details'>Use force match to change your pick to match the drawn #</div>
                      </div>

                      <div className='__powerplays-content __flex __sb'>
                        <div className='__powerplays-card __column'>
                          <img
                            src={require("./../../assets/images/747/shuffle.png")}
                            className='__powerplays-card-image'
                          />
                          <div className='__powerplays-card-footer'>Increase/Decrease</div>
                        </div>
                        <div className='__powerplyas-content-details'>Use change to replace one # with a random new Number</div>
                      </div>

                      <div className='__powerplays-content __flex __sb'>
                        <div className='__powerplays-card __column'>
                          <img
                            src={require("./../../assets/images/747/747_1.png")}
                            className='__powerplays-card-image'
                          />
                          <div className='__powerplays-card-footer'>Refresh All</div>
                        </div>
                        <div className='__powerplyas-content-details'>Use refresh all to refresh all your numbers with a random new set.</div>
                      </div> */}
                    </div>
                  </div>
              </div>
              ):<Fragment/>
            }
          </div>
          <div className="__container __game-wrapper" id="pick-numbers">
            <div className='__title'>Pick Your Numbers !</div>
            <div className="page747_number_rules">CONTEST RULES</div>
            <div className='__game'>{setBalls()}</div>
            <div className='__helper-text'>{state.selected.length + " of " + allowedToSelect + " Numbers chosen"}</div>
            <button id="submit_selection_ball" className="__submit-btn" disabled={canSelectMore()}>SUBMIT!</button>
          </div>
        </div>
        {/* Not worked on this, Ubaid */}
        <div className="container-fluid _faq_wrap">
          <div className="container-fluid">
            <div className="page747_rows">

              <div className="pick_numbers_mobile_box">
                <p className="mobile_box_text_1">Jackpot</p>
                {!state.isDemo ? (
                  <p
                    className="mobile_box_text_2"
                    style={{ marginBottom: "20px !important" }}
                  >
                    Can be fixed or progressive
                  </p>
                ) : (
                    <>
                      <p className="mobile_box_text_2b">
                        {()=>getJackpot()(state.gameData.prize)}
                      </p>
                      <p className="mobile_box_text_3">
                        Odds of Winning:{" "}
                        <span>{state.gameData.odds_text}</span>
                      </p>
                      <p className="mobile_box_text_4">Next Draw Date</p>
                      <p className="mobile_box_text_5">
                        Sunday Apr 12 2019, 12:15 PM EST
                    </p>{" "}
                      <p className="mobile_box_text_6">Entry Deadline</p>
                      <p className="mobile_box_text_7">11:15 PM EST</p>
                    </>
                  )}
              </div>

              {/* Not worked on this, Ubaid */}
              <div className="col-md-12">
                {state.isDemo ? (
                  ""
                ) : (
                    <div className="page747_main_bar row">
                      <div className="col-md-6">
                        <div class="main_bar_inner">
                          <div>
                            <p>Jackpot</p>
                            <p className="main_bar_inner_bigger">
                              {()=>getJackpot()(state.gameData.prize)}
                            </p>
                          </div>
                          <div className="page747_main_left_lower_text">
                            Draw date <s>{state.gameData.start_datetime}</s>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="page747_main_draw_box">
                          <div>
                            <p>Next draw starts in</p>
                            <div className="row page747_main_draw_inner">
                              <div>
                                <p>
                                  {" "}
                                  {Functions.getDays(
                                    state.gameData.start_datetime
                                  )}
                                </p>
                              Days
                            </div>
                              <div>
                                <p>
                                  {" "}
                                  {Functions.getHours(
                                    state.gameData.start_datetime
                                  )}
                                </p>
                              hours
                            </div>
                              <div>
                                <p>
                                  {" "}
                                  {Functions.getMinuts(
                                    state.gameData.start_datetime
                                  )}
                                </p>
                              Mins
                            </div>
                            </div>
                          </div>
                        </div>
                        <div className="page747_main_lower_text">
                          Draw date <s>{state.gameData.start_datetime}</s>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              {/* Not worked on this too */}
              {state.isDemo ? (
                ""
              ) : (
                  <div className="col-md-12">
                    <div className="page747_main_prize">
                      <div class="page747_prize_image-wraper">
                        <img
                          className="img-responsive"
                          src={require("./../../assets/images/747/747_prize.png")}
                        />
                      </div>

                      <div className="page747_prize_details">
                        <div className="page747_prize_content">
                          <div class="page747_prize_header row">
                            <div className="row">
                              <span>Top Prizes</span>{" "}
                              <div className="button_show_prize_wrapper">
                                <button
                                  className="button_show_prize"
                                  onClick={e => ()=>handleShowPrize("747")}
                                >
                                  View All Prizes
                              </button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="page747-prize-box-wrapper">
                              <div className="page747-prize-box">
                                {state.gameData.prize[0].hits + "/7"} <br />
                                <span>
                                  {"$" +
                                    Functions.numberWithCommas(
                                      state.gameData.prize[0].prize
                                    )}
                                </span>
                              </div>
                            </div>
                            <div className="page747-prize-box-wrapper">
                              <div className="page747-prize-box">
                                {state.gameData.prize[1].hits + "/7"}
                                <br />
                                <span>
                                  {"$" +
                                    Functions.numberWithCommas(
                                      state.gameData.prize[1].prize
                                    )}
                                </span>
                              </div>
                            </div>
                            <div className="page747-prize-box-wrapper">
                              <div className="page747-prize-box">
                                {state.gameData.prize[2].hits + "/7"}
                                <br />
                                <span>
                                  {"$" +
                                    Functions.numberWithCommas(
                                      state.gameData.prize[2].prize
                                    )}
                                </span>
                              </div>
                            </div>
                            <div className="page747-prize-box-wrapper">
                              <div className="page747-prize-box">
                                {state.gameData.prize[3].hits + "/7"}
                                <br />
                                <span>
                                  {"$" + state.gameData.prize[3].prize}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="page747_prize_note">
                            *All prizes will be divided equally among winners
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              <div className="col-md-12">
                <div className="col-md-12">
                  {state.isDemo ? (
                    ""
                  ) : (
                      <div className="page747_number_rules">CONTEST RULES</div>
                    )}

                  {state.isDemo ? (
                    ""
                  ) : (
                      <div class="page747_number_box">
                        <div>
                          <p>Till Next Draw</p>
                          <div className="row page747_next_draw_box">
                            <div>
                              <p>
                                {" "}
                                {Functions.getDays(
                                  state.gameData.start_datetime
                                )}
                              </p>
                            Days
                          </div>
                            <div>
                              <p>
                                {" "}
                                {Functions.getHours(
                                  state.gameData.start_datetime
                                )}
                              </p>
                            hours
                          </div>
                            <div>
                              <p>
                                {" "}
                                {Functions.getMinuts(
                                  state.gameData.start_datetime
                                )}
                              </p>
                            Mins
                          </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>

              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
export default withRouter(Page747)
