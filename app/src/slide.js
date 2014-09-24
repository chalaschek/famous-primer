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

  var rot = 179;

  function Slide(options) {

    View.apply(this, arguments);

    options = options || {};


    this.title = options.title;
    this.content = options.content;

    this.classList = options.classList;
    this.contentConfig = options.contentConfig;

    this.topMod = new StateModifier({
      origin: [0.5,0.5]
    });

    this.headFoot = new HeaderFooterLayout({
      headerSize: 100
    });

    this.contentSurface = new Surface({
      properties: {
        backgroundColor: this.backgroundColor
      }
    })

    this.contentSurface.state = new StateModifier({
        transform: Transform.translate(0,0,10)
    });

    this.titleView = new View();
    this.contentView = new View();

    this.headFoot.header.add(this.titleView);
    this.headFoot.content.add(this.contentView);

    this.headFoot.state = new StateModifier({
      transform: Transform.translate(0,0,20)
    });

    this.setTitle(this.title);
    this.setContent(this.content);

    var top = this.add(this.topMod);
    top.add(this.contentSurface.state).add(this.contentSurface);
    top.add(this.headFoot.state).add(this.title? this.headFoot : this.contentView);

  }

  Slide.prototype = Object.create(View.prototype);

  Slide.prototype.constructor = Slide;

  Slide.prototype.setTitle = function setTitle(titleContent) {

    var surface = new Surface({
      content: '<h2>' + titleContent + '</h2>',
      properties: {
        color: this.fontColor,
        fontSize: this.fontSize,
        lineHeight: this.lineHeight,
        textAlign: "center"
      }
    });

    this.titleView.add(surface);
  };



  Slide.prototype.setContent = function setContent(viewContent) {

    var content;
    if(typeof viewContent != "string"){
      content = viewContent;
    }else{
      var options = _.extend({}, this.contentConfig || {}, {
        content: viewContent,
        classes: this.classList
      });
      content = new Surface(options);
    }

    this.contentView.add(content);
  };

  Slide.prototype.show = function(forward, callback){
    callback = callback || function(){};

    this.topMod.setTransform(
      Transform.rotateY(Utils.degToRadians(forward ? -rot : rot)),
      { duration : 0, curve: Easing.outBack }
    );

    this.topMod.setOpacity(
      1,
      { duration : 200 }
    );
    
    this.topMod.setTransform(
      Transform.rotateY(Utils.degToRadians(0)),
      { duration : 800, curve: Easing.outBack },
      callback
    );
  }


  Slide.prototype.hide = function(forward, callback){
    callback = callback || function(){};

    this.topMod.setOpacity(
      0,
      { duration : 400 }
    );

    this.topMod.setTransform(
      Transform.rotateY(Utils.degToRadians(forward ? rot : -rot)),
      { duration : 800, curve: Easing.outBack },
      callback
    );
    // callback();
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
