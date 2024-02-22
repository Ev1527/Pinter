import React from 'react';
import step1 from './styles/step1_img.svg';
import step2 from './styles/step2_img.svg';
import step3 from './styles/step3_img.svg';
import styles from './styles/ThreeSteps.module.scss';
import bgImg from './styles/road_background.svg';
import step1front from './styles/step_one_front.png';
import step2front from './styles/step_two_front.png';
import step3front from './styles/step_three_front.png';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function ThreeSteps(): JSX.Element {
    const nav = useNavigate();

    return (
        <div id="three_steps" className={styles.three__steps}>
            <h1>Три шага, чтобы стать частью комьюнити</h1>
            <img className={styles.background} src={bgImg} alt="" />
 
            <div className={styles.step_one} onClick={() => nav('/auth/registration')}>
                <div className={styles.step_one__front}>
                    <img src={step1front} alt="first step" />
                </div>
                <div className={styles.step_one__back}>
                    <img src={step1} alt="first step" />
                    <p><span>Пройди регистрацию</span> на сайте, чтобы тебе были доступны все возможности Pinter</p>
                </div>
            </div>

            <div className={styles.step_two}>
                <HashLink className="nav__button" smooth to="#events">
                    <div className={styles.step_two__front}>
                        <img src={step2front} alt="second step" />
                    </div>
                    <div className={styles.step_two__back}>
                        <img src={step2} alt="second step" />
                        <p><span>Выбери мероприятие</span> из нашего списка и нажми на него, чтобы узнать подробности</p>
                    </div>
                </HashLink>
            </div>

            <div className={styles.step_three} onClick={() => nav('/parties/1')}>
                <div className={styles.step_three__front}>
                    <img src={step3front} alt="third step" />
                </div>
                <div className={styles.step_three__back}>
                    <img src={step3} alt="third step" />
                    <p><span>Создай свою комнату</span> или присоединись к уже существующей, чтобы общаться с единомышленниками</p>
                </div>
            </div>
        </div>
    )
}
