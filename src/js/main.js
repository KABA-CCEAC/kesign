$.support.placeholder = false;
var placeholderTest = document.createElement('input');
if('placeholder' in placeholderTest) $.support.placeholder = true;

$(document).ready(function() {
	//= form.js
	//= brandbar.toggle.js
	//= sidebar.accordion.toggle.js
});

//= equalheight.js