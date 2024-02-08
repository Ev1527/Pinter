'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    
    static associate({Party, User, Message, Test}) {
      this.belongsTo(Party, {foreignKey: 'party_id'});
      this.belongsTo(User, {foreignKey: 'user_id'});
      this.hasMany(Message, {foreignKey: 'room_id'});
      this.hasOne(Test, {foreignKey: 'room_id'});
    }
  }
  Room.init({
    user_id: DataTypes.INTEGER,
    party_id: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};