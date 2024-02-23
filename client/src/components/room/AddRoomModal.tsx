import React, { useState } from "react";
import styles from "./styles/AddRoomModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addRoomWithTest } from "./roomSlice";
import ScrollableDatalist from "./ScrollableDatalist";

export default function AddRoomModal({
  hide,
  partyId,
}: {
  hide: () => void;
  partyId: string | undefined;
}): JSX.Element {
  const [check, setCheck] = useState(true);
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState("");
  const [description, setDescription] = useState("");
  const [firstQuestion, setFirstQuestion] = useState("");
  const [secondQuestion, setSecondQuestion] = useState("");
  const [thirdQuestion, setThirdQuestion] = useState("");
  const [firstAnswer, setFirstAnswer] = useState("");
  const [secondAnswer, setSecondAnswer] = useState("");
  const [thirdAnswer, setThirdAnswer] = useState("");

  const allTestThisParty = useAppSelector((store) => store.room);
  const data = allTestThisParty.rooms.map((room) => room.Test);
  const allQuestions = data.reduce((questions, room) => {
    const roomQuestions = Object.values(room.qa).filter(
      (item) => typeof item === "object",
    );
    return [...questions, ...roomQuestions];
  }, []);

  const questionsWithoutAnswers = allQuestions.map(
    (question: { question: string }) => question.question,
  );

  const dispatch = useAppDispatch();

  const checkHandler: React.ChangeEventHandler<HTMLInputElement> = (): void => {
    setCheck((prev) => !prev);
  };

  const addRoomHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (
      !title ||
      !members ||
      !description ||
      !firstQuestion ||
      !secondQuestion ||
      !thirdQuestion ||
      !firstAnswer ||
      !secondAnswer ||
      !thirdAnswer
    ) {
      return alert("Заполните все поля");
    }
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
        partyId,
      }),
    );
    hide();
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
              required
            />
            <input
              onChange={(e) => setMembers(e.target.value)}
              value={members}
              type="number"
              placeholder="Укажите количество участников"
              required
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              placeholder="Описание"
              required
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
            <h2>Придумайте три вопроса для входа в вашу комнату</h2>
            <div className={styles.qa}>
              <ScrollableDatalist
                id="questions1"
                options={questionsWithoutAnswers}
                value={firstQuestion}
                onChange={(e) => setFirstQuestion(e.target.value)}
              />
              {/* <input
                value={firstQuestion}
                onChange={(e) => setFirstQuestion(e.target.value)}
                type="text"
                placeholder="Вопрос  1"
                list="questions"
                required
              /> */}

              {/* <datalist id="questions" style={{ overflow: "auto" }}>
                {questionsWithoutAnswers.map(
                  (question: string, index: number) => (
                    <option key={index} value={question} />
                  ),
                )}
              </datalist> */}
              <select
                onChange={(e) => {
                  setFirstAnswer(e.target.value);
                }}
                value={firstAnswer}
                required
              >
                <option value="" disabled></option>
                <option>Да</option>
                <option>Нет</option>
              </select>
            </div>
            <div className={styles.qa}>
              <ScrollableDatalist
                id="questions2"
                options={questionsWithoutAnswers}
                value={secondQuestion}
                onChange={(e) => setSecondQuestion(e.target.value)}
              />
              {/* <input
                value={secondQuestion}
                onChange={(e) => setSecondQuestion(e.target.value)}
                type="text"
                placeholder="Вопрос 2"
                required
              /> */}
              <select
                onChange={(e) => {
                  setSecondAnswer(e.target.value);
                }}
                value={secondAnswer}
                required
              >
                <option value="" disabled></option>
                <option>Да</option>
                <option>Нет</option>
              </select>
            </div>
            <div className={styles.qa}>
              <ScrollableDatalist
                id="questions3"
                options={questionsWithoutAnswers}
                value={thirdQuestion}
                onChange={(e) => setThirdQuestion(e.target.value)}
              />
              {/* <input
                value={thirdQuestion}
                onChange={(e) => setThirdQuestion(e.target.value)}
                type="text"
                placeholder="Вопрос 3"
                required
              /> */}
              <select
                onChange={(e) => {
                  setThirdAnswer(e.target.value);
                }}
                value={thirdAnswer}
                required
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
