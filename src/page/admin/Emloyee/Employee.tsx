import { Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { EmployeeService } from "./EmployeeService";

const Employee = () => {
  const employeeService = new EmployeeService();
  const [data, setData] = useState([]);
  useEffect(() => {
    employeeService.employeeList().then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={9} className="justify-end">
          <Typography variant="h6" className="text-sm">
            Employee List
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField label="Search" id="outlined-size-small" size="small" />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data &&
          data.map((item: any, index: any) => {
            return (
              <Grid item xs={12} sm={4} md={3} key={index}>
                <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
                  <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    <img
                      className="object-cover object-center h-32"
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                      alt="Woman looking front"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <h2 className="font-semibold capitalize">{`${item.name}`}</h2>
                    <p className="text-gray-700">{item.username}</p>
                    <p className="text-gray-500 capitalize">{item.position}</p>
                  </div>
                  <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                    <li className="flex flex-col items-center justify-around">
                      <div style={{ color: "blue" }}>Upline</div>
                      <div>{item?.upline}</div>
                    </li>
                  </ul>
                  <div className="p-4 border-t mx-8 mt-2">
                    <button className=" block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
                      Message
                    </button>
                  </div>
                </div>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Employee;
