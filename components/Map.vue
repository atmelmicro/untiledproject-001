<template>
    <div id="map" class="dark"/>
</template>

<script>
import mapboxgl from "mapbox-gl";
  import gql from 'graphql-tag'
import "mapbox-gl/dist/mapbox-gl.css";
//import { useCounterStore } from '../stores/mapdata'
import {
  onMounted
} from "vue";

import { mapMutations } from 'vuex'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
let map;
let marker;
import { state, coords, timeStore } from "../store/index"
let reslv
let aaa
const promise = new Promise((resolve, reject) => {reslv = resolve})
let firstDraw = true
function drawLayers() {
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
                12, 6,
                14, 15
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
        //console.log(baseZoom, baseWidth)
        map.addLayer({
            'id': 'earthquakes-point',
            'type': 'circle',
            'source': 'earthquakes',
            'minzoom': 15,
            'paint': {
              // Size circle radius by earthquake magnitude and zoom level
              'circle-radius': [
                'interpolate', 
                ['exponential', 2], 
                ['zoom'],
                10, ["*", 10, ["^", 2, -6]], 
                24, ["*", 24, ["^", 2, 8]]
              ],
              // Color circle by earthquake magnitude
              'circle-color': "rgba(205, 4, 4, 0.37)",
              'circle-stroke-color': 'rgba(119, 0, 0, 0.73)',
              //"circle-blur": 10,
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

}
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
export default {
    name: "Map",
  setup() {
    onMounted(() => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibWlrZWhhbWlsdG9uMDAiLCJhIjoiNDVjS2puUSJ9.aLvWM5BnllUGJ0e6nwMSEg";
      map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v10",
        center: [15.77659, 50.03075],
        zoom: 13,
      });
      map.on('load', async () => {
        let r = await promise
        aaa = map.addSource('earthquakes', {
          'type': 'geojson',
          'data': {
            "type": "FeatureCollection",
            "features": r
            }
          });
          console.log(r)
          drawLayers()
      });

      map.on("click", "earthquakes-point", (e) => {
        let props = JSON.parse(e.features[0].properties.events)
        console.log(props.startTime * 1000)
        new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML(`<h3>${props.type.toUpperCase()}</h3><h2>${

            new Date(props.startTime * 1000).toLocaleDateString("cs-CZ", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

          }</h2>`)
          .addTo(map);
      })
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        bbox: [15.74339523320742, 50.01445573223078, 15.832487162023604, 50.05970182805093],
        proximity: {
          longitude: 50.03075,
          latitude: 15.77659
        },
        language: "cs"
      })

      map.addControl(
        geocoder, "top-left"
      );
      
      geocoder.on("result", (e) => {
        let finalarr = []
        state.resultOfSub = {}
        let coords = e.result.geometry.coordinates
        state.result = e.result
        let promisesArr = []
        let cats = ["resta", "bar", "divadlo", "hotel"]
        for (const i of cats) {
          promisesArr.push(fetch(`https://api.mapbox.com/search/v1/suggest/${i}?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrNnJ6bDdzdzA5cnAza3F4aTVwcWxqdWEifQ.RFF7CVFKrUsZVrJsFzhRvQ&session_token=1e5917d8-a616-468e-982d-b93879edd719&language=cs&limit=10&types=country%2Cregion%2Cdistrict%2Cpostcode%2Clocality%2Cplace%2Cneighborhood%2Caddress%2Cpoi%2Cstreet%2Ccategory&proximity=${coords[0]}%2C${coords[1]}&bbox=${(coords[0] - 0.002).toFixed(10)},${(coords[1] - 0.002).toFixed(10)},${(coords[0] + 0.002).toFixed(10)},${(coords[1] + 0.002).toFixed(10) }`))
        }
        Promise.all(promisesArr).then( async (e) => {
          for (const o of e) {
            let json = await o.json()
            finalarr = finalarr.concat(json.suggestions)
          }
          state.arr = finalarr
        })
      })

    });
    return {};
  },
  data () {
    return {
      coords,
      timeStore,
      data: {},
      thing: []
    }
  },
  apollo: {
      // Simple query that will update the 'hello' vue property
        thing: {
            query () {
              if(timeStore.history) {
                return gql`

query ghd($timeStart: Int!, $timeEnd: Int!, $filter: Boolean!) {
  GetHistoricalDataByTime(timeStart: $timeStart, timeEnd: $timeEnd, filer: $filter){
    type
    geometry{
      type,
      coordinates,
    },
    properties{
      events{
        type,
        startTime
      }
    }
  }
}
`
              }
                return gql`

                query ghd($timeStart: Int!, $timeEnd: Int!, $filter: Boolean!) {
  GetHourlyData(timeStart: $timeStart, timeEnd: $timeEnd, filer: $filter) {
    type
    geometry {
      type
      coordinates
    }
    properties {
      events {
        Id
        type
        startTime
      }
    }
  }
}
      `
            }, update: async data => {
              let d 
              if(timeStore.history) {
                d = data.GetHistoricalDataByTime
              } else { d = data.GetHourlyData }
              console.log(d)
              if(firstDraw) {
                reslv(d)
                //console.log(d)
                firstDraw = false
                return
              }
              map.removeLayer("earthquakes-heat")
              map.removeLayer("earthquakes-point")
              map.removeSource("earthquakes")
              
              map.addSource('earthquakes', {
          'type': 'geojson',
          'data': {
            "type": "FeatureCollection",
            "features": d
            }
          });
          drawLayers()

            }, variables () {
              if(!timeStore.history) {
                return {
                  timeStart: timeStore.od,
                  timeEnd: timeStore.do,
                  filter: timeStore.filter
                }
              } else {
                console.log(
                  Math.floor(timeStore.odDate.addHours(timeStore.do).getTime() / 1000),
                  Math.floor(timeStore.doDate.addHours(timeStore.od).getTime() / 1000))
                return {
                  timeStart: Math.floor(timeStore.doDate.addHours(timeStore.od).getTime() / 1000),
                  timeEnd:  Math.floor(timeStore.odDate.addHours(timeStore.do).getTime() / 1000),
                  filter: timeStore.filter
                }
              }
            }
        }
    },
  watch: {
    coords: {
      handler(newValue, oldValue) {
        if(newValue.coord.length == 0) {
          marker.remove()
          marker = undefined

          map.flyTo({
              center: state.result.geometry.coordinates,
              essential: true,
              duration: 400 
            })

          return
        } else if (!marker) {
          marker = new mapboxgl.Marker()
            .setLngLat(newValue.coord)
            .addTo(map);
        } else {
          marker.setLngLat(newValue.coord)
          marker.remove()
        }
        map.flyTo({
              center: newValue.coord,
              essential: true,
              duration: 400 
            })
      },
      deep: true
    }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
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
  width: 100%;
}

.mapboxgl-popup-content {
  height: 10rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
}

.mapboxgl-ctrl-geocoder {
    filter: invert(1);
}
.mapboxgl-ctrl-geocoder--input {
    outline: 0;
}
.mapboxgl-marker svg path {
    fill: aliceblue;
}
.mapboxgl-marker svg circle {
    fill: black
    ;
} 

::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: var(--bg-color1);
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #2c2c2b;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2c2c2b;
}
  :root {
    --bg-color1: #060606; /* 78% blur 5.5px */
  }
  

  .mapboxgl-popup-content{
    background-color: var(--bg-color1);
  }
  .mapboxgl-popup-tip {
    filter: invert(1);
  }
  .mapboxgl-popup-close-button {
    filter: invert(1);
   }
  .piss {
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: x-large;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>