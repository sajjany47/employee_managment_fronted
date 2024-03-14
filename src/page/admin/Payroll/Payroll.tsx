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

const Payroll = () => {
  const navigate = useNavigate();
  const payrollService = new PayrollService();
  const [payrollList, setPayrollList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPayrollList([]);
    setLoading(false);
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
        <span>{moment(value.value, "YYYY-MM").format("MMM,YYYY")}</span>
      ),
    },

    {
      field: "totalEarning",
      headerName: "Net Monthly",
      width: 200,
      renderCell: (value: any) => (
        <span>{value.row.userSalary.totalEarning}</span>
      ),
    },
    {
      field: "salaryStatus",
      headerName: "Status",
      width: 200,
      renderCell: (value: any) => (
        <span>{value.row.userSalary.salaryStatus}</span>
      ),
    },

    {
      field: "updatedBy",
      headerName: "UpdatedBy ",
      width: 200,
      renderCell: (value: any) => <span>{value.row.userSalary.updatedBy}</span>,
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
              navigate(`/admin/salary/${value.row.username}`);
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
              <Button variant="contained" startIcon={<AddIcon />}>
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
