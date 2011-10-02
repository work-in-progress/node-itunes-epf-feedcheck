# (C) 2011 Martin Wawrusch (http://martinatsunset.com)
# itunes-epf-feedcheck is a little module that checks the itunes epf server
# for new files.
# MIT licensed
#

jsdom = require 'jsdom'
fs = require 'fs'
jquery = fs.readFileSync("../external/jquery-1.6.4.min.js").toString()

appleEpfRoot = "feeds.itunes.apple.com/feeds/epf/v3/full/current/"
#DAY_FOLDER_REGEX = /\A\d{8}\/\z/i


exports.itunesEpfFeedcheck = 
  checkFeed : (username,password,cb) ->
    # check that username and password are ok and cb is not null
    url = "http://#{encodeUriComponent(username)}:#{encodeUriComponent(password)}@#{appleEpfRoot}"
    jsdom.env url, 
              [ jquery ], 
              (e, window) ->
      return cb(e) if e     
      console.log window.$('body').html()
      
      cb null,window.$("a").length