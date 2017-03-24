describe('CategoryModel', function() {

  describe('#find()', function() {
    it('should return all categories', function(done) {
      Category.find()
        .then(function(categories) {
          categories.length.should.be.eql(fixtures.category.length);
          done();
        })
        .catch(done);
    });
  });

  describe('#findOne()', function() {
    it('should return a category', function(done) {
      Category.findOne({name: 'Vodka'})
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

  describe('#create()', function() {
    it('should create a new category', function(done) {
      Category.create({
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

  describe('#destroy()', function() {
    it('should destroy a category object', function(done) {
      Category.destroy({name: 'Test category'})
        .then(function() {
          done();
        })
        .catch(done);
    });
  });

  describe('#populate()', function() {
    it('should populate cocktails', (done) => {
      Category.findOne({name: 'Vodka'})
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
