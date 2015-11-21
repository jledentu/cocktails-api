/**
* Category.js
*
* @description :: This model represents a category of cocktails
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    description: {
      type: 'string'
    },
    cocktails: {
      collection: 'cocktail',
      via: 'category'
    }
  }
};
