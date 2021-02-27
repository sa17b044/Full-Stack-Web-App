<template>
  <div class="card mt-3">
    <!-- <div class="row"> -->
      <!-- Server ##################################################################### -->
      <!-- <div class="col"> -->
        <h2>Server</h2>
        <div class="mt-3">
          <div class="row">
            <div class="col-4 l">
              <div v-if="!editServer">
                <div class="row row-cols-2 mt-3">
                  <div class="mb-2"></div>
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
                      <label class="form-check-label" for="detection"
                        >Log file</label
                      >
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
                  <div class="mb-2"></div>
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
                      <label class="form-check-label" for="logToFile"
                        >Log file</label
                      >
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
            </div>

            <div class="col-8 l">
              <table class="table mt-3">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Src.IP</th>
                    <th scope="col">Des.IP</th>
                    <th scope="col">Port</th>
                    <th scope="col">Policy</th>
                    <th scope="col">Log KNXnetIP</th>
                    <th scope="col">Log file</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, numberList) in itemListS" :key="item._id">
                    <th scope="row">{{ ++numberList }}</th>
                    <td>{{ item.src_ip }}</td>
                    <td>{{ item.dst_ip }}</td>
                    <td>
                      <div
                        class="col"
                        v-for="(port, indexPort) in item.src_port"
                        :key="indexPort"
                      >
                        {{ port.sPort }}
                      </div>
                    </td>
                    <td>{{ item.policy }}</td>
                    <td>{{ item.logKNXnetip }}</td>
                    <td>{{ item.logToFile }}</td>
                    <td>
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      editServer: false,
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
      selectedItemServer: ""
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/serverList/");
    this.itemListS = response.data;
  },
  methods: {
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
          src_ip: this.src_ip,
          src_port: this.src_port,
          dst_ip: this.dst_ip,
          policy: this.policy,
          logKNXnetip: this.logKNXnetip,
          logToFile: this.logToFile
        }
      );
      this.itemListS.push(response.data);
      this.src_ip = "";
      this.dst_ip = "";
      this.policy = "";
      this.logKNXnetip = false;
      this.logToFile = false;
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
      this.editServer = true;
      this.src_ip = itemServer.src_ip;
      this.src_port = itemServer.src_port;
      this.dst_ip = itemServer.dst_ip;
      this.policy = itemServer.policy;
      this.logKNXnetip = itemServer.logKNXnetip;
      this.logToFile = itemServer.logToFile;
      this.selectedItemServer = itemServer;
    }
  },
  created() {
    if (localStorage.getItem("token") === null) this.$router.push("/login");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
select {
  width: 30%;
}
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
  margin: 0px;
  /* margin-right: -15%; */
}
.col-3 {
  font-weight: bold;
}
h2 {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: aliceblue;
  border-radius: 15px;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: -5px;
  margin-bottom: -5px;
}
label {
  margin-bottom: 2px;
  font-weight: bold;
}
img {
  width: 17px;
  height: auto;
}
.l {
  border: 2px solid black;
  border-radius: 7px;
  padding: 10px;
}
</style>
