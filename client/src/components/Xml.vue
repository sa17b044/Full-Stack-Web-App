<template>
  <div class="container card bg-light">
    <h2>XML</h2>
    <div class="row">
      <div class="form-group card col-4" v-for="(input, k) in inputs" :key="k">
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
        <div class="mt-1">
          <span class="btn-group">
            <button
              class="btn btn-primary"
              @click="add(k)"
              v-show="k == inputs.length - 1"
            >
              Add
            </button>
            <button
              class="btn btn-danger"
              @click="remove(k)"
              v-show="k || (!k && inputs.length > 1)"
            >
              Delete
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <button class="btn btn-success" @click="save()">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputs: [
        {
          name: "",
          address: "",
          dpts: "",
          max: "",
          min: "",
          ia: ""
        }
      ]
    };
  },
  methods: {
    add(index) {
      this.inputs.push({ name: "" });
      // console.log(this.inputs);
    },
    remove(index) {
      this.inputs.splice(index, 1);
    },
    save() {
      console.log(this.inputs);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="number"] {
  width: 20%;
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
.btn{
  border-radius: 13px;
}
.card {
  background-color: aliceblue;
  border-radius: 15px;
  padding: 15px;
  border: 2px solid black;
}
.col-3 {
  font-weight: bold;
  padding-left: 30px;
}
h2 {
  text-align: center;
}
label {
  font-weight: bold;
}
</style>
