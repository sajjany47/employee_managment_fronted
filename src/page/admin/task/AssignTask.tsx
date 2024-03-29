import { IconButton, Rating } from "@mui/material";
import moment from "moment";
import { MdOutlineEditCalendar } from "react-icons/md";

const AssignTask = (props: any) => {
  console.log(props.data);
  return (
    <>
      {props.data.map((item: any) => {
        return (
          <div style={{ border: "dashed" }}>
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
                        Sender- {item.taskSender}
                      </div>
                    </div>
                  </div>
                  <button className="mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-purple-700 hover:bg-purple-600 font-bold text-white md:text-lg rounded-lg shadow-md capitalize">
                    {item.taskStatus}
                  </button>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="mt-3 text-gray-600 text-sm md:text-sm">
                    {item.taskStatus === "completed" && item.taskRemark}
                  </div>
                  <IconButton
                    aria-label="edit"
                    onClick={() => props.selectData()}
                  >
                    <MdOutlineEditCalendar style={{ color: "green" }} />
                  </IconButton>
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
