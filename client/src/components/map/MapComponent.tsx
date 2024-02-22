import React from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';

export default function MapComponent({
  center,
  places,
  images,
}: {
  center: number[];
  places: any[];
  images: string[];
}): JSX.Element {
  return (
    <YMaps query={{ load: 'package.full' }}>
      <Map
        state={{
          center,
          zoom: 13,
          controls: [],
        }}
        width='760px'
        height='500px'
      >
        {places &&
          places.length > 0 &&
          places.map((place, i) => (
            <Placemark
              key={place.id}
              geometry={place.coordinate}
              options={{
                iconLayout: 'default#image',
                iconImageSize: [50, 50],
                iconImageHref: images[i],
              }}
              properties={{
                balloonContent: place.name,
              }}
            />
          ))}
        <ZoomControl />
      </Map>
    </YMaps>
  );
}
