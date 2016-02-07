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

	/*
	 * Modal.
	 * Creates a modal on click of image thumbnail.
	 */

	var modal_id = "#modal";
	var modal_img_id = "#modal-img-container";
	var modal_close_id = "#modal-close";

	$(modal_id).hide();
	$(".image-cell").click(fillModal);
	$(modal_close_id).click(hideModal);
	$(modal_id).click(hideModal);

	function hideModal() {
		$(modal_id).hide();
	}

	function fillModal() {
		console.log("fillModal clicked");
		var image_cell_children = $(this).children();
		var img_child = image_cell_children[0];
		var img_src = $(img_child).prop("src");
		console.log(img_src);

		$(modal_img_id).prop("src", img_src);
		$(modal_id).show();
	}

	/*
	 * Navigation bar.
	 * Shrinks navigation bar on scroll.
	 * Basic approach cited from webdesignerdepot.com.
	 */

	 $(document).on("scroll", function() {
		 if ($(document).scrollTop() > 80) {
		 	console.log("Scroll event detected.");
		 	$(".nav").removeClass("large").addClass("small");
		 } else {
		 	$(".nav").removeClass("small").addClass("large");
		 }
	 });

	 /*
	  * Smooth scrolling on click.
	  * Uses jQuery animate.
	  */

	  var container = $("html, body");
	  $("a").click(function(event) {
	  	console.log("Preventing default");
	  	event.preventDefault();

	  	var anchor = $(this).attr("href");
	  	console.log(anchor);
	  	container.animate({
	  		scrollTop: $(anchor).offset().top
	  	}, 1000);

	  	// return false;
	  });
});