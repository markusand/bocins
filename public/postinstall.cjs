const fs = require('node:fs');
const path = require('path');

const origin = path.join(__dirname, 'icons');
const destination = path.join(process.env.INIT_CWD, 'public/icons');

console.log(`Install Bocins icons from ${origin} to ${destination}`);

if (fs.existsSync(origin)) {
  fs.cpSync(origin, destination, {
    recursive: true,
    force: false,
  });
}
