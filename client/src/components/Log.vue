<template>
  <div class="card mt-3">
    <h2>Logs</h2>
    <button class="btn btn-dark" @click="run()">Run</button>
    <div id="output" class="m-5">
      <!-- <p v-for="(par, index) of pars" :key="index">
          {{ par }}
        </p> -->
      <div class="cardIn">
        <div class="alert-danger alert">Source IP : {{ sIP }}</div>
        <div class="alert-light alert">Destination IP : {{ dIP }}</div>
        <div class="alert-success alert" >{{ output }}</div>
        </div>
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
    async run() {
      const response = await axios.post(
        "http://localhost:8081/api/configList/"
      );
    }
  },
  // computed: {
  //   pars() {
  //     return this.output.split("\n");
  //   }
  // },
  async mounted() {
    let sse = new EventSource("http://localhost:8081/api/configList/sse");
    sse.addEventListener("message", output => {
      const data = JSON.parse(output.data);
      // const data = output.data;
      console.log(data);
      if (data.count % 2 === 0) {
        this.output = data.allOutput + "\n";
        const r = /ipv4\(.*\):\s+(.*)\s\->\s+(.*)/gm;
        const m = r.exec(this.output);
        this.sIP = m[1];
        this.dIP = m[2];
        const reg = /\[\*\*\](.*)/gm;
        this.output = this.output.match(reg).toString();
      }
    });
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* input {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}*/
input[type="number"] {
  width: 40%;
}
input[type="text"] {
  width: 50%;
}
/* input[type="file"] {
  width: 27%;
} */
/* select {
  width: 50%;
} */
/* input[type="number"]:focus {
  background-color: rgb(224, 247, 255);
} */
input,
select,
button {
  border: 2px solid black;
}
.btn {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.card {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
  margin: 1px;
  margin-right: -35%;
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
.col-3 {
  font-weight: bold;
}
h2 {
  text-align: center;
}
label {
  margin-bottom: 2px;
  font-weight: bold;
}
img {
  width: 17px;
  height: auto;
}
.alert{
  font-weight: bold;
  border: solid 2px;
  border-radius: 10px;
  margin: -5px;
  padding: 15px;
}
</style>
