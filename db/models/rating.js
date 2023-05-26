const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate({ User }) {
      this.hasMany(User, { foreignKey: 'rating_id' });
    }
  }
  Rating.init({

    bigscore: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};
