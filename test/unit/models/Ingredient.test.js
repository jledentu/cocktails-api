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
      Ingredient.findOne({name: 'Lime'})
        .then(function(ingredient) {
          ingredient.slug.should.be.eql('lime');
          ingredient.name.should.be.eql('Lime');
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
        name: 'Test ingredient',
        description: 'Test description'
      }).then(function(ingredient) {
          ingredient.slug.should.be.eql('test-ingredient');
          ingredient.name.should.be.eql('Test ingredient');
          ingredient.description.should.be.eql('Test description');
          done();
        })
        .catch(done);
    });
  });

  describe('#destroy()', function() {
    it('should destroy a ingredient object', function(done) {
      Ingredient.destroy({slug: 'test-ingredient'})
        .then(function() {
          done();
        })
        .catch(done);
    });
  });
});
