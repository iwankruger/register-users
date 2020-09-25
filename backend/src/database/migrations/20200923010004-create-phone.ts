import { QueryInterface, DataTypes } from 'sequelize';
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('Phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
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
      return queryInterface.addIndex('Phones', ['userId']);
    }).then(() => {
      return queryInterface.addConstraint('Phones', {
        fields: ['phoneTypeId'],
        type: 'foreign key',
        name: 'phones_phoneTypeId_fkey',
        references: {
            table: 'PhoneTypes',
            field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'cascade'
      });
    }).then(() => {
      return queryInterface.addConstraint('Phones', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'phones_userId_fkey',
        references: {
            table: 'Users',
            field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'cascade',
      });
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('Phones');
  }
};