import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const initializeDB = async () => {
  const db = await open({
    filename: './my-database.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      date TEXT,
      cover TEXT,
      partOfSeries TEXT,
      printLength INTEGER,
      language TEXT,
      publisher TEXT,
      publicationDate TEXT,
      isbn TEXT,
      description TEXT
    );
  `);

  console.log('Database initialized');
};

initializeDB().catch((err) => {
  console.error('Failed to initialize database:', err);
});