"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Book } from "@/types/Book";
import { books as allBooks } from "@/lib/books";
import { handleImageError } from "@/utils/imageHandlers";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DetailPageProps {
  params: {
    year: string;
    month: string;
  };
}

export default function DetailPage({ params }: DetailPageProps) {
  const { year, month } = params;
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const handleImageErrorTag = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    id: string
  ) => {
    handleImageError(event, id, setErrorImages);
  };

  const filteredBooks = allBooks.filter((book: Book) => {
    const bookDate = new Date(book.Date);
    return (
      bookDate.getFullYear() === parseInt(year) &&
      bookDate.getMonth() + 1 === parseInt(month)
    );
  });

  const booksByDate = filteredBooks.reduce(
    (acc: { [key: string]: Book[] }, book: Book) => {
      const day = new Date(book.Date).getDate().toString();
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(book);
      return acc;
    },
    {}
  );

  const shortenWriterName = (writer: string) => {
    const maxLength = 50;
    if (writer.length > maxLength) {
      return writer.substring(0, maxLength) + "...";
    }
    return writer;
  };

  const getPrevMonthLink = () => {
    const currentYear = parseInt(year as string);
    const currentMonth = parseInt(month as string);
    const newDate = new Date(currentYear, currentMonth - 2, 1);
    const newYear = newDate.getFullYear();
    const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");
    return `/book/${newYear}/${newMonth}`;
  };

  const getNextMonthLink = () => {
    const currentYear = parseInt(year as string);
    const currentMonth = parseInt(month as string);
    const newDate = new Date(currentYear, currentMonth, 1);
    const newYear = newDate.getFullYear();
    const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");
    return `/book/${newYear}/${newMonth}`;
  };

  const viewDetail = (date: Book) => {
    router.push(`/book/detail/${date.ID}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-20 px-10">
      <div className="flex items-center justify-between mb-8 pt-10 px-4">
        <Link href={getPrevMonthLink()}>
          <div className="text-2xl text-gray-600 hover:text-gray-800 transition duration-200 cursor-pointer mr-4">
            <ChevronLeft className="w-6 h-6" />
          </div>
        </Link>
        <h1 className="text-2xl font-bold mx-4">
          {year}. {month}.
        </h1>
        <Link href={getNextMonthLink()}>
          <div className="text-2xl text-gray-600 hover:text-gray-800 transition duration-200 cursor-pointer ml-4">
            <ChevronRight className="w-6 h-6" />
          </div>
        </Link>
      </div>
      <div className="space-y-8">
        {Object.keys(booksByDate).map((day) => (
          <div key={day}>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">{day}일</h3>
            <ul className="flex flex-wrap gap-4">
              {booksByDate[day].map((book: Book, index: number) => (
                <li
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 w-48 cursor-pointer text-gray-900 hover:shadow-lg transition-shadow"
                  onClick={() => viewDetail(book)}
                >
                  <Image
                    src={
                      errorImages[book.ID]
                        ? "/covers/default.png"
                        : `/covers/${year}/${month}/${book.ID}.jpg`
                    }
                    alt={book.Title || "Default Image"}
                    className="w-full h-64 object-cover mb-3 rounded-lg"
                    width={256}
                    height={256}
                    unoptimized
                    onError={(event) => handleImageErrorTag(event, book.ID)}
                  />
                  <p className="font-semibold text-sm leading-snug break-words">{book.Title}</p>
                  <p className="text-xs text-gray-500 mt-1">{shortenWriterName(book.Writer)}</p>
                  {(book.PartOfSeries || book.SeriesNumber) && (
                    <p className="text-xs text-primary mt-0.5">
                      {book.PartOfSeries && book.SeriesNumber
                        ? `${book.PartOfSeries} ${book.SeriesNumber}`
                        : book.PartOfSeries || book.SeriesNumber}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
