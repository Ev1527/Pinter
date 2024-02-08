'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Party extends Model {
    
    static associate({Room}) {
      this.hasMany(Room, {foreignKey: 'party_id'});
    }
  }
  Party.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Party',
  });
  return Party;
};