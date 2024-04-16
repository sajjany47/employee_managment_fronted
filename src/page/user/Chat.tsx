import { Fragment, useEffect, useState } from "react";
import { EmployeeService } from "../admin/Emloyee/EmployeeService";
import { enqueueSnackbar } from "notistack";

const Chat = () => {
  const employeeService = new EmployeeService();
  const [employeeList, setEmployeeList] = useState([]);
  const [selectUser, setSelectUser] = useState("");
  const [chatDetails, setChatDetails] = useState([]);
  const [send, setSend] = useState("");
  useEffect(() => {
    employeeService
      .employeeList()
      .then((res) => {
        setEmployeeList(res.data);
        setSelectUser(res.data[0].username);
        receiveMessage(res.data[0].username);
      })
      .catch((error: any) =>
        enqueueSnackbar(error.response.data.message, { variant: "error" })
      );
  }, []);

  const receiveMessage = (receiveId: any) => {
    employeeService
      .receiveMessage({ receiver: receiveId })
      .then((res) => {
        setChatDetails(res.data);
      })
      .catch((error: any) =>
        enqueueSnackbar(error.response.data.message, { variant: "error" })
      );
  };
  const handelSend = () => {
    employeeService
      .sendMessage({
        receiver: selectUser,
        message: send,
      })
      .then((res) => {
        console.log(res.message);
        receiveMessage(selectUser);
        setSend("");
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      );
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* <!-- Sidebar --> */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* <!-- Sidebar Header --> */}
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
        </header>

        {/* <!-- Contact List --> */}

        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {employeeList.map((item: any) => {
            return (
              <div
                className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                key={item.username}
                onClick={() => {
                  setSelectUser(item.username);
                  receiveMessage(item.username);
                }}
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                  <img
                    src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.username}</h2>
                  <p className="text-gray-600">Hoorayy!!</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <!-- Main Chat Area --> */}
      <div className="flex-1 ">
        {/* <!-- Chat Header --> */}
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">{selectUser}</h1>
        </header>

        {/* <!-- Chat Messages --> */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          {chatDetails.map((item: any) => {
            return (
              <Fragment key={item._id}>
                {item.name === selectUser ? (
                  <div className="flex mb-4 cursor-pointer">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                      <img
                        src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                    <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                      <p className="text-gray-700">{item.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end mb-4 cursor-pointer">
                    <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                      <p>{item.message}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                      <img
                        src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="My Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        <footer
          className="bg-white border-t border-gray-300 p-4 absolute bottom-0"
          style={{ width: "60%" }}
        >
          <div className="relative flex">
            <span className="absolute inset-y-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  ></path>
                </svg>
              </button>
            </span>
            <input
              value={send}
              onChange={(e) => setSend(e.target.value)}
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
              <button
                onClick={handelSend}
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
