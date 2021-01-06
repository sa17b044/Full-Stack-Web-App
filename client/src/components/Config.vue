<template>
  <div class="container">
    <h3>Config</h3>
    <label>Policy number</label>
    <select class="form-control" v-model="policy_number">
      <option v-for="policy in policyList" :key="policy._id">
        {{ policy.policy_number }}
      </option>
    </select>
    <div></div>
    <label>Server number</label>
    <select class="form-control" v-model="server_number">
      <option v-for="server in serverList" :key="server._id">
        {{ server.server_number }}
      </option>
    </select>
    <div>
      <button class="btn btn-warning mt-2" @click="run()">Run</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      server_number: "",
      policy_number: "",
      serverList: [],
      policyList: []
    };
  },
  async mounted() {
    const responsePolicy = await axios.get(
      "http://localhost:8081/api/policyList/"
    );
    this.policyList = responsePolicy.data;
    const responseServer = await axios.get(
      "http://localhost:8081/api/serverList/"
    );
    this.serverList = responseServer.data;
  }
  ,
  methods: {
    async run() {
      await axios.post("http://localhost:8081/api/configList/", {
        server_number: this.server_number,
        policy_number: this.policy_number
      });

    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input[type="number"] {
  width: 10%;
}
input[type="text"] {
  width: 50%;
}
input[type="file"] {
  width: 27%;
}
select {
  width: 50%;
}
input[type="number"]:focus {
  background-color: rgb(224, 247, 255);
}
input,
select,
button {
  border: 2px solid black;
}

</style>
