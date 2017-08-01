//----------------------------------//
//                                  //
//  Modules/wysiwyg logic           //
//                                  //
//----------------------------------//


/* global define:true */


define([
	'jquery',
	window.baseStyleJs+'/libraries/jquery.fancybox/source/jquery.fancybox.pack.js'
], function() {	

	return {

		init: function(){


			//----------------------------------------------------
			//  WP gallery Fancybox
			//----------------------------------------------------
			
							
			$('.gallery').initialize(function(){

				// Window dimensions
	
				//windowWidth = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth;
				var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();

				var popupMargin = 40;
				if(windowWidth <= 600) {
					popupMargin = 20;
				} else if(windowWidth <= 1300) {
					popupMargin = 30;
				}

				$('.gallery a').on('click', function(event){
					event.preventDefault();
					var timestamp = new Date().getUTCMilliseconds();
					$(this).closest('.gallery').find('a').attr('rel', 'gallery'+timestamp);
				}).fancybox({
			        padding : 0,
			        margin  : popupMargin,
	                width   : '100%',
	                height  : '100%',
					loop    : false,
		            helpers : {
						title : {
							type : 'float'
						}
					}
				
				});
				
			});
			

		}
		
	};
	
});
