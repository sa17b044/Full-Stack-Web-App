<template>
  <div class="container card bg-light">
    <h2 class="mb-4">Policy</h2>
    <div v-if="!edit">
      <div class="mb-2">
        <label class="form-label">Policy number</label>
        <input
          class="form-control"
          type="number"
          min="1"
          max="100"
          v-model="policy_number"
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
      <div v-for="(service, k) in services" :key="'k' + k">
        <input type="text" class="form-control " v-model="service.select" />
        <span>
          <button
            class="btn alert-success mt-1 mb-1"
            @click="add(k)"
            v-show="k == services.length - 1"
          >
            +
          </button>
          <button
            class="btn alert-danger mt-1 mb-1"
            @click="remove(k)"
            v-show="k || (!k && services.length > 1)"
          >
            X
          </button>
        </span>
      </div>

      <label class="form-label" for="services">App Services</label>
      <!-- {{services}} -->
      <div v-for="(app, l) in app_services" :key="'l' + l">
        <input type="text" class="form-control " v-model="app.select_app" />
        <span>
          <button
            class="btn alert-success mt-1 mb-1"
            @click="addApp(l)"
            v-show="l == app_services.length - 1"
          >
            +
          </button>
          <button
            class="btn alert-danger mt-1 mb-1"
            @click="removeApp(l)"
            v-show="l || (!l && app_services.length > 1)"
          >
            X
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
        <label class="form-label">Policy number</label>
        <input
          class="form-control"
          type="number"
          min="1"
          max="100"
          v-model="policy_number"
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
      <!-- ############################################################################################## -->
      <label class="form-label" for="services">Services</label>
      <div v-for="(service, k) in services" :key="k">
        <input type="text" class="form-control " v-model="service.select" />
        <span>
          <button
            class="btn alert-success mt-1 mb-1"
            @click="add(k)"
            v-show="k == services.length - 1"
          >
            +
          </button>
          <button
            class="btn alert-danger mt-1 mb-1"
            @click="remove(k)"
            v-show="k || (!k && services.length > 1)"
          >
            X
          </button>
        </span>
      </div>

      <label class="form-label" for="services">App Services</label>
      <div v-for="(app, l) in app_services" :key="l">
        <input type="text" class="form-control " v-model="app.select_app" />
        <span>
          <button
            class="btn alert-success mt-1 mb-1"
            @click="addApp(l)"
            v-show="l == app_services.length - 1"
          >
            +
          </button>
          <button
            class="btn alert-danger mt-1 mb-1"
            @click="removeApp(l)"
            v-show="l || (!l && app_services.length > 1)"
          >
            X
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
    <h3 class="mt-3">Policies list</h3>
    <div v-for="(item, i) in itemList" :key="item._id">
      <div class="card mt-2">
        <div class="row">
          <div class="col-3">Policy Name :</div>
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
          <div class="col-3">Header :</div>
          <div class="col-6">{{ item.header }}</div>
        </div>
        <div class="row">
          <div class="col-3">Payload :</div>
          <div class="col-6">{{ item.payload }}</div>
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
      services: [
        {
          select: ''
        }
      ],
      app_services: [
        {
          select_app: ''
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
      itemList: [],
      edit: false,
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/policyList/");
    this.itemList = response.data;
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
          //  group_address_file: this.group_address_file,
          header: this.header,
          payload: this.payload
        }
      );
      this.itemList.push(response.data);
      this.policy_number = "";
      this.detection = false;
      this.inspection = false;
      this.individual_addressing = false;
      this.group_address_level = NULL;
      // this.group_address_file = "";
      this.header = false;
      this.payload = false;
      const res = await axios.get("http://localhost:8081/api/policyList/");
      console.log(res.data);
    },
    async removeItem(item, i) {
      await axios.delete("http://localhost:8081/api/policyList/" + item._id);
      this.itemList.splice(i, 1);
      const response = await axios.get("http://localhost:8081/api/policyList/");
      this.itemList = response.data;
    },
    async updateItem(item) {
      await axios.put("http://localhost:8081/api/policyList/" + item._id, {
        policy_number: this.policy_number,
        detection: this.detection,
        inspection: this.inspection,
        individual_addressing: this.individual_addressing,
        group_address_level: this.group_address_level,
        services: this.services,
        app_services: this.app_services,
        //  group_address_file: this.group_address_file,
        header: this.header,
        payload: this.payload
      });
      this.edit = false;
      const response = await axios.get("http://localhost:8081/api/policyList/");
      this.itemList = response.data;
    },
    editItem(i, item) {
      console.log(item);
      this.edit = true;
      this.policy_number = item.policy_number;
      this.detection = item.detection;
      this.inspection = item.inspection;
      this.individual_addressing = item.individual_addressing;
      this.group_address_level = item.group_address_level;
      this.services = item.services;
      this.app_services = item.app_services;
      // this.group_address_file=item.group_address_file;
      this.header = item.header;
      this.payload = item.payload;
      this.selectedItem = item;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="number"] {
  width: 10%;
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
</style>
