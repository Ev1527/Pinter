import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Party: FC = () => {
  const parties = ['restaurant', 'bar', 'theater', 'walk', 'quiz'];

  return (
    <div>
      Выберите мероприятие:
      <ul>
        {parties.map((el) => (
          <li key={el}>
            <Link to={`/parties/${el}`}>{el}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Party;