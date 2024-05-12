import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Upload = () => {
  const handelDownload = () => {
    const headers = ["Year", "Username", "Leave"];
    const workSheet = XLSX.utils.aoa_to_sheet([headers]);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet1");
    const excelBuffer = XLSX.write(workBook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "Leave_fill_Details.xlsx");
  };

  const readExcelFile = async (file: any) => {
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const bstr = e.target?.result;
    //   const wb = XLSX.read(bstr, { type: "binary" });
    //   const wsname = wb.SheetNames[0];
    //   const ws = wb.Sheets[wsname];
    //   /* Convert array of arrays */
    //   const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    //   console.log(data);
    // };
    // reader.readAsBinaryString(file);
    const data = await file.arrayBuffer();
    const workBook = XLSX.read(data);
    const workSheet = workBook.Sheets[0];

    const header = workSheet.getRows(1).map((cell: any) => cell.value);
    const json = workSheet.getRows(1).map((row: any) => {
      const obj: any = {};
      header.forEach((key: any, i: any) => {
        obj[key] = row[i].value;
      });
      return obj;
    });
    console.log(json);
  };
  return (
    <>
      <div className="mt-5">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Required to know:
        </h2>
        <ul className="space-y-2 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li>
            Click on the download option, and the Excel file will be saved to
            your device.{" "}
            <SimCardDownloadIcon
              color="error"
              onClick={handelDownload}
              sx={{ cursor: "pointer" }}
            />
          </li>
          <li>
            Ensure that you don't alter or delete any of the headers in the
            first row. These headers provide essential information about the
            data in each column and are crucial for proper data management and
            analysis.
          </li>
          <li>
            Double-check the entered data for accuracy and completeness before
            proceeding further.
          </li>
          <li>
            Follow any additional instructions provided by the platform for
            uploading files, such as confirming the upload or providing any
            necessary details.
          </li>
        </ul>
      </div>
      <div className="mb-6 pt-4">
        <label className="mb-5 block text-xl font-semibold text-[#07074D]">
          Upload File
        </label>
        <div className="mb-8">
          <input
            type="file"
            name="file"
            id="file"
            className="sr-only"
            accept=".xlsx, .xls"
            onChange={(e: any) => readExcelFile(e.target.files[0])}
          />
          <label
            htmlFor="file"
            className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
          >
            <div>
              <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                Drop files here
              </span>
              <span className="mb-2 block text-base font-medium text-[#6B7280]">
                Or
              </span>
              <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                Browse
              </span>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default Upload;
