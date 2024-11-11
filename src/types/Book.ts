export interface Book {
  ID: string;
  Date: string;
  Title: string;
  Writer: string;
  PartOfSeries?: string;
  SeriesNumber?: number;
  PrintLength?: number;
  Language?: string;
  Publisher?: string;
  PublicationDate?: string;
  ISBN?: string;
  BookFormat?: number; // 0: normal, 1: e book, 2: audio book
  Type?: string;
  Description?: string;
}