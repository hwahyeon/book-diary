"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import booksData from "@public/data/books.json";
import { Book } from "@/types/Book";
import { handleImageError } from "@/utils/imageHandlers";
import Link from "next/link";

const BookDetailPage: React.FC = () => {
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});
  const [book, setBook] = useState<Book | null>(null);
  const params = useParams();
  const { id } = params;

  const handleImageErrorTag = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    id: string
  ) => {
    handleImageError(event, id, setErrorImages);
  };

  useEffect(() => {
    if (id) {
      const foundBook = booksData.find((book) => book.ID === id);
      setBook(foundBook || null);
    }
  }, [id]);


  if (!book) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center py-36 px-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-32 px-10">
      <div className="w-full max-w-4x1 text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-4">{book.Title}</h1>
        <div className="text-gray-500 space-x-1 mb-2">
          <Link
            href={`/book/all?partOfSeries=${encodeURIComponent(
              book.PartOfSeries || ""
            )}`}
          >
            <span>{book.PartOfSeries}</span>
          </Link>
          <span>{book.SeriesNumber}</span>
        </div>
        <div className="text-gray-500 flex flex-wrap justify-center space-x-4 text-sm md:text-base">
          <div className="flex items-center space-x-1 mb-2">
            <Link href={`/book/all?writer=${encodeURIComponent(book.Writer)}`}>
              <span>{book.Writer}</span>
            </Link>
          </div>
          <div className="flex items-center space-x-1 mb-2">
            <Link
              href={`/book/all?publisher=${encodeURIComponent(book.Publisher)}`}
            >
              <span>{book.Publisher}</span>
            </Link>
          </div>
          <div className="flex items-center space-x-1 mb-2">
            <span>{book.PublicationDate}</span>
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 p-4 flex justify-center">
          <div className="max-w-xs w-full h-70 overflow-hidden flex items-center justify-center">
            <img
              src={
                errorImages[book.ID]
                  ? "/covers/default.png"
                  : `/covers/${book.Date.split("-")[0]}/${
                      book.Date.split("-")[1]
                    }/${book.ID}.jpg`
              }
              alt={book.Title}
              className="rounded-lg shadow-lg object-cover h-full"
              onError={(event) => handleImageErrorTag(event, book.ID)}
            />
          </div>
        </div>
        <div className="w-full lg:w-2/3 p-4">
          <div className="mb-1">
            <div className="mb-1">
              <span className="font-semibold">Pages:</span> {book.PrintLength}
            </div>
            <div className="mb-1">
              <span className="font-semibold">Language:</span> {book.Language}
            </div>
            <div className="mb-4">
              <span className="font-semibold">ISBN:</span> {book.ISBN}
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{book.Description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
