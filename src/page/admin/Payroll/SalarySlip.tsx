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
            <td>{data.userPayroll.date}</td>
          </tr>
          <tr>
            <th>Employee Code</th>
            <td>{data.userPayroll.username}</td>
            <td></td>
            <th>Bank A/C no.</th>
            <td>{data.userPayroll.accountNumber}</td>
            <td></td>
            <th>Branch Name</th>
            <td>{data.userPayroll.present}</td>
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
            <th>Position</th>
            <td>{data.userInfo.position}</td>
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
              {" "}
              {data.userPayroll.currentMonthSalary.providentFund}
            </td>
          </tr>
          <tr>
            <th className="col-span-2">Fixed Dearness Allowance</th>
            <td></td>

            <td className="myAlign">00.00</td>
            <th className="col-span-2">LIC</th>
            <td></td>

            <td className="myAlign">00.00</td>
          </tr>
          <tr>
            <th className="col-span-2">Variable Dearness Allowance</th>
            <td></td>

            <td className="myAlign">00.00</td>
            <th className="col-span-2">Loan</th>
            <td></td>

            <td className="myAlign">00.00</td>
          </tr>
          <tr>
            <th className="col-span-2">House Rent Allowance</th>
            <td></td>
            <td className="myAlign">00.00</td>
            <th className="col-span-2">Professional Tax</th>
            <td></td>
            <td className="myAlign">00.00</td>
          </tr>
          <tr>
            <th className="col-span-2">Graduation Allowance</th>
            <td></td>

            <td className="myAlign">00.00</td>
            <th className="col-span-2">Security Deposite(SD)</th>
            <td></td>

            <td className="myAlign">00.00</td>
          </tr>
          <tr>
            <th className="col-span-2">Conveyance Allowance</th> <td></td>
            <td className="myAlign">00.00</td>
            <th className="col-span-2">Staff Benefit(SB)</th>
            <td></td>
            <td className="myAlign">00.00</td>
          </tr>
          <tr>
            <th className="col-span-2">Post Allowance</th>
            <td></td>
            <td className="myAlign">00.00</td>
            <th className="col-span-2">Labour Welfare Fund</th>
            <td></td>
            <td className="myAlign">00.00</td>
          </tr>
          <tr>
            <th className="col-span-2">Special Allowance</th>
            <td></td>
            <td className="myAlign">00.00</td>
            <th className="col-span-2">NSC</th>
            <td></td>
            <td className="myAlign">00.00</td>
          </tr>

          <tr className="myBackground ">
            <th className="col-span-3">Total Payments</th>
            <td className=""></td>
            <td className="myAlign">10000</td>
            <th className="col-span-3">Total Deductions</th>
            <td className=""></td>
            <td className="myAlign">1000</td>
          </tr>
          <tr style={{ height: "40px" }}>
            <th className="col-span-2"></th>
            <th></th>

            <td></td>
            <td></td>
            <td></td>
            <td className="table-border-right"></td>
            <th className="table-border-bottom col-span-2">Net Salary</th>
            <td>XXXXXXXXXX</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default SalarySlip;
