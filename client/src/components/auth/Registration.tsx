import React, { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { registration } from "./authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Auth.module.scss";

export default function Registration(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onHandleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(registration({ name, email, password, cpassword }))
      .then(
        (data) => {
          if ("error" in data) {
            setError(data.error.message);
            return;
          }
          navigate("/");
        },
      )
      .catch((error: any) => {
        console.log(error);
      });
  };
  // const onHandleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const resultAction = await dispatch(registration({ name, email, password, cpassword }));

  //     if (registration.fulfilled.match(resultAction)) {
  //       
  //       navigate("/");
  //     } else if (registration.rejected.match(resultAction)) {
  //       
  //       const payload = resultAction.payload;
  //       if (payload && payload.error && payload.error.message) {
  //         setError(payload.error.message);
  //       } else {
  //         setError("An unknown error occurred.");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className={styles.container}>
      <form id="reg-form" onSubmit={onHandleSubmit}>
        <h2>Страница регистрации</h2>
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="login"
            type="text"
            placeholder="Ваше имя"
          />
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Введите e-mail"
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Ваш пароль"
          />
        </div>
        <div>
          <input
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            name="cpassword"
            type="password"
            placeholder="Повторите пароль"
          />
        </div>
        {error && (
          <div className="fail" style={{ color: "red" }}>
            {error}
          </div>
        )}
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}
