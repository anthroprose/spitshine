/*
 * Spitshine v.04
 * 
 * Validation for Twitter's Bootstrap Framework
 * 
 */

!function($){

	"use strict"

	var errors 			= false;
	
	var methods 		= {
		
		init : function(options) {
			
			$('#' + $(this).attr('id') + ' input, #' + $(this).attr('id') + ' select, #' + $(this).attr('id') + ' input:checkbox').each(function() {
				
				var _this = this;
						
				if ($(_this).attr('class') !== undefined) {
					
					$($(_this).attr('class').split(' ')).each(function() {
					 	
						if (this !== '' && this.substring(0,6) === 'valid-') {
							
							$(_this).bind('focusout', methods.validate_field);
							
						}
						
					});
				
				}
				
			});

		},
		
		valid : function() {
			
			errors = false;
			$('#' + $(this).attr('id') + ' input, #' + $(this).attr('id') + ' select, #' + $(this).attr('id') + ' input:checkbox').each(function() { methods.validate_field(this); });
			
			return !errors;
			
		},
		
		field_error : function (selector) {
			
			$(selector).closest('.control-group').addClass('error');
			$(selector).closest('.control-group').removeClass('success');
			
		},
		
		field_success : function (selector) {
			
			$(selector).closest('.control-group').removeClass('error');
			$(selector).closest('.control-group').addClass('success');
			
		},
		
		validate_field : function (selector) {
			
			var valid 		= true;
			
			if (selector.target !== undefined) { selector = selector.target; }
			
			$($(selector).attr('class') !== undefined && $(selector).attr('class').split(' ')).each(function() {
				 	
				if (valid === true && this !== '' && this.substring(0,6) === 'valid-') {

					var funcname = this.replace(/-/g, '_');
					
					if (funcname.substring(0,12) == 'valid_length') { funcname = 'valid_length'; }
					if (funcname.substring(0,15) == 'valid_maxlength') { funcname = 'valid_maxlength'; }
					else if (funcname.substring(0,12) == 'valid_custom') {  funcname = funcname.substring(13); }
					
					if (typeof methods[funcname] === 'function') {
					
						var result = methods[funcname](selector);
						
						if (result === false) {
							
							errors = true; valid = false;
							 
						}
						
					}
					
				}
				
			});
			
			if (valid === true) { methods['field_success'](selector);  }
			else { methods['field_error'](selector); }
			
			return this;
			
		},

		valid_required : function(field) { 
		 		 
			if ($(field).attr('type') === 'text' && $(field).val() === '') { return false; }
		 	else if ($(field).is('select') && $(field).val() === '') { return false; }
			else if ($(field).attr('type') === 'checkbox' && !$(field).is(':checked')) { return false; }
			else if ($(field).attr('type') === 'radio' && $('#' + $(field).parents('form:first').attr('id') + ' input[name=' + $(field).attr('name') + ']:checked').val() == undefined) { return false; }
		
		},
		
		valid_email : function(field) {
		 	
			var regex 		= /\S+@\S+\.\S+/;
			
			if (jQuery.trim($(field).val()).length > 0 && !regex.test(jQuery.trim($(field).val()))) { return false; }
	
		},
		
		valid_phone : function(field) {

			var regex = /^\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/;
			
			if (jQuery.trim($(field).val()).length > 0 && !regex.test(jQuery.trim($(field).val()))) { return false; }

		},
			
		valid_numeric : function(field) {
			
			var regex 		= /^[-]?[0-9]+[\.]?[0-9]+$/;
			
			if (jQuery.trim($(field).val()).length > 0 && !regex.test(jQuery.trim($(field).val()))) { return false; }
			
		},
		
		valid_alpha : function(field) {
			
			var regex 		= /^[a-zA-Z]+$/;
			
			if (jQuery.trim($(field).val()).length > 0 && !regex.test(jQuery.trim($(field).val()))) { return false; }
			
		},
		
		valid_length : function(field) {
			
			var return_val;
			
			$($(field).attr('class').split(' ')).each(function() {
				 
				if (this !== '' && this.substring(0,13) == 'valid-length-' && jQuery.trim($(field).val()).length !== parseInt(this.substring(13))) { return_val = false; }
					
    		});
			
			return return_val;
			
		},
		
		valid_maxlength : function(field) {
			
			var return_val;
			
			$($(field).attr('class').split(' ')).each(function() {
				 
				if (this !== '' && this.substring(0,16) == 'valid-maxlength-' && jQuery.trim($(field).val()).length > parseInt(this.substring(16))) { return_val = false; }
					
    		});
			
			return return_val;
			
		},
		
		valid_nospace : function(field) {
			
			var regex 		= /^[\S]+$/;
			
			if (jQuery.trim($(field).val()).length > 0 && !regex.test(jQuery.trim($(field).val()))) { return false; }
			
		},
		
		method : function (name, func) { methods[name] = func; } 
		
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