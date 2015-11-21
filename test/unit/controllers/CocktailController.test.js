var request = require('supertest');

describe('CocktailController', function() {

  describe('GET /cocktails', function() {
    it('should respond with JSON', function (done) {
      request(sails.hooks.http.app)
        .get('/cocktails')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should return all cocktails', function (done) {
      request(sails.hooks.http.app)
        .get('/cocktails')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.length.should.be.eql(fixtures.cocktail.length);
          done();
        });
    });
  });

  describe('POST /cocktails', function() {
    it('should return a 403 error if unauthorized', function (done) {
      request(sails.hooks.http.app)
        .post('/cocktails')
        .send({
          name: 'Cocktail test',
          rating: 0,
          image: 'test',
          description: 'test'
        })
        .expect(401, done);
    });
  });
});
