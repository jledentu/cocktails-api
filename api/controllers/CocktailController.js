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

    let criteria = {};

    if (ingredients.length > 0) {
      criteria.ingredients = ingredients;
    }
    sails.models.cocktail.find(criteria)
    .then((cocktails) => {
      res.json(cocktails);
    });
  }
};
