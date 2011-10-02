(function() {
  var FileCheck, IncrementalFolderCheck;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  IncrementalFolderCheck = require('./incremental_folder_check');
  FileCheck = require('./file_check');
  module.exports.version = '0.0.1';
  module.exports.check = function(username, password, cb) {
    var cur;
    cur = new FileCheck(username, password);
    return cur.check(__bind(function(e, result) {
      var ifc, output;
      if (e) {
        return cb(e);
      }
      output = {
        full: result
      };
      ifc = new IncrementalFolderCheck(username, password);
      return ifc.check(__bind(function(e, result) {
        if (e) {
          return cb(e);
        }
        output.incremental = result;
        return cb(null, output);
      }, this));
    }, this));
  };
}).call(this);
