// import React from 'react';
// import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';

// export default function MapComponent({
//   center,
//   places,
//   images,
// }: {
//   center: number[];
//   places: any[];
//   images: string[];
// }): JSX.Element {
//   return (
//     <YMaps query={{ load: 'package.full' }}>
//       <Map
//         state={{
//           center,
//           zoom: 13,
//           controls: [],
//         }}
//         width='760px'
//         height='500px'
//       >
//         {places &&
//           places.length > 0 &&
//           places.map((place, i) => (
//             <Placemark
//               key={place.id}
//               geometry={place.coordinate}
//               options={{
//                 iconLayout: 'default#image',
//                 iconImageSize: [50, 50],
//                 iconImageHref: images[i],
//               }}
//               properties={{
//                 balloonContent: place.name,
//               }}
//             />
//           ))}
//         <ZoomControl />
//       </Map>
//     </YMaps>
//   );
// }
import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';

export default function MapComponent({
  center,
  places,
  images,
  zoom,
}: {
  center: number[];
  places: any[];
  images: string[];
  zoom: number;
}): JSX.Element {
  const [zoomState, setZoomState] = useState(zoom);

  useEffect(() => {
    setZoomState(zoom);
  }, [zoom]);

  return (
    <YMaps query={{ load: 'package.full' }}>
      <Map
        state={{
          center,
          zoom: zoomState,
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
                balloonContent: `${place.name}<br>${place.address}`,
              }}
            />
          ))}
        <ZoomControl />
      </Map>
    </YMaps>
  );
}
