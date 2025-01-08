"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Book } from "@/types/Book";
import booksData from "@public/data/books.json";
import { handleImageError } from "@/utils/imageHandlers";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DetailPageProps {
  params: {
    year: string;
    month: string;
    day: string;
  };
}

export default function DetailPage({ params }: DetailPageProps) {
  const { year, month, day } = params;
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();
  const handleImageErrorTag = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    id: string
  ) => {
    handleImageError(event, id, setErrorImages);
  };

  useEffect(() => {
    const transformedBooks: Book[] = (booksData as any).map((book: any) => ({
      ...book,
      SeriesNumber: parseInt(book.SeriesNumber, 10),
      PrintLength: parseInt(book.PrintLength, 10),
    }));

    setBooks(transformedBooks);
  }, []);

  const filteredBooks = books.filter((book: Book) => {
    const bookDate = new Date(book.Date);
    return (
      bookDate.getFullYear() === parseInt(year) &&
      bookDate.getMonth() + 1 === parseInt(month) &&
      bookDate.getDate() === parseInt(day)
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
    return `/book/${newYear}/${newMonth}/${day}`;
  };

  const getNextMonthLink = () => {
    const currentYear = parseInt(year as string);
    const currentMonth = parseInt(month as string);
    const newDate = new Date(currentYear, currentMonth, 1);
    const newYear = newDate.getFullYear();
    const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");
    return `/book/${newYear}/${newMonth}/${day}`;
  };

  const getPrevDayLink = () => {
    const currentYear = parseInt(year);
    const currentMonth = parseInt(month) - 1;
    const currentDay = parseInt(day);

    const newDate = new Date(currentYear, currentMonth, currentDay - 1);
    const newYear = newDate.getFullYear();
    const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");
    const newDay = String(newDate.getDate()).padStart(2, "0");
    return `/book/${newYear}/${newMonth}/${newDay}`;
  };

  const getNextDayLink = () => {
    const currentYear = parseInt(year);
    const currentMonth = parseInt(month) - 1;
    const currentDay = parseInt(day);

    const newDate = new Date(currentYear, currentMonth, currentDay + 1);
    const newYear = newDate.getFullYear();
    const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");
    const newDay = String(newDate.getDate()).padStart(2, "0");
    return `/book/${newYear}/${newMonth}/${newDay}`;
  };

  const viewDetail = (date: Book) => {
    router.push(`/book/detail/${date.ID}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center pb-20 px-10">
      <div className="flex items-center justify-between mb-8 pt-10 px-4">
        <Link href={getPrevMonthLink()}>
          <div className="text-2xl text-gray-600 hover:text-gray-800 transition duration-200 cursor-pointer mr-4">
            <ChevronsLeft className="w-6 h-6" />
          </div>
        </Link>
        <Link href={getPrevDayLink()}>
          <div className="text-2xl text-gray-600 hover:text-gray-800 transition duration-200 cursor-pointer mr-4">
            <ChevronLeft className="w-6 h-6" />
          </div>
        </Link>
        <h1 className="text-2xl font-bold mx-4">
          {year}. {month}. {day}.
        </h1>
        <Link href={getNextDayLink()}>
          <div className="text-2xl text-gray-600 hover:text-gray-800 transition duration-200 cursor-pointer ml-4">
            <ChevronRight className="w-6 h-6" />
          </div>
        </Link>
        <Link href={getNextMonthLink()}>
          <div className="text-2xl text-gray-600 hover:text-gray-800 transition duration-200 cursor-pointer ml-4">
            <ChevronsRight className="w-6 h-6" />
          </div>
        </Link>
      </div>
      <div>
        <div className="space-y-6">
          {Object.keys(booksByDate).map((day) => (
            <div key={day}>
              {/* <h3 className="text-lg font-semibold mb-2">{day}</h3> */}
              <ul className="flex flex-wrap gap-4">
                {booksByDate[day].map((book: Book, index: number) => (
                  <li
                    key={index}
                    className="bg-white shadow-md rounded-lg p-4 w-48 cursor-pointer"
                    onClick={() => viewDetail(book)}
                  >
                    <Image
                      src={
                        errorImages[book.ID]
                          ? "/default.png"
                          : `/covers/${year}/${month}/${book.ID}.jpg`
                      }
                      alt={book.Title || "Default Image"}
                      className="w-full h-64 object-cover mb-4 rounded-lg"
                      width={256}
                      height={256}
                      unoptimized
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
          ))}
        </div>
      </div>
    </div>
  );
}
