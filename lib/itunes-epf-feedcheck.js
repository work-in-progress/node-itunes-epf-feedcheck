(function() {
  var IncrementalFolderCheck, ItunesEpfFeedcheck, appleEpfRoot, dayRegex, fs, jqueryUrl, jsdom, path, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  jsdom = require('jsdom');
  fs = require('fs');
  path = require('path');
  _ = require('underscore');
  IncrementalFolderCheck = require('./incremental_folder_check');
  jqueryUrl = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js";
  appleEpfRoot = "feeds.itunes.apple.com/feeds/epf/v3/full/current/";
  dayRegex = /\d{8}\.tbz$/i;
  ItunesEpfFeedcheck = (function() {
    function ItunesEpfFeedcheck() {}
    ItunesEpfFeedcheck.prototype.feedUrl = function(username, password) {
      return "http://" + (encodeURIComponent(username)) + ":" + (encodeURIComponent(password)) + "@" + appleEpfRoot;
    };
    ItunesEpfFeedcheck.prototype.parseCurrentResult = function(window) {
      var $, items;
      $ = window.$;
      items = $.find('a');
      items = _.map(items, function(item) {
        return $(item).text();
      });
      items = _.select(items, function(item) {
        return item.match(dayRegex);
      });
      _.each(items, function(item) {
        return console.log(item);
      });
      return _.toArray(items);
    };
    ItunesEpfFeedcheck.prototype.checkFeed = function(username, password, cb) {
      return jsdom.env(this.feedUrl(username, password), [jqueryUrl], __bind(function(e, window) {
        var ifc, res;
        if (e) {
          return cb(e);
        }
        res = this.parseCurrentResult(window);
        ifc = new IncrementalFolderCheck(username, password);
        return ifc.check(__bind(function(e, result) {
          if (e) {
            return cb(e);
          }
          return cb(null, result);
        }, this));
      }, this));
    };
    return ItunesEpfFeedcheck;
  })();
  exports.itunesEpfFeedcheck = new ItunesEpfFeedcheck();
}).call(this);
