'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {

    static associate({Room, User}) {
      this.belongsTo(Room, {foreignKey: 'room_id'});
      this.belongsTo(User, {foreignKey: 'user_id'});
    }
  }
  Test.init({
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    qa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Test',
  });
  return Test;
};