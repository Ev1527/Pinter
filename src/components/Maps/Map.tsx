import React, { useEffect, useRef, useState } from 'react';
import {
  YMaps,
  Map,
  Placemark,
  SearchControl,
  TypeSelector,
} from '@pbe/react-yandex-maps';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const API_KEY = 'apikey';

const center = [47.2313, 39.7233];

const images = [...Array(5)].map((n, i) => {
  const letter = String.fromCharCode(i + 97);
  return `https://img.icons8.com/ios-filled/2x/marker-${letter}.png`;
});

const Maps = (props) => {
  const ref = useRef();
  const ref2 = useRef();
  const ymaps = useRef(null);

  const [newCoords, setNewCoords] = useState([
    47.06587193746529, 39.435380396518724,
  ]);
  const [address, setAddress] = useState('');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (value) {
          const res = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${value}`
          );
          const data = await res.json();
          const collection =
            data.response.GeoObjectCollection.featureMember.map(
              (item) => item.GeoObject
            );
          setOptions(collection);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [value]);

  return (
    <YMaps
      query={{
        load: 'package.full',
        apikey: API_KEY,
      }}
    >
      <Autocomplete
        freeSolo
        filterOptions={(x) => x}
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue(newValue);
            const obg = options.find(
              (item) =>
                newValue.includes(item.name) &&
                newValue.includes(item.description)
            );
            const coords = obg.Point.pos
              .split(' ')
              .map((item) => Number(item))
              .reverse();
            setNewCoords(coords);
            setAddress(newValue);
          } else {
            console.log(newValue);
          }
        }}
        onInputChange={(e) => {
          if (e) {
            setValue(e.target.value);
          }
        }}
        options={options.map((item) => `${item.name} ${item.description}`)}
        renderInput={(params) => (
          <TextField {...params} label='Введите адрес' />
        )}
      />
      <Map
        instanceRef={ref2}
        state={{
          center: [47.2313, 39.7233],
          zoom: 9,
          controls: ['zoomControl'],
        }}
        onLoad={(e) => {
          ymaps.current = e;
          const points = [
            [48.024402067130715, 39.85466330972504],
            [46.780699672601415, 39.807971415195674],
          ];
          const bounds = e.util.bounds.fromPoints(points);
          ref2.current.setBounds(bounds, { checkZoomRange: true });

          e.geocode(newCoords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            const newAddress = [
              firstGeoObject.getLocalities().length
                ? firstGeoObject.getLocalities()
                : firstGeoObject.getAdministrativeAreas(),
              firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
              firstGeoObject.getPremiseNumber(),
            ]
              .filter(Boolean)
              .join(', ');

            setAddress(newAddress);
            setValue(newAddress);
          });
        }}
        width='100vw'
        height='100vh'
        modules={['control.ZoomControl']}
        onClick={(event) => {
          const coords = event.get('coords');
          setNewCoords(coords);

          ymaps.current.geocode(coords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            const newAddress = [
              firstGeoObject.getLocalities().length
                ? firstGeoObject.getLocalities()
                : firstGeoObject.getAdministrativeAreas(),
              firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
              firstGeoObject.getPremiseNumber(),
            ]
              .filter(Boolean)
              .join(', ');
            ref.current.getMap().hint.open(coords, newAddress);
            setAddress(newAddress);
            setValue(newAddress);
          });
        }}
      >
        <SearchControl options={{ float: 'right' }} />
        <TypeSelector options={{ float: 'right' }} />
        <Placemark
          instanceRef={ref}
          onDragEnd={(event) => {
            const coords = ref.current.geometry._coordinates;
            setNewCoords(coords);
            ymaps.current.geocode(coords).then((res) => {
              const firstGeoObject = res.geoObjects.get(0);
              const newAddress = [
                firstGeoObject.getLocalities().length
                  ? firstGeoObject.getLocalities()
                  : firstGeoObject.getAdministrativeAreas(),
                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
                firstGeoObject.getPremiseNumber(),
              ]
                .filter(Boolean)
                .join(', ');
              ref.current.getMap().hint.open(coords, newAddress);
              setAddress(newAddress);
              setValue(newAddress);
            });
          }}
          geometry={newCoords}
          options={{
            iconImageSize: [30, 30],
            draggable: true,
            preset: 'islands#greenIcon',
            hideIconOnBalloonOpen: false,
            openEmptyHint: true,
          }}
          properties={{
            iconContent: '+',
            hintContent: address,
          }}
        />
        {images.map((n, i) => {
          return (
            <Placemark
              onClick={() => {
                alert('Вы нажали метку ' + (i + 1));
              }}
              key={n}
              defaultGeometry={center.map((c) => c + (Math.random() - 0.5))}
              options={{
                iconImageSize: [10, 10],
                preset: 'islands#yellowDotIcon',
              }}
            />
          );
        })}
      </Map>
    </YMaps>
  );
};

export default Maps;
