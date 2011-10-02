vows = require 'vows'
assert = require 'assert'
nock = require 'nock'

main = require '../lib/index'

username  = "test"
password = "password"

itunes_1 = nock("http://#{username}:#{password}@feeds.itunes.apple.com") 
            .get("/feeds/epf/v3/full/current/")
            .replyWithFile(200,"#{__dirname}/fixtures/current.txt")
            .get("/feeds/epf/v3/full/current/incremental/")
            .replyWithFile(200,"#{__dirname}/fixtures/incremental.txt")


vows.describe("The checkFeed method").addBatch( 
  "When loading": 
    topic:  () -> main.checkFeed(username,password,@callback) 
    "is red": (err,topic) ->
      assert.isNull err
#      assert.equal topic.length == 0  
#    "and tasty": (err,topic) ->
#      assert.isNull err
#      assert.isTrue topic == 100 
).export module