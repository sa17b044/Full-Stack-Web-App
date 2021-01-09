<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <nav class="navbar bg-dark">
          <a class="navbar-brand">PAYMAN</a>
        </nav>
      </div>
      <div class="row">
        <div class="col-2">
          <ul>
            <li><a href="/#/rules">Objects</a></li>
            <ol>
              <a href="/#/policies">Policies</a>
            </ol>
            <ol>
              <a href="/#/servers">Servers</a>
            </ol>
            <ol>
              <a href="/#/xml">XML</a>
            </ol>
            <li>
              <a href="/#/Config">Policy</a>
              <ol>
                <a href="/#/Config">Lua</a>
              </ol>
            </li>
            <li>
              <a href="/#/users">Administrator</a>
            </li>
            <ol>
              <a href="/#/users">Users</a>
            </ol>
            <li>
              <a href="/#/tools">Tools</a>
            </li>
            <ol>
              <a href="/#/ping">Ping</a>
            </ol>
            <ol>
              <a href="">Whois</a>
            </ol>
            <ol>
              <a href="">Nmap</a>
            </ol>
          </ul>
        </div>
        <div class="col-10 p-5"><router-view /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
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
body {
  background: linear-gradient(to right, #00aaff, #00ff6c);
  height: 100%;
  width: 100%;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
} */
.fill {
  height: 100%;
  background-color: skyblue;
  /* width: 100%; */
}
</style>
