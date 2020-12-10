import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Users from "@/components/Users";
import Rules from "@/components/Rules";
import Servers from "@/components/Servers";
import Policies from "@/components/Policies";
import Logs from "@/components/Logs";
import Tools from "@/components/Tools";
import Ping from "@/components/Ping";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/ping",
      name: "ping",
      component: Ping
    },
    {
      path: "/tools",
      name: "tools",
      component: Tools
    },
    {
      path: "/users",
      name: "Users",
      component: Users
    },
    {
      path: "/rules",
      name: "Rules",
      component: Rules
    },
    {
      path: "/servers",
      name: "Servers",
      component: Servers
    },
    {
      path: "/policies",
      name: "Policies",
      component: Policies
    },
    {
      path: "/logs",
      name: "Logs",
      component: Logs
    }
  ]
});
