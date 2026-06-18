"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Book } from "@/types/Book";
import { books as normalizedBooks } from "@/lib/books";
import { handleImageError } from "@/utils/imageHandlers";
import Image from "next/image";
import { Search, X } from "lucide-react";

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
    setFilters({
      search: searchParams.get("search") || "",
      writer: searchParams.get("writer") || "",
      partOfSeries: searchParams.get("partOfSeries") || "",
      language: searchParams.get("language") || "",
      publisher: searchParams.get("publisher") || "",
    });
  }, [searchParams]);

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  const clearFilters = () => {
    setFilters({ search: "", writer: "", partOfSeries: "", language: "", publisher: "" });
    router.push("?");
  };

  const filteredBooks = normalizedBooks.filter((book) => {
    const q = filters.search.toLowerCase();
    const matchesSearch =
      !q ||
      book.Title.toLowerCase().includes(q) ||
      book.Writer.toLowerCase().includes(q) ||
      book.Publisher?.toLowerCase().includes(q) ||
      book.PartOfSeries?.toLowerCase().includes(q);

    const matchesLanguage =
      !filters.language ||
      book.Language?.split(" · ").some((lang) => lang === filters.language);

    return (
      !!matchesSearch &&
      !!matchesLanguage &&
      (!filters.writer || book.Writer.includes(filters.writer)) &&
      (!filters.partOfSeries || book.PartOfSeries?.includes(filters.partOfSeries)) &&
      (!filters.publisher || book.Publisher === filters.publisher)
    );
  });

  const inputClass =
    "border border-gray-200 bg-white px-4 py-2 rounded-lg w-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-6 pt-28 pb-16">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Books</h1>
          <p className="text-sm text-gray-500 mt-1">{filteredBooks.length} books</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, publisher..."
                className="border border-gray-200 bg-white pl-9 pr-4 py-2 rounded-lg w-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              />
            </div>

            {/* Secondary filters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Author"
                className={inputClass}
                value={filters.writer}
                onChange={(e) => setFilters((prev) => ({ ...prev, writer: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Series"
                className={inputClass}
                value={filters.partOfSeries}
                onChange={(e) => setFilters((prev) => ({ ...prev, partOfSeries: e.target.value }))}
              />
              <select
                className={inputClass}
                value={filters.language}
                onChange={(e) => setFilters((prev) => ({ ...prev, language: e.target.value }))}
              >
                <option value="">Language</option>
                <option value="한국어">한국어</option>
                <option value="English">English</option>
                <option value="Deutsch">Deutsch</option>
              </select>
              <input
                type="text"
                placeholder="Publisher"
                className={inputClass}
                value={filters.publisher}
                onChange={(e) => setFilters((prev) => ({ ...prev, publisher: e.target.value }))}
              />
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-3 flex items-center gap-1 text-xs text-gray-400 hover:text-accent transition-colors"
            >
              <X className="w-3 h-3" />
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-24 text-gray-400">No books found.</div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filteredBooks.map((book, index) => {
              const [year, month] = book.Date.split("-");
              return (
                <li
                  key={index}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group overflow-hidden"
                  onClick={() => router.push(`/book/detail/${book.ID}`)}
                >
                  <div className="relative w-full aspect-[2/3] overflow-hidden">
                    <Image
                      src={errorImages[book.ID] ? "/covers/default.png" : `/covers/${year}/${month}/${book.ID}.jpg`}
                      alt={book.Title || "Default Image"}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                      onError={(e) => handleImageError(e, book.ID, setErrorImages)}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                      {book.Title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 truncate">{book.Writer}</p>
                    {(book.PartOfSeries || book.SeriesNumber) && (
                      <p className="text-xs text-primary mt-0.5 truncate">
                        {book.PartOfSeries}{book.SeriesNumber ? ` ${book.SeriesNumber}` : ""}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function AllListPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-gray-400">Loading...</div>}>
      <AllListPageContent />
    </Suspense>
  );
}
