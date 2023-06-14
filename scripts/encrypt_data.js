require('dotenv').config({ path: '../.env.local' });
const AES = require('crypto-js/aes');
const fs = require('fs');
const file = 'cards_data.js';
const path = './' + file;

const key = process.env.VITE_APP_ENCRYPT_SECRET;

if (!fs.existsSync(path)) {
  console.log(`Need file ${file}`);
  process.exit(1);
}

if (!key) {
  console.log('Key is not set in env');
  process.exit(1);
}

const data = require(path);
const text = JSON.stringify(data);
const result = AES.encrypt(text, key).toString();

const output = `export const the_cards = "${result}";\n`;
fs.writeFileSync('../src/domain/cards.ts', output);

console.log(`\ncards.ts file has been created with key ${key}`);
