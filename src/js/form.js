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