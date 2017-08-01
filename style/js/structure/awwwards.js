//----------------------------------//
//                                  //
//  Awwwards ribbon logic           //
//                                  //
//----------------------------------//


/* global define:true */


define([
	'jquery',
], function() {

	return {

		init: function(){


			//----------------------------------------------------
			// Adjust to scrollbar width
			//----------------------------------------------------

			
			$(window).on('resize',function(){
				$('#awwwards')
					.attr('style','')
					.css({
						'right' : window.getScrollbarWidth
					});
			});		
			$(window).trigger('resize');

			
		}
		
	};
	
});

