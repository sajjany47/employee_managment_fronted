import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { Box, Button, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ConfigData } from "../../../shared/ConfigData";
import moment from "moment";
import { SalaryServices } from "./SalaryService";
import { useSnackbar } from "notistack";

const Salary = () => {
  const salaryService = new SalaryServices();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [salaryDetailList, setSalaryDetailList] = useState([]);
  const [pendingUserList, setPendingUserList] = useState([]);

  useEffect(() => {
    Promise.all([salaryList(), userList()]);
    salaryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const salaryList = () => {
    setLoading(true);
    salaryService
      .salaryList()
      .then((res) => {
        setSalaryDetailList(res.data);
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "error" }))
      .finally(() => setLoading(false));
  };

  const userList = () => {
    setLoading(true);
    salaryService
      .userListSalary()
      .then((res) => {
        setPendingUserList(res.data);
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "error" }))
      .finally(() => setLoading(false));
  };
  console.log(pendingUserList);

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      width: 150,
      renderCell: (value: any) => (
        <span style={{ textTransform: "capitalize" }}>{value.value}</span>
      ),
    },
    { field: "mobile", headerName: "Number", width: 120 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (value: any) => (
        <span style={{ textTransform: "capitalize" }}>{value.value}</span>
      ),
    },

    { field: "createdBy", headerName: "CreatedBy ", width: 120 },
    { field: "updatedBy", headerName: "UpdatedBy ", width: 120 },
    { field: "approvedBy", headerName: "ApprovedBy ", width: 120 },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (value: any) => moment(value.value).format("Do MMM,YYYY"),
    },
    //   {
    //     field: "action",
    //     headerName: "Action",
    //     width: 120,
    //     renderCell: (value: any) => (
    //       <>
    //         <EditNoteIcon
    //           color="primary"
    //           style={{ cursor: "pointer" }}
    //           onClick={() => {
    //             navigate(`/admin/user-update/${value.row._id}`);
    //           }}
    //         />
    //         <VisibilityIcon
    //           color="secondary"
    //           style={{ cursor: "pointer" }}
    //           onClick={() => {
    //             navigate("/admin/user-verified/", {
    //               state: { data: value.row },
    //             });
    //           }}
    //         />
    //       </>
    //     ),
    //   },
  ];
  return (
    <div>
      {loading && <Loader />}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box className="mt-4">
              <h6>
                <strong>Salary Alloted User</strong>
              </h6>
            </Box>
            <Box className="mt-2 flex justify-end gap-2">
              <TextField label="Search" id="outlined-size-small" size="small" />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                //   onClick={handleClickOpen}
              >
                New User
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} className="mt-1">
          <Box>
            <DataGrid
              style={{
                height: salaryDetailList.length > 0 ? "100%" : 200,
                width: "100%",
              }}
              rows={salaryDetailList}
              columns={columns}
              //   getRowId={(row) => row.username}
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

export default Salary;
