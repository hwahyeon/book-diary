"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import booksData from "@public/data/books.json";
import { Book } from "@/types/Book";
import { handleImageError } from "@/utils/imageHandlers";
import Image from "next/image";

function AllListPageContent() {
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState({
    search: "",
    writer: "",
    partOfSeries: "",
    language: "",
    publisher: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setFilters({
      search: params.get("search") || "",
      writer: params.get("writer") || "",
      partOfSeries: params.get("partOfSeries") || "",
      language: params.get("language") || "",
      publisher: params.get("publisher") || "",
    });
  }, [searchParams]);

  const handleImageErrorTag = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    id: string
  ) => {
    handleImageError(event, id, setErrorImages);
  };

  const shortenWriterName = (writer: string) => {
    const maxLength = 50;
    return writer.length > maxLength
      ? writer.substring(0, maxLength) + "..."
      : writer;
  };

  const viewDetail = (book: Book) => {
    router.push(`/book/detail/${book.ID}`);
  };

  const updateQueryParams = () => {
    const query = new URLSearchParams();
    if (filters.search) query.set("search", filters.search);
    if (filters.writer) query.set("writer", filters.writer);
    if (filters.partOfSeries) query.set("partOfSeries", filters.partOfSeries);
    if (filters.language) query.set("language", filters.language);
    if (filters.publisher) query.set("publisher", filters.publisher);
    router.push(`?${query.toString()}`);
  };

  const normalizedBooksData: Book[] = booksData.map((book) => ({
    ...book,
    BookFormat:
      typeof book.BookFormat === "number"
        ? book.BookFormat
        : typeof book.BookFormat === "string"
        ? parseInt(book.BookFormat, 10) || 0
        : 0,
  }));

  const filteredBooks = normalizedBooksData.filter((book: Book) => {
    const matchesSearch =
      !filters.search ||
      book.Title.includes(filters.search) ||
      book.Writer.includes(filters.search) ||
      book.Publisher?.includes(filters.search) ||
      false ||
      book.PartOfSeries?.includes(filters.search) ||
      false;

    const matchesLanguage =
      !filters.language ||
      (book.Language &&
        book.Language.split(" · ").some((lang) => lang === filters.language));

    return (
      !!matchesSearch &&
      !!matchesLanguage &&
      (!filters.writer || book.Writer.includes(filters.writer)) &&
      (!filters.partOfSeries ||
        book.PartOfSeries?.includes(filters.partOfSeries)) &&
      (!filters.publisher || book.Publisher === filters.publisher)
    );
  });

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-20 px-10">
      <div className="flex items-center justify-between mb-8 pt-10 px-4">
        <h1 className="text-2xl font-bold mx-4">All Books</h1>
      </div>
      <div className="mb-8 w-full max-w-screen-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="border px-4 py-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
          {/* <button
            className="bg-accent text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-accent/80 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={updateQueryParams}
          >
            Search
          </button> */}
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-4 w-full max-w-screen-lg">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Writer"
            className="border px-4 py-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
            value={filters.writer}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, writer: e.target.value }))
            }
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Part of Series"
            className="border px-4 py-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
            value={filters.partOfSeries}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, partOfSeries: e.target.value }))
            }
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <select
            className="border px-4 py-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
            value={filters.language}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, language: e.target.value }))
            }
          >
            <option value="">Select Language</option>
            <option value="한국어">한국어</option>
            <option value="English">English</option>
            <option value="Deutsch">Deutsch</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Publisher"
            className="border px-4 py-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
            value={filters.publisher}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, publisher: e.target.value }))
            }
          />
        </div>
        {/* <button
          className="bg-accent text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-accent/70 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={updateQueryParams}
        >
          Apply Filters
        </button> */}
      </div>

      <div>
        <div className="space-y-6">
          <ul className="flex flex-wrap gap-4">
            {filteredBooks.map((book: Book, index: number) => {
              const [year, month] = book.Date.split("-");
              return (
                <li
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 w-48 cursor-pointer"
                  onClick={() => viewDetail(book)}
                >
                  <Image
                    src={
                      errorImages[book.ID]
                        ? "/covers/default.png"
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
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function AllListPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllListPageContent />
    </Suspense>
  );
}
