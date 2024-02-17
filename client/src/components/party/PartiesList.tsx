import React, { useState } from 'react';
// import styles from './styles/Party.module.scss';
import styles from './styles/PartiesList.module.scss';
import PartyItem from './PartyItem';
import leftArr from './styles/arr_left.svg';
import rightArr from './styles/arr_right.svg';
import { useAppSelector } from "../../redux/store";

export default function PartiesList(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState("Выбрать категорию");
  const { parties } = useAppSelector((store) => store.party);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

    return (
        <div id="events" className={styles.parties__list}>
            <div className={styles.title}>
                <div className={styles.where}>Куда идем</div>
                <div className={styles.togo}>сегодня?</div>
            </div>

            <div className={styles.filter__container}>
                <p>{selectedValue}</p>
                <select value={"Выбрать категорию"} onChange={handleChange}>
                    <option value="Выбрать категорию">Выбрать категорию</option>
                    <option value="Сегодня">Сегодня</option>
                    <option value="На этой неделе">На этой неделе</option>
                    <option value="В этом месяце">В этом месяце</option>
                </select>
            </div>

            <div className={styles.all__parties}>
                {parties.map((party) => (
                <PartyItem key={party.id} party={party} />
                ))}
            </div>
            
            <div className={styles.btn__container}>
                <div><img src={leftArr} alt="" /></div>
                <div><img src={rightArr} alt="" /></div>
            </div>
        </div>
    );
}
