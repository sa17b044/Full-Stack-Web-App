<template>
  <div class="card mt-3">
    <div v-if="!edit">
      <label>User Name</label>
      <input type="text" class="form-control" v-model="user_name" />
      <label>Password</label>
      <input type="text" class="form-control" v-model="password" />
      <label>Confirm password</label>
      <input type="text" class="form-control" v-model="conf_password" />
      <div v-if="msg">
        <div class="alert alert-danger">{{textMsg}}</div>
      </div>
      <label>Permissions</label>
      <select class="form-control" v-model="permission">
        <option value="admin">Admin</option>
        <option value="readOnly">Read only</option>
      </select>

      <button class="btn btn-primary" @click="addItem()">Add</button>
    </div>
    <div v-else>
      <label>User Name</label>
      <input type="text" class="form-control" v-model="user_name" />
      <label>Password</label>
      <input type="text" class="form-control" v-model="password" />
      <label>Confirm password</label>
      <input type="text" class="form-control" v-model="conf_password" />
      <div v-if="msg">
        <div class="alert alert-danger">{{textMsg}}</div>
      </div>
      <label>Permissions</label>
      <select class="form-control"  v-model="permission">
        <option value="Admin">Admin</option>
        <option value="Read only">Read only</option>
      </select>
      <button class="btn btn-success" @click="updateItem(selectedItem)">
        Update
      </button>
    </div>
    <div v-for="(item, i) in itemList" :key="item._id">
      <div class="cardIn">
      {{ ++i }}
      {{ item.userName }}
      {{ item.password }}
      {{ item.permission }}
      <button class="btn btn-warning" @click="editItem(i, item)">Edit</button>
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
      msg:false,
      textMsg:''
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/userList/");
    this.itemList = response.data;
  },
  methods: {
    async addItem() {
      if (this.password == this.conf_password) {
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
      this.msg = false
      } else{
        // console.log(this.msg)
        this.msg = true
        // console.log(this.msg)
        this.textMsg = "Password wrong"
      }

    },
    async removeItem(item, i) {
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
      this.user = "";
      this.password = "";
      this.conf_password = "";
      this.permission = "";
      const response = await axios.get("http://localhost:8081/api/userList/");
      this.itemList = response.data;
    },

    editItem(i, item) {
      this.edit = true;
      this.user_name = item.userName;
      this.password = item.password;
      this.permission = item.permission;
      this.selectedItem = item;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="number"] {
  width: 40%;
}
input[type="text"] {
  width: 50%;
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
  margin-bottom: -5px;
}
label {
  margin-bottom: 2px;
  font-weight: bold;
}
img {
  width: 17px;
  height: auto;
}
.row {
  border-bottom: 2px solid black;
}
</style>
