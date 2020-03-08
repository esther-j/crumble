/* 
Adapted variation of:
Source Credit: https://codepen.io/bmarcelino/pen/vRYPXV 
*/

// JavaScript Document
document.addEventListener("DOMContentLoaded", function(event) {

	function stackedCards () {

		var stackedOptions = 'Top'; //Change stacked cards view from 'Bottom', 'Top' or 'None'.
		var rotate = true; //Activate the elements' rotation for each move on stacked cards.
		var items = 3; //Number of visible elements when the stacked options are bottom or top.
		var elementsMargin = 10; //Define the distance of each element when the stacked options are bottom or top.
		var useOverlays = true; //Enable or disable the overlays for swipe elements.
		var maxElements; //Total of stacked cards on DOM.
		var currentPosition = 0; //Keep the position of active stacked card.
		var velocity = 0.3; //Minimum velocity allowed to trigger a swipe.
		var topObj; //Keep the swipe top properties.
		var rightObj; //Keep the swipe right properties.
		var leftObj; //Keep the swipe left properties.
		var listElNodesObj; //Keep the list of nodes from stacked cards.
		var listElNodesWidth; //Keep the stacked cards width.
		var currentElementObj; //Keep the stacked card element to swipe.
		var stackedCardsObj;
		var isFirstTime = true;
		var elementHeight;
		var obj;
		var elTrans;
		var count = 0;
		var userSelections = [];
		
		obj = document.getElementById('stacked-cards-block');
		stackedCardsObj = obj.querySelector('.stackedcards-container');
		listElNodesObj = stackedCardsObj.children;
		
		// topObj = obj.querySelector('.stackedcards-overlay.top');
		rightObj = obj.querySelector('.stackedcards-overlay.right');
		leftObj = obj.querySelector('.stackedcards-overlay.left');
		
		countElements();
		currentElement();
		listElNodesWidth = stackedCardsObj.offsetWidth;
		currentElementObj = listElNodesObj[0];
		updateUi();
		
		//Prepare elements on DOM
		addMargin = elementsMargin * (items -1) + 'px';
		
		if(stackedOptions === "Top"){
	
			for(i = items; i < maxElements; i++){
				listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');
			}
			
			elTrans = elementsMargin * (items - 1);
			
			stackedCardsObj.style.marginBottom = addMargin;
			
		} else if(stackedOptions === "Bottom"){
			
			
			for(i = items; i < maxElements; i++){
				listElNodesObj[i].classList.add('stackedcards-bottom', 'stackedcards--animatable', 'stackedcards-origin-bottom');
			}
			
			elTrans = 0;
			
			stackedCardsObj.style.marginBottom = addMargin;
			
		} else if (stackedOptions === "None"){
			
			for(i = items; i < maxElements; i++){
				listElNodesObj[i].classList.add('stackedcards-none', 'stackedcards--animatable');
			}
			
			elTrans = 0;
		
		}
			
		for(i = items; i < maxElements; i++){
			listElNodesObj[i].style.zIndex = 0;
			listElNodesObj[i].style.opacity = 0;
			listElNodesObj[i].style.webkitTransform ='scale(' + (1 - (items * 0.04)) +') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
			listElNodesObj[i].style.transform ='scale(' + (1 - (items * 0.04)) +') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
		}
		
		if(listElNodesObj[currentPosition]){
			listElNodesObj[currentPosition].classList.add('stackedcards-active');
		}
		
		if(useOverlays){
			leftObj.style.transform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
			leftObj.style.webkitTransform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
			
			rightObj.style.transform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
			rightObj.style.webkitTransform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
						
		} else {
			leftObj.className = '';
			rightObj.className = '';
			
			leftObj.classList.add('stackedcards-overlay-hidden');
			rightObj.classList.add('stackedcards-overlay-hidden');
		}
		
		//Remove class init
		setTimeout(function() {
			obj.classList.remove('init');
		},150);
		
		
		function backToMiddle() {
	
			removeNoTransition();
			transformUi(0, 0, 1, currentElementObj); 
	
			if(useOverlays){
				transformUi(0, 0, 0, leftObj);
				transformUi(0, 0, 0, rightObj);
			}
	
			setZindex(5);
	
			if(!(currentPosition >= maxElements)){
				//roll back the opacity of second element
				if((currentPosition + 1) < maxElements){
					listElNodesObj[currentPosition + 1].style.opacity = '.8';
				}
			}
		};
		
		// Usable functions
		function countElements() {
			maxElements = listElNodesObj.length;
			if(items > maxElements){
				items = maxElements;
			}
		};
		
		//Keep the active card.
		function currentElement() {
		  currentElementObj = listElNodesObj[currentPosition];  
		};
		
		//Functions to swipe left elements on logic external action.
		function onActionLeft() {
			if(!(currentPosition >= maxElements)){
				if(useOverlays) {
					leftObj.classList.remove('no-transition');
					leftObj.style.zIndex = '8';
					transformUi(0, 0, 1, leftObj);
	
				}
				
				setTimeout(function() {
					onSwipeLeft();
					resetOverlayLeft();
				},300);
			}
		};
		
		//Functions to swipe right elements on logic external action.
		function onActionRight() {
			if(!(currentPosition >= maxElements)){
				if(useOverlays) {
					rightObj.classList.remove('no-transition');
					rightObj.style.zIndex = '8';
					transformUi(0, 0, 1, rightObj);
				}
	
				setTimeout(function(){
					onSwipeRight();
					resetOverlayRight();
				},300);
			}
		};
		
		//Swipe active card to left.
		function onSwipeLeft() {
			removeNoTransition();
			transformUi(-1000, 0, 0, currentElementObj);
			if(useOverlays){
				transformUi(-1000, 0, 0, leftObj); //Move leftOverlay
				resetOverlayLeft();
			}
			currentPosition = currentPosition + 1;
			updateUi();
			currentElement();
			setActiveHidden();
			changePage();


		};
		
		//Swipe active card to right.
		function onSwipeRight() {
			removeNoTransition();
			transformUi(1000, 0, 0, currentElementObj);
			if(useOverlays){
				transformUi(1000, 0, 0, rightObj); //Move rightOverlay
				resetOverlayRight();
			}

			// keep track of user selections
			var data = JSON.parse(sessionStorage.results);
			userSelections.push(data.businesses[currentPosition]);
			currentPosition = currentPosition + 1;
			updateUi();
			currentElement();
			setActiveHidden();
			changePage();

		};
		
		//Remove transitions from all elements to be moved in each swipe movement to improve perfomance of stacked cards.
		function removeNoTransition() {
			if(listElNodesObj[currentPosition]){
				
				if(useOverlays) {
					leftObj.classList.remove('no-transition');
					rightObj.classList.remove('no-transition');
				}
				
				listElNodesObj[currentPosition].classList.remove('no-transition');
				listElNodesObj[currentPosition].style.zIndex = 6;
			}
			
		};
	
		//Move the overlay left to initial position.
		function resetOverlayLeft() {
			if(!(currentPosition >= maxElements)){
				if(useOverlays){
					setTimeout(function(){
						
						if(stackedOptions === "Top"){
							
							elTrans = elementsMargin * (items - 1);
						
						} else if(stackedOptions === "Bottom" || stackedOptions === "None"){
							
							elTrans = 0;
						
						}
						
						if(!isFirstTime){
							
							leftObj.classList.add('no-transition');
							
						}
						
						requestAnimationFrame(function(){
							
							leftObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							leftObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							leftObj.style.opacity = '0';
						
						});
						
					},300);
					
					isFirstTime = false;
				}
			}
	   };
	   
		//Move the overlay right to initial position.
		function resetOverlayRight() {
			if(!(currentPosition >= maxElements)){
				if(useOverlays){
					setTimeout(function(){
						
						if(stackedOptions === "Top"){+2
							
							elTrans = elementsMargin * (items - 1);
						
						} else if(stackedOptions === "Bottom" || stackedOptions === "None"){
							
							elTrans = 0;
						
						}
						
						if(!isFirstTime){
							
							rightObj.classList.add('no-transition');
							
						}
						
						requestAnimationFrame(function(){
							
							rightObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							rightObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							rightObj.style.opacity = '0';
						
						});
	
					},300);
					
					isFirstTime = false;
				}
			}
	   };
	   
		//Move the overlays to initial position.
		function resetOverlays() {
			if(!(currentPosition >= maxElements)){
				if(useOverlays){
	
					setTimeout(function(){
						if(stackedOptions === "Top"){
							
							elTrans = elementsMargin * (items - 1);
						
						} else if(stackedOptions === "Bottom" || stackedOptions === "None"){
	
							elTrans = 0;
	
						}
						
						if(!isFirstTime){
	
							leftObj.classList.add('no-transition');
							rightObj.classList.add('no-transition');
							// topObj.classList.add('no-transition');
	
						}
						
						requestAnimationFrame(function(){
	
							leftObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							leftObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							leftObj.style.opacity = '0';
							
							rightObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							rightObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
							rightObj.style.opacity = '0';

						});
	
					},300);	// wait for animations time
					
					isFirstTime = false;							
				}
			}
	   };
		
		function setActiveHidden() {
			if(!(currentPosition >= maxElements)){
				listElNodesObj[currentPosition - 1].classList.remove('stackedcards-active');
				listElNodesObj[currentPosition - 1].classList.add('stackedcards-hidden');
				listElNodesObj[currentPosition].classList.add('stackedcards-active');
			}		 
		};
	
		//Set the new z-index for specific card.
		function setZindex(zIndex) {
			if(listElNodesObj[currentPosition]){
				listElNodesObj[currentPosition].style.zIndex = zIndex;
			}		 
		};
	
    // Remove element from the DOM after swipe. To use this method you need to call this function in onSwipeLeft, onSwipeRight and onSwipeTop and put the method just above the variable 'currentPosition = currentPosition + 1'. 
    //On the actions onSwipeLeft, onSwipeRight and onSwipeTop you need to remove the currentPosition variable (currentPosition = currentPosition + 1) and the function setActiveHidden

	function removeElement() {

      currentElementObj.remove();
      if(!(currentPosition >= maxElements)){
				listElNodesObj[currentPosition].classList.add('stackedcards-active');
			}		
		};
		
		//Add translate X and Y to active card for each frame.
		function transformUi(moveX,moveY,opacity,elementObj) {
			requestAnimationFrame(function(){  
				var element = elementObj;
				
				// Function to generate rotate value 
				function RotateRegulator(value) {
				   if(value/10 > 15) {
					   return 15;
				   }
				   else if(value/10 < -15) {
					   return -15;
				   }
				   return value/10;
				}
				
				if(rotate){
					rotateElement = RotateRegulator(moveX);
				} else {
					rotateElement = 0;
				}
				
				if(stackedOptions === "Top"){
					elTrans = elementsMargin * (items - 1);
					if(element){     
						element.style.webkitTransform = "translateX(" + moveX + "px) translateY(" + (moveY + elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
						element.style.transform = "translateX(" + moveX + "px) translateY(" + (moveY + elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
						element.style.opacity = opacity;
					}
				} else if(stackedOptions === "Bottom" || stackedOptions === "None"){
					
					if(element){
						element.style.webkitTransform = "translateX(" + moveX + "px) translateY(" + (moveY) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
						element.style.transform = "translateX(" + moveX + "px) translateY(" + (moveY) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
						element.style.opacity = opacity;
					}
				
				}
			});	  
		};

		//Change link to next page if all the elements have been swiped
		function changePage() {

			if (currentPosition == maxElements) {
				sessionStorage.selections = JSON.stringify(userSelections);
				document.location.href = "finish.html";
			}
		}

	
		//Action to update all elements on the DOM for each stacked card.
		function updateUi() {
			requestAnimationFrame(function(){
				elTrans = 0;
				var elZindex = 5;
				var elScale = 1;
				var elOpac = 1;
				var elTransTop = items;
				var elTransInc = elementsMargin;
	
				for(i = currentPosition; i < (currentPosition + items); i++){
					if(listElNodesObj[i]){
						if(stackedOptions === "Top"){
	
							listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');
	
							if(useOverlays){
								leftObj.classList.add('stackedcards-origin-top');
								rightObj.classList.add('stackedcards-origin-top');
							}
	
							elTrans = elTransInc * elTransTop;
							elTransTop--;
	
						} else if(stackedOptions === "Bottom"){
							listElNodesObj[i].classList.add('stackedcards-bottom', 'stackedcards--animatable', 'stackedcards-origin-bottom');
	
							if(useOverlays){
								leftObj.classList.add('stackedcards-origin-bottom');
								rightObj.classList.add('stackedcards-origin-bottom');
							}
	
							elTrans = elTrans + elTransInc;
	
						} else if (stackedOptions === "None"){
	
							listElNodesObj[i].classList.add('stackedcards-none', 'stackedcards--animatable');
							elTrans = elTrans + elTransInc;
	
						}
	
						listElNodesObj[i].style.transform ='scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
						listElNodesObj[i].style.webkitTransform ='scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
						listElNodesObj[i].style.opacity = elOpac;
						listElNodesObj[i].style.zIndex = elZindex;
	
						elScale = elScale - 0.04;
						elOpac = elOpac - (1 / items);
						elZindex--;
					}
				}
	
			});
		  
		};
	
		//Touch events block
		var element = obj;
		var startTime;
		var startX;
		var startY;
		var translateX;
		var translateY;
		var currentX;
		var currentY;
		var touchingElement = false;
		var timeTaken;
		var topOpacity;
		var rightOpacity;
		var leftOpacity;
	
		function setOverlayOpacity() {
	
			rightOpacity = translateX / 100;
			leftOpacity = ((translateX / 100) * -1);

	
			if(rightOpacity > 1) {
				rightOpacity = 1;
			}
	
			if(leftOpacity > 1) {
				leftOpacity = 1;
			}
		}
		
		function gestureStart(evt) {
			startTime = new Date().getTime();
			
			startX = evt.changedTouches[0].clientX;
			startY = evt.changedTouches[0].clientY;
			
			currentX = startX;
			currentY = startY;
	
			setOverlayOpacity();
			
			touchingElement = true;
			if(!(currentPosition >= maxElements)){
				if(listElNodesObj[currentPosition]){
					listElNodesObj[currentPosition].classList.add('no-transition');
					setZindex(6);
					
					if(useOverlays){
						leftObj.classList.add('no-transition');
						rightObj.classList.add('no-transition');
					}
					
					if((currentPosition + 1) < maxElements){
						listElNodesObj[currentPosition + 1].style.opacity = '1';
					}
					
					elementHeight = listElNodesObj[currentPosition].offsetHeight / 3;
				}
	
			}
			
		};
		
		function gestureMove(evt) {
			currentX = evt.changedTouches[0].pageX;
			currentY = evt.changedTouches[0].pageY;
			
			translateX = currentX - startX;
			translateY = currentY - startY;
	
			setOverlayOpacity();
			
			if(!(currentPosition >= maxElements)){
				evt.preventDefault();
				transformUi(translateX, translateY, 1, currentElementObj);
	
				if(useOverlays){
	
					if(translateX < 0){
						transformUi(translateX, translateY, leftOpacity, leftObj);
						transformUi(0, 0, 0, rightObj);
	
					} else if(translateX > 0){
						transformUi(translateX, translateY, rightOpacity, rightObj);
						transformUi(0, 0, 0, leftObj);
					}
	
					if(useOverlays){
						leftObj.style.zIndex = 8;
						rightObj.style.zIndex = 8;
					}
	
				}
	
			}
			
		};
		
		function gestureEnd(evt) {
			
			if(!touchingElement){
				return;
			}
			
			translateX = currentX - startX;
			translateY = currentY - startY;
			
			timeTaken = new Date().getTime() - startTime;
			
			touchingElement = false;
			
			if(!(currentPosition >= maxElements)){
				if(!(translateY < (elementHeight * -1) && translateX > ((listElNodesWidth / 2) * -1) && translateX < (listElNodesWidth / 2))){
					if(translateX < 0){
						if(translateX < ((listElNodesWidth / 2) * -1) || (Math.abs(translateX) / timeTaken > velocity)){ // Did It Move To Left?
							onSwipeLeft();
						} else {
							backToMiddle();
						}
					} else if(translateX > 0) {
						
						if (translateX > (listElNodesWidth / 2) && (Math.abs(translateX) / timeTaken > velocity)){ // Did It Move To Right?
							onSwipeRight();
						} else {
							backToMiddle();
						}
	
					}
				}
			}
		};
		
		element.addEventListener('touchstart', gestureStart, false);
		element.addEventListener('touchmove', gestureMove, false);
		element.addEventListener('touchend', gestureEnd, false);
		
		//Add listeners to call global action for swipe cards
		var buttonLeft = document.querySelector('.left-action');
		var buttonRight = document.querySelector('.right-action');

		buttonLeft.addEventListener('click', onActionLeft, false);
		buttonRight.addEventListener('click', onActionRight, false);

	}
	
	if (sessionStorage.results) {
		var data = JSON.parse(sessionStorage.results);
		console.log(data);
		createCards(data.businesses);
	} else {
		console.log("fail");
	}

	function createCards(data) {
		console.log(document.getElementsByClassName('stackedcards-container'));
		var container = document.getElementsByClassName('stackedcards-container')[0];
		for (business of data) {
			// create card item
			var cardItem = document.createElement('div');
			cardItem.className = 'card-item';

			// add splash image to left of card item
			let image = document.createElement('img');
			image.src = business.image_url;
			image.className = 'img-display';

			// add text div to right of card item
			let textInfo = document.createElement('div');
			textInfo.className = 'text-display';
			let title = document.createElement('h1');
			title.innerHTML = business.name;
			title.className = 'card-title';

			var rating = document.createElement('img');
			rating.src = getRating(rating);
			rating.className = 'display-inline'

			let reviewCount = document.createElement('p');
			reviewCount.innerHTML = business.review_count.toString().concat(' reviews');
			reviewCount.className = 'display-inline review-count-display vertical-pad';

			// create line of description with categories and price
			let description = document.createElement('div');
			description.className = 'vertical-pad';
			let categoryDisplay = document.createElement('p');
			categoryDisplay.innerHTML = getCategoriesStr(business.categories);
			categoryDisplay.className = 'display-inline';

			let bullet = document.createElement('div');
			bullet.innerHTML = "&#8226";
			bullet.className = 'bullet display-inline';

			let price = document.createElement('p');
			price.innerHTML = business.price;
			price.className = 'display-inline';

			description.appendChild(categoryDisplay);
			description.appendChild(bullet);
			description.appendChild(price);

			// create line of distance information
			let distance = document.createElement('div');
			distance.innerHTML = convertMetersToMiles(business.distance).toString().concat(" miles");


			// Add all elements to the right text info
			textInfo.appendChild(title);
			textInfo.appendChild(rating);
			textInfo.appendChild(reviewCount);
			textInfo.appendChild(description);
			textInfo.appendChild(distance)

			// Add image and text info to card
			cardItem.appendChild(image);
			cardItem.appendChild(textInfo);

			container.appendChild(cardItem);
		}
	}

	function getCategoriesStr(categories) {
		var categoryTitles = [];
		for (category of categories) {
			categoryTitles.push(category.title);
		}
		return categoryTitles.join(", ");
	}

	function getRating(rating) {
		let dir = "images/yelp_stars/web_and_ios/regular/regular_";
		let imgSrc;
		switch (business.rating) {
			case 0:
				imgSrc = dir.concat("0.png");
				break;
			case 1:
				imgSrc = dir.concat("1.png");
				break;
			case 1.5:
				imgSrc = dir.concat("1_half.png");
				break;
			case 2:
				imgSrc = dir.concat("2.png");
				break;
			case 2.5:
				imgSrc = dir.concat("2_half.png");
				break;
			case 3:
				imgSrc = dir.concat("3.png");
				break;
			case 3.5:
				imgSrc = dir.concat("3_half.png");
				break;
			case 4:
				imgSrc = dir.concat("4.png");
				break;
			case 4.5:
				imgSrc = dir.concat("4_half.png");
				break;
			case 5:
				imgSrc = dir.concat("5.png");
				break;
			default:
				console.log("error");
		}
		return imgSrc;
	}

	function convertMetersToMiles(meters) {
		var miles = meters / 1609.34;
		return Math.round(miles * 10) / 10
	}

	stackedCards();
	
});