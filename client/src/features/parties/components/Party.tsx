import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { parties } from './parties';

const Party: FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, parties.length - 4));
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div>
        Куда идем <br />
        сегодня?
      </div>

      <button>на этой неделе</button>

      <select onChange={(e) => handleCategorySelect(e.target.value)}>
        <option value=''>Все категории</option>
        <option value='music'>Музыка</option>
        <option value='food'>Еда</option>
        <option value='contest'>Конкурсы</option>
        <option value='drink'>Выпивка</option>
        <option value='other'>Другое</option>
      </select>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {parties
          .filter(
            (party) => !selectedCategory || party.category === selectedCategory
          )
          .slice(startIndex, startIndex + 4)
          .map((el) => (
            <div key={el.title} style={{ border: '1px solid black' }}>
              <Link to={`/parties/${el.id}`}>
                {el.img}, {el.title}, {el.date}, {el.time}
              </Link>
            </div>
          ))}
      </div>
      <button onClick={handlePrev} disabled={startIndex === 0}>
        влево
      </button>
      <button onClick={handleNext} disabled={startIndex === parties.length - 4}>
        вправо
      </button>
    </div>
  );
};

export default Party;
