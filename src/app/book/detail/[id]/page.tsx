"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { books } from "@/lib/books";
import { handleImageError } from "@/utils/imageHandlers";
import Link from "next/link";
import Image from "next/image";

const BookDetailPage: React.FC = () => {
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});
  const params = useParams();
  const { id } = params;

  const book = books.find((b) => b.ID === id) ?? null;

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center py-36 px-10">
        Loading...
      </div>
    );
  }

  const bookFormatLabel = [null, "E-Book", "Audiobook"][book.BookFormat ?? 0];
  const typeLabel = book.Type === "M" ? "Magazine" : "Book";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-32 px-10">
      <div className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-4">{book.Title}</h1>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">{typeLabel}</span>
          {bookFormatLabel && (
            <span className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent font-medium">{bookFormatLabel}</span>
          )}
        </div>

        <div className="text-gray-500 space-x-1 mb-2">
          {book.PartOfSeries && (
            <Link
              href={`/book/all?partOfSeries=${encodeURIComponent(book.PartOfSeries)}`}
              className="text-primary hover:underline"
            >
              {book.PartOfSeries}
            </Link>
          )}
          {book.SeriesNumber !== 0 && <span>{book.SeriesNumber}</span>}
        </div>
        <div className="text-gray-500 flex flex-wrap justify-center space-x-4 text-sm md:text-base">
          <div className="flex items-center space-x-1 mb-2">
            <Link href={`/book/all?writer=${encodeURIComponent(book.Writer)}`} className="text-primary hover:underline">
              {book.Writer}
            </Link>
          </div>
          {book.Publisher && (
            <div className="flex items-center space-x-1 mb-2">
              <Link
                href={`/book/all?publisher=${encodeURIComponent(book.Publisher)}`}
                className="text-primary hover:underline"
              >
                {book.Publisher}
              </Link>
            </div>
          )}
          {book.PublicationDate && (
            <div className="flex items-center space-x-1 mb-2">
              <span>{book.PublicationDate}</span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-4xl flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 p-4 flex justify-center">
          <div className="max-w-xs w-full h-72 overflow-hidden flex items-center justify-center">
            <Image
              src={
                errorImages[book.ID]
                  ? "/covers/default.png"
                  : `/covers/${book.Date.split("-")[0]}/${book.Date.split("-")[1]}/${book.ID}.jpg`
              }
              alt={book.Title}
              className="rounded-lg shadow-lg object-cover h-full"
              width={256}
              height={256}
              unoptimized
              onError={(e) => handleImageError(e, book.ID, setErrorImages)}
            />
          </div>
        </div>
        <div className="w-full lg:w-2/3 p-4">
          <div className="mb-4 space-y-1">
            {book.PrintLength !== undefined && book.PrintLength !== 0 && (
              <div><span className="font-semibold">Pages:</span> {book.PrintLength}</div>
            )}
            {book.Language && (
              <div><span className="font-semibold">Language:</span> {book.Language}</div>
            )}
            {book.ISBN && (
              <div><span className="font-semibold">ISBN:</span> {book.ISBN}</div>
            )}
            {book.Location && (
              <div><span className="font-semibold">Location:</span> {book.Location}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
