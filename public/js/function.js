// JavaScript Document
$(document).ready(function (e) {
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




	/*****Select Games ****/
	$('.game_rules_tables th').click(function (e) {
		$('.game_rules_tables th').not(this).removeClass('active_rules');
		$(this).addClass('active_rules');
	});
	$('.howbtn').click(function (e) {
		$('.howbtn').not(this).removeClass('how_btn_active');
		$(this).addClass('how_btn_active');
	});

	$('#change-sports').slick({
		dots: false,
		infinite: true,
		speed: 1500,
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,

		prevArrow: $('.change-left'),
		nextArrow: $('.change-right'),

	});


	$('#game-top-slider').slick({
		dots: false,
		infinite: true,
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.slider-nav,.slider-for',

		prevArrow: $('.game-left'),
		nextArrow: $('.game-right'),
	});

	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		asNavFor: '.slider-nav',
		arrows: false,
	});


	$('.slider-nav').slick({
		slidesToShow: 1,
		autplay: false,
		slidesToScroll: 1,
		asNavFor: '.slider-for, #game-top-slider',
		dots: false,
		fade: true,
		focusOnSelect: false,

		prevArrow: $('.change-left'),
		nextArrow: $('.change-right'),
	});

	$('#featured-video-slider .featured-video-slider-main-content').slick({
		dots: true,
		arrows: false,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		speed: 800,
		slidesToShow: 4,
		adaptiveHeight: false,
		nextArrow: '<i class="fa fa-angle-right"></i>',
		prevArrow: '<i class="fa fa-angle-left"></i>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
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





});
