//----------------------------------//
//                                  //
//  Browser identify                //
//  Muskae 2016                     //
//                                  //
//----------------------------------//


$(function() {


	window.browserIdentify_isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	window.browserIdentify_isFirefox = typeof InstallTrigger !== 'undefined';
	window.browserIdentify_isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	window.browserIdentify_isIE = /*@cc_on!@*/false || !!document.documentMode;
	window.browserIdentify_isEdge = !window.browserIdentify_isIE && !!window.StyleMedia;
	window.browserIdentify_isChrome = (!!window.chrome && !!window.chrome.webstore) || navigator.userAgent.indexOf('Chrome') >= 0;
	window.browserIdentify_isBlink = (window.browserIdentify_isChrome || window.browserIdentify_sOpera) && !!window.CSS;
	window.browserIdentify_isiPhone = navigator.userAgent.indexOf('iPhone') >= 0;
	window.browserIdentify_isiPad = navigator.userAgent.indexOf('iPad') >= 0;
	window.browserIdentify_isiOS = window.browserIdentify_isiPhone || window.browserIdentify_isiPad;
	window.browserIdentify_isAndroid = navigator.userAgent.indexOf('Android') >= 0;
	
	if(window.browserIdentify_isOpera) {
		$('html').addClass('isOpera');
	}
	if(window.browserIdentify_isFirefox) {
		$('html').addClass('isFirefox');
	}
	if(window.browserIdentify_isSafari) {
		$('html').addClass('isSafari');
	}
	if(window.browserIdentify_isIE) {
		$('html').addClass('isIE');
	}
	if(window.browserIdentify_isEdge) {
		$('html').addClass('isEdge');
	}
	if(window.browserIdentify_isChrome) {
		$('html').addClass('isChrome');
	}
	if(window.browserIdentify_isBlink) {
		$('html').addClass('isBlink');
	}
	if(window.browserIdentify_isiPhone) {
		$('html').addClass('isiPhone');
	}
	if(window.browserIdentify_isiPad) {
		$('html').addClass('isiPad');
	}
	if(window.browserIdentify_isiOS) {
		$('html').addClass('isiOS');
	}
	if(window.browserIdentify_isAndroid) {
		$('html').addClass('isAndroid');
	}


	/*======================================================================*/
	/* Avoid Safari to use cached JS on browser back navigation             */
	/*======================================================================*/

	
	if($('html').hasClass('isSafari')) {
		window.onpageshow = function(event) {
			if (event.persisted) {
				window.location.reload();
			}
		};
	}

	
});
