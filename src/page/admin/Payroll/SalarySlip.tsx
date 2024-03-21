import moment from "moment";
import { useLocation } from "react-router-dom";

const SalarySlip = () => {
  const data = useLocation().state.data;
  console.log(data);
  return (
    <>
      <div className="salary-slip">
        <table className="empDetail">
          {/* <tr style={{ backgroundColor: "#c2d69b", height: "100px" }}>
          <td className="col-span-4">
            <img
              height="90px"
              src="https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?cs=srgb&dl=pexels-may-dayua-1545743.jpg&fm=jpg"
            />
          </td>
          <td className="companyName col-span-4 "> Co-Operative Bank Ltd.</td>
        </tr> */}
          <tr>
            <th>Name</th>
            <td>{data.userInfo.name}</td>
            <td></td>
            <th>Bank Name</th>
            <td>{data.userPayroll.bankName}</td>
            <td></td>
            <th>Period</th>
            <td>{moment(data.userPayroll.date).format("MMM,YYYY")}</td>
          </tr>
          <tr>
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
          </tr>
          <tr>
            <th>Position</th>
            <td>{data.userInfo.position}</td>
            <td></td>
            <th>Bank Branch</th>
            <td>{data.userPayroll.branchName}</td>
            <td></td>
            <th>Days</th>
            <td>{data.userPayroll.totalMonthDays}</td>
          </tr>
          <tr>
            <th>Mobile</th>
            <td>{data.userInfo.mobile}</td>
            <td></td>
            <th>IFSC</th>
            <td>{data.userPayroll.ifsc}</td>
            <td></td>
            <th>Absent</th>
            <td>{data.userPayroll.absent}</td>
          </tr>
          <tr>
            <th>DOB</th>
            <td>{moment(data.userInfo.dob).format("DD MMM, YYYY")}</td>
            <td></td>
            <th>PAN No:</th>
            <td>{data.userInfo.document.panNumber}</td>
            <td></td>
            <th>Leave</th>
            <td>{data.userPayroll.currentMonthTotalLeave}</td>
          </tr>
          <tr className="myBackground">
            <th className="col-span-2">Payments</th>
            <th>CTC</th>
            <th className="table-border-right">Amount (Rs.)</th>
            <th className="col-span-2">Deductions</th>
            <th>CTC</th>
            <th>Amount (Rs.)</th>
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
            <th className="col-span-2">LeaveTravel Allowance</th>
            <td>{data.salaryInfo.currentSalary.LeaveTravelAllowance}</td>

            <td className="myAlign">
              {data.userPayroll.currentMonthSalary.LeaveTravelAllowance}
            </td>
            <th className="col-span-2"></th>
            <td></td>
            <td className="myAlign"></td>
          </tr>
          <tr>
            <th className="col-span-2">Special Allowance</th>{" "}
            <td>{data.salaryInfo.currentSalary.SpecialAllowance}</td>
            <td className="myAlign">
              {data.userPayroll.currentMonthSalary.SpecialAllowance}
            </td>
            <th className="col-span-2"></th>
            <td></td>
            <td className="myAlign"></td>
          </tr>

          <tr className="myBackground ">
            <th className="col-span-2"></th>
            <th></th>

            <td></td>
            <td></td>
            <td></td>
            <td className="table-border-right"></td>
            <th className="table-border-bottom col-span-2">Net Salary</th>
            <td>INR {data.userPayroll.currentMonthSalary.totalEarning}</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default SalarySlip;
