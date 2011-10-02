(function() {
  var FileCheck, constants, fileRegex, jsdom, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  jsdom = require('jsdom');
  _ = require('underscore');
  constants = require('./constants');
  fileRegex = /\d{8}\.tbz$/i;
  module.exports = FileCheck = (function() {
    function FileCheck(username, password) {
      this.username = username;
      this.password = password;
      this.parseJsDom = __bind(this.parseJsDom, this);
    }
    FileCheck.prototype.feedUrl = function() {
      return "http://" + (encodeURIComponent(this.username)) + ":" + (encodeURIComponent(this.password)) + "@" + constants.appleEpfRoot;
    };
    FileCheck.prototype.parseJsDom = function(window) {
      var $, items;
      $ = window.$;
      items = $.find('a');
      items = _.map(items, function(item) {
        return $(item).text();
      });
      items = _.select(items, function(item) {
        return item.match(fileRegex);
      });
      items = _.map(items, __bind(function(item) {
        return {
          url: "" + (this.feedUrl()) + item,
          fileName: item
        };
      }, this));
      return _.toArray(items);
    };
    FileCheck.prototype.check = function(cb) {
      return jsdom.env(this.feedUrl(), [constants.jqueryUrl], __bind(function(e, window) {
        if (e) {
          return cb(e);
        }
        return cb(null, this.parseJsDom(window));
      }, this));
    };
    return FileCheck;
  })();
}).call(this);
