import React from 'react';
import roomIcon1 from './styles/roomIcons/room_icon1.svg';
import roomIcon2 from './styles/roomIcons/room_icon2.svg';
import roomIcon3 from './styles/roomIcons/room_icon3.svg';
import roomIcon4 from './styles/roomIcons/room_icon4.svg';
import roomIcon5 from './styles/roomIcons/room_icon5.svg';
import styles from './styles/Party.module.scss';
import { useNavigate } from 'react-router-dom';


export default function RoomItems(): JSX.Element {
    const nav = useNavigate();

    return (
        <div className={styles.rooms__container}>
            <div className={styles.item} onClick={() => nav('/room')}>
                <h4>Комната #1</h4>
                <img src={roomIcon1} alt="enter the room1" />
            </div>
            <div className={styles.item} onClick={() => nav('/room')}>
                <h4>Комната #2</h4>
                <img src={roomIcon2} alt="enter the room2" />
            </div>
            <div className={styles.item} onClick={() => nav('/room')}>
                <h4>Комната #3</h4>
                <img src={roomIcon3} alt="enter the room3" />
            </div>
            <div className={styles.item} onClick={() => nav('/')}>
                <h4>Комната #4</h4>
                <img src={roomIcon4} alt="enter the room4" />
            </div>
            <div className={styles.item} onClick={() => nav('/')}>
                <h4>Комната #5</h4>
                <img src={roomIcon5} alt="enter the room5" />
            </div>
        </div>
    )
}
