/**
* Cocktail.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
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
    rating: {
      type: 'integer'
    },
    image: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    category: {
      model: 'category'
    },
    ingredients: {
      type: 'array'
    }
  }
};
