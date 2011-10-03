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
        var count, inc, _i, _len, _ref, _results;
        if (e) {
          return cb(e);
        }
        output.incremental = result;
        if (output.incremental.length === 0) {
          return cb(null, output);
        } else {
          count = output.incremental.length;
          _ref = output.incremental;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            inc = _ref[_i];
            _results.push(__bind(function(inc) {
              var fc;
              fc = new FileCheck(username, password, inc.folderUrl);
              return fc.check(__bind(function(e, result) {
                if (e) {
                  return cb(e);
                }
                count = count - 1;
                inc.files = result.files;
                if (count === 0) {
                  return cb(null, output);
                }
              }, this));
            }, this)(inc));
          }
          return _results;
        }
      }, this));
    }, this));
  };
}).call(this);
