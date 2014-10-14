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

  var slides = [
    {
      content: require('text!./slides/cover.html'),
      classList: ['lemmings']
    },
    {
      classList: ['what'],
      content: require('text!./slides/what.html')
    },
    {
      classList: ['guilty'],
      content: require('text!./slides/guilty.html'),
    },
    {
      classList: ['material-design'],
      content: '',
    },
    {
      classList: ['why'],
      content: require('text!./slides/why.html'),
    },
    {
      classList: ['faster'],
      content: '',
    },
    {
      classList: ['design'],
      content: '',
    },
    {
      classList: ['sketch'],
      content: require('text!./slides/sketch.html')
    },

    {
      classList: ['jc'],
      content: require('text!./slides/jc.html')
    },

    {
      classList: ['css'],
      content:''
    },

    {
      classList: ['leaf'],
      content: require('text!./slides/leaf.html'),
    },


    {
      classList: ['javascript'],
      content: require('text!./slides/javascript.html'),
    },
    {
      classList: ['famous-1'],
      content: require('text!./slides/famous-1.html'),
    },
    {
      classList: ['famous-2'],
      content: require('text!./slides/famous-2.html'),
    },

    {
      classList: ['analytics'],
      content: require('text!./slides/analytics.html'),
    },
    {
      classList: ['fullstory'],
      content: require('text!./slides/fullstory.html'),
    },
    {
      classList: ['refine'],
      content: '<h2>Test & Refine</h2>',
    },
    {
      classList: ['twitter'],
      content: '',
    },

    {
      content: require('text!./slides/cover.html'),
      classList: ['lemmings']
    }

  ]
  


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

      // var idx = 1;
      // slides.forEach(function(cfg){
      //   this.loadSlide(idx);
      //   idx++;
      // }.bind(this))

    },

    routes: {
      '*path' : 'slide'
    },

    slide: function(){
      var path = window.location.hash || "";
      var num = path.substring(1) || 1;
      num = parseInt(num);

      var slide = this.fetchSlide(num);

      if(!slide){
        slide = this.loadSlide(num);
      }
      this.showSlide(slide);

    },

    fetchSlide: function(number){
      return this.slides[number-1];
    },

    loadSlide: function(number){
      var config = slides[number-1] || {};
      var slide = new Slide(config);
      this.slides[number-1] = slide;
      slide.config({
        number: number,
        next: true,
        router: this
      });
      slide.opacity(0);
      this.mainContext.add(slide);
      return slide;
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
