//----------------------------------//
//                                  //
//  Structure/modal logic           //
//                                  //
//----------------------------------//


/* global define:true */


define(['jquery'], function() {

	return {

		init: function(){


			//----------------------------------------------------
			// FUNCTIONS FOR SHOWING AND HIDING MODAL PANEL
			//----------------------------------------------------
	
	
			window.modal_modalShow = function(){
				$('html').addClass('modalVisible');			
			};

			window.modal_modalHide = function(){
				$('html').removeClass('modalVisible');
			};


			//----------------------------------------------------
			// Modal navigation: Scrolling links
			//----------------------------------------------------


			window.modal_goToAnchor = function(target_hash){	
							
				var top = 0;
				
				if($(target_hash).length > 0) {
					top = $('#modal__content').scrollTop() + $(target_hash).offset().top;
				}
				
				$("#modal__content").stop().animate({ scrollTop: (top  - $('#modal').offset().top - 50 ) }, 500 );
								
			};


			$('body').on('click', '#modal__navigation a', function(event){
				
				event.preventDefault();							

				var currentHost = top.location.host.toString();
				var currentPage = top.location.pathname.toString();
				var targetHost = $(this)[0].host;
				var targetPage = $(this)[0].pathname;
				var targetHash = $(this)[0].hash;
				if(targetHash === "") {
					targetHash = "#modal";
				}
				if((targetPage === currentPage) && (targetHost === currentHost)) {
				
					// Link to anchor in the same page
				
					window.modal_goToAnchor(targetHash);

				} else {
				
					// Link to other page
				
					var targetHref = $(this).attr('href');
					window.general_goToURL(targetHref);					
				
				}
				
			});


		}
		
	};
	
});
