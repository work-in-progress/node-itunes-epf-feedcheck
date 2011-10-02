(function() {
  var appleEpfRoot, fs, jquery, jsdom;
  jsdom = require('jsdom');
  fs = require('fs');
  jquery = fs.readFileSync("../external/jquery-1.6.4.min.js").toString();
  appleEpfRoot = "feeds.itunes.apple.com/feeds/epf/v3/full/current/";
  exports.itunesEpfFeedcheck = {
    checkFeed: function(username, password, cb) {
      var url;
      url = "http://" + (encodeUriComponent(username)) + ":" + (encodeUriComponent(password)) + "@" + appleEpfRoot;
      jsdom.env(url, [jquery], function(e, window) {});
      if (e) {
        return cb(e);
      }
      console.log(window.$('body').html());
      return cb(null, window.$("a").length);
    }
  };
}).call(this);
