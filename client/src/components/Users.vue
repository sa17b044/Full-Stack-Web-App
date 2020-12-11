<template>
  <label class="container">
    <label v-if="!edit">
      <label>User Name</label>
      <input type="text" class="form-control" v-model="user_name" />
      <label>Password</label>
      <input type="text" class="form-control" v-model="password" />
      <label>Confirm password</label>
      <input type="text" class="form-control" v-model="conf_password" />
      <label>Permissions</label>
      <select class="form-control" v-model="permission">
        <option value="admin">Admin</option>
        <option value="readOnly">Read only</option>
      </select>
      <button class="btn btn-primary" @click="addItem()">Add</button>
    </label>
    <label v-else>
      <label>User Name</label>
      <input type="text" class="form-control" v-model="user_name" />
      <label>Password</label>
      <input type="text" class="form-control" v-model="password" />
      <label>Confirm password</label>
      <input type="text" class="form-control" v-model="conf_password" />
      <label>Permissions</label>
      <select class="form-control"  v-model="permission">
        <option value="Admin">Admin</option>
        <option value="Read only">Read only</option>
      </select>
      <button class="btn btn-success" @click="updateItem(selectedItem)">
        Update
      </button>
    </label>
    <label v-for="(item, i) in itemList" :key="item._id">
      {{ ++i }}
      {{ item.userName }}
      {{ item.password }}
      {{ item.permission }}
      <button class="btn btn-warning" @click="editItem(i, item)">Edit</button>
      <button class="btn btn-danger" @click="removeItem(item, i)">
        Remove
      </button>
    </label>
  </label>
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

    editItem(i, item) {
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
