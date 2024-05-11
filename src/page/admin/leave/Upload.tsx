import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

const Upload = () => {
  return (
    <>
      <div className="mt-5">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Required to know:
        </h2>
        <ul className="space-y-2 text-gray-500 list-disc list-inside dark:text-gray-400">
          <li>
            Click on the download option, and the Excel file will be saved to
            your device. <SimCardDownloadIcon color="error" />
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
          <input type="file" name="file" id="file" className="sr-only" />
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
