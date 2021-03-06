// categoryDict data from https://www.yelp.com/developers/documentation/v3/category_list
// formatted and sorted using python scripts
var categoryDict = {
	"Afghan": "afghani",
	"African": "african",
	"American (New)": "newamerican",
	"American (Traditional)": "tradamerican",
	"Arabian": "arabian",
	"Argentine": "argentine",
	"Armenian": "armenian",
	"Asian Fusion": "asianfusion",
	"Australian": "australian",
	"Austrian": "austrian",
	"Bangladeshi": "bangladeshi",
	"Barbeque": "bbq",
	"Basque": "basque",
	"Belgian": "belgian",
	"Brasseries": "brasseries",
	"Brazilian": "brazilian",
	"Breakfast & Brunch": "breakfast_brunch",
	"British": "british",
	"Buffets": "buffets",
	"Bulgarian": "bulgarian",
	"Burgers": "burgers",
	"Burmese": "burmese",
	"Cafes": "cafes",
	"Cafeteria": "cafeteria",
	"Cajun/Creole": "cajun",
	"Calabrian": "calabrian",
	"Cambodian": "cambodian",
	"Cantonese": "cantonese",
	"Caribbean": "caribbean",
	"Catalan": "catalan",
	"Cheesesteaks": "cheesesteaks",
	"Chicken Shop": "chickenshop",
	"Chicken Wings": "chicken_wings",
	"Chinese": "chinese",
	"Colombian": "colombian",
	"Comfort Food": "comfortfood",
	"Conveyor Belt Sushi": "conveyorsushi",
	"Creperies": "creperies",
	"Cuban": "cuban",
	"Czech": "czech",
	"Delis": "delis",
	"Dim Sum": "dimsum",
	"Diners": "diners",
	"Dinner Theater": "dinnertheater",
	"Dominican": "dominican",
	"Egyptian": "egyptian",
	"Eritrean": "eritrean",
	"Ethiopian": "ethiopian",
	"Falafel": "falafel",
	"Fast Food": "hotdogs",
	"Filipino": "filipino",
	"Fish & Chips": "fishnchips",
	"Fondue": "fondue",
	"Food Court": "food_court",
	"Food Stands": "foodstands",
	"French": "french",
	"Game Meat": "gamemeat",
	"Gastropubs": "gastropubs",
	"Georgian": "georgian",
	"German": "german",
	"Gluten-Free": "gluten_free",
	"Greek": "greek",
	"Guamanian": "guamanian",
	"Hainan": "hainan",
	"Haitian": "haitian",
	"Halal": "halal",
	"Hawaiian": "hawaiian",
	"Himalayan/Nepalese": "himalayan",
	"Honduran": "honduran",
	"Hong Kong Style Cafe": "hkcafe",
	"Hot Dogs": "hotdog",
	"Hot Pot": "hotpot",
	"Hungarian": "hungarian",
	"Iberian": "iberian",
	"Indian": "indpak",
	"Indonesian": "indonesian",
	"Irish": "irish",
	"Italian": "italian",
	"Izakaya": "izakaya",
	"Japanese Curry": "japacurry",
	"Japanese": "japanese",
	"Kebab": "kebab",
	"Korean": "korean",
	"Kosher": "kosher",
	"Laotian": "laotian",
	"Latin American": "latin",
	"Lebanese": "lebanese",
	"Live/Raw Food": "raw_food",
	"Malaysian": "malaysian",
	"Mauritius": "mauritius",
	"Mediterranean": "mediterranean",
	"Mexican": "mexican",
	"Middle Eastern": "mideastern",
	"Modern European": "modern_european",
	"Mongolian": "mongolian",
	"Moroccan": "moroccan",
	"New Mexican Cuisine": "newmexican",
	"Nicaraguan": "nicaraguan",
	"Noodles": "noodles",
	"Pakistani": "pakistani",
	"Pan Asian": "panasian",
	"Pancakes": "pancakes",
	"Persian/Iranian": "persian",
	"Peruvian": "peruvian",
	"Pizza": "pizza",
	"Polish": "polish",
	"Polynesian": "polynesian",
	"Pop-Up Restaurants": "popuprestaurants",
	"Portuguese": "portuguese",
	"Poutineries": "poutineries",
	"Puerto Rican": "puertorican",
	"Ramen": "ramen",
	"Reunion": "reunion",
	"Russian": "russian",
	"Salad": "salad",
	"Salvadoran": "salvadoran",
	"Sandwiches": "sandwiches",
	"Sardinian": "sardinian",
	"Scandinavian": "scandinavian",
	"Scottish": "scottish",
	"Seafood": "seafood",
	"Senegalese": "senegalese",
	"Shanghainese": "shanghainese",
	"Sicilian": "sicilian",
	"Singaporean": "singaporean",
	"Slovakian": "slovakian",
	"Somali": "somali",
	"Soul Food": "soulfood",
	"Soup": "soup",
	"South African": "southafrican",
	"Southern": "southern",
	"Spanish": "spanish",
	"Sri Lankan": "srilankan",
	"Steakhouses": "steak",
	"Supper Clubs": "supperclubs",
	"Sushi Bars": "sushi",
	"Syrian": "syrian",
	"Szechuan": "szechuan",
	"Tacos": "tacos",
	"Taiwanese": "taiwanese",
	"Tapas Bars": "tapas",
	"Tapas/Small Plates": "tapasmallplates",
	"Teppanyaki": "teppanyaki",
	"Tex-Mex": "tex-mex",
	"Thai": "thai",
	"Themed Cafes": "themedcafes",
	"Trinidadian": "trinidadian",
	"Turkish": "turkish",
	"Tuscan": "tuscan",
	"Ukrainian": "ukrainian",
	"Uzbek": "uzbek",
	"Vegan": "vegan",
	"Vegetarian": "vegetarian",
	"Venezuelan": "venezuelan",
	"Vietnamese": "vietnamese",
	"Waffles": "waffles",
	"Wraps": "wrap"
};
var dispCategoryList = new Set();

// Initialize
document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById("range-slider").value = "1";

	var longitude;
	var latitude;
	var timeout = 200;
	setTimeout(function() {
		getLocation();
	}, timeout);

	// Source: https://www.w3schools.com/html/html5_geolocation.asp
	// Get the location of a user
	function getLocation() {
	 	if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(setPosition);
	 	} 
	}

	function setPosition(position) {
	 	latitude = position.coords.latitude; 
	 	longitude = position.coords.longitude;
	}

	// Add all categories to be an option as a searchable category
	var categoriesDatalist = document.getElementById("categories-datalist");
	for (var categoryTitle in categoryDict) {
		var newCategory = document.createElement("option")
		newCategory.setAttribute("value", categoryTitle);
		categoriesDatalist.appendChild(newCategory);
	}

	// Button for prefs 
	document.getElementById("finish-prefs-button").addEventListener("click", function() {
		// Get the selected category string 
		var categoryStr;
		var inputCategory = document.getElementById("categories-custom-input").value;
		if (inputCategory in categoryDict) {
			categoryStr = categoryDict[inputCategory];
		} else {
			alert("Please pick a valid category");
			document.getElementById("categories-custom-input").value = "";
			return;
		}

		// Get the selected price string 
		var allPrices = document.getElementsByName("prices");
		var priceStr;
		for (var i = 0; i < allPrices.length; i++) {
		    if (allPrices[i].checked){
		        priceStr = allPrices[i].id;
		    }
		}

		// Get the selected distance 
		var distance = document.getElementById("range-slider").value;

		// Get whether must be open
		var isOpen = document.getElementById("open-checkbox").checked;
		distance = getDistanceMeters(distance);

		// Handle blank fields
		var onExit = false;
		setTimeout(function() {
			if (typeof(longitude) == "undefined" || typeof(latitude) == "undefined") {
				onExit = true;
				alert("Please enable location detection (or try resubmitting because of delay)");
				getLocation();
			}
			if (typeof(priceStr) == "undefined") {
				onExit = true;
				alert("Please pick a price point");
			}
		}, timeout);
		var xhttp = new XMLHttpRequest();

		// Template for api call from ->
		// Source: https://stackoverflow.com/questions/53357891/how-do-i-resolve-the-cors-error-in-yelp-api-call
		var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";
		var apiKey = "7daTtSKXtyMB-3mUKRv15p_B4i3tRREYThFBdyATpSBkR5ceC5p-PbOuvNq5JVYgkA8EVmFi9VfShs7V5m0QD23kiwrMEWvBsb6nl_XtGT5SBCzY4NYoWEkC4yNZXnYx"; 
		setTimeout(function() {
			if (!onExit) {
				$.ajax({
				    url: queryURL,
				    method: "GET",
				    headers: {
				        "accept": "application/json",
				        "x-requested-with": "xmlhttprequest",
				        "Access-Control-Allow-Origin":"*",
				        "Authorization": `Bearer ${apiKey}`
				    },
				    data: {
				     	longitude: longitude,
				     	latitude: latitude,
				     	radius: distance,
				     	categories: categoryStr,
				     	limit: 10,
				     	price: priceStr,
				     	open_now: isOpen
				    },
				    error: function(xhr, status, error) {
						// var err = eval("(" + xhr.responseText + ")");
						alert("Error: Please try submitting again");
					}
				}).then(function(results) {
				 	if (results.total == 0) {
				 		alert("Couldn't find any locations with the given categories");
				 		return;
				 	}
				 	results = JSON.stringify(results);
				    sessionStorage.results = results;
				   	sessionStorage.latitude = latitude.toString();
					sessionStorage.longitude = longitude.toString();
				    document.location.href = "selection.html";
				});
			}
		}, timeout);
		
	});
});

// get the location in meters for a given distance string
function getDistanceMeters(distance) {
	var numDistance = Number(distance);
	var numMeters = 1609.34;
	var miles;
	switch (numDistance) {
		case 1:
			miles = 0.5;
			break;
		case 2:
			miles = 1;
			break;
		case 3:
			miles = 2;
			break;
		case 4:
			miles = 3;
		case 5:
			miles = 5;
	}
	return Math.round(miles * numMeters);
}

// Function adds a given category to the frontend
function addDisplayCategory(category) {
	var categoryId = categoryDict[category];
	var categoriesDisplay = document.getElementById("categories-container");

	var newCategoryElementLabel = document.createElement("label");
	newCategoryElementLabel.setAttribute("for", categoryId);

	// Make block radio input with alias id
	var newCategoryElementInput = document.createElement("input");
	newCategoryElementInput.setAttribute("type", "radio");
	newCategoryElementInput.setAttribute("id", categoryId);
	newCategoryElementInput.setAttribute("name", "categories");
	newCategoryElementInput.setAttribute("class", "category-input")

	// Set text label
	var newCategoryElementDiv = document.createElement("div");
	newCategoryElementDiv.setAttribute("class", "category-display");
	newCategoryElementDiv.innerHTML = category;

	newCategoryElementLabel.appendChild(newCategoryElementInput);
	newCategoryElementLabel.appendChild(newCategoryElementDiv);

	categoriesDisplay.appendChild(newCategoryElementLabel);
}