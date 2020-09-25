import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface) => {

        return queryInterface.bulkInsert('Phones',[{
                number: '1234567890',
                phoneTypeId: 1,
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                number: '1231231230',
                phoneTypeId: 2,
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                number: '1112223330',
                phoneTypeId: 1,
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                number: '1231231233',
                phoneTypeId: 3,
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
                number: '1231231234',
                phoneTypeId: 4,
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },
    down: (queryInterface: QueryInterface) => {
      return queryInterface.bulkDelete('Phones', {}, {});
    }
};
