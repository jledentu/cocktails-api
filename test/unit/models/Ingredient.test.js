const fixture = require('../../fixtures/ingredient.json');

describe('IngredientModel', () => {

  let Ingredient;

  before(() => {
    Ingredient = sails.models.ingredient;
  });

  describe('#find()', () => {
    it('should return all ingredients', (done) => {
      Ingredient.find()
        .then(function(ingredients) {
          ingredients.length.should.be.eql(fixture.length);
          done();
        })
        .catch(done);
    });
  });

  describe('#findOne()', () => {
    it('should return a ingredient', (done) => {
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

  describe('#create()', () => {
    it('should create a new ingredient', (done) => {
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

  describe('#destroy()', () => {
    it('should destroy a ingredient object', (done) => {
      Ingredient.destroy({slug: 'test-ingredient'})
        .then(() => {
          done();
        })
        .catch(done);
    });
  });
});
