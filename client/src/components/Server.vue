<template>
  <div class="container card">
    <h4>Add Server</h4>

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
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">
          Source IP</span
        >
      </div>
      <input
        type="text"
        v-model="src_ip"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">
          Source Port</span
        >
      </div>
      <input
        type="number"
        v-model="src_port"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">
          Destination IP</span
        >
      </div>
      <input
        type="text"
        v-model="dst_ip"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">
          Destination Port</span
        >
      </div>
      <input
        type="number"
        v-model="dst_port"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">
          Policy</span
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
          Log KNXnetIP</span
        >
        <div class="input-group-text">
          <input
            type="checkbox"
            aria-label="Checkbox for following text input"
            v-model="logKNXnetip"
          />
        </div>
      </div>
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">
          Log to file</span
        >
        <div class="input-group-text">
          <input
            type="checkbox"
            aria-label="Checkbox for following text input"
            v-model="logToFile"
          />
        </div>
      </div>
    </div>
    <button class="btn btn-primary" @click="addServer()">Save</button>
    <a href="/#/servers">Servers</a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      server_name: "",
      src_ip: "",
      src_port: "",
      dst_ip: "",
      dst_port: "",
      policy: "",
      logKNXnetip: false,
      logToFile: false,
    };
  },
  methods: {
    async addServer() {
      const response = await axios.post(
        "http://localhost:8081/api/serverList/",
        {
          server_name: this.server_name,
          src_ip: this.src_ip,
          src_port: this.src_port,
          dst_ip: this.dst_ip,
          dst_port: this.dst_port,
          policy: this.policy,
          logKNXnetip: this.logKNXnetip,
          logToFile: this.logToFile,
        }
      );
      // this.userList.push(response.data);
      this.server_name = '';
      this.src_ip = "";
      this.src_port = "";
      this.dst_ip = "";
      this.dst_port = "";
      this.policy = "";
      this.logKNXnetip = "";
      this.logToFile = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  /* background-color: lightskyblue; */
  padding: 30px;
  border-radius: 20px;
}
input {
  border-bottom: 1px solid black;
}
</style>
