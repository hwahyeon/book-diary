const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const excelFilePath = "./data/books.xlsx";
const jsonFilePath = path.join(process.cwd(), "public/data/books.json");

const convertExcelToJson = () => {
  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const headers = data[0];
  const rows = data.slice(1);

  const jsonData = rows.map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index] : "";
    });

    if (obj["SeriesNumber"]) obj["SeriesNumber"] = Number(obj["SeriesNumber"]);
    if (obj["PrintLength"]) obj["PrintLength"] = Number(obj["PrintLength"]);
    if (obj["Ebook"]) obj["Ebook"] = Number(obj["Ebook"]);

    return obj;
  });

  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
  console.log("Excel data has been converted to JSON and saved to", jsonFilePath);
};

convertExcelToJson();
