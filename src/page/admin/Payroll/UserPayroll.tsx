import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { Box, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ConfigData } from "../../../shared/ConfigData";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

function UserPayroll() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [monthYear, setMonthYear] = useState(moment.utc(new Date()));
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
  }, []);

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
          <VisibilityIcon
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/admin/user-payroll/view`, {
                state: { data: value.row.username },
              });
            }}
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
            // getRowId={(row) => row._id}
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
