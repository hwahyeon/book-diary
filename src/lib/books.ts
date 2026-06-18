import rawBooks from "@public/data/books.json";
import { Book } from "@/types/Book";

export const books: Book[] = rawBooks.map((book: any) => ({
  ID: book.ID,
  Date: book.Date,
  Title: book.Title,
  Writer: book.Writer,
  PartOfSeries: book.PartOfSeries,
  SeriesNumber: Number(book.SeriesNumber),
  PrintLength: Number(book.PrintLength),
  Language: book.Language,
  Publisher: book.Publisher,
  PublicationDate: book.PublicationDate,
  ISBN: book.ISBN,
  BookFormat: Number(book.BookFormat),
  Type: book.Type,
  Location: book.Location,
}));
