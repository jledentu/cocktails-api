describe('CocktailModel', function() {

  describe('#find()', function() {
    it('should return all cocktails', function(done) {
      Cocktail.find()
        .then(function(cocktails) {
          cocktails.length.should.be.eql(fixtures.cocktail.length);
          done();
        })
        .catch(done);
    });
  });

  describe('#findOne()', function() {
    it('should return a cocktail', function(done) {
      Cocktail.findOne({name: 'Margarita'})
        .then(function(cocktail) {
          cocktail.name.should.be.eql('Margarita');
          cocktail.slug.should.be.eql('Margarita');
          cocktail.image.should.be.eql('image_margaritan.jpg');
          cocktail.description.should.be.eql('Description of the Margarita cocktail');
          cocktail.rating.should.be.eql(3);
          done();
        })
        .catch(done);
    });
  });

  describe('#populate()', function() {
    it('should return a cocktail populated with ingredients', function(done) {
      Cocktail.findOne({name: 'Cosmopolitan'})
        .populate('ingredients')
        .then(function(cocktail) {
          cocktail.ingredients.length.should.be.eql(3);
          cocktail.ingredients[0].name = 'Cranberry';
          done();
        })
        .catch(done);
    });
  });

  describe('#create()', function() {
    it('should create a new cocktail', function(done) {
      Cocktail.create({
        name: 'Test cocktail',
        description: 'Test description',
        rating: 1,
        image: 'test_image'
      }).then(function(cocktail) {
          cocktail.name.should.be.eql('Test cocktail');
          cocktail.slug.should.be.eql('Test-cocktail');
          cocktail.image.should.be.eql('test_image');
          cocktail.description.should.be.eql('Test description');
          cocktail.rating.should.be.eql(1);
          done();
        })
        .catch(done);
    });
  });

  describe('#destroy()', function() {
    it('should destroy a cocktail object', function(done) {
      Cocktail.destroy({name: 'Test cocktail'})
        .then(function() {
          done();
        })
        .catch(done);
    });
  });
});
