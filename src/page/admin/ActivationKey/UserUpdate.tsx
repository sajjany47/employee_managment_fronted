import { Field, FieldArray, Form, Formik } from "formik";
import { useLocation } from "react-router-dom";
import { Box, Divider, Grid, InputAdornment } from "@mui/material";
import { inputField, selectField } from "../../../components/FieldType";
import { useSelector } from "react-redux";
import { ConfigData } from "../../../shared/ConfigData";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import * as Yup from "yup";
import { ActivationService } from "./ActivationServices";
import { useState } from "react";
import { useSnackbar } from "notistack";
import Loader from "../../../components/Loader";

const UserUpdate = () => {
  const activationService = new ActivationService();
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const convertData = state.data;
  // console.log(state.data);
  const userType = useSelector((state: any) => state.auth.auth.user);
  const [loading, setLoading] = useState(false);
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
    district: Yup.string().required("District is required"),
    city: Yup.string().required("City is required"),
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
    ...convertData,
    aadharNumber: convertData.document?.aadharNumber,
    voterNumber: convertData.document?.voterNumber,
    panNumber: convertData.document?.panNumber,
    passportNumber: convertData.document?.passportNumber,
    bankName: convertData.bankDetails?.bankName,
    accountNumber: convertData.bankDetails?.accountNumber,
    ifsc: convertData.bankDetails?.ifsc,
    branchName: convertData.bankDetails?.branchName,
    dob: moment(convertData.dob).format("YYYY-MM-DD"),
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
      district: value.district,
      city: value.city,
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

    if (convertData.username !== value.username) {
      reqBody = { ...reqBody, username: value.username };
    }

    if (convertData.email !== value.email) {
      reqBody = { ...reqBody, email: value.email };
    }

    if (convertData.mobile !== value.mobile) {
      reqBody = { ...reqBody, mobile: value.mobile };
    }

    activationService
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
      >
        {({ handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <Divider sx={{ margin: "20px" }}>
              <strong>Personal Details</strong>
            </Divider>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="activationCode"
                  label="Activation Code"
                  component={inputField}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field name="name" label="Name" component={inputField} />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="username"
                  label="Username"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field name="mobile" label="Mobile" component={inputField} />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  type="date"
                  name="dob"
                  label="Date Of Birth"
                  component={inputField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="role"
                  label="Role"
                  component={selectField}
                  options={
                    userType?.role === "admin"
                      ? ConfigData.adminType
                      : ConfigData.HRtype
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="position"
                  label="Position"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field name="address" label="Address" component={inputField} />
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <Field name="state" label="State" component={inputField} />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="district"
                  label="District"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field name="city" label="City" component={inputField} />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field name="pincode" label="Pincode" component={inputField} />
              </Grid>
            </Grid>
            <Divider sx={{ margin: "20px" }}>
              <strong>Education Details</strong>
            </Divider>

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
                              // item
                              // sm={12}
                              // xs={12}
                              container
                              spacing={{ xs: 2, md: 2 }}
                              columns={{ xs: 4, sm: 8, md: 12 }}
                              sx={{ marginBottom: "15px" }}
                            >
                              <Grid item xs={12} sm={4} md={4}>
                                <Field
                                  name={`education.${index}.boardName`}
                                  label="Board Name"
                                  component={inputField}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4} md={4}>
                                <Field
                                  name={`education.${index}.passingYear`}
                                  label="Passing Year"
                                  component={inputField}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4} md={4}>
                                <Field
                                  name={`education.${index}.marksPercentage`}
                                  label="Marks (%)"
                                  component={inputField}
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
                                  margin: "auto",
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

            <Divider sx={{ margin: "20px" }}>
              <strong>Working Details</strong>
            </Divider>

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
                              // item
                              // sm={12}
                              // xs={12}
                              container
                              spacing={{ xs: 2, md: 2 }}
                              columns={{ xs: 4, sm: 8, md: 12 }}
                              sx={{ marginBottom: "15px" }}
                            >
                              <Grid item xs={12} sm={4} md={3}>
                                <Field
                                  name={`workDetail.${index}.companyName`}
                                  label="Company Name"
                                  component={inputField}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4} md={3}>
                                <Field
                                  name={`workDetail.${index}.position`}
                                  label="Position"
                                  component={inputField}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4} md={3}>
                                <Field
                                  name={`workDetail.${index}.startingYear`}
                                  label="Starting Year"
                                  component={inputField}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4} md={3}>
                                <Field
                                  name={`workDetail.${index}.endingYear`}
                                  label="Ending Year"
                                  component={inputField}
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
                                  margin: "auto",
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

            <Divider sx={{ margin: "20px" }}>
              <strong>Skill</strong>
            </Divider>

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
                                <Field
                                  name={`skill.${index}`}
                                  label="Skill"
                                  component={inputField}
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
                                  margin: "auto",
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

            <Divider sx={{ margin: "20px" }}>
              <strong>Document</strong>
            </Divider>

            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="aadharNumber"
                  label="Aadhar Number"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="panNumber"
                  label="Pan Number"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="voterNumber"
                  label="Voter Number"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="passportNumber"
                  label="Passport Number"
                  component={inputField}
                />
              </Grid>
            </Grid>

            <Divider sx={{ margin: "20px" }}>
              <strong>Bank Details</strong>
            </Divider>

            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="bankName"
                  label="Bank Name"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="accountNumber"
                  label="Account Number"
                  component={inputField}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field name="ifsc" label="IFSC Code" component={inputField} />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="branchName"
                  label="Branch Name"
                  component={inputField}
                />
              </Grid>
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
              }}
            >
              <Button
                // onClick={handleClose}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserUpdate;
