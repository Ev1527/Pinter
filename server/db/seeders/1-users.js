const { faker } = require('@faker-js/faker');

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const userData = []

    for(let i = 0; i < 5; i += 1) {
      const seed = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.email(), 10),
        mode: 'user',
        image: "https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      userData.push(seed)
    }

    await queryInterface.bulkInsert('Users', userData)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
