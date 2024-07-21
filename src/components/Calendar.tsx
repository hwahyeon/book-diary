"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../app/globals.css';

interface Book {
    title: string;
    date: string;
    cover: string;
  }
  
  interface CalendarProps {
    books: Book[];
  }
  
  const BookCalendar: React.FC<CalendarProps> = ({ books }) => {
    const getTileContent = ({ date, view }: { date: Date, view: string }) => {
      if (view === 'month') {
        const book = books.find(book => book.date === date.toISOString().split('T')[0]);
        if (book) {
          return <img src={book.cover} alt={book.title} className="w-full h-full object-cover rounded" />;
        }
      }
      return null;
    };
  
    const tileClassName = ({ date, view }: { date: Date, view: string }) => {
      if (view === 'month') {
        const book = books.find(book => book.date === date.toISOString().split('T')[0]);
        return book ? 'book-title' : '';
      }
      return '';
    };
  
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <Calendar
          locale="en-US"
          tileContent={getTileContent}
          tileClassName={tileClassName}
          className="react-calendar"
        />
      </div>
    );
  };
  
  export default BookCalendar;