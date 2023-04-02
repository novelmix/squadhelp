const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {
    static associate({ User, Offer }) {
      this.belongsTo(User, {
        foreignKey: 'userId',
        sourceKey: 'id',
      });
      this.hasMany(Offer, {
        foreignKey: 'contestId',
        sourceKey: 'id',
      });
    }
  }
  Contest.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
            key: 'id',
          },
        },
      },
      contestType: {
        field: 'contest_type',
        allowNull: false,
        type: DataTypes.ENUM('name', 'tagline', 'logo'),
      },
      fileName: {
        field: 'file_name',
        allowNull: true,
        type: DataTypes.STRING,
      },
      originalFileName: {
        field: 'original_file_name',
        allowNull: true,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      typeOfName: {
        field: 'type_of_name',
        allowNull: true,
        type: DataTypes.STRING,
      },
      industry: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      focusOfWork: {
        field: 'focus_of_work',
        allowNull: true,
        type: DataTypes.TEXT,
      },
      targetCustomer: {
        field: 'target_customer',
        allowNull: true,
        type: DataTypes.TEXT,
      },
      styleName: {
        field: 'style_name',
        allowNull: true,
        type: DataTypes.STRING,
      },
      nameVenture: {
        field: 'name_venture',
        allowNull: true,
        type: DataTypes.STRING,
      },
      typeOfTagline: {
        field: 'type_of_tagline',
        allowNull: true,
        type: DataTypes.STRING,
      },
      brandStyle: {
        field: 'brand_style',
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        field: 'created_at',
        allowNull: true,
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prize: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      priority: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'Contest',
      tableName: 'contests',
    },
  );

  return Contest;
};
