const os = require('os');
const fs = require('fs');

setInterval(() => {
  const info = {
    cpu: os.cpus()[0].model,
    memory: `${(os.totalmem() / 1024 / 1024).toFixed(0)}MB total, ${(os.freemem() / 1024 / 1024).toFixed(0)}MB free`,
    platform: os.platform()
  };
  const log = `${new Date().toISOString()}: CPU: ${info.cpu}, Memory: ${info.memory}, Platform: ${info.platform}\n`;
  fs.appendFile('system.log', log, (err) => {
    if (err) console.error('Log error:', err);
  });
}, 5000);
