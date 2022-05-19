import React, { useEffect,useState,Fragment } from "react";
import {Helmet} from "react-helmet";
import "./ServicesNew.scss";
import Footer from "../common/Footer";
import Header from "../common/Header";
import img1 from "../../assets/images/services/bitmap@2x.jpg";
import bg from '../../assets/images/services/serviceBG.png';
import bgMobile from '../../assets/images/services/bgMobile.png';
import topRightImage from '../../assets/images/services/topRightImage.png';
import { Link } from "react-router-dom";
import CallCenter from "../../icons/CallCenter";
import img2 from "../../assets/images/services/bitmap.jpg";
import {useQuery,gql} from '@apollo/react-hooks'
import {SERVICES,PARTNER} from '../../GraphQL/Queries'
const Services = (props) => {

//   const { error,loading,data } =useQuery(SERVICES)
//   const data1 =useQuery(PARTNER)
//   const [banner,getBanner]=useState({})
//   const [partner,getPartner]=useState({})
//   const [list,getList]=useState([])
//   const [numbers,setNumber]=useState({visible:null,num:null})
//   useEffect(() => {
//       console.log("data", data);
//     if(data){
//       getBanner(data.service.banner)
//       getPartner(data.service.partner)
//       getList(data.service.list)
//     }
//   }, [data])
//   useEffect(()=>{
//     if(data1.data){
//       setNumber({
//         ...numbers,
//         visible:data1.data.partner.numberVisiblePartner,
//         num:data1.data.partner.powerplayNumber
//       })
//     }
//   },[data1.data])
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
    const MOBILE_BREAKPOINT2 = 375;
    const isMobile1 = Boolean(viewportWidth <= MOBILE_BREAKPOINT1);
    const isMobile2 = Boolean(viewportWidth <= MOBILE_BREAKPOINT2);
const mainPanelCSS = {
    backgroundImage: isMobile1 ? `url(${bgMobile})` : `url(${bg})`,
    backgroundColor: '#000',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
};
const dataList = [
    {
        title: 'Contest insurance',
        content: 'We provide a national insured prize of $1,000,000 plus individual bar prize of $100,000'
    },
    {
        title: 'Marketing materials',
        content: 'Posters and table top cards are all included'
    },
    {
        title: 'Custom Designs',
        content: 'Your solution will come customized with your logo and tag line'
    },
    {
        title: 'Consulting  Services',
        content: 'We offer our expertise to evaluate your bars performance and provide solutions to power your revenue'
    },
    {
        title: 'Powered Dashboard Analytics',
        content: 'Live game analytics where you can see how your games are performing with live revenue updates.'
    },
    {
        title: 'Lead Generation',
        content: 'We collect customers email and demographic information that is shared with bar owners'
    },
    {
        title: 'Fantasy Sports Tournaments',
        content: 'A sure fine winner, a select # of players compete in an elimination style tournament'
    },
    {
        title: 'Event Management',
        content: 'We also offer event management services. Call to see'
    }
];
  return (
    <div className="__Services" style={mainPanelCSS}>
     <Helmet>
        <title>Everything You Need To Power Your Gaming Revenue</title>
        <meta
          name="description"
          content="We've got the gaming industry covered - from Fantasy Sports, Lottery games, and Sports Betting we provide everything you need to Power your gaming revenue."
        />
      </Helmet>
      <Header />
      <div className="__main">
        <div className="__container">
            <div className="__topBanner">
                <div className="__left_text">
                    <h1>EVERYTHING YOU NEED</h1>
                    <p>We provide everything you need to run a successful bar game and Power your revenue</p>
                </div>
                <div className="__right_image">
                    <img src={topRightImage} />
                </div>
           </div>
           <div className="__data_list">
               <div className="__left_section">
                    {dataList && dataList.filter((item, index) => index < 4).map((item, index) => {
                        return (
                            <div className="__data_item">
                                <div className="__title_with_bullet">
                                    <div className="__bullet"></div>
                                    <div className="__title">{item.title}</div>
                                </div>
                                <div className="__content">{item.content}</div>
                            </div>
                        );
                    })}
               </div>
               <div className="__right_section">
                    {dataList && dataList.filter((item, index) => index >= 4).map((item, index) => {
                        return (
                            <div className="__data_item">
                                <div className="__title_with_bullet">
                                    <div className="__bullet"></div>
                                    <div className="__title">{item.title}</div>
                                </div>
                                <div className="__content">{item.content}</div>
                            </div>
                        );
                    })}
               </div>
           </div>
           <Link to="/" className="__service-btn-wrp">Contact us</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
