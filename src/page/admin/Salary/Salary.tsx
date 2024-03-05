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
import {
  DateField,
  InputField,
  SelectField,
} from "../../../components/DynamicField";
import { percentage, sumValues } from "../../../shared/UtlityFunction";

const Salary = () => {
  const salaryService = new SalaryServices();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [salaryDetailList, setSalaryDetailList] = useState([]);
  const [pendingUserList, setPendingUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("add");

  useEffect(() => {
    Promise.all([salaryList(), userList()]);

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
    setLoading(true);
    salaryService
      .createSalaryStructure(values)
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "error" }))
      .finally(() => setLoading(false));
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
                onClick={() => {
                  setOpen(true);
                  setActionType("add");
                }}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Add Salary Structure</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={
              actionType === "add"
                ? {
                    date: "",
                    username: "",
                    basicSalary: "",
                    hra: "",
                    travelAllowance: "",
                    MedicalAllowance: "",
                    LeaveTravelAllowance: "",
                    SpecialAllowance: "",
                    providentFund: "",
                    professionalTax: "",
                    incomeTax: "",
                    healthInsurance: "",
                    totalEarning: "",
                  }
                : {
                    date: "",
                    username: "",
                    basicSalary: "",
                    hra: "",
                    travelAllowance: "",
                    MedicalAllowance: "",
                    LeaveTravelAllowance: "",
                    SpecialAllowance: "",
                    providentFund: "",
                    professionalTax: "",
                    incomeTax: "",
                    incrementType: "",
                    incrementValue: "",
                    totalEarning: "",
                    type: "",
                    healthInsurance: "",
                  }
            }
            // validationSchema={activationKeyValidation}
            onSubmit={generateSalary}
            enableReinitialize
          >
            {({ handleSubmit, values }) => (
              <Form className="mt-1" onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={6}>
                    <DateField
                      name="date"
                      label="Date"
                      views={["year", "month", "day"]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <SelectField
                      name="username"
                      label="Username"
                      options={pendingUserList.map((item: any) => ({
                        label: `${item.name}(${item.username})`,
                        value: item.username,
                      }))}
                      disabled={actionType === "edit" ? true : false}
                    />
                  </Grid>
                  {actionType === "edit" && (
                    <Grid item xs={2} sm={4} md={6}>
                      <SelectField
                        name="type"
                        label="Type"
                        options={[
                          { label: "Changes", value: "changes" },
                          { label: "Appraisal", value: "appraisal" },
                        ]}
                      />
                    </Grid>
                  )}

                  <Grid item xs={2} sm={4} md={6}>
                    <InputField name="basicSalary" label="Basic Salary" />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField name="hra" label="House Reantal Allowance" />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField
                      name="travelAllowance"
                      label="Travel Allowance"
                    />
                  </Grid>

                  <Grid item xs={2} sm={4} md={6}>
                    <InputField
                      name="MedicalAllowance"
                      label="Medical Allowance"
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField
                      name="LeaveTravelAllowance"
                      label="Leave Travel Allowance"
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField
                      name="SpecialAllowance"
                      label="Special Allowance"
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField
                      name="healthInsurance"
                      label="Health Insurance"
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField name="providentFund" label="Provident Fund" />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField name="incomeTax" label="Income Tax" />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <InputField
                      name="professionalTax"
                      label="Professional Tax"
                    />
                  </Grid>
                  {values.type === "appraisal" && (
                    <>
                      {" "}
                      <Grid item xs={2} sm={4} md={6}>
                        <SelectField
                          name="incrementType"
                          label="Increment Type"
                          options={[
                            { label: "Fixed", value: "fixed" },
                            { label: "Percentage", value: "percentage" },
                          ]}
                        />
                      </Grid>
                      <Grid item xs={2} sm={4} md={6}>
                        <InputField
                          name="incrementValue"
                          label="Increment Value"
                        />
                      </Grid>
                    </>
                  )}

                  <Grid item xs={2} sm={4} md={6}>
                    <InputField
                      name="totalEarning"
                      value={
                        actionType === "add"
                          ? sumValues({
                              basicSalary: values.basicSalary,
                              hra: values.hra,
                              travelAllowance: values.travelAllowance,
                              MedicalAllowance: values.MedicalAllowance,
                              LeaveTravelAllowance: values.LeaveTravelAllowance,
                              SpecialAllowance: values.SpecialAllowance,
                              providentFund: -values.providentFund,
                              professionalTax: -values.professionalTax,
                              incomeTax: -values.incomeTax,
                              healthInsurance: -values.healthInsurance,
                            })
                          : values.type === "changes"
                          ? sumValues({
                              basicSalary: values.basicSalary,
                              hra: values.hra,
                              travelAllowance: values.travelAllowance,
                              MedicalAllowance: values.MedicalAllowance,
                              LeaveTravelAllowance: values.LeaveTravelAllowance,
                              SpecialAllowance: values.SpecialAllowance,
                              providentFund: -values.providentFund,
                              professionalTax: -values.professionalTax,
                              incomeTax: -values.incomeTax,
                              healthInsurance: -values.healthInsurance,
                            })
                          : values.incrementType === "fixed"
                          ? sumValues({
                              basicSalary: values.basicSalary,
                              hra: values.hra,
                              travelAllowance: values.travelAllowance,
                              MedicalAllowance: values.MedicalAllowance,
                              LeaveTravelAllowance: values.LeaveTravelAllowance,
                              SpecialAllowance: values.SpecialAllowance,
                              providentFund: -values.providentFund,
                              professionalTax: -values.professionalTax,
                              incomeTax: -values.incomeTax,
                              healthInsurance: -values.healthInsurance,
                            })
                          : sumValues({
                              basicSalary:
                                values.basicSalary +
                                percentage(
                                  values.incrementValue,
                                  values.basicSalary
                                ),
                              hra:
                                values.hra +
                                percentage(values.incrementValue, values.hra),
                              travelAllowance:
                                values.travelAllowance +
                                percentage(
                                  values.incrementValue,
                                  values.travelAllowance
                                ),
                              MedicalAllowance:
                                values.MedicalAllowance +
                                percentage(
                                  values.incrementValue,
                                  values.MedicalAllowance
                                ),
                              LeaveTravelAllowance:
                                values.LeaveTravelAllowance +
                                percentage(
                                  values.incrementValue,
                                  values.LeaveTravelAllowance
                                ),
                              SpecialAllowance:
                                values.SpecialAllowance +
                                percentage(
                                  values.incrementValue,
                                  values.SpecialAllowance
                                ),
                              providentFund: -(
                                values.providentFund +
                                percentage(
                                  values.incrementValue,
                                  values.providentFund
                                )
                              ),
                              professionalTax: -values.professionalTax,
                              incomeTax: -(
                                values.incomeTax +
                                percentage(
                                  values.incrementValue,
                                  values.incomeTax
                                )
                              ),
                              healthInsurance: -(
                                values.healthInsurance +
                                percentage(
                                  values.incrementValue,
                                  values.healthInsurance
                                )
                              ),
                            })
                      }
                      label="Total In Hand"
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
