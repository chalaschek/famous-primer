/* globals define */
// define(function(require, exports, module) {
//   'use strict';
  

//   // import dependencies
//   var App = require('./app');
  
//   var app = new App();

//   app.start();

// });

/* globals define */
define(function(require, exports, module) {
  'use strict';
  // import dependencies
  var Engine            = require('famous/core/Engine');
  var Slide             = require('./slide');
  var Presentation      = require('./presentation');
  var View = require('famous/core/View');
  var SlideDeck = require('./slides/deck');

  var mainContext = Engine.createContext();

  mainContext.setPerspective(10000);

  var slideDeck = new SlideDeck();

  var presentation = new Presentation({
    context: mainContext,
    slides: slideDeck.getSlides()
  });

  presentation.startPresentation();

  Engine.on('keydown', function(e) {
    if (e.which === 39) presentation.nextSlide();

    else if (e.which === 37) presentation.prevSlide();
  });

});
