<template>
  <div class="card mt-3">
    <h2>Logs Offline</h2>
    <div class="row">
      <div class="col">
        <div class="cardIn">
          <h3>pcap file</h3>
          <input type="file" @change="onFileSelected" />

          <button class="btn btn-dark" @click="run()">Run</button>
        </div>
      </div>
    </div>
    <!-- {{log}} -->
    <div v-if="logData">
    <div class="cardIn">
      <div class="alert-danger alert col">
        Source IP: {{ sIP }} - Source Port: {{ sPort }}
      </div>
      <div class="alert-light alert col">
        Destination IP: {{ dIP }} - Destination Port: {{ dPort }}
      </div>
      <div class="alert-danger alert col">Output : {{ log }}</div>
      <div v-if="!showBtn">
        <div class="btn-group">
          <button class="btn btn-secondary" @click="showEn()">More</button>
          <button class="btn btn-danger" @click="drop()">Block</button>
          <button class="btn btn-success" @click="drop()">Unblock</button>
        </div>
      </div>
      <div v-else>
        <div id="output" class="alert-secondary alert">
          <p v-for="(par, index) of pars" :key="index">
            {{ par }}
          </p>
        </div>
        <div class="btn-group">
          <button class="btn btn-warning" @click="showDi()">Less</button>
          <button class="btn btn-danger" @click="drop()">Block</button>
          <button class="btn btn-success" @click="drop()">Unblock</button>
        </div>
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
      allOutput: "",
      sIP: "",
      dIP: "",
      sPort: "",
      dPort: "",
      log: "",
      showBtn: false,
      logData: false,
      selectedFile: null
    };
  },
  computed: {
    pars() {
      return this.output.split("\n");
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      // console.log(this.selectedFile);
    },
    showEn() {
      this.showBtn = true;
      console.log("true");
    },
    showDi() {
      this.showBtn = false;
      console.log("false");
    },
    async run() {
      this.logData= true;
      const fd = new FormData();
      fd.append("file", this.selectedFile, this.selectedFile.name);
      const response = await axios.post(
        "http://localhost:8081/api/configList/",
        fd,
        {
          headers: { "content-type": "multipart/form-data" }
        }
      );
      let sse = new EventSource("http://localhost:8081/api/configList/sse");
      sse.addEventListener("message", output => {
        const data = JSON.parse(output.data);
        // const data = output.data;
        // console.log(data);
        if (data.count % 2 === 0) {
          this.output += data.allOutput + "\n";
          this.log = data.allOutput + "\n";
          console.log(this.output);
          const r = /ipv4\(.*\):\s+(.*)\s\->\s+(.*)/gm;
          const m = r.exec(this.output);
          const rPort = /udp\(.*\): (.*):(.*) (.*):(.*) (.*)/gm;
          const mPort = rPort.exec(this.output);
          this.sIP = `${m[1]}`;
          this.dIP = `${m[2]}`;
          this.sPort = `${mPort[2]}`;
          this.dPort = `${mPort[4]}`;
          console.log(mPort);
          const reg = /\[\*\*\](.*)/gm;
          this.log = this.log.match(reg).toString();
        }
      });
      await axios.get("http://localhost:8081/api/configList/sse");
    },
    async drop() {
      console.log(this.sIP, this.sPort);
      await axios.post("http://localhost:8081/filter/block", {
        ip: this.sIP,
        port: this.sPort
      });
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
/* .btn {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
} */
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
.btn {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
