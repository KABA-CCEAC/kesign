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