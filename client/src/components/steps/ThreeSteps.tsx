import React from 'react';
import step1 from './styles/step1_img.svg';
import step2 from './styles/step2_img.svg';
import step3 from './styles/step3_img.svg';
import styles from './styles/ThreeSteps.module.scss';
import bgImg from './styles/road_background.svg';

export default function ThreeSteps(): JSX.Element {

    return (
        <div id="three_steps" className={styles.three__steps}>
            <h1>Три шага, чтобы стать частью комьюнити</h1>
            <img className={styles.background} src={bgImg} alt="" />
            <div className={styles.step_one}>
                <img src={step1} alt="" />
                <p><span>Пройди регистрацию</span> на сайте, чтобы тебе были доступны все возможности Pinter</p>
            </div>
            <div className={styles.step_two}>
                <img src={step2} alt="" />
                <p><span>Выбери мероприятие</span> из нашего списка и нажми на него, чтобы узнать подробности</p>
            </div>
            <div className={styles.step_three}>
                <img src={step3} alt="" />
                <p><span>Создай свою комнату</span> или присоединись к уже существующей, чтобы общаться с единомышленниками</p>
            </div>
        </div>
    )
}
