<template>
  <div class="card mt-3">
    <h2>Logs Online</h2>
    <div class="row">
      <div class="col">
        <div class="cardIn">
          <h5>Snort.lua</h5>
          <p>Create snort.lua and Show log</p>
          <button class="btn btn-dark" @click="run()">Run</button>
        </div>
      </div>
    </div>
    <!-- {{log}} -->
    <div id="output" class="m-5">
      <!-- <p v-for="(par, index) of pars" :key="index">
        {{ par }}
      </p> -->
      <div class="cardIn">
        <div class="alert-danger alert">{{ sIP }}</div>
        <div class="alert-light alert">{{ dIP }}</div>
        <div class="alert-danger alert">{{ output }}</div>
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
      log: [
        {
          output: "",
          sIP: "",
          dIP: ""
        }
      ],
      selectedFile: null
    };
  },
  methods: {
    async run() {
      const response = await axios.post(
        "http://localhost:8081/api/configList/"
      );
      console.log("Post Done");
      let sse = new EventSource("http://localhost:8081/api/configList/sseOnline");
      sse.addEventListener("message", output => {
        const data = JSON.parse(output.data);
        // const data = output.data;
        console.log(data);
        if (data.count % 2 === 0) {
          this.output += data.allOutput + "\n";
          const r = /ipv4\(.*\):\s+(.*)\s\->\s+(.*)/gm;
          const m = r.exec(this.output);
          this.sIP = `Source IP : ${m[1]}`;
          this.dIP = `Destination IP : ${m[2]}`;
          const reg = /\[\*\*\](.*)/gm;
          this.output = this.output.match(reg).toString();
          // this.log.sIP = `Source IP : ${m[1]}`;
        }
      });
    }
  },
  computed: {
    pars() {
      return this.output.split("\n");
    }
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
.alert {
  font-weight: bold;
  border: solid 2px;
  border-radius: 10px;
  margin: -5px;
  padding: 15px;
}
</style>
