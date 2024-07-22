'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/globals.css';

interface Book {
  title: string;
  date: string;
  cover: string;
}

const BookCalendar: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const groupBooksByMonth = (books: Book[]) => {
    return books.reduce((acc, book) => {
      const month = new Date(book.date).toISOString().substring(0, 7); // YYYY-MM 형식
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(book);
      return acc;
    }, {} as Record<string, Book[]>);
  };

  const booksByMonth = groupBooksByMonth(books);
  const currentMonthBooks = booksByMonth[currentDate.toISOString().substring(0, 7)] || [];

  const getTileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const book = currentMonthBooks.find(book => book.date === date.toISOString().split('T')[0]);
      if (book) {
        return <img src={book.cover} alt={book.title} className="w-full h-full object-cover rounded" />;
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const book = currentMonthBooks.find(book => book.date === date.toISOString().split('T')[0]);
      return book ? 'book-title' : '';
    }
    return '';
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <Calendar
        locale="en-US"
        value={currentDate}
        onActiveStartDateChange={({ activeStartDate }) => setCurrentDate(activeStartDate || new Date())}
        tileContent={getTileContent}
        tileClassName={tileClassName}
        className="react-calendar"
      />
    </div>
  );
};

export default BookCalendar;
