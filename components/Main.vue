<!-- Please remove this file from your project -->
<template>
  <div id="main">
    <Map></Map>
      <Sidebar/>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
export default {
    name: "Main",
    data() {
        return {
            count: 0
        };
    },
    components: { Sidebar }
}
</script>

<style>
  #main {
    width: 100%;
    height: 100vh;
    display: flex;
  }

  .m {
    margin: 0 0 0 0;
  }
</style>