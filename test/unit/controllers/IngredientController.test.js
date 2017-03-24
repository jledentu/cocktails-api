const request = require('supertest');
const fixture = require('../../fixtures/cocktail.json');

describe('IngredientController', () => {

  describe('GET /ingredients', () => {
    it('should respond with JSON and return all ingredients', (done) => {
      request(sails.hooks.http.app)
        .get('/ingredients')
        .expect('Content-Type', /json/)
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

  describe('GET /ingredients/:name', () => {
    it('should respond with JSON and return the ingredient with given name', (done) => {
      request(sails.hooks.http.app)
        .get('/ingredients/lime')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.name.should.be.eql('Lime');
          done();
        });
    });

    it('should return a 404 error if no ingredient exists with the given name', (done) => {
      request(sails.hooks.http.app)
        .get('/ingredients/ingredientwhichdoesnotexist')
        .expect(404, done);
    });
  });

  describe('POST /ingredients', () => {
    it('should return a 401 error', (done) => {
      request(sails.hooks.http.app)
        .post('/ingredients')
        .send({
          name: 'Ingredient test',
          description: 'test'
        })
        .expect(401, done);
    });
  });

  describe('DELETE /ingredients', () => {
    it('should return a 401 error', (done) => {
      request(sails.hooks.http.app)
        .delete('/ingredients')
        .send({
          id: 1
        })
        .expect(401, done);
    });
  });
});
