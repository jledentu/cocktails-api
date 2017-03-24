const Category = sails.models.Category;

/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
class CategoryController {
  static findOneByName (req, res) {
    Category.findOne({name: req.params.name})
      .then(function(category, err) {
        if (err) {
          return res.serverError(err);
        }
        else if (category) {
          return res.json(category);
        }
        else {
          return res.notFound();
        }
      });
  }
}

module.exports = CategoryController;
