Spitshine
=========

jQuery Validation Library for Twitter&#39;s Bootstrap v2.0

Spitshine requires the use of Bootstrap 2.0's new control-group structure and syntax for form elements, styles are applied to parent().parent() of the element in question.

```javascript
	$(document).ready(function() {
					
		$('#form').spitshine();
		
		// Optional
		$('#form').submit(function() { return $('#form').spitshine('valid'); });
		
	});
```

```html
	<form id="form">
		<div class="control-group">
			<div class="input">
				<input class="valid-required valid-email" id="email" name="email" type="text" />
				<span class="help-inline"></span>
			</div>
		</div>
		
		<!-- Optional -->
		<input type="submit" name="submit" id="submit" value="submit" onsubmit="return $('#form').spitshine('valid');" />
		
	</form>	
```

Available Methods
-------------------------

* spitshine (interface/driver method)

	1) () - Null/Empty (Initialization/Constructor)
	
	2) ('valid') (returns true/false depending on entire form validation)

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

* valid-length-(n)

	1) Validates exact length (valid-length-5 for zipcodes)