import React from 'react';
import styles from './styles/MainPage.module.scss';
import About from '../about/About';
import PartiesList from '../party/PartiesList';
import Counter from '../counter/Counter';
import Map from '../map/Map';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import video from './styles/1108706_1080p_4k_2k_3840x2160.mp4';
import ThreeSteps from '../steps/ThreeSteps';

export default function MainPage(): JSX.Element {
  const nav = useNavigate();
  
  return (
    <>
      <div className={styles.main__container}>
        <div>
          <h1 onClick={() => nav('/profile')}>Pinter</h1>
          <p>Твое комьюнити рядом</p>
          <button type='button' onClick={() => nav('/party')}>НАЙТИ СВОИХ</button>
        </div>
        <div className={styles.video}>
          <video src={video} width={640} height={360} autoPlay muted playsInline loop />
          <div className={styles.video__overlay}></div>
        </div>
      </div>
      <About />
      <PartiesList />
      <Counter />
      <ThreeSteps />
      <Map />
      <Footer />
    </>
  )
}
