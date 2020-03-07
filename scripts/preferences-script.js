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
	document.getElementById("range-slider").value = "2";

	var longitude;
	var latitude;
	getLocation();
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
	 	console.log(latitude);
	 	console.log(longitude);	 	
	}

	// // Randomly pick initial 5 categories to display and display them
	// var numCategories = 5;
	// while (dispCategoryList.size != numCategories) {
	// 	// Pick random property idea from: 
	// 	// https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
	// 	var keys = Object.keys(categoryDict);
	// 	var randomCategory = keys[keys.length * Math.random() << 0];

	// 	if (randomCategory in dispCategoryList) {
	// 		continue;
	// 	}
	// 	addDisplayCategory(randomCategory);
	// 	dispCategoryList.add(randomCategory);
	// }

	// Add all categories to be an option as a searchable category
	var categoriesDatalist = document.getElementById("categories-datalist");
	for (var categoryTitle in categoryDict) {
		console.log(categoryTitle)
		var newCategory = document.createElement("option")
		newCategory.setAttribute("value", categoryTitle);
		categoriesDatalist.appendChild(newCategory);
	}

	// Add any valid categories inputted by user when add button is clicked
	document.getElementById("category-button").addEventListener("click", function() {
		console.log("click");
		var inputCategory = document.getElementById("categories-custom-input").value;
		if ((inputCategory in categoryDict) && !(dispCategoryList.has(inputCategory))) {
			dispCategoryList.add(inputCategory);
			addDisplayCategory(inputCategory);
			document.getElementById(categoryDict[inputCategory]).checked = true;
			console.log(dispCategoryList);
		}
		document.getElementById("categories-custom-input").value = "";
	});

	// Source: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
	// Execute a function when the user releases a key on the keyboard
	document.getElementById("categories-custom-input").addEventListener("keyup", function(event) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("category-button").click();
		}
	});

	document.getElementById("finish-prefs-button").addEventListener("click", function() {
		// Get the selected category string 
		var allCategories = document.getElementsByName("categories");
		var categoryStr;
		for (var i = 0; i < allCategories.length; i++) {
		    if (allCategories[i].checked){
		        categoryStr = allCategories[i].id;
		    }
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
		distance = Number(distance) * 1000;

		console.log(priceStr);
		console.log(categoryStr);
		console.log(distance);
		console.log(isOpen);
		console.log(longitude);
		console.log(latitude);

		// Handle blank fields
		var timeout = 100;
		var onExit = false;
		setTimeout(function() {
			if (typeof(longitude) == "undefined" || typeof(latitude) == "undefined") {
				onExit = true;
				alert("Please enable location detection");
				setTimeout(function() {
					getLocation();
				}, timeout);
			}
			if (typeof(priceStr) == "undefined") {
				onExit = true;
				alert("Please pick a price point");
			}
			if (typeof(categoryStr) == "undefined") {
				onExit = true;
				alert("Please pick a category");
			}
		}, timeout);
		var xhttp = new XMLHttpRequest();

		// Template for api call from ->
		// Source: https://stackoverflow.com/questions/53357891/how-do-i-resolve-the-cors-error-in-yelp-api-call

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
				     	limit: 5
				     	// price: priceStr,
				     	// open_now: isOpen
				    },
				    error: function(xhr, status, error) {
						// var err = eval("(" + xhr.responseText + ")");
						alert("Couldn't find any locations");
					}
				}).then(function(results) {
				 	console.log("success");
				 	results = JSON.stringify(results);
				    console.log(results);
				    sessionStorage.results = results;
				    document.location.href = "selection.html";
				});
			}
		}, timeout);
		
	});
});

var visited=something;

function doStuff() {
    if(something===something_cachedValue) {//we want it to match
        setTimeout(doStuff, 50);//wait 50 millisecnds then recheck
        return;
    }
    something_cachedValue=something;
    //real action
}

doStuff();

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