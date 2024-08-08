"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import booksData from "../../../public/data/books.json";
import { Book } from "../../types/Book";
import { handleImageError } from "../../utils/imageHandlers";
import { useHomeNavigation } from "../../utils/navigation";

export default function AllListPage() {
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const handleImageErrorTag = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    id: string
  ) => {
    handleImageError(event, id, setErrorImages);
  };

  const shortenWriterName = (writer: string) => {
    const maxLength = 50;
    if (writer.length > maxLength) {
      return writer.substring(0, maxLength) + "...";
    }
    return writer;
  };

  const viewDetail = (date: Book) => {
    router.push(`/detail/${date.ID}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-5 px-10">
      <button
        onClick={useHomeNavigation()}
        className="absolute top-4 left-4 text-blue-500 hover:text-blue-700 mb-4 flex items-center"
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
        Back to Calendar
      </button>
      <div className="flex items-center justify-between mb-8 pt-10 px-4">
        <h1 className="text-2xl font-bold mx-4">전체 리스트</h1>
      </div>
      <div>
        <div className="space-y-6">
          <ul className="flex flex-wrap gap-4">
            {booksData.map((book: Book, index: number) => (
              <li
                key={index}
                className="bg-white shadow-md rounded-lg p-4 w-48 cursor-pointer"
                onClick={() => viewDetail(book)}
              >
                <img
                  src={
                    errorImages[book.ID]
                      ? "/default.png"
                      : `/data/covers/${book.ID}.jpg`
                  }
                  alt={book.Title}
                  className="w-full h-64 object-cover mb-4 rounded-lg"
                  onError={(event) => handleImageErrorTag(event, book.ID)}
                />
                <strong className="block whitespace-normal break-words">
                  {book.Title}
                </strong>
                <br />
                {shortenWriterName(book.Writer)} <br />
                <span className="text-sm text-gray-500">
                  {book.PartOfSeries && book.SeriesNumber
                    ? `${book.PartOfSeries} ${book.SeriesNumber}`
                    : book.PartOfSeries || book.SeriesNumber || ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
