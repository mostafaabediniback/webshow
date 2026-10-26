import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root = path.resolve(import.meta.dirname, '../..');
const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'next/reports/original-files.json')));
const changed = Object.entries(snapshot).filter(([file, hash]) => {
  const target = path.join(root, file);
  return !fs.existsSync(target) || crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex') !== hash;
}).map(([file]) => file);
console.log(JSON.stringify({ checked: Object.keys(snapshot).length, changed }, null, 2));
if (changed.length) process.exitCode = 1;
