const Ingredient = sails.models.Ingredient;

/**
 * IngredientController
 *
 * @description :: Server-side logic for managing ingredients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findOneByName: function (req, res) {
    Ingredient.findOne({name: req.params.name})
      .then(function(ingredient, err) {
        if (err) {
          return res.serverError(err);
        }
        else if (ingredient) {
          return res.json(ingredient);
        }
        else {
          return res.notFound();
        }
      });
  }
};
