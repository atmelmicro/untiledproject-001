<template>
  <div id="map" />
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  onMounted
} from "vue";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default {
  setup() {
    onMounted(() => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibWlrZWhhbWlsdG9uMDAiLCJhIjoiNDVjS2puUSJ9.aLvWM5BnllUGJ0e6nwMSEg";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [15.77659, 50.03075],
        zoom: 13,
      });
      map.on('load', () => {
        // TODO: Here we want to load a layer
        // TODO: Here we want to load/setup the popup
        map.addSource('earthquakes', {
          'type': 'geojson',
          'data': {
            "type": "FeatureCollection",
            "features": [{
              "geometry": {
                "type": "Point",
                "coordinates": [
                  15.77659, 50.03075
                ]
              },
              "type": "Feature",
              "properties": {
                "description": "Southern Ave",
              }
            }, ]
          }
        });


        map.addLayer({
            'id': 'earthquakes-heat',
            'type': 'heatmap',
            'source': 'earthquakes',
            'maxzoom': 19,
            'paint': {
              // Increase the heatmap weight based on frequency and property magnitude
              'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'mag'],
                0,
                0,
                6,
                1
              ],
              // Increase the heatmap color weight weight by zoom level
              // heatmap-intensity is a multiplier on top of heatmap-weight
              'heatmap-intensity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                1,
                9,
                3
              ],
              // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
              // Begin color ramp at 0-stop with a 0-transparancy color
              // to create a blur-like effect.
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(33,102,172,0)',
                0.2,
                'rgb(103,169,207)',
                0.4,
                'rgb(209,229,240)',
                0.6,
                'rgb(253,219,199)',
                0.8,
                'rgb(239,138,98)',
                1,
                'rgb(178,24,43)'
              ],
              // Adjust the heatmap radius by zoom level
              'heatmap-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0,
                2,
                13,
                20
              ],
              // Transition from heatmap to circle layer by zoom level
              'heatmap-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                1,
                16,
                0
              ]
            }
          },
          'waterway-label'
        );

        map.addLayer({
            'id': 'earthquakes-point',
            'type': 'circle',
            'source': 'earthquakes',
            'minzoom': 15,
            'paint': {
              // Size circle radius by earthquake magnitude and zoom level
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                11,
                ['interpolate', ['linear'],
                  ['get', 'mag'], 1, 1, 6, 4
                ],
                16,
                ['interpolate', ['linear'],
                  ['get', 'mag'], 1, 5, 6, 50
                ]
              ],
              // Color circle by earthquake magnitude
              'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'mag'],
                1,
                'rgba(33,102,172,0)',
                2,
                'rgb(103,169,207)',
                3,
                'rgb(209,229,240)',
                4,
                'rgb(253,219,199)',
                5,
                'rgb(239,138,98)',
                6,
                'rgb(178,24,43)'
              ],
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1,
              // Transition from heatmap to circle layer by zoom level
              'circle-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                16,
                1
              ]
            }
          },
          'waterway-label'
        );



      });
      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
        })
      );


    });
    return {};
  },
  head: {
    bodyAttrs: {
      class: "m"
    }
  }
};
</script>

<style>
#map {
  height: 100vh;
}
.m {
  margin: 0 0 0 0;
}
</style>