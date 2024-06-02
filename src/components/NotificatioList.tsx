import moment from "moment";

const NotificatioList = (props: any) => {
  return (
    <div className="h/2 relative flex flex-col text-gray-700 bg-white  w-96 rounded-xl bg-clip-border scroll">
      <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        {props.data.map((item: any, index: any) => {
          return (
            <div
              key={index}
              role="button"
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              <div className="grid mr-4 place-items-center">
                <img
                  alt="candice"
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                />
              </div>
              <div>
                <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Tania Andrew ({moment(item.date).format("DD MMM, YYYY HH:mm")}
                  )
                </h6>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                  {item.remark}
                </p>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default NotificatioList;
