'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {

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
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    }
};
