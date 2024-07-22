import { NextResponse } from 'next/server';
import { openDB } from '../../../db/db';

export async function GET() {
  const db = await openDB();
  if (!db) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
  const books = await db.all('SELECT * FROM books');
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, date, cover, partOfSeries, printLength, language, publisher, publicationDate, isbn, description } = body;
  
  const db = await openDB();
  if (!db) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
  
  try {
    const result = await db.run(
      'INSERT INTO books (title, date, cover, partOfSeries, printLength, language, publisher, publicationDate, isbn, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, date, cover, partOfSeries, printLength, language, publisher, publicationDate, isbn, description]
    );
    return NextResponse.json({ id: result.lastID });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to insert book' }, { status: 500 });
  }
}
