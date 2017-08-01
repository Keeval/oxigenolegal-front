//----------------------------------//
//                                  //
//  Structure/navigation logic      //
//                                  //
//----------------------------------//


/* global define:true */


define(['jquery'], function() {

	return {

		init: function(){


			//----------------------------------------------------
			// FUNCTIONS FOR SHOWING AND HIDING NAVIGATION
			//----------------------------------------------------
	
	
			window.navigation_navigationShow = function(){
				$('html').addClass('navigationVisible');			
			};

			window.navigation_navigationHide = function(){
				$('html').removeClass('navigationVisible');
			};


			//------------------------------------------------------
			// Show / Hide navigation
			//------------------------------------------------------


			$('body').on('click', '#navigation__menubutton__button', function(event){
				event.preventDefault();
				if($('html').hasClass('navigationVisible')) {
					window.navigation_navigationHide();
				} else {
					window.navigation_navigationShow();			
				}
			});
	
			$('body').on('click touchstart', '#main__overlay, #modal__overlay', function(event){
				event.preventDefault();
				window.navigation_navigationHide();
			});

			$(window).on('resize', function(){
				window.navigation_navigationHide();
			});
			
		
		}

	};
	
});
