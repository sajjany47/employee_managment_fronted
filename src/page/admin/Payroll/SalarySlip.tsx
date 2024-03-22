import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import { Box, Button, Grid } from "@mui/material";
import { useRef } from "react";
import SlipCom from "./SlipCom";

const SalarySlip = () => {
  const data = useLocation().state.data;
  const pdfRef = useRef(null);

  const pdfGenerator = () => {
    const pdf = new jsPDF("l", "pt", [1200, 1040]);
    const a: any = pdfRef.current;
    pdf.html(a).then(() => {
      pdf.save(`${data.userPayroll.date}.pdf`);
    });
  };
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box className="mt-4">
              <h6>
                <strong>Payroll Slip</strong>
              </h6>
            </Box>
            <Box className="mt-2 flex justify-end gap-2">
              <Button
                variant="contained"
                // startIcon={<AddIcon />}
                onClick={pdfGenerator}
              >
                Download
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <div ref={pdfRef} className="salary-slip">
            <SlipCom data={data} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default SalarySlip;
