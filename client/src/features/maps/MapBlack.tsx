import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './style.css';

const center = [55.76, 37.64];

const images = [...Array(26)].map((n, i) => {
  const letter = String.fromCharCode(i + 97);
  return `https://img.icons8.com/ios-filled/2x/marker-${letter}.png`;
});

export const Maps = (props) => (
  <YMaps query={{ load: 'package.full' }}>
    <Map
      state={{
        center,
        zoom: 9,
        controls: [],
      }}
      width='100vw'
      height='100vh'
    >
      {images.map((n) => (
        <Placemark
          key={n}
          geometry={center.map((c) => c + (Math.random() - 0.5))}
          options={{
            iconLayout: 'default#image',
            iconImageSize: [50, 50],
            iconImageHref: n,
          }}
        />
      ))}
    </Map>
  </YMaps>
);

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);
