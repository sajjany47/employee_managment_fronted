import { Field, FieldArray, Form, Formik } from "formik";
import { useLocation } from "react-router-dom";
import { Box, Divider, Grid, InputAdornment } from "@mui/material";
import { inputField, selectField } from "../../../components/FieldType";
import { useSelector } from "react-redux";
import { data } from "../../../shared/Config";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import * as Yup from "yup";

const UserUpdate = () => {
  const { state } = useLocation();

  const convertData = state.data;
  // console.log(state.data);
  const userType = useSelector((state: any) => state.auth.auth.user);
  const userUpdateValidation = Yup.object().shape({});
  const intialValue = {
    ...convertData,
    aadharNumber: convertData.document.aadharNumber,
    voterNumber: convertData.document.voterNumber,
    panNumber: convertData.document.panNumber,
    passportNumber: convertData.document.passportNumber,
    bankName: convertData.bankDetails.bankName,
    accountNumber: convertData.bankDetails.accountNumber,
    ifsc: convertData.bankDetails.ifsc,
    branchName: convertData.bankDetails.branchName,
    dob: moment(convertData.dob).format("YYYY-MM-DD"),
  };
  console.log(intialValue);
  const userUpdate = (value: any) => {
    console.log(value);
  };

  return (
    <div>
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

                {/* <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    label="Select Date"
                    name="dob"
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <IconButton>
                              <CalendarMonthIcon />
                            </IconButton>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider> */}
              </Grid>

              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="role"
                  label="Role"
                  component={selectField}
                  options={
                    userType?.role === "admin" ? data.adminType : data.HRtype
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Field
                  name="password"
                  label="Password"
                  component={inputField}
                  type="password"
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
                              item
                              sm={12}
                              xs={12}
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
                              item
                              sm={12}
                              xs={12}
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
              <Button variant="contained" autoFocus type="submit">
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
