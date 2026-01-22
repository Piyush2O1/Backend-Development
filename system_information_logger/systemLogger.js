const os = require("os");
const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "system-info.log");

function logSystemInfo() {
  const timestamp = new Date().toISOString();

  const cpuInfo = os.cpus();
  const memoryTotal = (os.totalmem() / 1024 / 1024).toFixed(2); // MB
  const memoryFree = (os.freemem() / 1024 / 1024).toFixed(2);   // MB

  const systemInfo = `
[${timestamp}]
Platform   : ${os.platform()}
Architecture: ${os.arch()}
CPU Model  : ${cpuInfo[0].model}
CPU Cores  : ${cpuInfo.length}
Total Memory: ${memoryTotal} MB
Free Memory : ${memoryFree} MB
---------------------------------------
`;

  fs.appendFile(logFile, systemInfo, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}


setInterval(logSystemInfo, 5000);

console.log("System Information Logger started...");
