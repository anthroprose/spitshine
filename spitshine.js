/*
 * Spitshine v.02
 * 
 * Validation for Twitter's Bootstrap Framework
 * 
 */

!function($){

	"use strict"

	var errors 			= false;
	
	var methods 		= {
		
		init : function(options) {
			
			return $('#' + $(this).attr('id') + ' input').each(function() {
				
				var _this = this;
						
				if ($(_this).attr('class') !== undefined) {
					
					$($(_this).attr('class').split(' ')).each(function() {
					 	
						if (this !== '') {
						
							if (this.substring(0,6) === 'valid-') {
								
								$(_this).bind('focusout', methods.validate_field);
								
							}
							
						}
						
					});
				
				}
				
				
			});

		},
		
		destroy : function() {},
		
		valid : function(opts) {
			
			$('#' + $(this).attr('id') + ' input').each(function() {
				 
				methods.validate_field(this); 
				
			});
			
			return !errors;
			
		},
		
		validate_field : function (selector) {
			
			var valid 		= true;
			
			if (selector.target === undefined) { selector = this; }
			else { selector = selector.target; }
			
			$($(selector).attr('class') !== undefined && $(selector).attr('class').split(' ')).each(function() {
				 	
				if (valid === true && this !== '') {
				
					if (this.substring(0,6) === 'valid-') {
						 
						var funcname = this.replace(/-/g, '_');
						if (funcname.substring(0,12) == 'valid_length') { funcname = 'valid_length'; }
						
						if (typeof methods[funcname] === 'function') {
						
							var result = methods[funcname](selector);
							
							if (result === false) { 
								
								errors = true; 
								valid = false;
								 
							}
							
						}
												
					}
					
				}
				
			});
			
			if (valid === true) { 
				
				errors = false;
				$(selector).parent().parent().addClass('success');
				$(selector).parent().parent().removeClass('error'); 
				
			}
			else {
			
				$(selector).parent().parent().addClass('error');
				$(selector).parent().parent().removeClass('success');
				
			}
			
			return this;
			
		},

		valid_required : function(field) { 
		 
		 	var selector 	= $(field).parent().parent();
		 
			if ($(field).attr('type') === 'text' && $(field).val() === '') { return false; }
		 	else if ($(field).attr('type') === 'select' && $(field).val() === '') { return false; }
			else if ($(field).attr('type') === 'checkbox' && !$(field).attr('checked')) { return false; }
		
		},
		
		valid_email : function(field) {
		 	
			var selector 	= $(field).parent().parent();
			var regex 		= /\S+@\S+\.\S+/;
			
			
			if (jQuery.trim($(field).val()).length > 0 && !regex.test(jQuery.trim($(field).val()))) { return false; }
	
		},
		
		valid_phone : function(field) {

			var selector 	= $(field).parent().parent();
			var regex = /^\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/;
			
			if (jQuery.trim($(field).val()).length > 0 && !regex.test(jQuery.trim($(field).val()))) { return false; }
						
			
		},
			
		valid_numeric : function(field) {
			
			var _this 		= this;
			var selector 	= $(this).parent().parent();
			var regex 		= /^[-]?[0-9]+[\.]?[0-9]+$/;
			
			if (jQuery.trim($(field).val()).length > 0 && !regex.test(jQuery.trim($(field).val()))) { return false; }
			
		},
		
		valid_alpha : function(field) {
			
			var _this 		= this;
			var selector 	= $(this).parent().parent();
			var regex 		= /^[a-zA-Z]+$/;
			
			if (jQuery.trim($(field).val()).length > 0 && !regex.test(jQuery.trim($(field).val()))) { return false; }
			
		},
		
		valid_length : function(field) {
			
			var _this 		= this;
			var selector 	= $(this).parent().parent();
			var return_val;
			
			$($(field).attr('class').split(' ')).each(function() {
				 
				if (this !== '' && this.substring(0,13) == 'valid-length-') {
						
					if (jQuery.trim($(field).val()).length !== parseInt(this.substring(13))) { return_val = false; }
						
				}
					
    		});
			
			return return_val;
			
		}
		
  	};
  
  
	$.fn.spitshine = function(method) {
  
		if (methods[method]) {
			
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			
		} else if (typeof method === 'object' || !method) {
			
			return methods.init.apply(this, arguments);
			
		} else {
			
			$.error('Method ' +  method + ' does not exist on jQuery.spitshine');
			
		}

  };
  
}(window.jQuery);