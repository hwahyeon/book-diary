"use client";

import { useEffect, useState } from "react";
import BookCalendar from "../components/Calendar";
import booksData from "../../public/data/books.json";
import { Book } from "../types/Book";

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const transformedBooks: Book[] = booksData.map((book: any) => ({
      ID: book.ID,
      Date: book.Date,
      Title: book.Title,
      Writer: book.Writer,
      PartOfSeries: book.PartOfSeries,
      SeriesNumber: Number(book.SeriesNumber),
      PrintLength: Number(book.PrintLength),
      Language: book.Language,
      Publisher: book.Publisher,
      PublicationDate: book.PublicationDate,
      ISBN: book.ISBN,
      Description: book.Description,
      BookFormat: book.BookFormat,
      Type: book.Type,
    }));

    setBooks(transformedBooks);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-32">
      <h1 className="text-3xl font-bold mt-2 mb-6">Home</h1>
    </div>
  );
};

export default HomePage;
