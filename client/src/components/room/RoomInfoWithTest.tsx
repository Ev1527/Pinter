import React, { useState } from "react";
import styles from "./styles/Room.module.scss";
import { Room } from "./types/RoomState";
import { passTestRoom } from "./roomSlice";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function RoomInfoWithTest({
  hide,
  room,
}: {
  hide: () => void;
  room: Room;
}): JSX.Element {
  const [firstAnswer, setFirstAnswer] = useState("");
  const [secondAnswer, setSecondAnswer] = useState("");
  const [thirdAnswer, setThirdAnswer] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const addRoomHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const roomId = room.id;
    dispatch(
      passTestRoom({
        firstAnswer,
        secondAnswer,
        thirdAnswer,
        roomId,
      }),
    ).then((data) => {
      if (data.payload === "ok") {
        navigate("/chat");
        return;
      }
      return;
    });
    hide();
  };
  const { question1, question2, question3 } = room.Test.qa;

  return (
    <div className={styles.modal}>
      <div className={styles.add_room}>
        <button className={styles.add_room__close_btn} onClick={hide}>
          <span>Закрыть</span>
        </button>

        <form onSubmit={addRoomHandler}>
          <div className={styles.add_room__title}>
            <p>{room.title}</p>
            <p>{room.description}</p>
          </div>

          <div className={styles.add_room__questions}>
            <h2>Пройдите тест для входа</h2>
            <div className={styles.qa}>
              <p>{question1.question}</p>
              <select
                onChange={(e) => setFirstAnswer(e.target.value)}
                value={firstAnswer}
                required
              >
                <option value="" disabled></option>
                <option>Да</option>
                <option>Нет</option>
              </select>
            </div>
            <div className={styles.qa}>
              <p>{question2.question}</p>
              <select
                onChange={(e) => setSecondAnswer(e.target.value)}
                value={secondAnswer}
                required
              >
                <option value="" disabled></option>
                <option>Да</option>
                <option>Нет</option>
              </select>
            </div>
            <div className={styles.qa}>
              <p>{question3.question}</p>
              <select
                onChange={(e) => setThirdAnswer(e.target.value)}
                value={thirdAnswer}
                required
              >
                <option value="" disabled></option>
                <option>Да</option>
                <option>Нет</option>
              </select>
            </div>
            <button type="submit" className={styles.add_room__btn}>
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
