import { useState } from "react";
import Loader from "../../../components/Loader";
import { Box, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

function UserPayroll() {
  const [loading, setLoading] = useState(false);
  const [monthYear, setMonthYear] = useState(
    moment.utc(new Date()).subtract(1, "months")
  );

  const handleChange = (value: any) => {
    setMonthYear(moment.utc(value));
    const formatDate = moment(value).format("YYYY-MM");
    console.log(formatDate);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}{" "}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box className="mt-4">
              <h6>
                <strong>Payroll Details</strong>
              </h6>
            </Box>
            <Box className="mt-2 flex justify-end gap-2">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ marginTop: -1 }}
                >
                  <DatePicker
                    // sx={{ width: "50% " }}
                    label="Select Year"
                    value={monthYear}
                    slotProps={{
                      textField: { size: "small", fullWidth: false },
                    }}
                    views={["year", "month"]}
                    onChange={handleChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} marginTop={10}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Box>CTC</Box>
            <Box>Net Salary</Box>
          </Box>
          <h1>
            <strong>Employee Details</strong>
          </h1>
          <Box>
            <Box>Name:</Box>
            <Box>Net Salary</Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default UserPayroll;
