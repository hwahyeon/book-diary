"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../app/globals.css";
import { Book } from "../types/Book";

interface CalendarProps {
  books: Book[];
}

const BookCalendar: React.FC<CalendarProps> = ({ books }) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  const getTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const booksForDate = books.filter(
        (book) => new Date(book.date).toDateString() === date.toDateString()
      );
      if (booksForDate.length > 0) {
        return (
          <div
            className="calendar-tile cover"
            onMouseEnter={() => setHoveredDate(date.toDateString())}
            onMouseLeave={() => setHoveredDate(null)}
          >
            <div className="book-covers-container">
              {hoveredDate === date.toDateString() ? (
                booksForDate.map((book, index) => (
                  <div key={index} className="book-cover">
                    <img src={book.cover} alt={book.title} />
                  </div>
                ))
              ) : (
                <>
                  <div className="book-cover">
                    <img
                      src={booksForDate[0].cover}
                      alt={booksForDate[0].title}
                    />
                  </div>
                  {booksForDate.length > 1 && (
                    <div className="book-count">{booksForDate.length}+</div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div className="calendar-tile">
            <span className="date">{date.getDate()}</span>
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const booksForDate = books.filter(
        (book) => new Date(book.date).toDateString() === date.toDateString()
      );
      return booksForDate.length > 0 ? "calendar-tile-with-cover" : "";
    }
    return "";
  };

  return (
    <div>
      <Calendar
        tileContent={getTileContent}
        tileClassName={tileClassName}
        locale="en-US"
      />
    </div>
  );
};

export default BookCalendar;
