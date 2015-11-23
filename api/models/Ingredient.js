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
    fullname: {
      type: 'string',
      required: true
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
