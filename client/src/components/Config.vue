<template>
  <div class="card">
    <h2>Config</h2>
    <label>Policy name</label>
    <select class="form-control" v-model="policy_number">
      <option v-for="policy in policyList" :key="policy._id">
        {{ policy.policy_number }}
      </option>
    </select>
    <div></div>
    <label>Server name</label>
    <select class="form-control" v-model="server_number">
      <option v-for="server in serverList" :key="server._id">
        {{ server.server_number }}
      </option>
    </select>
    <div>
      <button class="btn btn-warning mt-2" @click="set()">Set</button>
      <button class="btn btn-info mt-2" @click="run()">Run</button>
    </div>
    <div class="cardIn mt-2">
      <h2>Logs</h2>
    <div id="output" class="m-5">
      <p v-for="(par, index) of pars" :key="index">
        {{ par }}
      </p>
    </div>
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
      policyList: [],
      output: ""
    };
  },
  computed: {
    pars() {
      return this.output.split("\n");
    }
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
    async set() {
      console.log("1#");
      await axios.post("http://localhost:8081/api/configList/", {
        server_number: this.server_number,
        policy_number: this.policy_number
      });
    },
    async run() {
      console.log("2#");
      let sse = new EventSource("http://localhost:8081/api/configList/sse");
      sse.addEventListener("message", output => {
        const data = JSON.parse(output.data);
        console.log(data);
        console.log("COUNT " + data.count);
        console.log(data.allOutput);
        if (data.count % 2 === 0) {
          this.output += data.allOutput + "\n";
        }
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

h2 {
  text-align: center;
}
.card {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
  margin: 1px;
  margin-right: -15%;
}
.cardIn {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
  margin: 1px;
  /* margin-right: -15%; */
}
</style>
