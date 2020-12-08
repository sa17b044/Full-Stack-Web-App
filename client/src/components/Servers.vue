<template>
  <div class="container">
    <!-- <div class="container card"> -->
    <div class="row title">
      <div class="col">#</div>
      <div class="col">Name</div>
      <div class="col">Source IP</div>
      <div class="col">Source Port</div>
      <div class="col">Destination IP</div>
      <div class="col">Destination Port</div>
      <div class="col">Policy</div>
      <div class="col">Log KNXnetIP</div>
      <div class="col">Log file</div>
      <button class="btn btn-info">Edit</button>
      <button class="btn btn-info">Remove</button>
    </div>
    <div v-if="!selectedItem">
      <div v-for="(item, i) in serverList" :key="item._id">
        <div class="row">
          <div class="col">{{ i + 1 }}</div>
          <div class="col">{{ item.server_name }}</div>
          <div class="col">{{ item.src_ip }}</div>
          <div class="col">{{ item.src_port }}</div>
          <div class="col">{{ item.dst_ip }}</div>
          <div class="col">{{ item.dst_port }}</div>
          <div class="col">{{ item.policy }}</div>
          <div class="col">{{ item.logKNXnetip }}</div>
          <div class="col">{{ item.logToFile }}</div>
          <button class="btn btn-secondary" @click="editItem(item)">
            Edit
          </button>
          <button class="btn btn-danger" @click="removeItem(item, i)">
            Remove
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col"><input type="text" v-model="server_name"></div>
        <div class="col"><input type="text" v-model="src_ip"></div>
        <div class="col"><input type="text" v-model="src_port"></div>
        <div class="col"><input type="text" v-model="dst_ip"></div>
        <div class="col"><input type="text" v-model="dst_port"></div>
        <div class="col"><input type="text" v-model="policy"></div>
        <div class="col"><input type="text" v-model="logKNXnetip"></div>
        <div class="col"><input type="text" v-model="logToFile"></div>
        <!-- <div class="col"><input type="text" v-model=""></div> -->
        <button class="btn btn-secondary" @click="updateItem()">Update</button>
        <button class="btn btn-danger" @click="removeItem(item, i)">
          Remove
        </button>
      </div>
    </div>
    <a href="/#/server">New Server</a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      server_name: "",
      src_ip: "",
      src_port: "",
      dst_ip: "",
      dst_port: "",
      policy: "",
      logKNXnetip: "false",
      logToFile: "false",
      // e_server_name: "",
      // e_src_ip: "",
      // e_src_port: "",
      // e_dst_ip: "",
      // e_dst_port: "",
      // e_policy: "",
      // e_logKNXnetip: "false",
      // e_logToFile: "false",
      serverList: [],
      selectedItem: false,
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/serverList/");
    this.serverList = response.data;
  },
  methods: {
    async removeItem(item, i) {
      await axios.delete("http://localhost:8081/api/serverList/" + item._id);
      this.serverList.splice(i, 1);
    },
    updateItem() {
      this.selectedItem = false;
      // this.server_name,
      // this.src_ip,
      // this.src_port,
      // this.dst_ip,
      // this.dst_port,
      // this.policy,
      // this.logKNXnetip,
      // this.logToFile,
    },
    editItem(item, i) {
      // console.log('#')
      this.selectedItem = true
      // await axios.put("http://localhost:8081/api/serverList/" + item._id, {
        // server_name = this.server_name
        // src_ip = this.src_ip
        // src_port= this.src_port
        // dst_ip= this.dst_ip
        // dst_port= this.dst_port
        // policy= this.policy
        // logKNXnetip= this.logKNXnetip
        // logToFile= this.logToFile
      // });
      // this.selectedItem = true
      // const response = await axios.get("http://localhost:8081/api/serverList/");
      // this.itemList = response.data;
      // this.selectedItem._id = -1;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col {
  border: 1px solid black;
  padding-right: 1px;
  padding-left: 1px;
}
.btn {
  border-radius: unset;
}
.title {
  color: #fff;
  background-color: #17a2b8;
}
</style>
