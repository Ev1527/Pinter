import React, { useState } from 'react';
import styles from './styles/Room.module.scss';
import { Room } from './types/RoomState';
import { passTestRoom } from './roomSlice';
import { useAppDispatch } from '../../redux/store';

export default function RoomInfoWithTest({
  hide,
  room,
}: {
  hide: () => void;
  room: Room;
}): JSX.Element {
  const [firstAnswer, setFirstAnswer] = useState('');
  const [secondAnswer, setSecondAnswer] = useState('');
  const [thirdAnswer, setThirdAnswer] = useState('');
  const dispatch = useAppDispatch();
  // const { question1, question2, question3 } = JSON.parse(room.Test.qa);

  const testData = room.Test ? JSON.parse(room.Test.qa) : {};
  const { question1 = {}, question2 = {}, question3 = {} } = testData;

  const addRoomHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const roomId = room.id;
    dispatch(
      passTestRoom({
        firstAnswer,
        secondAnswer,
        thirdAnswer,
        roomId,
      })
    ).then((data) => {
      if (data.payload === 'ok') {
        // navigate("/chat");
        alert(data.payload);
        return;
      }
      return alert(data.payload);
    });
  };

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

            {question1 && (
              <div className={styles.qa}>
                <p>{question1.question}</p>
                <select
                  onChange={(e) => setFirstAnswer(e.target.value)}
                  value={firstAnswer}
                >
                  <option value='' disabled></option>
                  <option>Да</option>
                  <option>Нет</option>
                </select>
              </div>
            )}

            {question2 && (
              <div className={styles.qa}>
                <p>{question2.question}</p>
                <select
                  onChange={(e) => setSecondAnswer(e.target.value)}
                  value={secondAnswer}
                >
                  <option value='' disabled></option>
                  <option>Да</option>
                  <option>Нет</option>
                </select>
              </div>
            )}

            {question3 && (
              <div className={styles.qa}>
                <p>{question3.question}</p>
                <select
                  onChange={(e) => setThirdAnswer(e.target.value)}
                  value={thirdAnswer}
                >
                  <option value='' disabled></option>
                  <option>Да</option>
                  <option>Нет</option>
                </select>
              </div>
            )}
            <button type='submit' className={styles.add_room__btn}>
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
