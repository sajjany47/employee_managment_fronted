import moment from "moment";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useLocation, useNavigate } from "react-router-dom";
import { ActivationService } from "./ActivationServices";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import { useState } from "react";
import { Chip } from "@mui/material";
import { useSelector } from "react-redux";

const UserVerified = () => {
  const navigate = useNavigate();
  const activationService = new ActivationService();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const data: any = state.data;
  const user = useSelector((state: any) => state.auth.auth.user);

  const approvedUser = (payload: any) => {
    setLoading(true);
    activationService
      .userVerified(payload)
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-gray-100">
      {loading && <Loader />}
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/94.jpg"
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                ></img>
                <h1 className="text-md font-bold capitalize">{data.name}</h1>
                <p className="text-gray-700 capitalize">{data?.position}</p>
                {data.registrationStatus !== "verified" ? (
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <Chip
                      color="primary"
                      label={"Approved"}
                      onClick={() => {
                        approvedUser({
                          activationCode: data.activationCode,
                          approvedBy: user.username,
                          registrationStatus: "verified",
                        });
                        navigate("/admin/employee-list");
                      }}
                    />

                    <Chip
                      color="error"
                      label={"Rejected"}
                      onClick={() => {
                        approvedUser({
                          activationCode: data.activationCode,
                          approvedBy: user.username,
                          registrationStatus: "rejected",
                        });
                        navigate("/admin/activation-key");
                      }}
                    />
                  </div>
                ) : (
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <VerifiedIcon color="success" />
                  </div>
                )}
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                  Skills
                </span>
                <ul>
                  {data?.skill &&
                    data?.skill.map((item: any, index: any) => {
                      return (
                        <li className="mb-2 capitalize" key={index}>
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Personal Details</h2>
              <div className="text-gray-700">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    UserName
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.username}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                    {data.role}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Mobile Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ">
                    {data.mobile}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ">
                    {data.email}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date Of Birth
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ">
                    {moment(data.dob).format("DD MMM, YYYY")}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                    {data.address
                      ? `${data.address} ,${data.city} ,${data.district} ,${data.state} ,${data.pincode}`
                      : ""}
                  </dd>
                </div>
              </div>

              <h2 className="text-xl font-bold mt-6 mb-4">Eductaion Details</h2>
              <div className="mb-6">
                {data.education &&
                  data.education.map((item: any, index: any) => {
                    return (
                      <div
                        className="flex justify-between flex-wrap gap-2 w-full"
                        key={index}
                      >
                        <span className="text-gray-700 font-bold">
                          {item.marksPercentage
                            ? `${item.marksPercentage}%`
                            : ""}
                        </span>
                        <p>
                          <span className="text-gray-700 mr-2">
                            {item.boardName ? item.boardName : ""}
                          </span>
                          <span className="text-gray-700">
                            {item.passingYear ? item.passingYear : ""}
                          </span>
                        </p>
                      </div>
                    );
                  })}
              </div>

              <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
              <div className="mb-6">
                {data.workDetail &&
                  data.workDetail.map((item: any, index: any) => {
                    return (
                      <div
                        className="flex justify-between flex-wrap gap-2 w-full"
                        key={index}
                      >
                        <span className="text-gray-700 font-bold">
                          {item.position ? item.position : ""}
                        </span>
                        <p>
                          <span className="text-gray-700 mr-2">
                            {item.companyName ? item.companyName : ""}
                          </span>
                          <span className="text-gray-700">
                            {item.startingYear
                              ? `${item.startingYear} - ${item.endingYear}`
                              : ""}
                          </span>
                        </p>
                      </div>
                    );
                  })}
              </div>

              <h2 className="text-xl font-bold mb-4">Document</h2>
              <div className="text-gray-700">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Aadhar Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.document.aadharNumber}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Voter Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 uppercase">
                    {data.document.voterNumber}
                  </dd>
                </div>

                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Pan Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.document.panNumber}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Passport Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 uppercase">
                    {data.document.passportNumber}
                  </dd>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4">Bank Details</h2>
              <div className="text-gray-700">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Bank Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.bankDetails.bankName}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Account Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 uppercase">
                    {data.bankDetails.accountNumber}
                  </dd>
                </div>

                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    IFSC Code
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.bankDetails.ifsc}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Branch Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 uppercase">
                    {data.bankDetails.branchName}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVerified;
