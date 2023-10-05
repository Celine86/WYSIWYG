'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      models.Image.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }, onDelete:'CASCADE',
      })
    }
  };
  Image.init({
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    imageTitle: { type:DataTypes.STRING, allowNull: true}
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};