//--------------------------------------------------//
//                                                  //
//  Forms behavior and client side validation       //
//                                                  //
//--------------------------------------------------//


/* global define:true */


define([
	'jquery'
], function() {

	return {
		
		init: function(){
						

			//---------------------------------------------------------
			// Add form type control classes
			//---------------------------------------------------------


			$('.form')
				.find('input[type=text], input[type=date], input[type=datetime], input[type=email], input[type=number], input[type=password], input[type=url], input[type=tel]' )
				.closest('label')
					.addClass('form_controlInputText');

			$('.form')
				.find('input[type=checkbox]' )
				.closest('label')
					.addClass('form_controlInputCheckbox');

			$('.form')
				.find('input[type=radio]' )
				.closest('label')
					.addClass('form_controlInputRadio');
					
			$('.form')
				.find('input[type=file]' )
				.closest('label')
					.addClass('form_controlInputFile');

			$('.form')
				.find('textarea' )
				.closest('label')
					.addClass('form_controlTextarea');

			$('.form select')
				.closest('label')
					.addClass('form_controlSelect');


		}
		
	};
	
});


/*

//---------------------------------------------------------
// CF7 Validation: Mark "not-valid" fields on validate
// 
// NOTE: Load this syncronously, outside "Require.js"
// (see "logic/logic.js")
//---------------------------------------------------------

	
jQuery('.wpcf7').on('wpcf7:invalid', function(){
	jQuery('.wpcf7-form-control.wpcf7-not-valid').closest('label').addClass('form-control-not-valid');
	jQuery('.wpcf7-form-control:not(.wpcf7-not-valid)').closest('label').removeClass('form-control-not-valid');
});

*/
