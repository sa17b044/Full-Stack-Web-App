<template>
  <div class="container bounceIn">
    <h3 class="mb-4">Policy</h3>
    <div v-if="!edit">
      <div class="mb-2">
        <label class="form-label">Policy number</label>
        <input
          class="form-control"
          type="number"
          min="1"
          max="100"
          placeholder="0"
          v-model="policy_number"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" v-model="detection" />
        <label class="form-check-label" for="detection">Detection</label>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" v-model="inspection" />
        <label class="form-check-label" for="inspection">Inspection</label>
      </div>
      <div class="mb-3 form-check">
        <input
          type="checkbox"
          class="form-check-input"
          v-model="individual_addressing"
        />
        <label class="form-check-label" for="individual_addressing"
          >Individual addressing</label
        >
      </div>
      <div class="mb-3">
        <label class="form-label" for="services">Services</label>
        <select class="form-select">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="mb-2">
        <label class="form-label">Group address level</label>
        <input
          class="form-control"
          type="number"
          min="1"
          max="100"
          placeholder="0"
          v-model="group_address_level"
        />
      </div>

      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" v-model="header" />
        <label class="form-check-label" for="individual_addressing"
          >Header</label
        >
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" v-model="payload" />
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
          placeholder="0"
          v-model="policy_number"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" v-model="detection" />
        <label class="form-check-label" for="detection">Detection</label>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" v-model="inspection" />
        <label class="form-check-label" for="inspection">Inspection</label>
      </div>
      <div class="mb-3 form-check">
        <input
          type="checkbox"
          class="form-check-input"
          v-model="individual_addressing"
        />
        <label class="form-check-label" for="individual_addressing"
          >Individual addressing</label
        >
      </div>

      <div class="mb-3">
        <label class="form-label" for="services">Services</label>
        <select class="form-select" v-model="services.select">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="mb-2">
        <label class="form-label">Group address level</label>
        <input
          class="form-control"
          type="number"
          min="1"
          max="100"
          placeholder="0"
          v-model="group_address_level"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" v-model="header" />
        <label class="form-check-label" for="individual_addressing"
          >Header</label
        >
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" v-model="payload" />
        <label class="form-check-label" for="individual_addressing"
          >Payload</label
        >
      </div>
      <button class="btn btn-success" @click="updateItem(selectedItem)">
        Update
      </button>
    </div>

    <div class="row mt-3">
      <div class="col">
        <div>Policy Number</div>
      </div>
      <div class="col">
        <div>Detection</div>
      </div>
      <div class="col">
        <div>Inspection</div>
      </div>
      <div class="col">
        <div>Individual Addressing</div>
      </div>
      <div class="col">
        <div>Group Address Level</div>
      </div>
      <div class="col">
        <div>Header</div>
      </div>
      <div class="col">
        <div>Payload</div>
      </div>
      <div class="col">
        <div class="p-2">
          <button class="btn btn-debug noBorder">
            Edit
          </button>
        </div>
      </div>
      <div class="col">
        <div class="p-2 ">
          <button class="btn btn-debug noBorder">
            Delete
          </button>
        </div>
      </div>
    </div>
    <div v-for="(item, i) in itemList" :key="item._id">
      <div class="row">
        <div class="col">
          <div>{{ item.policy_number }}</div>
        </div>
        <div class="col">
          <div>{{ item.detection }}</div>
        </div>
        <div class="col">
          <div>{{ item.inspection }}</div>
        </div>
        <div class="col">
          <div>{{ item.individual_addressing }}</div>
        </div>
        <div class="col">
          <div>{{ item.group_address_level }}</div>
        </div>
        <div class="col">
          <div>{{ item.header }}</div>
        </div>
        <div class="col">
          <div>{{ item.payload }}</div>
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
              Delete
            </button>
          </div>
        </div>
      </div>
      <!-- <div>Log file{{ item.group_address_file }}</div> -->
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
      policy_number: "",
      detection: "false",
      inspection: "false",
      individual_addressing: "false",
      group_address_level: "",
      group_address_file: "",
      header: "false",
      payload: "false",
      itemList: [],
      edit: false
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/policyList/");
    this.itemList = response.data;
    // console.log(this.itemList);
  },
  methods: {
    add(index) {
      this.inputs.push({ name: "" });
    },
    remove(index) {
      this.inputs.splice(index, 1);
    },
    async addItem() {
      const response = await axios.post(
        "http://localhost:8081/api/policyList/",
        {
          policy_number: this.policy_number,
          detection: this.detection,
          inspection: this.inspection,
          individual_addressing: this.individual_addressing,
          group_address_level: this.group_address_level,
          //  group_address_file: this.group_address_file,
          header: this.header,
          payload: this.payload
        }
      );
      this.itemList.push(response.data);
      this.policy_number = "";
      this.detection = "";
      this.inspection = "";
      this.individual_addressing = "";
      this.group_address_level = "";
      // this.group_address_file = "";
      this.header = "";
      this.payload = "";
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
