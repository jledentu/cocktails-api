/**
 * CocktailController
 *
 * @description :: Server-side logic for managing cocktails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  search: function (req, res) {

    let query = req.query.q.split(' ');
    let ingredients = query.map((term) => {
      let match = term.match(/^ing:(.*)$/);
      if (match) {
        return match[1];
      }
    });

    if (ingredients.length > 0) {
      sails.models.ingredient.find({
        slug: ingredients
      })
      .populate('cocktails')
      .exec((err, ingredients) => {
        let cocktails = [];

        for (let ing of ingredients) {
          cocktails = cocktails.concat(ing.cocktails);
        }

        res.json(cocktails);
      });
    } else {
      sails.models.cocktail.find()
      .then((err, cocktails) => {
        res.json(cocktails);
      });
    }
  }
};
