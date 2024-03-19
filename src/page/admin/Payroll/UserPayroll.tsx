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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { PayrollService } from "./PayrollService";
import { enqueueSnackbar } from "notistack";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

function UserPayroll() {
  const navigate = useNavigate();
  const location = useLocation();
  const payrollService = new PayrollService();
  const [loading, setLoading] = useState(false);
  const [monthYear, setMonthYear] = useState(moment.utc(new Date()));
  const [data, setData] = useState([]);

  useEffect(() => {
    payrollService
      .salarySlip({
        year: Number(moment(monthYear).format("YYYY")),
        username: location.state.data,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => setLoading(false));
  }, []);

  console.log(data);

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
          <VisibilityIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/salary-slip/generate`, {
                state: { data: value.row },
              });
            }}
          />
          <InsertDriveFileIcon
            color="secondary"
            style={{ cursor: "pointer" }}
          />
        </>
      ),
    },
  ];

  const handleChange = (value: any) => {
    setMonthYear(moment.utc(value));
    const formatDate = moment(value).format("YYYY");
    console.log(formatDate);
    setLoading(false);
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
