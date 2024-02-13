'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group_Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Room_Dialogue}) {
      this.belongsTo(User, {foreignKey: 'user_id'});
      this.belongsTo(Room_Dialogue, {foreignKey: 'room_dialogue_id'});
      // define association here
    }
  }
  Group_Member.init({
    user_id: DataTypes.INTEGER,
    room_dialogue_id: DataTypes.INTEGER,
    // party_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Group_Member',
  });
  return Group_Member;
};