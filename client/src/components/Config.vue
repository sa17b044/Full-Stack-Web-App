<template>
  <div class="card">
    <h2>Logs</h2>
    <button class="btn btn-dark" @click="run()">Run</button>
    <div id="output" class="m-5">
      <div class="cardIn">
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
      output: "",
      sIP: "",
      dIP: "",
      sPort: "",
      dPort: "",
      log: ""
    };
  },
  methods: {
  async run(){
    const response = await axios.post("http://localhost:8081/api/configList/");
    }
  },
  computed: {
    pars() {
      return this.output.split("\n");
    }
  },
  async mounted() {
    let sse = new EventSource("http://localhost:8081/api/configList/sse");
    sse.addEventListener("message", output => {
      const data = JSON.parse(output.data);
      // console.log(data);
      // console.log("COUNT " + data.count);
      // console.log(data.allOutput);
      if (data.count % 2 === 0) {
        this.output += data.allOutput + "\n";
        // console.log(this.output)
        const r = /ipv4\(.*\):\s+(.*)\s\->\s+(.*)/gm;
        const m = r.exec(this.output);
        // console.log(m);
        this.sIP = m[1];
        this.dIP = m[2];
        console.log(ipIN, ipOUT);
      }
    });
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
