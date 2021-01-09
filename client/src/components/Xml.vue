<template>
  <div class="container">
    <h2>XML</h2>
    <label>Upload a file</label>
    <input 
    type="file" 
    @change="onFileSelected" 
    style="display: none"
    ref="fileInput" />
    <button class="btn btn-light" @click="$refs.fileInput.click()">Upload </button>
    <button @click="onUploadFile()" class="btn btn-warning">Send</button>
    <!-- <div class="row">
      <div class="form-group card col-2" v-for="(input, k) in inputs" :key="k">
        <label class="form-label mt-1">GroupAddress Name</label>
        <input type="text" class="form-control" v-model="input.name" />
        <label class="form-label mt-1">Address</label>
        <input type="text" class="form-control" v-model="input.address" />
        <label class="form-label mt-1">DPTs</label>
        <input type="text" class="form-control" v-model="input.dpts" />
        <label class="form-label mt-1">Max Temp</label>
        <input type="number" class="form-control" v-model="input.max" />
        <label class="form-label mt-1">Min Temp</label>
        <input type="number" class="form-control" v-model="input.min" />
        <label class="form-label mt-1">ia</label>
        <input type="text" class="form-control" v-model="input.ia" />
        <label class="form-label mt-1">Central</label>
        <input
          type="checkbox"
          v-model="input.central"
          class="form-check-input"
          checked="true"
        />
        <div class="mt-2">
          <span class="btn-group">
            <button
              class="btn alert-success"
              @click="add(k)"
              v-show="k == inputs.length - 1"
            >
              <img src="../assets/plus.png" alt="add" />
            </button>
            <button
              class="btn alert-danger"
              @click="remove(k)"
              v-show="k || (!k && inputs.length > 1)"
            >
              <img src="../assets/minus.png" alt="delete" />
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <button class="btn btn-primary" @click="save()">Save</button>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selectedFile: null
      // inputs: [
      //   {
      //     name: "",
      //     address: "",
      //     dpts: "",
      //     max: "",
      //     min: "",
      //     ia: "",
      //     central: ""
      //   }
      // ]
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile)
    },
    async onUploadFile() {
      const fd = new FormData();
      fd.append("file", this.selectedFile, this.selectedFile.name);
      const response = await axios.post("http://localhost:8081/api/xmlList/",fd, {
        headers: { "content-type": "multipart/form-data" }
      });
      console.log(response)
    }
    // add(index) {
    //   this.inputs.push({
    //     name: "",
    //     address: "",
    //     dpts: "",
    //     max: "",
    //     min: "",
    //     ia: "",
    //     central: ""
    //   });
    // },
    // remove(index) {
    //   this.inputs.splice(index, 1);
    // },
    // async save() {
    //   const response = await axios.post("http://localhost:8081/api/xmlList/", {
    //     inputs: this.inputs
    //   });
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
input[type="number"] {
  width: 33%;
}
/* input[type="text"] {
  width: 100%;
} */
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
.btn {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.card {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 15px;
  padding: 15px;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
  margin: 1px;
}
.col-3 {
  font-weight: bold;
  padding-left: 38px;
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
