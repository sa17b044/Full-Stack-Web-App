<template>
  <div>
    <div>Ping</div>
    <label class="form-label">IP Address</label>
    <input class="form-control" type="text" v-model="ip" />
    <button @click="sendLog()" class="btn btn-primary m-1">Run</button>
    <br />
    {{ this.output }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cmd: "",
      ip: "",
      output: "",
      // itemList: [],
    };
  },
  mounted() {
    console.log("1-#");
    let sse = new EventSource("http://localhost:8081/api/pingList/sse");
    // sse.onmessage = console.log
    sse.addEventListener("message", (output) => {
      console.log(output.data);
      this.output = output.data;
    });
    // console.log(sse.onmessage);
    // console.log("#");
    // const response = axios.get("http://localhost:8081/api/pingList/");
    // const reg = /^((?!2\s+(.*?)\s+1001ms).)*$/;
    // this.itemList = response.data;
    // console.log(response)
    // console.log('#')
  },
  // ,
  // methods: {
  //   async sendLog() {
  //     await axios.post("http://localhost:8081/api/pingList/", {
  //       cmd: "ping -c 4 " + this.ip,
  //       output: this.output,
  //       ip: this.ip,
  //     });
  //     const response = await axios.get("http://localhost:8081/api/pingList/");
  //     // this.itemList = response.data;
  //   },
  //   async removeItem(item, i) {
  //     await axios.delete("http://localhost:8081/api/pingList/" + item._id);
  //     this.itemList.splice(i, 1);
  //     const response = await axios.get("http://localhost:8081/api/pingList/");
  //     this.itemList = response.data;
  //   },
  // },
  // 2\s+packets\s+transmitted,\s+2\s+received,\s+0%\s+packet\s+loss,\s+time\s+1001ms
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
