import React, { useEffect, useState } from 'react';
import roomIcon1 from './styles/roomIcons/room_icon1.png';
// import roomIcon2 from './styles/roomIcons/room_icon2.png';
// import roomIcon3 from './styles/roomIcons/room_icon3.png';
// import roomIcon4 from './styles/roomIcons/room_icon4.png';
// import roomIcon5 from './styles/roomIcons/room_icon5.png';
import styles from '../party/styles/Party.module.scss';
import { Room } from './types/RoomState';
import RoomInfoWithTest from './RoomInfoWithTest';
import { useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

export default function RoomItems({ room }: { room: Room }): JSX.Element {
  const [visible, setVisible] = useState(false);

  const hide = (): void => {
    setVisible(false);
  };

  return (
    <div className={styles.rooms__container}>
      <div className={styles.item} onClick={() => setVisible(true)}>
        <h4>Комната # {room.id}</h4>
        <img src={roomIcon1} alt='enter the room1' />
      </div>
      {visible && <RoomInfoWithTest hide={hide} room={room} />}
    </div>
  );
}
