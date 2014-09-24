/* globals define */
define(function(require, exports, module) {
  'use strict';
  // import dependencies
  var Engine = require('famous/core/Engine');
  var Backbone = require('backbone');
  var TestView = require('./views/test-view');
  var Slide = require('./slide');

  Backbone.sync = function(method, model, success, error) {
    success();
  };


  var App = Backbone.Router.extend({
    initialize: function(options) {
      this.slides = {};
      this.mainContext = Engine.createContext();
      this.mainContext.setPerspective(10000);

      Engine.on('keydown', function(e) {
        if(!this._visibileSlide) return;
        if (e.which === 39) this._visibileSlide.forward();
        else if (e.which === 37) this._visibileSlide.backward();
      }.bind(this));

      Engine.on('mouseup', function(e) {
        if(!this._visibileSlide) return;
        this._visibileSlide.forward();
      }.bind(this));

    },

    routes: {
      '' : 'slide1',
      '1' : 'slide1',
      '2' : 'slide2'
    },

    slide1: function(){
      console.log('slide1')
      var slide = this.fetchSlide(1);
      if(!slide){
        slide = require('./slides/cover');
        this.loadSlide(slide, 1, true);
      }

      this.showSlide(slide);
    },

    slide2: function(){

      var slide = this.fetchSlide(2);

      if(!slide){
        slide = new Slide({
          title: 'What is Famo.us?',
          content: require('text!./slides/what.html')
        });
        this.loadSlide(slide, 2, false);
      }

      this.showSlide(slide);
    },



    fetchSlide: function(number){
      return this.slides[number];
    },

    loadSlide: function(slide, number, next){
      this.slides[number] = slide;
      slide.config({
        number: number,
        next: next,
        router: this
      });
      slide.opacity(0);
      this.mainContext.add(slide);
    },

    showSlide: function(slide) {

      var forward = this._visibileSlide && this._visibileSlide.number > slide.number ? false : true;

      function _show(){
        this._visibileSlide = slide;
        slide.show( forward );
      }

      if(this._visibileSlide) return this._visibileSlide.hide(forward, _show.call(this));
      _show.call(this);
    },



    start: function() {
      Backbone.history.start({
       pushState: false
      });
    }

  });


  module.exports = App;

});
