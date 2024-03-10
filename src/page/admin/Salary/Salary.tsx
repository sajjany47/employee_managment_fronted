import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
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
import UpdateIcon from "@mui/icons-material/Update";
import { useSelector } from "react-redux";

const Salary = () => {
  const salaryService = new SalaryServices();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const userType = useSelector((state: any) => state.auth.auth.user);
  const [loading, setLoading] = useState(false);
  const [salaryDetailList, setSalaryDetailList] = useState([]);
  const [pendingUserList, setPendingUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("add");
  const [selectUser, setSelectUser] = useState<any>({});
  const [getId, setGetId] = useState("");

  useEffect(() => {
    Promise.all([salaryList(), userList()]);
    if (actionType === "edit") {
      const selectId = selectUser.salaryHistory.find(
        (item: any) =>
          item.basicSalary === selectUser.currentSalary.basicSalary &&
          item.hra === selectUser.currentSalary.hra &&
          item.travelAllowance === selectUser.currentSalary.travelAllowance &&
          item.MedicalAllowance === selectUser.currentSalary.MedicalAllowance &&
          item.LeaveTravelAllowance ===
            selectUser.currentSalary.LeaveTravelAllowance &&
          item.SpecialAllowance === selectUser.currentSalary.SpecialAllowance &&
          item.providentFund === selectUser.currentSalary.providentFund &&
          item.professionalTax === selectUser.currentSalary.professionalTax &&
          item.incomeTax === selectUser.currentSalary.incomeTax &&
          item.totalEarning === selectUser.currentSalary.totalEarning &&
          item.healthInsurance === selectUser.currentSalary.healthInsurance &&
          item.ctc === selectUser.currentSalary.ctc
      );
      setGetId(selectId._id);
    }
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
        <span>
          {moment(value.row.currentSalary.date).format("DD MMM,YYYY")}
        </span>
      ),
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (value: any) => <span>{value.value}</span>,
    },
    {
      field: "ctc",
      headerName: "Gross Monthly",
      width: 200,
      renderCell: (value: any) => <span>{value.row.currentSalary.ctc}</span>,
    },
    {
      field: "totalEarning",
      headerName: "Net Monthly",
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
              setActionType("edit");
              setOpen(true);
              setSelectUser(value.row);
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

  const handleClose = () => {
    setOpen(false);
    userList();
    salaryList();
    setPendingUserList([]);
    setSalaryDetailList([]);
  };

  const generateSalary = (values: any) => {
    setLoading(true);
    const requestData =
      actionType === "add"
        ? {
            ...values,
            updatedBy: userType.username,
          }
        : {
            ...values,
            id: getId,
            updatedBy: userType.username,
          };
    console.log(requestData);
    salaryService
      .createSalaryStructure(requestData)
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        salaryList();
        setPendingUserList([]);
        setSalaryDetailList([]);
        setOpen(false);
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
        fullWidth
        maxWidth="md"
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
                    ctc: "",
                  }
                : {
                    ...selectUser.currentSalary,
                    username: selectUser.username,
                    date: moment.utc(selectUser.currentSalary.date),
                  }
            }
            // validationSchema={activationKeyValidation}
            onSubmit={generateSalary}
            enableReinitialize
          >
            {({ handleSubmit, values, setFieldValue }) => (
              <Form className="mt-1" onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={4}>
                    <DateField
                      name="date"
                      label="Date"
                      views={["year", "month", "day"]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    {actionType === "edit" ? (
                      <InputField name="username" label="Username" disabled />
                    ) : (
                      <SelectField
                        name="username"
                        label="Username"
                        options={pendingUserList.map((item: any) => ({
                          label: `${item.name}(${item.username})`,
                          value: item.username,
                        }))}
                      />
                    )}
                  </Grid>
                  {actionType === "edit" && (
                    <Grid item xs={2} sm={4} md={4}>
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

                  {values.type === "appraisal" && (
                    <Grid item xs={2} sm={4} md={4}>
                      <SelectField
                        name="incrementType"
                        label="Increment Type"
                        options={[
                          { label: "Fixed", value: "fixed" },
                          { label: "Percentage", value: "percentage" },
                        ]}
                      />
                    </Grid>
                  )}

                  {values.type === "appraisal" &&
                    values.incrementType === "percentage" && (
                      <Grid item xs={2} sm={4} md={4}>
                        <InputField
                          name="incrementValue"
                          label="Increment Value"
                          onChange={(e: any) => {
                            setFieldValue("totalEarning", "");
                            setFieldValue("ctc", "");
                            setFieldValue("incrementValue", e.target.value);
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="start"
                                onClick={() => {
                                  const a: any = Number(values.incrementValue);
                                  setFieldValue("incrementValue", a);
                                  setFieldValue(
                                    "basicSalary",
                                    Number(
                                      selectUser.currentSalary.basicSalary
                                    ) +
                                      Number(
                                        percentage(
                                          a,
                                          selectUser.currentSalary.basicSalary
                                        )
                                      )
                                  );
                                  setFieldValue(
                                    "hra",
                                    Number(selectUser.currentSalary.hra) +
                                      Number(
                                        percentage(
                                          a,
                                          selectUser.currentSalary.hra
                                        )
                                      )
                                  );
                                  setFieldValue(
                                    "travelAllowance",
                                    Number(
                                      selectUser.currentSalary.travelAllowance
                                    ) +
                                      Number(
                                        percentage(
                                          a,
                                          selectUser.currentSalary
                                            .travelAllowance
                                        )
                                      )
                                  );
                                  setFieldValue(
                                    "MedicalAllowance",
                                    Number(
                                      selectUser.currentSalary.MedicalAllowance
                                    ) +
                                      Number(
                                        percentage(
                                          a,
                                          selectUser.currentSalary
                                            .MedicalAllowance
                                        )
                                      )
                                  );
                                  setFieldValue(
                                    "LeaveTravelAllowance",
                                    Number(
                                      selectUser.currentSalary
                                        .LeaveTravelAllowance
                                    ) +
                                      Number(
                                        percentage(
                                          a,
                                          selectUser.currentSalary
                                            .LeaveTravelAllowance
                                        )
                                      )
                                  );
                                  setFieldValue(
                                    "SpecialAllowance",
                                    Number(
                                      selectUser.currentSalary.SpecialAllowance
                                    ) +
                                      Number(
                                        percentage(
                                          a,
                                          selectUser.currentSalary
                                            .SpecialAllowance
                                        )
                                      )
                                  );
                                  setFieldValue(
                                    "providentFund",
                                    Number(
                                      selectUser.currentSalary.providentFund
                                    ) +
                                      Number(
                                        percentage(
                                          a,
                                          selectUser.currentSalary.providentFund
                                        )
                                      )
                                  );
                                  setFieldValue(
                                    "professionalTax",
                                    Number(
                                      selectUser.currentSalary.professionalTax
                                    ) +
                                      Number(
                                        percentage(
                                          a,
                                          selectUser.currentSalary
                                            .professionalTax
                                        )
                                      )
                                  );
                                  setFieldValue(
                                    "incomeTax",
                                    Number(selectUser.currentSalary.incomeTax) +
                                      Number(
                                        percentage(
                                          a,
                                          selectUser.currentSalary.incomeTax
                                        )
                                      )
                                  );
                                  setFieldValue(
                                    "healthInsurance",
                                    Number(
                                      selectUser.currentSalary.healthInsurance
                                    ) +
                                      Number(
                                        percentage(
                                          a,
                                          selectUser.currentSalary
                                            .healthInsurance
                                        )
                                      )
                                  );
                                }}
                                sx={{ cursor: "pointer" }}
                              >
                                <UpdateIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    )}

                  <Grid item xs={2} sm={4} md={4}>
                    <InputField
                      name="basicSalary"
                      label="Basic Salary"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("ctc", "");
                        setFieldValue("basicSalary", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputField
                      name="hra"
                      label="House Reantal Allowance"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("ctc", "");
                        setFieldValue("hra", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputField
                      name="travelAllowance"
                      label="Travel Allowance"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("ctc", "");
                        setFieldValue("travelAllowance", e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={2} sm={4} md={4}>
                    <InputField
                      name="MedicalAllowance"
                      label="Medical Allowance"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("ctc", "");
                        setFieldValue("MedicalAllowance", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputField
                      name="LeaveTravelAllowance"
                      label="Leave Travel Allowance"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("ctc", "");
                        setFieldValue("LeaveTravelAllowance", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputField
                      name="SpecialAllowance"
                      label="Special Allowance"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("ctc", "");
                        setFieldValue("SpecialAllowance", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputField
                      name="healthInsurance"
                      label="Health Insurance"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("ctc", "");
                        setFieldValue("healthInsurance", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputField
                      name="providentFund"
                      label="Provident Fund"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("ctc", "");
                        setFieldValue("providentFund", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputField
                      name="incomeTax"
                      label="Income Tax"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("ctc", "");
                        setFieldValue("incomeTax", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputField
                      name="professionalTax"
                      label="Professional Tax"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("ctc", "");
                        setFieldValue("professionalTax", e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={2} sm={4} md={4}>
                    <InputField
                      name="ctc"
                      label="CTC/Month"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="start"
                            onClick={() =>
                              setFieldValue(
                                "ctc",
                                sumValues({
                                  basicSalary: values.basicSalary,
                                  hra: values.hra,
                                  travelAllowance: values.travelAllowance,
                                  MedicalAllowance: values.MedicalAllowance,
                                  LeaveTravelAllowance:
                                    values.LeaveTravelAllowance,
                                  SpecialAllowance: values.SpecialAllowance,
                                  providentFund: values.providentFund,
                                  professionalTax: values.professionalTax,
                                  incomeTax: values.incomeTax,
                                  healthInsurance: values.healthInsurance,
                                })
                              )
                            }
                            sx={{ cursor: "pointer" }}
                          >
                            <UpdateIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputField
                      name="totalEarning"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="start"
                            onClick={() =>
                              setFieldValue(
                                "totalEarning",
                                sumValues({
                                  basicSalary: values.basicSalary,
                                  hra: values.hra,
                                  travelAllowance: values.travelAllowance,
                                  MedicalAllowance: values.MedicalAllowance,
                                  LeaveTravelAllowance:
                                    values.LeaveTravelAllowance,
                                  SpecialAllowance: values.SpecialAllowance,
                                  providentFund: -values.providentFund,
                                  professionalTax: -values.professionalTax,
                                  incomeTax: -values.incomeTax,
                                  healthInsurance: -values.healthInsurance,
                                })
                              )
                            }
                            sx={{ cursor: "pointer" }}
                          >
                            <UpdateIcon />
                          </InputAdornment>
                        ),
                      }}
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
