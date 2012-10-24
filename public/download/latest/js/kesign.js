// kesign, v0.0.5
// Copyright (c)2012 Kaba AG.
// Distributed under MIT license
// http://kesign.com
$.support.placeholder = false;
var placeholderTest = document.createElement('input');
if('placeholder' in placeholderTest) $.support.placeholder = true;

$(document).ready(function() {
	if ($.support.placeholder) {
	  $('.form-hideLabels').find('label.hideable').hide();
	}
	if ($('.toggleBrandbar').data('toggle') === 'collapse') {
	  var icon = $('.toggleBrandbar i');
	  $('.brandbar').on('hide', function () {
	    $('.header').addClass('collapsed');
	    icon.removeClass('icon-chevron-up').addClass('icon-chevron-down');
	  });
	  $('.brandbar').on('show', function () {
	    $('.header').removeClass('collapsed');
	    icon.removeClass('icon-chevron-down').addClass('icon-chevron-up');
	  });
	}
	if ($('.sidebar .accordion-group').length > -1 && $('.sidebar .accordion-group').data('toggle') === 'collapse') {
	  $('.sidebar .accordion-group > ul').on('hide', function() {
	    $(this).parent().addClass('collapsed');
	  });
	  $('.sidebar .accordion-group > ul').on('show', function() {
	    var actives = $('.sidebar .accordion-group');
	    actives.each(function() {
	      $(this).addClass('collapsed');
	    });
	
	    $(this).parent().removeClass('collapsed');
	  });
	}
});