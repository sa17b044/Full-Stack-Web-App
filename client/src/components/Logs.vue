<template>
  <div class="container">
    <h3>Sniffer</h3>

    <label>Policy Name</label>
    <select class="form-control" v-model="policy_name">
      <option v-for="policy in policyList" :key="policy._id">
        {{ policy.policy_name }}
      </option>
    </select>
    <div>
    </div>
    <label>Server Name</label>
    <select class="form-control" v-model="server_name">
      <option v-for="server in serverList" :key="server._id">
        {{ server.server_name }}
      </option>
    </select>
    <div>
      <button class="btn btn-warning mt-2" @click="run()">Run</button>
    </div>
    <div v-for="item in logList" :key="item._id">{{item.cmd}}</div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cmd: "ping -c 1 8.8.8.8",
      server_name: "",
      policy_name: "",
      serverList: [],
      policyList: [],
      logList: "",
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
      console.log('1#')
      await axios.post("http://localhost:8081/api/testList/", {
        cmd: this.cmd,
        server_name: this.server_name,
        policy_name: this.policy_name,
      });
      const response = await axios.get("http://localhost:8081/api/testList/");
      this.logList = response.data;
    },
  },
  // 2\s+packets\s+transmitted,\s+2\s+received,\s+0%\s+packet\s+loss,\s+time\s+1001ms
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
