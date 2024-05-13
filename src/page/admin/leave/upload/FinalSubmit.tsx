import { useEffect, useState } from "react";
import { LeaveService } from "../LeaveService";

const FinalSubmit = (props: any) => {
  const leaveService = new LeaveService();
  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
    leaveService
      .excelLeaveAlloted({ list: props.data })
      .then(() => {
        setSubmitStatus(true);
      })
      .catch((err: any) => {
        console.log(err);
        setSubmitStatus(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mt-5">
      {submitStatus === true ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
          <p className="text-lg font-semibold">Upload Status: Success</p>
          <p>Your document has been successfully upload</p>
        </div>
      ) : (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
          <p className="text-lg font-semibold">Upload Status: Rejected</p>
          <p>Your document has been not upload.</p>
        </div>
      )}
    </div>
  );
};

export default FinalSubmit;
