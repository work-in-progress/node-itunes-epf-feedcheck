(function() {
  var FileCheck, constants, fileRegex, jsdom, util, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  jsdom = require('jsdom/lib/old-api');
  _ = require('underscore');
  constants = require('./constants');
  util = require('./util');
  fileRegex = /\d{8}\.tbz$/i;
  module.exports = FileCheck = (function() {
    function FileCheck(username, password, overrideFeedUrl) {
      this.username = username;
      this.password = password;
      this.overrideFeedUrl = overrideFeedUrl;
      this.parseJsDom = __bind(this.parseJsDom, this);
    }
    FileCheck.prototype.feedUrl = function() {
      if (this.overrideFeedUrl) {
        return this.overrideFeedUrl;
      }
      return "http://" + (encodeURIComponent(this.username)) + ":" + (encodeURIComponent(this.password)) + "@" + constants.appleEpfRoot;
    };
    FileCheck.prototype.parseJsDom = function(window) {
      var $, filename, items, res;
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
          fileUrl: "" + (this.feedUrl()) + item,
          fileName: item
        };
      }, this));
      items = _.toArray(items);
      filename = _.first(items).fileName;
      return res = {
        files: items,
        date: util.parseAppleDate(filename)
      };
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
