'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate({Access_Table, Group_Member}) {
      this.hasMany(Access_Table, {foreignKey: 'user_id'});
      this.hasMany(Group_Member, {foreignKey: 'user_id'});
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    mode: DataTypes.BOOLEAN,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};