import { Fragment, useEffect, useState } from "react";
import { LeaveService } from "../LeaveService";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../../components/Loader";

const FinalSubmit = (props: any) => {
  const leaveService = new LeaveService();
  const [submitStatus, setSubmitStatus] = useState<any>(null);
  const [errorData, setErrorData] = useState([]);
  const [errorCode, setErrorCode] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    leaveService
      .excelLeaveAlloted({ list: props.data })
      .then(() => {
        setSubmitStatus(true);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        setErrorCode(err.response.status);
        setErrorData(err.response.data.data);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        setSubmitStatus(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading && <Loader />}
      <div className="mt-5">
        {submitStatus === true ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
            <p className="text-lg font-semibold">Upload Status: Success</p>
            <p>Your document has been successfully upload</p>
          </div>
        ) : submitStatus === false ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <p className="text-lg font-semibold">Upload Status: Rejected</p>
            {/* <p>Your document has been not upload.</p> */}
            <ul className="space-y-2 text-gray-500 list-disc list-inside dark:text-gray-400">
              {errorData.map((item: any, index) => {
                return (
                  <Fragment key={index}>
                    {errorCode === 404 ? (
                      <li>
                        The user <strong>{item.username}</strong> has not found!
                      </li>
                    ) : (
                      <li>
                        The user <strong>{item.username}</strong> has already
                        been allotted the maximum leave for the year{" "}
                        <strong>{item.year}</strong>.
                      </li>
                    )}
                  </Fragment>
                );
              })}
            </ul>
          </div>
        ) : // <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
        //   <p className="text-lg font-semibold">Something went wrong</p>
        // </div>
        null}
      </div>
    </>
  );
};

export default FinalSubmit;
