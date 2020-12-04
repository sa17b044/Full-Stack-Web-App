<template>
  <div>
    <h1>Login</h1>
    <label for="user">Username</label>
    <input type="text" v-model="user" /><br />
    <label for="pass">Password</label>
    <input type="password" v-model="pass" /><br />
    <button @click="login">Login</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      credentials: []
    };
  },
  methods: {
    async login() {
      this.credentials = {
        user: this.user,
        pass: this.pass
      };
      try {
              // console.log(this.credentials);
      const response = await AuthenticationService.login(this.credentials);
      this.error = false;
      } catch (error) {
        console.log('Error');
        this.error = error.response.data.error;
        this.error = true;
      }
      // console.log(res.data);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
