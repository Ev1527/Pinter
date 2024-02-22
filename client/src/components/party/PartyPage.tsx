import React, { useEffect, useState } from "react";
import RoomItems from "../room/RoomsItem";
import styles from "./styles/PartyPage.module.scss";
import findYours from "./styles/find_yours.svg";
import AddRoomModal from "../room/AddRoomModal";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { loadRooms } from "../room/roomSlice";
import NavForProfile from "../navigation/NavForProfile";

export default function PartyPage(): JSX.Element {
  const { parties } = useAppSelector((store) => store.party);
  const { user } = useAppSelector((store) => store.auth);
  const { rooms } = useAppSelector((store) => store.room);
  const [visible, setVisible] = useState(false);
  const { partyId } = useParams();
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  
  let party;
  if (partyId) {
    party = parties.find((party) => party.id === +partyId);
  }

  const hide = (): void => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch(loadRooms(partyId));
  }, [setVisible]);

  const createRoomHandler = () => {
    if (user?.name) {
      setVisible(true);
    } else {
      alert("Для создания комнаты войдите в приложение или зарегистрируйтесь");
    }
  };

  const bgDivColors = ['#3C4D34', '#422222', '#242E3C', '#3B2643', '#3E090F'];


  return (
    // добавить картинку для отдельного мероприятия party.image
    <>
      <NavForProfile />
      <div className={styles.party_page}>
        <img
          className={styles.findYours}
          src={findYours}
          alt="find your company"
        />
        <div className={styles.party_page__info}>
          <img src={party?.image} alt="" />
          {/* <button type="button" onClick={createRoomHandler}>
            Создать комнату
          </button> */}
          <div className={styles.time_place}>
            <p>{`${party?.time} | ${party?.date}`}</p>
            <p>{party?.title}</p>
          </div>
        </div>

        <div className={styles.party_page__description}>
          <h3>{party?.description}</h3>
          <button type="button" onClick={createRoomHandler}>
            Создать комнату
          </button>
        </div>

        <div className={styles.choose_room}>
          <h1>Выбрать комнату</h1>
          {user?.name ? (
              <div className={styles.rooms__container}>
                {rooms.map((room, index) => (
                  <RoomItems key={room.id} room={room} color={bgDivColors[index % bgDivColors.length]} />
                ))}
              </div>
            ) : (
              <div className={styles.warning}>
                <h5 onClick={() => nav("/auth/registration")}>Для просмотра комнат войдите <br />в приложение или зарегистрируйтесь</h5>
              </div>
            )}
        </div>
        {visible && <AddRoomModal hide={hide} partyId={partyId} />}
      </div>
    </>
  );
}
