<template>
  <div class="card mt-3">
    <h2>Home</h2>
    <div class="row">
      <div class="col">
        <a href="/#/inspection">Inspection</a>
      </div>
      <div class="col">
        <a href="/#/Log">Log</a>
      </div>
      <div class="col">
        <a href="/#/Upload">Upload</a>
      </div>
      <div class="col"><a href="/#/users">Users</a></div>
      <div class="col"><a href="/#/users">Whois</a></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
    created(){
    if(localStorage.getItem('token') === null)
    this.$router.push('/login')
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
  margin: 1px;
  margin-right: -35%;
}
a {
  background-color: rgba(0, 0, 0, 0.35);
  height: 250px;
  display: flex;
  font-size: 50px;
  padding: 70px;
  padding-left: 70px;
  padding-right: 70px;
  flex-direction: column;
  border: 3px black solid;
  border-radius: 15px;
  text-align: center;
}
a:hover {
  color: aliceblue;
  border: 3px aliceblue solid;
  background-color: rgba(0, 0, 0);
}
.col {
  font-weight: bold;
  /* border: 2px solid black; */
  /* padding: 20px;
  padding-left: 160px; */
}
h2 {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: aliceblue;
  border-radius: 15px;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: -5px;
}
.btn {
  border-radius: 10px;
  border: black 2px solid;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 100px;
}
</style>
