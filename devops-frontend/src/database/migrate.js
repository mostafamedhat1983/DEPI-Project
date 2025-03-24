import sqlite3 from '@vscode/sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new sqlite3.Database('shop.db');

// Convert callback-based run to promise
const runAsync = promisify(db.run.bind(db));

// Enable foreign keys
await runAsync('PRAGMA foreign_keys = ON');

// Read and execute schema
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
await runAsync(schema);

console.log('Database migrations completed successfully');
db.close();