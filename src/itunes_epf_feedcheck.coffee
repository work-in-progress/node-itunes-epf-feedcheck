# (C) 2011 Martin Wawrusch (http://martinatsunset.com)
# itunes-epf-feedcheck is a little module that checks the itunes epf server
# for new files.
# MIT licensed
#
# This file is to be required in the itunes-epf-feedcheck script in the bin dircetory
# It is invoked as 
#
# itunes-epf-feedcheck -u username -p password 
#
# and returns a json representation of the current state of the itunes epf site.

argv = require("optimist").argv
epf = require("./index")
epf.check argv.u, argv.p, (err, data) ->
  if err
    console.error err
  else
    console.log JSON.stringify(data)
    
