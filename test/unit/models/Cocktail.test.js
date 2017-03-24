const fixture = require('../../fixtures/cocktail.json');

describe('CocktailModel', () =>  {

  let Cocktail;

  before(() => {
    Cocktail = sails.models.cocktail;
  });

  describe('#find()', () => {
    it('should return all cocktails', (done) =>  {
      Cocktail.find()
        .then(function(cocktails) {
          cocktails.length.should.be.eql(fixture.length);
          done();
        })
        .catch(done);
    });
  });

  describe('#findOne()', () =>  {
    it('should return a cocktail', (done) =>  {
      Cocktail.findOne({name: 'Margarita'})
        .then(function(cocktail) {
          cocktail.name.should.be.eql('Margarita');
          cocktail.slug.should.be.eql('margarita');
          cocktail.image.should.be.eql('image_margaritan.jpg');
          cocktail.description.should.be.eql('Description of the Margarita cocktail');
          cocktail.rating.should.be.eql(3);
          done();
        })
        .catch(done);
    });
  });

  describe('#populate()', () =>  {
    it('should return a cocktail populated with ingredients', (done) =>  {
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

  describe('#create()', () =>  {
    it('should create a new cocktail', (done) =>  {
      Cocktail.create({
        name: 'Test cocktail',
        description: 'Test description',
        rating: 1,
        image: 'test_image'
      }).then(function(cocktail) {
        cocktail.name.should.be.eql('Test cocktail');
        cocktail.slug.should.be.eql('test-cocktail');
        cocktail.image.should.be.eql('test_image');
        cocktail.description.should.be.eql('Test description');
        cocktail.rating.should.be.eql(1);
        done();
      })
      .catch(done);
    });
  });

  describe('#destroy()', () =>  {
    it('should destroy a cocktail object', (done) =>  {
      Cocktail.destroy({name: 'Test cocktail'})
        .then(() =>  {
          done();
        })
        .catch(done);
    });
  });
});
