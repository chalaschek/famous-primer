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
  var Flipper = require('famous/views/Flipper');
  var View = require('famous/core/View');
  var RenderController = require('famous/views/RenderController');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');

  function Slide(options) {

    View.apply(this, arguments);

    options = options || {};

    this.headFoot = new HeaderFooterLayout({
      headerSize: 100,
      footerSize: 50
    });

    this.add(this.headFoot);

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

  module.exports = Slide;
});
