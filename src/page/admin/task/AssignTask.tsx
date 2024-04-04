import { Chip, IconButton, Rating } from "@mui/material";
import moment from "moment";
import { MdOutlineEditCalendar } from "react-icons/md";

const AssignTask = (props: any) => {
  const btnColor = (item: any) => {
    switch (item) {
      case "waiting-for-review":
        return "primary";

      case "hold":
        return "secondary";

      case "completed":
        return "success";

      case "cancelled":
        return "error";

      case "need-Attention":
        return "warning";

      case "assign":
        return "info";

      case "todo":
        return "info";
      case "under-review":
        return "secondary";

      default:
        return null;
    }
  };
  return (
    <>
      {props.data.map((item: any, index: number) => {
        return (
          <div style={{ border: "dashed" }} key={index} className="mt-2">
            <div className="w-full">
              <div className="p-2 pb-10">
                <h1 className="text-2xl font-semibold text-gray-800 mt-4 capitalize">
                  Project {item.taskProject}
                </h1>
                <p className="text-xl text-gray-400 mt-2 leading-relaxed">
                  {item.taskDetails}
                </p>
              </div>
              <div className="bg-blue-50 p-2">
                <div className="sm:flex sm:justify-between">
                  <div>
                    <div className="text-lg text-gray-700">
                      <span className="text-gray-900 font-bold">
                        {moment(item.taskStartDate).format("Do MMMM, YYYY")} -{" "}
                        {moment(item.takDeadline).format("Do MMMM, YYYY")}
                      </span>{" "}
                    </div>
                    <div className="flex items-center">
                      {item.taskStatus === "completed" && (
                        <div className="flex">
                          <Rating
                            name="hover-feedback"
                            value={4}
                            precision={0.5}
                            disabled
                          />
                        </div>
                      )}

                      <div className="text-gray-600 ml-2 text-sm md:text-base mt-1">
                        {props.type}-{" "}
                        {props.type === "Sender"
                          ? item.taskSender
                          : item.taskReceiver}
                      </div>
                    </div>
                  </div>
                  <Chip
                    label={item.taskStatus}
                    className="mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-purple-700 font-bold text-white md:text-lg rounded-lg shadow-md capitalize"
                    color={item.taskStatus && btnColor(item.taskStatus)}
                  />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="mt-3 text-gray-600 text-sm md:text-sm">
                    {item.taskStatus === "completed" && item.taskRemark}
                  </div>
                  {item.taskStatus !== "completed" && (
                    <IconButton
                      aria-label="edit"
                      onClick={() => props.selectData(item, props.type)}
                    >
                      <MdOutlineEditCalendar style={{ color: "green" }} />
                    </IconButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AssignTask;
