import React, { useState } from 'react';
// import styles from './styles/Party.module.scss';
import styles from './PartiesList2.module.scss';
import PartyItem from '../PartyItem';
import leftArr from './styles/arr_left.svg';
import rightArr from './styles/arr_right.svg';
import { useAppSelector } from "../../../redux/store";
import "slick-carousel/slick/slick.css"; // добавляю плавный слайдер
import "slick-carousel/slick/slick-theme.css"; // добавляю плавный слайдер
import Slider from "react-slick"; // добавляю плавный слайдер
// import NextArrow from './NextArrow'; // добавляю плавный слайдер
// import PrevArrow from './PrevArrow';

export default function PartiesList2(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState("Выбрать категорию");
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const visibleCount = 4; // Количество вечеринок, которое нам надо

  const { parties } = useAppSelector((store) => store.party);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setVisibleStartIndex(0); // Сброс индекса при смене категории
  };

  const filteredParties =
    selectedCategory === "Выбрать категорию"
      ? parties
      : parties.filter((party) => party.category === selectedCategory);

  const handlePrevClick = () => {
    setVisibleStartIndex((prevIndex) => Math.max(0, prevIndex - visibleCount));
  };

  const handleNextClick = () => {
    setVisibleStartIndex((prevIndex) => Math.min(filteredParties.length - visibleCount, prevIndex + visibleCount));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed:  500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    nextArrow: <div onClick={handleNextClick}><img src={rightArr} alt="Next" /></div>,
    prevArrow: <div onClick={handlePrevClick}><img src={leftArr} alt="Previous" /></div>,
  };

  const visibleParties = filteredParties.slice(visibleStartIndex, visibleStartIndex + visibleCount);

  return (
    <div id="events" className={styles.parties__list2}>
      <div className={styles.title}>
        <div className={styles.where}>Куда идем</div>
        <div className={styles.togo}>сегодня?</div>
      </div>
      <div className={styles.filter__container}>
        <select value={selectedCategory} onChange={handleChange}>
          <option value="Выбрать категорию">Выбрать категорию</option>
          <option value="Кино">Кино</option>
          <option value="Бары">Бары</option>
          <option value="Рестораны">Рестораны</option>
          <option value="Театры">Театры</option>
        </select>
      </div>

      <Slider {...settings} className={styles.all__parties2}>
        {visibleParties.map((party) => (
          <PartyItem key={party.id} party={party} />
        ))}
      </Slider>
    </div>
  );
}
