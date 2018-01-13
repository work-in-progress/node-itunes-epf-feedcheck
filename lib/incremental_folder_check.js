(function() {
  var IncrementalFolderCheck, constants, folderRegex, jsdom, util, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  jsdom = require('jsdom/lib/old-api');
  _ = require('underscore');
  constants = require('./constants');
  util = require('./util');
  folderRegex = /^\d{8}\/$/i;
  module.exports = IncrementalFolderCheck = (function() {
    function IncrementalFolderCheck(username, password) {
      this.username = username;
      this.password = password;
    }
    IncrementalFolderCheck.prototype.feedUrl = function() {
      return "http://" + (encodeURIComponent(this.username)) + ":" + (encodeURIComponent(this.password)) + "@" + constants.appleEpfRoot + "incremental/";
    };
    IncrementalFolderCheck.prototype.parseJsDom = function(window) {
      var $, items;
      $ = window.$;
      items = $.find('a');
      items = _.map(items, function(item) {
        return $(item).text();
      });
      items = _.select(items, function(item) {
        return item.match(folderRegex);
      });
      items = _.map(items, __bind(function(item) {
        return {
          folderUrl: "" + (this.feedUrl()) + item,
          date: util.parseAppleDate(item)
        };
      }, this));
      return _.toArray(items);
    };
    IncrementalFolderCheck.prototype.check = function(cb) {
      return jsdom.env(this.feedUrl(), [constants.jqueryUrl], __bind(function(e, window) {
        if (e) {
          return cb(e);
        }
        return cb(null, this.parseJsDom(window));
      }, this));
    };
    return IncrementalFolderCheck;
  })();
}).call(this);
