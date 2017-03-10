var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
function renderButtons () {
	$(".buttons").empty();
	for(var animalCounter = 0; animalCounter < topics.length; animalCounter++){
		var animalButton = $("<button>");
		animalButton.addClass("animal-buttons");
		animalButton.attr("type", topics[animalCounter]);
		animalButton.text(topics[animalCounter]);
		$(".buttons").append(animalButton);
		console.log("buttons appeared!")
	}

};


renderButtons();

function activateButtons(){
// When any button is clicked, execute function:
	$(".animal-buttons").on("click", function() {
		console.log("getting content...")
		// Empty the container with GIFs to continue to display only 10
		$(".gifSpace").empty();
		// identify which button was clicked:
		var animal = $(this).attr("type");
		// // queryURL concatenates url, person variable, and an api key 
		// to get gifs of that animal
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

	    var queryStillURL = "http://api.giphy.com/v1/gifs/search?q=" +
	        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

	    $.ajax ({
	    	url:queryURL,
	    	method: "GET"
	    })
	    .done(function(response) {
	    	console.log("ajax");
	    	// Store the reponse.data received from the ajax call into a variable  
	    	var results = response.data;
	    	// Create a for loop to create a divContainer for each GIF received
	    	for (var gifCounter = 0; gifCounter < results.length; gifCounter++){
	    		// Create a div element and store in variable
	    		var divContainer = $("<div>");
	    		// Store rating data of currently iterated gif in variable
	    		var rating = results[gifCounter].rating;
	    		// Create a paragraph element and give it concatenated text
	    		// to display the rating in html, and store this in a variable
	    		var p = $("<p>").text("Rating: " + rating);
	    		// Create an image element and store in variable
	    		var animalImage = $("<img>");
	    		// Link the image element with the actual gif to be displayed
	            animalImage.attr("src", results[gifCounter].images.fixed_height_still.url);

	      		animalImage.attr("data-still", results[gifCounter].images.fixed_height_still.url);

	      		animalImage.attr("data-animate", results[gifCounter].images.fixed_height.url);

	      		animalImage.attr("data-state", "still");

	            // Insert the p element text at top
	            divContainer.prepend(p);
	            // Insert the image at top
	            divContainer.prepend(animalImage);
	            // Display the jQuery on the page with HTML
	            $(".gifSpace").prepend(divContainer);

		            animalImage.on("click", function () {
						var state = $(this).attr("data-state");
						var still = $(this).attr("data-still");
						var animate = $(this).attr("data-animate");

							if (state === "animate") {
								$(this).attr("src", still);
								$(this).attr("data-state", "still");
							}

							else {
								$(this).attr("src", animate);
								$(this).attr("data-state", "animate");
							}
						});
	    	}
	    })

	})

};



activateButtons();

$(".animal-input").keydown(function(e){
    if(e.which === 13){
        $("#searchButton").click();
    }
});

$("#searchButton").on("click", function() {
	event.preventDefault();
	// Reset duplicateEntry as false
	var duplicateEntry = false;
	var enteredAnimal = $(".animal-input").val().trim();
	// duplicateEntry check below:
	for (var animalCounter = 0; animalCounter < topics.length; animalCounter++){
		if (enteredAnimal === topics[animalCounter]) {
		duplicateEntry = true;
		console.log("duplicate entry!");
		break;
		}
	}

	if (enteredAnimal === ""){
		console.log("text entry blank!");
		duplicateEntry = true;
	}
	// If it isn't a duplicate or a blank entry, then this block gets executed:
	if (duplicateEntry === false){
		topics.push(enteredAnimal);
		renderButtons();
		activateButtons();
	}
	// Why does this only console log if we're talking duplicates?
	console.log(1);

});


