IncrementalFolderCheck = require './incremental_folder_check'
FileCheck = require './file_check'

# The current version of this module.
module.exports.version = '0.0.1'

# Call check with your EPF username and password to retrieve the current file list on itunes.
module.exports.check = (username,password,cb) ->   
  cur = new FileCheck(username,password)
  cur.check (e,result) =>
    return cb(e) if e
    ifc = new IncrementalFolderCheck(username,password)
    ifc.check (e,result) =>
      return cb(e) if e
      cb null, result


