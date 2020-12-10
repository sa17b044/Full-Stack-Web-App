<template>
  <div class="container">
    <div v-if="!edit">
      <!-- <div class="input-group mb-3"> -->
      <!-- <div class="input-group-prepend"> -->
      <span class="input-group-text">User Name</span>
      <!-- </div> -->
      <input type="text" class="form-control" v-model="user_name" />
      <!-- </div> -->
      <!-- <div class="input-group mb-3"> -->
      <!-- <div class="input-group-prepend"> -->
      <span class="input-group-text">Password</span>
      <!-- </div> -->
      <input type="text" class="form-control" v-model="password" />
      <!-- </div> -->
      <!-- <div class="input-group mb-3">
        <div class="input-group-prepend"> -->
      <span class="input-group-text">Confirm password</span>
      <!-- </div> -->
      <input type="text" class="form-control" v-model="conf_password" />
      <!-- </div> -->
      <!-- <div class="input-group mb-3">
        <div class="input-group-prepend"> -->
      <label class="input-group-text">Permissions</label>
      <!-- </div> -->
      <select class="custom-select" v-model="permission">
        <!-- <option selected>Choose...</option> -->
        <option value="admin">Admin</option>
        <option value="readOnly">Read only</option>
      </select>
      <!-- </div> -->
      <button class="btn btn-primary" @click="addItem()">Add</button>
    </div>
    <div v-else>
      <span class="input-group-text">User Name</span>
      <input type="text" class="form-control" v-model="user_name" />
      <span class="input-group-text">Password</span>
      <input type="text" class="form-control" v-model="password" />
      <span class="input-group-text">Confirm password</span>
      <input type="text" class="form-control" v-model="conf_password" />
      <label class="input-group-text">Permissions</label>
      <select class="custom-select" v-model="permission">
        <option value="Admin">Admin</option>
        <option value="Read only">Read only</option>
      </select>
      <button class="btn btn-success" @click="updateItem(selectedItem)">
        Update
      </button>
    </div>
    <div v-for="(item, i) in itemList" :key="item._id">
      {{ ++i }}
      {{ item.userName }}
      {{ item.password }}
      {{ item.permission }}
      <button class="btn btn-warning" @click="editItem(i, item)">Edit</button>
      <button class="btn btn-danger" @click="removeItem(item, i)">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      edit: false,
      user_name: "",
      password: "",
      conf_password: "",
      permission: "",
      itemList: [],
      selectedItem: "",
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/userList/");
    this.itemList = response.data;
  },
  methods: {
    async addItem() {
      const response = await axios.post("http://localhost:8081/api/userList/", {
        userName: this.user_name,
        password: this.password,
        permission: this.permission,
      });
      this.itemList.push(response.data);
      this.user = "";
      this.password = "";
      this.conf_password = "";
      this.permission = "";
    },
    async removeItem(item, i) {
      // console.log("#", item, i);
      await axios.delete("http://localhost:8081/api/userList/" + item._id);
      this.itemList.splice(i, 1);
      const response = await axios.get("http://localhost:8081/api/userList/");
      this.itemList = response.data;
    },
    async updateItem(item) {
      await axios.put("http://localhost:8081/api/userList/" + item._id, {
        userName: this.user_name,
        password: this.password,
        permission: this.permission,
      });
      this.edit = false;
      const response = await axios.get("http://localhost:8081/api/userList/");
      this.itemList = response.data;
    },

    editItem(i,item) {
      this.edit = true;
      this.user_name = item.userName;
      this.password = item.password;
      this.permission = item.permission;
      this.selectedItem = item;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button.configure {
  color: unset;
  background-color: unset;
  border: unset;
}
</style>
