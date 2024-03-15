import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { Button, Grid, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
import {
  DateField,
  InputField,
  SelectField,
} from "../../../components/DynamicField";
import { calculateSalary, sumValues } from "../../../shared/UtlityFunction";
import UpdateIcon from "@mui/icons-material/Update";
import { useLocation } from "react-router-dom";

const PayrollUpdate = () => {
  const propsData = useLocation();
  const data = propsData.state.data;

  useEffect(() => {}, []);
  const [loading, setLoading] = useState(false);

  const updateSalary = (value) => {
    console.log(value);
  };
  //  values.LeaveTravelAllowance,
  //    data.currentMontTotalDays,
  //    data.present,
  //    values.totalWeekend,
  //    values.absent,
  //    values.currentMonthTotalHoliday;

  console.log(data.totalMonthDays);

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
              date: data.currentMonthSalary,
              username: data.username,
              basicSalary: data.currentMonthSalary.basicSalary,
              hra: data.currentMonthSalary.hra,
              travelAllowance: data.currentMonthSalary.travelAllowance,
              MedicalAllowance: data.currentMonthSalary.MedicalAllowance,
              LeaveTravelAllowance:
                data.currentMonthSalary.LeaveTravelAllowance,
              SpecialAllowance: data.currentMonthSalary.SpecialAllowance,
              providentFund: data.currentMonthSalary.providentFund,
              professionalTax: data.currentMonthSalary.professionalTax,
              incomeTax: data.currentMonthSalary.incomeTax,
              healthInsurance: data.currentMonthSalary.healthInsurance,
              totalEarning: data.currentMonthSalary.totalEarning,
              absent: data.absent,
              currentMonthTotalHoliday: data.currentMonthTotalHoliday,
              totalWeekend: data.totalWeekend,
            }}
            // validationSchema={activationKeyValidation}
            onSubmit={updateSalary}
            enableReinitialize
          >
            {({ handleSubmit, values, setFieldValue }) => (
              <Form className="mt-1" onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={3}>
                    <DateField
                      name="date"
                      label="Date"
                      views={["year", "month"]}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField name="username" label="Username" disabled />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="absent"
                      label="Absent"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("absent", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="currentMonthTotalHoliday"
                      label="Current Month Holiday"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue(
                          "currentMonthTotalHoliday",
                          e.target.value
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="totalWeekend"
                      label="Total Weekend Days"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("totalWeekend", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="basicSalary"
                      label="Basic Salary"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("basicSalary", e.target.value);
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="hra"
                      label="House Reantal Allowance"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("hra", e.target.value);
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="travelAllowance"
                      label="Travel Allowance"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("travelAllowance", e.target.value);
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="MedicalAllowance"
                      label="Medical Allowance"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("MedicalAllowance", e.target.value);
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="LeaveTravelAllowance"
                      label="Leave Travel Allowance"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("LeaveTravelAllowance", e.target.value);
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="SpecialAllowance"
                      label="Special Allowance"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("SpecialAllowance", e.target.value);
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="healthInsurance"
                      label="Health Insurance"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("healthInsurance", e.target.value);
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="providentFund"
                      label="Provident Fund"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("providentFund", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="incomeTax"
                      label="Income Tax"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("incomeTax", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
                    <InputField
                      name="professionalTax"
                      label="Professional Tax"
                      onChange={(e: any) => {
                        setFieldValue("totalEarning", "");
                        setFieldValue("professionalTax", e.target.value);
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={3}>
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
                                  basicSalary: calculateSalary(
                                    values.basicSalary,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday
                                  ),
                                  hra: calculateSalary(
                                    values.hra,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday
                                  ),
                                  travelAllowance: calculateSalary(
                                    values.travelAllowance,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday
                                  ),
                                  MedicalAllowance: calculateSalary(
                                    values.MedicalAllowance,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday
                                  ),
                                  LeaveTravelAllowance: calculateSalary(
                                    values.LeaveTravelAllowance,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday
                                  ),
                                  SpecialAllowance: calculateSalary(
                                    values.SpecialAllowance,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday
                                  ),
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
                  </Grid>{" "}
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
