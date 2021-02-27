<template>
  <div class="card mt-3">
    <h2>XML</h2>

    <div class="row">
      <div class="col">
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
            XML
          </button>
          <button @click="onUploadFile()" class="btn btn-warning">
            Upload
          </button>
        </div>
        <div v-if="alert">
          <div class="alert alert-success">Done</div>
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
      selectedFilePcap: null,
      alert: false
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
      await axios.post("http://localhost:8081/api/xmlList/", fd, {
        headers: { "content-type": "multipart/form-data" }
      });
      this.alert = true;
      setTimeout(() => (this.alert = false), 1000);
    }
  },
    created(){
    if(localStorage.getItem('token') === null)
    this.$router.push('/login')
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
  margin: 1px;
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
</style>
