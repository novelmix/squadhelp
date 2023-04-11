const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ Conversation, User }) {
      this.belongsTo(Conversation, {
        foreignKey: 'conversationId',
        sourceKey: 'id',
      });
      this.belongsTo(User, {
        foreignKey: 'userId',
        sourceKey: 'id',
      });
    }
  }
  Message.init(
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
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Message',
      tableName: 'messages',
    }
  );

  return Message;
};
