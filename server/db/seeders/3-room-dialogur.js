"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Room_Dialogues', [{
      title: 'Семейный чат',
      description: 'Чат для членов семьи',
      members: 'Иван, Мария, Мама, Папа',
      token: 'токен-чата-1',
      party_id: 1, // Ссылка на таблицу Parties
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Чат с друзьями',
      description: 'Чат для друзей',
      members: 'Друг1, Друг2, Друг3',
      token: 'токен-чата-2',
      party_id: 2, // Ссылка на таблицу Parties
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Чат',
      description: 'Чат для друзей',
      members: 'Друг1, Друг2, Друг3',
      token: 'токен-чата-2',
      party_id: 2, // Ссылка на таблицу Parties
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Чат с любьми',
      description: 'Чат для друзей',
      members: 'Друг1, Друг2, Друг3',
      token: 'токен-чата-2',
      party_id: 2, // Ссылка на таблицу Parties
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Добавьте больше данных при необходимости
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Room_Dialogues', null, {});
  }
};
