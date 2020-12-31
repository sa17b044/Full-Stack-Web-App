<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <nav class="navbar bg-danger">
          <a class="navbar-brand">Navbar</a>
        </nav>
      </div>
      <div class="row high">
        <div class="col-2 mt-5">
          <ul>
            <li><a href="/#/rules">Rules</a></li>
            <ol>
              <a href="/#/policies">Policies</a>
            </ol>
            <ol>
              <a href="/#/servers">Servers</a>
            </ol>
                        <!-- <ol>
              <a href="/#/xml">XML</a>
            </ol> -->
            <li><a href="/#/logs">Logs</a></li>
            <li><a href="/#/users">Users</a></li>
            <li>
              <a href="/#/tools">Tools</a>
            </li>
            <ol>
              <a href="/#/ping">Ping</a>
            </ol>
            <!-- <ol>
              <a href="/#/nmap">Nmap</a>
            </ol> -->
          </ul>
        </div>
        <div class="col-10 p-5"><router-view /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
a {
  color: black;
  text-decoration: none;
  display: inline-block;
}
a:hover,
a:active {
  color: gray;
}
li {
  list-style-type: none;
}
.high {
  height: 80vh;
  /* border-radius: 50px; */
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
} */
</style>
