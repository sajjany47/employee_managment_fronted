import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Upload = (props: any) => {
  const [uploadStatus, setUploadStatus] = useState(false);
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
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      const modifyData = json.map((item: any) => ({
        username: item.Username,
        leave: `${item.Leave}`,
        year: `${item.Year}`,
      }));

      props.setData(modifyData);
      setUploadStatus(true);
    };
    reader.readAsBinaryString(file);
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
      {uploadStatus === true ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mt-5">
          <p className="text-lg font-semibold">Upload Status: Confirmed</p>
          <p>
            Your document has been successfully confirmed and is now being
            processed.
          </p>
        </div>
      ) : (
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
      )}

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button color="inherit" disabled sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button
          onClick={() => {
            props.handleNext();
          }}
        >
          {"Next"}
        </Button>
      </Box>
    </>
  );
};

export default Upload;
