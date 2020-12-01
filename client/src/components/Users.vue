<template>
  <div>
    <h1>Users</h1>
    <div v-if="!isEditing">
      <input type="text" name="user" v-model="user" />
      <input type="password" name="pass" v-model="pass" />
      <select id="permission" v-model="selected">
        <option value="admin">Admin</option>
        <option value="basic">Read Only User</option>
      </select>
      <input type="submit" value="Add" @click="storeUser" />
    </div>
    <div v-else>
      <label for="userName">User Name</label>
      <input type="text" v-model="user" />
      <label for="password">User Password</label>
      <input type="text" v-model="pass" />
      <label for="permission">Permission</label>
      <select id="permission" v-model="selected">
        <option value="admin">Admin</option>
        <option value="basic">Read Only User</option>
      </select>
      <input type="submit" value="Update" @click="updateUser" />
    </div>
    <div v-for="(user, index) in users">
      <ul>
        <li>{{ user.user }} </li>
        <li>{{ user.pass }}</li>
        <li> {{ user.selected }}</li>
        <li>
          <button @click="editUser(index, user.user, user.pass, user.selected)">
            Edit
          </button>
        </li>
        <li>
          <button @click="removeUser(index)">Delete</button>
        </li>
      </ul>
    </div>
    <button @click="dbStoreUser">Database</button>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  data() {
    return {
      user: "",
      pass: "",
      selected: "",
      users: [],
      selectedUser: null,
      isEditing: false,
    };
  },
  methods: {
    storeUser() {
      let newUser = {
        user: this.user,
        pass: this.pass,
        selected: this.selected,
      };
      this.users.push(newUser);
      this.user = "";
      this.pass = "";
      this.selected = "";
    },

    removeUser(index) {
      this.users.splice(index, 1);
    },

    updateUser() {
      let newUser = {
        user: this.user,
        pass: this.pass,
        selected: this.selected,
      };
      this.users.splice(this.selectedIndex, 1, newUser);
      this.user = "";
      this.pass = "";
      this.selected = "";
      this.isEditing = false;
    },

    editUser(index, user, pass, selected) {
      this.isEditing = true;
      this.user = user;
      this.pass = pass;
      this.selected = selected;
      this.selectedIndex = index;
    },
    async dbStoreUser() {
      console.log(this.users);
      const res = await AuthenticationService.dbStoreUser(this.users);
      console.log(res.data);
      console.log(res);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
