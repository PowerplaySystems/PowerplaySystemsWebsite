import React, { useEffect,useState,Fragment } from "react";
import {Helmet} from "react-helmet";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import DrawTimer from "./../common/DrawTimer";
import * as Constants from "./../common/constants";
import "./index.scss";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import CallCenter from "../../icons/CallCenter";
import {useQuery,gql} from '@apollo/react-hooks'
import {PARTNER} from '../../GraphQL/Queries'
import axios from 'axios'
import swal from 'sweetalert';

//Popup variables
var popupText = "Error";
var popupHader = "Sorry!";

const PartnerWithUs =(props)=>{
  
  const [state,setState]=useState({error:null,show:false})
  const { error,loading,data } =useQuery(PARTNER)
  const [banner,getBanner]=useState({})
  const [partner,getPartner]=useState([])
  const [numbers,setNumber]=useState({visible:null,num:null})
  useEffect(() => {
    // console.log(loading)
    if(data){
      getBanner({
        ...banner,
        bg_image:data.partner.bg_image,
        partner_btn:data.partner.partner_btn,
        desc:data.partner.desc,
        res_desc:data.partner.res_desc
      })
      getPartner(data.partner.partner2)
      setNumber({
        ...numbers,
        visible:data.partner.numberVisiblePartner,
        num:data.partner.powerplayNumber
      })
    }
  }, [data])
  const handleClose=()=> {
    setState(
      {
        ...state,
        show: false,
      }
      );
      props.history.push("/");
  }

  const handleShow=()=> {
    setState({
      ...state,
      show: true,
    });
  }
  // componentDidMount() {
  //   window.scroll(0, 0);
  // }
  const [data1,setData]=useState({name:'',email:'',phone_number:'',message:''})
  const uploadData=async(e)=> {
    e.preventDefault();
    console.log(data1)
    const res=await axios.post('http://localhost:1337/contacts',data1)

    try{
      console.log(res.data)
      swal("Good job!", "We will contact you in a short while!", "success");
    }catch(err){
      swal("Error", "Please Fill out the form", "error");
    }
    // var name = document.getElementById("input-name").value;
    // var email = document.getElementById("input-email").value;
    // var phone = document.getElementById("input-number").value;
    // var business = "";
    // var message = document.getElementById("input-message").value;
    // if (email == "" || name == "" || phone == "") {
    //   alert("Please Fill out the form");
    //   return;
    // }
    // var data =
    //   "name=" +
    //   name +
    //   "&email=" +
    //   email +
    //   "&phone=" +
    //   phone +
    //   "&business=" +
    //   business +
    //   "&message=" +
    //   message;

    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    // var that = this;
    // xhr.addEventListener("readystatechange", function() {
    //   if (this.readyState === 4) {
    //     alert("We will contact you in a short while!");
    //     // popupText = "We will contact you in a short while!";
    //     // popupHader = "Successful!";
    //     // that.handleShow();
    //     that.props.history.push({
    //       pathname: "/",
    //     });
    //   }
    // });
    // xhr.open("POST", " https://" + Constants.URL_WEBSITE + "/public_api/partner.php");
    // xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    // xhr.send(data);
  }
  const isClient = typeof window !== 'undefined';
    const [viewportWidth, setWidth] = useState(800)
    useEffect(
        () => {
            if (isClient) {
                updateWindowDimensions();
                window.addEventListener('resize', updateWindowDimensions);
            }
            return () => {
                if (isClient) window.removeEventListener('resize', updateWindowDimensions);
            }
        }, []
    )
    const updateWindowDimensions = () => {
        setWidth(window.innerWidth);
    }
    const MOBILE_BREAKPOINT1 = 768;
    const isMobile1 = Boolean(viewportWidth <= MOBILE_BREAKPOINT1);
    
    const handleValue=(e)=>{
      if(e.target.value==""){
        setData({
          ...data1,
          [e.target.name]:e.target.value
        })
      }
      if(e.target.validity.valid){
        setData({
              ...data1,
              [e.target.name]:e.target.value
          })
      }
    }
    return (
      <>
        <Helmet>
          <title>Partner with Powerplay Systems</title>
          <meta
            name="description"
            content="We’re here to help you boost your business via using our contest platform. We look forward to hearing from you. Partner with us to increase your Gaming Revenue"
          />
        </Helmet>
        {/* <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {popupHader} </Modal.Title>
          </Modal.Header>
          <Modal.Body> {popupText}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}
        <Header />
        <DrawTimer />

        <div className="__partner-with-us">
          {
            Object.keys(banner).length>0?(
              <div className="__viewport" style={{backgroundImage:isMobile1?'transparent':`url(${banner.bg_image.url})`,backgroundRepeat:'no-repeat'}}>
                <div className="__container-2">
                  {/* <div className="__title">
                    Partner with{" "}
                    <span className="__primary">Powerplay Systems</span>
                  </div> */}
                  <div className="__subtitle">
                    {
                      isMobile1?(

                        <div   dangerouslySetInnerHTML={{ __html: banner.res_desc }}/>
                      ):(

                        <div   dangerouslySetInnerHTML={{ __html: banner.desc }}/>
                      )
                    }
                    {/* We’re here to help you boost your business via using our contest
                    platfrom. <br /> We look forward to hearing from you{" "} */}
                  </div>
                  {
                    banner.partner_btn?(
                      <button className="__btn">Partner With Us!</button>
                    ):<Fragment/>
                  }
                </div>
              </div>
            ):<Fragment/>
          }

          <div className="__main">
            <div className="__reverse-rotate">
              <div className="__container-2 __flex __sb">
                <div className="__left">
                  {
                    partner.map(item=>{
                      return (
                        <Fragment>
                          <img
                            className="img-responsive"
                            src={item.image.url}
                          />
                          <div>
                            <div className="__title">{item.title}</div>
                            <div>
                              {
                                item.values.map(val=>{
                                  return (
                                    <Fragment>
                                      - {val.values} <br/>
                                    </Fragment>
                                  )
                                })
                              }
                            </div>
                          </div>
                        </Fragment>
                      )
                    })
                  }
                  {/* <img
                    src={require("./../../assets/images/partner/interaction.png")}
                  />
                  <div>
                    <div className="__title">Customer Engagement</div>
                    <div>
                      - Engage your customers with an exciting interactive
                      experience. <br />- Tap into the Mobile generation
                    </div>
                  </div>

                  <img
                    className="img-responsive"
                    src={require("./../../assets/images/partner/megaphone.png")}
                  />
                  <div>
                    <div className="__title">Build Your Brand</div>
                    <div>
                      - Offering a contest has been proven to increase brand
                      awareness <br />- An email campaign is included with all
                      our interactive options
                    </div>
                  </div>

                  <img
                    className="img-responsive"
                    src={require("./../../assets/images/partner/excited.png")}
                  />
                  <div>
                    <div className="__title">Drive customers behavior</div>
                    <div>
                      - PowerPlays are very valuable to our games, you can use
                      this knowledge to drive customer actions (i.e. like us on
                      Facebook to obtain an extra PowerPlay) <br />- Live
                      In-game options are also available to increase
                      interaction.
                    </div>
                  </div> */}
                </div>
                <div className="__show-on-mediam __title">
                  We look forward to hearing from you{" "}
                </div>
                <form className="__right" onSubmit={(e)=>uploadData(e)}>
                  <div className="__input-field">
                    <label htmlFor="input-name">Name</label>
                    <input id="name" name="name"  type="text" required placeholder="Name*" onChange={(e)=> handleValue(e)} value={data1.name}/>
                  </div>
                  <div className="__input-field">
                    <label htmlFor="input-email">Email</label>
                    <input type="email" name="email" id="email" value={data1.email} placeholder="Email*" required pattern='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$' onChange={(e)=> handleValue(e)}/>
                  </div>
                  <div className="__input-field">
                    <label>Phone Number</label>
                    <input type="text" maxlength="10" value={data1.phone_number} pattern="[0-9]*"  name="phone_number" placeholder="Number" id="phone_number" onChange={(e)=> handleValue(e)}/>
                  </div>
                  <div className="__input-field">
                    <label htmlFor="input-message">Message</label>
                    <textarea id="message" name="message" type="text" rows={6} onChange={(e)=> handleValue(e)} value={data1.message}/>
                  </div>
                  <button className="__btn">Partner with us!</button>
                </form>
              </div>
              {
                numbers.visible?(
                <div className="__subtitle __primary __flex __flex-center" style={{marginTop:'5rem'}}>
                      <CallCenter />  {numbers.num}
                  </div>
                ):<Fragment/>
              }
            </div>
          </div>
        </div>
        <div />
        <Footer />
      </>
    );
  }


export default withRouter(PartnerWithUs);
