<template>
  <div class="container">

    <h3>Policy</h3>
    <div v-if="!edit">
      <label class="form-label">Policy name</label>
      <input class="form-control" type="text" v-model="policy_name" />
      <label>Detection</label>
      <input type="checkbox" v-model="detection" />
      <label>Inspection</label>
      <input type="checkbox" v-model="inspection" />
      <label>Individual addressing</label>
      <input type="checkbox" v-model="individual_addressing" />
      <label>SEARCH_REQUEST</label>
      <input type="checkbox" v-model="SEARCH_REQUEST" />
      <label>DESCRIPTION_REQUEST</label>
      <input type="checkbox" v-model="DESCRIPTION_REQUEST" />
      <label>A individualAddress write</label>
      <input type="checkbox" v-model="A_IndividualAddress_Write" />
      <label>A individualAddress read</label>
      <input type="checkbox" v-model="A_IndividualAddress_Read" />
      <label>Group address level</label>
      <input type="number" v-model="group_address_level" />
      <!-- Group address file<input type="checkbox" v-model="group_address_file"/> -->
      <label>Header</label>
      <input type="checkbox" v-model="header" />
      <label>Payload</label>
      <input type="checkbox" v-model="payload" />
      <button @click="addItem()">Add</button>
    </div>

    <div v-else>
      <label>Policy name</label>
      <input type="text" v-model="policy_name" />
      <label>Detection</label>
      <input type="checkbox" v-model="detection" />
      <label>Inspection</label>
      <input type="checkbox" v-model="inspection" />
      <label>Individual addressing</label>
      <input type="checkbox" v-model="individual_addressing" />
      <label>SEARCH_REQUEST</label>
      <input type="checkbox" v-model="SEARCH_REQUEST" />
      <label>DESCRIPTION_REQUEST</label>
      <input type="checkbox" v-model="DESCRIPTION_REQUEST" />
      <label>A individualAddress write</label>
      <input type="checkbox" v-model="A_IndividualAddress_Write" />
      <label>A individualAddress read</label>
      <input type="checkbox" v-model="A_IndividualAddress_Read" />
      <label>Group address level</label>
      <input type="number" v-model="group_address_level" />
      <!-- Group address file<input type="checkbox" v-model="group_address_file"/> -->
      <label>Header</label>
      <input type="checkbox" v-model="header" />
      <label>Payload</label>
      <input type="checkbox" v-model="payload" />
      <button @click="updateItem(selectedItem)">Update</button>
    </div>

    <div v-for="(item, i) in itemList" :key="item._id">
      <div>{{ ++i }}</div>
      <div>{{ item.policy_name }}</div>
      <div>{{ item.detection }}</div>
      <div>{{ item.inspection }}</div>
      <div>{{ item.individual_addressing }}</div>
      <div>{{ item.SEARCH_REQUEST }}</div>
      <div>{{ item.DESCRIPTION_REQUEST }}</div>
      <div>{{ item.A_IndividualAddress_Write }}</div>
      <div>{{ item.A_IndividualAddress_Read }}</div>
      <div>{{ item.group_address_level }}</div>
      <!-- <div>Log file{{ item.group_address_file }}</div> -->
      <div>{{ item.header }}</div>
      <div>{{ item.payload }}</div>
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
      policy_name: "",
      detection: "",
      inspection: "",
      individual_addressing: "",
      SEARCH_REQUEST: "",
      DESCRIPTION_REQUEST: "",
      A_IndividualAddress_Write: "",
      A_IndividualAddress_Read: "",
      group_address_level: "",
      // group_address_file: "",
      header: "",
      payload: "",
      itemList: [],
      edit: false,
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/policyList/");
    this.itemList = response.data;
    // console.log(this.itemList);
  },
  methods: {
    async addItem() {
      const response = await axios.post(
        "http://localhost:8081/api/policyList/",
        {
          policy_name: this.policy_name,
          detection: this.detection,
          inspection: this.inspection,
          individual_addressing: this.individual_addressing,
          SEARCH_REQUEST: this.SEARCH_REQUEST,
          DESCRIPTION_REQUEST: this.DESCRIPTION_REQUEST,
          A_IndividualAddress_Write: this.A_IndividualAddress_Write,
          A_IndividualAddress_Read: this.A_IndividualAddress_Read,
          group_address_level: this.group_address_level,
          //  group_address_file: this.group_address_file,
          header: this.header,
          payload: this.payload,
        }
      );
      this.itemList.push(response.data);
      this.policy_name = "";
      this.detection = "";
      this.inspection = "";
      this.individual_addressing = "";
      this.SEARCH_REQUEST = "";
      this.DESCRIPTION_REQUEST = "";
      this.A_IndividualAddress_Write = "";
      this.A_IndividualAddress_Read = "";
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
        policy_name: this.policy_name,
        detection: this.detection,
        inspection: this.inspection,
        individual_addressing: this.individual_addressing,
        SEARCH_REQUEST: this.SEARCH_REQUEST,
        DESCRIPTION_REQUEST: this.DESCRIPTION_REQUEST,
        A_IndividualAddress_Write: this.A_IndividualAddress_Write,
        A_IndividualAddress_Read: this.A_IndividualAddress_Read,
        group_address_level: this.group_address_level,
        //  group_address_file: this.group_address_file,
        header: this.header,
        payload: this.payload,
      });
      this.edit = false;
      const response = await axios.get("http://localhost:8081/api/policyList/");
      this.itemList = response.data;
    },
    editItem(i, item) {
      console.log(item);
      this.edit = true;
      this.policy_name = item.policy_name;
      this.detection = item.detection;
      this.inspection = item.inspection;
      this.individual_addressing = item.individual_addressing;
      this.SEARCH_REQUEST = item.SEARCH_REQUEST;
      this.DESCRIPTION_REQUEST = item.DESCRIPTION_REQUEST;
      this.A_IndividualAddress_Write = item.A_IndividualAddress_Write;
      this.A_IndividualAddress_Read = item.A_IndividualAddress_Read;
      this.group_address_level = item.group_address_level;
      // this.group_address_file=item.group_address_file;
      this.header = item.header;
      this.payload = item.payload;
      this.selectedItem = item;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
