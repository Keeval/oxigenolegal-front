//----------------------------------//
//                                  //
//  Modules/centers logic           //
//                                  //
//----------------------------------//


/* global define:true */


define([
	'jquery'
], function() {

	return {

		init: function(){


			//----------------------------------------------------
			// Adjust module height
			//----------------------------------------------------
			
			
			var windowWidth,
			    windowHeight;


			$(window).on('resize', function(){
				
				// Window dimensions
		
				windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
				windowHeight = window.innerHeight ? window.innerHeight : $(window).height();
		
				// .module__centers properties: JS override to avoid iOS Safari vh issue
		
				$('.module--centers').each(function(){
					$(this).css({
						'height': windowHeight - $(this).offset().top
					});
				});
				
			});
			
		}
		
	};
	
});

