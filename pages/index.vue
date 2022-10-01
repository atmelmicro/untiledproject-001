<template>
  <Main />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
  body {
    margin: 0 0 0 0;
    background-color: black;
    color: white;
    font-family: 'Montserrat', sans-serif;
  }
  input, input:active, input:focus {
    outline: none;
    -webkit-tap-highlight-color: none;
  }
</style>
