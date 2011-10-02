(function() {
  module.exports.parseAppleDate = function(dateAsString) {
    var res;
    dateAsString = dateAsString.match(/\d{8}/i)[0];
    return res = {
      asString: dateAsString,
      month: parseInt(dateAsString.substr(4, 1) === '0' ? dateAsString.substr(5, 1) : dateAsString.substr(4, 2)),
      day: parseInt(dateAsString.substr(6, 1) === '0' ? dateAsString.substr(7, 1) : dateAsString.substr(6, 2)),
      year: parseInt(dateAsString.substr(0, 4))
    };
  };
}).call(this);
