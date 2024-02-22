import React from 'react';
import styles from './styles/MainPage.module.scss';
import About from '../about/About';
import PartiesList from '../party/PartiesList';
import Counter from '../counter/Counter';
import Map from '../map/Map';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import video from './styles/1108706_1080p_4k_2k_3840x2160.mp4';
import video2 from './styles/mixkit-happy-friends-looking-at-photo-in-a-bar-21238-medium.mp4';
import ThreeSteps from '../steps/ThreeSteps';
import { HashLink } from 'react-router-hash-link';

export default function MainPage(): JSX.Element {
  const nav = useNavigate();
  
  return (
    <>
      <div className={styles.main__container}>
        <div>
          <h1>Pinter</h1>
          <p>Твое комьюнити рядом</p>
          <HashLink smooth to="#events">
            <button type='button' onClick={() => nav('/parties')}>НАЙТИ СВОИХ</button>
          </HashLink>
        </div>
        
        <HashLink smooth to="#about">
          <div className={styles.video}>
            <video src={video2} width={840} autoPlay muted playsInline loop />
            {/* <video src={video} width={640} height={360} autoPlay muted playsInline loop /> */}
            <div className={styles.video__overlay}></div>
          </div>
        </HashLink>
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
