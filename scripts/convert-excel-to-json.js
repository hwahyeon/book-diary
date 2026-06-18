const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const excelFilePath = "./data/books.xlsx";
const jsonFilePath = path.join(process.cwd(), "public/data/books.json");

const COLUMNS = ["ID", "Date", "Title", "Writer", "PartOfSeries", "SeriesNumber", "PrintLength", "Language", "Publisher", "PublicationDate", "ISBN", "BookFormat", "Type", "Location"];

const convertExcelToJson = () => {
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const headers = data[0];
  const rows = data.slice(1);

  const jsonData = rows.map((row) => {
    const obj = {};
    COLUMNS.forEach((col) => {
      const index = headers.indexOf(col);
      const value = index !== -1 && row[index] !== undefined ? row[index] : "";
      obj[col] = value;
    });

    obj["SeriesNumber"] = isNaN(Number(obj["SeriesNumber"])) ? 0 : Number(obj["SeriesNumber"]);
    obj["PrintLength"] = isNaN(Number(obj["PrintLength"])) ? 0 : Number(obj["PrintLength"]);
    obj["BookFormat"] = isNaN(Number(obj["BookFormat"])) ? 0 : Number(obj["BookFormat"]);

    return obj;
  });

  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
  console.log("Excel data has been converted to JSON and saved to", jsonFilePath);
};

convertExcelToJson();
