<template>
    <div id="main">
        <NuxtLink to="/">Home page</NuxtLink>
        <GMap
  ref="gMap"
  language="en"
  :cluster="{options: {styles: clusterStyle}}"
  :center="{lat: locations[0].lat, lng: locations[0].lng}"
  :options="{fullscreenControl: false, styles: mapStyle}"
  :zoom="6"
>
  <GMapMarker
    v-for="location in locations"
    :key="location.lat"
    :position="{lat: location.lat, lng: location.lng}"
    :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}"
    @click="currentLocation = location"
  >
    <GMapInfoWindow :options="{maxWidth: 200}">
      <code>
        lat: {{ location.lat }},
        lng: {{ location.lng }}
      </code>
    </GMapInfoWindow>
  </GMapMarker>
</GMap>
 
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  
  export default Vue.extend({
    name: 'TestVue',
    data() {
  return {
    currentLocation: {},
    locations: [
      {
        lat: 44.933076,
        lng: 15.629058
      },
      {
        lat: 45.815,
        lng: "15.9819"
      },
      {
        lat: "45.12",
        lng: "16.21"
      }
    ],
    pins: {
      selected: "data:image/png;base64,iVBORw0KGgo...",
      notSelected: "data:image/png;base64,iVBORw0KGgo..."
    },
    mapStyle: [
    {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#ffffff",
            },
          ]
      }
    ],
    clusterStyle: [
      {
        url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
        width: 56,
        height: 56,
        textColor: "#fff"
      }
    ]
  }
}})
  
  </script>


<style>
    #main {
        height: 100vh;
        width: 100%;
    } 
</style>