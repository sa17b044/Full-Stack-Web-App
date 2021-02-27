<template>
  <div class="card mt-3">
    <!-- <div class="row"> -->
    <!-- Policy ################################################################ -->
    <!-- <div class="col"> -->

    <h2>Policy</h2>
    <div class="mt-3">
      <div class="row ">
        <div class="col-2 l">
          <div v-if="!editPolicy">
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
              <label class="form-check-label" for="inspection"
                >Inspection</label
              >
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
              <label class="form-check-label" for="inspection"
                >Inspection</label
              >
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
              <input
                type="text"
                class="form-control "
                v-model="service.select"
              />
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
              <input
                type="text"
                class="form-control "
                v-model="app.select_app"
              />
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
        </div>
        <div class="col-10 l">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Detection</th>
                <th scope="col">Inspection</th>
                <th scope="col">Individual addressing</th>
                <th scope="col">Services</th>
                <th scope="col">App Services</th>
                <th scope="col">Group address level</th>
                <th scope="col">Group address file</th>
                <th scope="col">Header</th>
                <th scope="col">Payload</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in itemListP" :key="item._id">
                <th scope="row">{{ ++i }}</th>
                <td>{{ item.detection }}</td>
                <td>{{ item.inspection }}</td>
                <td>{{ item.individual_addressing }}</td>
                <td>
                  <div
                    class="col"
                    v-for="(serv, ind) in item.services"
                    :key="ind"
                  >
                    {{ serv.select }}
                  </div>
                </td>
                <td>
                  <div
                    class="col"
                    v-for="(appServ, inde) in item.app_services"
                    :key="inde"
                  >
                    {{ appServ.select_app }}
                  </div>
                </td>
                <td>{{ item.group_address_level }}</td>
                <td>{{ item.group_address_file }}</td>
                <td>{{ item.header }}</td>
                <td>{{ item.payload }}</td>
                <td>
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Server ##################################################################### -->
  <!-- </div>
  </div> -->
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
      detection: false,
      inspection: false,
      individual_addressing: false,
      group_address_level: "",
      group_address_file: "",
      header: false,
      payload: false,
      itemListP: [],
      editPolicy: false,
      xmlList: [],
      selectedItem: ""
    };
  },
  async mounted() {
    const responseP = await axios.get("http://localhost:8081/api/policyList/");
    this.itemListP = responseP.data;
    // console.log(this.itemListP);
    const resXml = await axios.get("http://localhost:8081/api/xmlList/");
    // console.log("##");
    this.xmlList = resXml.data;
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
      this.detection = false;
      this.inspection = false;
      this.individual_addressing = false;
      this.group_address_level = "";
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
      this.detection = false;
      this.inspection = false;
      this.individual_addressing = false;
      this.group_address_level = "";
      this.header = false;
      this.payload = false;
    },
    async updateItem(item) {
      await axios.put("http://localhost:8081/api/policyList/" + item._id, {
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
    }
  },
  created() {
    if (localStorage.getItem("token") === null) this.$router.push("/login");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  border-radius: 5px;
  padding: 10px;
}
select {
  width: 30%;
}
</style>
