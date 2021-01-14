import Vue from "vue";
import Router from "vue-router";
// import Login from "@/components/Login";
import Users from "@/components/Users";
import Xml from "@/components/Xml";
import Policies from "@/components/Policies";
import Log from "@/components/Log";
// import Tools from "@/components/Tools";
// import Ping from "@/components/Ping";
import Home from "@/components/Home";
// import Nmap from "@/components/Nmap";
import Upload from "@/components/Upload"

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    // {
    //   path: "/ping",
    //   name: "ping",
    //   component: Ping
    // },
    // {
    //   path: "/tools",
    //   name: "tools",
    //   component: Tools
    // },
    {
      path: "/users",
      name: "Users",
      component: Users
    },
    {
      path: "/xml",
      name: "Xml",
      component: Xml
    },
    {
      path: "/policies",
      name: "Policies",
      component: Policies
    },
    // {
    //   path: "/nmap",
    //   name: "Nmap",
    //   component: Nmap
    // },
    {
      path: "/log",
      name: "Log",
      component: Log
    },
    {
      path: "/upload",
      name: "Upload",
      component: Upload
    },
  ]
});
