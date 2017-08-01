//----------------------------------//
//                                  //
//  Structure/main logic            //
//                                  //
//----------------------------------//


/* global define:true */


define([
	'jquery',
	window.baseStyleJs+'/libraries/browserIdentify/browserIdentify-min.js'
], function() {

	return {

		init: function(){


			var windowWidth,
			    windowHeight;


			//------------------------------------------------------
			// On Scroll:  go to nearest section on stop scrolling
			//------------------------------------------------------


			var scrollTicking         = false,   // True when scroll watching is paused
			    stopScrollingDelay    = 100,
			    scrollSpeed           = 800,
			    onStopScrollingTimer  = 0;

			
			// Callback for our scroll event
			function onScroll() {
			    if(!scrollTicking) {
			        requestAnimationFrame(scrollUpdate);
			        scrollTicking = true;
			    }
			}

			// On Stop Scrolling
			function onStopScrolling() {
				var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
				if(windowWidth>1100 && !window.browserIdentify_isiOS  /* && !window.browserIdentify_isFirefox */ ) {
					window.main_goNearestSection();
				}		
			}
	
			// Call "onStopScrolling" after delay
		    onStopScrollingTimer = setTimeout(onStopScrolling, stopScrollingDelay);

			// Our animation callback: functions that are actually called on scroll
			function scrollUpdate() {
				// Stop auto scrolling and reset countdown to onStopScrolling
			    scrollTicking = false;
				clearTimeout(onStopScrollingTimer);
				$('#main__inner').stop();
				onStopScrollingTimer = setTimeout(onStopScrolling, stopScrollingDelay);		
			}

			// Go to section i
			window.main_goSection = function(i) {  // 0-based
				if($('.main__section:eq('+i+')').length){
					scrollTicking = true;  // Pause scroll watching
					clearTimeout(onStopScrollingTimer);
					$('#main__inner').stop();
					var top = $('#main__inner').scrollTop() + $('.main__section').eq(i).position().top;
					$('#main__inner').animate({
						scrollTop: top
					}, scrollSpeed, function(){
						scrollTicking = false;  // Resume scroll watching
						onStopScrollingTimer = setTimeout(onStopScrolling, stopScrollingDelay);
					});
					$('#main__pagination ul li').removeClass('active');
					$('#main__pagination ul li:eq('+i+')').addClass('active');
				}
			};

			// Go to the nearest section
			window.main_goNearestSection = function() {
				if($('.main__section').length){
					var nearestDistance = 99999999;
					var nearestIndex = 0;
					$('.main__section').each(function(i){			
						var newDistance = Math.abs($(this).position().top);
						if (newDistance < nearestDistance) {
							nearestDistance = newDistance;
							nearestIndex = i;
						}
					});
					window.main_goSection(nearestIndex);
				}
			};

			// Go to the next section
			window.main_goNextSection = function() {  // 0-based
				var newDistance = 0;
				$('.main__section').each(function(i){			
					newDistance = $(this).position().top;
					if (newDistance > 0) {
						window.main_goSection(i);
						return false;
					}
				});		
			};
	
			// Page autoadjust: Listen for scroll events
			$('body').on('scroll.main_scroll', '#main__inner', onScroll);

			// Click to scroll
			$('body').on('click', '.cts', function(event){
				event.preventDefault();
				window.main_goNextSection();
			});
						
			// Click on pagination
			$('body').on('click', '#main__pagination ul li a', function(event){
				event.preventDefault();
				window.main_goSection($(this).parent().index());
			});
	
			// Using mouse or touch on scrollbars
			$(document).on('mousedown.main_scroll touchstart.main_scroll', function(){
				scrollTicking = true;  // Pause scroll watching
				clearTimeout(onStopScrollingTimer);
				$('#main__inner').stop();
			}).on('mouseup touchend', function(event){
				var target = $( event.target );
				if( !target.is( "a, button, input" ) ) {
					scrollTicking = false;  // Resume scroll watching
					$('#main__inner').trigger('scroll');
				}
			});

			// Using mouse wheel
			$(document).on('mousewheel.main_scroll DOMMouseScroll.main_scroll', function() {  // Standard and Firefox mousewheel event
				scrollTicking = true;  // Pause scroll watching
				clearTimeout(onStopScrollingTimer);
				$('#main__inner').stop();		
				clearTimeout($.data(this, 'mousewheelTimer'));
				$.data(this, 'mousewheelTimer', setTimeout(function() {
					scrollTicking = false;  // Resume scroll watching
					$('#main__inner').trigger('scroll');
				}, 250));
			});
	
			// On resize
			$(document).on('resize', function(){
				$('#main__inner').trigger('scroll');		
			});
	
	
			//----------------------------------------------------
			// On mouse move: Mouse-ruled 3D moving backgrounds
			//----------------------------------------------------
	
	
			var mouseTicking = false;
			var mouseEvent;

			// Callback for our mouse event
			function onMouse() {
			    if(!mouseTicking) {
			        requestAnimationFrame(mouseUpdate);
			        mouseTicking = true;
			    }
			}

			// Our animation callback
			function mouseUpdate() {

				// Mouse-based functions
				var dx = (mouseEvent.pageX - (windowWidth/2))/(windowWidth/2);  // = -1 ~ 1
				var dy = (mouseEvent.pageY - (windowHeight/2))/(windowHeight/2);  // = -1 ~1
	
				$('.main__section__background').css({
					'transform': 'translateX('+(-10*dx)+'px) translateY('+(-10*dy)+'px) translateZ(-20vw) rotateX('+(-2*dy)+'deg) rotateY('+(+4*dx)+'deg) scale(1.4)'
				});
	
				// allow further rAFs to be called
			    mouseTicking = false;
	
			}

			// Listen for scroll events
			windowWidth = window.innerWidth ? window.innerWidth : $(window).width();	
			if(windowWidth>1100 && !window.browserIdentify_isiOS) {
				$(document).on('mousemove',function(event){
					mouseEvent = event;
					onMouse();
				});
			}


			//----------------------------------------------------
			// Adjust Main on resize
			//----------------------------------------------------

	
			$(window).on('resize', function(){
		
				// Window dimensions
		
				windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
				windowHeight = window.innerHeight ? window.innerHeight : $(window).height();

				// .main__section properties: JS override to avoid iOS Safari vh issue
		
				if(windowWidth<=1000) {
					$('.main__section').css({
						'min-height': windowHeight - $('#navigation__top').height()
					});
				} else {
					$('.main__section').css({
						'min-height': windowHeight
					});
				}
		
				// Go nearest section
		
				window.main_goNearestSection();
	
			});	
	
			$(document).resize();
			
			
		}
		
	};

});