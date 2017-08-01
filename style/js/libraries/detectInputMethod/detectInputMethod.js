//----------------------------------//
//                                  //
//  Input method detection          //
//  Muskae 2016                     //
//                                  //
//----------------------------------//


$(function() {

	function is_touch_device() {
		return 'ontouchstart' in window || navigator.maxTouchPoints;
	}

	$(document).on('mousemove', function() {
		if(!is_touch_device()) {
			$('html')
				.removeClass('usingTouch')
				.removeClass('usingKeyboard')
				.addClass('usingMouse');
		} else {
			$('html')
				.removeClass('usingMouse')
				.removeClass('usingKeyboard')
				.addClass('usingTouch');			
		}
	});

	$(document).on('keydown', function() {
		$('html')
			.removeClass('usingMouse')
			.removeClass('usingTouch')
			.addClass('usingKeyboard');
	});
	
});

