!function( $ ){

	"use strict"

	var errors 			= false;
	
	var methods 		= {
		
		init : function(options) {
			
			return $('#' + $(this).attr('id') + ' input').each(function() {
				
				var _this = this;
								
				$($(_this).attr('class').split(' ')).each(function() {
				 	
					if (this !== '') {
					
						if (this.substring(0,6) === 'valid-') {
							
							$(_this).bind('focusout', methods.validate_field);
							
						}
						
					}
					
				});
				
				
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
						 
						if (typeof methods[this.replace('-', '_')] === 'function') {
						
							if (methods[this.replace('-', '_')](selector) === false) { errors = true; valid = false; };
							
						}
												
					}
					
				}
				
			});
			
			if (valid === true) { errors = false; }
			
		},

		valid_required : function(field) { 
		 
		 	var selector 	= $(field).parent().parent();
		 
			if ($(field).attr('type') === 'text' && $(field).val() === '') { selector.removeClass('success'); selector.addClass('error'); return false; }
			else if ($(field).attr('type') === 'text' && $(field).val() !== '') { selector.removeClass('error'); selector.addClass('success'); }
		 
		 	if ($(field).attr('type') === 'select' && !$(field).is(':selected')) { selector.addClass('error'); return false; }
			else if ($(field).attr('type') === 'select' && $(field).is(':selected')) { selector.removeClass('error'); selector.addClass('success'); }
			
			if ($(field).attr('type') === 'checkbox' && !$(field).is(':checked')) { selector.addClass('error'); return false; }
			else if ($(field).attr('type') === 'checkbox' && $(field).is(':checked')) { selector.removeClass('error'); selector.addClass('success'); }
		 
		},
		
		valid_email : function(field) {
		 	
			var selector 	= $(field).parent().parent();
			var regex 		= /\S+@\S+\.\S+/;
			
			if (!regex.test(jQuery.trim($(field).val()))) { selector.addClass('error'); selector.removeClass('success'); return false; }
			else { selector.removeClass('error'); selector.addClass('success'); }
	
		},
		
		valid_numeric : function() {
			
			var _this 		= this;
			var selector 	= $(this).parent().parent();
			var regex = /^[-]?[0-9]+[\.]?[0-9]+$/;
			
			if (!regex.test(jQuery.trim($(this).val()))) { selector.addClass('error'); selector.removeClass('success'); return false; }
			else { selector.removeClass('error'); selector.addClass('success'); }
			
		},
		
		valid_alpha : function() {
			
			var _this 		= this;
			var selector 	= $(this).parent().parent();
			var regex 		= /^[a-zA-Z]+$/;
			
			if (!regex.test(jQuery.trim($(this).val()))) { selector.addClass('error'); selector.removeClass('success'); return false; }
			else { selector.removeClass('error'); selector.addClass('success'); }
			
		},
		
		valid_length : function() {
			
			var _this 		= this;
			var selector 	= $(this).parent().parent();
			
			$($(this).attr('class').split(' ')).each(function() {
				 
				if (this !== '') {
					
					if (this.substring(0,13) == 'valid-length-') {
						
						if (jQuery.trim($(this).val()).length !== this.substring(13)) { selector.addClass('error'); selector.removeClass('success'); return false; }
						else { selector.removeClass('error'); selector.addClass('success'); }
						
					}
					
				}
				
    		});
			
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