import React, { useEffect, useState } from 'react';
import RoomItems from '../room/RoomsItem';
import styles from './styles/Party.module.scss';
import findYours from './styles/Найти своих.png';
import AddRoomModal from '../room/AddRoomModal';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { loadRooms } from '../room/roomSlice';

export default function PartyPage(): JSX.Element {
  const [visible, setVisible] = useState(false);
  const { parties } = useAppSelector((store) => store.party);
  const { rooms } = useAppSelector((store) => store.room);
  const { partyId } = useParams();
  const dispatch = useAppDispatch();

  let party;
  if (partyId) {
    party = parties.find((party) => party.id === +partyId);
  }

  const hide = (): void => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch(loadRooms(partyId));
  }, [dispatch, partyId]);

  const { user } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();
  const redirect = () => {
    setTimeout(() => navigate('/auth/authorization'), 2000);
  };

  const createRoomHandler = () => {
    if (user?.name) {
      setVisible(true);
    } else {
      alert('Для создания комнаты необходимо войти в приложение');
    }
  };

  return (
    <div className={styles.party_page}>
      <img className={styles.findYours} src={findYours} alt='' />
      <div className={styles.party_page__info}>
        <button type='button' onClick={createRoomHandler}>
          Создать комнату
        </button>
        <div className={styles.time_place}>
          <p>{`${party?.time} | ${party?.date}`}</p>
          <p>{party?.title}</p>
        </div>
      </div>
      <p>{party?.description}</p>
      <div>
        {user?.name ? (
          <>
            <h1>Выбрать комнату</h1>
            {rooms.map((room) => (
              <RoomItems key={room.id} room={room} />
            ))}
          </>
        ) : (
          <>
            <h1>Для просмотра комнат необходимо авторизироваться</h1>
            {/* {redirect()} */}
          </>
        )}
      </div>
      {visible && <AddRoomModal hide={hide} partyId={partyId} />}
    </div>
  );
}
