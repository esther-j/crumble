// categoryDict generated from filtered https://www.yelp.com/developers/documentation/v3/category_list
var categoryDict = {
	"Afghan": "afghani",
	"African": "african",
	"Senegalese": "senegalese",
	"South African": "southafrican",
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
	"Pancakes": "pancakes",
	"British": "british",
	"Buffets": "buffets",
	"Bulgarian": "bulgarian",
	"Burgers": "burgers",
	"Burmese": "burmese",
	"Cafes": "cafes",
	"Themed Cafes": "themedcafes",
	"Cafeteria": "cafeteria",
	"Cajun/Creole": "cajun",
	"Cambodian": "cambodian",
	"Caribbean": "caribbean",
	"Dominican": "dominican",
	"Haitian": "haitian",
	"Puerto Rican": "puertorican",
	"Trinidadian": "trinidadian",
	"Catalan": "catalan",
	"Cheesesteaks": "cheesesteaks",
	"Chicken Shop": "chickenshop",
	"Chicken Wings": "chicken_wings",
	"Chinese": "chinese",
	"Cantonese": "cantonese",
	"Dim Sum": "dimsum",
	"Hainan": "hainan",
	"Shanghainese": "shanghainese",
	"Szechuan": "szechuan",
	"Comfort Food": "comfortfood",
	"Creperies": "creperies",
	"Cuban": "cuban",
	"Czech": "czech",
	"Delis": "delis",
	"Diners": "diners",
	"Dinner Theater": "dinnertheater",
	"Eritrean": "eritrean",
	"Ethiopian": "ethiopian",
	"Fast Food": "hotdogs",
	"Filipino": "filipino",
	"Fish & Chips": "fishnchips",
	"Fondue": "fondue",
	"Food Court": "food_court",
	"Food Stands": "foodstands",
	"French": "french",
	"Mauritius": "mauritius",
	"Reunion": "reunion",
	"Game Meat": "gamemeat",
	"Gastropubs": "gastropubs",
	"Georgian": "georgian",
	"German": "german",
	"Gluten-Free": "gluten_free",
	"Greek": "greek",
	"Guamanian": "guamanian",
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
	"Calabrian": "calabrian",
	"Sardinian": "sardinian",
	"Sicilian": "sicilian",
	"Tuscan": "tuscan",
	"Japanese": "japanese",
	"Conveyor Belt Sushi": "conveyorsushi",
	"Izakaya": "izakaya",
	"Japanese Curry": "japacurry",
	"Ramen": "ramen",
	"Teppanyaki": "teppanyaki",
	"Kebab": "kebab",
	"Korean": "korean",
	"Kosher": "kosher",
	"Laotian": "laotian",
	"Latin American": "latin",
	"Colombian": "colombian",
	"Salvadoran": "salvadoran",
	"Venezuelan": "venezuelan",
	"Live/Raw Food": "raw_food",
	"Malaysian": "malaysian",
	"Mediterranean": "mediterranean",
	"Falafel": "falafel",
	"Mexican": "mexican",
	"Tacos": "tacos",
	"Middle Eastern": "mideastern",
	"Egyptian": "egyptian",
	"Lebanese": "lebanese",
	"Modern European": "modern_european",
	"Mongolian": "mongolian",
	"Moroccan": "moroccan",
	"New Mexican Cuisine": "newmexican",
	"Nicaraguan": "nicaraguan",
	"Noodles": "noodles",
	"Pakistani": "pakistani",
	"Pan Asian": "panasian",
	"Persian/Iranian": "persian",
	"Peruvian": "peruvian",
	"Pizza": "pizza",
	"Polish": "polish",
	"Polynesian": "polynesian",
	"Pop-Up Restaurants": "popuprestaurants",
	"Portuguese": "portuguese",
	"Poutineries": "poutineries",
	"Russian": "russian",
	"Salad": "salad",
	"Sandwiches": "sandwiches",
	"Scandinavian": "scandinavian",
	"Scottish": "scottish",
	"Seafood": "seafood",
	"Singaporean": "singaporean",
	"Slovakian": "slovakian",
	"Somali": "somali",
	"Soul Food": "soulfood",
	"Soup": "soup",
	"Southern": "southern",
	"Spanish": "spanish",
	"Sri Lankan": "srilankan",
	"Steakhouses": "steak",
	"Supper Clubs": "supperclubs",
	"Sushi Bars": "sushi",
	"Syrian": "syrian",
	"Taiwanese": "taiwanese",
	"Tapas Bars": "tapas",
	"Tapas/Small Plates": "tapasmallplates",
	"Tex-Mex": "tex-mex",
	"Thai": "thai",
	"Turkish": "turkish",
	"Ukrainian": "ukrainian",
	"Uzbek": "uzbek",
	"Vegan": "vegan",
	"Vegetarian": "vegetarian",
	"Vietnamese": "vietnamese",
	"Waffles": "waffles",
	"Wraps": "wraps"
};
var dispCategoryList = new Set();

document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById("range-slider").value = "2";

	// Randomly pick initial 5 categories to display and display them
	var numCategories = 5;
	while (dispCategoryList.size != numCategories) {
		// Pick random property idea from: 
		// https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
		var keys = Object.keys(categoryDict);
		var randomCategory = keys[keys.length * Math.random() << 0];

		if (randomCategory in dispCategoryList) {
			continue;
		}
		addDisplayCategory(randomCategory);
		dispCategoryList.add(randomCategory);
	}

	// Add all categories to be an option as a searchable category
	var categoriesDatalist = document.getElementById("categories-datalist");
	for (var categoryTitle in categoryDict) {
		var newCategory = document.createElement("option")
		newCategory.setAttribute("value", categoryTitle);
		categoriesDatalist.appendChild(newCategory);
	}

	// Add any valid categories inputted by user when add button is clicked
	document.getElementById("category-button").addEventListener("click", function(){
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
});

// Function adds a given category to the frontend
function addDisplayCategory(category) {
	var categoryId = categoryDict[category];
	var categoriesDisplay = document.getElementById("categories-container");

	var newCategoryElementLabel = document.createElement("label");
	newCategoryElementLabel.setAttribute("for", categoryId);

	var newCategoryElementInput = document.createElement("input");
	newCategoryElementInput.setAttribute("type", "radio");
	newCategoryElementInput.setAttribute("id", categoryId);
	newCategoryElementInput.setAttribute("name", "categories");
	newCategoryElementInput.setAttribute("class", "category-input")

	var newCategoryElementDiv = document.createElement("div");
	newCategoryElementDiv.setAttribute("class", "category-display");
	newCategoryElementDiv.innerHTML = category;

	newCategoryElementLabel.appendChild(newCategoryElementInput);
	newCategoryElementLabel.appendChild(newCategoryElementDiv);

	categoriesDisplay.appendChild(newCategoryElementLabel);

}