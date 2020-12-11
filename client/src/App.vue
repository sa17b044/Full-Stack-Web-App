<template>
  <div id="app">
    <div class="row">
      <div class="col-12 alert-danger"><img src="" /></div>
    </div>
    <div class="row">
      <div class="col-2 alert-success">
        <ul>
          <li><a href="/#/rules">Rules</a></li>
          <ol>
            <a href="/#/policies">Policies</a>
          </ol>
          <ol>
            <a href="/#/servers">Servers</a>
          </ol>
          <li><a href="/#/logs">Logs</a></li>
          <li><a href="/#/users">Users</a></li>
          <li>
            <a href="/#/tools">Tools</a>
          </li>
          <ol>
            <a href="/#/ping">Ping</a>
          </ol>
          <ol>
            <a href="#">Nmap</a>
          </ol>
        </ul>
      </div>
      <div class="col-10 alert-info"><router-view /></div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
} */
</style>
