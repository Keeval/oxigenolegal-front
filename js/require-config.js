//----------------------------------//
//                                  //
// Require.js Config                //
//                                  //
//----------------------------------//


requirejs.config({
    baseUrl: '/',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        jquery: 'js/libraries/jquery-1.11.2',
		style: 'style/js/style'
    },
    shim: {
        style: ['jquery']
    }
});


//----------------------------------//
// Init                             //
//----------------------------------//


requirejs(['jquery','style'], function($) {});
