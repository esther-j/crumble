document.addEventListener("DOMContentLoaded", function(event) {
    var selections = JSON.parse(sessionStorage.selections);
    console.log(selections);

    var selectionContainer = document.getElementById('results-container');
    displaySelections();
    displayMap();
    // inspired from https://stackoverflow.com/questions/3059044/google-maps-js-api-v3-simple-multiple-marker-example
    function displayMap() {
    	var locations = [];
    	var counter = 1;
    	for (business of selections) {
    		locations.push([business.name, parseFloat(business.coordinates.latitude), parseFloat(business.coordinates.longitude), counter]);
    		counter++;
    	}

	    var map = new google.maps.Map(document.getElementById('map'), {
	      zoom: 10,
	      center: new google.maps.LatLng(sessionStorage.latitude, sessionStorage.longitude),
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    });

	    var infowindow = new google.maps.InfoWindow();

	    var marker, i;

	    for (i = 0; i < locations.length; i++) {  
	      marker = new google.maps.Marker({
	        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
	        map: map
	      });

	      google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        return function() {
	          infowindow.setContent(locations[i][0]);
	          infowindow.open(map, marker);
	        }
	      })(marker, i));
	    }
    }


    function displaySelections() {
    	for (selection of selections) {
    		let display = document.createElement('div');
    		display.className = 'display-block final-result-block';

    		// add thumbnail image
    		let image = document.createElement('img');
			image.src = selection.image_url;
			image.className = 'thumbnail';

			let textDisplay = document.createElement('div');
			textDisplay.className = 'display-inline text-left text-display smaller-text-display';

			// add title
			let title = document.createElement('h3');
			title.innerHTML = selection.name;

			// add review/rating information
			let rating = document.createElement('img');
			rating.src = getRating(selection.rating);

			let reviewCount = document.createElement('p');
			reviewCount.innerHTML = selection.review_count.toString().concat(' reviews');
			reviewCount.className = 'display-inline review-count-display vertical-pad smaller-review-count-display';

			// create line of description with categories and price
			let description = document.createElement('div');
			description.className = 'vertical-pad';
			let categoryDisplay = document.createElement('p');
			categoryDisplay.innerHTML = getCategoriesStr(selection.categories);
			categoryDisplay.className = 'display-inline';

			let bullet = document.createElement('div');
			bullet.innerHTML = "&#8226";
			bullet.className = 'bullet display-inline';

			let price = document.createElement('p');
			price.innerHTML = selection.price;
			price.className = 'display-inline';

			description.appendChild(categoryDisplay);
			description.appendChild(bullet);
			description.appendChild(price);

			// add address
			let address = document.createElement('div');
			address.innerHTML = selection.location.display_address.join("\n");

			// add website
			let link = document.createElement('a');
			link.href = selection.url;
			link.innerHTML = "Visit on Yelp";
			link.target = "_blank";

			textDisplay.appendChild(title);
			textDisplay.appendChild(rating);
			textDisplay.appendChild(reviewCount);
			textDisplay.appendChild(description);
			textDisplay.appendChild(address);
			textDisplay.appendChild(link);


			display.appendChild(image);
			display.appendChild(textDisplay);
	    	selectionContainer.appendChild(display);
    	}
    }

	document.getElementById("repeat-button").addEventListener("click", function() {
		console.log("hello?");
		document.location.href = "preferences.html";
	});

	function getCategoriesStr(categories) {
		var categoryTitles = [];
		for (category of categories) {
			categoryTitles.push(category.title);
		}
		return categoryTitles.join(", ");
	}

    // get small image rating
    function getRating(rating) {
		let dir = "images/yelp_stars/web_and_ios/small/small_";
		let imgSrc;
		switch (rating) {
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

});
