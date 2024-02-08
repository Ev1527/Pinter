'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    
    static associate({Room, User}) {
      this.belongsTo(Room, {foreignKey: 'room_id'});
      this.belongsTo(User, {foreignKey: 'user_id'});
    }
  }
  Message.init({
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
    time_stamp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};