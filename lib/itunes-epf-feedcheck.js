(function() {
  var appleEpfRoot, fs, jqueryUrl, jsdom, path;
  jsdom = require('jsdom');
  fs = require('fs');
  path = require('path');
  jqueryUrl = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js";
  appleEpfRoot = "feeds.itunes.apple.com/feeds/epf/v3/full/current/";
  exports.itunesEpfFeedcheck = {
    checkFeed: function(username, password, cb) {
      var url;
      url = "http://" + (encodeURIComponent(username)) + ":" + (encodeURIComponent(password)) + "@" + appleEpfRoot;
      return jsdom.env(url, [jqueryUrl], function(e, window) {
        if (e) {
          return cb(e);
        }
        console.log(window.$('body').html());
        return cb(null, window.$("a").length);
      });
    }
  };
}).call(this);
