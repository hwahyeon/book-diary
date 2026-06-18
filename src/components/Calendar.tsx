"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Book } from "../types/Book";
import { handleImageError } from "../utils/imageHandlers";

interface CalendarProps {
  books: Book[];
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getCalendarDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days: Date[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(new Date(year, month - 1, daysInPrevMonth - i));
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
}

const BookCalendar: React.FC<CalendarProps> = ({ books }) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const delta = touchEndX.current - touchStartX.current;
    if (Math.abs(delta) > 70) {
      delta > 0 ? handlePrevMonth() : handleNextMonth();
    }
  };

  const handleDayClick = (date: Date, booksForDate: Book[]) => {
    if (booksForDate.length === 0) return;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    if (booksForDate.length === 1) {
      router.push(`/book/detail/${booksForDate[0].ID}`);
    } else {
      router.push(`/book/${year}/${month}/${day}`);
    }
  };

  const days = getCalendarDays(currentYear, currentMonth);
  const monthLabel = new Date(currentYear, currentMonth).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <button
          onClick={handlePrevMonth}
          className="p-2 text-primary hover:text-accent transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-primary">{monthLabel}</h2>
        <button
          onClick={handleNextMonth}
          className="p-2 text-primary hover:text-accent transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className={`py-2 text-center text-xs font-medium ${
              i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-gray-500"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentMonth;
          const isToday = date.toDateString() === today.toDateString();
          const dateKey = date.toDateString();
          const isHovered = hoveredDate === dateKey;
          const isSunday = date.getDay() === 0;
          const isSaturday = date.getDay() === 6;

          const booksForDate = books.filter(
            (book) => new Date(book.Date).toDateString() === dateKey
          );
          const hasBooks = booksForDate.length > 0;

          return (
            <div
              key={index}
              className={`relative border-b border-r border-gray-100 h-24 sm:h-32 md:h-36 flex flex-col overflow-hidden
                ${!isCurrentMonth ? "bg-gray-50" : "bg-white"}
                ${hasBooks ? "cursor-pointer" : ""}
              `}
              onMouseEnter={() => hasBooks && setHoveredDate(dateKey)}
              onMouseLeave={() => setHoveredDate(null)}
              onClick={() => handleDayClick(date, booksForDate)}
            >
              {/* Book covers (full tile) */}
              {hasBooks && (
                <div className={`absolute inset-0 ${!isCurrentMonth ? "opacity-40 grayscale" : ""}`}>
                  {isHovered ? (
                    <div className="flex h-full">
                      {booksForDate.map((book, i) => {
                        const [y, m] = book.Date.split("-");
                        return (
                          <div key={i} className="relative flex-1 h-full">
                            <Image
                              src={errorImages[book.ID] ? "/covers/default.png" : `/covers/${y}/${m}/${book.ID}.jpg`}
                              alt={book.Title}
                              fill
                              sizes="100px"
                              className="object-cover"
                              onError={(e) => handleImageError(e, book.ID, setErrorImages)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={
                          errorImages[booksForDate[0].ID]
                            ? "/covers/default.png"
                            : `/covers/${booksForDate[0].Date.split("-")[0]}/${booksForDate[0].Date.split("-")[1]}/${booksForDate[0].ID}.jpg`
                        }
                        alt={booksForDate[0].Title}
                        fill
                        sizes="100px"
                        className="object-cover"
                        onError={(e) => handleImageError(e, booksForDate[0].ID, setErrorImages)}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Date number (overlay) */}
              <span
                className={`relative z-10 text-[10px] sm:text-xs m-1 w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0
                  ${isToday ? "bg-accent text-white font-bold" : ""}
                  ${hasBooks
                    ? isToday ? "" : "bg-black/30 text-white"
                    : !isCurrentMonth ? "text-gray-300" : isSunday ? "text-red-400" : isSaturday ? "text-blue-400" : "text-gray-700"
                  }
                `}
              >
                {date.getDate()}
              </span>

              {/* +N badge */}
              {hasBooks && !isHovered && booksForDate.length > 1 && (
                <span className="absolute top-1 right-1 z-10 bg-accent text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  +{booksForDate.length - 1}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookCalendar;
