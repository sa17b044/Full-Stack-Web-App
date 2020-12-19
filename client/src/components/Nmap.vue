<template>
  <div>
    <div>Nmap</div>
    <label class="form-label">IP Address</label>
    <input class="form-control" type="text" v-model="ip" />
    <button @click="sendLog()" class="btn btn-primary m-1">Run</button>
    <div v-for="(item, i) in itemList" :key="item._id">
      <!-- {{ ++i }} -->
      <!-- <li>{{ item.output.match(/\s+p(.*?)\ms/gim).toString() }}</li> -->
      <button @click="removeItem(item, i)" class="btn btn-danger m-1">Remove</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cmd: "e",
      ip: "",
      // output: ``,
      itemList: [],
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/nmapList/");
    // const reg = /^((?!2\s+(.*?)\s+1001ms).)*$/;
    this.itemList = response.data;
  },
  methods: {
    async sendLog() {
      await axios.post("http://localhost:8081/api/nmapList/", {
        // nmap -T4 -F 10.111.9.0/24
        cmd: "nmap -T4 -F " + this.ip,
        // output: this.output,
        ip: this.ip,
      });
      const response = await axios.get("http://localhost:8081/api/nmapList/");
      this.itemList = response.data;
    },
    async removeItem(item, i) {
      await axios.delete("http://localhost:8081/api/nmapList/" + item._id);
      this.itemList.splice(i, 1);
      const response = await axios.get("http://localhost:8081/api/nmapList/");
      this.itemList = response.data;
    },
  },
  // 2\s+packets\s+transmitted,\s+2\s+received,\s+0%\s+packet\s+loss,\s+time\s+1001ms
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
