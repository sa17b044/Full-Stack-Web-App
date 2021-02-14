<template>
  <div class="card mt-3">
    <h2 class="mb-2">Users</h2>
    <div class="cardIn center">
      <div v-if="!edit">
        <label>User Name</label>
        <div class="row">
          <div class="col">
            <input type="text" v-model="user_name" />
          </div>
        </div>
        <label>Password</label>
        <div class="row">
          <div class="col">
            <input :type="type" v-model="password" />
            <button class="btn btn-secondary" @click="showPassword()">
              {{btnText}}
            </button>
          </div>
        </div>

        <label>Confirm password</label>
        <div class="row">
          <div class="col">
            <input :type="type" v-model="conf_password" />
            <button class="btn btn-secondary" @click="showPassword()">
              {{btnText}}
            </button>
          </div>
        </div>
        <div v-if="msg">
          <div class="alert alert-danger">{{ textMsg }}</div>
        </div>
        <label>Roles</label>
        <div class="row">
          <div class="col">
            <select v-model="role">
              <option value="Admin">Admin</option>
              <option value="Read-Only">Read-Only</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button class="btn btn-primary" @click="addItem()">Add</button>
          </div>
        </div>
      </div>

      <div v-else>
        <label>User Name</label>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" v-model="user_name" />
          </div>
        </div>
        <label>Password</label>
        <div class="row">
          <div class="col">
            <input
              :type="type"
              class="form-control"
              v-model="password"
            /><button class="btn btn-secondary" @click="showPassword()">
              {{btnText}}
            </button>
          </div>
        </div>
        <label>Confirm password</label>
        <div class="row">
          <div class="col">
            <div>
              <input
                :type="type"
                class="form-control"
                v-model="conf_password"
              /><button class="btn btn-secondary" @click="showPassword()">
                {{btnText}}
              </button>
            </div>
          </div>
        </div>
        <div v-if="msg">
          <div class="alert alert-danger">{{ textMsg }}</div>
        </div>
        <label>Role</label>
        <div class="row">
          <div class="col">
            <select class="form-control" v-model="role">
              <option value="Admin">Admin</option>
              <option value="Read-Only">Read-Only</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button class="btn btn-success" @click="updateItem(selectedItem)">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="cardIn">
      <div class="row title">
        <div class="col-1">#</div>
        <div class="col-2">User name</div>
        <div class="col-2">Password</div>
        <div class="col-2">Role</div>
      </div>
      <div v-for="(item, i) in itemList" :key="item._id">
        <div class="line">
          <div class="row">
            <div class="col-1">{{ ++i }}</div>
            <div class="col-2">{{ item.userName }}</div>
            <div class="col-2">{{ item.password }}</div>
            <div class="col-2">{{ item.role }}</div>
            <div class="col-3">
              <div class="btn-group">
                <button class="btn btn-warning" @click="editItem(i, item)">
                  Edit
                </button>
                <button class="btn btn-danger" @click="removeItem(item, i)">
                  Remove
                </button>
              </div>
            </div>
          </div>
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
      edit: false,
      user_name: "",
      password: "",
      conf_password: "",
      role: "",
      itemList: [],
      selectedItem: "",
      msg: false,
      textMsg: "",
      type: "password",
      btnText: "Show"
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/userList/");
    this.itemList = response.data;
  },
  methods: {
    async addItem() {
      if (this.password == this.conf_password) {
        const response = await axios.post(
          "http://localhost:8081/api/userList/",
          {
            userName: this.user_name,
            password: this.password,
            role: this.role
          }
        );
        this.itemList.push(response.data);
        this.user = "";
        this.password = "";
        this.conf_password = "";
        this.role = "";
        this.msg = false;
      } else {
        // console.log(this.msg)
        this.msg = true;
        // console.log(this.msg)
        this.textMsg = "Password wrong";
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
        role: this.role
      });
      this.edit = false;
      this.user = "";
      this.password = "";
      this.conf_password = "";
      this.role = "";
      const response = await axios.get("http://localhost:8081/api/userList/");
      this.itemList = response.data;
    },

    editItem(i, item) {
      this.edit = true;
      this.user_name = item.userName;
      this.password = item.password;
      this.role = item.role;
      this.selectedItem = item;
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.btnText = "Hide";
      } else {
        this.type = "password";
        this.btnText = "Show";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
label {
  margin-bottom: 2px;
  font-weight: bold;
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
.cardIn {
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 15px;
  padding: 25px;
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
  margin: 0px;
}

input[type="password"] {
  width: 20%;
}
input[type="text"] {
  width: 20%;
}
.alert {
  width: 20%;
}
.form-control {
  width: 15%;
  margin-bottom: 5px;
}
input {
  border: 2px solid black;
}
.btn {
  border: 2px solid black;
  border-radius: 15px;
}
.line {
  border-top: 2px solid black;
}
.title {
  font-size: 20px;
}
</style>
