<template>
  <div id="app">
    <div>
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark container-fluid">
        <a class="navbar-brand" href="/#/">PAYMAN</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <!-- <a class="nav-item nav-link" href="#">Home</a> -->
            <a class="nav-item nav-link" href="/#/inspection">Inspection</a>
            <a class="nav-item nav-link" href="/#/log">Log</a>
            <a class="nav-item nav-link" href="/#/upload">Upload</a>
            <a class="nav-item nav-link" href="/#/users">Users</a>
            <a class="nav-item nav-link disabled" href="/#/users">Whois</a>
            <!-- <a class="nav-item nav-link disabled" href="/#/users">Filter</a> -->
          </div>
        </div>
      </nav>
      <div class="row">
      </div>
      <div class="row">
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

body {
  background: linear-gradient(to right, #00aaff, #00ff6c);
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
img {
  width: 70px;
  height: auto;
}
.text-nav{
  color: #00ff6c
}
</style>
