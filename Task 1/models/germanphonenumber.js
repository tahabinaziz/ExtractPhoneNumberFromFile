'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Germanphonenumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Germanphonenumber.init({
    phone: DataTypes.STRING,
    taskId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Germanphonenumber',
  });
  return Germanphonenumber;
};