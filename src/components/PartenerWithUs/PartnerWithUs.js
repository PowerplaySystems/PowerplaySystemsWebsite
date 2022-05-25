import React, { useEffect,useState,Fragment } from "react";
import {Helmet} from "react-helmet";
import { withRouter } from "react-router-dom";
import Header from "./../common/Header";
import Footer from "./../common/Footer";
import DrawTimer from "./../common/DrawTimer";
import * as Constants from "./../common/constants";
import "./PartnerWithUs.scss";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import CallCenter from "../../icons/CallCenter";
import {useQuery,gql} from '@apollo/react-hooks'
import {PARTNER} from '../../GraphQL/Queries'
import axios from 'axios'
import swal from 'sweetalert';
import bg from '../../assets/images/partner/bg.png';
import bgMobile from '../../assets/images/partner/bgMobile.png';
import li_tick from '../../assets/images/partner/li_tick.png';
import { getApi } from "../../config/environment";
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
  const [data1,setData]=useState({name:'',venue_name: '', email:'',phone_number:'',state: '', message:''})
  const uploadData=async(e)=> {
    e.preventDefault();
    console.log(data1)
    const res=await axios.post(`${getApi()}/api/v1/users/contacts`,data1)
    // const res=await axios.post('https://strapi.powerplaysystems.com/contacts',data1)

    try{
      console.log(res.data)
      swal("Good job!", "We will contact you in a short while!", "success");
    }catch(err){
      swal("Error", "Please Fill out the form", "error");
    }
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
        console.log("e",e.target.value, e.target.name, e.target.validity.valid);
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
    const mainPanelCSS = {
        backgroundImage: isMobile1 ? `url(${bgMobile})` : `url(${bg})`,
        backgroundColor: '#000',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: isMobile1 ? '0px 94px' : '0px 180px'
    };
    return (
      <>
        <Helmet>
          <title>Partner with Powered Bar Games</title>
          <meta
            name="description"
            content="We’re here to help you boost your business via using our contest platform. We look forward to hearing from you. Partner with us to increase your Gaming Revenue"
          />
        </Helmet>
        <Header />
        <DrawTimer />

        <div className="__partner-with-us" style={mainPanelCSS}>
          <div className="__main">
              <div className="__container">
                <div className="__left">
                  <h1>Let’s partner!</h1>
                  <p className="__sub_title">We provide everything you need to run a successful bar game and Power your revenue</p>
                  <ul>
                      <li>
                          <div className="__li_div">
                            <img src={li_tick} />
                            <div className="__title">Customer Engagement</div>
                          </div>
                          <p>Engage your customers with an exciting interactive experience</p>
                          <p>Tap into the Mobile generation</p>
                      </li>
                      <li>
                          <div className="__li_div">
                            <img src={li_tick} />
                            <div className="__title">Build your brand</div>
                          </div>
                          <p>Offering a contest has been proven to increase brand awareness</p>
                          <p>An email campaign is included with all our interactive options</p>
                      </li>
                  </ul>
                </div>
                <form className="__right" onSubmit={(e)=>uploadData(e)}>
                  <div className="__input-field">
                    <label htmlFor="input-name">Your Name</label><br />
                    <input id="name" name="name"  type="text" required onChange={(e)=> handleValue(e)} value={data1.name}/>
                  </div>
                  <div className="__input-field">
                    <label>Venue Name</label>
                    <input type="text" name="venue_name" id="venue_name" value={data1.venue_name} required onChange={(e)=> handleValue(e)}/>
                  </div>
                  <div className="__input-field">
                    <label>Email</label>
                    <input type="email" name="email" id="email"  required pattern='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$' onChange={(e)=> handleValue(e)}/>
                  </div>
                  <div className="__half">
                    <div className="__input-field">
                        <label>Phone / Cell Number</label>
                        <input type="text" maxlength="10" value={data1.phone_number} pattern="[0-9]*"  name="phone_number"  id="phone_number" onChange={(e)=> handleValue(e)}/>
                    </div>
                    <div className="__input-field">
                        <label>State / Province</label>
                        <input type="text" value={data1.state}  name="state"  id="state" onChange={(e)=> handleValue(e)}/>
                    </div>
                  </div>
                  <div className="__input-field">
                    <label htmlFor="input-message">Message</label>
                    <textarea id="message" name="message" type="text" rows={6} onChange={(e)=> handleValue(e)} value={data1.message}/>
                  </div>
                  <button className="__btn"><span>Let’s partner</span></button>
                </form>
              </div>
          </div>
        </div>
        <div />
        <Footer />
      </>
    );
  }


export default withRouter(PartnerWithUs);
