'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room_Dialogue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Group_Member, Message, Test}) {
      this.hasMany(Group_Member, {foreignKey: 'room_dialogue_id'});
      this.hasMany(Message, {foreignKey: 'room_dialogue_id'});
      this.hasOne(Test, {foreignKey: 'room_dialogue_id'});
      // define association here
    }
  }
  Room_Dialogue.init({
    title: DataTypes.STRING,
    token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Room_Dialogue',
  });
  return Room_Dialogue;
};