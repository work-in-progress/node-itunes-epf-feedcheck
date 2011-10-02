# (C) 2011 Martin Wawrusch (http://martinatsunset.com)
# itunes-epf-feedcheck is a little module that checks the itunes epf server
# for new files.
# MIT licensed
#

jsdom = require 'jsdom'
fs = require 'fs'
path = require 'path'
_ = require 'underscore'

IncrementalFolderCheck = require('./incremental_folder_check')

jqueryUrl = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js" 

appleEpfRoot = "feeds.itunes.apple.com/feeds/epf/v3/full/current/"
dayRegex = /\d{8}\.tbz$/i
#DAY_FOLDER_REGEX = /\A\d{8}\/\z/i

  

class ItunesEpfFeedcheck
  feedUrl : (username,password) ->
    "http://#{encodeURIComponent(username)}:#{encodeURIComponent(password)}@#{appleEpfRoot}"
  
  parseCurrentResult : (window) ->
    $ = window.$
    items = $.find('a')
    items = _.map items, (item) -> $(item).text()
    items = _.select items, (item) -> item.match(dayRegex)
    
    #
    _.each items, (item) -> console.log item
    
    _.toArray items
      
    
  # Checks the feed.
  checkFeed : (username,password,cb) ->    
    jsdom.env @feedUrl(username,password), [ jqueryUrl], (e, window) =>
      return cb(e) if e 
      res = @parseCurrentResult window
      
      ifc = new IncrementalFolderCheck(username,password)
      ifc.check (e,result) =>
        return cb(e) if e
        cb null, result 

exports.itunesEpfFeedcheck = new ItunesEpfFeedcheck()
