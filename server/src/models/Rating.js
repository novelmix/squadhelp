const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate({ User, Offer }) {
      this.belongsTo(User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
      this.belongsTo(Offer, {
        foreignKey: 'offerId',
        targetKey: 'id',
      });
    }
  }
  Rating.init(
    {
      offerId: {
        field: 'order_id',
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'offers',
            key: 'id',
          },
        },
      },
      userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'users',
            key: 'id',
          },
        },
      },
      mark: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'Rating',
      tableName: 'ratings',
    },
  );

  return Rating;
};
