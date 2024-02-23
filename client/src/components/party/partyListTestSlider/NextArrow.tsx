import React from 'react';
// import rightArr from './styles/arr_right.svg';
import "slick-carousel/slick/slick.css"; // добавляю плавный слайдер
import "slick-carousel/slick/slick-theme.css"; // добавляю плавный слайдер


export default function NextArrow(props: { className: any; style: any; onClick: () => void; }): JSX.Element {
    const { className, style, onClick } = props;

    return (
        <div className={className} onClick={onClick} style={{ ...style, display: "flex" }}>
            {/* <img src={rightArr} alt="Next" /> */}
        </div>
    )
}
