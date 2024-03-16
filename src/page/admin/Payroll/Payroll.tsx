import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { Box, Button, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ConfigData } from "../../../shared/ConfigData";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { PayrollService } from "./PayrollService";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { enqueueSnackbar } from "notistack";

const Payroll = () => {
  const navigate = useNavigate();
  const payrollService = new PayrollService();
  const [monthYear, setMonthYear] = useState(
    moment.utc(new Date()).subtract(1, "months")
  );
  const [payrollList, setPayrollList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    payrollListApi(monthYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const payrollListApi = (value: any) => {
    setLoading(true);
    payrollService
      .payrollMonthList({ date: moment(value).format("YYYY-MM") })
      .then((res) => {
        setPayrollList(res.data.userPayroll);
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
      width: 200,
      renderCell: (value: any) => <span>{value.value}</span>,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      renderCell: (value: any) => (
        <span>{moment(new Date(value.value)).format("MMM,YYYY")}</span>
      ),
    },

    {
      field: "totalEarning",
      headerName: "Net Monthly",
      width: 200,
      renderCell: (value: any) => (
        <span>
          {Number(value.row.currentMonthSalary.totalEarning).toFixed(2)}
        </span>
      ),
    },
    {
      field: "salaryStatus",
      headerName: "Status",
      width: 200,
      renderCell: (value: any) => <span>{value.row.salaryStatus}</span>,
    },

    {
      field: "updatedBy",
      headerName: "UpdatedBy ",
      width: 200,
      renderCell: (value: any) => <span>{value.value}</span>,
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (value: any) => (
        <>
          <EditNoteIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/admin/payroll/update`, { state: { data: value.row } });
            }}
          />
          <VisibilityIcon
            color="secondary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/admin/salary/${value.row.username}`);
            }}
          />
        </>
      ),
    },
  ];
  const handleChange = (value: any) => {
    setMonthYear(moment.utc(value));
    const formatDate = moment(value).format("YYYY-MM");
    payrollListApi(formatDate);
    setPayrollList([]);
  };

  const handelGeneratePayroll = () => {
    setLoading(true);
    payrollService
      .payrollGenerate({ date: moment(monthYear).format("YYYY-MM") })
      .then(() => {
        payrollListApi(monthYear);
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => setLoading(false));
  };
  return (
    <div>
      {loading && <Loader />}{" "}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box className="mt-4">
              <h6>
                <strong>Payroll</strong>
              </h6>
            </Box>
            <Box className="mt-2 flex justify-end gap-2">
              <TextField label="Search" id="outlined-size-small" size="small" />
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
                    views={["year", "month"]}
                    onChange={handleChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handelGeneratePayroll}
              >
                Generate Payroll
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} className="mt-1">
          <Box>
            <DataGrid
              style={{
                height: payrollList.length > 0 ? "100%" : 200,
                width: "100%",
              }}
              rows={payrollList}
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
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Payroll;
