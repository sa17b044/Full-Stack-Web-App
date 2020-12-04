<template>
  <div class="container">
    <!-- <div class="row"> -->
      <div class="d-flex flex-column bd-highlight mb-3">
        <label>Source IP address</label>
        <input type="text" name="src_ip" placeholder="0.0.0.0/0" />
        <label>Source Port</label>
        <input type="number" name="src_port" />
        <label>Destination IP address</label>
        <input type="text" name="dst_ip" placeholder="0.0.0.0/0" />
        <label>Destination Port</label>
        <input type="number" name="dst_port" />
        <label>Policy</label>
        <input type="number" name="policy" />
        <label>Log KNXnetip</label>
        <input type="checkbox" name="logKNXnetip" value="logKNXnetip" />
        <label>Log to file</label>
        <input type="checkbox" name="logToFile" value="logToFile" />
        <input type="submit" value="Save" />
      </div>
    </div>
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
