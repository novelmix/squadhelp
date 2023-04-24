const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate({ User, Contest, Rating }) {
      this.belongsTo(User, { foreignKey: 'userId', sourceKey: 'id' });
      this.belongsTo(Contest, { foreignKey: 'contestId', sourceKey: 'id' });
      this.hasOne(Rating, { foreignKey: 'offerId', sourceKey: 'id' });
    }
  }
  Offer.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
            key: 'id',
          },
        },
      },
      contestId: {
        field: 'contest_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'contests',
            key: 'id',
          },
        },
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileName: {
        field: 'file_name',
        type: DataTypes.STRING,
        allowNull: true,
      },
      originalFileName: {
        field: 'original_file_name',
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
      moderatorStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'Offer',
      tableName: 'offers',
    },
  );

  return Offer;
};
