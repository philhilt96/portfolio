// Cache images
let imageSources = ["bulbs.jpg","church.jpg","clematis.jpg","flowers.jpg","house.jpg","rhubarb.jpg","trees.jpg","wall-garden.jpg"];
let cachedImages = [];
imageSources.forEach(function(img){
	cachedImages.push(new Image());
})
cachedImages.forEach(function(img, index){
	img.src = `images/${imageSources[index]}`;
})

// flip menu button on click and change menu position
let menu = document.querySelector('#menu');
let menuBtn = document.querySelector("#menu-open");

menuBtn.addEventListener('click', function(e) {
	if(menuBtn.style.transform == '') {
		menuBtn.style.transform = 'scaleX(-1)';
		menu.style.right = '0px'
	} else {
		menuBtn.style.transform = '';
		menu.style.right = '-300px'
	}

	e.preventDefault();
})

// remove message
let message = document.querySelector('.message');
let closeMessage = document.querySelector('#close-message');

window.setTimeout(function() {
	message.remove()
}, 7000)

closeMessage.addEventListener('click', function() {
	message.remove();
})

// toggle button animations
let toggler = document.querySelectorAll('.toggle-btn');

toggler.forEach(function(el) {
	el.addEventListener('click', function() {
		if(el.style.left == '' || el.style.left == '0px') {
			el.style.left = '20px';
		} else {
			el.style.left = '0px';
		}
	})
})

// Image gallery
let focusImage = document.querySelector('.focus-image');
let previewBarArr = Array.from(document.querySelector('.preview-bar').children);
let placeholder = document.querySelector('#placeholder-place');
let arrowLeft = document.querySelector('#arrow-left');
let arrowRight = document.querySelector('#arrow-right');
let galleryToggle = document.querySelector('#gallery-toggle');
let galleryToggleCount = 0;
let place = 1;

// Set focus image
function setImage(num) {
	previewBarArr.forEach(function(el) {
		let div = document.createElement('div');
		div.setAttribute('class', 'overlay');
		el.appendChild(div);
		// Add overlays on preview bar
		if(place === parseInt(el.firstElementChild.id)) {
			focusImage.src = el.firstElementChild.src;
			el.lastElementChild.remove();
			placeholder.innerText = `${place}/5`;
		}
	});
}

// Remove overlays so they don't stack
function removeOverlay(num) {
	previewBarArr.forEach(function(el) {
		if(el.children.length > 1) {
			el.lastElementChild.remove();
		}
	})
}

// Function to handle image change
function changeImage(num) {
	if(num === 0) {
		place = 5;
	} else if(num === 6) {
		place = 1;
	}
	removeOverlay(num);
	setImage(num);
}
// Set Default focus image 
setImage(place);

// Event listeners for arrows
arrowLeft.addEventListener('click', function() {
	place--;
	changeImage(place);
})

arrowRight.addEventListener('click', function() {
	place++;
	changeImage(place);
})

// Set focus image when clicking on preview
previewBarArr.forEach(function(el) {
	el.addEventListener('click', function(e) {
		place = parseInt(e.target.parentElement.firstElementChild.id);
		changeImage(place);
	})
})

// Auto scroll
galleryToggle.addEventListener('click', function() {
	if(galleryToggleCount === 0) {
		galleryToggleCount++;
	} else if(galleryToggleCount === 1) {
		galleryToggleCount--;
	}
	toggleGallery(galleryToggleCount);
})

function toggleGallery(num) {
	let autoScoll;
	if(num === 1) {
		autoScroll = setInterval(function() {
			place++;
			changeImage(place);
		}, 3000);
	} else if(num === 0) {
		clearInterval(autoScroll);
	}
}

// Image zoom effect
let lense = document.querySelector('.zoom-lense');
let lenseWidth = lense.offsetWidth;
let lenseHeight = lense.offsetHeight;
let zoomPicture = document.querySelector('.zoom-picture');
let zoomPictureWidth = zoomPicture.offsetWidth;
let zoomPictureHeight = zoomPicture.offsetHeight;
let zoomPreview = document.querySelector('.zoom-preview');
// ratio between preview and lense
let ratioX = zoomPreview.offsetWidth/lenseWidth;
let ratioY = zoomPreview.offsetHeight/lenseHeight;
// set background image on preview
zoomPreview.style.backgroundImage = `url('${zoomPicture.firstElementChild.src}')`;
zoomPreview.style.backgroundSize = `${zoomPictureWidth*ratioX}px ${zoomPictureHeight*ratioY}px`;
// function to get cursor position
function getCursor(e) {
	let rect = zoomPicture.getBoundingClientRect();
	let x = e.pageX - rect.left;
	let y = e.pageY - rect.top;
	// Subtract scrolling
	x = x - window.pageXOffset;
	y = y - window.pageYOffset;
	return {
		x : x,
		y : y
	};
}
// function for lense to follow cursor
function followCursor(e) {
	let position = getCursor(e);
	let x = position.x - (lenseWidth/2);
	let y = position.y - (lenseHeight/2);
	// prevent lense form leaving container
	if(x > zoomPictureWidth-lenseWidth) {
		x = zoomPictureWidth - lenseWidth;
	}
	if(x < 0) {
		x = 0;
	}
	if(y > zoomPictureHeight-lenseHeight) {
		y = zoomPictureHeight-lenseHeight;
	}
	if(y < 0){
		y = 0;
	}
	lense.style.left = `${x}px`;
	lense.style.top = `${y}px`;
	// change background of preview to lense
	zoomPreview.style.backgroundPosition = `-${x*ratioX}px -${y*ratioY}px`;

	e.preventDefault()
}

zoomPicture.addEventListener('mousemove',followCursor);

// Text Animations
let runBtn = document.querySelector('#run-animation');
let animationOption = document.querySelector('#animation-options');
let placeholderHeader = document.querySelector('#animation-header');
let placeholderParagraph = document.querySelector('#animation-paragraph');

function setTextAnimation(name) {
	placeholderHeader.style.animationName = name;
	placeholderParagraph.style.animationName = name;
}

runBtn.addEventListener('click',function(e) {
	let optionText = animationOption.options[animationOption.selectedIndex].text;
	if(optionText === 'Fade-in') {
		setTextAnimation('fade-in');
	}
	if(optionText === 'Slide-in') {
		setTextAnimation('slide-in');
	}
	if(optionText === 'Slide-up') {
		setTextAnimation('slide-up');
	}
	console.log(optionText);

	e.preventDefault();
})

// Dark Mode and enlarge text
let otherTextBox = document.querySelector('#other-text-box');
let otherHeader = document.querySelector('#other-header');
let otherParagraph = document.querySelector('#other-paragraph');
let darkToggle = document.querySelector('#dark-mode-toggle');
let darkToggleCount = 0;
let enlargeToggle = document.querySelector('#enlarge-text-toggle');
let enlargeToggleCount = 0;

darkToggle.addEventListener('click', function(){
	if(darkToggleCount === 0) {
		otherHeader.style.color = '#fff';
		otherParagraph.style.color = '#fff';
		otherTextBox.style.background = '#404040'
		darkToggleCount++;
	} else {
		otherHeader.style.color = '#404040';
		otherParagraph.style.color = '#404040';
		otherTextBox.style.background = '#fff'
		darkToggleCount--;
	}
	console.log(darkToggleCount);
});

enlargeToggle.addEventListener('click', function(){
	if(enlargeToggleCount === 0) {
		otherHeader.style.fontSize = '2.5rem';
		otherParagraph.style.fontSize = '1.5rem';
		enlargeToggleCount++;
	} else {
		otherHeader.style.fontSize = '2rem';
		otherParagraph.style.fontSize = '1.25rem';
		enlargeToggleCount--;
	}
	console.log(enlargeToggleCount);
});

