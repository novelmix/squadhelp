const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate({ Catalog, Message }) {
      this.belongsToMany(Catalog, {
        through: 'catalog_to_conversations',
        foreignKey: 'conversationId',
        onDelete: 'cascade',
      });
      this.hasMany(Message, {
        foreignKey: 'conversationId',
        targetKey: 'id',
      });
    }
  }
  Conversation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      participants: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      blackList: {
        field: 'black_list',
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        defaultValue: [false, false],
        allowNull: false,
      },
      favoriteList: {
        field: 'favorite_list',
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        defaultValue: [false, false],
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Conversation',
      tableName: 'conversations',
    }
  );

  return Conversation;
};
