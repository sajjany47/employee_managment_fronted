import moment from "moment";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import { Box, Button, Grid, Table, TableBody, TableRow } from "@mui/material";
import { useRef } from "react";

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
      </Grid>

      <div ref={pdfRef} className="salary-slip">
        <Table className="empDetail">
          <TableBody>
            <TableRow>
              <th>Name</th>
              <td>{data.userInfo.name}</td>
              <td></td>
              <th>Bank Name</th>
              <td>{data.userPayroll.bankName}</td>
              <td></td>
              <th>Period</th>
              <td>{moment(data.userPayroll.date).format("MMM,YYYY")}</td>
            </TableRow>

            <TableRow>
              <th>Employee Code</th>
              <td>{data.userPayroll.username}</td>
              <td></td>
              <th>Bank A/C no.</th>
              <td>{data.userPayroll.accountNumber}</td>
              <td></td>
              <th>Present</th>
              <td>
                {data.userPayroll.present +
                  data.userPayroll.totalWeekend +
                  data.userPayroll.currentMonthTotalHoliday +
                  data.userPayroll.currentMonthTotalLeave -
                  data.userPayroll.absent}
              </td>
            </TableRow>
            <TableRow>
              <th>Position</th>
              <td>{data.userInfo.position}</td>
              <td></td>
              <th>Bank Branch</th>
              <td>{data.userPayroll.branchName}</td>
              <td></td>
              <th>Days</th>
              <td>{data.userPayroll.totalMonthDays}</td>
            </TableRow>
            <TableRow>
              <th>Mobile</th>
              <td>{data.userInfo.mobile}</td>
              <td></td>
              <th>IFSC</th>
              <td>{data.userPayroll.ifsc}</td>
              <td></td>
              <th>Absent</th>
              <td>{data.userPayroll.absent}</td>
            </TableRow>
            <TableRow>
              <th>DOB</th>
              <td>{moment(data.userInfo.dob).format("DD MMM, YYYY")}</td>
              <td></td>
              <th>PAN No:</th>
              <td>{data.userInfo.document.panNumber}</td>
              <td></td>
              <th>Leave</th>
              <td>{data.userPayroll.currentMonthTotalLeave}</td>
            </TableRow>
            <TableRow>
              <th></th>
              <td></td>
              <td></td>
              <th></th>
              <td></td>
              <td></td>
              <th></th>
              <td></td>
            </TableRow>
            <TableRow>
              <th></th>
              <td></td>
              <td></td>
              <th></th>
              <td></td>
              <td></td>
              <th></th>
              <td></td>
            </TableRow>

            <TableRow className="myBackground">
              <th className="col-span-2">Payments</th>
              <th>CTC</th>
              <th className="table-border-right">Amount (Rs.)</th>
              <th className="col-span-2">Deductions</th>
              <th>CTC</th>
              <th>Amount (Rs.)</th>
            </TableRow>
            <TableRow>
              <th className="col-span-2">Basic Salary</th>
              <td>{data.salaryInfo.currentSalary.basicSalary}</td>
              <td className="myAlign">
                {data.userPayroll.currentMonthSalary.basicSalary}
              </td>
              <th className="col-span-2">Provident Fund</th>
              <td>{data.salaryInfo.currentSalary.providentFund}</td>

              <td className="myAlign">
                {data.userPayroll.currentMonthSalary.providentFund}
              </td>
            </TableRow>
            <TableRow>
              <th className="col-span-2">HRA</th>
              <td>{data.salaryInfo.currentSalary.hra}</td>

              <td className="myAlign">
                {data.userPayroll.currentMonthSalary.hra}
              </td>
              <th className="col-span-2">Health Insurance</th>
              <td>{data.salaryInfo.currentSalary.healthInsurance}</td>

              <td className="myAlign">
                {data.userPayroll.currentMonthSalary.healthInsurance}
              </td>
            </TableRow>
            <TableRow>
              <th className="col-span-2">Travel Allowance</th>
              <td>{data.salaryInfo.currentSalary.travelAllowance}</td>

              <td className="myAlign">
                {data.userPayroll.currentMonthSalary.travelAllowance}
              </td>
              <th className="col-span-2">Professional Tax</th>
              <td>{data.salaryInfo.currentSalary.professionalTax}</td>
              <td className="myAlign">
                {data.userPayroll.currentMonthSalary.professionalTax}
              </td>
            </TableRow>
            <TableRow>
              <th className="col-span-2">Medical Allowance</th>
              <td>{data.salaryInfo.currentSalary.MedicalAllowance}</td>
              <td className="myAlign">
                {data.userPayroll.currentMonthSalary.MedicalAllowance}
              </td>
              <th className="col-span-2">Income Tax</th>
              <td>{data.salaryInfo.currentSalary.incomeTax}</td>
              <td className="myAlign">
                {data.userPayroll.currentMonthSalary.incomeTax}
              </td>
            </TableRow>
            <TableRow>
              <th className="col-span-2">LeaveTravel Allowance</th>
              <td>{data.salaryInfo.currentSalary.LeaveTravelAllowance}</td>

              <td className="myAlign">
                {data.userPayroll.currentMonthSalary.LeaveTravelAllowance}
              </td>
              <th className="col-span-2"></th>
              <td></td>
              <td className="myAlign"></td>
            </TableRow>
            <TableRow>
              <th className="col-span-2">Special Allowance</th>
              <td>{data.salaryInfo.currentSalary.SpecialAllowance}</td>
              <td className="myAlign">
                {data.userPayroll.currentMonthSalary.SpecialAllowance}
              </td>
              <th className="col-span-2"></th>
              <td></td>
              <td className="myAlign"></td>
            </TableRow>
            <TableRow>
              <th></th>
              <td></td>
              <td></td>
              <th></th>
              <td></td>
              <td></td>
              <th></th>
              <td></td>
            </TableRow>
            <TableRow>
              <th></th>
              <td></td>
              <td></td>
              <th></th>
              <td></td>
              <td></td>
              <th></th>
              <td></td>
            </TableRow>

            <TableRow className="myBackground ">
              <th className="col-span-2"></th>
              <th></th>

              <td></td>
              <td></td>
              <td></td>
              <td className="table-border-right"></td>
              <th className="table-border-bottom col-span-2">Net Salary</th>
              <td>INR {data.userPayroll.currentMonthSalary.totalEarning}</td>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default SalarySlip;
