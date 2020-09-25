import { QueryInterface, DataTypes } from 'sequelize';
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('PhoneTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).then(() => {
      return queryInterface.bulkInsert('PhoneTypes', [{
        type: 'home',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        type: 'work',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        type: 'mobile',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        type: 'office',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('PhoneTypes');
  }
};