//----------------------------------//
//                                  //
//  Modules/quotes logic            //
//                                  //
//----------------------------------//


/* global define:true */


define([
	'jquery',
	window.baseStyleJs+'/libraries/jquery.initialize/jquery.initialize.js',
	window.baseStyleJs+'/libraries/touchSwipe/touchSwipe.js'
], function() {

	return {

		init: function(){


			//----------------------------------------------------
			// Prepare module
			//----------------------------------------------------
			
			
			$('.module--quotes').initialize(function(){
				
				var $this = $(this);
								
				// Add classes to items
				
				$this
					.find('.module--quotes__list__item')
						.first()
							.addClass('current')
							.nextAll()
								.addClass('onTheRight');
								
				// Add pagination and controls
				
				if($this.find('.module--quotes__list__item').length>1) {
					// Pagination
					$this.find('.module__inner2').append('<ul class="module--quotes__pagination"></ul>');
					$this.find('.module--quotes__list__item').each(function(i){
						$this.find('.module--quotes__pagination').append('<li><span>0'+(i+1)+'</span></li>');
					});
					$this.find('.module--quotes__pagination li:first').addClass('current');
					// Controls
					$this.find('.module__inner2').append('<div class="module--quotes__controls"></div>');
					$this.find('.module--quotes__controls').append('<button class="module--quotes__controls__prev"></button><button class="module--quotes__controls__next"></button>');
				} else {
					$this.addClass('module--quotes--single');
				}
				
				// Trigger resize
				
				$(window).trigger('resize');
							
						
			});


			//----------------------------------------------------
			// Pagination events
			//----------------------------------------------------
			
			
			$('body').on('click', '.module--quotes__pagination li', function(event){
				event.preventDefault();				var i = $(this).index();
				var $module = $(this).closest('.module--quotes');
				$module
					.find('.module--quotes__list__item')
						.removeClass('current onTheRight onTheLeft');
				$module
					.find('.module--quotes__list__item:eq('+i+')')
						.addClass('current')
						.prevAll()
							.addClass('onTheLeft')
							.end()
						.nextAll()
							.addClass('onTheRight');
				$module
					.find('.module--quotes__pagination li')
						.removeClass('current');
				$module
					.find('.module--quotes__pagination li:eq('+i+')')
						.addClass('current');
			});
			
			
			//----------------------------------------------------
			// Controls events
			//----------------------------------------------------


			$('body').on('click', '.module--quotes__controls__prev', function(event){
				event.preventDefault();				
				window.moduleQuotes_prevQuote($(this).closest('.module--quotes'));
			});

			$('body').on('click', '.module--quotes__controls__next', function(event){
				event.preventDefault();
				window.moduleQuotes_nextQuote($(this).closest('.module--quotes'));
			});


			//----------------------------------------------------
			// Next/prev functions
			//----------------------------------------------------
			
			
			window.moduleQuotes_nextQuote = function($module){
				var currentIndex = $module.find('.module--quotes__list__item.current').index();
				if(currentIndex < $module.find('.module--quotes__list__item').length-1) {
					currentIndex ++;
				} else {
					currentIndex = 0;
				}
				$module.find('.module--quotes__pagination li:eq('+currentIndex+')').trigger('click');
			};

			window.moduleQuotes_prevQuote = function($module){
				var currentIndex = $module.find('.module--quotes__list__item.current').index();
				if(currentIndex > 0) {
					currentIndex --;
				} else {
					currentIndex = $module.find('.module--quotes__list__item').length-1;
				}
				$module.find('.module--quotes__pagination li:eq('+currentIndex+')').trigger('click');
			};


			//----------------------------------------------------
			// Swipe events
			//----------------------------------------------------
			
			
			var isTouch = 'ontouchstart' in document.documentElement;
			if(isTouch){
				$('.module--quotes').initialize(function(){
					$(this).swipe({
						swipe:function(event, direction, distance, duration, fingerCount) {
							switch(direction) {
								case 'left':
									window.moduleQuotes_nextQuote($(this));
									break;
								case 'right':
									window.moduleQuotes_prevQuote($(this));
									break;
								default:
									break;
							}
						},
						allowPageScroll : 'vertical',
						excludedElements:[]
					});
				});
			}
			
			
			//----------------------------------------------------
			// Adjust module height
			//----------------------------------------------------
			
			
			$(window).on('resize', function(){
				
				$('.module--quotes').each(function(){
					
					var $this = $(this);

					var maxHeight = 0;
					var slideHeight = 0;
				
					$this.find('.module--quotes__list__item__quote').each(function(){
						slideHeight = $(this).height();
						if(slideHeight > maxHeight) {
							maxHeight = slideHeight;
						}
					});
				
					$this.find('.module__inner2').height(maxHeight);
				
				});
			
			});
			
			
		}
		
	};
	
});

