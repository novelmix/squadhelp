const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Offer, Contest, Rating }) {
      this.hasMany(Offer, { foreignKey: 'userId', targetKey: 'id' });
      this.hasMany(Contest, { foreignKey: 'userId', targetKey: 'id' });
      this.hasMany(Rating, { foreignKey: 'userId', targetKey: 'id' });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        field: 'first_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        field: 'last_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        field: 'display_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      role: {
        type: DataTypes.ENUM('customer', 'creator'),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      accessToken: {
        field: 'access_token',
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'User',
      tableName: 'users',
    },
  );

  return User;
};
