"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import booksData from "../../../../../public/data/books.json";
import { Book } from "@/types/Book";
import { useBackNavigation } from "@/utils/navigation";
import { handleImageError } from "@/utils/imageHandlers";

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

  const backNavigation = useBackNavigation();

  const handleBackNavigation = () => {
    backNavigation();
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-36 px-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-32 px-10">
      <button
        onClick={handleBackNavigation}
        className="absolute top-4 left-4 text-blue-500 hover:text-blue-700 mb-4 flex items-center pt-28"
      >
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Back
      </button>
      <div className="w-full max-w-4x1 text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-4">{book.Title}</h1>
        <div className="text-gray-500 space-x-1 mb-2">
          <span>{book.PartOfSeries}</span>
          <span>{book.SeriesNumber}</span>
        </div>
        <div className="text-gray-500 flex flex-wrap justify-center space-x-4 text-sm md:text-base">
          <div className="flex items-center space-x-1 mb-2">
            <span>{book.Writer}</span>
          </div>
          <div className="flex items-center space-x-1 mb-2">
            <span>{book.Publisher}</span>
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
