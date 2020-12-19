<template>
  <div class="container">
    <h3>Server</h3>
    <div v-if="!edit">
      <div class="container">
        <div class="row row-cols-2">
          <div class="col">
            <label>Name</label><input type="text" v-model="server_name" />
          </div>
          <div class="col"></div>
          <div class="col">
            <label>Source IP</label><input type="text" v-model="src_ip" />
          </div>
          <div class="col">
            <label>Source Port</label> <input type="text" v-model="src_port" />
          </div>
          <div class="col">
            <label>Destination IP</label> <input type="text" v-model="dst_ip" />
          </div>
          <div class="col">
            Destination Port<input type="text" v-model="dst_port" />
          </div>
          <div class="col">Policy<input type="text" v-model="policy" /></div>
          <div class="col">
            <!-- <div class="row"> -->
            <label>Log KNXnetIP</label>
              <input
                type="checkbox"
                class="custom-control-input"
                v-model="logKNXnetip"
              />
            <!-- </div> -->
            <br>
            <!-- <div> -->
              <label>Log file</label>
              <input
                type="checkbox"
                class="custom-control-input"
                v-model="logToFile"
              />
            <!-- </div> -->
          </div>
          <div class="col">
            <button @click="addItem()" class="btn btn-success m-1">Add</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      Name<input type="text" v-model="server_name" /> Source IP<input
        type="text"
        v-model="src_ip"
      />
      Source Port<input type="text" v-model="src_port" /> Destination IP<input
        type="text"
        v-model="dst_ip"
      />
      Destination Port<input type="text" v-model="dst_port" /> Policy<input
        type="text"
        v-model="policy"
      />
      Log KNXnetIP<input type="checkbox" v-model="logKNXnetip" /> Log file<input
        type="checkbox"
        v-model="logToFile"
      />
      <button @click="updateItem(selectedItem)">Update</button>
    </div>

    <div v-for="(item, i) in itemList" :key="item._id">
      <div>{{ ++i }}</div>
      <div>{{ item.server_name }}</div>
      <div>{{ item.src_ip }}</div>
      <div>{{ item.src_port }}</div>
      <div>{{ item.dst_ip }}</div>
      <div>{{ item.dst_port }}</div>
      <div>{{ item.policy }}</div>
      <div>{{ item.logKNXnetip }}</div>
      <div>{{ item.logToFile }}</div>
      <button @click="editItem(i, item)">Edit</button>
      <button @click="removeItem(item, i)">Remove</button>
    </div>
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
      itemList: [],
      edit: false,
      selectedItem: "",
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/serverList/");
    this.itemList = response.data;
  },
  methods: {
    async addItem() {
      const response = await axios.post(
        "http://localhost:8081/api/serverList/",
        {
          server_name: this.server_name,
          src_ip: this.src_ip,
          src_port: this.src_port,
          dst_ip: this.dst_ip,
          dst_port: this.dst_port,
          policy: this.policy,
          logKNXnetip: this.logKNXnetip,
          logToFile: this.logToFile,
        }
      );
      this.itemList.push(response.data);
      this.server_name = "";
      this.src_ip = "";
      this.src_port = "";
      this.dst_ip = "";
      this.dst_port = "";
      this.policy = "";
      this.logKNXnetip = "";
      this.logToFile = "";
    },
    async removeItem(item, i) {
      await axios.delete("http://localhost:8081/api/serverList/" + item._id);
      this.itemList.splice(i, 1);
      const response = await axios.get("http://localhost:8081/api/serverList/");
      this.itemList = response.data;
    },
    async updateItem(item) {
      await axios.put("http://localhost:8081/api/serverList/" + item._id, {
        server_name: this.server_name,
        src_ip: this.src_ip,
        src_port: this.src_port,
        dst_ip: this.dst_ip,
        dst_port: this.dst_port,
        policy: this.policy,
        logKNXnetip: this.logKNXnetip,
        logToFile: this.logToFile,
      });
      this.edit = false;
      const response = await axios.get("http://localhost:8081/api/serverList/");
      this.itemList = response.data;
    },
    editItem(i, item) {
      console.log(item);
      this.edit = true;
      this.server_name = item.server_name;
      this.src_ip = item.src_ip;
      this.src_port = item.src_port;
      this.dst_ip = item.dst_ip;
      this.dst_port = item.dst_port;
      this.policy = item.policy;
      this.logKNXnetip = item.logKNXnetip;
      this.logToFile = item.logToFile;
      this.selectedItem = item;
    },
  },
};
</script>
<!-- Add "scoped" atdivibute to limit CSS to this component only -->
<style scoped>
</style>
