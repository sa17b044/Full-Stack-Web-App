<template>
  <div class="container card bg-light">
    <h2 class="mb-4">Server</h2>
    <div v-if="!edit">
      <div class="row row-cols-2">
        <div class="mb-2">
          <label class="form-label">Name</label>
          <input
            class="form-control"
            type="text"
            placeholder="Name"
            v-model="server_number"
          />
        </div>
        <div><span> </span></div>
        <div class="mb-2">
          <label class="form-label">Source IP</label>
          <input
            class="form-control"
            type="text"
            placeholder="Source IP Address"
            v-model="src_ip"
          />
        </div>

        <!-- <div class="mb-2">
          <label class="form-label">Source Port</label>
          <input
            class="form-control"
            type="number"
            placeholder="S. Port"
            v-model="src_port"
          />
        </div> -->
        <div class="mb-2">
          <label class="form-label" for="src_port">Port</label>
          <div v-for="(s_port, i) in src_port" :key="'i' + i">
            <input type="number" class="form-control" v-model="s_port.sPort" />
            <div class="btn-group">
              <button
                class="btn alert-success mt-1 mb-1"
                @click="addSrcPort(i)"
                v-show="i == src_port.length - 1"
              >
                <img src="../assets/plus.png" alt="add" /> 
              </button>
              <button
                class="btn alert-danger mt-1 mb-1"
                @click="removeSrcPort(i)"
                v-show="i || (!i && src_port.length > 1)"
              >
                <img src="../assets/minus.png" alt="add" /> 
              </button>
            </div>
          </div>
        </div>

        <div class="mb-2">
          <label class="form-label">Destination IP</label>
          <input
            class="form-control"
            type="text"
            placeholder="Destination IP Address"
            v-model="dst_ip"
          />
        </div>
<div><span></span></div>
        <!-- <div class="mb-2">
          <label class="form-label" for="dst_port">Destination Port</label>
          <div v-for="(d_port, j) in dst_port" :key="'j' + j">
            <input type="number" class="form-control" v-model="d_port.dPort" />
            <div class="btn-group">
              <button
                class="btn alert-success mt-1 mb-1"
                @click="addDstPort(j)"
                v-show="j == dst_port.length - 1"
              >
                <img src="../assets/plus.png" alt="add" /> 
              </button>
              <button
                class="btn alert-danger mt-1 mb-1"
                @click="removeDstPort(i)"
                v-show="j || (!j && dst_port.length > 1)"
              >
               <img src="../assets/minus.png" alt="add" /> 
              </button>
            </div>
          </div>
        </div> -->

        <div class="mb-2">
          <label class="form-label">Policy</label>
          <input
            class="form-control"
            type="number"
            placeholder="0"
            v-model="policy"
          />
        </div>
        <div><span> </span></div>
        <div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="logKNXnetip"
            />

            <label class="form-check-label" for="detection">Log KNXnetIP</label>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="logToFile"
            />
            <label class="form-check-label" for="detection">Log file</label>
          </div>
        </div>
        <div><span> </span></div>
        <div>
          <button @click="addItem()" class="btn btn-primary">Add</button>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="row row-cols-2">
        <div class="mb-2">
          <label class="form-label">Server number</label>
          <input
            class="form-control"
            type="number"
            min="1"
            max="100"
            placeholder="0"
            v-model="server_number"
          />
        </div>
        <div class="col"><span> </span></div>

        <div class="mb-2">
          <label class="form-label">Source IP</label>
          <input
            class="form-control"
            type="text"
            placeholder="Source IP Address"
            v-model="src_ip"
          />
        </div>

        <div class="mb-2">
          <label class="form-label" for="src_port">Port</label>
          <div v-for="(s_port, k) in src_port" :key="'k' + k">
            <input type="number" class="form-control" v-model="s_port.sPort" />
            <div class="btn-group">
              <button
                class="btn alert-success mt-1 mb-1"
                @click="addSrcPort(k)"
                v-show="k == src_port.length - 1"
              >
                 <img src="../assets/plus.png" alt="add" /> 
              </button>
              <button
                class="btn alert-danger mt-1 mb-1"
                @click="removeSrcPort(k)"
                v-show="k || (!k && src_port.length > 1)"
              >
                 <img src="../assets/minus.png" alt="add" /> 
              </button>
            </div>
          </div>
        </div>

        <div class="mb-2">
          <label class="form-label">Destination IP</label>
          <input
            class="form-control"
            type="text"
            placeholder="Destination IP Address"
            v-model="dst_ip"
          />
        </div>
        <div><span></span></div>

        <!-- <div class="mb-2">
          <label class="form-label" for="dst_port">Destination Port</label>
          <div v-for="(d_port, jj) in dst_port" :key="'jj' + jj">
            <input type="number" class="form-control" v-model="d_port.dPort" />
            <div class="btn-group">
              <button
                class="btn alert-success mt-1 mb-1"
                @click="addDstPort(jj)"
                v-show="jj == dst_port.length - 1"
              >
                <img src="../assets/plus.png" alt="add" /> 
              </button>
              <button
                class="btn alert-danger mt-1 mb-1"
                @click="removeDstPort(i)"
                v-show="j || (!j && dst_port.length > 1)"
              >
                 <img src="../assets/minus.png" alt="add" /> 
              </button>
            </div>
          </div>
        </div> -->

        <div class="mb-2">
          <label class="form-label">Policy</label>
          <input
            class="form-control"
            type="number"
            placeholder="0"
            v-model="policy"
          />
        </div>
        <div class="col"><span> </span></div>
        <div class="col">
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="logKNXnetip"
            />

            <label class="form-check-label" for="logKNXnetip"
              >Log KNXnetIP</label
            >
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="logToFile"
            />
            <label class="form-check-label" for="logToFile">Log file</label>
          </div>
        </div>
        <div><span> </span></div>
        <div class="col">
          <button class="btn btn-success" @click="updateItem(selectedItem)">
            Update
          </button>
        </div>
      </div>
    </div>

    <h3>Servers</h3>
    <div v-for="item in itemList" :key="item._id">
      <div class="card mt-2">
        <div class="row">
          <div class="col-3">Server Name :</div>
          <div class="col-6">{{ item.server_number }}</div>
        </div>
        <div class="row">
          <div class="col-3">Source IP :</div>
          <div class="col-6">{{ item.src_ip }}</div>
        </div>
        <div class="row">
          <div class="col-3">Source Port :</div>
          <div class="col-6">{{ item.src_port }}</div>
        </div>
        <div class="row">
          <div class="col-3">Destination IP :</div>
          <div class="col-6">{{ item.dst_ip }}</div>
        </div>
        <!-- <div class="row">
          <div class="col-3">Destination Port :</div>
          <div class="col-6">{{ item.dst_port }}</div>
        </div> -->
        <div class="row">
          <div class="col-3">Policy :</div>
          <div class="col-6">{{ item.policy }}</div>
        </div>
        <div class="row">
          <div class="col-3">Log KNXnetIP :</div>
          <div class="col-6">{{ item.logKNXnetip }}</div>
        </div>
        <div class="row">
          <div class="col-3">Log file :</div>
          <div class="col-6">{{ item.logToFile }}</div>
        </div>
        <div class="row">
          <div class="col">
            <button class="btn btn-warning mt-3" @click="editItem(i, item)">
              Edit
            </button>
            <button class="btn btn-danger mt-3" @click="removeItem(item, i)">
              Delete
            </button>
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
      server_number: "",
      src_ip: "",
      src_port: [
        {
          sPort: ""
        }
      ],
      dst_ip: "",
      // dst_port: [
      //   {
      //     dPort: ""
      //   }
      // ],
      policy: "",
      logKNXnetip: false,
      logToFile: false,
      itemList: [],
      edit: false,
      selectedItem: ""
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/serverList/");
    this.itemList = response.data;
  },
  methods: {
    addSrcPort(index) {
      this.src_port.push({ sPort: "" });
    },
    removeSrcPort(index) {
      this.src_port.splice(index, 1);
    },
    // addDstPort(index) {
    //   this.dst_port.push({ dPort: "" });
    // },
    // removeDstPort(index) {
    //   this.dst_port.splice(index, 1);
    // },
    async addItem() {
      const response = await axios.post(
        "http://localhost:8081/api/serverList/",
        {
          server_number: this.server_number,
          src_ip: this.src_ip,
          src_port: this.src_port,
          dst_ip: this.dst_ip,
          // dst_port: this.dst_port,
          policy: this.policy,
          logKNXnetip: this.logKNXnetip,
          logToFile: this.logToFile
        }
      );
      this.itemList.push(response.data);
      this.server_number = "";
      this.src_ip = "";
      // this.src_port = "";
      this.dst_ip = "";
      // this.dst_port = "";
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
        server_number: this.server_number,
        src_ip: this.src_ip,
        src_port: this.src_port,
        dst_ip: this.dst_ip,
        // dst_port: this.dst_port,
        policy: this.policy,
        logKNXnetip: this.logKNXnetip,
        logToFile: this.logToFile
      });
      this.edit = false;
      const response = await axios.get("http://localhost:8081/api/serverList/");
      this.itemList = response.data;
    },
    editItem(i, item) {
      console.log(item);
      this.edit = true;
      this.server_number = item.server_number;
      this.src_ip = item.src_ip;
      this.src_port = item.src_port;
      this.dst_ip = item.dst_ip;
      // this.dst_port = item.dst_port;
      this.policy = item.policy;
      this.logKNXnetip = item.logKNXnetip;
      this.logToFile = item.logToFile;
      this.selectedItem = item;
    }
  }
};
</script>
<!-- Add "scoped" atdivibute to limit CSS to this component only -->
<style scoped>
input[type="number"] {
  width: 25%;
}
input[type="text"] {
  width: 50%;
}
input[type="file"] {
  width: 27%;
}
select {
  width: 50%;
}
input[type="number"]:focus {
  background-color: rgb(224, 247, 255);
}
input,
select,
button {
  border: 2px solid black;
}
.noBorder {
  border: 2px solid white;
}
.card {
  background-color: azure;
  border-radius: 15px;
  padding: 15px;
  border: 2px solid black;
}
.col-3 {
  font-weight: bold;
  padding-left: 30px;
}
h3 {
  text-align: center;
}
label {
  font-weight: bold;
}
img {
  width: 17px;
  height: auto;
}
</style>
