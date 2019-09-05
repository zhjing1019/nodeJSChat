<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'App',
});
</script>

<style>
  html,
  body,
  #app {
    height: 100%;
    overflow: hidden;
    position: relative;
    padding: 0;
  }
</style>
