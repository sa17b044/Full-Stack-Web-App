<template>
  <div class="card mt-3">
    <h2>Inspection</h2>
    <div class="row">
      <div class="col"></div>
      <div class="cardA col">
        <h2>Servers</h2>
        <p>
          Server configuration for inspection part in lua file <br />
          You can set source, destination, and port address for a policy and
          also see servers List
        </p>
        <a href="/#/server"><button class="btn btn-primary">Go</button></a>
      </div>
      <div class="cardA col">
        <h2>Policies</h2>
        <p>
          Policy configuration for inspection part in lua file <br />
          You can set services, app Services, group address level and -file for a server and
          also see policies List
        </p>
        <a href="/#/policy"><button class="btn btn-primary">Go</button></a>
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
.cardA {
  background-color: rgba(0, 0, 0, 0.35);
  /* height: 250px; */
  display: flex;
  padding: 20px;
  flex-direction: column;
  border: 3px black solid;
  border-radius: 15px;
  margin-left: 5px;
  margin-right: 5px;
}
.col-4 {
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
img {
  width: 50px;
  height: auto;
}
</style>
