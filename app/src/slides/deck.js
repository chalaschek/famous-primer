define(function(require, exports, module) {
  'use strict';
  // import dependencies

  var Slide = require('../../src/Slide');
  var View = require('famous/core/View');
  var Modifier = require('famous/core/Modifier');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');

  function Deck() {
    this.slides = [];
    this.initTime = Date.now();
    this.createSlides();
  }

  Deck.prototype.getSlides = function getSlides() {
    return this.slides;
  }


  Deck.prototype.createSlides = function createSlides() {

    this.slides.push(require('./cover'));

    this.slides.push(new Slide({
      title: 'What is Famo.us?',
      content: require('text!./what.html')
    }));

    this.slides.push(new Slide({
      title: 'Key Components',
      content: require('text!./components.html')
    }));

    this.slides.push(new Slide({
      title: 'Surfaces',
      content: require('text!./surfaces.html')
    }));

    this.slides.push(new Slide({
      title: 'Periodic Table',
      content: require('text!./periodic.html'),
      origin: [0.5, 0.5]
    }));


  }

  module.exports = Deck;

});