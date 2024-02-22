import React, { useEffect } from "react";
import styles from "./styles/UserPartyItem.module.scss";
import btnX from "./styles/btn-x.svg";
import partyImg from "./styles/party_item_img.png";
import { useNavigate } from "react-router-dom";
import { UserPartyRoom } from "./types/UserParties";
import { deleteUserPartyRoom } from "./profileSlice";
import { useAppDispatch } from "../../redux/store";

export default function UserPartyItem({
  room,
  color,
}: {
  room: UserPartyRoom;
  color: string;
}): JSX.Element {
  const partyImage = room.Party.image || partyImg;
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  console.log("room: ", room);

  const deleteRoomHandler = () => {
    // const { data } = await axios.delete(`api/users/room/${room.id}`);
    // if (data.message === "success") {
    //     window.location.reload();
    // }
    // window.location.reload();
    dispatch(deleteUserPartyRoom(room.id));
  };

  useEffect(() => {
  }, [deleteRoomHandler]);
  return (
    <div className={styles.user__party__item}>
      <div className={styles.user__party__item__header}>
        <span>
          {room.Party.time} | {room.Party.date}
        </span>
        <img onClick={deleteRoomHandler} src={btnX} alt="delete" />
      </div>
      <img className={styles.user__party__item__img} src={partyImage} alt="" />
      <div
        style={{ backgroundColor: color }}
        className={styles.user__party__item__footer}
      >
        <span onClick={() => nav(`/chat/${room.id}`)}>
          Перейти в чат {room.title}
        </span>
      </div>
    </div>
  );
}
