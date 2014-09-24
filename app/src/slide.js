/* globals define */
define(function(require, exports, module) {
  'use strict';
  // import dependencies
  var Engine            = require('famous/core/Engine');
  var Surface           = require('famous/core/Surface');
  var StateModifier     = require('famous/modifiers/StateModifier');
  var Modifier          = require('famous/core/Modifier');
  var EventHandler      = require('famous/core/EventHandler');
  var InputSurface      = require('famous/surfaces/InputSurface');
  var Transform = require('famous/core/Transform');
  var Flipper = require('famous/views/Flipper');
  var View = require('famous/core/View');
  var Easing = require('famous/transitions/Easing');

  var RenderController = require('famous/views/RenderController');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');

  var StateModifier = require('famous/modifiers/StateModifier');

  var Utils = require('./utils');

  function Slide(options) {

    View.apply(this, arguments);

    options = options || {};

    this.topMod = new StateModifier({
      origin: [0.5,0.5]
    });


    this.headFoot = new HeaderFooterLayout({
      headerSize: 100,
      footerSize: 50
    });

    this.add(this.topMod).add(this.headFoot);

    this.title = options.title || 'title here';
    this.content = options.content || 'content here';
    this.contentView = options.contentView || new View(); 

    this.titleView = new View();
    this.defaultContentView = new View();
    if(this.content == 'content here') {
      this.headFoot.content.add(this.contentView);
    }
    else {
      this.headFoot.content.add(this.defaultContentView);
    }

    this.background = options.background || '#fff';
    this.titleBackground = options.titleBackground || this.background;
    this.fontColor = options.fontColor || '#000';
    this.fontSize = options.fontSize || '200%';
    this.textAlign = options.textAlign || 'left';
    this.lineHeight = options.lineHeight || '40px';
    this.fontWeight= options.fontWeight || 'bold';



    this.headFoot.header.add(this.titleView);

    this.setTitle(this.title);
    this.setContent(this.content);
  }

  Slide.prototype = Object.create(View.prototype);

  Slide.prototype.constructor = Slide;

  Slide.prototype.setTitle = function setTitle(titleContent) {

    var surface = new Surface({
      content: '<center><h2>' + titleContent + '</h2></center>',
      properties: {
        backgroundColor: this.titleBackground,
        color: this.fontColor,
        fontSize: this.fontSize,
        lineHeight: this.lineHeight
      }
    });

    this.titleView.add(surface);
  };

  Slide.prototype.setContent = function setContent(viewContent) {
    var surface = new Surface({
      content: viewContent,
      properties: {
        backgroundColor: this.background,
        color: this.fontColor,
        fontSize: this.fontSize,
        textAlign: this.textAlign,
        lineHeight: this.lineHeight,
        textIndent: '20px',
        fontWeight: this.fontWeight
      }
    });

    this.defaultContentView.add(surface);
  };

  Slide.prototype.setContentView = function setContentView(view) {
    this.headFoot.content.add(view);
  }

  Slide.prototype.getContentController = function getContentController() {
    return this.contentControl;
  }

  Slide.prototype.show = function(forward, callback){
    callback = callback || function(){};

    this.topMod.setTransform(
      Transform.rotateY(Utils.degToRadians(forward ? -160 : 160)),
      { duration : 0, curve: Easing.outBack }
    );

    this.opacity(1);

    this.topMod.setTransform(
      Transform.rotateY(Utils.degToRadians(0)),
      { duration : 500, curve: Easing.outBack },
      callback
    );
  }




  Slide.prototype.hide = function(forward, callback){
    callback = callback || function(){};

    this.topMod.setTransform(
      Transform.rotateY(Utils.degToRadians(forward ? 160 : -160)),
      { duration : 500, curve: Easing.outBack },
      function(){
        this.opacity(0);
        callback();
      }.bind(this)
    );
  }

  Slide.prototype.opacity = function(val){
    this.topMod.setOpacity(val);
  }

  Slide.prototype.config = function(options){
    this.number = options.number;
    this.next = options.next;
    this.router = options.router;
  }

  Slide.prototype.forward = function(){
    if(this.next) this.router.navigate('/' + (this.number+1), {trigger:true});
  }

  Slide.prototype.backward = function(){
    if(this.number > 1) this.router.navigate('/' + (this.number - 1), {trigger:true});
  }


  module.exports = Slide;
});
