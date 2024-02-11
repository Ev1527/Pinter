export type PartyType = {
  id: number;
  img: string;
  title: string;
  date: string;
  time: string;
  description: string;
  category?: string;
};

export const parties: PartyType[] = [
  {
    id: 1,
    img: 'pic.jpg',
    title: 'Концерт группы ЛСП',
    date: '7 марта в',
    time: '22:00',
    category: 'music',
    description: 'jhbjhj',
  },
  {
    id: 2,
    img: 'pic.jpg',
    title: 'Ужин в Хачапури и вино',
    date: '8 марта в',
    time: '20:00',
    category: 'food',
    description: 'lkklm',
  },
  {
    id: 3,
    img: 'pic.jpg',
    title: 'Бизнес-ланч в Surf Coffee',
    date: '16 марта в',
    time: '18:00',
    category: 'food',
    description: 'lmkmkk',
  },
  {
    id: 4,
    img: 'pic.jpg',
    title: 'Квартирник в Black Swan',
    date: '20 марта в 14:00',
    time: '14:00',
    category: 'other',
    description: '',
  },
  {
    id: 5,
    img: 'pic.jpg',
    title: 'Квиз "Угадай мелодию. Микс" в Liberty ',
    date: '10 февраля в',
    time: '20:00',
    category: 'contest',
    description: '',
  },
  {
    id: 6,
    img: 'pic.jpg',
    title: 'Квест-Перформанс Dead Inside',
    date: '12 февраля в',
    time: '23:00',
    category: 'contest',
    description: '',
  },
  {
    id: 7,
    img: 'pic.jpg',
    title: 'Посиделки в Баре Timeless',
    date: '11 февраля в',
    time: '20:00',
    category: 'drink',
    description: '',
  },
];
