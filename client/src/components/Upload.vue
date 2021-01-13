<template>
  <div class="card mt-3">
    <h2>Upload</h2>
    <ul>
      <li><a href="">XML</a></li>
      <li>
        <a href="">pcap</a>
      </li>
    </ul>

    <div class="row">
      <div class="col-2">
        <div class="cardIn">
          <label class="mb-2">Upload a XML file</label>
          <br />
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
      <div class="col-2">
        <div class="cardIn">
          <label class="mb-2">Upload a pcap file</label>
          <br />
          <input
            type="file"
            @change="onFileSelectedPcap"
            style="display: none"
            ref="fileInputPcap"
          />
          <button class="btn btn-info" @click="$refs.fileInputPcap.click()">
            Upload
          </button>
          <button @click="onUploadFilePcap()" class="btn btn-warning">
            Send
          </button>
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
    onFileSelectedPcap(event) {
      this.selectedFilePcap = event.target.files[0];
      console.log(this.selectedFilePcap);
      console.log("###############");
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
    async onUploadFilePcap() {
      const fd = new FormData();
      fd.append("filePcap", this.selectedFilePcap, this.selectedFilePcap.name);
      const response = await axios.post(
        "http://localhost:8081/api/xmlList/pcap",
        fd,
        {
          headers: { "content-type": "multipart/form-data" }
        }
      );
      console.log(response);
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
