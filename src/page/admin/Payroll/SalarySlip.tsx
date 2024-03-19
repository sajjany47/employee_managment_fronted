import { useEffect, useState } from "react";
import { PayrollService } from "./PayrollService";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";

const SalarySlip = () => {
  const payrollService = new PayrollService();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    payrollService
      .salarySlip({})
      .then((res) => {
        setData(res.data);
      })
      .catch((err) =>
        enqueueSnackbar(err.response.data.message, { variant: "error" })
      )
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <Loader />}
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
            <td>Example</td>
            <td></td>
            <th>Bank Code</th>
            <td>ABC123</td>
            <td></td>
            <th>Branch Name</th>
            <td>ABC123</td>
          </tr>
          <tr>
            <th>Employee Code</th>
            <td>XXXXXXXXXXX</td>
            <td></td>
            <th>Bank Name</th>
            <td>XXXXXXXXXXX</td>
            <td></td>
            <th>Payslip no.</th>
            <td>XXXXXXXXXX</td>
          </tr>
          <tr>
            <th>Cost Centre</th>
            <td>XXXXXXXXXXX</td>
            <td></td>
            <th>Bank Branch</th>
            <td>XXXXXXXXXX</td>
            <td></td>
            <th>Pay Period</th>
            <td>XXXXXXXXXXX</td>
          </tr>
          <tr>
            <th>CC Description:</th>
            <td>XXXXXXXXXXX</td>
            <td></td>
            <th>Bank A/C no.</th>
            <td>XXXXXXXXXX</td>
            <td></td>
            <th>Personel Area</th>
            <td>XXXXXXXXXX</td>
          </tr>
          <tr>
            <th>Grade:</th>
            <td>18</td>
            <td></td>
            <th>Employee Group</th>
            <td>Sales Manager</td>
            <td></td>
            <th>PAN No:</th>
            <td>MOP72182E</td>
          </tr>
          <tr className="myBackground">
            <th className="col-span-2">Payments</th>
            <th>Particular</th>
            <th className="table-border-right">Amount (Rs.)</th>
            <th className="col-span-2">Deductions</th>
            <th>Particular</th>
            <th>Amount (Rs.)</th>
          </tr>
          <tr>
            <th className="col-span-2">Basic Salary</th>
            <td></td>
            <td className="myAlign">4935.00</td>
            <th className="col-span-2">Provident Fund</th>
            <td></td>

            <td className="myAlign">00.00</td>
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
