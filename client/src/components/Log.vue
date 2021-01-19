<template>
  <div class="card mt-3">
    <h2>Inspection</h2>
    <div class="row">
      <div class="col"></div>
      <div class="cardA col">
        <h2>Passiv</h2>
        <p>
          You can upload a pcap file and receive a log
        </p>
        <a href="/#/offline"><button class="btn btn-primary">Go</button></a>
      </div>
      <div class="cardA col">
        <h2>Active</h2>
        <p>
          You can run the server on NIC and receive logs
        </p>
        <a href="/#/online"><button class="btn btn-primary">Go</button></a>
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
  background: aliceblue;
  height: 250px;
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
  margin-top: 25%;
  width: 100px;
}
</style>
