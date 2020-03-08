document.addEventListener("DOMContentLoaded", function(event) {
    var selections = JSON.parse(sessionStorage.selections);
    console.log(selections);

    var selectionContainer = document.getElementById('results-container');
    displaySelections();
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
