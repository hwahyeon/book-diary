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
  BookFormat?: number; // 0: 일반, 1: 전자책, 2: 오디오북
  Type?: string;      // B: 책, M: 잡지
  Location?: string;
}
