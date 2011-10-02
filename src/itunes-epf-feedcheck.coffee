# (C) 2011 Martin Wawrusch (http://martinatsunset.com)
# itunes-epf-feedcheck is a little module that checks the itunes epf server
# for new files.
# MIT licensed
#
#module.exports = require("./itunes-epf-feedcheck").itunesEpfFeedcheck

IncrementalFolderCheck = require './incremental_folder_check'
FileCheck = require './file_check'

class ItunesEpfFeedcheck
    
  # Checks the feed.
  check : (username,password,cb) ->   
    cur = new FileCheck(username,password)
    cur.check (e,result) =>
      return cb(e) if e
      ifc = new IncrementalFolderCheck(username,password)
      ifc.check (e,result) =>
        return cb(e) if e
        cb null, result

exports.itunesEpfFeedcheck = new ItunesEpfFeedcheck()
