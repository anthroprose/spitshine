Spitshine
=========

jQuery Validation Library for Twitter&#39;s Bootstrap v2.0

Spitshine requires the use of Bootstrap 2.0's new control-group structure and syntax for form elements, styles are applied to parent().parent() of the element in question.

```javascript
	$(document).ready(function() {
					
		$('#form').spitshine();
		
		// Custom method, useful for AJAX and other more comples validators, or just inserting your function.
		$('#form').spitshine('method','required', function(selector) { if ($(selector).val() == '') { return false; }});
		
		// Don't use Bootstrap? Override the internal class functions to use with your own DOM structures.
		$('#form').spitshine('method','field_error', function (selector) {
			
			$(selector).parent().parent().addClass('error');
			$(selector).parent().parent().removeClass('success');
				
		});

		//Optional
		$('#submit').bind('click', function() { return $('#form').spitshine('valid'); });

	});
```

```html
	<form id="form">
		<div class="control-group">
			<div class="input">
				<input class="valid-required valid-email valid-custom-required" id="email" name="email" type="text" />
				<span class="help-inline"></span>
			</div>
		</div>
		
		<!-- Optional -->
		<input type="submit" name="submit" id="submit" value="submit" onclick="return $('#form').spitshine('valid');" />
		
	</form>	
```

Available Methods
-------------------------

* spitshine (interface/driver method)

	1) () - (Initialization/Constructor)
	
	2) ('valid') - (returns true/false depending on entire form validation)

	3) ('method', (method name), (function)) - Add a custom method to the mix, or use to override the selector/class functions 
	
	
Available Validation Classes
-------------------------

* valid-required

	1) Checks input type=text for val() === ''
	
	2) Checks input type=checkbox for is:checked
	
	3) Checks input type=select for is:selected
	
* valid-email

	1) Simplified email regex (/\S+@\S+\.\S+/) please confirm email, do not rely on validation.
	
* valid-numeric

	1) Checks for a numeric only string 
	
* valid-alpha

	1) Checks for alphabetic only entry

* valid-phone

	1) Checks common digit structure and formatting
	2) Also checks for exclusion list of prefixes and exchanges

* valid-length-(n)

	1) Validates exact length (valid-length-5 for zipcodes)

* valid-custom-(function)

	1) Calls custom (function) that was added, is passed the current selector