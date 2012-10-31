// kesign, v0.9.0
// Copyright (c)2012 Kaba AG.
// Distributed under MIT license
// http://kaba-cceac.github.com/kesign/
$.support.placeholder = false;
var placeholderTest = document.createElement('input');
if('placeholder' in placeholderTest) $.support.placeholder = true;

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

$.fn.hideLabels = function (options) {
    if (!$.support.placeholder) return;
    
    return this.each(function() {
        // localize childs
        var elements =  $(this).find('label.hideable');
        elements.each(function() { 
            $(this).hide();
        });
    });
};

$(document).ready(function() {
  $('.form-hideLabels').hideLabels();
});
(function($) {
	$.fn.equalHeights = function(minHeight, maxHeight) {
		tallest = (minHeight) ? minHeight : 0;
		this.each(function() {
			if($(this).height() > tallest) {
				tallest = $(this).height();
			}
		});
		if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
		return this.each(function() {
			$(this).height(tallest).css("overflow","auto");
		});
	}
})(jQuery);