<template>
  <div class="card mt-3">
    <h2>Inspection</h2>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <a href="/#/server">Servers</a>
      </div>
      <div class="col">
        <a href="/#/policy">
          Policies
        </a>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
  margin: 1px;
  margin-right: -35%;
}
a {
  background-color: rgba(0, 0, 0, 0.35);
  height: 250px;
  display: flex;
  font-size: 50px;
  padding: 70px;
  padding-left: 110px;
  flex-direction: column;
  border: 3px black solid;
  border-radius: 15px;
}
a:hover {
  color: aliceblue;
  border: 3px aliceblue solid;
  background-color: rgba(0, 0, 0);
}
.col {
  font-weight: bold;
}
h2 {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: aliceblue;
  border-radius: 15px;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: -5px;
}
.btn {
  border-radius: 10px;
  border: black 2px solid;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 100px;
}
</style>
