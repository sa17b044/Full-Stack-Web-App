<template>
  <div class="card mt-3">
    <h2>XML</h2>

    <div class="row">
      <div class="col-2">
        <div class="cardIn">
          <label class="mb-2">Upload a XML file</label>
          <input
            type="file"
            @change="onFileSelected"
            style="display: none"
            ref="fileInput"
          />
          <button class="btn btn-light" @click="$refs.fileInput.click()">
            Upload
          </button>
          <button @click="onUploadFile()" class="btn btn-warning">Send</button>
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
      selectedFile: null,
      selectedFilePcap: null
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    },
    async onUploadFile() {
      const fd = new FormData();
      fd.append("file", this.selectedFile, this.selectedFile.name);
      const response = await axios.post(
        "http://localhost:8081/api/xmlList/",
        fd,
        {
          headers: { "content-type": "multipart/form-data" }
        }
      );
      console.log(response);
    },
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
