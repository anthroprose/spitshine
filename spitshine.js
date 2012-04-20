!function( $ ){

	"use strict"

	var methods = {
		
		init : function( options ) {
			
			return $('#' + $(this).attr('id') + ' input').each(function() {
				
				if ($(this).hasClass('valid-required')) {
				
					$(this).bind('focusout', methods.valid_required);
					
				}
				
				
			});

		},
		
		destroy : function( ) {

			//return this.each(function(){
				//$(window).unbind('.tooltip');
			//})

		},
		
		valid_required : function( ) { 
		 
			if ($(this).attr('type') == 'text' && $(this).val() === '') { $(this).parent().parent().addClass('error'); }
			else if ($(this).attr('type') == 'text' && $(this).val() !== '') { $(this).parent().parent().removeClass('error'); $(this).parent().parent().removeClass('success'); }
		 
		}
		
  	};
  
	$.fn.spitshine = function(method) {
  
		if (methods[method]) {
			
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			
		} else if (typeof method === 'object' || ! method) {
			
			return methods.init.apply(this, arguments);
			
		} else {
			
			$.error('Method ' +  method + ' does not exist on jQuery.spitshine');
			
		}

  };
  
}( window.jQuery );



function _validate_email(val) {

	var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/;  
	return regex.test(val);
	  
}  
     
