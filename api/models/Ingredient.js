/**
* Ingredient.js
*
* @description :: This model represents an ingredient
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    slug: {
      type: 'slug',
      from: 'name'
    },
    description: {
      type: 'string'
    },
    cocktails: {
      collection: 'cocktail',
      via: 'ingredients'
    }
  }
};
