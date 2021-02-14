<template>
  <div class="card mt-3">
    <h2>Welcome</h2>

    <label for="usernam">Usernam</label>
    <input type="text" v-model="userName" />

    <label for="password">Password</label>
    <input type="password" v-model="password" />
    
    <button class="btn btn-primary" @click="login()">Login</button>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const response = await axios.post(
        "http://localhost:8081/auth/login/",
        {
          userName: this.userName,
          password: this.password
        }
      );
      this.password = NULL;
      this.userName = NULL;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="password"] {
  width: 30%;
}
input[type="text"] {
  width: 30%;
}
select {
  width: 30%;
}
input,
select,
button {
  border: 2px solid black;
}
.btn {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.card {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
  margin: 1px;
  margin-right: -35%;
}
.cardIn {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
  margin: 0px;
  /* margin-right: -15%; */
}
.col-3 {
  font-weight: bold;
}
h2 {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: aliceblue;
  border-radius: 15px;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: -5px;
  margin-bottom: -5px ;

}
label {
  margin-bottom: 2px;
  font-weight: bold;
}
img {
  width: 17px;
  height: auto;
}
.row{
border-bottom: 2px solid black;
}
</style>




