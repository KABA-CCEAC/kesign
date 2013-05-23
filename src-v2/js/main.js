(function() {
  $.support.placeholder = false;
  var placeholderTest = document.createElement('input');
  if('placeholder' in placeholderTest) $.support.placeholder = true;

  $(document).ready(function() {  
    //= brandbar.toggle.js
    //= sidebar.accordion.toggle.js
      //= bootstrap.touchfix.js
  });

  //= form.js
  //= equalheight.js
})();