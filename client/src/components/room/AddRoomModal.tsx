import React, { useState } from "react";
import styles from "./styles/Room.module.scss";

export default function AddRoomModal({
  hide,
}: {
  hide: () => void;
}): JSX.Element {
  const [check, setCheck] = useState(true);

  const checkHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ): void => {
    console.log(e.target);

    setCheck((prev) => !prev);
  };

  console.log(check);

  return (
    <div className={styles.modal}>
      <div className={styles.add_room}>
        <button className={styles.add_room__close_btn} onClick={hide}>
          <span>Закрыть</span>
        </button>

        <form>
          <div className={styles.add_room__title}>
            <input type="text" placeholder="Придумайте название комнаты" />
            <input type="number" placeholder="Количество людей" />
            <div className={styles.add_room__switch}>
              <p>Тест для новых участников</p>
              <div className={styles.switch} id="switch_id">
                <input
                  className={styles.add_room__switch__input}
                  type="checkbox"
                  checked={check}
                  onChange={checkHandler}
                />
                <span className={`${styles.slider} ${styles.round}`} />
              </div>
            </div>
          </div>

          <div className={styles.add_room__questions}>
            <h2>Придумайте три вопроса</h2>
            <div className={styles.qa}>
              <input type="text" placeholder="Вопрос 1" />
              {/* <button>Да</button>
                            <button>Нет</button> */}
              <select>
                <option>Да</option>
                <option>Нет</option>
              </select>
            </div>
            <div className={styles.qa}>
              <input type="text" placeholder="Вопрос 2" />
              {/* <button>Да</button>
                            <button>Нет</button> */}
              <select>
                <option>Да</option>
                <option>Нет</option>
              </select>
            </div>
            <div className={styles.qa}>
              <input type="text" placeholder="Вопрос 3" />
              {/* <button>Да</button> */}
              <select>
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
