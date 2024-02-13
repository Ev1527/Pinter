import React, { useState } from "react";
import RoomItems from "./RoomItems";
import styles from "./styles/Party.module.scss";
import findYours from "./styles/Найти своих.png";
import AddRoomModal from "../room/AddRoomModal";

export default function PartyPage(): JSX.Element {
  const [visible, setVisible] = useState(false);

  const hide = (): void => {
    setVisible(false);
  };

  return (
    <div className={styles.party_page}>
      <img className={styles.findYours} src={findYours} alt="" />
      <div className={styles.party_page__info}>
        <button type="button" onClick={() => setVisible(true)}>
          Создать комнату
        </button>
        <div className={styles.time_place}>
          <p>16 марта | 18:00</p>
          <p>Бизнес-ланч от Setters X Surf Coffee</p>
        </div>
      </div>
      <div className={styles.choose_room}>
        <h1>Выбрать комнату</h1>
        <RoomItems />
      </div>
      {visible && <AddRoomModal hide={hide} />}
    </div>
  );
}
