// import React, { useState } from 'react';
// import styles from './styles/Map.module.scss';
// import Footer from '../footer/Footer';
// import MapComponent from './MapComponent';
// import { center, places, images } from './constans';

// interface Place {
//   id: number;
//   coordinate: number[];
//   name: string;
//   time?: string;
// }

// export default function Map(): JSX.Element {
//   const [searchValue, setSearchValue] = useState('');
//   const [mapCenter, setMapCenter] = useState(center);
//   const [searchResults, setSearchResults] = useState<Place[]>([]);

//   let debounceTimeout: NodeJS.Timeout | null = null;

//   const handleSearchChange = (value: string) => {
//     setSearchValue(value);

//     if (debounceTimeout) {
//       clearTimeout(debounceTimeout);
//     }

//     debounceTimeout = setTimeout(() => {
//       if (value === '') {
//         setSearchResults([]);
//         setMapCenter(center);
//       } else {
//         const filteredResults = places.filter((place) =>
//           place.name.toLowerCase().startsWith(value.toLowerCase())
//         );

//         if (filteredResults.length > 0) {
//           setMapCenter(filteredResults[0].coordinate);
//           setSearchResults(filteredResults);
//         } else {
//           setMapCenter(center);
//           setSearchResults([]);
//         }
//       }
//     }, 100);
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
//               {searchResults.slice(0, 5).map((result) => (
//                 <div key={result.id}>
//                   <p>{result.name}</p>
//                   <p className={styles.on_map}>{result.time}</p>
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

import React, { useState } from 'react';
import styles from './styles/Map.module.scss';
import Footer from '../footer/Footer';
import MapComponent from './MapComponent';
import { center, places, images } from './constans';

interface Place {
  id: number;
  coordinate: number[];
  name: string;
  time?: string;
  address: string;
}

export default function Map(): JSX.Element {
  const [searchValue, setSearchValue] = useState('');
  const [mapCenter, setMapCenter] = useState(center);
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [zoom, setZoom] = useState(13);

  let debounceTimeout: NodeJS.Timeout | null = null;

  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      if (value === '') {
        setSearchResults([]);
        setMapCenter(center);
        setZoom(13);
      } else {
        const filteredResults = places.filter((place) =>
          place.name.toLowerCase().startsWith(value.toLowerCase())
        );

        if (filteredResults.length > 0) {
          setMapCenter(filteredResults[0].coordinate);
          setSearchResults(filteredResults);
          setZoom(17);
        } else {
          setMapCenter(center);
          setSearchResults([]);
          setZoom(13);
        }
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
                  <p className={styles.title}>{result.name}</p>
                  <p className={styles.time}>{result.time}</p>
                  <p className={styles.on_map}>{result.address}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.map}>
            <MapComponent
              center={mapCenter}
              places={places}
              images={images}
              zoom={zoom}
            />
            <div className={styles.map__overlay}></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
