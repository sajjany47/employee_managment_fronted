import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import { saveAs } from "file-saver";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { AttendanceService } from "../AttendanceService";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../../components/Loader";

const HolidayUpload = (props: any) => {
  const attendanceService = new AttendanceService();
  const [uploadStatus, setUploadStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const handelDownload = () => {
    attendanceService
      .blankHolidayList()
      .then((res) => {
        const blob = new Blob([res], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob);
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      });
  };

  const readExcelFile = async (file: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    attendanceService
      .readHolidayList(formData)
      .then((res) => {
        props.getData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      });

    setUploadStatus(true);
  };
  return (
    <>
      {loading && <Loader />}
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

export default HolidayUpload;
