## About itunes-epf-check

The Apple iTunes EPF program exports a daily dump of all the iTunes store content, exposed through their web site. The content is structured in folders that expose weekly changes, with one full dump and incremental updates there after.
This module connects to the web site (you need to be member of the EPF program) and returns the list of files for the current week. It is intended to be called on a regular basis (every hour or so) to determine if new data is available for download.

## Usage


## Internal Stuff

coffee -c -w  test lib
npm link
npm adduser
npm publish


## Trivia

Listened to lots of Nicki Minaj while writing this.

## Release Notes

### 0.0.1
* First version

## Contributing to itunes-epf-feedback
 
* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
* Please try not to mess with the package.json, version, or history. If you want to have your own version, or is otherwise necessary, that is fine, but please isolate to its own commit so I can cherry-pick around it.

== Copyright

Copyright (c) 2011 Martin Wawrusch. See LICENSE.md for
further details.


