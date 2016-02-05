$(document).ready(function() {
	/*
	 * Carousel.
	 * Functions by animating a change of background images for the title section.
	 */

	var MEDIA_DIR = "media/";

	var carousel_index = 0;

	// Add new images here.
	var images = [
		"bus_vs_village_far.jpg",
		"ox_cart.jpg",
		"boy_running.jpg",
		"ride_with_us.jpg"
	];

	$("#title-right").click(moveRight);
	$("#title-left").click(moveLeft);

	function moveRight() {
		console.log("moveRight clicked.");
		carousel_index = incrementCarousel(carousel_index, images.length);
		changeBackgroundImage(carousel_index);
	}

	function moveLeft() {
		console.log("moveLeft clicked.");
		carousel_index = decrementCarousel(carousel_index, images.length);
		changeBackgroundImage(carousel_index);
	}

	function incrementCarousel(idx, len) {
		if (idx == len - 1) {
			idx = 0;
		} else {
			idx++;
		}

		return idx;
	}

	function decrementCarousel(idx, len) {
		if (idx == 0) {
			idx = len - 1;
		} else {
			idx--;
		}

		return idx;
	}

	function changeBackgroundImage(idx) {
		var image_url = "url('" + MEDIA_DIR + images[idx] + "')";
		var background_size = "cover";

		console.log(image_url);
		$("#title-section").css(
			{"background-image": "linear-gradient(rgba(0, 21, 42, 0.50), rgba(0, 21, 42, 0.50)), " + image_url}, 
			{"background-size": background_size},
			{"webkit-background-size": background_size},
    		{"-moz-background-size": background_size},
		    {"-o-background-size": background_size},
		    {"background-position": "0% 25%"});
	}
});