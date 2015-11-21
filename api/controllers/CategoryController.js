/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findOneByName: function (req, res) {
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
};
