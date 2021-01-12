<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <nav class="navbar bg-dark">
          <a class="navbar-brand"><img src="./assets/49536028_10161397481980486_3467575067997634560_o.png" alt=""></a>
          <ul><li><a href="/#/policies">Policies</a></li></ul>
        </nav>
      </div>
      <div class="row">
        <div class="col-2 card">
          <ul>
            <li><a href="/#/policies">Policy & Server</a></li>
            <!-- <ol>
              <a href="/#/policies">Policies</a>
            </ol> -->
            <!-- <ol>
              <a href="/#/servers">Servers</a>
            </ol> -->
            <ol>
              <a href="/#/xml">XML</a>
            </ol>
            <!-- <li>
              <a href="/#/Config">Policy</a>
            </li> -->
                          <ol>
                <a href="/#/Config">Lua</a>
              </ol>
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
              <a href="">Ping</a>
            </ol>
            <ol>
              <a href="">Whois</a>
            </ol>
            <ol>
              <a href="">Nmap</a>
            </ol>
          </ul>
        </div>
        <div class="col-9 p-5"><router-view /></div>
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
  font-size: 20px;
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
img {
  width: 70px;
  height: auto;
}
.card {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 15px;
  padding: 15px;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
  margin-top: 50px;
  margin-left: 5px;
  margin-right:-20px;
}
</style>
