describe('CocktailModel', function() {

  describe('#find()', function() {
    it('should check find function', function(done) {
      Cocktail.find()
        .then(function(results) {
          // some tests
          done();
        })
        .catch(done);
    });
  });
});
