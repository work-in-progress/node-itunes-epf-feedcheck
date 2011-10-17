## About itunes-epf-check

The Apple iTunes EPF program exports a daily dump of all the iTunes store content, exposed through their web site. The content is structured in folders that expose weekly changes, with one full dump and incremental updates there after.
This module connects to the web site (you need to be member of the EPF program) and returns the list of files for the current week. It is intended to be called on a regular basis (every hour or so) to determine if new data is available for download.

[![Build Status](https://secure.travis-ci.org/freshfugu/node-itunes-epf-feedcheck.png)](http://travis-ci.org/freshfugu/node-itunes-epf-feedcheck)

Please note that travis-ci.org, at this point in time, does not test this correctly because the nock mocking library needs node 0.4.10 but travis runs on 0.4.8

## Usage

	./bin/itunes-epf-feedcheck -u username -p password

returns a json string. Or call it programmatically like so:

### Coffeescript

	epf = require "itunes-epf-feedcheck"
	epf.check "username", "password", (err, data) ->
		if err
			console.error err
		else
			console.log JSON.stringify(data)
    
### Javascript

	var epf = require("itunes-epf-feedcheck");
	epf.check("username", "password", function(err, data) {
		if (err) {
			return console.error(err);
		} else {
			return console.log(JSON.stringify(data));
		}
	});

## Result data format
You can see the sample JSON output in examples/sampleoutput.json. Here is a quick overview:

	full:
		files: [ {
			"fileUrl": "http://username:password@feeds.itunes.apple.com/feeds/epf/v3/full/current/itunes20110928.tbz"
			"fileName": "itunes20110928.tbz"},...
		]
		"date": {
			"asString": "20110928",
			"month": 9,
			"day": 28,
			"year": 2011
		}
	incremental [	{
		"folderUrl": "http://username:password@feeds.itunes.apple.com/feeds/epf/v3/full/current/incremental/20110930/",
		"date": {
			"asString": "20110930",
			"month": 9,
			"day": 30,
			"year": 2011
		},
		"files" : *see above*
	},...
	]

## Advertising :)

Check out http://freshfugu.com and http://scottyapp.com

## Trivia

Listened to lots of Nicki Minaj while writing this.

## Release Notes

### 0.0.1
* First version

## Internal Stuff

* npm run-script watch
* npm link
* npm adduser
* npm publish

## Contributing to itunes-epf-feedcheck
 
* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
* Please try not to mess with the package.json, version, or history. If you want to have your own version, or is otherwise necessary, that is fine, but please isolate to its own commit so I can cherry-pick around it.

## Copyright

Copyright (c) 2011 Martin Wawrusch. See LICENSE for
further details.


