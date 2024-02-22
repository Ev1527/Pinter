import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import styles from "./styles/UserProfile.module.scss";
import UpdProfileModal from "./UpdProfileModal";
import bgTitle from "./styles/profile_title.svg";
import NavForProfile from "../navigation/NavForProfile";
import UserPartyItem from "./UserPartyItem";
import { useAppDispatch, useAppSelector } from "../../redux/store";
// import { UserPartyRoom } from "./types/UserParties";
import { loadUserPartyRooms } from "./profileSlice";

export default function UserProfile(): JSX.Element {
  const [visible, setVisible] = useState(false);
  const { user } = useAppSelector((store) => store.auth);
  //   const [userParties, setUserParties] = useState<UserPartyRoom[]>([]);
  const dispatch = useAppDispatch();
  const userParties = useAppSelector((store) => store.profile.userRooms);
  console.log("user: ", user);

  const hide = (): void => {
    setVisible(true);
  };

  useEffect(() => {
    dispatch(loadUserPartyRooms(user?.id));
    // .then((data) => {
    //   setUserParties(data.payload);
    // });
    // const userPartyRooms = async () => {
    //     const { data } = await axios(`/api/users/parties/${user?.id}`);
    //     setUserParties(data);
    // }
    // userPartyRooms();
  }, [user, dispatch]);
  console.log(userParties);

  const bgDivColors = ["#3C4D34", "#422222", "#242E3C", "#3B2643", "#3E090F"];

  return (
    <>
      <NavForProfile />
      {visible ? (
        <UpdProfileModal hide={hide} />
      ) : (
        <div className={styles.user__profile}>
          <div className={styles.user__profile__header}>
            <UserCard />
            <img className={styles.bg_img} src={bgTitle} alt="Личный кабинет" />
          </div>
          <h1>Мои мероприятия</h1>
          <hr />
          <div className={styles.user__profile__body}>
            {userParties.length > 0 ? (
              userParties.map((room, index) => (
                <UserPartyItem
                  key={room.id}
                  room={room}
                  color={bgDivColors[index % bgDivColors.length]}
                />
              ))
            ) : (
              <div className={styles.user__profile__body__empty}>
                <p>Список мероприятий пока пуст.</p>
                <p>
                  Перейдите на страницу интересной вам вечеринки из раздела
                  "Мероприятия".
                </p>
                <p>
                  Создайте свою первую комнату, либо присоединитесь к
                  существующей.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
