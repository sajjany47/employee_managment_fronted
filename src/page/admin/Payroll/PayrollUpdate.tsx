import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { Button, Grid, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
import { DateField, InputField } from "../../../components/DynamicField";
import { calculateSalary, sumValues } from "../../../shared/UtlityFunction";
import UpdateIcon from "@mui/icons-material/Update";
import { useLocation, useNavigate } from "react-router-dom";
import { SalaryServices } from "../Salary/SalaryService";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { PayrollService } from "./PayrollService";
import * as Yup from "yup";

const PayrollUpdate = () => {
  const navigate = useNavigate();
  const propsData = useLocation();
  const userType = useSelector((state: any) => state.auth.auth.user);
  const salaryService = new SalaryServices();
  const payrollService = new PayrollService();
  const data = propsData.state.data;
  const [userSalary, setUserSalary] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const payrollUpdateValidation = Yup.object().shape({
    totalEarning: Yup.string().required("Total in hand is required"),
  });

  useEffect(() => {
    setLoading(true);
    salaryService
      .singleSalaryList(data.username)
      .then((res) => {
        setUserSalary(res.data.currentSalary);
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdateSalary = (values: any) => {
    setLoading(true);
    const requestData = {
      payrollId: data._id,
      date: values.date,
      username: values.username,
      currentMonthSalary: {
        basicSalary: values.basicSalary,
        hra: values.hra,
        travelAllowance: values.travelAllowance,
        MedicalAllowance: values.MedicalAllowance,
        LeaveTravelAllowance: values.LeaveTravelAllowance,
        SpecialAllowance: values.SpecialAllowance,
        providentFund: values.providentFund,
        professionalTax: values.professionalTax,
        incomeTax: values.incomeTax,
        healthInsurance: values.healthInsurance,
        totalEarning: Number(values.totalEarning),
      },
      salaryStatus: data.salaryStatus,
      currentMonthTotalLeave: Number(data.currentMonthTotalLeave),
      absent: Number(values.absent),
      currentMonthTotalHoliday: Number(values.currentMonthTotalHoliday),
      totalWeekend: Number(values.totalWeekend),
      transactionNumber: null,
      transactionDate: null,
      updatedBy: userType.username,
    };

    payrollService
      .payrollUpdate(requestData)
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      {" "}
      {loading && <Loader />}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <h6>
            <strong>Edit Payroll</strong>
          </h6>
        </Grid>
        <Grid item xs={12} className="mt-1">
          <Formik
            initialValues={{
              date: data.date,
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
            validationSchema={payrollUpdateValidation}
            onSubmit={onUpdateSalary}
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
                      disabled
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
                      disabled
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
                            onClick={() => {
                              setFieldValue(
                                "totalEarning",
                                sumValues({
                                  basicSalary: calculateSalary(
                                    userSalary.basicSalary,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday,
                                    data.currentMonthTotalLeave
                                  ),
                                  hra: calculateSalary(
                                    userSalary.hra,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday,
                                    data.currentMonthTotalLeave
                                  ),
                                  travelAllowance: calculateSalary(
                                    userSalary.travelAllowance,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday,
                                    data.currentMonthTotalLeave
                                  ),
                                  MedicalAllowance: calculateSalary(
                                    userSalary.MedicalAllowance,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday,
                                    data.currentMonthTotalLeave
                                  ),
                                  LeaveTravelAllowance: calculateSalary(
                                    userSalary.LeaveTravelAllowance,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday,
                                    data.currentMonthTotalLeave
                                  ),
                                  SpecialAllowance: calculateSalary(
                                    userSalary.SpecialAllowance,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday,
                                    data.currentMonthTotalLeave
                                  ),
                                  providentFund: -calculateSalary(
                                    userSalary.providentFund,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday,
                                    data.currentMonthTotalLeave
                                  ),
                                  professionalTax: -values.professionalTax,
                                  incomeTax: -calculateSalary(
                                    userSalary.incomeTax,
                                    data.totalMonthDays,
                                    data.present,
                                    values.totalWeekend,
                                    values.absent,
                                    values.currentMonthTotalHoliday,
                                    data.currentMonthTotalLeave
                                  ),
                                  healthInsurance: -values.healthInsurance,
                                })
                              );
                              setFieldValue(
                                "basicSalary",
                                calculateSalary(
                                  userSalary.basicSalary,
                                  data.totalMonthDays,
                                  data.present,
                                  values.totalWeekend,
                                  values.absent,
                                  values.currentMonthTotalHoliday,
                                  data.currentMonthTotalLeave
                                )
                              );
                              setFieldValue(
                                "hra",
                                calculateSalary(
                                  userSalary.hra,
                                  data.totalMonthDays,
                                  data.present,
                                  values.totalWeekend,
                                  values.absent,
                                  values.currentMonthTotalHoliday,
                                  data.currentMonthTotalLeave
                                )
                              );
                              setFieldValue(
                                "travelAllowance",
                                calculateSalary(
                                  userSalary.travelAllowance,
                                  data.totalMonthDays,
                                  data.present,
                                  values.totalWeekend,
                                  values.absent,
                                  values.currentMonthTotalHoliday,
                                  data.currentMonthTotalLeave
                                )
                              );
                              setFieldValue(
                                "MedicalAllowance",
                                calculateSalary(
                                  userSalary.MedicalAllowance,
                                  data.totalMonthDays,
                                  data.present,
                                  values.totalWeekend,
                                  values.absent,
                                  values.currentMonthTotalHoliday,
                                  data.currentMonthTotalLeave
                                )
                              );
                              setFieldValue(
                                "LeaveTravelAllowance",
                                calculateSalary(
                                  userSalary.LeaveTravelAllowance,
                                  data.totalMonthDays,
                                  data.present,
                                  values.totalWeekend,
                                  values.absent,
                                  values.currentMonthTotalHoliday,
                                  data.currentMonthTotalLeave
                                )
                              );
                              setFieldValue(
                                "SpecialAllowance",
                                calculateSalary(
                                  userSalary.SpecialAllowance,
                                  data.totalMonthDays,
                                  data.present,
                                  values.totalWeekend,
                                  values.absent,
                                  values.currentMonthTotalHoliday,
                                  data.currentMonthTotalLeave
                                )
                              );
                              setFieldValue(
                                "healthInsurance",
                                values.healthInsurance
                              );
                              setFieldValue(
                                "providentFund",
                                calculateSalary(
                                  userSalary.providentFund,
                                  data.totalMonthDays,
                                  data.present,
                                  values.totalWeekend,
                                  values.absent,
                                  values.currentMonthTotalHoliday,
                                  data.currentMonthTotalLeave
                                )
                              );
                              setFieldValue(
                                "incomeTax",
                                calculateSalary(
                                  userSalary.incomeTax,
                                  data.totalMonthDays,
                                  data.present,
                                  values.totalWeekend,
                                  values.absent,
                                  values.currentMonthTotalHoliday,
                                  data.currentMonthTotalLeave
                                )
                              );
                              setFieldValue(
                                "professionalTax",
                                values.professionalTax
                              );
                            }}
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
                      onClick={() => {
                        navigate("/admin/payroll");
                      }}
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
