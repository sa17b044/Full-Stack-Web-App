<template>
  <div class="mt-3">
    <label>Ping</label>
    <input type="text" v-model="ip" />
    <button class="btn" @click="run()">Ping</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      output: "",
      ip: ""
    };
  },
    async mounted() {
    await axios.get("http://localhost:8081/api/pingList/");
  },
  methods: {
    async run() {
      await axios.post("http://localhost:8081/api/pingList/", {
        ip: this.ip
      });
      let sse = new EventSource("http://localhost:8081/api/pingList/");
      sse.addEventListener("message", output => {
        // const data = JSON.parse(output.data);
        const data = output.data;
        console.log(data);
      });
    }
  }
  // computed: {
  //   pars() {
  //     return this.output.split("\n");
  //   }
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
