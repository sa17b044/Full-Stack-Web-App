<template>
  <div class="card mt-3">
    <h2 class="mb-2">Welcome</h2>

    <div class="cardIn">
      <div class="row">
        <div class="col-4 "><div class="imgLogin"></div></div>
        <div class="col-8 ">
          <input type="text" v-model="userame" placeholder="Username" class="mb-1"/>
          <label for="username">Username</label>
<br>
          <input type="password" v-model="password" placeholder="Password" class="mb-1"/>
          <label for="password">Password</label>
<br>
          <button class="btn btn-primary ml-3 mb-1" @click="login()">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userame: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async login() {
      await axios
        .post("http://localhost:8081/auth/login", {
          username: this.userame,
          password: this.password
        })
        .then(res => {
          console.log("#");
          if (res.status === 200) {
            // console.log(res.data.role)
            localStorage.setItem("token", res.data.token);
            if (res.data.role !== "Admin") {
              console.log("online");
              this.$router.push("/online");
            } else {
              console.log("home");
              this.$router.push("/home");
            }
          }
        });
      this.password = "";
      this.userame = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="password"] {
  width: 30%;
  border-radius: 7px;
  outline: none;
}
input[type="text"] {
  width: 30%;
  border-radius: 7px;
  outline: none;
}
input,
input::-webkit-input-placeholder {
  font-size: 12px;
  line-height: 2;
  padding: 3px;
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
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.card {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 7px;
  padding: 25px;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
  margin: 1px;
  margin-right: -35%;
}
.cardIn {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 7px;
  padding: 25px;
  /* padding-left: 30%; */
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
  margin: 0px;
  /* margin-right: -15%; */
}
.col-8 {
  padding: 12%;
}
.line {
  border: solid black 2px;
}
h2 {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: aliceblue;
  border-radius: 15px;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: -5px;
  margin-bottom: -5px;
}
label {
  margin-bottom: 2px;
  font-weight: bold;
}
.imgLogin {
  background-image: url("../assets/technology.jpg");
  background-repeat: no-repeat;
  width: 540px;
  height: 500px;
  background-size: cover;
  border-radius: 7px;
  border: solid 3px black;
}
</style>
