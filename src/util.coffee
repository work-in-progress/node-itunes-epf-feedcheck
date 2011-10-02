# (C) 2011 Martin Wawrusch (http://martinatsunset.com)
# MIT licensed
#

# Helper that parses a date in the format YYYYMMDD and returns a
# custom date object.
# dateAsString a string that contains a digit sequence with 8 digits. Will be cleaned
# first through regex.
# returns:
# asString : YYYYMMDD
# month: MM as integer
# day: DD as integer
# year: YYYY as integer
module.exports.parseAppleDate = (dateAsString) ->
  dateAsString = dateAsString.match(/\d{8}/i)[0]

  # Fixes a parseInt bug that treats 09 as 0 instead of 9
  res = 
    asString: dateAsString
    month: parseInt(if dateAsString.substr(4,1) == '0' then dateAsString.substr(5,1) else dateAsString.substr(4,2))
    day: parseInt(if dateAsString.substr(6,1) == '0' then dateAsString.substr(7,1) else dateAsString.substr(6,2))
    year: parseInt(dateAsString.substr(0,4))

