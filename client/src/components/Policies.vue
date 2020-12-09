<template>
  <div>
    <div class="table-responsive-sm">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Src IP</th>
            <th scope="col">Src Port</th>
            <th scope="col">Des IP</th>
            <th scope="col">Des Port</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
    <a href="/#/policy">Add policy</a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      policy_name: "",
      detection: "",
      inspection: "",
      individual_addressing: "",
      SEARCH_REQUEST: "",
      DESCRIPTION_REQUEST: "",
      A_IndividualAddress_Write: "",
      A_IndividualAddress_Read: "",
      group_address_level: "",
      // group_address_file: "",
      header:"",
      payload:"",
      itemList:[]
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/policyList/");
    this.itemList = response.data;
    console.log(this.itemList);
  },
  // methods: {
  //   async removeItem(item, i) {
  //     await axios.delete("http://localhost:8081/api/serverList/" + item._id);
  //     this.serverList.splice(i, 1);
  //   },
  //   updateItem() {
  //     this.selectedItem = false;
  //     // this.server_name,
  //     // this.src_ip,
  //     // this.src_port,
  //     // this.dst_ip,
  //     // this.dst_port,
  //     // this.policy,
  //     // this.logKNXnetip,
  //     // this.logToFile,
  //   },
  //   editItem(item, i) {
  //     // console.log('#')
  //     this.selectedItem = true
  //     // await axios.put("http://localhost:8081/api/serverList/" + item._id, {
  //       // server_name = this.server_name
  //       // src_ip = this.src_ip
  //       // src_port= this.src_port
  //       // dst_ip= this.dst_ip
  //       // dst_port= this.dst_port
  //       // policy= this.policy
  //       // logKNXnetip= this.logKNXnetip
  //       // logToFile= this.logToFile
  //     // });
  //     // this.selectedItem = true
  //     // const response = await axios.get("http://localhost:8081/api/serverList/");
  //     // this.itemList = response.data;
  //     // this.selectedItem._id = -1;
  //   },
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
