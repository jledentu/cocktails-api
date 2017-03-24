const fixture = require('../../fixtures/category.json');

describe('CategoryModel', () => {

  describe('#find()', () => {
    it('should return all categories', (done) => {
      sails.models.category.find()
        .then(function(categories) {
          categories.length.should.be.eql(fixture.length);
          done();
        })
        .catch(done);
    });
  });

  describe('#findOne()', () => {
    it('should return a category', (done) => {
      sails.models.category.findOne({name: 'Vodka'})
        .then(function(category) {
          category.name.should.be.eql('Vodka');
          category.slug.should.be.eql('vodka');
          category.description.should.be.eql('Cocktails with vodka');
          category.cocktails.length.should.be.eql(0);
          done();
        })
        .catch(done);
    });
  });

  describe('#create()', () => {
    it('should create a new category', (done) => {
      sails.models.category.create({
        name: 'Test category',
        description: 'Test description'
      }).then(function(category) {
        category.name.should.be.eql('Test category');
        category.slug.should.be.eql('test-category');
        category.description.should.be.eql('Test description');
        done();
      })
        .catch(done);
    });
  });

  describe('#destroy()', () => {
    it('should destroy a category object', (done) => {
      sails.models.category.destroy({name: 'Test category'})
        .then(() => {
          done();
        })
        .catch(done);
    });
  });

  describe('#populate()', () => {
    it('should populate cocktails', (done) => {
      sails.models.category.findOne({name: 'Vodka'})
        .populate('cocktails')
        .then((category) => {
          category.name.should.be.eql('Vodka');
          category.slug.should.be.eql('vodka');
          category.description.should.be.eql('Cocktails with vodka');
          category.cocktails.length.should.be.eql(1);
          category.cocktails[0].name.should.be.eql('Cosmopolitan');
          done();
        })
        .catch(done);
    });
  });
});
