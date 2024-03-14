import { useState } from "react";
import Loader from "../../../components/Loader";
import { Button, Grid, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
import {
  DateField,
  InputField,
  SelectField,
} from "../../../components/DynamicField";
import { sumValues } from "../../../shared/UtlityFunction";
import UpdateIcon from "@mui/icons-material/Update";

const PayrollUpdate = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {" "}
      {loading && <Loader />}{" "}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <h6>
            <strong>Edit Payroll</strong>
          </h6>
        </Grid>
        <Grid item xs={12} className="mt-1">
          <Formik
            initialValues={{
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
            }}
            // validationSchema={activationKeyValidation}
            // onSubmit={generateSalary}
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
                      views={["year", "month"]}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputField name="username" label="Username" disabled />
                  </Grid>

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
                      //   onClick={handleClose}
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
        </Grid>
      </Grid>
    </>
  );
};

export default PayrollUpdate;
