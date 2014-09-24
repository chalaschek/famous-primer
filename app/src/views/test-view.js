/* globals define */
define(function(require, exports, module) {
  'use strict';
  // import dependencies
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var View = require('famous/core/View');

  function TestView(options) {
    View.apply(this, arguments);
    this._add(this.layout);

    var logo = new ImageSurface({
      size: [200, 200],
      content: '/content/images/famous_logo.png',
      classes: ['backfaceVisibility']
    });

    var initialTime = Date.now();
    var centerSpinModifier = new Modifier({
      origin: [0.5, 0.5],
      transform : function() {
        return Transform.rotateY(.002 * (Date.now() - initialTime));
      }
    });

    this.add(centerSpinModifier).add(logo);
  }

  TestView.prototype = Object.create(View.prototype);

  TestView.prototype.constructor = TestView;

  return TestView;
});
