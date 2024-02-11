'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Party extends Model {

    static associate({Group_Member}) {
      this.hasMany(Group_Member, {foreignKey: 'party_id'});
    }
  }
  Party.init({
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.TEXT,
    date: DataTypes.STRING,
    time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Party',
  });
  return Party;
};