const request = require('supertest');
const fixture = require('../../fixtures/category.json');

describe('CategoryController', () => {

  describe('GET /categories', () => {
    it('should respond with JSON', function (done) {
      request(sails.hooks.http.app)
        .get('/categories')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should return all categories', (done) => {
      request(sails.hooks.http.app)
        .get('/categories')
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

  describe('GET /categories/:name', () => {
    it('should respond with JSON', (done) => {
      request(sails.hooks.http.app)
        .get('/categories/vodka')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should return category with given name', (done) => {
      request(sails.hooks.http.app)
        .get('/categories/vodka')
        .expect(200)
        .end((err) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should return a 404 error if no category exists with the given name', (done) => {
      request(sails.hooks.http.app)
        .get('/categories/categorywhichdoesnotexist')
        .expect(404, done);
    });
  });

  describe('POST /categories', () => {
    it('should return a 401 error', (done) => {
      request(sails.hooks.http.app)
        .post('/categories')
        .send({
          name: 'Category test',
          description: 'test'
        })
        .expect(401, done);
    });
  });
});
