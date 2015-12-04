var request = require('supertest');

describe('IngredientController', function() {

  describe('GET /ingredients', function() {
    it('should respond with JSON and return all ingredients', function (done) {
      request(sails.hooks.http.app)
        .get('/ingredients')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.length.should.be.eql(fixtures.ingredient.length);
          done();
        });
    });
  });

  describe('GET /ingredients/:name', function() {
    it('should respond with JSON and return the ingredient with given name', function (done) {
      request(sails.hooks.http.app)
        .get('/ingredients/lime')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.name.should.be.eql('Lime');
          done();
        });
    });

    it('should return a 404 error if no ingredient exists with the given name', function (done) {
      request(sails.hooks.http.app)
        .get('/ingredients/ingredientwhichdoesnotexist')
        .expect(404, done);
    });
  });

  describe('POST /ingredients', function() {
    it('should return a 403 error', function (done) {
      request(sails.hooks.http.app)
        .post('/ingredients')
        .send({
          name: 'Ingredient test',
          description: 'test'
        })
        .expect(403, done);
    });
  });

  describe('DELETE /ingredients', function() {
    it('should return a 403 error', function (done) {
      request(sails.hooks.http.app)
        .delete('/ingredients')
        .send({
          id: 1
        })
        .expect(403, done);
    });
  });
});
