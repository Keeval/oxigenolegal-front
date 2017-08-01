//----------------------------------//
//                                  //
//  General style logic             //
//                                  //
//----------------------------------//


/*global define:true */


define(function (require) {
	
	
	/*======================================================================*/
	/* JQUERY                                                               */
	/*======================================================================*/


	if(typeof jQuery === 'function') {
		define('jquery', function(){ return jQuery; });
	} else {
		require('jquery');
	}


	/*======================================================================*/
	/* LIBRARIES                                                            */
	/*======================================================================*/


	require([window.baseStyleJs+'/libraries/browserIdentify/browserIdentify-min.js']);
    require([window.baseStyleJs+'/libraries/detectInputMethod/detectInputMethod-min.js']);
    require([window.baseStyleJs+'/libraries/imagesloaded/imagesloaded.pkgd.min.js']);
    require([window.baseStyleJs+'/libraries/jquery.inview/jquery.inview.min.js']);
    require([window.baseStyleJs+'/libraries/jquery.initialize/jquery.initialize.js']);
    require([window.baseStyleJs+'/libraries/touchSwipe/touchSwipe.js']);
    require([window.baseStyleJs+'/libraries/fitie/dist/fitie.js']);
    require([window.baseStyleJs+'/libraries/jquery.fancybox/source/jquery.fancybox.pack.js']);
    require([window.baseStyleJs+'/libraries/measureScrollbar/measureScrollbar-min.js']);


	/*======================================================================*/
	/* COMMONS                                                              */
	/*======================================================================*/


    require([window.baseStyleJs+'/commons/forms-min.js'], function(obj){
    	obj.init();
    });


	/*======================================================================*/
	/* STRUCTURE                                                            */
	/*======================================================================*/


    require([window.baseStyleJs+'/structure/navigation-min.js'], function(obj){
    	obj.init();
    });
    require([window.baseStyleJs+'/structure/main-min.js'], function(obj){
    	obj.init();
    });
    require([window.baseStyleJs+'/structure/modal-min.js'], function(obj){
    	obj.init();
    });
    require([window.baseStyleJs+'/structure/general-min.js'], function(obj){
    	obj.init();
    });
    require([window.baseStyleJs+'/structure/awwwards-min.js'], function(obj){
    	obj.init();
    });


	/*======================================================================*/
	/* MODULES                                                              */
	/*======================================================================*/


    require([window.baseStyleJs+'/modules/module_wysiwyg-min.js'], function(obj){
    	obj.init();
    });
    require([window.baseStyleJs+'/modules/module_quotes-min.js'], function(obj){
    	obj.init();
    });
    require([window.baseStyleJs+'/modules/module_centers-min.js'], function(obj){
    	obj.init();
    });
    require([window.baseStyleJs+'/modules/module_gallery-min.js'], function(obj){
    	obj.init();
    });
    require([window.baseStyleJs+'/modules/module_map-min.js'], function(obj){
    	obj.init();
    });


});
