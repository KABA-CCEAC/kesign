// kesign, v0.0.1
// Copyright (c)2012 Kaba AG.
// Distributed under MIT license
// http://kesign.com
$(document).ready(function() {
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
});