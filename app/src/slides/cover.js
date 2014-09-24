define(function(require, exports, module) {
  'use strict';
  // import dependencies

  var Slide = require('../slide');
  var View = require('famous/core/View');
  var Modifier = require('famous/core/Modifier');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  
  var html = require('text!./cover.html');
  var initTime = Date.now();

  var contentView = function() {
    var view = new View();
    var transform = function(){
      return Transform.rotateY((Date.now() - initTime) * .002);
    }
    var spin_mod = new Modifier({
      origin: [.5,.5],
      size: [200, 200],
      transform: transform.bind(this),
    });

    view.add(spin_mod).add(new Surface({
      origin: [.5,.5],
      content: html,
      classes: ['backfaceVisibility'],
    }));
    return view;
  }


  var slide = new Slide({
    title: 'Don\'t Be A Lemming',
    contentView: contentView.call(this)
  })

  module.exports = slide;

});