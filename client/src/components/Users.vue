<template>
  <div class="container">
    <input type="text" name="user" v-model="user" />
    <input type="password" name="pass" v-model="pass" />
    <select id="permission" v-model="permision">
      <option value="admin">Admin</option>
      <option value="basic">Read Only User</option>
    </select>
    <a v-on:click.prevent="addUser">Add</a>
    <br />
    <div v-for="(user, i) in userList" :key="user._id">
      <p>----------------------------------------------------------</p>
      <div v-if="selectedUser._id === user._id">
        <input type="text" v-model="editedUser" />
        <input type="text" v-model="editedPass" />
        <input type="text" v-model="editedPermision" />
        <a v-on:click.prevent="updateItem(user, i)">Update</a>
      </div>
      <div v-else>
        <p>
          <span>{{ i + 1 }}</span>
          <span> {{ user.userName }} </span>
          <span>{{ user.password }} </span>
          <span> {{ user.permision }} </span>
        </p>
      </div>
      <a v-on:click.prevent="select(user)"> Edit </a>
      <a v-on:click.prevent="removeUser(user, i)">Remove</a>
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
      console.log(user._id);
      await axios.delete("http://localhost:8081/api/userList/" + user._id);
      this.userList.splice(i, 1);
    },
    select(user) {
      this.selectedUser = user;
      this.editedUser = user.userName;
      this.editedPass = user.password;
      this.editedPermision = user.permision;
      console.log(user);
    },
    isSelected(user) {
      return user._id === this.selected._id;
    },
    async updateItem(user, i) {
      console.log("Test", this.userList, this.userList[i]);

      await axios.put("http://localhost:8081/api/userList/" + user._id, {
        userName: this.editedUser,
        password: this.editedPass,
        permision: this.editedPermision,
      });
      console.log('###')
      // this.userList[i] = response.data;
      const response = await axios.get(
        "http://localhost:8081/api/userList/"
      );
      this.userList = response.data;
      console.log(response.data)
      console.log('###')
      console.log(this.userList);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
