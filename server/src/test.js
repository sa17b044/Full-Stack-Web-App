
const cmd = 'sudo /opt/snort-sabic/bin/snort -c /opt/snort-sabic/etc/snort.lua -i ens33 -A alert_full -d -X -e -s 65535 -k none'
console.log(cmd)
const { exec } = require('child_process');
exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});