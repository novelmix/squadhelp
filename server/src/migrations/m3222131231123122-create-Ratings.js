module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ratings', {
      offerId: {
        field: 'order_id',
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'offers',
            key: 'id',
          },
        },
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
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
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ratings');
  },
};
