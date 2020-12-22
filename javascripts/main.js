jQuery(document).ready(function($){

	var slidesWrapper = $('.cd-hero-slider');



	//check if a .cd-hero-slider exists in the DOM 

	if ( slidesWrapper.length > 0 ) {

		var primaryNav = $('.cd-primary-nav'),

			sliderNav = $('.cd-slider-nav'),

			navigationMarker = $('.cd-marker'),

			slidesNumber = slidesWrapper.children('li').length,

			visibleSlidePosition = 0,

			autoPlayId,

			autoPlayDelay = 300;



		//upload videos (if not on mobile devices)

		uploadVideo(slidesWrapper);



		//autoplay slider

		setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);



		//on mobile - open/close primary navigation clicking/tapping the menu icon

		primaryNav.on('click', function(event){

			if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');

		});

		

		//change visible slide

		sliderNav.on('click', 'li', function(event){

			event.preventDefault();

			var selectedItem = $(this);

			if(!selectedItem.hasClass('selected')) {

				// if it's not already selected

				var selectedPosition = selectedItem.index(),

					activePosition = slidesWrapper.find('li.selected').index();

				

				if( activePosition < selectedPosition) {

					nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);

				} else {

					prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);

				}



				//this is used for the autoplay

				visibleSlidePosition = selectedPosition;



				updateSliderNavigation(sliderNav, selectedPosition);

				updateNavigationMarker(navigationMarker, selectedPosition+1);

				//reset autoplay

				setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

			}

		});

	}



	function nextSlide(visibleSlide, container, pagination, n){

		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){

			visibleSlide.removeClass('is-moving');

		});



		container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');

		checkVideo(visibleSlide, container, n);

	}



	function prevSlide(visibleSlide, container, pagination, n){

		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){

			visibleSlide.removeClass('is-moving');

		});



		container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');

		checkVideo(visibleSlide, container, n);

	}



	function updateSliderNavigation(pagination, n) {

		var navigationDot = pagination.find('.selected');

		navigationDot.removeClass('selected');

		pagination.find('li').eq(n).addClass('selected');

	}



	function setAutoplay(wrapper, length, delay) {

		if(wrapper.hasClass('autoplay')) {

			clearInterval(autoPlayId);

			autoPlayId = window.setInterval(function(){autoplaySlider(length)}, delay);

		}

	}



	function autoplaySlider(length) {

		if( visibleSlidePosition < length - 1) {

			nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);

			visibleSlidePosition +=1;

		} else {

			prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);

			visibleSlidePosition = 0;

		}

		updateNavigationMarker(navigationMarker, visibleSlidePosition+1);

		updateSliderNavigation(sliderNav, visibleSlidePosition);

	}



	function uploadVideo(container) {

		container.find('.cd-bg-video-wrapper').each(function(){

			var videoWrapper = $(this);

			if( videoWrapper.is(':visible') ) {

				// if visible - we are not on a mobile device 

				var	videoUrl = videoWrapper.data('video'),

					video = $('<video loop><source src="../js/'+videoUrl+'.mp4" type="video/mp4" /><source src="../js/'+videoUrl+'.webm" type="video/webm" /></video>');

				video.appendTo(videoWrapper);

				// play video if first slide

				if(videoWrapper.parent('.cd-bg-video.selected').length > 0) video.get(0).play();

			}

		});

	}



	function checkVideo(hiddenSlide, container, n) {

		//check if a video outside the viewport is playing - if yes, pause it

		var hiddenVideo = hiddenSlide.find('video');

		if( hiddenVideo.length > 0 ) hiddenVideo.get(0).pause();



		//check if the select slide contains a video element - if yes, play the video

		var visibleVideo = container.children('li').eq(n).find('video');

		if( visibleVideo.length > 0 ) visibleVideo.get(0).play();

	}



	function updateNavigationMarker(marker, n) {

		marker.removeClassPrefix('item').addClass('item-'+n);

	}



	$.fn.removeClassPrefix = function(prefix) {

		//remove all classes starting with 'prefix'

	    this.each(function(i, el) {

	        var classes = el.className.split(" ").filter(function(c) {

	            return c.lastIndexOf(prefix, 0) !== 0;

	        });

	        el.className = $.trim(classes.join(" "));

	    });

	    return this;

	};

});

new BugController({'imageSprite':'./source/fly-sprite.png', 'minBugs': 2, 'maxBugs':2, 'mouseOver':'die'});


let teamInfo = [
	{
		img:'lynn.jpg',
		name:'Lynn Graham',
		title:'Co-Founder & CFO',
		alias:'Black Panther', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img: 'scott.jpg',
		name:'Scott Graham',
		title:'Co-Founder & COO',
		alias:'Wolfman', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img: 'michell.jpg',
		name:'Michell',
		title:'Director of Operations',
		alias:'Mom', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img:'matt.jpg',
		name:'Matt Lomonaco',
		title:'Creative Director',
		alias:'Diablo Rojo', 
		spirit:'Llama',
		meal:'Pepperoni and black olive pizza',
		movie:'The Shining',
		talent:'Smouldering',
		quote:'"No such thing as spare time, no such thing as free time, no such thing as down time, All you got is life time." -Henry Rollins',
		holiday: 'I\'d make Halloween two days long.',
		famous:'Patrick Swayze because I\'m unashamedly crazy for Swayze, Maybe Henry Rollins or Stone Cold Steve Austin or John Carpenter.',
		moviemonth:'Point Break (1991) or the first 20 minutes of Mandy',
		food:'Ketchup',
		motto:'"I Don\'t Like Large Groups"',
		animal:'The Mastadon'
	},
	{
		img: 'whitney.jpg',
		name:'Whitney Murillo',
		title:'Director of Global Sourcing',
		alias:'Bruja', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img: 'alyssa.jpg',
		name:'Alyssa Sosniecki',
		title:'Biz Dev Ninja',
		alias:'Moana', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img: 'jenny.jpg',
		name:'Jenny Page',
		title:'Sourcing Ninja',
		alias:'Wonder Woman', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img:'dena.jpg',
		name:'Dena Wood',
		title:'Graphic Design Ninja',
		alias:'Yeezy', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img: 'chris.jpg',
		name:'Chris Perkins',
		title:'Graphic Design Ninja',
		alias:'Twerkin', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img: 'grace.jpg',
		name:'Michell Velasquez',
		title:'Graphic Design Ninja',
		alias:'Hug-a-Lot', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img:'santi.jpg',
		name:'Santi Soto',
		title:'Graphic Design Ninja',
		alias:'El Cocinero', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img: 'mae.jpg',
		name:'Mae Elis',
		title:'Graphic Design Ninja',
		alias:'The Wild Card', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img: 'juan.jpg',
		name:'Juan Aguinaga',
		title:'Graphic Design Ninja',
		alias:'Mando', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img:'ryan.jpg',
		name:'Ryan Harlow',
		title:'Full-Stack Webstore Developer',
		alias:'The Codeslinger', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img: 'brittany.jpg',
		name:'Brittany Janak',
		title:'Sr. Account Manager',
		alias:'The Machine', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img: 'caitlin.jpg',
		name:'Caitlin Ponsford',
		title:'Sr. Account Manager',
		alias:'Phone Voice', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img:'simone.jpg',
		name:'Simone Artis',
		title:'Technical Design Ninja',
		alias:'The Assassin', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img: 'christy.jpg',
		name:'Christy Stites',
		title:'Operations Manager',
		alias:'Rando', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img: 'tony.jpg',
		name:'Tony Franjich',
		title:'Warehouse Manager',
		alias:'Scarface', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	},
	{
		img:'maria.jpg',
		name:'Maria',
		title:'Packaging and QC Manager',
		alias:'La Reina', 
		spirit:'wolf',
		meal:'lorem',
		movie:'lorem',
		talent:'lorem',
		quote:'lorem',
		holiday:'lorem',
		famous:'lorem',
		moviemonth:'lorem',
		food:'lorem',
		motto:'lorem',
		animal:'The Mastadon'
	}

]


// Get the modal
var modal = document.getElementById("profile-modal");
            
// Get the button that opens the modal
var btnArr = document.querySelectorAll('.profile-button');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
for(let i = 0; i < btnArr.length; i++){ 

let btn = btnArr[i]

btn.onclick = function(e) {
  let btnIndex = e.target.getAttribute('data-index')
  showModal(btnIndex);
}
}

function showModal(index){
	console.log(index);

	document.querySelector('#title-answer').textContent = teamInfo[index].title;
	document.querySelector('#name-answer').textContent = teamInfo[index].name;
	document.querySelector('#alias-answer').textContent = teamInfo[index].alias;
	document.querySelector('#spirit-answer').textContent = teamInfo[index].spirit;
	document.querySelector('#meal-answer').textContent = teamInfo[index].meal;
	document.querySelector('#movie-answer').textContent = teamInfo[index].movie;
	document.querySelector('#talent-answer').textContent = teamInfo[index].talent;
	document.querySelector('#quote-answer').textContent = teamInfo[index].quote;
	document.querySelector('#holiday-answer').textContent = teamInfo[index].holiday;
	document.querySelector('#famous-answer').textContent = teamInfo[index].famous;
	document.querySelector('#moviemonth-answer').textContent = teamInfo[index].moviemonth;
	document.querySelector('#food-answer').textContent = teamInfo[index].food;
	document.querySelector('#motto-answer').textContent = teamInfo[index].motto;
	document.querySelector('#animal-answer').textContent = teamInfo[index].animal;

	document.querySelector('.modal-img').src = `source/team/${teamInfo[index].img}`;

	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
	modal.style.display = "none";
  }
}