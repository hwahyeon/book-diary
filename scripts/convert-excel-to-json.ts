const XLSX = require("xlsx");
const fs = require("fs");

const excelFilePath = "./data/books.xlsx";
const jsonFilePath = "./public/data/books.json";

interface Book {
  ID: string;
  Title: string;
  Date: string;
  PartOfSeries?: string;
  PrintLength?: number;
  Language?: string;
  Publisher?: string;
  PublicationDate?: string;
  ISBN?: string;
  Description?: string;
  Ebook?: number;
  Type?: string;
}

const convertExcelToJson = () => {
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[];

  const headers = data[0] as string[];
  const rows = data.slice(1) as any[];

  const jsonData = rows.map((row) => {
    const obj: { [key: string]: any } = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index] : "";
    });

    // Type change
    if (obj["SeriesNumber"]) {
      obj["SeriesNumber"] = Number(obj["SeriesNumber"]);
    }
    if (obj["PrintLength"]) {
      obj["PrintLength"] = Number(obj["PrintLength"]);
    }
    if (obj["Ebook"]) {
      obj["Ebook"] = Number(obj["Ebook"]);
    }

    return obj as Book;
  });

  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
  console.log(
    "Excel data has been converted to JSON and saved to",
    jsonFilePath
  );
};

convertExcelToJson();
