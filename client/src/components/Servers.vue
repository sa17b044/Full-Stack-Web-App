<template>
  <div class="container">
    <h3>Server</h3>
    <div v-if="!edit">
      <div class="row row-cols-2 noBorder">
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

        <div class="mb-2">
          <label class="form-label">Source Port</label>
          <input
            class="form-control"
            type="number"
            placeholder="S. Port"
            v-model="src_port"
          />
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

        <div class="mb-2">
          <label class="form-label">Destination Port</label>
          <input
            class="form-control"
            type="number"
            placeholder="D. Port"
            v-model="dst_port"
          />
        </div>

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
          <label class="form-label">Source Port</label>
          <input
            class="form-control"
            type="number"
            placeholder="S. Port"
            v-model="src_port"
          />
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

        <div class="mb-2">
          <label class="form-label">Destination Port</label>
          <input
            class="form-control"
            type="number"
            placeholder="D. Port"
            v-model="dst_port"
          />
        </div>

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

      <div class="row">
        <div class="col">
          <div>Server number</div>
        </div>
        <div class="col">
          <div>Source IP</div>
        </div>
        <div class="col">
          <div>Source Port</div>
        </div>
        <div class="col">
          <div>Destination IP</div>
        </div>
        <div class="col">
          <div>Destination Port</div>
        </div>
        <div class="col">
          <div>Policy</div>
        </div>
        <div class="col">
          <div>Log KNXnetIP</div>
        </div>
        <div class="col">
          <div>Log To File</div>
        </div>
        <div class="col">
          <div class="p-2">
          <button class="btn btn-debug noBorder">
            Edit
          </button>
          </div>
        </div>
        <div class="col">
          <div class="p-2">
          <button class="btn btn-debug noBorder">
            Delete
          </button>
          </div>
        </div>
      </div>

    <div v-for="(item, i) in itemList" :key="item._id">
      <div class="row">
        <div class="col">
          <div>{{ item.server_number }}</div>
        </div>
        <div class="col">
          <div>{{ item.src_ip }}</div>
        </div>
        <div class="col">
          <div>{{ item.src_port }}</div>
        </div>
        <div class="col">
          <div>{{ item.dst_ip }}</div>
        </div>
        <div class="col">
          <div>{{ item.dst_port }}</div>
        </div>
        <div class="col">
          <div>{{ item.policy }}</div>
        </div>
        <div class="col">
          <div>{{ item.logKNXnetip }}</div>
        </div>
        <div class="col">
          <div>{{ item.logToFile }}</div>
        </div>
        <div class="col">
          <div class="p-2">
          <button class="btn btn-secondary" @click="editItem(i, item)">
            Edit
          </button>
          </div>
        </div>
        <div class="col">
          <div class="p-2">
          <button class="btn btn-danger" @click="removeItem(item, i)">
            Remove
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
      src_port: "",
      dst_ip: "",
      dst_port: "",
      policy: "",
      logKNXnetip: "false",
      logToFile: "false",
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
    async addItem() {
      const response = await axios.post(
        "http://localhost:8081/api/serverList/",
        {
          server_number: this.server_number,
          src_ip: this.src_ip,
          src_port: this.src_port,
          dst_ip: this.dst_ip,
          dst_port: this.dst_port,
          policy: this.policy,
          logKNXnetip: this.logKNXnetip,
          logToFile: this.logToFile
        }
      );
      this.itemList.push(response.data);
      this.server_number = "";
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
        server_number: this.server_number,
        src_ip: this.src_ip,
        src_port: this.src_port,
        dst_ip: this.dst_ip,
        dst_port: this.dst_port,
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
      this.dst_port = item.dst_port;
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
  width: 15%;
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
.row {
  border: 2px solid black;
}
.col {
  border: 1px solid black;
}
.noBorder {
  border: 2px solid white;
}
</style>
