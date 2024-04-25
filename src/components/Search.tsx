import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { InputField, SelectField } from "./DynamicField";
import { ConfigData } from "../shared/ConfigData";
import { EmployeeServices } from "../page/admin/EmployeeList/EmployeeServices";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const Search = () => {
  const employeeServices = new EmployeeServices();
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    getAllCountryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handelCountry = (setFieldValue: any, e: any) => {
    setFieldValue("country", e.target.value, true);
    getAllStateByCountry(e.target.value);
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
  const handelSearch = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <Formik onSubmit={handelSearch} initialValues={{}}>
        {({ handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={6} sm={3} md={3}>
                <InputField name="activationCode" label="Activation Code" />
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
                <InputField name="name" label="Name" />
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <InputField name="username" label="Username" />
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <InputField name="email" label="Email" type="email" />
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <InputField name="mobile" label="Mobile" />
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <InputField name="position" label="Position" />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <SelectField
                  name="role"
                  label="Role"
                  options={ConfigData.adminType}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <SelectField
                  name="country"
                  label="Country"
                  options={countryData}
                  onChange={(e: any) => handelCountry(setFieldValue, e)}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <SelectField
                  name="state"
                  label="State"
                  options={stateData}
                  onChange={(e: any) => setFieldValue("state", e.target.value)}
                />
              </Grid>

              <Grid item xs={6} sm={4} md={3}>
                <InputField name="pincode" label="Pincode" />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <SelectField
                  name="activeStatus"
                  label="Active"
                  options={ConfigData.activeStatus}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <SelectField
                  name="registrationStatus"
                  label="Status"
                  options={ConfigData.registrationStatus}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Search;
