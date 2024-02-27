import { useState } from "react";
import Loader from "../../../components/Loader";
import { Box, Button, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ConfigData } from "../../../shared/ConfigData";
import moment from "moment";

const Salary = () => {
  const [loading, setLoading] = useState(false);
  const [salaryDetailList, setSalaryDetailList] = useState([]);

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
            <Box>
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
