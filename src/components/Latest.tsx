import Link from "next/link";
import Image from "next/image";
import { Book } from "@/types/Book";

export function LatestPost({ posts }: { posts: Book[] | undefined }) {
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
            <div key={book.ID} className="bg-white rounded-lg shadow p-4">
              <div className="relative w-full h-64">
                <Image
                  src={`/covers/${year}/${month}/${book.ID}.jpg`}
                  alt={book.Title}
                  className="rounded-lg object-cover"
                  layout="fill"
                />
              </div>
              <h3 className="text-lg font-bold mt-4">{book.Title}</h3>
              <p className="text-sm text-gray-600 mt-2">
                {date.toLocaleDateString()}
              </p>
              <Link
                href={`/book/detail/${book.ID}`}
                className="text-accent mt-4 inline-block"
              >
                Learn More
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
