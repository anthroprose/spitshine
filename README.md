Spitshine
=========

jQuery Validation Library for Twitter&#39;s Bootstrap v2.0

Spitshine requires the use of Bootstrap 2.0's new control-group structure and syntax for form elements, styles are applied to parent().parent() of the element in question.

```javascript
	$(document).ready(function() {
				
		$('#form').spitshine();
					
	});
```

```html
	<input class="valid-required valid-email" id="email" name="email" type="text" />
```