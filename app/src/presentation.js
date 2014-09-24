/* globals define */
define(function(require, exports, module) {
  'use strict';
  // import dependencies
  var Engine            = require('famous/core/Engine');
  var Surface           = require('famous/core/Surface');
  var Modifier     = require('famous/core/Modifier');
  var EventHandler      = require('famous/core/EventHandler');
  var InputSurface      = require('famous/surfaces/InputSurface');
  var Flipper = require('famous/views/Flipper');
  var Slide = require('./Slide');
  var Transform = require('famous/core/Transform');
  var View = require('famous/core/View');
  var Lightbox = require('famous/views/Lightbox');
  var Easing = require('famous/transitions/Easing');
  var TransitionableTransform = require('famous/transitions/TransitionableTransform');
  var Utils = require('./utils');

  var _lightboxOptions = {
    inOpacity: .1,
    outOpacity: 0,
    // inTransform: Transform.rotateAxis([1, 1, 0], Math.PI ),
    // outTransform: Transform.rotateAxis([-1, -1, 0], Math.PI),
    inTransform: Transform.rotateY( Utils.degToRadians(180) ),
    outTransform: Transform.rotateY( Utils.degToRadians(180) ),
    inTransition: { duration: 500, curve: Easing.outBack },
    outTransition: { duration: 500, curve: Easing.outBack }
  };

  function Presentation(options) {
    this.title = options.title || 'title here';
    this.mainContext = options.context || Engine.createContext();
    this.slides = options.slides || [];
    this.slideNumber = -1;
    this.lightBox = new Lightbox(_lightboxOptions);
    this.isStarted = false;
  }


  Presentation.prototype.startPresentation = function startPresentation() {
    this.mainContext.add(this.lightBox);
    this.nextSlide();
    this.isStarted = true;
  };

  Presentation.prototype.started = function started() {
    if (this.isStarted === true) return true;
    return false;
  };

  Presentation.prototype.addSlide = function addSlide(slide) {
    this.slides.push(slide);
  };

  Presentation.prototype.nextSlide = function nextSlide() {
    //this.lightBox.hide();
    this.slideNumber++;
    this.lightBox.show(this.slides[this.slideNumber]);
  };

  Presentation.prototype.prevSlide = function prevSlide() {
    this.slideNumber--;
    this.lightBox.show(this.slides[this.slideNumber]);
  };

  Presentation.prototype.goToSlide = function goToSlide(number) {
    //this.lightBox.hide();
    this.slideNumber = number;
    if(this.slides.length > this.slideNumber) this.lightBox.show(this.slides[this.slideNumber]);
  };

  Presentation.prototype.removeSlide = function removeSlide(number) {
    this.slides.splice(number, 1);
  };

  Presentation.prototype.removeAllSlides = function removeAllSlides() {
    this.slides = [];
  };

  module.exports = Presentation;
});
