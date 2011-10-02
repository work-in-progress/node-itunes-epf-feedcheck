# (C) 2011 Martin Wawrusch (http://martinatsunset.com)
# MIT licensed
#

jsdom = require 'jsdom'
_ = require 'underscore'
constants = require './constants'
util = require './util'

# A regex used to determine the file, filters out text that looks like blah12122012.tbz
fileRegex = /\d{8}\.tbz$/i

module.exports = class FileCheck
  # Initializes a new instance of the IncrementalFolderCheck class.
  # username: The EPF username you received from Apple
  # password: The EPF password you received from Apple  
  constructor: (@username,@password) ->
  
  # Constructs a feed url to access the incremental page
  feedUrl : ->
    "http://#{encodeURIComponent(@username)}:#{encodeURIComponent(@password)}@#{constants.appleEpfRoot}"

  # Parses the result from the request and extracts the subfolders that resemble a date
  # window: The window, as returned from jsdom
  # returns an array of strings containing the folder matches including a trailing /
  parseJsDom : (window) =>
    $ = window.$
    items = $.find('a')
    items = _.map items, (item) -> $(item).text()
    items = _.select items, (item) -> item.match(fileRegex)
    
    items = _.map items, (item) => 
        fileUrl : "#{@feedUrl()}#{item}"
        fileName : item
    #_.each items, (item) -> console.log item
    
    items = _.toArray items
    filename = _.first(items).fileName
    
    res =
      files : items 
      date : util.parseAppleDate filename


  # Checks the feed.
  check : (cb) ->    
    jsdom.env @feedUrl(), [ constants.jqueryUrl], (e, window) =>
      return cb(e) if e 
      cb null, @parseJsDom(window) 
