(function() {
  var assert, main, password, username, vows;
  vows = require('vows');
  assert = require('assert');
  main = require('../index');
  username = "test";
  password = "password";
  vows.describe("The checkFeed method").addBatch({
    "When loading": {
      topic: function() {
        return main.checkFeed(username, password, this.callback);
      },
      "is red": function(err, topic) {
        assert.isNull(err);
        return assert.equal(topic, 100);
      },
      "and tasty": function(err, topic) {
        assert.isNull(err);
        return assert.isTrue(topic === 100);
      }
    }
  })["export"](module);
}).call(this);
