'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }, onDelete:'CASCADE',
      })
    }
  };
  Post.init({
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    //modifiedBy: { type: DataTypes.STRING, allowNull: true },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};