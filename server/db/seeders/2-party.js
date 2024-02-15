"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Parties', [{
      category: 'Кино',
      title: 'Встреча по случаю нового фильма о Гарри Поттере',
      description: 'Гарри Поттер вновь с нами',
      image: 'https://cybersport.metaratings.ru/storage/images/47/5a/475a79b6f064e089aed622ef35e7dde1.png',
      date: '2024-02-15',
      time: '18:00',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      category: 'Пиво',
      title: 'Либители Пива',
      description: 'Употребление большого колличества пива',
      image: 'https://центр-профилактики.рф/wp-content/uploads/2019/04/2-1024x640.jpg',
      date: '2024-05-20',
      time: '15:30',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      category: 'Игры',
      title: 'Любители стратегий',
      description: 'Обсуждаем новые и старые стратегии',
      image: 'https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt4b6d6857f147a6de/61254804841f180993fedb61/6885-32192.png',
      date: '2024-05-20',
      time: '15:30',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      category: 'Путешествия',
      title: 'Обсуждаем интересные места',
      description: 'Делимся своим опытом путешествий',
      image: 'https://www.lrt.lt/img/2021/05/02/959965-924338-756x425.jpg',
      date: '2024-05-20',
      time: '15:30',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Parties', null, {});
  }
};
