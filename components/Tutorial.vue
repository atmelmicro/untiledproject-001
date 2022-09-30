<!-- Please remove this file from your project -->
<template>
  <div>
    <button @click="count++">add</button>
    <p>{{count}}</p>
    <NuxtLink to="/test">teyt page</NuxtLink>
    <NuxtLink to="/map">map page</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'NuxtTutorial',
  data() {
    return {
      count: 0
    }
  }
}
</script>
