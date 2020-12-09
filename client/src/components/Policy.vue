<template>
  <div class="container">
    <div class="container card">
      <div class="m-2">
        <h4>Add Policy</h4>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
              Policy Name</span
            >
          </div>
          <input
            type="text"
            v-model="policy_name"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
              Detection</span
            >
            <div class="input-group-text">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
                v-model="detection"
              />
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
              Inspection</span
            >
            <div class="input-group-text">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
                v-model="inspection"
              />
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
              Individual addressing</span
            >
            <div class="input-group-text">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
                v-model="individual_addressing"
              />
            </div>
          </div>
        </div>
        <label>Services</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
              Search Requesrt</span
            >
            <div class="input-group-text">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
                v-model="SEARCH_REQUEST"
              />
            </div>
          </div>
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
              Description Requesrt</span
            >
            <div class="input-group-text">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
                v-model="DESCRIPTION_REQUEST"
              />
            </div>
          </div>
        </div>
        <label>App services</label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
              A individual address write</span
            >
            <div class="input-group-text">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
                v-model="A_IndividualAddress_Write"
              />
            </div>
          </div>
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
              A individual address read</span
            >
            <div class="input-group-text">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
                v-model="A_IndividualAddress_Read"
              />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Group address level</label>
          <input
            type="number"
            min="0"
            max="5"
            step="1"
            class="form-control-range"
            id="formControlRange"
            v-model="group_address_level"
          />
        </div>
        <!-- <div>
          <label>Group address file</label>
          <input type="file" name="group_address_file" />
        </div> -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
              Header</span
            >
            <div class="input-group-text">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
                v-model="header"
              />
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
              Payload</span
            >
            <div class="input-group-text">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
                v-model="payload"
              />
            </div>
          </div>
        </div>
        <button class="btn btn-primary" @click="addItem()">Add</button>
      </div>
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
    };
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
          // group_address_file: this.group_address_file,
          header: this.header,
          payload: this.payload,
        }
      );
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
