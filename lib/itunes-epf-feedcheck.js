(function() {
  var ItunesEpfFeedcheck, appleEpfRoot, dayRegex, fs, jqueryUrl, jsdom, path, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  jsdom = require('jsdom');
  fs = require('fs');
  path = require('path');
  _ = require('underscore');
  jqueryUrl = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js";
  appleEpfRoot = "feeds.itunes.apple.com/feeds/epf/v3/full/current/";
  dayRegex = /\d{8}\.tbz$/i;
  ItunesEpfFeedcheck = (function() {
    function ItunesEpfFeedcheck() {}
    ItunesEpfFeedcheck.prototype.feedUrl = function(username, password) {
      return "http://" + (encodeURIComponent(username)) + ":" + (encodeURIComponent(password)) + "@" + appleEpfRoot;
    };
    ItunesEpfFeedcheck.prototype.parseResult = function(window) {
      var $, items;
      $ = window.$;
      items = $.find('a');
      items = _.map(items, function(item) {
        return $(item).text();
      });
      items = _.select(items, function(item) {
        return item.match(dayRegex);
      });
      return _.each(items, function(item) {
        return console.log(item);
      });
    };
    ItunesEpfFeedcheck.prototype.checkFeed = function(username, password, cb) {
      return jsdom.env(this.feedUrl(username, password), [jqueryUrl], __bind(function(e, window) {
        if (e) {
          return cb(e);
        }
        return cb(null, this.parseResult(window));
      }, this));
    };
    return ItunesEpfFeedcheck;
  })();
  exports.itunesEpfFeedcheck = new ItunesEpfFeedcheck();
}).call(this);
