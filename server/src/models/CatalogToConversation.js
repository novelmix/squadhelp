const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CatalogToConversations extends Model {
    static associate(models) {
    }
  }
  CatalogToConversations.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      catalogId: {
        field: 'catalog_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'catalogs',
            key: 'id',
          },
        },
      },
      conversationId: {
        field: 'conversation_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'conversations',
            key: 'id',
          },
        },
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'CatalogToConversations',
      tableName: 'catalog_to_conversations',
    }
  );

  return CatalogToConversations;
};
