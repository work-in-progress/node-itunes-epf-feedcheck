(function() {
  var appleEpfRoot, fs, jquery, jqueryUrl, jsdom, path;
  jsdom = require('jsdom');
  fs = require('fs');
  path = require('path');
  jqueryUrl = path.resolve("./external/jquery-1.6.4.min.js");
  jquery = fs.readFileSync(jqueryUrl).toString();
  appleEpfRoot = "feeds.itunes.apple.com/feeds/epf/v3/full/current/";
  exports.itunesEpfFeedcheck = {
    checkFeed: function(username, password, cb) {
      var url;
      url = "http://" + (encodeURIComponent(username)) + ":" + (encodeURIComponent(password)) + "@" + appleEpfRoot;
      return jsdom.env(url, [jquery], function(e, window) {
        if (e) {
          return cb(e);
        }
        console.log(window.$('body').html());
        return cb(null, window.$("a").length);
      });
    }
  };
}).call(this);
