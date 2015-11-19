var Sails = require('sails');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(10000);

  Sails.lift({
    hooks: {
      grunt: false
    }
  }, function(err, server) {
    if (err) {
      return done(err);
    }

    // here you can load fixtures, etc.
    done(err, server);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});
