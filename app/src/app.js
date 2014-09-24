/* globals define */
define(function(require, exports, module) {
  'use strict';
  // import dependencies
  var Engine = require('famous/core/Engine');
  var Backbone = require('backbone');
  var TestView = require('./views/test-view');

  Backbone.sync = function(method, model, success, error) {
    success();
  };

  var Views = {
    AUTH : 'app.auth',
    FEED : 'app.feed'
  };

  var App = Backbone.Router.extend({
    initialize: function(options) {
      this.mainContext = Engine.createContext();
      this.mainContext.setPerspective(1000);

      this._viewCache = {};

      Engine.on('resize', function() {
        //console.log('Resize')
        //self.background.setSize();
      });
      //this.mainContext.add(this.background.getView());
    },

    routes: {
      '' : 'showFeed',
      'feed' : 'showFeed'
    },

    showAuth: function() {
      // compose options based on route params
      var options = {};
      this.scope.showView(Views.AUTH);
    },

    showFeed: function() {
      var options = {};
      this.showView(Views.FEED);
    }

  });

  App.prototype.showView = function(viewId, options) {
    this.mainContext.add(new TestView());
  };

  App.prototype.start = function() {
    Backbone.history.start({
     pushState: true
    });

    this.navigate('', {trigger: true, replace: true});
  };

  module.exports = App;

});
