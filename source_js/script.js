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
		carousel_index = incrementCarousel(carousel_index, images.length);
		changeBackgroundImage(carousel_index);
	}

	function moveLeft() {
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
		var image_cell_children = $(this).children();
		var img_child = image_cell_children[0];
		var old_src = $(img_child).attr("src");
		var thumb_index = old_src.indexOf("_thumb");
		var img_src = old_src.slice(0, thumb_index) + old_src.slice(thumb_index + 6);

		$(modal_img_id).prop("src", img_src);
		$(modal_id).show();
	}

	/*
	 * Navigation bar.
	 * Shrinks navigation bar on scroll.
	 * Basic approach cited from webdesignerdepot.com.
	 * Also highlights current position on navigation bar.
	 */

	 var nav_children = $(".nav ul").children("li");

	 var li_array = nav_children.get();

	 var anchor_children = nav_children.children("a");

  	 var anchors = anchor_children.map(function() {
 	 	return $(this).attr("href");
 	 }).get();

 	 var tops = anchors.map(function(currentVal) {
 	 	return Number($(currentVal).offset().top);
 	 });

 	 var heights = anchors.map(function(currentVal) {
 	 	var ret = $(currentVal).height();

 	 	return Number(ret);
 	 });

 	 var document_height = $(document).height();

	 function changePositionIndicator() {
	 	var window_height = $(window).height();
	 	var cur_top = $(window).scrollTop();
	 	var screen_bottom = cur_top + window_height;

	 	tops.forEach(function(currentVal, idx) {
	 		var sum_top_height = currentVal + heights[idx];
	 		if (currentVal < screen_bottom && screen_bottom < sum_top_height) {
	 			$(nav_children).removeClass("active");
	 			$(nav_children[idx+1]).addClass("active");
	 		}
	 	});
	 }

	 changePositionIndicator();

	 $(document).on("scroll", function() {
	 	changePositionIndicator();

		if ($(document).scrollTop() > 80) {
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
	  	var anchor = $(this).attr("href");

	  	container.animate({
	  		scrollTop: $(anchor).offset().top
	  	}, 1000);

	  	event.preventDefault();
	  });
});