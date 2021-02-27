<template>
  <div class="card mt-3">
    <h2>Logs Online</h2>
    <div id="output" class="m-5">
      <!-- <p v-for="(par, index) of pars" :key="index">
        {{ par }}
      </p> -->
      <div class="cardIn">
        <div class="alert-danger alert"></div>
        <div class="alert-light alert"></div>
        <div class="alert-danger alert"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      output: ""
    };
  },
  computed: {
    pars() {
      return this.output.split("\n");
    }
  },
  async mounted() {
    console.log("1");
    let sse = new EventSource("http://localhost:8081/active");
    console.log("2");
    sse.addEventListener("message", output => {
      const data = JSON.parse(output.data);
      console.log(data);
    });
    console.log("3");
    await axios.get("http://localhost:8081/active");
  },
    created(){
    if(localStorage.getItem('token') === null)
    this.$router.push('/login')
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
  margin: 1px;
  /* margin-right: -15%; */
}
.col-3 {
  font-weight: bold;
}
h2 {
  text-align: center;
}
label {
  margin-bottom: 2px;
  font-weight: bold;
}
img {
  width: 17px;
  height: auto;
}
.alert {
  font-weight: bold;
  border: solid 2px;
  border-radius: 10px;
  margin: -5px;
  padding: 15px;
}
</style>
