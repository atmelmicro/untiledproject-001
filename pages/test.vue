<template>
    <div>
        <NuxtLink to="/">Home page</NuxtLink>
        <p :id="i">mewhent thw </p>
        <button @click="add">colr</button>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  
  export default Vue.extend({
    name: 'TestVue',
    data () {
      return {
        i: "g"
      }
    },
    mounted () {
      console.log("burh")
    },
    methods: {
      add() {
        this.i == 'bruh' ? this.i = '' : this.i = 'bruh'
      }
    }
  })
  </script>


<style>
  #bruh {color: yellow;}
</style>