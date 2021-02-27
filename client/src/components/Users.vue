<template>
  <div class="card mt-3">
    <h2 class="mb-2">Users</h2>
    <div class="row cardIn">
      <div class="col-4 l">
        <div v-if="!edit">
          <div class="row">
            <label>User Name</label>
            <div class="col">
              <input type="text" v-model="user_name" />
            </div>
          </div>
          <div class="row">
            <label>Password</label>
            <div class="col">
              <input :type="type" v-model="password" />
              <button class="btn btn-secondary show" @click="showPassword()">
                {{ btnText }}
              </button>
            </div>
          </div>
          <div class="row">
            <label>Confirm password</label>
            <div class="col">
              <input :type="type" v-model="conf_password" />
              <button class="btn btn-secondary show" @click="showPassword()">
                {{ btnText }}
              </button>
            </div>
          </div>
          <div v-if="msg">
            <div class="alert alert-danger">{{ textMsg }}</div>
          </div>
          <div class="row">
            <label>Roles</label>
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
          <div class="row">
            <label>User Name</label>
            <div class="col">
              <input type="text" v-model="user_name" />
            </div>
          </div>

          <div class="row">
            <label>Password</label>
            <div class="col">
              <input :type="type" v-model="password" /><button
                class="btn btn-secondary show"
                @click="showPassword()"
              >
                {{ btnText }}
              </button>
            </div>
          </div>

          <div class="row">
            <label>Confirm password</label>
            <div class="col">
              <div>
                <input :type="type" v-model="conf_password" /><button
                  class="btn btn-secondary show"
                  @click="showPassword()"
                >
                  {{ btnText }}
                </button>
              </div>
            </div>
          </div>
          <div v-if="msg">
            <div class="alert alert-danger">{{ textMsg }}</div>
          </div>

          <div class="row">
            <label>Role</label>
            <div class="col">
              <select v-model="role">
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
      <div class="col-8 l">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Password</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in itemList" :key="item._id">
              <th scope="row">{{ ++i }}</th>
              <td>{{ item.username }}</td>
              <td>{{ item.password }}</td>
              <td>{{ item.role }}</td>

              <td>
                <div class="btn-group">
                  <button class="btn btn-warning" @click="editItem(i, item)">
                    Edit
                  </button>
                  <button class="btn btn-danger" @click="removeItem(item, i)">
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
            username: this.user_name,
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
        username: this.user_name,
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
      this.user_name = item.username;
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
  },
  created() {
    if (localStorage.getItem("token") === null) this.$router.push("/login");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
select {
  width: 30%;
  border-radius: 7px;
  background-color: white;
  border: 2px solid black;
}
input::-webkit-input-placeholder {
  font-size: 12px;
  line-height: 2;
}
.show {
  font-size: 10px;
  padding: 5px;
}
.l {
  border: solid tomato 2px;
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
.alert {
  width: 30%;
}
.form-control {
  width: 15%;
  margin-bottom: 5px;
}
.btn {
  border: 2px solid black;
  border-radius: 15px;
}
</style>
