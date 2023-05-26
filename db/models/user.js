const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Game, Rating }) {
      this.hasMany(Game, { foreignKey: 'user_id' });
      this.belongsTo(Rating, { foreignKey: 'rating_id' });
    }
  }
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    rating_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Ratings',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
