<template>
  <div class="container">
    <h3>Snort</h3>

    <label>Policy number</label>
    <select class="form-control" v-model="policy_number">
      <option v-for="policy in policyList" :key="policy._id">
        {{ policy.policy_name }}
      </option>
    </select>
    <div></div>
    <label>Server number</label>
    <select class="form-control" v-model="server_number">
      <option v-for="server in serverList" :key="server._id">
        {{ server.server_name }}
      </option>
    </select>
    <div>
      <button class="btn btn-warning mt-2" @click="run()">Run</button>
    </div>
    <div v-for="item in logList" :key="item._id">{{ item.cmd }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cmd: "ping -c 1 8.8.8.8",
      server_number: "",
      policy_number: "",
      serverList: [],
      policyList: [],
      logList: ""
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
  },
  methods: {
    async run() {
      console.log("1#");
      await axios.post("http://localhost:8081/api/testList/", {
        cmd: this.cmd,
        server_number: this.server_number,
        policy_number: this.policy_number
      });
      const response = await axios.get("http://localhost:8081/api/testList/");
      this.logList = response.data;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
