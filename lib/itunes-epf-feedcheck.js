(function() {
  var FileCheck, IncrementalFolderCheck, ItunesEpfFeedcheck;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  IncrementalFolderCheck = require('./incremental_folder_check');
  FileCheck = require('./file_check');
  ItunesEpfFeedcheck = (function() {
    function ItunesEpfFeedcheck() {}
    ItunesEpfFeedcheck.prototype.check = function(username, password, cb) {
      var cur;
      cur = new FileCheck(username, password);
      return cur.check(__bind(function(e, result) {
        var ifc;
        if (e) {
          return cb(e);
        }
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
