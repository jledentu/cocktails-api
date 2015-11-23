describe('IngredientModel', function() {

  describe('#find()', function() {
    it('should return all ingredients', function(done) {
      Ingredient.find()
        .then(function(ingredients) {
          ingredients.length.should.be.eql(fixtures.ingredient.length);
          done();
        })
        .catch(done);
    });
  });

  describe('#findOne()', function() {
    it('should return a ingredient', function(done) {
      Ingredient.findOne({name: 'lime'})
        .then(function(ingredient) {
          ingredient.name.should.be.eql('lime');
          ingredient.fullname.should.be.eql('Lime');
          ingredient.description.should.be.eql('Lime is a fruit');
          ingredient.cocktails.length.should.be.eql(0);
          done();
        })
        .catch(done);
    });
  });

  describe('#create()', function() {
    it('should create a new ingredient', function(done) {
      Ingredient.create({
        name: 'test-ingredient',
        fullname: 'Test ingredient',
        description: 'Test description'
      }).then(function(ingredient) {
          ingredient.name.should.be.eql('test-ingredient');
          ingredient.fullname.should.be.eql('Test ingredient');
          ingredient.description.should.be.eql('Test description');
          done();
        })
        .catch(done);
    });
  });

  describe('#destroy()', function() {
    it('should destroy a ingredient object', function(done) {
      Ingredient.destroy({name: 'test-ingredient'})
        .then(function() {
          done();
        })
        .catch(done);
    });
  });
});
