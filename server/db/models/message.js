'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Room_Dialogue, User}) {
      this.belongsTo(Room_Dialogue, {foreignKey: 'room_dialogue_id'});
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Message.init({
    text: DataTypes.TEXT,
    time_stamp: DataTypes.DATE,
    room_dialogue_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};