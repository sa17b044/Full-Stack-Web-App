<template>
  <div>
    <h1>XML</h1>
    <div class="form-group" v-for="(input, k) in inputs" :key="k">
      <input type="text" class="form-control" v-model="input.name" />
      <span>
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
</template>

<script>
export default {
  data() {
    return {
      inputs: [
        {
          name: ""
        }
      ]
    };
  },
  methods: {
    add(index) {
      this.inputs.push({ name: "" });
    },
    remove(index) {
      this.inputs.splice(index, 1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
