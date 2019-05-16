import React, { Component } from 'react';
import './index.css'
import $ from 'jquery';
import 'slick-carousel';
class ThirdSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            promoImages: []
        };
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        fetch("https://mypowerplaygames.com/api/images/read.php?type=promo")
            .then(res => res.json())
            .then((xx) => {
                this.setState({
                    promoImages: xx.records
                });
                $('#featured-games').slick({
                    dots: false,
                    infinite: true,
                    speed: 2500,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    slidesToShow: 1,
                    slidesToScroll: 1,

                    prevArrow: $('.fetured-left'),
                    nextArrow: $('.fetured-right'),
                });
            },
                (error) => {
                    this.setState({
                        error: error
                    });
                }
            )

    }
    render() {
        return (
            <div class="container-fluid featured-game">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1>Our Games</h1>
                            <div class="features-slide">
                                <div class="left-arrow fetured-left"><img src={require("./../../assets/images/featured-left.png")} class="img-responsive" /></div>
                                <div class="right-arrow fetured-right"><img src={require("./../../assets/images/featured-right.png")} class="img-responsive" /></div>
                                <div id="featured-games">

                                    {
                                        this.state.promoImages.map((img, key) => {
                                            return (
                                                <div class="iner-slide">
                                                    <img src={"https://mypowerplaygames.com/api/images/readimage.php?id=" + img.id} className="img-responsive" />
                                                </div>
                                                
                                            )
                                        })
                                    }

                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ThirdSlider;