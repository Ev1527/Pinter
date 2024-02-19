import React, { useState } from 'react';
import styles from './styles/Map.module.scss';
// import map from './styles/map_img.png';
import { debounce } from 'lodash';
import Footer from '../footer/Footer';
import MapComponent from './MapComponent';

const center = [55.75393, 37.621558];

const places = [
  {
    id: 1,
    coordinate: [55.743611, 37.653889],
    name: 'Московский театр на Таганке',
  },
  { id: 2, coordinate: [55.764105, 37.656164], name: 'Довлатов' },
  { id: 3, coordinate: [55.758471, 37.659687], name: 'Torro Grill' },
  { id: 4, coordinate: [55.778244, 37.587355], name: 'Torro Grill' },
  { id: 5, coordinate: [55.760532, 37.619825], name: 'Большой театр' },
  { id: 6, coordinate: [55.813798, 37.633858], name: 'Суши мастер' },
  { id: 7, coordinate: [55.741643, 37.652854], name: 'Стимпанк бар' },
];

const images = [...Array(26)].map((_, i) => {
  const letter = String.fromCharCode(i + 97);
  return `https://img.icons8.com/ios-filled/2x/marker-${letter}.png`;
});

// export default function Map(): JSX.Element {
//   const [searchValue, setSearchValue] = useState('');
//   const [mapCenter, setMapCenter] = useState(center);

//   const handleSearchChange = (value: string) => {
//     setSearchValue(value);

//     // Реализуйте логику поиска и установки нового центра карты на основе значения поиска
//     // Например, можно фильтровать places и устанавливать центр на первый результат
//     // Это простой пример, вы можете настроить логику поиска под свои требования
//     const searchResults = places.filter((place) =>
//       place.name.toLowerCase().includes(value.toLowerCase())
//     );

//     if (searchResults.length > 0) {
//       setMapCenter(searchResults[0].coordinate);
//     }
//   };

//   return (
//     <>
//       <div className={styles.map__container}>
//         <h1>Найти место</h1>

//         <div className={styles.content}>
//           <div className={styles.search}>
//             <input
//               type='text'
//               placeholder='Введите адрес'
//               value={searchValue}
//               onChange={(e) => handleSearchChange(e.target.value)}
//             />
//             <p>Результаты поиска</p>
//             <div className={styles.search__results}>
//               <div>
//                 <p>Адрес бара номер один</p>
//                 <p className={styles.on_map}>Показать на карте</p>
//               </div>
//               <div>
//                 <p>Адрес бара номер два</p>
//                 <p className={styles.on_map}>Показать на карте</p>
//               </div>
//               <div>
//                 <p>Адрес бара номер три</p>
//                 <p className={styles.on_map}>Показать на карте</p>
//               </div>
//             </div>
//           </div>

//           <div className={styles.map}>
//             <MapComponent center={mapCenter} places={places} />
//             <div className={styles.map__overlay}></div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

//

interface Place {
  id: number;
  coordinate: number[];
  name: string;
}

// export default function Map(): JSX.Element {
//   const [searchValue, setSearchValue] = useState('');
//   const [mapCenter, setMapCenter] = useState(center);
//   const [searchResults, setSearchResults] = useState<Place[]>([]);

//   let debounceTimeout: NodeJS.Timeout | null = null;

//   const handleSearchChange = debounce((value: string) => {
//     setSearchValue(value);

//     if (debounceTimeout) {
//       clearTimeout(debounceTimeout);
//     }

//     debounceTimeout = setTimeout(() => {
//       // Реализуйте логику поиска и установки нового центра карты на основе значения поиска
//       const filteredResults = places.filter((place) =>
//         place.name.toLowerCase().includes(value.toLowerCase())
//       );

//       setSearchResults(filteredResults);

//       if (filteredResults.length > 0) {
//         setMapCenter(filteredResults[0].coordinate);
//       } else {
//         // Если результаты пусты, вернуть карту в центр
//         setMapCenter(center);
//       }
//     }, 300);
//   }, 300);

//   return (
//     <>
//       <div className={styles.map__container}>
//         <h1>Найти место</h1>

//         <div className={styles.content}>
//           <div className={styles.search}>
//             <input
//               type='text'
//               placeholder='Введите адрес'
//               value={searchValue}
//               onChange={(e) => handleSearchChange(e.target.value)}
//             />
//             <p>Результаты поиска</p>
//             <div className={styles.search__results}>
//               {searchResults.slice(0, 5).map((result) => (
//                 <div key={result.id}>
//                   <p>{result.name}</p>
//                   <p className={styles.on_map}>Показать на карте</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className={styles.map}>
//             <MapComponent center={mapCenter} places={places} images={images} />
//             <div className={styles.map__overlay}></div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

export default function Map(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const [mapCenter, setMapCenter] = useState(center);
  const [searchResults, setSearchResults] = useState<Place[]>([]);

  let debounceTimeout: NodeJS.Timeout | null = null;

  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      const filteredResults = places.filter((place) =>
        place.name.toLowerCase().includes(value.toLowerCase())
      );

      if (filteredResults.length > 0) {
        setMapCenter(filteredResults[0].coordinate);
        setSearchResults(filteredResults);
      } else {
        setMapCenter(center);
        setSearchResults([]);
      }
    }, 100);
  };

  return (
    <>
      <div className={styles.map__container}>
        <h1>Найти место</h1>

        <div className={styles.content}>
          <div className={styles.search}>
            <input
              type='text'
              placeholder='Введите адрес'
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <p>Результаты поиска</p>
            <div className={styles.search__results}>
              {searchResults.slice(0, 5).map((result) => (
                <div key={result.id}>
                  <p>{result.name}</p>
                  <p className={styles.on_map}>Показать на карте</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.map}>
            <MapComponent
              center={mapCenter}
              places={searchResults}
              images={images}
            />
            <div className={styles.map__overlay}></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
