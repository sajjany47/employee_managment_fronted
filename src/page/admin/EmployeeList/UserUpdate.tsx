import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import { FieldArray, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { Box, Button, Divider, Grid, IconButton } from "@mui/material";
import {
  DateField,
  InputField,
  SelectField,
} from "../../../components/DynamicField";
import { ConfigData } from "../../../shared/ConfigData";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeServices } from "./EmployeeServices";

const UserUpdate = () => {
  const employeeServices = new EmployeeServices();
  const id = useParams();
  const navigate = useNavigate();
  const userType = useSelector((state: any) => state.auth.auth.user);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  useEffect(() => {
    setLoading(true);
    Promise.all([getAllCountryList(), employeeServices.singleUser(id.id)])
      .then((res) => {
        setUserData(res[1].data);
        res[1].data.country && getAllStateByCountry(res[1].data.country);
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllCountryList = () => {
    employeeServices
      .getAllCountry()
      .then((res) => {
        setCountryData(
          res.map((item: any) => ({ label: item.name, value: item.iso2 }))
        );
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      );
  };

  const getAllStateByCountry = (country: any) => {
    employeeServices
      .getStateByCountry(country)
      .then((res) => {
        setStateData(
          res.map((item: any) => ({ label: item.name, value: item.iso2 }))
        );
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      );
  };

  const userUpdateValidation = Yup.object().shape({
    activationCode: Yup.string().required("Activation code is required"),
    name: Yup.string().min(2, "Too short! name").required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email()
      // .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/, "Invalid email")
      .required("Email is required"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[56789]\d{9}$/, "Invalid mobile number"),
    dob: Yup.string().required("Date of Birth is required"),
    role: Yup.string().required("Role is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    // district: Yup.string().required("District is required"),
    country: Yup.string().required("Country is required"),
    pincode: Yup.string()
      .nullable()
      .required("Pincode is required")
      .matches(/^[0-9]\d{5}$/, "Invalid pincode"),
    aadharNumber: Yup.string()
      .nullable()
      .required("Aadhar Number is required")
      .matches(/^\d{12}$/, "Invalid Aadhar Nuumber"),
    panNumber: Yup.string()
      .nullable()
      .required("Pan Number is required")
      .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, "Invalid Pan Number"),
    voterNumber: Yup.string()
      .nullable()
      // .required("Voter Number is required")
      .matches(/^[A-Z]{3}\d{7}$/, "Invalid Voter Number"),
    passportNumber: Yup.string()
      .nullable()
      // .required("Passport Number is required")
      .matches(
        /^ [A-PR-WY-Z] [1-9]\d\s?\d{4} [1-9]$/,
        "Invalid Passport Number"
      ),
    bankName: Yup.string().required("Bank name is required"),
    accountNumber: Yup.string().required("Account number is required"),
    ifsc: Yup.string()
      .required("IFSC code is required")
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
    branchName: Yup.string().required("Branch name is required"),
    workDetail: Yup.array().of(
      Yup.object().shape({
        companyName: Yup.string().required("Company name is required"),
        position: Yup.string().required("Position is required"),
        startingYear: Yup.string()
          .nullable()
          .matches(/^\d{4}$/, "Invalid Starting Year")
          .required("Starting Year is required"),
        endingYear: Yup.string()
          .nullable()
          .matches(/^\d{4}$/, "Invalid Ending Year")
          .required("Ending Year is required"),
      })
    ),
    education: Yup.array()
      .of(
        Yup.object().shape({
          boardName: Yup.string().required("Board Name is required").nullable(),
          passingYear: Yup.string()
            .nullable()
            .matches(/^\d{4}$/, "Invalid Passing Year")
            .required("Passing Year is required"),
          marksPercentage: Yup.string()
            .nullable()
            .matches(/^[0-9]\d*(\.\d+)?$/, "Invalid marks in percentage")
            .required("Percentage should be less than 100 "),
        })
      )
      .required("Education Details Required")
      .min(1, "Minimum of education details required"),
  });

  const intialValue = {
    ...userData,
    aadharNumber: userData.document?.aadharNumber,
    voterNumber: userData.document?.voterNumber,
    panNumber: userData.document?.panNumber,
    passportNumber: userData.document?.passportNumber,
    bankName: userData.bankDetails?.bankName,
    accountNumber: userData.bankDetails?.accountNumber,
    ifsc: userData.bankDetails?.ifsc,
    branchName: userData.bankDetails?.branchName,
    dob: moment.utc(userData.dob),
  };

  const handelCountry = (setFieldValue: any, e: any) => {
    setFieldValue("country", e.target.value, true);
    getAllStateByCountry(e.target.value);
  };

  const handelIFSC = (setFieldValue: any, e: any) => {
    setFieldValue("ifsc", e.target.value);
    if (e.target.value.length > 10) {
      employeeServices
        .getBankDetails(e.target.value)
        .then((res) => {
          setFieldValue("bankName", res.BANK);
          setFieldValue("branchName", res.BRANCH);
        })
        .catch((err) =>
          enqueueSnackbar(err.response.data.message, { variant: "error" })
        );
    }
  };

  const userUpdate = (value: any) => {
    setLoading(true);
    let reqBody: any = {
      activationCode: value.activationCode,
      name: value.name,
      skill: value.skill,
      position: value.position,
      address: value.address,
      state: value.state,
      country: value.country,
      // city: value.city,
      pincode: value.pincode,
      education: value.education,
      workDetail: value.workDetail,
      document: {
        aadharNumber: value.aadharNumber,
        voterNumber: value.voterNumber,
        panNumber: value.panNumber,
        passportNumber: value.passportNumber,
      },
      bankDetails: {
        bankName: value.bankName,
        accountNumber: value.accountNumber,
        ifsc: value.ifsc,
        branchName: value.branchName,
      },
      updatedBy: userType.username,
    };

    if (userData.username !== value.username) {
      reqBody = { ...reqBody, username: value.username };
    }

    if (userData.email !== value.email) {
      reqBody = { ...reqBody, email: value.email };
    }

    if (userData.mobile !== value.mobile) {
      reqBody = { ...reqBody, mobile: value.mobile };
    }

    employeeServices
      .userUpdate(reqBody)
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch((error: any) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && <Loader />}
      <Formik
        initialValues={intialValue}
        onSubmit={userUpdate}
        validationSchema={userUpdateValidation}
        enableReinitialize
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              // style={{ paddingRight: "10px" }}
            >
              <Grid item xs={12} sm={12} md={12}>
                <Divider sx={{ margin: "20px" }}>
                  <strong>Personal Details</strong>
                </Divider>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField
                  name="activationCode"
                  label="Activation Code"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="name" label="Name" />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="username" label="Username" />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="email" label="Email" type="email" />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="mobile" label="Mobile" />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <DateField
                  name="dob"
                  label="Date Of Birth"
                  views={["year", "month", "day"]}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <SelectField
                  name="role"
                  label="Role"
                  options={
                    userType?.role === "admin"
                      ? ConfigData.adminType
                      : ConfigData.HRtype
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="position" label="Position" />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="address" label="Address" />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <SelectField
                  name="country"
                  label="Country"
                  options={countryData}
                  onChange={(e: any) => handelCountry(setFieldValue, e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <SelectField
                  name="state"
                  label="State"
                  options={stateData}
                  onChange={(e: any) => setFieldValue("state", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <InputField name="pincode" label="Pincode" />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Divider sx={{ margin: "20px" }}>
                  <strong>Education Details</strong>
                </Divider>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FieldArray
                  name="education"
                  render={(arrayHelpers) => (
                    <Box sx={{ marginTop: "10px" }}>
                      {values.education &&
                        values.education.length > 0 &&
                        values.education.map((item: any, index: any) => (
                          <Box sx={{ flexGrow: 1 }} key={index}>
                            <Grid container spacing={2}>
                              <Grid item xs={10}>
                                <Grid
                                  container
                                  spacing={{ xs: 2, md: 2 }}
                                  columns={{ xs: 4, sm: 8, md: 12 }}
                                  sx={{ marginBottom: "15px" }}
                                >
                                  <Grid item xs={12} sm={4} md={4}>
                                    <InputField
                                      name={`education.${index}.boardName`}
                                      label="Board Name"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={4} md={4}>
                                    <InputField
                                      name={`education.${index}.passingYear`}
                                      label="Passing Year"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={4} md={4}>
                                    <InputField
                                      name={`education.${index}.marksPercentage`}
                                      label="Marks (%)"
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={2}>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => arrayHelpers.remove(index)}
                                  sx={{
                                    ":hover": {
                                      backgroundColor: "whitesmoke",
                                    },
                                  }}
                                >
                                  <DeleteIcon
                                    sx={{
                                      fontSize: "30px",
                                      marginTop: "10px",
                                      color: "red",
                                    }}
                                  />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Box>
                        ))}
                      <Grid xs={12} sm={12} item>
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={() =>
                            arrayHelpers.push({
                              boardName: "",
                              passingYear: "",
                              marksPercentage: "",
                            })
                          }
                        >
                          Add More
                        </Button>
                      </Grid>
                    </Box>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Divider sx={{ margin: "20px" }}>
                  <strong>Working Details</strong>
                </Divider>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FieldArray
                  name="workDetail"
                  render={(arrayHelpers) => (
                    <Box sx={{ marginTop: "10px" }}>
                      {values.workDetail &&
                        values.workDetail.length > 0 &&
                        values.workDetail.map((item: any, index: any) => (
                          <Box sx={{ flexGrow: 1 }} key={index}>
                            <Grid container spacing={2}>
                              <Grid item xs={10}>
                                <Grid
                                  container
                                  spacing={{ xs: 2, md: 2 }}
                                  columns={{ xs: 4, sm: 8, md: 12 }}
                                  sx={{ marginBottom: "15px" }}
                                >
                                  <Grid item xs={12} sm={4} md={3}>
                                    <InputField
                                      name={`workDetail.${index}.companyName`}
                                      label="Company Name"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={4} md={3}>
                                    <InputField
                                      name={`workDetail.${index}.position`}
                                      label="Position"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={4} md={3}>
                                    <InputField
                                      name={`workDetail.${index}.startingYear`}
                                      label="Starting Year"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={4} md={3}>
                                    <InputField
                                      name={`workDetail.${index}.endingYear`}
                                      label="Ending Year"
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={2}>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => arrayHelpers.remove(index)}
                                  sx={{
                                    ":hover": {
                                      backgroundColor: "whitesmoke",
                                    },
                                  }}
                                >
                                  <DeleteIcon
                                    sx={{
                                      fontSize: "30px",
                                      marginTop: "10px",
                                      color: "red",
                                    }}
                                  />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Box>
                        ))}
                      <Grid xs={12} sm={12} item>
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={() =>
                            arrayHelpers.push({
                              companyName: "",
                              position: "",
                              startingYear: "",
                              endingYear: "",
                            })
                          }
                        >
                          Add More
                        </Button>
                      </Grid>
                    </Box>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Divider sx={{ margin: "20px" }}>
                  <strong>Skill</strong>
                </Divider>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FieldArray
                  name="skill"
                  render={(arrayHelpers) => (
                    <Box sx={{ marginTop: "10px" }}>
                      {values.skill &&
                        values.skill.length > 0 &&
                        values.skill.map((item: any, index: any) => (
                          <Box sx={{ flexGrow: 1 }} key={index}>
                            <Grid container spacing={2}>
                              <Grid item xs={10}>
                                <Grid
                                  container
                                  spacing={{ xs: 2, md: 2 }}
                                  columns={{ xs: 4, sm: 8, md: 12 }}
                                  sx={{ marginBottom: "15px" }}
                                >
                                  <Grid item xs={12} sm={4} md={3}>
                                    <InputField
                                      name={`skill.${index}`}
                                      label="Skill"
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={2}>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => arrayHelpers.remove(index)}
                                  sx={{
                                    ":hover": {
                                      backgroundColor: "whitesmoke",
                                    },
                                  }}
                                >
                                  <DeleteIcon
                                    sx={{
                                      fontSize: "30px",
                                      marginTop: "10px",
                                      color: "red",
                                    }}
                                  />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Box>
                        ))}
                      <Grid xs={12} sm={12} item>
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add More
                        </Button>
                      </Grid>
                    </Box>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Divider sx={{ margin: "20px" }}>
                  <strong>Document</strong>
                </Divider>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="aadharNumber" label="Aadhar Number" />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="panNumber" label="Pan Number" />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="voterNumber" label="Voter Number" />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="passportNumber" label="Passport Number" />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Divider sx={{ margin: "20px" }}>
                  <strong>Bank Details</strong>
                </Divider>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="accountNumber" label="Account Number" />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField
                  name="ifsc"
                  label="IFSC Code"
                  onChange={(e: any) => handelIFSC(setFieldValue, e)}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="bankName" label="Bank Name" />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <InputField name="branchName" label="Branch Name" />
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
                  marginTop: "30px",
                  marginBottom: 2,
                }}
              >
                <Button
                  onClick={() => navigate("/admin/employee-list")}
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
    </div>
  );
};

export default UserUpdate;
