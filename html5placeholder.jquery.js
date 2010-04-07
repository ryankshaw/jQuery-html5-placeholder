// HTML5 placeholder plugin version 0.3
// find me at: http://github.com/ryankshaw/jQuery-html5-placeholder
// Original version Copyright (c) 2010-The End of Time, Mike Taylor, http://miketaylr.com
// MIT Licensed: http://www.opensource.org/licenses/mit-license.php
//
// Enables cross-browser* html5 placeholder for inputs, by first testing
// for a native implementation before building one.
//
// *NOTE: Totally busted in ie6. Fork it and fix it if you care.
//
// USAGE: 
//$('input[placeholder]').placeholder();

// <input type="text" placeholder="username">
(function($){
  
  $.fn.placeholder = function(options) {
    var opts = $.extend($.fn.placeholder.defaults, options);
  
    //first test for native placeholder support before continuing
    //feature detection inspired by ye olde jquery 1.4 hawtness, with paul irish
    return ('placeholder' in document.createElement('input')) ? this : this.each(function() {
      var $this = $(this),
          //grab the inputs id for the <label for>, or make a new one from the Date
          //ids can start with numbers in html5, btw
          inputId = $this.attr('id') || new Date(),
          $label = $('<label/>', {
            'for' : inputId,
            html  : $this.attr('placeholder'),
            css   : $.extend({}, opts.placeholderCSS, {
              //stuff in some calculated values into the placeholderCSS object
              'font-family' : $this.css('font-family'),
              'font-size'   : $this.css('font-size'),
              'color'       : $this.attr(''),
              'width'       : $this.width(),
              'height'      : $this.height(),
              // adjust position of placeholder to accomodate opera's super ugly 'email' and 'url' graphics
              'left'        : $.browser.opera && ($this.attr('type') === 'email' || $this.attr('type') === 'url') ? '11%' : opts.placeholderCSS.left
            }),
            click : function(){
              $this.focus(); //if you click the label, focus the input
            }
          })[$.trim($this.val()) ? 'hide' : 'show' ](); // Show or hide the placeholder label depending on if there is text in the input.
      
      $this
        .wrap(opts.inputWrapper)
        .attr('id', inputId)
        //hide placeholder on focus
        .focus(function(){
          if (!$.trim($this.val())){
           $label.hide();
          };
        })
        //show placeholder if the input is empty
        .blur(function(){
          if (!$.trim($this.val())){
            $label.show();
          };
        })
        .after($label);
    });
  };
  
  //expose defaults
  $.fn.placeholder.defaults = {
    //you can pass in a custom wrapper
    inputWrapper: '<span style="position:relative"></span>',
  
    //more or less just emulating what webkit does here
    //tweak to your hearts content
    placeholderCSS: {
      'position'    : 'absolute', 
      'color'       : '#aaa',
      'left'        : '5px',
      'line-height' : '1em',
      'top'         : '20%', //basically for Opera, top:0 works for everyone else :/
      'overflow-x'  : 'hidden'
    }
  };
})(jQuery);