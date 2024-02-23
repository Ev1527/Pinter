import React from 'react';
// import leftArr from './styles/arr_left.svg';
import "slick-carousel/slick/slick.css"; // добавляю плавный слайдер
import "slick-carousel/slick/slick-theme.css"; // добавляю плавный слайдер


export default function PrevArrow(props: { className: any; style: any; onClick: () => void; }): JSX.Element {
    const { className, style, onClick } = props;

    return (
        <div className={className} onClick={onClick} style={{ ...style, display: "flex" }}>
            {/* <img src={leftArr} alt="Next" /> */}
        </div>
    )
}
