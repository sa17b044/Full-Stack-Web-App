<template>
  <div>
    <h1>Users</h1>
    <input type="text" name="user" v-model="user" />
    <input type="password" name="pass" v-model="pass" />
    <button @click="addUser">Add</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data() {
    return {
      user: "",
      pass: "",
      users:[]
    };
  },
  methods: {
    async addUser() {
    let newUser = {
        user: this.user,
        pass: this.pass,
      };
    const res = await AuthenticationService.addUser(newUser)
    console.log(res.data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
/* eslint-disable */
