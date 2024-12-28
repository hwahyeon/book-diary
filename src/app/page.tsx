"use client";

import { useEffect, useState } from "react";
import booksData from "@public/data/books.json";
import { Book } from "../types/Book";
import { LatestPost } from "@/components/Latest";
import { FeaturePost } from "@/components/Feature";
import { IntroPost } from "@/components/Intro";

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
    <div className="bg-background pt-16 px-14 max-w-screen-xl mx-auto">
      <IntroPost />
      <FeaturePost />
      <LatestPost posts={books} />
    </div>
  );
};

export default HomePage;
