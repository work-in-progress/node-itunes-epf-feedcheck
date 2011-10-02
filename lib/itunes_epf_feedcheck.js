(function() {
  var argv, epf;
  argv = require("optimist").argv;
  epf = require("./index");
  epf.check(argv.u, argv.p, function(err, data) {
    if (err) {
      return console.error(err);
    } else {
      return console.log(JSON.stringify(data));
    }
  });
}).call(this);
