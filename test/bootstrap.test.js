require('should');
const Sails = require('sails');
const Barrels = require('barrels');

before(function (done) {

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
  }, (err, server) => {
    if (err) {
      return done(err);
    }

    // Load fixtures
    let barrels = new Barrels();

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
