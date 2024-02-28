import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ConfigData } from "../../../shared/ConfigData";
import moment from "moment";
import { SalaryServices } from "./SalaryService";
import { useSnackbar } from "notistack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { InputField } from "../../../components/DynamicField";

const Salary = () => {
  const salaryService = new SalaryServices();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [salaryDetailList, setSalaryDetailList] = useState([]);
  const [pendingUserList, setPendingUserList] = useState([]);
  const [open, setOpen] = useState(false);

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
      field: "date",
      headerName: "Date",
      width: 200,
      renderCell: (value: any) => (
        <span>{moment(value.row.currentSalary.date).format("MMM,YYYY")}</span>
      ),
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (value: any) => <span>{value.value}</span>,
    },
    {
      field: "totalEarning",
      headerName: "CTC",
      width: 200,
      renderCell: (value: any) => (
        <span>{value.row.currentSalary.totalEarning}</span>
      ),
    },

    {
      field: "updatedBy",
      headerName: "UpdatedBy ",
      width: 200,
      renderCell: (value: any) => (
        <span>{value.row.currentSalary.updatedBy}</span>
      ),
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
              navigate(`/admin/user-update/${value.row._id}`);
            }}
          />
          <VisibilityIcon
            color="secondary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/admin/user-verified/", {
                state: { data: value.row },
              });
            }}
          />
        </>
      ),
    },
  ];

  const handleClose = () => {
    setOpen(false);
    userList();
    salaryList();
    setPendingUserList([]);
    setSalaryDetailList([]);
  };

  const generateSalary = (values: any) => {
    console.log(values);
  };
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
                onClick={() => setOpen(true)}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Add Salary Structure</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: "",
              username: "",
              email: "",
              mobile: "",
              dob: "",
              role: "",
              password: "",
              position: "",
            }}
            // validationSchema={activationKeyValidation}
            onSubmit={generateSalary}
          >
            {() => (
              <Form className="mt-1">
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField name="name" label="Name" />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField name="username" label="Username" />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField name="email" label="Email" type="email" />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField name="mobile" label="Mobile" />
                  </Grid>

                  <Grid item xs={2} sm={4} md={6}>
                    <InputField name="position" label="Position" />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField
                      name="password"
                      label="Password"
                      type="password"
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
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Salary;
