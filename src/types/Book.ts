export interface Book {
  title: string;
  date: string;
  writer: string;
  partOfSeries?: string;
  seriesNumber?: number;
  printLength?: number;
  language?: string;
  publisher?: string;
  publicationDate?: string;
  isbn?: number;
  cover: string;
  description?: string;
}
