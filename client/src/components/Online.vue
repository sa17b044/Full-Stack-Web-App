<template>
  <div class="container">
    <h1>Logs Online</h1>
    <div class="border">
      <div class="alert-danger alert col">
        >_ Source <br />
        {{ sIP }}{{ sPort }}
      </div>
      <div class="alert-light alert col">
        >_ Destination <br />
        {{ dIP }}{{ dPort }}
      </div>
      <div class="alert-danger alert col">
        >_ Output : <br />
        {{ log }}
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
      ips: "",
      allOutput: "",
      sIP: "",
      dIP: "",
      sPort: "",
      dPort: "",
      log: "",
      count: ""
    };
  },
  computed: {
    pars() {
      return this.output.split("\n");
    }
  },
  async mounted() {
    let sse = new EventSource("http://localhost:8081/active");
    sse.addEventListener("message", output => {
      const data = JSON.parse(output.data);
      this.output = data.allOutput;
      if (data.count == 1) {
        this.output = data.allOutput + "\n";
        this.log = data.allOutput + "\n";
        const r = /ipv4\(.*\):\s+(.*)\s\->\s+(.*)/gm;
        const m = r.exec(this.log);
        const rPort = /udp\(.*\): (.*):(.*) (.*):(.*) (.*)/gm;
        const mPort = rPort.exec(this.log);
        this.sIP = `IP : ${m[1]} `;
        this.dIP = `IP : ${m[2]} `;
        this.sPort = `/ PORT : ${mPort[2]}`;
        this.dPort = `/ PORT : ${mPort[4]}`;
        const reg = /\[\*\*\](.*)/gm;
        const regLog = reg.exec(this.log);
        console.log(regLog);
        // this.log = this.log.match(reg).toString();
        this.log = regLog[0];
      }
    });
    console.log("3");
    await axios.get("http://localhost:8081/active");
  },
  created() {
    if (localStorage.getItem("token") === null) this.$router.push("/");
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 1200px;
  border-radius: 10px;
  border: 5px solid black;
  margin: 5% auto;
  padding: 1% 2% 2% 2%;
  background-color: hsla(0, 0%, 0%, 0.255);
}
h1 {
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  font-size: 50px;
  flex-direction: column;
  border: 3px black solid;
  border-radius: 10px;
  text-align: center;
}
.btn {
  border-radius: 10px;
  border: 3px solid black;
}
.alert {
  margin: 0.2% 0% 0.2% 0%;
  border: 3px solid black;
  border-radius: 10px;
}
</style>
