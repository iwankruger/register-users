import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface) => {

      return queryInterface.bulkInsert('Users',[{
                  name: 'Stuart',
                  surname: 'Little',
                  email: 'stuart@little.com',
                  createdAt: new Date(),
                  updatedAt: new Date(),
              }, {
                  name: 'Brian',
                  surname: 'Griffin',
                  email: 'brian@griffin.com',
                  createdAt: new Date(),
                  updatedAt: new Date(),
              }, {
                  name: 'Stan',
                  surname: 'Smith',
                  email: 'stan@smith.com',
                  createdAt: new Date(),
                  updatedAt: new Date(),
              },
          ], {});
    },
    down: (queryInterface: QueryInterface) => {
      return queryInterface.bulkDelete('Users', {}, {});
    }
};
