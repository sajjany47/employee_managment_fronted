import moment from "moment";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import Loader from "../../../components/Loader";
import { useEffect, useState } from "react";
import { Box, Button, Chip, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { EmployeeServices } from "./EmployeeServices";
import EditIcon from "@mui/icons-material/Edit";

const UserVerified = () => {
  const id = useParams();
  const navigate = useNavigate();
  const employeeServices = new EmployeeServices();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});

  const user = useSelector((state: any) => state.auth.auth.user);

  useEffect(() => {
    setLoading(true);
    employeeServices
      .singleUser(Object.keys(id).length > 0 ? id.id : user._id)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) =>
        enqueueSnackbar(error.response.data.message, { variant: "error" })
      )
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approvedUser = (payload: any) => {
    setLoading(true);
    employeeServices
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
    <div>
      {loading && <Loader />}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Box className="mt-2 flex justify-between">
            <Box className="mt-4">
              <h6>
                <strong>User Details</strong>
              </h6>
            </Box>
            <Box className="mt-2 flex justify-end gap-2">
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/admin/user-update/${user._id}`)}
              >
                Edit Details
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} className="mt-1">
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
              <div className="col-span-4 sm:col-span-3">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <img
                      src="https://randomuser.me/api/portraits/men/94.jpg"
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    ></img>
                    <h1 className="text-md font-bold capitalize">
                      {data.name}
                    </h1>
                    <p className="text-gray-700 capitalize">{data?.position}</p>
                    {data.registrationStatus !== "verified" ? (
                      <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        {user.role === "employee" ? (
                          <Chip
                            color="error"
                            label={"Not Verified"}
                            sx={{ textTransform: "capitalize" }}
                          />
                        ) : (
                          <>
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
                                navigate("/admin/employee-list");
                              }}
                            />
                          </>
                        )}
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
                        Username
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.username}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Role
                      </dt>
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
                      <dt className="text-sm font-medium text-gray-500">
                        Email
                      </dt>
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
                      <dt className="text-sm font-medium text-gray-500">
                        Address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                        {data.address
                          ? `${data.address} ,${data.pincode} ,${data.state} ,${data.country}`
                          : ""}
                      </dd>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mt-6 mb-4">
                    Eductaion Details
                  </h2>
                  <div className="mb-6">
                    {data.education &&
                      data.education.map((item: any, index: any) => {
                        return (
                          <div
                            className="flex justify-between flex-wrap gap-2 w-full"
                            key={index}
                          >
                            <p>
                              <span className="text-gray-700 mr-2 uppercase">
                                {item.boardName ? item.boardName : ""}
                              </span>
                              (
                              <span className="text-gray-700">
                                <strong>
                                  {item.passingYear ? item.passingYear : ""}
                                </strong>
                              </span>
                              )
                            </p>
                            <span className="text-gray-700 font-bold">
                              {item.marksPercentage
                                ? `${item.marksPercentage}%`
                                : ""}
                            </span>
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
                            <p>
                              <span className="text-gray-700 mr-2 uppercase">
                                {item.companyName ? item.companyName : ""}
                              </span>
                              (
                              <span className="text-gray-700">
                                <strong>
                                  {item.startingYear
                                    ? `${item.startingYear} - ${item.endingYear}`
                                    : ""}
                                </strong>
                              </span>
                              )
                            </p>
                            <span className="text-gray-700 font-bold capitalize">
                              {item.position ? item.position : ""}
                            </span>
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
                        {data?.document?.aadharNumber}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Voter Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 uppercase">
                        {data?.document?.voterNumber}
                      </dd>
                    </div>

                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Pan Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data?.document?.panNumber}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Passport Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 uppercase">
                        {data?.document?.passportNumber}
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
                        {data?.bankDetails?.bankName}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Account Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 uppercase">
                        {data?.bankDetails?.accountNumber}
                      </dd>
                    </div>

                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        IFSC Code
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data?.bankDetails?.ifsc}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Branch Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 uppercase">
                        {data?.bankDetails?.branchName}
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserVerified;
