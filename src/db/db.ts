import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database | null = null;

export const openDB = async () => {
  if (!db) {
    db = await open({
      filename: './my-database.db',
      driver: sqlite3.Database
    });
  }
  return db;
};
