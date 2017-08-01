//----------------------------------//
//                                  //
//  General structure logic         //
//                                  //
//----------------------------------//


/* global define:true */


define([
	'jquery',
	window.baseStyleJs+'/libraries/imagesloaded/imagesloaded.pkgd.min.js',
	window.baseStyleJs+'/libraries/jquery.inview/jquery.inview.min.js',
	window.baseStyleJs+'/structure/main-min.js',
	window.baseStyleJs+'/structure/modal-min.js'
], function() {	

	return {

		init: function(){
			

			$(document).resize();
	

			//----------------------------------------------------
			// UNVEIL CONTENT WHEN ALL IMAGES (IMG and BGD IMAGES)
			// ARE LOADED
			//----------------------------------------------------


			$('#general').imagesLoaded({background: 'div, a, span'}, function(){
				$('html').addClass('htmlReady');
			});


			//----------------------------------------------------
			// APPEAR EFFECTS
			//----------------------------------------------------


			window.general_appearEffects = function(){

				$('.appear, img, .wp-caption').on('inview', function(event, isInView) {
					if (isInView) {
						$(this).addClass('appear--on');
					}		
				});
	
			};

			setTimeout(function(){
				window.general_appearEffects();
			}, 500);


			//-----------------------------------------------------------
			// USE TAP AS HOVER ON TOUCH DEVICES. USE CLASS "touchHover"
			//-----------------------------------------------------------


			// Click on ".touchHover" element

			$('body').on('click touchend', '.touchHover', function(e){
				if($('html').hasClass('usingTouch')) {
					if($(this).is('a')) {
						if($(this).hasClass('hover')) {
							// Do the link
						} else {
							e.preventDefault();
							$('.touchHover').not(this).removeClass('hover');
							$(this).addClass('hover');
						}
					} else {
						e.preventDefault();
						$('.touchHover').not(this).removeClass('hover');
						$(this).toggleClass('hover');
					}
				}
			});

			// Click on an "a" inside a ".touchHover" element

			$('body').on('click touchend', '.touchHover a', function(e){
				e.stopPropagation();
			});

			// Click on any element

			$(document).on('click touchend', function(event) {
	
				// Remove "hover" class on any ".touchHover" element not clicked
	
				if(!$(event.target).closest('.touchHover').length && !$(event.target).is('.touchHover')) {
					$('.touchHover').removeClass('hover');
				}
	    
			});


			//---------------------------------------------------------
			// DYNAMIC CONTENT LOADING: COMMON CONSTANTS
			//---------------------------------------------------------
	

			// window.homePath defined in foot
			window.siteURL = "http://" + top.location.host.toString();
			window.pagePath = top.location.pathname.toString();
			window.pageHash = top.location.hash.toString();
			var homeTitle = "";


			//---------------------------------------------------------
			// DYNAMIC CONTENT LOADING: MARK HOME AND INTERNAL LINKS
			//---------------------------------------------------------
	
	
			window.general_markInternalLinks = function(){
		
				// Internal links
			
				var $internalLinks = $("a[href^='"+window.siteURL+"'], a[href^='/'], a[href^='./'], a[href^='../'], a[href^='#']").not('.noInternalLink');
				$internalLinks.addClass('internalLink');
		
				// No internal Links

				$('#navigation__languages a').removeClass('internalLink');
				$('#main__pagination a').removeClass('internalLink');
				$('#modal__navigation a').removeClass('internalLink');
				$('.wp-caption a').removeClass('internalLink');
				$('.module--gallery a').removeClass('internalLink');
				$('.gallery a').removeClass('internalLink');
				$('#navigation__menu li.contact a').removeClass('internalLink');	

				// HomeLinks
				
				$("a[href$='"+window.homePath+"']").addClass('homeLink');
		
			};
	
			window.general_markInternalLinks();


			//---------------------------------------------------------
			// DYNAMIC CONTENT LOADING: GO HOME FUNCTION
			//---------------------------------------------------------


			window.general_goHome = function(pushState){
		
				// Trigger resize
				
				$(window).trigger('resize');

				// Hide menu
		
				window.navigation_navigationHide();

				// Push new browser state

				pushState = typeof pushState !== 'undefined' ? pushState : true;  // Default value
				if(pushState) {
					var stateObj = {};
					history.pushState(stateObj, "", window.homePath);
				}

				// Update window title

				document.title = homeTitle;

				// Google Analytics tracking

				if (typeof ga == 'function') {
					ga('set', {
						page: window.location.pathname,
						title: document.title
					});
					ga('send', 'pageview'); 
				}

				// Update navigation content

				$('#navigation__menu li').removeClass('current-menu-item current-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');
				$('#navigation__menu a.homeLink').parent('li').addClass('current-menu-item');
				
				// Hide Modal

				window.modal_modalHide();
				
				// Remove modal content;
				
				window.timer1 = setTimeout(function() {
					$('#modal__inner').empty();
					$('#modal').removeClass();
				}, 1000);	
				
			};


			//---------------------------------------------------------
			// DYNAMIC CONTENT LOADING: GO URL FUNCTION
			//---------------------------------------------------------


			window.general_goToURL = function(targetURL, pushState){
		
				clearTimeout(window.timer1);
				
				// Put "loading" spinner

				$('html').addClass('modalLoading');

				// Load content
		
				$('#modal').delay(80).queue(function() {
					
					$.get( targetURL )
					
						.done(function( data ) {
							
							// Success:
					
							var newPage = $(data);				

							// Hide navigation
		
							window.navigation_navigationHide();
		
							// Show Modal

							window.modal_modalShow();

							// Update Modal content
				
							setTimeout(function() {

								var newModal = newPage.find('#modal__inner > *');
								$('#modal__inner').html(newModal);								
																
								// Update modal panel classes
							
								newModal = newPage.find('#modal');
								$('#modal').removeClass().addClass(newModal.attr('class'));
								
								// Appear effects

								window.general_appearEffects();

								// Push new browser state
				
								pushState = typeof pushState !== 'undefined' ? pushState : true;  // Default value
								if(pushState) {
									var stateObj = {};
									history.pushState(stateObj, "", targetURL);
								}
				
								// Update window title
				
								document.title = newPage.filter("title").text();
				
								// Google Analytics tracking
				
								if (typeof ga == 'function') {
									ga('set', {
										page: window.location.pathname,
										title: document.title
									});
									ga('send', 'pageview'); 
								}
				
								// Update navigation menu content

								var newNavigationMenu =  newPage.find('#navigation__menu > *');
								$('#navigation__menu').html(newNavigationMenu);

								// Update navigation menu content

								var newNavigationLanguages =  newPage.find('#navigation__languages > *');
								$('#navigation__languages').html(newNavigationLanguages);

								// Update internal links, clases, etc

								window.general_markInternalLinks();
								
								// Trigger resize
								
								$(window).trigger('resize');
								
								// Remove "loading" spinner

								$('html').removeClass('modalLoading');
								
								// Animate scroll to anchor
								
								if(targetURL.indexOf('#') > 0) { 
									var targetHash = targetURL.substring(targetURL.indexOf('#'));
									window.modal_goToAnchor(targetHash);
								}
								
							}, 1000);
							
						})
						
						.fail(function( data ) {
							
							// Remove "loading" spinner

							$('html').removeClass('modalLoading');
							
						});
								
				}).dequeue();
				
			};


			//----------------------------------------------------
			// DYNAMIC CONTENT LOADING: LANDING
			//----------------------------------------------------


			// If hash, remove and refresh
			
			if(window.pageHash != "") { 
				window.location.href = window.location.href.substr(0, window.location.href.indexOf('#')-1);
			}


			// By default: home page
			

			homeTitle = $(document).find("title").text();


			// When the user lands on an inner page, load home content and show modal panel


			if(window.pagePath !== window.homePath) {
				
				// Load home content
			
				$.get( window.homePath )
					.done(function( data ) {
						var newPage = $(data);
						var newMainContent = newPage.find('#main > *');
						$('#main').html(newMainContent);
						homeTitle = $(data).filter("title").text();  // Update home title
						$(window).trigger('resize');
					});

				// Show modal
				
				window.modal_modalShow();
				
			}


			//----------------------------------------------------
			// DYNAMIC CONTENT LOADING: INNER LINKS
			//----------------------------------------------------
	
	
			// When the user clicks on a link to home page

	
			$('body').on('click', '.homeLink', function(e){
				e.preventDefault();
				window.general_goHome();
			});


			// When the user clicks on an internal link

	
			$('body').on('click', '.internalLink:not(.homeLink)', function(e){
				e.preventDefault();
				var targetURL  = $(this).attr('href');
				window.general_goToURL(targetURL);
			});


			//----------------------------------------------------
			// DYNAMIC CONTENT LOADING: BACK AND FORWARD BUTTONS
			//----------------------------------------------------


			window.onpopstate = function(e){
				var newURL = document.location.href;
				if(newURL.endsWith(window.homePath)) {
					window.general_goHome(false);  // Go home without pushing state
				} else {
					window.general_goToURL(newURL, false);  // Go URL without pushing state
				}
			};


			//----------------------------------------------------
			// GOOGLE ANALYTICS: BUTTON TRACKING
			//----------------------------------------------------


			if (typeof ga == 'function') {
				$('body').on('click', 'input[type="submit"], button[type="submit"]', function(){
					ga('send', 'event', {
						'eventCategory': 'button',
						'eventAction': 'submit',
						'eventLabel': 'Form submit button clicked',
						'eventValue': top.location.pathname.toString()
					});					
				});
			}	

			/*  Invoque this function on "thank you" pages:
			
				if (typeof ga == 'function') {
					ga('set', {
						page: window.location.pathname+'thankyou/',
						title: document.title
					});
					ga('send', 'pageview'); 
				}

			*/

			
		}
		
	};
	
});

