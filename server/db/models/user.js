'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate({ Room, Message, Access_Table, Test}) {
      this.hasMany(Room, {foreignKey: 'user_id'});
      this.hasMany(Message, {foreignKey: 'user_id'});
      this.hasMany(Access_Table, {foreignKey: 'user_id'});
      this.hasMany(Test, {foreignKey: 'user_id'});
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};