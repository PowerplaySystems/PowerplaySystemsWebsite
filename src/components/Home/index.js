import React, { Component } from 'react';
import './index.css'
import { withRouter } from 'react-router-dom';
import Header from './../common/Header'
import Footer from './../common/Footer'
import FirstSlider from './FirstSlider'
import SecondSlider from './SecondSlider'
import ThirdSlider from './ThirdSlider'
// import { connect } from 'react-redux';
import $ from 'jquery';
import 'slick-carousel';

class Home extends Component {

    componentDidMount() {
        $('._burger').click(function (e) {
            $('.nav-bar').slideToggle();
        });


        $('.zone-sel').click(function (e) {
            $(this).css('background', '#39b54a ');
            $(this).text('Selected')
            $(this).css('color', '#FFF');
        });
        $('#sports-slider').slick({
            dots: false,
            infinite: true,
            speed: 1000,
            autoplay: false,
            autoplaySpeed: 2500,
            slidesToShow: 4,
            slidesToScroll: 1,

            prevArrow: $('.sports-left'),
            nextArrow: $('.sports-right'),
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        });

    


        $('#main-slider').slick({
            dots: false,
            infinite: true,
            speed: 1500,
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,

            prevArrow: $('.main-left'),
            nextArrow: $('.main-right'),
        });

    }
    render() {
        return (
            <div>
                <Header />
                <FirstSlider />
                <SecondSlider history={this.props.history} />
                <ThirdSlider />
                <Footer />
            </div>
        );
    }
}

export default withRouter(Home);