<template>
  <div class="container">
    <!-- <input type="text" name="user" v-model="user" />
    <input type="password" name="pass" v-model="pass" />
    <select id="permission" v-model="permision">
      <option value="admin">Admin</option>
      <option value="basic">Read Only User</option>
    </select>
    <button @click="addUser">Add</button>
    <br />
    <div v-for="(userItem, i) in userList" :key="userItem._id">
      <div v-if="selectedUser._id === userItem._id">
        <input type="text" v-model="editedUser" />
        <input type="text" v-model="editedPass" />
        <input type="text" v-model="editedPermision" />
        <button @click="updateItem(userItem, i)">Update</button>
        <button class="configure" @click="removeUser(userItem, i)">
          Remove
        </button>
      </div>
      <div v-else>
        <span>{{ i + 1 }}</span>
        <span> {{ userItem.userName }} </span>
        <span>{{ userItem.password }} </span>
        <span> {{ userItem.permision }} </span>
        <button class="configure" @click="select(userItem)">Edit</button>
        <button class="configure" @click="removeUser(userItem, i)">
          Remove
        </button>
      </div>
    </div> -->
    <div v-if="!edit">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">User Name</span>
        </div>
        <input type="text" class="form-control" v-model="user_name" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Password</span>
        </div>
        <input type="text" class="form-control" v-model="password" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Confirm password</span>
        </div>
        <input type="text" class="form-control" v-model="conf_password" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Permissions</label>
        </div>
        <select class="custom-select" v-model="permission">
          <option selected>Choose...</option>
          <option value="admin">Admin</option>
          <option value="readOnly">Read only</option>
        </select>
      </div>
      <button class="btn btn-primary" @click="addItem()">Add</button>
    </div>
    <div v-else>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">User Name</span>
        </div>
        <input type="text" class="form-control" v-model="user_name" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Password</span>
        </div>
        <input type="text" class="form-control" v-model="password" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Confirm password</span>
        </div>
        <input type="text" class="form-control" v-model="conf_password" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Permissions</label>
        </div>
        <select class="custom-select" v-model="permission">
          <option selected>Choose...</option>
          <option value="admin">Admin</option>
          <option value="readOnly">Read only</option>
        </select>
      </div>
      <!-- {{ selectedItem._id }} -->
      <button class="btn btn-success" @click="updateItem(selectedItem)">
        Update
      </button>
    </div>

    <!-- {{itemList}} -->
    <div v-for="(item, i) in itemList" :key="item._id">
      <div class="alert-info">
        {{ ++i }}# {{ item.userName }}# {{ item.password }}#
        {{ item.permission }}
        <button
          class="btn btn-warning"
          @click="
            editItem(i, item.userName, item.password, item.permission, item)
          "
        >
          Edit
        </button>
        <button class="btn btn-danger" @click="removeItem(item, i)">
          Remove
        </button>
      </div>
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
      console.log("#", item, i);
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

    editItem(i, user_name, password, permission, item) {
      this.edit = true;
      this.user_name = user_name;
      this.password = password;
      this.permission = permission;
      this.selectedItem = item;
      console.log(item, this.selectedItem);
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
