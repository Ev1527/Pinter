// db/models/message.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ Room_Dialogue, User }) {
      this.belongsTo(Room_Dialogue, { foreignKey: 'room_dialogue_id' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Message.init(
    {
      text: DataTypes.TEXT,
      time_stamp: DataTypes.DATE,
      room_dialogue_id: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );
  return Message;
};
