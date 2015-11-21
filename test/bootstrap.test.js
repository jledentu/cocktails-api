require('should');
var Sails = require('sails');
var Barrels = require('barrels');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(10000);

  Sails.lift({
    hooks: {
      grunt: false
    },
    models: {
      connection: 'test',
      migrate: 'drop'
    }
  }, function(err, server) {
    if (err) {
      return done(err);
    }

    // Load fixtures
    var barrels = new Barrels();

    fixtures = barrels.data;

    // Populate the DB
    barrels.populate(function(err) {
      done(err, server);
    });
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});
