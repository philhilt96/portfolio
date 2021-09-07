const toggle = document.querySelector('.toggler');

toggle.addEventListener('click', slideToggler);

let toggleCount = 0;

// Cache background images to avoid white flash
let backgroundSources = ["images/background.svg", "images/background2.svg"];
let backgroundImages = [];
backgroundSources.forEach(function(img){
	backgroundImages.push(new Image());
})
backgroundImages.forEach(function(img, index){
	img.src = backgroundSources[index];
})

let home = document.getElementById('home');

// Function to slide background and change logo/button color on toggle 
function slideToggler() {
	if(toggleCount === 0) {
		home.style.backgroundImage = `url(${backgroundImages[1].src})`;
		home.classList.add('background-fade-in');
		home.classList.remove('background-fade-out');
		toggle.style.marginLeft = '20px';
		toggleCount++;
		document.querySelector('#logo').src = ('images/logo-2.svg');
		document.querySelector('#email-btn').style.background = '#8353ef';
	} else {
		home.style.backgroundImage = `url(${backgroundImages[0].src})`;
		home.classList.add('background-fade-out');
		home.classList.remove('background-fade-in');
		toggle.style.marginLeft = '0px';
		toggleCount--;
		document.querySelector('#logo').src = ('images/logo.svg');
		document.querySelector('#email-btn').style.background = '#e79810';
	}
}

// Keep nav stick when scrolling and underline nav links
let nav = document.querySelector('nav');
let navList = document.querySelectorAll('li');

document.addEventListener('scroll',function(e){
	if(document.documentElement.scrollTop >= window.innerHeight) {
		nav.style.position = 'fixed';
	} else {
		nav.style.position = 'absolute';
	}
	if(document.documentElement.scrollTop > 0 && document.documentElement.scrollTop < (window.innerHeight + (document.querySelector('#about').offsetHeight / 2))) {
		navList[0].style.textDecoration = 'underline';
		navList[1].style.textDecoration = 'none';
		navList[2].style.textDecoration = 'none';
	} else if(document.documentElement.scrollTop >= (window.innerHeight + (document.querySelector('#about').offsetHeight / 2)) && document.documentElement.scrollTop < window.innerHeight + document.querySelector('#about').offsetHeight + (document.querySelector('#work').offsetHeight / 2)){
		navList[0].style.textDecoration = 'none';
		navList[1].style.textDecoration = 'underline';
		navList[2].style.textDecoration = 'none';
	} else {
		navList[0].style.textDecoration = 'none';
		navList[1].style.textDecoration = 'none';
		navList[2].style.textDecoration = 'underline';
	}
})

// Slide projects when clicking arrows on somaller screens
let leftArrow = document.querySelector('#left-arrow');
let rightArrow = document.querySelector('#right-arrow');
let projects = document.querySelector('.projects');

rightArrow.addEventListener('click', function(){
	if(projects.style.left == '0px' || projects.style.left == '') {
		projects.style.left = '-100vw';
		leftArrow.style.display = 'initial';
	} else if(projects.style.left == '-100vw') {
		projects.style.left = '-200vw';
		rightArrow.style.display = 'none';
	}
})

leftArrow.addEventListener('click', function(){
	if(projects.style.left == '-200vw'){
		projects.style.left = '-100vw';
		rightArrow.style.display = 'initial';
	} else if(projects.style.left == '-100vw'){
		projects.style.left = '0';
		leftArrow.style.display = 'none';
	}
})