<template>
  <div class="logs container">
    <button class="btn btn-primary m-3" @click="sendLog()">Run</button>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">
          Policy Name</span
        >
      </div>
      <input
        type="text"
        v-model="policy"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">
          Server Name</span
        >
      </div>
      <input
        type="text"
        v-model="server_name"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
    <div v-for="(item, i) in logList" :key="item._id">
      <div class="alert-info">{{ i + 1 }}</div>
      <div class="alert-success">{{ item.log }}</div>
      <div class="alert-danger">
        <button class="btn btn-danger" @click="removeItem(item, i)">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cmd: "ping -c 2 8.8.8.8",
      server_name: "",
      policy: "",
      log: "",
      date: "",
      logList: [],
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/logList/");
    // const reg = /^((?!2\s+(.*?)\s+1001ms).)*$/;
    this.logList = response.data;
    
  },
  methods: {
    async sendLog() {
      console.log(this.cmd);
      await axios.post("http://localhost:8081/api/logList/", {
        cmd: this.cmd,
      });
      const response = await axios.get("http://localhost:8081/api/logList/");
      this.logList = response.data;
    },
    async removeItem(item, i) {
      await axios.delete("http://localhost:8081/api/logList/" + item._id);
      this.logList.splice(i, 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
