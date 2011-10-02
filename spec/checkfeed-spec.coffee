vows = require 'vows'
assert = require 'assert'
main = require '../index'

username  = "test"
password = "password"

vows.describe("The checkFeed method").addBatch( 
  "When loading": 
    topic:  () -> main.checkFeed(username,password,@callback) 
    "is red": (err,topic) ->
      assert.isNull err
      assert.equal topic, 100    
    "and tasty": (err,topic) ->
      assert.isNull err
      assert.isTrue topic == 100 
).export module