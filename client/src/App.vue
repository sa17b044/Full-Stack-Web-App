<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <a href="/#/">Login</a> -->
    <a href="/#/rules">Rules</a>
    <a href="/#/logs">Logs</a>
    <a href="/#/users">Users</a>
    <a href="/#/tools">Tools</a>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
