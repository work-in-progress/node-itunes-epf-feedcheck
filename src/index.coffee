#async = require 'async'
IncrementalFolderCheck = require './incremental_folder_check'
FileCheck = require './file_check'

# The current version of this module.
module.exports.version = '0.0.1'

# Call check with your EPF username and password to retrieve the current file list on itunes.
module.exports.check = (username,password,cb) ->   
  cur = new FileCheck(username,password)
  cur.check (e,result) =>
    return cb(e) if e
    
    output = 
      full : result
    
    ifc = new IncrementalFolderCheck(username,password)
    ifc.check (e,result) =>
      return cb(e) if e
      
      output.incremental = result
      
      if output.incremental.length == 0
        cb null, output      
      else
        count = output.incremental.length
        
        for inc in output.incremental
          do (inc) =>
            fc = new FileCheck(username,password,inc.folderUrl)
            fc.check (e,result) =>
              return cb(e) if e

              count = count - 1
                
              inc.files = result.files # ignore the date
              if count == 0 
                cb null, output

        


