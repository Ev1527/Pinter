import React, { useState } from "react";
import styles from "./styles/Room.module.scss";
import { useAppDispatch } from "../../redux/store";
import { addRoomWithTest } from "./roomSlice";

export default function AddRoomModal({
  hide,
  partyId,
}: {
  hide: () => void;
  partyId: string | undefined;
}): JSX.Element {
  const [check, setCheck] = useState(true);
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState("2");
  const [description, setDescription] = useState("");
  const [firstQuestion, setFirstQuestion] = useState("");
  const [secondQuestion, setSecondQuestion] = useState("");
  const [thirdQuestion, setThirdQuestion] = useState("");
  const [firstAnswer, setFirstAnswer] = useState("");
  const [secondAnswer, setSecondAnswer] = useState("");
  const [thirdAnswer, setThirdAnswer] = useState("");
  const dispatch = useAppDispatch();

  const checkHandler: React.ChangeEventHandler<HTMLInputElement> = (): void => {
    setCheck((prev) => !prev);
  };

  const addRoomHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(
      addRoomWithTest({
        title,
        members,
        description,
        firstQuestion,
        secondQuestion,
        thirdQuestion,
        firstAnswer,
        secondAnswer,
        thirdAnswer,
        partyId
      }),
    );
  };

  return (
    <div className={styles.modal}>
      <div className={styles.add_room}>
        <button className={styles.add_room__close_btn} onClick={hide}>
          <span>Закрыть</span>
        </button>

        <form onSubmit={addRoomHandler}>
          <div className={styles.add_room__title}>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Придумайте название комнаты"
            />
            <input
              onChange={(e) => setMembers(e.target.value)}
              value={members}
              type="number"
              placeholder="Количество людей"
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              placeholder="Описание"
            />
          </div>

          <div className={styles.add_room__switch}>
            <p>Тест для новых участников</p>
            <label className={styles.switch} id="switch_id">
              <input
                className={styles.add_room__switch__input}
                type="checkbox"
                checked={check}
                onChange={checkHandler}
              />
              <span className={`${styles.slider} ${styles.round}`} />
            </label>
          </div>

          <div className={styles.add_room__questions}>
            <h2>Придумайте три вопроса</h2>
            <div className={styles.qa}>
              <input
                value={firstQuestion}
                onChange={(e) => setFirstQuestion(e.target.value)}
                type="text"
                placeholder="Вопрос 1"
              />
              <select
                onChange={(e) => setFirstAnswer(e.target.value)}
                value={firstAnswer}
              >
                <option value="" disabled></option>
                <option>Да</option>
                <option>Нет</option>
              </select>
            </div>
            <div className={styles.qa}>
              <input
                value={secondQuestion}
                onChange={(e) => setSecondQuestion(e.target.value)}
                type="text"
                placeholder="Вопрос 2"
              />
              <select
                onChange={(e) => setSecondAnswer(e.target.value)}
                value={secondAnswer}
              >
                <option value="" disabled></option>
                <option>Да</option>
                <option>Нет</option>
              </select>
            </div>
            <div className={styles.qa}>
              <input
                value={thirdQuestion}
                onChange={(e) => setThirdQuestion(e.target.value)}
                type="text"
                placeholder="Вопрос 3"
              />
              {/* <button>Да</button> */}
              <select
                onChange={(e) => setThirdAnswer(e.target.value)}
                value={thirdAnswer}
              >
                <option value="" disabled></option>
                <option>Да</option>
                <option>Нет</option>
              </select>
            </div>
            <button type="submit" className={styles.add_room__btn}>
              Создать комнату
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
