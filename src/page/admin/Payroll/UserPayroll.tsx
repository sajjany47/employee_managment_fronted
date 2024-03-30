import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { Box, Chip, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ConfigData } from "../../../shared/ConfigData";
import { useLocation, useNavigate } from "react-router-dom";
import { PayrollService } from "./PayrollService";
import { enqueueSnackbar } from "notistack";
import { TiEyeOutline } from "react-icons/ti";
import { FaRegFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";

function UserPayroll() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: any) => state.auth.auth.user);
  console.log(location);
  const payrollService = new PayrollService();
  const [loading, setLoading] = useState(false);
  const [monthYear, setMonthYear] = useState(moment.utc(new Date()));
  const [data, setData] = useState([]);

  useEffect(() => {
    getSalarySlip(monthYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSalarySlip = (date: any) => {
    payrollService
      .salarySlip({
        year: Number(moment(date).format("YYYY")),
        username: location.state === null ? user.username : location.state.data,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => setLoading(false));
  };

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      width: 150,
      renderCell: (value: any) => <span>{value.row.userPayroll.username}</span>,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (value: any) => (
        <span>
          {moment(new Date(value.row.userPayroll.date)).format("MMM,YYYY")}
        </span>
      ),
    },

    {
      field: "totalEarning",
      headerName: "Net Monthly",
      width: 150,
      renderCell: (value: any) => (
        <span>
          {Number(
            value.row.userPayroll.currentMonthSalary.totalEarning
          ).toFixed(2)}
        </span>
      ),
    },
    {
      field: "salaryStatus",
      headerName: "Status",
      width: 150,
      renderCell: (value: any) => (
        <span>
          {value.row.salaryStatus === "paid" ? (
            <Chip
              label={value.row.userPayroll.salaryStatus}
              color="success"
              sx={{ textTransform: "capitalize" }}
            />
          ) : (
            <Chip
              label={value.row.userPayroll.salaryStatus}
              color="warning"
              sx={{ textTransform: "capitalize" }}
            />
          )}
        </span>
      ),
    },

    {
      field: "transactionNumber",
      headerName: "Transaction Number ",
      width: 200,
      renderCell: (value: any) => (
        <span>{value.row.userPayroll.transactionNumber}</span>
      ),
    },
    {
      field: "transactionDate",
      headerName: "Transaction Date ",
      width: 200,
      renderCell: (value: any) => (
        <span>
          {value.row.userPayroll.transactionNumber &&
            moment(value.row.userPayroll.transactionNumber).format(
              "DD MMM, YYYY HH:mm"
            )}
        </span>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (value: any) => (
        <>
          <TiEyeOutline
            style={{ cursor: "pointer", fontSize: "25px" }}
            onClick={() => {
              navigate(`/salary-slip/generate`, {
                state: { data: value.row },
              });
            }}
          />

          <FaRegFilePdf
            style={{ cursor: "pointer" }}
            onClick={() => downloadSalarySlip(value.row)}
          />
        </>
      ),
    },
  ];

  const downloadSalarySlip = (value: any) => {
    payrollService
      .salarySlipDOwnload({
        data: value,
      })
      .then((res) => {
        console.log(res.data);
        const pdf = new jsPDF("l", "pt", [1200, 1040]);
        const a: any = res.data;
        pdf.html(a).then(() => {
          pdf.save(`${value.userPayroll.date}.pdf`);
        });
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => setLoading(false));
  };
  const handleChange = (value: any) => {
    setMonthYear(moment.utc(value));
    getSalarySlip(value);
  };

  return (
    <>
      {loading && <Loader />}{" "}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box className="mt-4">
              <h6>
                <strong>Payroll Details</strong>
              </h6>
            </Box>
            <Box className="mt-2 flex justify-end gap-2">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ marginTop: -1 }}
                >
                  <DatePicker
                    // sx={{ width: "50% " }}
                    label="Select Year"
                    value={monthYear}
                    slotProps={{
                      textField: { size: "small", fullWidth: false },
                    }}
                    views={["year"]}
                    onChange={handleChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} marginTop={1}>
          <DataGrid
            style={{
              height: data.length > 0 ? "100%" : 200,
              width: "100%",
            }}
            rows={data}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: ConfigData.pageSize,
                },
              },
            }}
            pageSizeOptions={ConfigData.pageRow}
            localeText={{ noRowsLabel: "No Data Available!!!" }}
            // checkboxSelection
            // disableRowSelectionOnClick
          />
        </Grid>
      </Grid>
    </>
  );
}

export default UserPayroll;
