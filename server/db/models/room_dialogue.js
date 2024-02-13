"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room_Dialogue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Group_Member, Message, Test, Party }) {
      this.hasMany(Group_Member, { foreignKey: "room_dialogue_id" });
      this.hasMany(Message, { foreignKey: "room_dialogue_id" });
      this.hasOne(Test, { foreignKey: "room_dialogue_id" });
      this.belongsTo(Party, { foreignKey: "party_id" });
      // define association here
    }
  }
  Room_Dialogue.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      members: DataTypes.INTEGER,
      token: DataTypes.TEXT,
      party_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Room_Dialogue",
    },
  );
  return Room_Dialogue;
};
