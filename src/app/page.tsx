"use client";

import { useEffect, useState } from "react";
import BookCalendar from "../components/Calendar";
import { Book } from "../types/Book";
import booksData from "../../public/data/books.json";

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const transformedBooks: Book[] = booksData.map((book: any) => ({
      title: book.Title,
      date: book.Date,
      writer: book.Writer,
      partOfSeries: book.PartOfSeries,
      seriesNumber: Number(book.SeriesNumber),
      printLength: book.PrintLength,
      language: book.Language,
      publisher: book.Publisher,
      publicationDate: book.PublicationDate,
      isbn: book.ISBN,
      cover: book.Cover,
      description: book.Description,
    }));

    setBooks(transformedBooks);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">My Reading Calendar</h1>
      <BookCalendar books={books} />
    </div>
  );
};

export default HomePage;
