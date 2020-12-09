import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Users from "@/components/Users";
import Rules from "@/components/Rules";
import Servers from "@/components/Servers";
import Server from "@/components/Server";
import Policies from "@/components/Policies";
import Policy from "@/components/Policy";
import Logs from "@/components/Logs";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
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
      path: "/server",
      name: "Server",
      component: Server
    },
    {
      path: "/policies",
      name: "Policies",
      component: Policies
    },
    {
      path: "/policy",
      name: "Policy",
      component: Policy
    },
    {
      path: "/logs",
      name: "Logs",
      component: Logs
    }
  ]
});
