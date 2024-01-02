import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { inputField, selectField } from "../../../components/FieldType";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ConfigData } from "../../../shared/ConfigData";
import EditNoteIcon from "@mui/icons-material/EditNote";

const LeaveList = () => {
  const [open, setOpen] = useState(false);
  const [usernameList, setUsernameList] = useState([]);
  const [leaveListData, setLeaveListData] = useState([]);

  useEffect(() => {
    setUsernameList([]);
    setLeaveListData([]);
  }, []);

  const columns: GridColDef[] = [
    {
      field: "yearOfLeave",
      headerName: "Year Of Leave",
      width: 200,
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
    },
    {
      field: "allotedLeave",
      headerName: "Alloted Leave",
      width: 200,
    },

    {
      field: "usedLeave",
      headerName: "Used Leave",
      width: 200,
    },
    {
      field: "totalDay",
      headerName: "Total Days",
      width: 150,
    },

    { field: "updatedBy", headerName: "UpdatedBy ", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (value: any) => (
        <>
          <EditNoteIcon
            color="primary"
            onClick={() => console.log(value.row)}
          />
        </>
      ),
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const initialValue = {};

  const submitLeave = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <div className="flex justify-between">
        <h6>
          <strong>Attendance Details</strong>
        </h6>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Leave
        </Button>
      </div>
      <div
        className="mt-10"
        style={{
          height: leaveListData.length > 0 ? "100%" : 200,
          width: "100%",
        }}
      >
        <DataGrid
          rows={leaveListData}
          columns={columns}
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
      </div>

      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <strong>Apply Leave</strong>
        </DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValue} onSubmit={submitLeave}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={6}>
                    <Field
                      name="username"
                      label="Username"
                      component={selectField}
                      options={usernameList}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <Field
                      name="yearOfLeave"
                      label="Leave Year"
                      component={inputField}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <Field
                      name="allotedLeave"
                      label="Alloted Leave"
                      component={inputField}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      gap: "5px",
                    }}
                  >
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      sx={{
                        backgroundColor: "red",
                        ":hover": { backgroundColor: "red" },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      // onClick={handleGenerateKey}
                      variant="contained"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeaveList;
