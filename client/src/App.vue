<template>
  <div id="app">
    <div class="row">
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand">Navbar</a>
          <div class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-primary">Search</button>
          </div>
        </div>
      </nav>
    </div>
    <div class="row">
      <div class="col-3 alert-warning p-5">
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
      <div class="col-9 alert-info p-5"><router-view /></div>
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
