"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/types/Book";
import { handleImageError } from "@/utils/imageHandlers";

export function LatestPost({ posts }: { posts: Book[] | undefined }) {
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});

  const latestBooks = (posts || [])
    .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
    .slice(0, 4);

  return (
    <section className="py-20">
      <h2 className="text-xl font-bold mb-6">Books I&apos;ve Recently Read</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestBooks.map((book) => {
          const date = new Date(book.Date);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");

          return (
            <div key={book.ID} className="bg-white rounded-lg shadow p-4 text-gray-900">
              <div className="relative w-full h-64">
                <Image
                  src={errorImages[book.ID] ? "/covers/default.png" : `/covers/${year}/${month}/${book.ID}.jpg`}
                  alt={book.Title}
                  className="rounded-lg object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => handleImageError(e, book.ID, setErrorImages)}
                />
              </div>
              <h3 className="text-lg font-bold mt-4">{book.Title}</h3>
              <p className="text-sm text-gray-600 mt-2">
                {date.toLocaleDateString()}
              </p>
              <Link
                href={`/book/detail/${book.ID}`}
                className="text-primary font-semibold mt-4 inline-block hover:underline"
              >
                Learn More →
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
