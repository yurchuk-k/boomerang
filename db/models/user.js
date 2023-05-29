const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate() {

    }
  }
  User.init({
    name: {
      type: DataTypes.TEXT,
    },
    score: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
