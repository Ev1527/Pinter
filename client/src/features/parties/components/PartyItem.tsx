import React, { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { parties, PartyType } from './parties';
import { v4 as uuidv4 } from 'uuid';

const RoomCreationModal: FC<{
  onCreate: (name: string, participants: number, questions: string[]) => void;
}> = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState(1);
  const [questions, setQuestions] = useState(['', '', '']);

  const handleQuestionChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuestions = [...questions];
      newQuestions[index] = event.target.value;
      setQuestions(newQuestions);
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onCreate(name, participants, questions);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='roomName'>Название комнаты:</label>
        <input
          id='roomName'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor='participantsCount'>Количество участников:</label>
        <input
          id='participantsCount'
          type='number'
          min='1'
          value={participants}
          onChange={(e) => setParticipants(Number(e.target.value))}
        />

        <label htmlFor='questions'>Вопросы для входа:</label>
        {questions.map((question, index) => (
          <input
            key={index}
            type='text'
            value={question}
            onChange={handleQuestionChange(index)}
          />
        ))}
        <button type='submit'>Сохранить</button>
      </form>
    </div>
  );
};

const PartyItem: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const partyId = Number(id);

  function getPartyById(parties: PartyType[], id: number | string) {
    return parties.find((party) => party.id === id);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState<string[]>([]); // Состояние для хранения созданных комнат
  // const [createdRooms, setCreatedRooms] = useState<string[]>([]);

  const party = getPartyById(parties, partyId);

  // const createRoom = (
  //   name: string,
  //   participants: number,
  //   questions: string[]
  // ) => {
  //   const roomId = uuidv4();
  //   setRooms((prevRooms) => [...prevRooms, roomId]); // Добавляем комнату в массив
  //   navigate(`/chat/${roomId}`, { state: { name, participants, questions } });
  //   setIsModalOpen(false); // Закрыть модальное окно после создания комнаты
  // };

  const createRoom = (
    name: string,
    participants: number,
    questions: string[]
  ) => {
    const newRoomId = uuidv4();
    navigate(`/chat/${partyId}/${newRoomId}`, {
      state: { name, participants, questions },
    });

    setRooms((prevRooms) => [...prevRooms, newRoomId]);
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <h2>{party?.title}</h2>
      <img src={party?.img} alt={party?.title} />
      <p>{party?.description}</p>
      <button onClick={toggleModal}>Создать комнату</button>
      {isModalOpen && <RoomCreationModal onCreate={createRoom} />}
      <h3>Список комнат:</h3>
      <ul>
        {rooms.map((roomId) => (
          <li key={roomId}>{`Комната: ${roomId}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default PartyItem;
