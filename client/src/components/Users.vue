<template>
  <div class="container">
    <input type="text" name="user" v-model="user" />
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: "",
      editedUser: "",
      pass: "",
      editedPass: "",
      permision: "",
      editedPermision: "",
      userList: [],
      selectedUser: "",
      selected: "",
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/userList/");
    this.userList = response.data;
  },
  methods: {
    async addUser() {
      const response = await axios.post("http://localhost:8081/api/userList/", {
        userName: this.user,
        password: this.pass,
        permision: this.permision,
      });
      this.userList.push(response.data);
      this.user = "";
      this.pass = "";
      this.permision = "";
    },
    async removeUser(user, i) {
      await axios.delete("http://localhost:8081/api/userList/" + user._id);
      this.userList.splice(i, 1);
    },
    select(user) {
      this.selectedUser = user;
      this.editedUser = user.userName;
      this.editedPass = user.password;
      this.editedPermision = user.permision;
    },
    isSelected(user) {
      return user._id === this.selected._id;
    },
    async updateItem(user, i) {
      await axios.put("http://localhost:8081/api/userList/" + user._id, {
        userName: this.editedUser,
        password: this.editedPass,
        permision: this.editedPermision,
      });
      const response = await axios.get("http://localhost:8081/api/userList/");
      this.userList = response.data;
      this.selectedUser._id = -1;
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
