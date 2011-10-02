# (C) 2011 Martin Wawrusch (http://martinatsunset.com)
# MIT licensed
#

jsdom = require 'jsdom'
#fs = require 'fs'
#path = require 'path'
_ = require 'underscore'
constants = require './constants'

#jqueryUrl = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js" 


exports.IncrementalFolderCheck = class IncrementalFolderCheck
  
  # A regex used to determine the folder, filters out text that looks like 12122012/
  @folderRegex : /^\d{8}\/$/i
  
  # Initializes a new instance of the IncrementalFolderCheck class.
  # username: The EPF username you received from Apple
  # password: The EPF password you received from Apple  
  constructor: (@username,@password) ->
  
  # Constructs a feed url to access the incremental page
  feedUrl : ->
    "http://#{encodeURIComponent(@username)}:#{encodeURIComponent(@password)}@#{constants.appleEpfRoot}/incremental/"

  # Parses the result from the request and extracts the subfolders that resemble a date
  # window: The window, as returned from jsdom
  # returns an array of strings containing the folder matches including a trailing /
  parseJsDom : (window) ->
    $ = window.$
    items = $.find('a')
    items = _.map items, (item) -> $(item).text()
    items = _.select items, (item) -> item.match(@folderRegex)
    _.toArray items


  # Checks the feed.
  check : (cb) ->    
    jsdom.env @feedUrl(), [ constants.jqueryUrl], (e, window) =>
      return cb(e) if e 
      cb null, @parseJsDom(window) 
