<template>
  <div>
    <button @click="sendLog()">Run</button>
    <span>IP Address</span>
    <input type="text" v-model="ip" />
    <div v-for="(item, i) in itemList" :key="item._id">
      {{ ++i }}
      {{ item.output.match(/\s+p(.*?)\ms/gim).toString() }}
      <button @click="removeItem(item, i)">Remove</button>
    </div>
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
      itemList: [],
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/pingList/");
    // const reg = /^((?!2\s+(.*?)\s+1001ms).)*$/;
    this.itemList = response.data;
  },
  methods: {
    async sendLog() {
      await axios.post("http://localhost:8081/api/pingList/", {
        // cmd: this.cmd,
        cmd: "ping -c 4 " + this.ip,
        output: this.output,
        ip: this.ip,
      });
      const response = await axios.get("http://localhost:8081/api/pingList/");
      this.itemList = response.data;
    },
    async removeItem(item, i) {
      await axios.delete("http://localhost:8081/api/pingList/" + item._id);
      this.itemList.splice(i, 1);
      const response = await axios.get("http://localhost:8081/api/pingList/");
      this.itemList = response.data;
    },
  },
  // 2\s+packets\s+transmitted,\s+2\s+received,\s+0%\s+packet\s+loss,\s+time\s+1001ms
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
