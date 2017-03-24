const request = require('supertest');
const fixture = require('../../fixtures/cocktail.json');

describe('CocktailController', () => {

  describe('GET /cocktails', () => {
    it('should respond with JSON', (done) => {
      request(sails.hooks.http.app)
        .get('/cocktails')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should return all cocktails', (done) => {
      request(sails.hooks.http.app)
        .get('/cocktails')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.length.should.be.eql(fixture.length);
          done();
        });
    });
  });

  describe('POST /cocktails', function() {
    it('should return a 401 error if unauthorized', (done) => {
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
