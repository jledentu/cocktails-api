var request = require('supertest');

describe('CategoryController', function() {

  describe('GET /categories', function() {
    it('should respond with JSON', function (done) {
      request(sails.hooks.http.app)
        .get('/categories')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should return all categories', function (done) {
      request(sails.hooks.http.app)
        .get('/categories')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.length.should.be.eql(fixtures.category.length);
          done();
        });
    });
  });

  describe('GET /categories/:name', function() {
    it('should respond with JSON', function (done) {
      request(sails.hooks.http.app)
        .get('/categories/vodka')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should return category with given name', function (done) {
      request(sails.hooks.http.app)
        .get('/categories/vodka')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should return a 404 error if no category exists with the given name', function (done) {
      request(sails.hooks.http.app)
        .get('/categories/categorywhichdoesnotexist')
        .expect(404, done);
    });
  });

  describe('POST /categories', function() {
    it('should return a 401 error', function (done) {
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
