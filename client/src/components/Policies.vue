<template>
  <div class="card mt-3">
    <div class="row">
      <!-- Policy ################################################################ -->
      <div class="col cardIn">
        <h2 class="mb-4">Policy</h2>
        <div v-if="!editPolicy">
          <div class="mb-2">
            <label class="form-label">Number</label>
            <input
              class="form-control"
              type="number"
              v-model="policy_number"
              placeholder="0"
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="detection"
              checked="true"
            />
            <label class="form-check-label" for="detection">Detection</label>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="inspection"
              checked="true"
            />
            <label class="form-check-label" for="inspection">Inspection</label>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              checked="true"
              v-model="individual_addressing"
            />
            <label class="form-check-label" for="individual_addressing"
              >Individual addressing</label
            >
          </div>
          <label class="form-label" for="services">Services</label>
          <div v-for="(service, kk) in services" :key="'k' + kk">
            <input
              type="text"
              class="form-control "
              v-model="service.select"
              placeholder="Services"
            />
            <span class="btn-group">
              <button
                class="btn alert-success mt-1 mb-1"
                @click="add(kk)"
                v-show="kk == services.length - 1"
              >
                <img src="../assets/plus.png" alt="add" />
              </button>
              <button
                class="btn alert-danger mt-1 mb-1"
                @click="remove(kk)"
                v-show="kk || (!kk && services.length > 1)"
              >
                <img src="../assets/minus.png" alt="minus" />
              </button>
            </span>
          </div>
          <label class="form-label" for="services">App Services</label>
          <!-- {{services}} -->
          <div v-for="(app, ll) in app_services" :key="'l' + ll">
            <input
              type="text"
              class="form-control "
              v-model="app.select_app"
              placeholder="App Services"
            />
            <span class="btn-group">
              <button
                class="btn alert-success mt-1 mb-1"
                @click="addApp(ll)"
                v-show="ll == app_services.length - 1"
              >
                <img src="../assets/plus.png" alt="add" />
              </button>
              <button
                class="btn alert-danger mt-1 mb-1"
                @click="removeApp(ll)"
                v-show="ll || (!ll && app_services.length > 1)"
              >
                <img src="../assets/minus.png" alt="minus" />
              </button>
            </span>
          </div>
          <div class="mb-2">
            <label class="form-label">Group address level</label>
            <input
              class="form-control"
              type="number"
              min="1"
              max="100"
              v-model="group_address_level"
              placeholder="0"
            />
          </div>
          <div class="mb-2">
            <label class="form-label">Group address file</label>
            <select class="form-control" v-model="group_address_file">
              <option v-for="xml in xmlList" :key="xml._id + 1">
                {{ xml.originalname }}
              </option>
            </select>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="header"
              checked="false"
            />
            <label class="form-check-label" for="individual_addressing"
              >Header</label
            >
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="payload"
              checked="true"
            />
            <label class="form-check-label" for="individual_addressing"
              >Payload</label
            >
          </div>
          <button class="btn btn-primary" @click="addItem()">Add</button>
        </div>
        <div v-else>
          <div class="mb-2">
            <label class="form-label">Number</label>
            <input class="form-control" type="text" v-model="policy_number" />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="detection"
              checked="true"
            />
            <label class="form-check-label" for="detection">Detection</label>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="inspection"
              checked="true"
            />
            <label class="form-check-label" for="inspection">Inspection</label>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              checked="true"
              v-model="individual_addressing"
            />
            <label class="form-check-label" for="individual_addressing"
              >Individual addressing</label
            >
          </div>
          <label class="form-label" for="services">Services</label>
          <div v-for="(service, k) in services" :key="k">
            <input type="text" class="form-control " v-model="service.select" />
            <span class="btn-group">
              <button
                class="btn alert-success mt-1 mb-1"
                @click="add(k)"
                v-show="k == services.length - 1"
              >
                <img src="../assets/plus.png" alt="add" />
              </button>
              <button
                class="btn alert-danger mt-1 mb-1"
                @click="remove(k)"
                v-show="k || (!k && services.length > 1)"
              >
                <img src="../assets/minus.png" alt="add" />
              </button>
            </span>
          </div>
          <label class="form-label" for="services">App Services</label>
          <div v-for="(app, l) in app_services" :key="l">
            <input type="text" class="form-control " v-model="app.select_app" />
            <span class="btn-group">
              <button
                class="btn alert-success mt-1 mb-1"
                @click="addApp(l)"
                v-show="l == app_services.length - 1"
              >
                <img src="../assets/plus.png" alt="add" />
              </button>
              <button
                class="btn alert-danger mt-1 mb-1"
                @click="removeApp(l)"
                v-show="l || (!l && app_services.length > 1)"
              >
                <img src="../assets/minus.png" alt="add" />
              </button>
            </span>
          </div>
          <div class="mb-2">
            <label class="form-label">Group address level</label>
            <input
              class="form-control"
              type="number"
              min="1"
              max="100"
              v-model="group_address_level"
            />
          </div>
          <div class="mb-2">
            <label class="form-label">Group address file</label>
            <select class="form-control" v-model="group_address_file">
              <option v-for="xml in xmlList" :key="xml._id">
                {{ xml.originalname }}
              </option>
            </select>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="header"
              checked="true"
            />
            <label class="form-check-label" for="individual_addressing"
              >Header</label
            >
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="payload"
              checked="true"
            />
            <label class="form-check-label" for="individual_addressing"
              >Payload</label
            >
          </div>
          <button class="btn btn-success" @click="updateItem(selectedItem)">
            Update
          </button>
        </div>
        <h2>Policies</h2>
        <div v-for="(item, i) in itemListP" :key="item._id">
          <div class="cardIn">
            <div class="row">
              <div class="col-3">Number :</div>
              <div class="col-6">{{ item.policy_number }}</div>
            </div>
            <div class="row">
              <div class="col-3">Detection :</div>
              <div class="col-6">{{ item.detection }}</div>
            </div>
            <div class="row">
              <div class="col-3">Inspection :</div>
              <div class="col-6">{{ item.inspection }}</div>
            </div>
            <div class="row">
              <div class="col-3">Individual addressing :</div>
              <div class="col-6">{{ item.individual_addressing }}</div>
            </div>
            <div class="row">
              <div class="col-3">Services :</div>
              <div class="col" v-for="(serv, ind) in item.services" :key="ind">
                {{ serv.select }}
              </div>
            </div>
            <div class="row">
              <div class="col-3">App Services :</div>
              <div
                class="col"
                v-for="(appServ, inde) in item.app_services"
                :key="inde"
              >
                {{ appServ.select_app }}
              </div>
            </div>
            <div class="row">
              <div class="col-3">Group address level :</div>
              <div class="col-6">{{ item.group_address_level }}</div>
            </div>
            <div class="row">
              <div class="col-3">Group address file :</div>
              <div class="col-6">{{ item.group_address_file }}</div>
            </div>
            <div class="row">
              <div class="col-3">Header :</div>
              <div class="col-6">{{ item.header }}</div>
            </div>
            <div class="row">
              <div class="col-3">Payload :</div>
              <div class="col-6">{{ item.payload }}</div>
            </div>
            <div class="row">
              <div class="col">
                <div class="btn-group">
                  <button
                    class="btn btn-warning mt-3"
                    @click="editItem(i, item)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger mt-3"
                    @click="removeItem(item, i)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Server ##################################################################### -->
      <div class="col cardIn">
        <h2 class="mb-4">Server</h2>
        <div v-if="!editServer">
          <div class="row row-cols-2">
            <div class="mb-2">
              <label class="form-label">Number</label>
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
              <label class="form-label" for="src_port">Port</label>
              <div v-for="(s_port, i) in src_port" :key="'i' + i">
                <input
                  type="number"
                  class="form-control"
                  v-model="s_port.sPort"
                  placeholder="0"
                />
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
                <label class="form-check-label" for="detection"
                  >Log KNXnetIP</label
                >
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
              <button @click="addItemServer()" class="btn btn-primary">
                Add
              </button>
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
                <input
                  type="number"
                  class="form-control"
                  v-model="s_port.sPort"
                />
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
              <button
                class="btn btn-success"
                @click="updateItemServer(selectedItemServer)"
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <h2>Servers</h2>
        <div v-for="item in itemListS" :key="item._id">
          <div class="cardIn mt-2">
            <div class="row">
              <div class="col-3">Server Number :</div>
              <div class="col-6">{{ item.server_number }}</div>
            </div>
            <div class="row">
              <div class="col-3">Source IP :</div>
              <div class="col-6">{{ item.src_ip }}</div>
            </div>
            <div class="row">
              <div class="col-3">Port :</div>
              <div
                class="col"
                v-for="(port, indexPort) in item.src_port"
                :key="indexPort"
              >
                {{ port.sPort }}
              </div>
            </div>
            <div class="row">
              <div class="col-3">Destination IP :</div>
              <div class="col-6">{{ item.dst_ip }}</div>
            </div>
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
                <div class="btn-group">
                  <button
                    class="btn btn-warning mt-3"
                    @click="editItemServer(i, item)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger mt-3"
                    @click="removeItemServer(item, i)"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
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
      services: [
        {
          select: ""
        }
      ],
      app_services: [
        {
          select_app: ""
        }
      ],
      policy_number: "",
      detection: false,
      inspection: false,
      individual_addressing: false,
      group_address_level: "",
      group_address_file: "",
      header: false,
      payload: false,
      itemListP: [],
      editPolicy: false,
      editServer: false,
      xmlList: [],
      server_number: "",
      src_ip: "",
      src_port: [
        {
          sPort: ""
        }
      ],
      dst_ip: "",
      policy: "",
      logKNXnetip: false,
      logToFile: false,
      itemListS: [],
      // edit: false,
      selectedItemServer: "",
      selectedItem: ""
    };
  },
  async mounted() {
    const responseP = await axios.get("http://localhost:8081/api/policyList/");
    this.itemListP = responseP.data;
    console.log(this.itemListP);
    const resXml = await axios.get("http://localhost:8081/api/xmlList/");
    // console.log("##");
    this.xmlList = resXml.data;
    // console.log(this.xmlList);
    const responseS = await axios.get("http://localhost:8081/api/serverList/");
    this.itemListS = responseS.data;
  },
  methods: {
    add(index) {
      this.services.push({ select: "" });
    },
    remove(index) {
      this.services.splice(index, 1);
    },
    addApp(index) {
      this.app_services.push({ select_app: "" });
    },
    removeApp(index) {
      this.app_services.splice(index, 1);
    },
    async addItem() {
      const response = await axios.post(
        "http://localhost:8081/api/policyList/",
        {
          policy_number: this.policy_number,
          detection: this.detection,
          inspection: this.inspection,
          individual_addressing: this.individual_addressing,
          services: this.services,
          app_services: this.app_services,
          group_address_level: this.group_address_level,
          group_address_file: this.group_address_file,
          header: this.header,
          payload: this.payload
        }
      );
      this.itemListP.push(response.data);
      // this.policy_number = "";
      this.detection = false;
      this.inspection = false;
      this.individual_addressing = false;
      this.group_address_level = "a";
      // this.group_address_file = "";
      this.header = false;
      this.payload = false;
      const res = await axios.get("http://localhost:8081/api/policyList/");
      console.log(res.data);
    },
    async removeItem(item, i) {
      await axios.delete("http://localhost:8081/api/policyList/" + item._id);
      this.itemListP.splice(i, 1);
      const response = await axios.get("http://localhost:8081/api/policyList/");
      this.itemListP = response.data;
    },
    async updateItem(item) {
      await axios.put("http://localhost:8081/api/policyList/" + item._id, {
        policy_number: this.policy_number,
        detection: this.detection,
        inspection: this.inspection,
        individual_addressing: this.individual_addressing,
        group_address_level: this.group_address_level,
        group_address_file: this.group_address_file,
        services: this.services,
        app_services: this.app_services,
        header: this.header,
        payload: this.payload
      });
      this.editPolicy = false;
      const response = await axios.get("http://localhost:8081/api/policyList/");
      this.itemListP = response.data;
    },
    editItem(i, item) {
      console.log(item);
      this.editPolicy = true;
      this.policy_number = item.policy_number;
      this.detection = item.detection;
      this.inspection = item.inspection;
      this.individual_addressing = item.individual_addressing;
      this.group_address_level = item.group_address_level;
      this.group_address_file = item.group_address_file;
      this.services = item.services;
      this.app_services = item.app_services;
      this.header = item.header;
      this.payload = item.payload;
      this.selectedItem = item;
    },
    addSrcPort(index) {
      this.src_port.push({ sPort: "" });
    },
    removeSrcPort(index) {
      this.src_port.splice(index, 1);
    },
    async addItemServer() {
      const response = await axios.post(
        "http://localhost:8081/api/serverList/",
        {
          server_number: this.server_number,
          src_ip: this.src_ip,
          src_port: this.src_port,
          dst_ip: this.dst_ip,
          policy: this.policy,
          logKNXnetip: this.logKNXnetip,
          logToFile: this.logToFile
        }
      );
      this.itemListS.push(response.data);
      // this.server_number = "";
      this.src_ip = "";
      this.dst_ip = "";
      this.policy = "";
      this.logKNXnetip = "false";
      this.logToFile = "false";
    },
    async removeItemServer(itemServer, i) {
      await axios.delete(
        "http://localhost:8081/api/serverList/" + itemServer._id
      );
      this.itemListS.splice(i, 1);
      const response = await axios.get("http://localhost:8081/api/serverList/");
      this.itemListS = response.data;
    },
    async updateItemServer(itemServer) {
      await axios.put(
        "http://localhost:8081/api/serverList/" + itemServer._id,
        {
          server_number: this.server_number,
          src_ip: this.src_ip,
          src_port: this.src_port,
          dst_ip: this.dst_ip,
          policy: this.policy,
          logKNXnetip: this.logKNXnetip,
          logToFile: this.logToFile
        }
      );
      this.editServer = false;
      const response = await axios.get("http://localhost:8081/api/serverList/");
      this.itemListS = response.data;
    },
    editItemServer(i, itemServer) {
      console.log(itemServer);
      this.editServer = true;
      this.server_number = itemServer.server_number;
      this.src_ip = itemServer.src_ip;
      this.src_port = itemServer.src_port;
      this.dst_ip = itemServer.dst_ip;
      this.policy = itemServer.policy;
      this.logKNXnetip = itemServer.logKNXnetip;
      this.logToFile = itemServer.logToFile;
      this.selectedItemServer = itemServer;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.btn {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
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
</style>
