const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate({ User, Conversation }) {
      this.belongsTo(User, { foreignKey: 'userId', sourceKey: 'id' });
      this.belongsToMany(Conversation, {
        through: 'catalog_to_conversations',
        foreignKey: 'catalogId',
      });
    }
  }
  Catalog.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Catalog',
      tableName: 'catalogs',
    }
  );

  return Catalog;
};
