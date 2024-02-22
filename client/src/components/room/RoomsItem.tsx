import React, { useEffect, useState } from "react";
import styles from "../party/styles/PartyPage.module.scss";
import { Room } from "./types/RoomState";
import RoomInfoWithTest from "./RoomInfoWithTest";
import { useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import loginIcon from './styles/roomIcons/room_login_icon.svg';

export default function RoomItems({ room, color }: { room: Room, color: string }): JSX.Element {
  // console.log(room.Test);
  
  const [visible, setVisible] = useState(false);
  const { user } = useAppSelector((store) => store.auth);
  const { access_tables } = useAppSelector((store) => store.room);
  const navigate = useNavigate();
  const hide = (): void => {
    setVisible(false);
  };
  useEffect(() => {}, [access_tables, user]);

  const handleRoomAccess = () => {
    const isAccess = access_tables.find(
      (access) =>
        access.user_id === user?.id && access.room_token === room.token,
    );
    if (!isAccess && isAccess !== undefined) {
      alert("Это не ваши люди");
    } else {
      if (isAccess?.access) {
        navigate(`/chat/${room.id}`);
      } else if (isAccess?.access === false) {
        alert("Вы не можете войти в эту комнату");
      } else {
        setVisible(true);
      }
    }
  };

  return (
    <div className={styles.rooms__container}>
      <div className={styles.item} onClick={handleRoomAccess}>
        <h4>Комната # {room.id}</h4>
        <div style={{ backgroundColor: color }}>
          <img src={loginIcon} alt="enter the room" />
        </div>
      </div>
      {visible && <RoomInfoWithTest hide={hide} room={room} />}
    </div>
  );
}
